(function () {
  "use strict";

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderNewsFeed(items) {
    return items
      .map(function (item) {
        return (
          '<article class="content-card"><h3><a href="' +
          escapeHtml(item.href) +
          '" rel="noopener noreferrer">' +
          escapeHtml(item.title) +
          '</a></h3><div class="content-card__meta"><time datetime="' +
          escapeHtml(item.dateIso) +
          '">' +
          escapeHtml(item.dateLabel) +
          "</time></div><p>" +
          escapeHtml(item.summary) +
          '</p><a class="read-more" href="' +
          escapeHtml(item.href) +
          '" rel="noopener noreferrer">' +
          escapeHtml(item.readMoreLabel || "На сайте") +
          "</a></article>"
        );
      })
      .join("");
  }

  fetch("/api/content/pages")
    .then(function (r) {
      if (!r.ok) throw new Error("fetch_failed");
      return r.json();
    })
    .then(function (payload) {
      if (!payload || !payload.ok || !payload.content) return;
      var content = payload.content;

      var newsFeedRoot = document.getElementById("news-page-feed");
      var newsArchiveRoot = document.getElementById("news-page-archive");
      if (newsFeedRoot && content.newsPage && Array.isArray(content.newsPage.feed)) {
        newsFeedRoot.innerHTML = renderNewsFeed(content.newsPage.feed);
      }
      if (newsArchiveRoot && content.newsPage) {
        newsArchiveRoot.innerHTML =
          "<p>" +
          escapeHtml(content.newsPage.archiveText || "") +
          ' <a href="' +
          escapeHtml(content.newsPage.archiveLinkUrl || "#") +
          '" rel="noopener noreferrer">' +
          escapeHtml(content.newsPage.archiveLinkLabel || "") +
          "</a>.</p>";
      }

      var antikorrDocsRoot = document.getElementById("antikorr-documents");
      var antikorrContactsRoot = document.getElementById("antikorr-contacts");
      if (antikorrDocsRoot && content.antiCorruptionPage && Array.isArray(content.antiCorruptionPage.documents)) {
        antikorrDocsRoot.innerHTML = content.antiCorruptionPage.documents
          .map(function (doc) {
            return '<li><a href="' + escapeHtml(doc.href) + '" rel="noopener noreferrer">' + escapeHtml(doc.title) + "</a></li>";
          })
          .join("");
      }
      if (antikorrContactsRoot && content.antiCorruptionPage) {
        antikorrContactsRoot.innerHTML =
          "<p>С 1 марта 2022 года на предприятии действует служба антикоррупционного комплаенса.</p>" +
          "<p>Если вы столкнулись с неправомерными действиями сотрудников, сообщите об этом:</p>" +
          "<ul><li>телефон: <a href=\"tel:" +
          escapeHtml(content.antiCorruptionPage.contactsPhone || "") +
          '">' +
          escapeHtml(content.antiCorruptionPage.contactsPhone || "") +
          "</a></li><li>адрес электронной почты для обращений указан на <a href=\"" +
          escapeHtml(content.antiCorruptionPage.contactsEmailLinkUrl || "#") +
          '" rel="noopener noreferrer">' +
          escapeHtml(content.antiCorruptionPage.contactsEmailLinkLabel || "") +
          "</a></li></ul><p>Конфиденциальность и анонимность гарантируются.</p>";
      }
    })
    .catch(function () {});
})();
