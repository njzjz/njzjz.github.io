const sitemap = require("@njzjz/sitemap");
hexo.config.njzjz_sitemap = sitemap;

hexo.extend.tag.register('njzjz_sitemap', function(args) {
    var html = "";
    sitemap.site.forEach(function (site) {
        html += `<h3>${site.name}</h3><ul>`;
        site.site.forEach(function (subsite) {
            html += `<li><a href="${subsite.url}"><i class="${subsite.icon}"></i> ${subsite.name}</a></li>`;
        })
        html += "</ul>";
    })
    return html;
});
