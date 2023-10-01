<template>
  <view>
    <text class="activation-text">
      请输入您的激活码
    </text>
    <view class="activation-code-input">
      <up-input
          placeholder="请输入激活码"
          border="bottom"
          v-model="activCode"
      ></up-input>
    </view>
    <u-modal :show="show" title="" :content="content" confirmText="确定" cancelText="取消" showConfirmButton
             showCancelButton @confirm="click" @cancel="cance"></u-modal>
    <view class="activation-code-button-active" @click="submitActivCode()">
      <text style="color: #fff;">立即激活</text>
    </view>
  </view>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useStore} from "vuex";

const store = useStore()

const activCode = ref('')

const show = ref(false)

const content = ref('')

const resp = reactive({
  code: 0,
  msg: ""
})


const submitActivCode = () => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/useActivate',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      "Authorization": store.getters.getToken
    },
    data: {
      code: activCode.value
    },
    success: (response) => {

      resp.value = response.data
  
      if (resp.value.code === 0) {
        show.value = true
        content.value = '激活成功'
      } else {
        show.value = true
        content.value = resp.value.msg
    
      }
    },
    fail: (error) => {
      console.log(error);
    }
  });
}

const click = () => {
  if (resp.value.code === 0) {
    uni.redirectTo({url: '/pages/home/person/personInfo/tiku'})
  } else {
    show.value = false
  }
}

const cance = () => {
  show.value = false
}
</script>

<style lang="scss">
.activation-text {
  width: 304rpx;
  height: 53rpx;
  font-size: 38rpx;
  font-family: PingFang SC-Bold, PingFang SC;
  color: #262626;
  line-height: 480rpx;
  margin: 167rpx 0rpx 0rpx 29rpx;
}

.activation-code-input {
  margin: -180rpx 0rpx 0rpx 29rpx;
}

/*
.activation-code-button {
  text-align: center;
  margin: 57rpx 29rpx 0rpx 29rpx;
  width: 692rpx;
  height: 72rpx;
  background: #D8D8D8;
  border-radius: 7rpx 7rpx 7rpx 7rpx;
  opacity: 1;
  padding-top: 19rpx;
}
*/

.activation-code-button-active {
  background: #3C7BFB !important; /* 添加 !important 来提高优先级 */
  text-align: center;
  margin: 70rpx 29rpx 0rpx 29rpx;
  width: 692rpx;
  height: 72rpx;
  border-radius: 7rpx 7rpx 7rpx 7rpx;
  opacity: 1;
  padding-top: 19rpx;
}
</style>
