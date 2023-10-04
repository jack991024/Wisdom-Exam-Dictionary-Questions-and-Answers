<template>
  <view>
    <view class="header">
      <view class="search">
        <u-search placeholder="搜索考试科目" v-model="keyword" action-style="color: #3C7BFB;"
                  @custom="searchByKeyWords(keyword)"></u-search>
      </view>
    </view>

    <view class="body">
      <view class="item" @click="navigateToMySubjects">
        <view class="icon">
          <image src="./static/start/1.png" mode="widthFix" style="margin-left:29rpx;width: 57.97rpx;
    height: 57.97rpx;"></image>
        </view>
        <view class="text">
          <view class="title">
            <text>已购课程</text>
          </view>

          <view class="label">
            <text>未购买课程</text>
          </view>
        </view>
      </view>

      <view class="item" @click="navigateToMyTiKu">
        <view class="icon">
          <image src="/static/start/2.png" mode="widthFix" style=" margin-left:29rpx;  width: 57.97rpx;
    height: 57.97rpx;"></image>
        </view>
        <view class="text">
          <view class="title">
            <text>已购题库</text>
          </view>

          <view class="label">
            <text>未购买课程</text>
          </view>
        </view>
      </view>

      <view v-for="(item,index) in lists" :key="index" class="item" @click="navigateToTwo(item)">
        <view class="icon">
          <!-- 使用模运算和模板字符串动态计算图片路径 -->
          <image :src="'/static/start/' + ((index + 3) % 8 || 8) + '.png'" mode="widthFix"
                 style=" margin-left:29rpx;  width: 57.97rpx; height: 57.97rpx;"></image>
        </view>
        <view class="text">
          <view class="title">
            <text>{{ item.name }}</text>
          </view>
          <view class="label">
            <text>未购买课程</text>
          </view>
        </view>
      </view>


    </view>
  </view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {ref} from "vue";

let keyword = ""

const searchByKeyWords = (keyword) => {
  let subjects = []
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/tk/search",
    data: {
      keyword: keyword
    },
    method: "POST",
    success: (response) => {
      subjects = response.data.data;
      uni.setStorageSync("subjects", subjects);
      uni.navigateTo({
        url: "/pages/home/classification/searchByKeyWordTiKuItem"
      })
    },
    fail: (error) => {
      console.log('error', error);
    }
  })
}
const lists = ref([])
onLoad(() => {
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/course/classify",
    method: "POST",
    data: {
      "region_id": "110000000000"
    },
    success: function (res) {
      lists.value = res.data.data.courses
    },
    error: function (err) {

    }
  })
})

const navigateToTwo = (item) => {
  uni.setStorageSync("xuanzekaoshi-item-children", item.children)
  uni.reLaunch({
    url: "/pages/start/xuanzekaoshi-two"
  })
}

const navigateToMySubjects = () => {
  uni.setStorageSync("flag", "true");
  uni.navigateTo({
    url: "/pages/home/person/my-kecheng"
  })
}

const navigateToMyTiKu = () => {
  uni.setStorageSync("flag", "true");
  uni.navigateTo({
    url: "/pages/home/person/personInfo/tiku"
  })
}
</script>

<style lang="scss">
.header {
  height: 115rpx;

  .search {
    margin: 28rpx;
  }
}

.body {
  background: #F5F6F8;

  .item {
    width: 750rpx;
    height: 156rpx;
    background: #FFFFFF;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    opacity: 1;
    align-items: center;
    display: flex;

    position: relative; // 使伪类相对于此元素定位

    &::before {
      content: ""; // 伪类必须有内容，但我们可以设置为空
      display: block;
      width: 100%; // 使伪类的宽度与.item相同
      height: 22rpx; // 设置伪类的高度
      background: #F5F6F8; // 你可以根据需要设置背景颜色
      position: absolute;
      top: -22rpx; // 将伪类放在.item的上方
      left: 0;
    }

    .text {
      margin-left: 29rpx;
      margin-top: -10rpx;

      .title {
        font-size: 29rpx;
        font-weight: bold;
        color: #333333;
      }

      .label {
        font-size: 25rpx;
        color: #999999;
        font-weight: 400;
        margin-top: 10rpx;
      }
    }
  }
}
</style>
