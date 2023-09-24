<template>
  <view class="list">
    <view class="item" v-for="(item,index) in errorList" :key="index" @click="navigateToQuestionNew(item,index)">
      <view class="tip" :class="getTipClass(index)">
        <text :class="getTextClass(index)">{{ index + 1 }}</text>
      </view>
      <view class="title">{{ item.stem }}</view>
      <view class="footer">
        <view class="source">
          <text>来源：{{ item.name }}</text>
        </view>
        <view class="error-num">
          <text>{{ item.count }}人做错</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {onShow} from "@dcloudio/uni-app";
import {ref} from "vue";
import {useStore} from "vuex";

const store = useStore()

const errorList = ref([])

let tkid = ""
onShow(() => {
  tkid = uni.getStorageSync("tkid")
  console.log("tkid:", tkid)
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/errorBoard',
    method: 'POST',
    header: {
      'Authorization': store.getters.getToken,
      'Content-Type': 'application/json'
    },
    data: {
      "tkid": tkid
    },

    success: (response) => {
      errorList.value = response.data.data
    },
    fail: (error) => {
      console.log(error);
    }
  });
})

// 添加一个方法来根据索引返回相应的样式类
const getTipClass = (index) => {
  if (index === 0) return 'tip-first';
  if (index === 1 || index === 2) return 'tip-second-third';
  return 'tip-default';
}

const getTextClass = (index) => {
  if (index <= 2) return 'text-white';
  return 'text-blue';
}

const navigateToQuestionNew = (item, index) => {
  const result = errorList.value.map(item => ({
    chid: item.chid,
    qid: item.qid
  }));

  uni.setStorageSync("wrongQuestionListsNew", result);

  uni.navigateTo({url: "/pages/home/topic/question-jump?title=错题排行&type=7&currentIndex=" + index})
}

</script>

<style lang="scss">
.list {
  .item {
    margin-top: 29rpx;
    margin-left: 29rpx;
    width: 692rpx;
    height: 181rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;

    .tip {
      width: 36rpx;
      height: 36rpx;
      border-radius: 22rpx 0rpx 11rpx 0rpx;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      &.tip-first {
        background-color: #FF5756;
      }

      &.tip-second-third {
        background-color: #FF9957;
      }

      &.tip-default {
        background-color: #E0EAFF;
      }

      text {
        font-size: 29rpx;

        &.text-white {
          color: #FFFFFF;
        }

        &.text-blue {
          color: #3D7BFB;
        }
      }
    }

    .title {
      font-size: 29rpx;
      color: #262626;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-left: 27.17rpx;
      margin-right: 27.17rpx;
      height: 80rpx;

      &::after {
        content: "";
        display: block;
        height: 40rpx;
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      margin-top: 15rpx;

      .source {
        font-size: 22rpx;
        color: #898989;
        margin-left: 22rpx;
        max-width: 560rpx; // 设置最大宽度为15字的宽度
        white-space: normal; // 允许内容自动换行
        overflow-wrap: break-word; // 如果内容超出容器宽度，允许自动换行
      }

      .error-num {
        font-size: 22rpx;
        color: #898989;
        margin-right: 18rpx;
      }
    }
  }
}
</style>

