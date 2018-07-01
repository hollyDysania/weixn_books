<template>
  <div class="rate">
    <span>☆☆☆☆☆</span>
    <span class="cover" :style="rateStyle">★★★★★</span>
  </div>
</template>
<script>
export default {
  props: {
    rate: {
      type: Number,
      default: 0
    }
  },
  computed: {
    rateStyle () {
      return `width:${(this.rate * 14 / 2 * 0.8)}px`
    }
  }
}
</script>
<style lang="scss" scoped>
.rate {
  color: #DD4316;
  position: relative;
  display: inline-block;
  font-size: 16px;
  .cover {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    overflow: hidden;
  }
}
</style>
