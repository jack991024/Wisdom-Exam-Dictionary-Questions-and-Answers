<template>
  <view>
    <swiper :indicator-dots="false" :interval="3000" :duration="1000" current="current"
            @change="loginRouter">
      <swiper-item>
        <image src="./static/start/01.png" mode="widthFix"></image>
      </swiper-item>
      <swiper-item>
        <image src="./static/start/02.png" mode="widthFix"></image>
      </swiper-item>
      <swiper-item>
        <image src="./static/start/03.png" mode="widthFix"></image>
      </swiper-item>
      <swiper-item>
        <image src="./static/start/04.png" mode="widthFix"></image>
      </swiper-item>
      <swiper-item>
        <image src="./static/start/05.png" mode="widthFix"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>

function loginRouter(e) {
  if (e.detail.current === 4) {
    setTimeout(() => {
      uni.redirectTo({
        url: '/pages/login/login'
      });
    }, 1500);
  }
}
</script>

<style>
swiper {
  overflow: auto;
  height: 100vh;
}

image {
  display: block;
  margin: 0 auto;
}
</style>
