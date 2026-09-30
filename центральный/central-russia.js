const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('shown');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const reveals = document.querySelectorAll('.reveal');
reveals.forEach(reveal => observer.observe(reveal));

// Клики по карточкам народов
const peopleCards = document.querySelectorAll('.people-card');

peopleCards.forEach(card => {
    card.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        const detailSection = document.getElementById(`${target}-section`);

        if (detailSection) {
            document.querySelectorAll('.people-detail').forEach(section => {
                section.classList.remove('active');
            });

            detailSection.classList.add('active');

            setTimeout(() => {
                detailSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50);
        }
    });
});

// Якорные ссылки
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Закрытие детальной секции
function closeDetail(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('active');
    }
}