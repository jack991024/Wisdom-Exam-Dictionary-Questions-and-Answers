<template>
  <view>
    <view id="register">
      <u-link text="立即注册" @click="registerRouter" mpTips=""></u-link>
    </view>
  </view>
  <view id="body">
    <view style="display: flex; flex-direction: column; align-items: center">
      <image id="logo" src="./static/login/logo.png" />
      <text style="font-size: 29rpx; color: #666666; margin-top: 29rpx"
        >AI智能题库让学习更高效</text
      >
    </view>

    <view id="login">
      <view class="wechatLogin" @click="wechatLogin">
        <image
          src="./static/login/wechatLogin.png"
          mode="widthFix"
          style="width: 41.15rpx; height: 34.04rpx"
        ></image>
        <text style="font-size: 33rpx; color: #ffffff; margin-left: 13rpx">
          微信登陆</text
        >
      </view>

      <view style="display: flex; align-items: center; margin-top: 22rpx">
        <u-radio-group v-model="isRadioSelected">
          <u-radio shape="square" />
        </u-radio-group>
        <view>
          <text style="color: rgba(197, 200, 207, 1); font-size: 12px">
            点击"按钮勾选"即同意
            <text @click="navigateToPrivacyPolicy" class="link-text">
              《智考典隐私政策》
            </text>
            及
            <text @click="navigateToServiceAgreement" class="link-text">
              《智考典用户服务协议》
            </text>
          </text>
        </view>
      </view>

      <view class="footer">
        <u-divider text="其他登陆方式" :hairline="true"></u-divider>
        <view class="verifyCodeLogin">
          <view style="margin-right: 100rpx">
            <u-icon
              name="../../../../static/login/yanzhengma.png"
              size="30"
              color="#909399"
              @click="verifyLoginRouter"
              label="验证码登陆"
              labelPos="bottom"
            ></u-icon>
          </view>
          <u-icon
            name="../../../../static/login/mima.png"
            size="30"
            color="#909399"
            @click="passwordLoginRouter"
            label="密码登陆"
            labelPos="bottom"
          ></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isRadioSelected = ref(false);

const wechatLogin = () => {
  let code = "";
  uni.login({
    provider: "weixin", //使用微信登录
    success: function (loginRes) {
      code = loginRes.code;
      console.log(loginRes);
      loginIndex(code);
    },
  });
  uni.navigateTo({
    // url:"/pages/start/xuanzekaoshi-one"
  });
};

const navigateToPrivacyPolicy = () => {
  // 使用uni.navigateTo或其他导航方法跳转到隐私政策页面
  uni.navigateTo({
    url: "/pages/register/policy",
  });
};

const navigateToServiceAgreement = () => {
  // 使用uni.navigateTo或其他导航方法跳转到用户服务协议页面
  uni.navigateTo({
    url: "/pages/register/FAQ",
  });
};

function registerRouter() {
  uni.navigateTo({
    url: "/pages/register/register",
  });
}

function lostPasswordRouter() {
  uni.navigateTo({
    url: "/pages/lostPassword/lostPassword",
  });
}

function verifyLoginRouter() {
  uni.navigateTo({
    url: "/pages/verifyLogin/verifyLogin",
  });
}

function passwordLoginRouter() {
  uni.navigateTo({
    url: "/pages/login/login",
  });
}

function loginIndex(code) {
  let data = {
    loginType: "wx_app",
    terminal: "app",
    wx_code: code,
  };

  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/user/login",
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    data: data,
    success: function (response) {
      store.commit("updateToken", response.data.data.token);
      uni.switchTab({
        url: "/pages/home/classification/classificationMain",
      });
      console.log(store.getters.getToken);
    },
    fail: function (error) {
      console.log(error);
    },
  });
}
</script>

<style lang="scss">
#register {
  padding: 12rpx 14rpx 9rpx 620rpx;
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
    .wechatLogin {
      width: 692rpx;
      height: 105rpx;
      background: #45c45d;
      border-radius: 62rpx 62rpx 62rpx 62rpx;
      opacity: 1;
      margin-top: 222rpx;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  input::placeholder {
    font-size: 3px;
  }
}

.link-text {
  color: rgba(60, 123, 251, 1);
  // 如果需要加下划线效果，可以添加下面的样式
  // text-decoration: underline;
  // text-decoration-color: rgba(60, 123, 251, 1);
  // text-decoration-style: solid;
  // text-decoration-thickness: 1px;
  // text-underline-offset: 3px;
  cursor: pointer;
}

.footer {
  margin-top: 350rpx;
}

.verifyCodeLogin {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
