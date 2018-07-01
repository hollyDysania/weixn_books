<template>
  <div class="bookInfo">
    <div class="thumb">
      <img class="background" 
      :src="bookDetail.image"
      mode="aspectFill">
      <img :src="bookDetail.image"
      mode="aspectFit"
      class="image">
      <div class="info">
        <div class="title">
          {{bookDetail.title}}
        </div>
        <div class="author">
          {{bookDetail.author}}
        </div>
      </div>
    </div>
    <div class="detail">
      <img :src="userinfo.image" class='avatar' mode='aspectFit'>
      {{userinfo.name}}
      <div class="right text-primary">
        {{bookDetail.rate}}分
        <Rate :rate='bookDetail.rate'></Rate>
      </div>
    </div>
    <div class="detail publisher">
      {{bookDetail.publisher}}
      <div class="right">
        {{bookDetail.price}}
      </div>
    </div>
    <div class="tags">
      <div class="badge" :key='tag' v-for='tag in bookDetail.tags'>{{tag}}</div>
    </div>
    <div class="summary">
      <p :key='i' v-for='(sum,i) in bookDetail.summary'>{{sum}}</p>
    </div>
  </div>
</template>
<script>
import Rate from 'components/Rate'
export default {
  components: {
    Rate
  },
  props: {
    bookDetail: {
      type: Object,
      default: {}
    }
  },
  computed: {
    userinfo() {
      return this.bookDetail.user_info || {}
    }
  }
}
</script>
<style lang="scss" scoped>
.bookInfo{
  font-size: 16px;
  .thumb{
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
   .background{
     filter: blur(15px);
     width: 100%;
   }
   .image{
     position: absolute;
     height: 300rpx;
     width: 100%;
     top: 30rpx;
     left: 0;
   }
   .info{
     color: #fff;
     position: absolute;
     width: 100%;
     text-align: center;
     left: 0;
     top: 330rpx;
     line-height: 30px;
   }
   .title{
     font-size: 20px;
   }
   .author{
     font-size: 14px;
   } 
  }
  .badge{
    font-size: 12px;
    display: inline-block;
    margin:5px;
    padding:5px;
    border:1px #4269AE solid;
    color:#4269AE;
  }
  .summary{
    padding:0 15px;
    margin-top:10px;
    p{
      text-indent: 2em;
      font-size:14px;
      color: #333;
    }
  }
  .right{
    float: right;
  }
  .detail{
    padding:5px 10px;
    .avatar{
      width:20px;
      height:20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }

}
</style>
