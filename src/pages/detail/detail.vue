<template>
  <div>
    <book-detail 
      :bookDetail="bookInfo">
    </book-detail>
    <div class="comment">
      <textarea v-model='comment'
                class='textarea'
                :maxlength='100'
                placeholder='请输入图书短评'></textarea>
      <div class='location'>
        地理位置：
        <switch color='#4269AE' :checked='location' @change='getGeo'></switch>
        <span class='text-primary'>{{location}}</span>
      </div>
      <div class='phone'>
        手机型号：
        <switch color='#4269AE' :checked='phone' @change='getPhone'></switch>
        <span class='text-primary'>{{phone}}</span>
      </div>
      <!-- <button class="btn" @click='addComment'>
        评论
      </button> -->
    </div>


  </div>
</template>
<script>
import {get} from 'common/js/util'
import BookDetail from 'components/BookDetail'
export default {
  components: {
    BookDetail
  },
  data() {
    return{
      bookId: '',
      bookInfo: {},
      comment: [],
      phone: '',
      location: ''
    }
  },
  mounted() {
    this.bookId = this.$root.$mp.query.id
    this.getDetails()
  },
  methods: {
    async getDetails() {
      const info = await get('/weapp/bookdetail', {id: this.bookId})
      this.bookInfo = info
      wx.setNavigationBarTitle({
        title: info.title
      })
    },
    getGeo() {

    },
    getPhone(e) {
      console.log('手机型号获取种')
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        // console.log(phoneInfo)
        this.phone = phoneInfo.model
      } else {
        // 没选中
        this.phone = ''
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.comment{
  font-size: 16px;
  margin-top:10px;
  .textarea{
    font-size: 16px;
    margin: 0 auto;
    width: 90%;
    height:200rpx;
    background:#eee;
    padding:10rpx;
  }
  .location{
    margin-top:10px;
    padding:5px 10px;
  }
  .phone{
    margin-top:10px;
    padding:5px 10px;
    
  }
}

</style>
