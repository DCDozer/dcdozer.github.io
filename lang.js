/* =========================================================
   DCDozer — выбор языка
   1) На корне ("/") — редирект на /ru/ или /en/ с учётом
      сохранённого выбора и navigator.language.
   2) На языковых страницах — запоминаем выбор при клике
      по переключателю (data-lang="ru" / "en").
   ========================================================= */

(function () {
    'use strict';

    var KEY = 'preferred-lang';

    /* ---------- Корень: редирект ---------- */
    if (document.documentElement.hasAttribute('data-root-redirect')) {
        var saved = null;
        try { saved = localStorage.getItem(KEY); } catch (e) { /* ignore */ }

        var lang = saved
            || ((navigator.languages && navigator.languages[0]) || navigator.language || 'en')
                 .toLowerCase().slice(0, 2);

        var dir = (lang === 'ru') ? 'ru/' : 'en/';
        var target = new URL(dir, document.baseURI).href;
        window.location.replace(target);
        return;
    }

    /* ---------- Языковые страницы: запоминаем выбор ---------- */
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('[data-lang]').forEach(function (link) {
            link.addEventListener('click', function () {
                try {
                    localStorage.setItem(KEY, link.getAttribute('data-lang'));
                } catch (e) { /* приватный режим — молча игнорируем */ }
            });
        });
    });
})();