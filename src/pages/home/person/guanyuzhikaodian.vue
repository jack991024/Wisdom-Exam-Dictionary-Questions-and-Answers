<template>
  <view>
    <view class="header">
      <image src="./static/login/logo.png" mode="widthFix" style="width: 144.93rpx;height: 144.93rpx"></image>
      <text style="
font-size: 43rpx;
font-weight: bold;
color: #262626;">智考典题库
      </text>

      <text style="
font-size: 29rpx;
color: #999999;">Version 1.0.0
      </text>
    </view>

    <view class="body">
      <u-cell-group>
        <u-cell title="关于我们" :is-link="true"></u-cell>
        <u-cell title="隐私协议" :is-link="true"></u-cell>
        <u-cell title="注册协议" :is-link="true"></u-cell>
        <u-cell title="版本更新" :is-link="true"></u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script>

</script>

<style lang="scss">
.body {
  width: 692rpx;
  height: 507rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-left: 29rpx;
}
</style>
