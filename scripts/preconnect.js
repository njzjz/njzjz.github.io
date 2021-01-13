const preconnect_domains = [
    "https://comment.njzjz.win",
    "https://www.google-analytics.com",
];

preconnect_domains.forEach(domain =>
    hexo.extend.injector.register('head_end', `<link rel="preconnect" href="${domain}" crossorigin>`)
);
