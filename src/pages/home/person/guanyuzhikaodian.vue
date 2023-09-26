<template>
  <view>
    <view class="header">
      <image src="./static/login/logo.png" mode="widthFix"
             style="width: 144.93rpx;height: 144.93rpx;margin-bottom: 29rpx;"></image>
      <text style="
font-size: 43rpx;
font-weight: bold;
margin-bottom: 20rpx;
color: #262626;">
        智考典题库
      </text>

      <text style="
font-size: 29rpx;
color: #999999;">
        Version 1.0.0
      </text>
    </view>

    <view class="body">
      <u-cell-group>
        <u-cell title="关于我们" :is-link="true" size="large"
                @click="navigateToPath('/pages/home/person/guanyuwomen')"></u-cell>
        <u-cell title="隐私协议" :is-link="true" size="large"
                @click="navigateToPath('/pages/home/person/yinsixieyi')"></u-cell>
        <u-cell title="注册协议" :is-link="true" size="large"
                @click="navigateToPath('/pages/home/person/zhucexieyi')"></u-cell>
        <u-cell title="版本更新" :is-link="true" size="large" @click=""></u-cell>
      </u-cell-group>
    </view>

    <view class="footer">
      <text>上海智考典教育科技有限公司 版权所有</text>
      <text>Copyright © 2023</text>
    </view>
  </view>
</template>

<script setup>
const navigateToPath = (path) => {
  uni.navigateTo({
    url: path
  })
}
</script>

<style lang="scss">
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100rpx;
}


.body {
  width: 692rpx;
  height: 197px;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-left: 29rpx;
  margin-top: 72rpx;
}

.footer {
  margin-top: 480rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  text {
    font-size: 22rpx;
    color: #CCCCCC;
  }
}
</style>
