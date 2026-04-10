/**
 * Дерево навигации: id — для data-active-nav и подсветки пункта.
 * Все подписи и URL соответствуют структуре almatysu.kz.
 */
(function (w) {
  "use strict";

  w.ALMATY_SU = {
    feedbackHref: "zadat-vopros.html",
    topContacts: [
      { label: "Районные аварийные службы", href: "raionnye-avariynye-sluzhby.html" },
      { label: "Открытый люк? Сообщите нам", href: "lyuk-soobshcite.html" },
    ],
    nav: [
      { id: "home", label: "Главная", href: "index.html" },
      {
        id: "potrebitelyam",
        label: "Потребителям",
        href: "potrebitelyam.html",
        children: [
          { id: "tarify", label: "Тарифы", href: "tarify.html" },
          { id: "o-shetchikah", label: "Все о счетчиках", href: "o-shetchikah.html" },
          { id: "podklyuchenie", label: "Подключение к сетям", href: "podklyuchenie-seti.html" },
          { id: "qr-pu", label: "QR код для ПУ", href: "qr-pu.html" },
          { id: "pokazaniya", label: "Передать показания счетчика", href: "pokazaniya-schetchika.html" },
          { id: "centry", label: "Центры по обслуживанию потребителей", href: "centry-obsluzhivaniya.html" },
          { id: "dogovor-kak", label: "Как заключить договор", href: "dogovor-kak.html" },
          { id: "dogovor", label: "Заключение договора", href: "dogovor.html" },
          {
            id: "litczevye",
            label: "Переоформление и оформление лицевых счетов в многоквартирных жилых домах.",
            href: "litczevye-scheta-mkd.html",
          },
        ],
      },
      {
        id: "predpriyatie",
        label: "О Предприятии",
        href: "predpriyatie.html",
        children: [
          { id: "administraciya", label: "Администрация", href: "administraciya.html" },
          { id: "istoriya-vodokanal", label: "История Водоканала", href: "istoriya-vodokanal.html" },
          { id: "zheltoksan", label: "Желтоқсан тұлғалары", href: "zheltoksan-tulgalar.html" },
          { id: "ustav", label: "Устав", href: "ustav.html" },
          { id: "vakansii", label: "Вакансии", href: "vakansii.html" },
          { id: "npa", label: "Список НПА", href: "spisok-npa.html" },
          { id: "goszakupki", label: "Госзакупки", href: "goszakupki.html" },
          { id: "otchety", label: "Отчеты о деятельности", href: "otcheti-deyatelnosti.html" },
          { id: "antikorr", label: "Противодействие коррупции", href: "protivodeystvie-korrupcii.html" },
        ],
      },
      {
        id: "vodosnabzhenie",
        label: "Водоснабжение",
        href: "vodosnabzhenie.html",
        children: [
          { id: "istochniki", label: "Источники водоснабжения", href: "istochniki-vodosnabzheniya.html" },
          { id: "obezarazhivanie", label: "Обеззараживание воды", href: "obezarazhivanie-vody.html" },
          { id: "kontrol-kachestva", label: "Контроль качества воды", href: "kontrol-kachestva-vody.html" },
        ],
      },
      {
        id: "kanalizaciya",
        label: "Канализация",
        href: "kanalizaciya.html",
        children: [
          { id: "seti-kanal", label: "Сети канализации", href: "seti-kanalizacii.html" },
          { id: "istoriya-kanal", label: "История канализации Алматы", href: "istoriya-kanalizacii-almaty.html" },
          { id: "ochistka-stokov", label: "Очистка стоков", href: "ochistka-stokov.html" },
          { id: "lyuk", label: "Открытый люк? Сообщите нам", href: "lyuk-soobshcite.html" },
          { id: "koso", label: "Канализационные очистные сооружения", href: "kanalizacionnye-ochistnye-sooruzheniya.html" },
          { id: "nakopiteli", label: "Накопители сточных вод", href: "nakopiteli-stochnyh-vod.html" },
        ],
      },
      {
        id: "press",
        label: "Пресс-служба",
        href: "press-sluzhba.html",
        children: [
          { id: "video", label: "Видео галерея", href: "video-galereya.html" },
          { id: "vse-o-vode", label: "Все о воде и канализации", href: "vse-o-vode-i-kanalizacii.html" },
          { id: "vod-almaty", label: "Водоснабжение Алматы", href: "vodosnabzhenie-almaty.html" },
          { id: "mikroby", label: "Как микробы очищают стоки", href: "kak-mikroby-ochishhayut-stoki.html" },
          { id: "nasosnye", label: "Канализационные насосные станции", href: "kanalizacionnye-nasosnye-stancii.html" },
          { id: "teleinspekciya", label: "Телеинспекция", href: "teleinspekciya.html" },
          { id: "unitaz", label: "Унитаз не помойное ведро", href: "unitaz-ne-pomojnoe-vedro.html" },
          { id: "zhestkost", label: "О жесткости воды", href: "o-zhestkosti-vody.html" },
          { id: "promerzanie", label: "Почему промерзают водопроводы", href: "pochemu-promerzayut-vodoprovody.html" },
          { id: "su-kermekti", label: "Судың кермектігі туралы", href: "su-kermektigi-turaly.html" },
          { id: "gosy", label: "ГОСы", href: "gosy.html" },
          { id: "uchastok-kanal", label: "О работе участка канализационных сетей", href: "o-rabote-uchastka-kanalizacionnyh-setey.html" },
          { id: "ekspluataciya-vod", label: "Эксплуатация водопроводных сетей", href: "ekspluataciya-vodoprovodnyh-setey.html" },
          { id: "tochki-sliva", label: "Точки незаконного слива стоков.", href: "tochki-nezakonogo-sliva-stokov.html" },
          { id: "kachestvo-pitevoy", label: "Качество питьевой воды", href: "kachestvo-pitevoy-vody.html" },
          { id: "kuda-stoki", label: "Куда уходят стоки? О системе канализации Алматы", href: "kuda-uhodyat-stoki.html" },
          { id: "novosti", label: "Новости", href: "novosti.html" },
          { id: "vopros", label: "Задать вопрос", href: "zadat-vopros.html" },
        ],
      },
      {
        id: "kontakty",
        label: "Контакты",
        href: "kontakty.html",
        children: [
          { id: "raionnye-avariynye", label: "Районные аварийные службы", href: "raionnye-avariynye-sluzhby.html" },
          {
            id: "centry-kontakty",
            label: "Центры по обслуживанию потребителей",
            href: "centry-kontakty.html",
          },
        ],
      },
    ],
  };

  function walkNav(items, fn) {
    (items || []).forEach(function (item) {
      fn(item);
      if (item.children) walkNav(item.children, fn);
    });
  }

  /** Поиск цепочки от корня до id для «хлебных крошек» */
  w.ALMATY_SU_findTrail = function (activeId) {
    var trail = [];
    if (!activeId || activeId === "home") {
      return w.ALMATY_SU.nav[0] ? [w.ALMATY_SU.nav[0]] : [];
    }
    function findIn(items, stack) {
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var next = stack.concat([it]);
        if (it.id === activeId) {
          trail = next;
          return true;
        }
        if (it.children && findIn(it.children, next)) return true;
      }
      return false;
    }
    findIn(w.ALMATY_SU.nav, []);
    return trail;
  };

  w.ALMATY_SU_findById = function (id) {
    var found = null;
    walkNav(w.ALMATY_SU.nav, function (item) {
      if (item.id === id) found = item;
    });
    return found;
  };

  w.ALMATY_SU_flatNavLinks = function () {
    var out = [];
    walkNav(w.ALMATY_SU.nav, function (item) {
      if (item.href && item.id !== "home") out.push({ id: item.id, label: item.label, href: item.href });
    });
    return out;
  };
})(window);
