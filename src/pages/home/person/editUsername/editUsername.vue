<template>
  <view>
    <u-navbar leftText="" title="设置昵称" :border="true" :safeAreaInsetTop="false" @leftClick="naviToPersonInfo"
      @rightClick="naviToPersonInfoByParam" bgColor="#3C7BFB">
      <template #right>
        <text>提交</text>
      </template>
    </u-navbar>

    <view style="margin-top: 120rpx;
    width: 692rpx;
    background: #F7F7F7;
    border-radius: 7rpx 7rpx 7rpx 7rpx;
    opacity: 1;
    margin-left: 29rpx;">
      <up-input placeholder="请输入用户名" v-model="username"></up-input>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import { useStore } from 'vuex';

const store = useStore()
let username = ref('')

onLoad(() => {
  uni.hideHomeButton();
})

const naviToPersonInfo = () => {
  uni.navigateTo({ url: '/pages/home/person/personInfo/personInfo' })
}

const naviToPersonInfoByParam = () => {
  console.log(username)
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/user/edit',
    method: 'POST',
    data: { username: username.value },
    header: { "Authorization": store.getters.getToken },
    success: (res) => {
      console.log(res.data)
      if (res.data.code === 0) {
        uni.showToast({ title: '更新成功', icon: 'success' });
         // 触发全局事件并传递更新的用户名
      uni.$emit('usernameUpdated', username.value);
      } else {
        uni.showToast({ title: '更新失败', icon: 'none' });
      }
    },
    fail: (err) => {
      console.error('Error updating gender:', err);
    }
  });
  uni.navigateTo({ url: '/pages/home/person/personInfo/personInfo' })
}
</script>

<style lang="scss"></style>
