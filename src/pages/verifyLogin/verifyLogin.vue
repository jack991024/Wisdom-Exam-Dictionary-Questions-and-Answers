<template>
  <view>
    <view id="register">
      <u-link text="立即注册" @click="registerRouter" mpTips="" color="#000000"></u-link>
    </view>
  </view>
  <view id="body">
    <view style="display: flex;flex-direction: column;align-items: center;">
      <image id="logo" src="./static/login/logo.png" />
      <text style="font-size: 29rpx;color: #666666;margin-top: 29rpx;">AI智能题库让学习更高效</text>
    </view>

    <view id="login">
      <view id="mobile">
        <up-input placeholder="请输入手机号" prefixIcon="" border="bottom" v-model="login.userInfo.phone"
          prefixIconStyle="font-size: 22px;color: #909399">
          <template #prefix>
            <u-icon name="../../../../static/login/account.png" size="30" color="#909399" labelPos="bottom"></u-icon>
          </template>
        </up-input>
      </view>
      <view id="password">
        <t-captcha ref="captchaComponent" id="captcha" app-id="193939886" @verify="handlerVerify" @ready="handlerReady"
          @close="handlerClose" @error="handlerError" />
        <up-input placeholder="验证码" prefixIcon="lock" border="bottom" v-model="login.userInfo.verify"
          prefixIconStyle="font-size: 22px;color: #909399">
          <template #prefix>
            <u-icon name="../../../../static/login/password.png" size="30" color="#909399" labelPos="bottom"></u-icon>
          </template>
          <template #suffix>
            <view class="butt">
              <u-link href="" :text="buttonText" @click="getCode"></u-link>
            </view>
          </template>
        </up-input>
      </view>
      <view id="submit">
        <up-button type="primary" text="登陆" @click="submit"></up-button>
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
            <u-icon name="../../../../static/login/mima.png" size="30" color="#909399" @click="mimaLoginRouter"
              label="密码登陆" labelPos="bottom"></u-icon>
          </view>
          <u-icon name="../../../../static/login/wechatLogin-01.png" size="30" color="#909399" @click="wechatLoginRouter"
            label="微信登陆" labelPos="bottom"></u-icon>
        </view>
      </view>

    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from 'vuex'

const store = useStore()
const login = ref({
  userInfo: {
    phone: "",
    password: "",
    "loginType": "sms",
    "terminal": "wx",
    "verify": ""
  }
})
const isRadioSelected = ref(false);
function registerRouter() {
  uni.redirectTo({
    url: '/pages/register/register'
  });
}

const verify = ref('');
const countingDown = ref(false);
const buttonText = ref('获取验证码');

let countdown = 60; // 初始倒计时秒数

const getCode = async () => {
  const arr = getCurrentPages();
  arr[arr.length - 1].selectComponent('#captcha').show();
};

const handlerVerify = async (ev) => {
  if (ev.detail.ret === 0) {
    console.log('ticket:', ev.detail.ticket);
    let data = {
      "ticket": ev.detail.ticket,
      "phone": login.value.userInfo.phone,
      "mode": "WX_MINI"
    };

    uni.request({
      url: 'https://dev.zhikaodian.com/apiV2/sms/send-sms',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: data,
      success: function (response) {
        console.log(JSON.stringify(response.data));
        buttonText.value = `${countdown}秒`;

        const timer = setInterval(() => {
          countdown--;
          buttonText.value = `${countdown}秒`;

          if (countdown <= 0) {
            clearInterval(timer);
            countingDown.value = false;
            buttonText.value = '获取验证码';
            countdown = 60; // 重置倒计时
          }
        }, 1000);
      },
      fail: function (error) {
        console.log(error);
      }
    });

  } else {
    // 验证失败
    // 请不要在验证失败中调用refresh，验证码内部会进行相应处理
  }
};

const handlerReady = () => {
  console.log('验证码准备就绪');
};

const handlerClose = (ev) => {
  if (ev && ev.detail.ret && ev.detail.ret === 2) {
    console.log('点击了关闭按钮，验证码弹框准备关闭');
  } else {
    console.log('验证完成，验证码弹框准备关闭');
  }
};

const handlerError = (ev) => {
  console.log(ev.detail);
};

const submit = () => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/user/login',
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data: login.value.userInfo,
    success: (response) => {
      console.log(response.data);
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
    },
    fail: (error) => {
      console.log('error', error);
    }
  });
}

function loginRouter() {
  uni.redirectTo({
    url: '/pages/login/login'
  });
}

const mimaLoginRouter = () => {
  uni.navigateTo({
    url: "/pages/login/login"
  });
}

const wechatLoginRouter = () => {
  uni.navigateTo({
    url: "/pages/weChatLogin/weChatLogin",
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
    }

    .footer {
      margin-top: 350rpx;

      .verifyCodeLogin {
        text-align: center;
        display: flex;
        justify-content: center;
      }
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
</style>
