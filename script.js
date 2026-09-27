/* =========================================================
   DCDozer — небольшие скрипты страницы

   Здесь всего две задачи:
   1) подставить текущий год в футер;
   2) плавно показывать секции при прокрутке.

   Стаж (2008 / 2011) вписан прямо в HTML — в тексте
   «Обо мне». Никаких автоподсчётов и дублирований нет.
   ========================================================= */

(function () {
    'use strict';

    /* -----------------------------------------------------
       Год в футере
       ----------------------------------------------------- */
    function setFooterYear() {
        var el = document.getElementById('footer-year');
        if (el) el.textContent = new Date().getFullYear();
    }

    /* -----------------------------------------------------
       Плавное появление блоков с классом .reveal

       Используем IntersectionObserver: как только блок
       попадает в область просмотра — добавляем ему класс .in,
       и CSS-переход отрабатывает анимацию.

       Если браузер не поддерживает IntersectionObserver,
       просто показываем все блоки сразу.
       ----------------------------------------------------- */
    function initReveal() {
        var items = document.querySelectorAll('.reveal');

        if (!('IntersectionObserver' in window)) {
            items.forEach(function (node) {
                node.classList.add('in');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    // дальше за этим блоком следить не нужно
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        items.forEach(function (node, index) {
            // лёгкая задержка — блоки появляются «лесенкой»
            node.style.transitionDelay = Math.min(index % 3, 2) * 60 + 'ms';
            observer.observe(node);
        });
    }

    /* -----------------------------------------------------
       Точка входа
       ----------------------------------------------------- */
    function init() {
        setFooterYear();
        initReveal();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();