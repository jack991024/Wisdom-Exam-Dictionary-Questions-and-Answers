<template>
  <view class="body">
    <u-cell-group>
      <u-cell title="清除缓存" value="207.30K" :isLink="true" size="large" @click="one"></u-cell>
      <u-cell title="版本升级" value="当前版本v1.0.100" :isLink="true" size="large" @click="two"></u-cell>
      <u-cell title="同步历史做题记录" :clickable="true" size="large" :border="false" @click="three"></u-cell>
    </u-cell-group>
  </view>
  <u-modal :show="show" :closeOnClickOverlay="true" content='            确认退出' @confirm="exit" :showCancelButton="true" @cancel="guanbi" @close="close"></u-modal>
  <view class="exit" @click="ex">
    <text>退出登录</text>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const show = ref(false)
const one = () => {
  uni.showToast({
    title: '清理成功',
    icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
    duration: 2000    //持续时间为 2秒
  })
}

const two = () => {
  uni.showToast({
    title: '版本升级',
    icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
    duration: 2000    //持续时间为 2秒
  })
}

const three = () => {
  uni.showToast({
    title: '同步成功！',
    icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
    duration: 2000    //持续时间为 2秒
  })
}

const ex = () => {
  show.value = true;
}


const exit = () => {
  uni.clearStorageSync();
  store.commit('updateToken', "")
  uni.redirectTo({
    url: '/pages/weChatLogin/weChatLogin'
  })
}

const guanbi=()=>{
  show.value = false;
}
</script>

<style scoped>
.body {
  width: 692rpx;
  height: 297rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin: 29rpx;
}

.exit {
  margin-top: 69rpx;
  margin-left: 29rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 692rpx;
  height: 87rpx;
  background: #3C7BFB;
  border-radius: 7rpx 7rpx 7rpx 7rpx;
  opacity: 1;
  color: #FFFFFF;
}
</style>