<template>
  <div class="propress">
    <progress :percent="percent" :stroke-width="width" :activeColor="color" :active="animate" :show-info="showInfo"/>
    <p>{{desc}}</p>
  </div>
</template>
<script>
  export default{
    props: {
      percent: {
        type: Number,
        default: 0
      },
      width: {
        type: Number,
        default: 6
      },
      color: {
        type: String,
        default: '#4269ae'
      },
      animate: {
        type: Boolean,
        default: true
      },
      showInfo: {
        type: Boolean,
        default: false
      },
      desc: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style>
.propress{
  text-align: center;
  margin: 10rpx;
}
</style>
