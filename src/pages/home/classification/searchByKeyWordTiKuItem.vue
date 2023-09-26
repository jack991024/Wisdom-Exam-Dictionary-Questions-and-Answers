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
        <view>
          <text>共{{ item.detail.count }}科</text>
        </view>
        <view>
          <text>{{ item.detail.people }}人已学习</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {reactive} from "vue";

const subjects = reactive([])
onLoad((options) => {
  subjects.values = uni.getStorageSync("subjects")
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
  width: 692rpx;
  padding-bottom: 22rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-left: 30rpx;
  margin-top: 36rpx;

  .tikuDetail {
    &::before {
      content: "";
      display: block;
      height: 22rpx;
      visibility: hidden; // 使其不可见
    }

    .title {
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
      flex-wrap: wrap;

      .label {
        height: 33rpx;
        background: #E1EAFD;
        border-radius: 16rpx 16rpx 16rpx 16rpx;
        display: flex; // 添加这一行
        justify-content: center; // 添加这一行
        align-items: center; // 添加这一行
        padding-left: 18rpx;
        padding-right: 18rpx;
        margin-bottom: 10rpx;

        text {
          font-size: 21.74rpx;
        }

        &:not(:last-child) {
          margin-right: 18rpx; // 添加这一行
        }

        &:nth-child(3n+1) {
          background: #E1EAFD;

          text {
            color: #3D7BFB;
          }
        }

        &:nth-child(3n+2) {
          background: #FBE5E4;

          text {
            color: #FF5756;
          }
        }

        &:nth-child(3n+3) {
          background: #FCEFE5;

          text {
            color: #FF9957;
          }
        }
      }
    }

    .footer {
      margin-top: 18rpx;
      margin-left: 22rpx;
      margin-right: 22rpx;
      display: flex;
      font-size: 21.74rpx;
      justify-content: space-between;

      text {
        color: #898989;
      }

      view:not(:last-child) {
        margin-right: 29rpx; // 添加这一行
      }
    }
  }
}
</style>
