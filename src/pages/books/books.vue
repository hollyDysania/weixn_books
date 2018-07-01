<template>
  <div>
    <top-swiper :topImages="tops"></top-swiper>
    <card v-for="book in books" :key="book.id" :book="book">
      {{book.title}}
    </card>
    <p v-if="!more" class="text-footer">没有更多数据</p>
  </div>
</template>
<script>
import { get } from 'common/js/util'
import Card from 'components/Card'
import TopSwiper from 'components/TopSwiper'
export default {
  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      books: [],
      currentPage: 0,
      more: true,
      tops: []
    }
  },
  mounted () {
    this.getbooksList(true)
    this.getTopImage()
  },
  methods: {
    // 获取轮播图
    async getTopImage() {
      const tops = await get('/weapp/top')
      this.tops = tops.list
      console.log(this.tops)
    },
    async getbooksList (init) {
      wx.showNavigationBarLoading()
      if(init) {
        this.currentPage = 0
        this.more = true
      }
      let bookList = await get('/weapp/booklist', {page: this.currentPage})
      if(bookList.list.length < 10 && this.currentPage > 0) {
        this.more = false
      }
      if(init) {
        this.books = bookList.list
        wx.stopPullDownRefresh()
      } else {
        console.log(this.books)
        this.books = this.books.concat(bookList.list)
        console.log(this.books, 666)
      }
      wx.hideNavigationBarLoading()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getbooksList(true)
    this.getTopImage()
  },
  // 上拉加载更多
  onReachBottom() {
    if(!this.more) {
      return
    }
    this.currentPage += 1
    this.getbooksList()
  }
}
</script>
<style lang="scss" scope> 
.text-footer{
  text-align: center;
  color: #666;
  font-size: 12px;
  margin-bottom: 5px;
}
</style>

