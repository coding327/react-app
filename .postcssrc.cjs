module.exports = {
  plugins: {
    //...
    'autoprefixer': {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ]
    },
    'postcss-pxtorem': {   // px=rem
      rootValue: 37.5, // antd mobile (你切图的设计稿宽度是375，这里就是37.5，如果你的设计稿宽度是750，这里就是75 )
      propList: ['*']
    }
  }
}