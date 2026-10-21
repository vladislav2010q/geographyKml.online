'use strict';

const regions = {
  east: {
    label: 'Восток',
    description: 'Народы и культура Дальнего Востока',
    href: './восток/vostok.html',
    color: '#b779e5',
    paths: ['DalneVostochy']
  },
  caucasus: {
    label: 'Кавказ',
    description: 'Народы и культура Кавказа',
    href: './кавказ/kavkaz.html',
    color: '#7fa8ff',
    paths: ['SeveroKavkazky']
  },
  povolzhye: {
    label: 'Поволжье',
    description: 'Народы и культура Поволжья',
    href: './поволжья/povoljy.html',
    color: '#e6c65a',
    paths: ['Povolskiy']
  },
  northern: {
    label: 'Северные',
    description: 'Народы и культура Европейского Севера',
    href: './северные/Severny.html',
    color: '#f28b9c',
    paths: ['severniy', 'Severny-sapat']
  },
  siberia: {
    label: 'Сибирь',
    description: 'Народы и культура Сибири',
    href: './сибир/sibir.html',
    color: '#68d6b5',
    paths: ['sapodno-cuburskiy', 'Vostochno-Cuburky']
  },
  ural: {
    label: 'Урал',
    description: 'Народы и культура Урала',
    href: './урал/ural.html',
    color: '#e2a766',
    paths: ['yralskay']
  },
  central: {
    label: 'Центральный',
    description: 'Народы и культура Центральной России',
    href: './центральный/central.html',
    color: '#56c4d2',
    paths: ['Central-chernozem', 'Volgo-Vitskoy', 'Central']
  }
};

