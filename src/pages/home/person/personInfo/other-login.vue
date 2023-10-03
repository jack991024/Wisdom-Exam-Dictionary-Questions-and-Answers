<template>
  <view>
    <view class="body">
      <u-cell-group>
        <u-cell title="手机号" size="large" :value="userInfo.phone" :center="true" :isLink="true">
          <template #icon>
            <u-icon size="25" name="../../../../static/person/phone.png"></u-icon>
          </template>
        </u-cell>

        <u-cell title="微信" size="large" :border="false" :value="userInfo.username" :center="true" :isLink="true">
          <template #icon>
            <u-icon size="25" name="../../../../static/person/wechat.png"></u-icon>
          </template>
        </u-cell>
      </u-cell-group>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
const userInfo = ref(null)
onLoad(() => {
  userInfo.value = uni.getStorageSync("userInfo");
})
</script>

<style scoped>
.body {
  width: 692rpx;
  height: 200rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-top: 22rpx;
  margin-left: 29rpx;
}
</style>