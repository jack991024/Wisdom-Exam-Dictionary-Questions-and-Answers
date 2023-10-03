<template>
  <view class="body">
    <u-cell-group>
      <u-cell title="清除缓存" value="" :isLink="true" size="large"></u-cell>
      <u-cell title="版本升级" value="当前版本v1.0.100" :isLink="true" size="large"></u-cell>
      <u-cell title="同步历史做题记录" :clickable="true" size="large" :border="false"></u-cell>
    </u-cell-group>
  </view>

  <view class="exit">
    <text>退出登录</text>
  </view>
</template>

<script setup>
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