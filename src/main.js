import Vue from 'vue'
import App from './App'
// 生成环境 提示关闭
Vue.config.productionTip = false

const app = new Vue(App)
// 手动挂载
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    // pages: [ '^pages/my-center/main'],
    pages: [ '^pages/comment/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#4269AE',
      navigationBarTitleText: '小小图书馆',
      navigationBarTextStyle: 'light'
    },
    "tabBar": {
      selectedColor: '#4269AE',
      list: [
        {
          pagePath: 'pages/books/main',
          text: '图书',
          iconPath: 'static/img/tab/book.png',
          selectedIconPath: 'static/img/tab/book-active.png'
        },
        {
          pagePath: 'pages/comment/main',
          text: '评论',
          iconPath: 'static/img/tab/comment.png',
          selectedIconPath: 'static/img/tab/comment-active.png'
        },
        {
          pagePath: 'pages/my-center/main',
          text: '我的',
          iconPath: 'static/img/tab/my.png',
          selectedIconPath: 'static/img/tab/my-active.png'
        }
      ]
    }
  }
}
