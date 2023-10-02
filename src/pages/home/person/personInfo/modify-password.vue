<template>
  <view class="title" style="margin-top: 49rpx;
    margin-left: 29rpx;"><text style="
font-size: 38rpx;
font-weight: bold;
color: #262626;">修改密码</text></view>
  <view id="body">
    <view id="login">
      <view id="mobile">
        <up-input placeholder="请输入手机号" prefixIcon="phone" border="bottom" v-model="login.userInfo.phone"
          prefixIconStyle="font-size: 22px;color: #909399"></up-input>
      </view>
      <view id="verify">
        <t-captcha ref="captchaComponent" id="captcha" app-id="193939886" @verify="handlerVerify" @ready="handlerReady"
          @close="handlerClose" @error="handlerError" />
        <up-input placeholder="验证码" prefixIcon="lock" border="bottom" v-model="login.userInfo.verify"
          prefixIconStyle="font-size: 22px;color: #909399">
          <template #suffix>
            <view class="butt">
              <u-link href="" :text="buttonText" @click="getCode"></u-link>
            </view>
          </template>
        </up-input>
      </view>
      <view id="password">
        <up-input placeholder="请输入密码" prefixIcon="lock" border="bottom" v-model="login.userInfo.password"
          prefixIconStyle="font-size: 22px;color: #909399" type="password">
        </up-input>
      </view>
      <view id="submit">
        <up-button type="primary" text="重置密码" @click="submitPassword"></up-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const login = ref({
  userInfo: {
    phone: "",
    verify: "",
    password: ""
  }
})

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

const submitPassword = () => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/user/resetPwd',
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data: login.value.userInfo,
    success: (response) => {
      console.log(response.data);
      if (response.data.code === 0) {
        uni.showToast({
          title: response.data.msg,
          icon: 'success',
          duration: 1000
        })
        setTimeout(() => {
          uni.redirectTo({
            url: '/pages/login/login'
          })
        }, 1005)
      } else {
        uni.showToast({
          title: response.data.msg,
          icon: 'error',
          duration: 1000
        })
      }
    },
    fail: (error) => {
      console.log('error', error);
    }
  });
}

const navigateToPrivacyPolicy = () => {
  // 使用uni.navigateTo或其他导航方法跳转到隐私政策页面
  uni.navigateTo({
    url: '/pages/register/policy'
  })
};

const navigateToServiceAgreement = () => {
  // 使用uni.navigateTo或其他导航方法跳转到用户服务协议页面
  uni.navigateTo({
    url: '/pages/register/FAQ'
  })
};
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
  margin-top: 190rpx;
  margin-left: 29rpx;
  margin-right: 29rpx;

  #logo {
    width: 84px;
    height: 84px;
    display: block;
    margin: 0 auto;
  }

  #login {

    #mobile {
      display: block;
      margin-bottom: 15px;
    }

    #verify {
      display: block;
      margin-bottom: 15rpx;
    }

    #password {
      display: block;
      margin-bottom: 30rpx;
    }

    #submit {
      display: block;
      margin-bottom: 30rpx;
    }

    #footer {
      #verifyCodeLogin {
        border: 1rpx rebeccapurple solid;
        margin: 0 auto;
      }
    }
  }


  input::placeholder {
    font-size: 3rpx;
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

.butt {
  .custom-button {

    &,
    button {
      border: none;
      color: rgba(60, 123, 251, 1);
      /* 可以添加其他样式，如背景颜色、文字颜色等 */
    }
  }
}
</style>
