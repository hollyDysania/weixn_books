<template> 
  <div class="container"> 
    <div class="userinfo" > 
      <img :src="userinfo.avatarUrl" alt=""> 
      <p v-if="userinfo.openId">欢迎，{{userinfo.nickName}}</p> 
    </div> 
    <button v-if='userinfo.openId' class="btn" @click="scanBook" hover-class="button-hover">添加图书</button> 
    <button v-else open-type="getUserInfo" hover-class="button-hover" @getuserinfo="login" type="primary">点击登录</button> 
  </div> 
</template>
<script>
import { showSuccess, post, showModal } from 'common/js/util'
import qcloud from 'wafer2-client-sdk'
import config from 'common/js/config'

export default {
  data() {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/tab/my.png',
        nickName: ''
      }
    }
  },
  onShow() {
    let userinfo = wx.getStorageSync('userInfo')
    console.log([userinfo])
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
  methods: {
    scanBook() {
      // 允许从相机和相册扫码
      wx.scanCode({
        success: res => {
          console.log(res)
        }
      })
    },
    // 登陆并获取信息
    getWxLogin: function({ encryptedData, iv, userinfo }) {
      const self = this
      wx.login({
        success: function(loginResult) {
          var loginParams = {
            code: loginResult.code,
            encryptedData: encryptedData,
            iv: iv
          }
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.requestLogin({
            loginParams,
            success() {
              // 获取用户信息
              qcloud.request({
                url: config.userUrl,
                login: true,
                success(userRes) {
                  showSuccess('登陆成功')
                  wx.setStorageSync('userInfo', userRes.data.data)
                  self.userinfo = userRes.data.data
                  console.log(self.userinfo, 666)
                }
              })
            },
            fail(error) {
              showModal('登陆失败', error)
            }
          })
        },
        fail: function(loginError) {
          showModal('登陆失败', loginError)
        }
      })
    },
    login(e) {
      console.log(e, 5555)
      const self = this
      //查看是否授权
      wx.getSetting({
        success: function(res) {
          // 有
          if (res.authSetting['scope.userInfo']) {
            // 检查是否登陆过期
            wx.checkSession({
              success: function() {
                // 没
                showSuccess('登陆成功')
              },
              fail: function() {
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
            showModal('用户未授权', e.mp.detail.errMsg)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.container {
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
    // padding: 10rpx;
    margin-top: 20rpx;
    background: #4269ae;
    color: #fff;
  }
}
</style>

