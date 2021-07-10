import config from "./config.js"

const globalFonts = [{
  family: 'Gotham',
  src: 'Gotham-Light.woff',
  desc: {
    weight: "300",
    style: "normal",
  }
}, {
  family: 'Gotham',
  src: 'Gotham-Medium.woff',
  desc: {
    weight: "500",
    style: "normal",
  }
}, {
  family: 'Gotham',
  src: 'Gotham-Ultra.woff',
  desc: {
    weight: "900",
    style: "normal",
  }
}]

globalFonts.forEach(item => {
  uni.loadFontFace({
    global: true,
    family: item.family,
    source: `url("${config.fontsBaseUrl}/${item.src}")`,
    desc: item.desc,
    fail(res) {
      console.log('Fonts Err----------->', res)
    }
  })
})
