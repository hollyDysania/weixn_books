<template>
    <div class="swiper">
      <swiper
      :indicator-dots="true"
      indicator-color="#999"
      indicator-active-color='#4269ae'
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true">
        <div v-for="(item, imgindex) in imgUrl" :key="imgindex">
          <swiper-item>
            <img class="slide-image" mode="aspectFit" v-for="img in item" :key="img.id" :src="img.image" @click="bookDetail(img)">
          </swiper-item>
        </div>
      </swiper>
    </div>
</template>
<script>
import _ from 'lodash/array'
export default {
  props: {
    topImages: {
      type: Object,
      default: {}
    }
  },
  computed: {
    imgUrl() {
      let res = this.topImages
      return _.chunk(res, 3)
    }
  },
  methods: {
    bookDetail(img) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + img.id
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper {
  margin-top: 5px;
  .slide-image {
    width: 33%;
    height: 250rpx;
  }
}
</style>
