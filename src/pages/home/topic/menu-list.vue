<template>
  <u-navbar leftText="" title="选择题库" :border="true" :safeAreaInsetTop="false" @leftClick="naviToTopic">
    <template #right>
      <text>提交</text>
    </template>
  </u-navbar>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  uni.hideHomeButton();
})

const naviToTopic = () => {
  uni.switchTab({ url: '/pages/home/topic/topic' })
}
</script>

<style scoped></style>