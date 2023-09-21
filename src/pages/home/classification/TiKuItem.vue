<template>
  <view class="tikuPart">
    <text>题库</text>
  </view>

  <view class="tikuItem" v-for="(item,index) in subjects.values" :key="index" @click="naviToPackage(item)">
    <view class="tikuDetail">
      <view class="title">
        <text>{{ item.name }}</text>
      </view>
      <view class="tip">
        <text>{{ item.detail.tip }}</text>
      </view>
      <view class="labels">
        <view class="label" v-for="(item,index) in item.detail.labels" :key="index">
          <text>{{ item }}</text>
        </view>
      </view>
      <view class="footer">
        <view>共{{ item.detail.count }}科</view>
        <view>共{{ item.detail.people }}人已学习</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {reactive} from "vue";

let itemName = ""
let itemCoid = ""
let regionId = ""
const subjects = reactive([])
onLoad((options) => {
  itemName = options.itemName
  itemCoid = options.itemCoid
  regionId = options.regionId
  console.log(options)
  uni.setNavigationBarTitle({
    title: itemName
  });


  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/tk/subject",
    data: {
      coid: itemCoid,
      region_id: regionId
    },
    method: "POST",
    success: (response) => {
      console.log("response.data", response.data)
      subjects.values = response.data.data.subjects;
      console.log("subjects.values", subjects.values)
    },
    fail: (error) => {
      console.log('error', error);
    }
  })
})

const naviToPackage = (item) => {
  uni.navigateTo({
    url: "/pages/home/classification/package?item=" + JSON.stringify(item)
  })
}
</script>

<style lang="scss" scoped>
.tikuPart {
  margin-top: 32rpx;
  margin-left: 32rpx;

  text {
    font-size: 33rpx;
    color: #262626;
  }
}

.tikuItem {
  .tikuDetail {
    width: 692rpx;
    height: 230rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
    margin-left: 30rpx;

    .title {
      margin-top: 22rpx;
      margin-left: 22rpx;
      font-size: 33rpx;
      font-weight: bold;
      color: #262626;
    }

    .tip {
      margin-top: 11rpx;
      margin-left: 22rpx;
      color: #898989;
      font-size: 22rpx;
    }

    .labels {
      margin-left: 22rpx;
      margin-top: 18rpx;
      display: flex;

      .label {
        width: 123rpx;
        height: 33rpx;
        background: #3D7BFB;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        opacity: 0.16;
        display: flex; // 添加这一行
        justify-content: center; // 添加这一行
        align-items: center; // 添加这一行

        text {
          font-size: 21.74rpx;
        }

        &:not(:last-child) {
          margin-right: 18rpx; // 添加这一行
        }

        &:nth-child(3n+1) {
          background: #3D7BFB;
        }

        &:nth-child(3n+2) {
          background: #FF5756;
        }

        &:nth-child(3n+3) {
          background: #FF9957;
        }
      }
    }

    .footer {
      margin-top: 18rpx;
      margin-left: 22rpx;
      display: flex;
      font-size: 21.74rpx;

      view:not(:last-child) {
        margin-right: 29rpx; // 添加这一行
      }
    }
  }
}
</style>
