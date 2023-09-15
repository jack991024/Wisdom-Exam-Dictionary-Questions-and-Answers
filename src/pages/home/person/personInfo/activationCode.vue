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
    <view class="activation-code-button">
      <text>立即激活</text>
    </view>
  </view>
</template>

<script setup>
import {ref} from "vue";

let activCode = ref('')


</script>

<style lang="scss">
.activation-text {
  width: 304rpx;
  height: 53rpx;
  font-size: 38rpx;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: #262626;
  line-height: 480rpx;
  margin: 167rpx 0rpx 0rpx 29rpx;
}

.activation-code-input {
  margin: -180rpx 0rpx 0rpx 29rpx;
}

.activation-code-button {
  text-align: center;
  margin: 57rpx 29rpx 0rpx 29rpx;
  width: 692rpx;
  height: 72rpx;
  background: #D8D8D8;
  border-radius: 7rpx 7rpx 7rpx 7rpx;
  opacity: 1;
}
</style>