function initializeMap() {
  const mapWrap = document.getElementById('mapWrap');
  const map = document.getElementById('mapSvg');
  const tooltip = document.getElementById('tooltip');
  const tooltipTitle = document.getElementById('tooltipTitle');
  const tooltipDescription = document.getElementById('tooltipDescription');
  const tooltipLink = document.getElementById('tooltipLink');
  const regionIndex = document.getElementById('regionIndex');

  if (!mapWrap || !map || !tooltip || !tooltipTitle || !tooltipDescription || !tooltipLink || !regionIndex) {
    throw new Error('На главной странице отсутствуют обязательные элементы интерактивной карты.');
  }

  const pathToRegion = new Map();
  const linksByRegion = new Map();

  Object.entries(regions).forEach(([regionId, region]) => {
    linksByRegion.set(regionId, []);
    region.paths.forEach(pathId => {
      if (pathToRegion.has(pathId)) {
        throw new Error(`SVG-область "${pathId}" назначена более чем одному региону.`);
      }
      const path = document.getElementById(pathId);
      const link = path?.closest('a');
      if (!path || !link || !map.contains(path)) {
        throw new Error(`В конфигурации карты отсутствует SVG-область или ссылка "${pathId}".`);
      }

      pathToRegion.set(pathId, regionId);
      linksByRegion.get(regionId).push(link);
      link.classList.add('map-region-link');
      link.dataset.regionId = regionId;
      link.style.setProperty('--region-color', region.color);
      path.style.fill = region.color;
      link.setAttribute('href', region.href);
      link.setAttribute('aria-label', `${region.label}. ${region.description}. Открыть раздел.`);
      path.setAttribute('aria-hidden', 'true');
    });
  });

  const mapPaths = [...map.querySelectorAll('path.region')];
  if (mapPaths.length !== pathToRegion.size) {
    const unmapped = mapPaths
      .filter(path => !pathToRegion.has(path.id))
      .map(path => path.id || '(без id)');
    throw new Error(`Не все SVG-области назначены региону: ${unmapped.join(', ') || 'число областей не совпадает'}.`);
  }

  const listTriggers = [...regionIndex.querySelectorAll('[data-region-trigger]')];
  listTriggers.forEach(trigger => {
    const regionId = trigger.dataset.regionTrigger;
    const region = regions[regionId];
    if (!region) {
      throw new Error(`Список регионов ссылается на неизвестный раздел "${regionId}".`);
    }
    trigger.style.setProperty('--region-color', region.color);
    trigger.href = region.href;
    if (!linksByRegion.has(regionId) || linksByRegion.get(regionId).length === 0) {
      throw new Error(`У региона "${regionId}" нет интерактивной области на карте.`);
    }
  });

  let touchPrimedRegion = null;
  let lastPointerType = null;
  let activeRegionId = null;
  let tooltipFrame = 0;
  let pendingTooltipPosition = null;
  const narrowViewport = window.matchMedia('(max-width: 700px)');

  function positionTooltip(clientX, clientY) {
    pendingTooltipPosition = { clientX, clientY };
    if (tooltipFrame) return;

    tooltipFrame = requestAnimationFrame(() => {
      tooltipFrame = 0;
      const pointer = pendingTooltipPosition;
      pendingTooltipPosition = null;
      if (!pointer || tooltip.hidden) return;

      if (narrowViewport.matches) {
        tooltip.style.left = '';
        tooltip.style.top = '';
        return;
      }

      const bounds = mapWrap.getBoundingClientRect();
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      const pointerX = Number.isFinite(pointer.clientX) ? pointer.clientX - bounds.left : bounds.width * 0.67;
      const pointerY = Number.isFinite(pointer.clientY) ? pointer.clientY - bounds.top : bounds.height * 0.48;
      const left = Math.max(14, Math.min(pointerX + 16, bounds.width - tooltipWidth - 14));
      const top = pointerY + tooltipHeight + 18 > bounds.height
        ? Math.max(14, pointerY - tooltipHeight - 16)
        : Math.max(14, pointerY + 16);

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    });
  }

  function activateRegion(regionId, clientX, clientY) {
    const region = regions[regionId];
    if (!region) return;

    if (activeRegionId !== regionId) {
      if (activeRegionId) {
        linksByRegion.get(activeRegionId).forEach(link => link.classList.remove('is-active'));
      }
      linksByRegion.get(regionId).forEach(link => link.classList.add('is-active'));
      listTriggers.forEach(trigger => {
        trigger.classList.toggle('is-active', trigger.dataset.regionTrigger === regionId);
      });
      activeRegionId = regionId;
      mapWrap.classList.add('is-interacting');

      tooltipTitle.textContent = region.label;
      tooltipDescription.textContent = region.description;
      tooltipLink.href = region.href;
      tooltip.dataset.regionId = regionId;
      tooltip.style.setProperty('--region-color', region.color);
    }

    tooltip.hidden = false;
    tooltip.classList.add('show');
    positionTooltip(clientX, clientY);
  }

  function clearRegion() {
    if (tooltipFrame) {
      cancelAnimationFrame(tooltipFrame);
      tooltipFrame = 0;
    }
    pendingTooltipPosition = null;

    if (activeRegionId) {
      linksByRegion.get(activeRegionId).forEach(link => link.classList.remove('is-active'));
      listTriggers.forEach(trigger => trigger.classList.remove('is-active'));
      activeRegionId = null;
    }

    mapWrap.classList.remove('is-interacting');
    tooltip.classList.remove('show');
    tooltip.hidden = true;
    tooltip.style.left = '';
    tooltip.style.top = '';
  }

  map.addEventListener('pointerover', event => {
    const link = event.target.closest('[data-region-id]');
    if (link) {
      activateRegion(link.dataset.regionId, event.clientX, event.clientY);
    }
  });

  map.addEventListener('pointermove', event => {
    const link = event.target.closest('[data-region-id]');
    if (link && !tooltip.hidden) {
      positionTooltip(event.clientX, event.clientY);
    }
  });

  map.addEventListener('pointerleave', event => {
    if (event.relatedTarget && (tooltip.contains(event.relatedTarget) || regionIndex.contains(event.relatedTarget))) {
      return;
    }
    clearRegion();
  });

  map.addEventListener('focusin', event => {
    const link = event.target.closest('[data-region-id]');
    if (link) activateRegion(link.dataset.regionId);
  });

  map.addEventListener('focusout', event => {
    if (!map.contains(event.relatedTarget) && !tooltip.contains(event.relatedTarget)) {
      clearRegion();
    }
  });

  regionIndex.addEventListener('pointerover', event => {
    const trigger = event.target.closest('[data-region-trigger]');
    const regionId = trigger?.dataset.regionTrigger;
    if (regionId) activateRegion(regionId);
  });

  regionIndex.addEventListener('pointerleave', event => {
    if (event.relatedTarget && (map.contains(event.relatedTarget) || tooltip.contains(event.relatedTarget))) {
      return;
    }
    clearRegion();
  });

  regionIndex.addEventListener('focusin', event => {
    const trigger = event.target.closest('[data-region-trigger]');
    const regionId = trigger?.dataset.regionTrigger;
    if (regionId) activateRegion(regionId);
  });

  regionIndex.addEventListener('focusout', event => {
    if (!regionIndex.contains(event.relatedTarget) && !tooltip.contains(event.relatedTarget)) {
      clearRegion();
    }
  });

  tooltip.addEventListener('pointerleave', event => {
    if (event.relatedTarget && (map.contains(event.relatedTarget) || regionIndex.contains(event.relatedTarget))) {
      return;
    }
    clearRegion();
  });

  tooltip.addEventListener('focusout', event => {
    if (!tooltip.contains(event.relatedTarget) &&
        !map.contains(event.relatedTarget) &&
        !regionIndex.contains(event.relatedTarget)) {
      clearRegion();
    }
  });

  map.addEventListener('pointerdown', event => {
    lastPointerType = event.pointerType;
    if (event.pointerType === 'touch') {
      const link = event.target.closest('[data-region-id]');
      const regionId = link?.dataset.regionId;
      if (regionId) activateRegion(regionId, event.clientX, event.clientY);
    } else {
      touchPrimedRegion = null;
    }
  });

  map.addEventListener('click', event => {
    const link = event.target.closest('[data-region-id]');
    if (!link || event.detail === 0 || lastPointerType !== 'touch') {
      return;
    }
    if (touchPrimedRegion !== link.dataset.regionId) {
      event.preventDefault();
      touchPrimedRegion = link.dataset.regionId;
      activateRegion(link.dataset.regionId);
    } else {
      touchPrimedRegion = null;
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !tooltip.hidden) {
      clearRegion();
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeMap, { once: true });
