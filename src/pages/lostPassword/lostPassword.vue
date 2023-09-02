<template>
  <view id="body">

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
      <view id="verifyCode">
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
      <view id="password">
        <up-input
            placeholder="请输入密码"
            prefixIcon="lock"
            border="bottom"
            v-model="login.userInfo.password"
            prefixIconStyle="font-size: 22px;color: #909399"
            type="password"
        >
        </up-input>
      </view>
      <view id="submit">
        <up-button type="primary" text="重置密码"></up-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref} from "vue";

const login = ref({
  userInfo: {
    phoneMobile: "",
    verifyCode: "",
    password: ""
  }
})

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

const navigateToPrivacyPolicy = () => {
  // 使用uni.navigateTo或其他导航方法跳转到隐私政策页面
};

const navigateToServiceAgreement = () => {
  // 使用uni.navigateTo或其他导航方法跳转到用户服务协议页面
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

    #verifyCode {
      display: block;
      margin-bottom: 15px;
    }

    #password {
      display: block;
      margin-bottom: 30px;
    }

    #submit {
      display: block;
      margin-bottom: 30px;
    }

    #footer {
      #verifyCodeLogin {
        border: 1px rebeccapurple solid;
        margin: 0 auto;
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
