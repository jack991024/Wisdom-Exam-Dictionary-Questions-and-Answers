<template>
  <view class="background-view"></view>
  <view id="app">
    <view class="swiper" indicator-active-color="#fff">
      <view class="header">
        <view class="avatar-wrapper">
          <up-avatar :src="userInfo.avatar" :size="60"></up-avatar>
        </view>
        <view class="desc">
          <text class="name">{{ userInfo.username }}</text>
          <text class="classNum">学号：{{ userInfo.number }}</text>
        </view>
      </view>

      <view class="bottom">
        <view class="myCourse" @click="navigateTo('/pages/home/person/my-kecheng')">
          <image src="./static/person/kecheng.png"></image>
          <text style="display: block;font-size: 25rpx;">我的课程</text>
        </view>

        <view class="myTiKu" @click="navigateTo('/pages/home/person/personInfo/tiku')">
          <image src="./static/person/tiku.png"></image>
          <text style="display: block;font-size: 25rpx;">我的题库</text>
        </view>

        <view class="jihuoma" @click="navigateTo('/pages/home/person/personInfo/activationCode')">
          <image src="./static/person/jihuoma.png"></image>
          <text style="display: block;font-size: 25rpx;">激活码</text>
        </view>

        <view class=shortVideo @click="navigateTo('/pages/home/person/short-videos')">
          <image src="./static/person/shortVideo.png"></image>
          <text style="display: block;font-size: 25rpx;">短视频</text>
        </view>
      </view>


    </view>

    <view class="u-page">
      <view v-for="(item, index) in indexList" :key="index">
        <u-cell :title="item.title" :isLink="true" @click="navigateTo(item.path)" size="large"
          :border="index !== indexList.length - 1">
          <template #icon>
            <up-avatar shape="square" size="20" :src="item.url" customStyle="margin: -3px 5px -3px 0"></up-avatar>
          </template>
        </u-cell>
      </view>
    </view>

    <view class="u-page-two">
      <view v-for="(item, index) in indexList2" :key="index">
        <u-cell :title="item.title" :isLink="true" @click="navigateTo(item.path)" size="large"
          :border="index !== indexList2.length - 1">
          <template #icon>
            <up-avatar shape="square" size="20" :src="item.url" customStyle="margin: -3px 5px -3px 0"></up-avatar>
          </template>
        </u-cell>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { useStore } from "vuex";

const store = useStore()

let text = 'test'
let name = '小明'
let classNum = '学号 123456789'

import { ref, reactive, onMounted } from 'vue';

const indexList = reactive([]);
const indexList2 = reactive([]);
const urls = [
  {
    title: '个人信息',
    url: '../../../../static/person/gerenxinxi.png',
    path: '/pages/home/person/personInfo/personInfo'
  },
  { title: '我的下载', url: '../../../../static/person/download.png' },
  { title: '联系客服', url: '../../../../static/person/lianxikefu.png', path: '/pages/home/person/kefu' },
  { title: '分享好友', url: '../../../../static/person/share.png' }
  // '../../../..//static/person/personInfo.png',
];

const urls2 = [
  {
    title: '招商加盟',
    url: '../../../../static/person/zhaoshangjiameng.png',
    path: '/pages/home/person/zhaoshangjiameng'
  },
  { title: '员工招聘', url: '../../../../static/person/gerenxinxi.png', path: '/pages/home/person/zhaoshangjiameng' },
  { title: '问题解答', url: '../../../../static/person/wentijieda.png', path: '/pages/home/person/wentijieda' },
  { title: '意见反馈', url: '../../../../static/person/yijianfankui.png', path: '/pages/home/person/yijianfankui' },
  {
    title: '关于智考典题库',
    url: '../../../../static/person/guanyuwomen.png',
    path: '/pages/home/person/guanyuzhikaodian'
  }
];

const navigateTo = (path) => {
  if (path) {
    uni.navigateTo({ url: path });
  }
};

onMounted(() => {
  for (let item of urls) {
    indexList.push(item);
  }

  for (let item of urls2) {
    indexList2.push(item);
  }
});

const userInfo = ref()
onLoad(() => {
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/user/current",
    header: {
      "Content-Type": "application/json",
      "Authorization": store.getters.getToken
    },
    success: function (res) {
      userInfo.value = res.data.data
      uni.setStorageSync("userInfo", userInfo.value)
    },
    error: function (err) {
      console.log(err)
    }
  })
})
</script>

<style lang="scss" scoped>
.background-view {
  width: 750rpx;
  height: 312rpx;
  background: linear-gradient(180deg, #3D7BFB 0%, #F5F6F8 100%);
  border-radius: 0rpx 0rpx 0rpx 0rpx;
  opacity: 0.43;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1; // 使背景位于其他内容下方
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100rpx;
  background: #F5F6F8;
  height: 100vh;

  .swiper {
    width: 90%;
    height: 304.35rpx;
    box-shadow: 0 16rpx 16rpx rgba(10, 16, 20, 0.24), 0 0 16rpx rgba(10, 16, 20, 0.12);
    background: #FFFFFF;
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
    z-index: 2;

    .header {
      display: flex;
      margin-top: 29rpx;
      margin-left: 29rpx;

      .desc {
        margin-top: 16rpx;
      }
    }

    .bottom {
      display: flex;
      margin-top: 29rpx;
      margin-left: 45rpx;
      justify-content: space-between;
      margin-right: 45rpx;

      .myCourse,
      .myTiKu,
      .jihuoma,
      .shortVideo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .avatar-wrapper {}

  .desc {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
  }

  .name,
  .classNum {
    margin: 2px 0; // Adjust margin
    font-family: "PingFang SC", serif;
  }

  .name {
    font-size: 20px; // Larger font size for name
    font-family: "PingFang SC", serif;
    font-size: 33rpx;
  }

  .classNum {
    font-size: 22rpx;
  }

  .u-page {
    padding: 0;
    margin-top: 37rpx;
    width: 692rpx;
    background: #FFFFFF;
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
  }

  .u-page-two {
    margin-top: 36rpx;
    width: 692rpx;
    background: #FFFFFF;
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
  }
}

image {
  width: 68.84rpx;
  height: 68.84rpx;
}
</style>
