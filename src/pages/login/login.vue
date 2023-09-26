<template>
  <view>
    <view id="register">
      <u-link text="立即注册" @click="registerRouter" mpTips=""></u-link>
    </view>
  </view>
  <view id="body">
    <view style="display: flex;flex-direction: column;align-items: center;">
      <image id="logo" src="./static/login/logo.png"/>
      <text style="font-size: 29rpx;color: #666666;margin-top: 29rpx;">AI智能题库让学习更高效</text>
    </view>

    <view id="login">
      <view id="mobile">
        <up-input
            placeholder="请输入手机号"
            prefixIcon="phone"
            border="bottom"
            v-model="login.userInfo.phoneMobile"
            prefixIconStyle="font-size: 22px;color: #909399"
        ></up-input>
      </view>
      <view id="password">
        <up-input
            placeholder="请输入密码"
            prefixIcon="lock"
            border="bottom"
            v-model="login.userInfo.password"
            prefixIconStyle="font-size: 22px;color: #909399"
            type="password"
        >
          <template #suffix>
            <u-link href="" text="忘记密码？" @click="lostPasswordRouter"></u-link>
          </template>
        </up-input>
      </view>
      <view id="submit">
        <up-button type="primary" text="登陆" @click="loginIndex"></up-button>
      </view>

      <view class="footer">
        <u-divider text="其他登陆方式" :hairline="true"></u-divider>
        <view class="verifyCodeLogin">
          <u-icon
              name="../../../../static/login/yanzhengma.png"
              size="30"
              color="#909399"
              @click="verifyLoginRouter"
              label="验证码"
              labelPos="bottom"
          ></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref} from "vue";
import {useStore} from 'vuex'

const store = useStore()
const login = ref({
  userInfo: {
    phoneMobile: "",
    password: ""
  }
})

function registerRouter() {
  uni.navigateTo({
    url: '/pages/register/register'
  });
}

function lostPasswordRouter() {
  uni.navigateTo({
    url: '/pages/lostPassword/lostPassword'
  });
}

function verifyLoginRouter() {
  uni.navigateTo({
    url: '/pages/verifyLogin/verifyLogin'
  });
}

function loginIndex() {
  let data = JSON.stringify({
    "phone": login.value.userInfo.phoneMobile,
    "password": login.value.userInfo.password,
    "loginType": "pwd",
    "terminal": "wx"
  });

  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/user/login',
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data: data,
    success: function (response) {
      store.commit('updateToken', response.data.data.token)
      let flag = uni.getStorageSync("flag")
      console.log("flag:", flag)
      if (!flag) {
        uni.navigateTo({
          url: "/pages/start/xuanzekaoshi-one"
        })
      } else {
        uni.switchTab({
          url: '/pages/home/classification/classificationMain'
        });
      }
      // console.log(store.getters.getToken)
    },
    fail: function (error) {
      console.log(error);
    }
  });
}
</script>

<style lang="scss">
#register {
  padding: 12px 14px 9px 280px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(38, 38, 38, 1);
  font-size: 20px;
  font-family: "PingFang SC", serif;
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
  line-height: 25px;
}

#body {
  padding: 75px 16px 90px 16px;

  #logo {
    width: 84px;
    height: 84px;
    display: block;
    margin: 0 auto;
  }

  #login {
    margin-top: 101px;
    margin-bottom: 210px;

    #mobile {
      display: block;
      margin-bottom: 15px;
    }

    #password {
      display: block;
      margin-bottom: 30px;
    }

    #submit {
      display: block;
      margin-bottom: 80px;
    }

    .footer {
      .verifyCodeLogin {
        text-align: center;
      }
    }
  }


  input::placeholder {
    font-size: 3px;
  }
}


</style>
