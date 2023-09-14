<template>
  <view id="app">
    <view class="swiper" indicator-active-color="#fff">
      <view class="avatar-wrapper">
        <up-avatar :icon="account-fill" :size="64"></up-avatar>
      </view>
      <view class="desc">
        <text class="name">{{ name }}</text>
        <text class="classNum">{{ classNum }}</text>
      </view>
    </view>

    <view class="u-page">
      <u-list>
        <u-list-item
            v-for="(item, index) in indexList"
            :key="index"
        >
          <u-cell
              :title="item.title"
              :isLink="true"
              @click="navigateTo(item.path)"
          >
            <template #icon>
              <up-avatar
                  shape="square"
                  size="35"
                  :icon="item.url"
                  customStyle="margin: -3px 5px -3px 0"
              ></up-avatar>
            </template>
          </u-cell>
        </u-list-item>
      </u-list>
    </view>
  </view>
</template>

<script setup>
let text = 'test'
let name = '小明'
let classNum = '学号 123456789'

import {ref, reactive, onMounted} from 'vue';

const indexList = reactive([]);
const urls = [
  {
    title: '个人信息',
    url: 'account',
    path: '/pages/home/person/personInfo/personInfo'
  },
  {title: '我的课程', url: 'play-circle'},
  {title: '我的题库', url: 'file-text', path: '/pages/home/person/personInfo/tiku'},
  {title: '激活码', url: 'gift'},
  {title: '短视频', url: 'photo'},
  {title: '联系客服', url: 'kefu-ermai'},
  {title: '招商加盟', url: 'checkbox-mark'},
  {title: '问题解答', url: 'question-circle'},
  {title: '关于我们', url: 'info-circle'}
  // '../../../..//static/person/personInfo.png',
];

const navigateTo = (path) => {
  if (path) {
    uni.navigateTo({url: path});
  }
};

onMounted(() => {
  for (let item of urls) {
    indexList.push(item);
  }
});
</script>

<style lang="scss">
#app::after {
  content: '';
  width: 130%;
  height: 230rpx;
  position: absolute;
  left: -15%;
  top: 0;
  z-index: -1;
  border-radius: 0 0 50% 50%;
  background: rgb(23, 125, 244);
}

#app {
  .u-alert {
    z-index: 999;
  }

  .swiper {
    width: 90%;
    height: 220rpx;
    box-shadow: 0 16rpx 16rpx rgba(10, 16, 20, 0.24), 0 0 16rpx rgba(10, 16, 20, 0.12);
    position: absolute;
    top: 100rpx;
    left: 50%;
    background-color: white;
    transform: translateX(-50%);
  }

  .avatar-wrapper {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 25px; /* Adjust as needed */
  }

  .desc {
    margin-left: 12px;
    position: absolute;
    left: calc(10px + 60px + 10px); /* Adjust as needed */
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
  }

  .name,
  .classNum {
    margin: 2px 0; /* Adjust margin */
    font-size: 14px; /* Adjust font size */
    font-family: "PingFang SC", serif;
  }

  .name {
    font-size: 20px; /* Larger font size for name */
    font-family: "PingFang SC", serif;
  }

  .u-page {
    margin-top: 10px; // 添加此行
    padding: 0;
    margin-top: 180px;
  }
}
</style>
