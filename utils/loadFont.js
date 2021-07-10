function loadFont(family, weight, filename) {
  return new Promise((resolve)=>{
    uni.loadFontFace({
      family: family,
      desc: {
        weight
      },
      source: `url("https://s.mini-mars.com/fonts/${filename}")`,
      success() {
        resolve();
      }
    });
  });
}

module.exports = loadFont;