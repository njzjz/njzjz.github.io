const Experience = function ([image = '/images/avatar.gif', delimiter = '|', comment = '%'], content) {
    const links = content.split('\n').filter(line => line.trim() !== '').map(line => {
        const item = line.split(delimiter).map(arg => arg.trim());
        if (item[0][0] === comment) return '';
        const imageSource = item[3] || image;
        const hasExtension = /\.[^/]+$/.test(imageSource);
        return `<div class="experience-container">
  <object class="experience-image" ${hasExtension ? '' : 'type="image/jpeg" '}data="${imageSource}"></object>
  <p>${item[0]}</p><p>${item[1]}</p><p>${item[2]}</p>
  </div>`;
    });
    return `<div class="experience">${links.join('')}</div>`;
};
hexo.extend.tag.register('experience', Experience, true);
