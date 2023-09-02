<template>
  <view>
    <view id="register">
      <u-link text="立即注册" @click="registerRouter" mpTips=""></u-link>
    </view>
  </view>
  <view id="body">
    <view>
      <image id="logo" src="./static/login/logo.png"/>
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
            placeholder="验证码"
            prefixIcon="lock"
            border="bottom"
            v-model="login.userInfo.verifyCode"
            prefixIconStyle="font-size: 22px;color: #909399"
        >
          <template #suffix>
            <view class="butt">
              <up-button class="custom-button" @click="getCode" :disabled="countingDown">{{ buttonText }}</up-button>
            </view>
          </template>
        </up-input>
      </view>
      <view id="submit">
        <up-button type="primary" text="登陆"></up-button>
      </view>

      <view class="footer">
        <u-divider text="其他登陆方式" :hairline="true"></u-divider>
        <view class="verifyCodeLogin">
          <u-icon
              name="account"
              size="30"
              color="#909399"
              @click="loginRouter"
              label="账号登录"
              labelPos="bottom"
          ></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref} from "vue";

const login = ref({
  userInfo: {
    phoneMobile: "",
    password: ""
  }
})

function registerRouter() {
  uni.redirectTo({
    url: '/pages/register/register'
  });
}

const verifyCode = ref('');
const countingDown = ref(false);
const buttonText = ref('获取验证码');

let countdown = 60; // 初始倒计时秒数

const getCode = async () => {
  if (!countingDown.value) {
    // 调用接口获取验证码，例如：
    try {
      await fetchVerifyCode(); // 调用获取验证码接口，这里使用示例的异步函数 fetchVerifyCode
      countingDown.value = true;
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
    } catch (error) {
      console.error('获取验证码失败：', error);
      // 处理获取验证码失败的情况，例如提示用户重试等
    }
  }
};

const fetchVerifyCode = async () => {
  // 在这里调用获取验证码的接口，使用 async/await 或其他方式处理异步操作
  // 例如：await fetch('获取验证码的接口URL');
};

function loginRouter() {
  uni.redirectTo({
    url: '/pages/login/login'
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
