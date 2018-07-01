<template>
  <a :href="detailUrl">
    <div class="card" v-show="book">
      <div class="thumb">
        <img :src="book.image" alt="" class="image" mode="aspectFit">
      </div>
      <div class="detail">
        <div class="row">
          <div class="right rate">
            <rate :rate="+book.rate"></rate>
            {{book.rate}}
          </div>
          <div class="left title">
            {{book.title}}
          </div>
        </div>
        <div class="row">
          <div class="right publisher">
            浏览量:{{book.count}}
          </div>
          <div class="left aurhor">
            {{book.author}}
          </div>
        </div>
        <div class="row">
          <div class="right publisher">
            添加人:{{book.user_info.nickName}}
          </div>
          <div class="left publisher">
            {{book.publisher}}
          </div>
        </div>
      </div>
    </div>
  </a>
</template>
<script>
import Rate from 'components/Rate'

export default {
  components: {
    Rate
  },
  props: {
    book: {
      type: Object,
      default: {}
    }
  },
  computed: {
    detailUrl() {
      return '/pages/detail/main?id=' + this.book.id 
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  font-size: 14px;
  margin: 5px;
  padding: 5px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 2px solid #e7e3e3ef;
  .thumb {
    width: 90px;
    height: 90px;
    float: left;
    margin: 0 auto;
    .image {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .detail {
    margin-left: 100px;
    .row {
      line-height: 20px;
      margin-bottom: 3px;
      .right {
        float: right;
      }
      // .left{
      //   float: left;
      // }
      .title {
        font-weight: bold;
      }
      .publisher {
        font-size: 12px;
        color: #555;
      }
      .rate {
        color: #DD4316;
      }
      .aurhor{
        color: #4269AE;
      }
    }
  }
}
</style>

