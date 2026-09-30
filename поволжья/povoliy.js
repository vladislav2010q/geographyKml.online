document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('shown');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

reveals.forEach(reveal => {
    observer.observe(reveal);
});

// Обработка кликов по карточкам народов
const peopleCards = document.querySelectorAll('.people-card');

peopleCards.forEach(card => {
    card.addEventListener('click', function() {
        const target = this.getAttribute('data-target');
        const detailSection = document.getElementById(`${target}-section`);
        
        if (detailSection) {
            // Скрываем все секции
            document.querySelectorAll('.people-detail').forEach(section => {
                section.classList.remove('active');
            });
            
            // Показываем нужную секцию
            detailSection.classList.add('active');
            
            // Плавная прокрутка к секции
            setTimeout(() => {
                detailSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    });
});

// Плавная прокрутка для якорных ссылок (если появятся)
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
});
// Функция закрытия детальной секции
function closeDetail(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('active');
    }
}