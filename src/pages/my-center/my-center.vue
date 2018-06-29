<template> 
  <div class="container"> 
    <div class="userinfo" > 
      <img :src="userinfo.avatarUrl" alt=""> 
      <p v-if="userinfo.openId">欢迎，{{userinfo.nickName}}</p> 
    </div>
    <div class="propress">
      <time-progress :percent="percent" :desc="`${year}年已经过去了${days}天，今天也要加油哦~`"></time-progress>
    </div> 
    <button v-if='userinfo.openId' class="btn" @click="scanBook" hover-class="button-hover">添加图书</button> 
    <button v-else open-type="getUserInfo" hover-class="button-hover" @getuserinfo="login" type="primary">点击登录</button> 
  </div> 
</template>
<script>
import { showSuccess, post, showModal } from 'common/js/util'
import qcloud from 'wafer2-client-sdk'
import config from 'common/js/config'
import TimeProgress from 'components/TimeProgress'

export default {
  components: {
    TimeProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/tab/au.jpg',
        nickName: ''
      }
    }
  },
  onShow () {
    let userinfo = wx.getStorageSync('userInfo')
    console.log([userinfo])
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      // 将satr设置为今年的第一天
      start.setMonth(0)
      start.setDate(1)
      // 今天的时间戳减去今年第一天的时间戳
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      let year = this.isLeapYear() ? 366 : 365
      let percent = (this.days * 100 / year).toFixed(1)
      return percent
    }
  },
  methods: {
    // 是否为闰年
    isLeapYear () {
      const year = new Date()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    // 添加图书
    async addBook (isbn) {
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      console.log(res, 66666899)
      showModal('添加成功', `${res.title}添加成功`)
    },
    // 图书-扫码
    scanBook () {
      // 允许从相机和相册扫码
      wx.scanCode({
        success: res => {
          console.log(res)
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    // 登陆并获取信息
    getWxLogin: function ({ encryptedData, iv, userinfo }) {
      const self = this
      wx.login({
        success: function (loginResult) {
          var loginParams = {
            code: loginResult.code,
            encryptedData: encryptedData,
            iv: iv
          }
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.requestLogin({
            loginParams,
            success () {
              // 获取用户信息
              qcloud.request({
                url: config.userUrl,
                login: true,
                success (userRes) {
                  showSuccess('登陆成功')
                  wx.setStorageSync('userInfo', userRes.data.data)
                  self.userinfo = userRes.data.data
                  console.log(self.userinfo, 666)
                }
              })
            },
            fail (error) {
              showModal('登陆失败', error)
            }
          })
        },
        fail: function (loginError) {
          showModal('登陆失败', loginError)
        }
      })
    },
    login (e) {
      console.log(e, 5555)
      let localUser = wx.getStorageSync('userInfo')
      const self = this
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          // 有
          if (res.authSetting['scope.userInfo']) {
            // 检查是否登陆过期
            wx.checkSession({
              success: function () {
                // 没
                if (!localUser) {
                  var options = {
                    encryptedData: e.mp.detail.encryptedData,
                    iv: e.mp.detail.iv,
                    userinfo: e.mp.detail.userinfo
                  }
                  self.getWxLogin(options)
                }
                console.log(res, 666)
                showSuccess('登陆成功')
              },
              fail: function () {
                // 过期 重新登陆
                qcloud.clearSession()
                // 登陆 需要加密信息
                var options = {
                  encryptedData: e.mp.detail.encryptedData,
                  iv: e.mp.detail.iv,
                  userinfo: e.mp.detail.userinfo
                }
                self.getWxLogin(options)
              }
            })
          } else {
            showModal('请再次点击登陆', '建议授权微信登陆')
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.container {
  font-size: 14px;
  padding: 0 30rpx;
  .userinfo {
    margin-top: 100rpx;
    text-align: center;
    img {
      height: 150rpx;
      width: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
  .btn {
    background: #4269ae;
    color: #fff;
  }
}
</style>

