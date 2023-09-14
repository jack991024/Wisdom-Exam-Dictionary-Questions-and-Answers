<template>
  <view class="container">
    <view class="tab" v-for="item in data" :key="item.tkid">
      <view class="tab-header">
        <text class="tab-fullname">{{ item.fullname }}</text>
      </view>
      <text class="tab-msg">{{ item.msg }}</text>
      <view class="line"></view>
      <text class="tab-progress">{{ getProgress(item.correct, item.total) }}</text>
      <view class="go-learning" @click="goToLearn(item)">
        <text class="go-to-learning-button">点击学习</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import {reactive} from 'vue';
import {onLoad} from "@dcloudio/uni-app";
import {useStore} from "vuex";

const store = useStore()
const getProgress = (correct, total) => {
  return correct / total === 0 ? '未学习' : `${((correct / total) * 100).toFixed(2)}%`;
};

let data = reactive([]);

const goToLearn = (item) => {
  console.log('前往学习', item);
  uni.setStorageSync('tiku', JSON.stringify(item));
  uni.switchTab({url: '/pages/home/topic/topic'})
};

const loadQuestionBanks = () => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/myCourse',
    method: 'GET',
    header: {
      "Content-Type": "application/json",
      "Authorization": store.getters.getToken
    },
    success: (res) => {
      if (res.data && Array.isArray(res.data.data)) {
        data.length = 0; // 首先清空数组
        res.data.data.forEach(item => data.push(item)); // 然后将新数据推送到数组中
      }
      console.log("data:", data);
    },
    fail: (err) => {
      console.log('error', err);
    }
  });
}

onLoad(() => {
  loadQuestionBanks()
})
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  background-color: #f0f0f0;
  min-height: 100vh; /* 修改此行 */
  overflow-y: auto; /* 允许垂直滚动 */
}

.tab {
  width: 692rpx;
  height: 219rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-bottom: 21rpx; // 添加这行来给每个 tab 添加底部外边距

  &:not(:last-child) {
    margin-bottom: 21rpx; // 应用 21rpx 的底部外边距，但排除最后一个元素
  }
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-fullname {
  width: 638rpx;
  height: 40rpx;
  font-size: 29rpx;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  color: #262626;
  line-height: 90rpx;
  margin-left: 29rpx;
  margin-bottom: 22rpx;
}

.tab-msg {
  width: 217rpx;
  height: 31rpx;
  font-size: 22rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #898989;
  margin: 93rpx 0rpx 105rpx 29rpx;
}

.line {
  width: 636rpx;
  height: 0rpx;
  opacity: 1;
  border-top: 2rpx solid #E5E5E5;
  margin: 13rpx 27rpx 22rpx 29rpx;
}

.learn-button {
  padding: 10px;
  background-color: #4CAF50;
  border: none;
  color: white;
  text-align: center;
  border-radius: 16px;
  font-size: 16px;
}

.tab-progress {
  width: 65rpx;
  height: 31rpx;
  font-size: 22rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #898989;
  margin: 29rpx 0rpx 0rpx 29rpx;
}

.go-learning {
  width: 129rpx;
  height: 45rpx;
  border-radius: 7rpx 7rpx 7rpx 7rpx;
  opacity: 1;
  margin: -40rpx 0rpx 0rpx 530rpx;
  border: 1rpx solid #3C7BFB;

  .go-to-learning-button {
    text-align: center;
    width: 87rpx;
    height: 31rpx;
    font-size: 22rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #3C7BFB;
    margin: 6rpx 21rpx;
  }
}
</style>
