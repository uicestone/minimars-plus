function loadFont(family, weight, filename) {
  return new Promise((resolve, reject) => {
    uni.loadFontFace({
      family: family,
      desc: {
        weight,
      },
      source: `url("https://s.mini-mars.com/fonts/${filename}")`,
      success() {
        resolve();
      },
      fail() {
        reject();
      },
    });
  }).catch((e) => {});
}

module.exports = loadFont;
