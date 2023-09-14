<template>
  <view class="container">
    <view class="tab" v-for="item in data" :key="item.tkid">
      <view class="tab-header">
        <text class="tab-fullname">{{ item.fullname }}</text>
      </view>
      <text class="tab-msg">{{ item.msg }}</text>
      <view class="line"></view>
      <text class="tab-progress">{{ getProgress(item.correct, item.total) }}</text>
      <view class="go-learning" @click="goToLearn(item.tkid)">
       <text class="go-to-learning-button">点击学习</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import {reactive} from 'vue';

const getProgress = (correct, total) => {
  return correct / total === 0 ? '未学习' : `${((correct / total) * 100).toFixed(2)}%`;
};

const data = reactive([
  {
    "tkid": "b9f70835-87d5-5a98-a322-74129ecf156c",
    "pay": true,
    "expire": 1725167667,
    "name": "吉林",
    "fullname": "考公考编-社区工作者-吉林社区工作者真题",
    "msg": "已开通，到期时间为 2024-09-01",
    "total": 114,
    "done": 1,
    "correct": 1,
    "error": 0,
    "progress": 0
  },
  {
    "tkid": "cad0cde8-3d23-531f-bf09-cfe441106bf3",
    "pay": true,
    "expire": 1725167667,
    "name": "时事政治+政策文件",
    "fullname": "考公考编-社区工作者-时事政治+政策文件",
    "msg": "已开通，到期时间为 2024-09-01",
    "total": 3092,
    "done": 5,
    "correct": 1,
    "error": 4,
    "progress": 0
  },
  {
    "tkid": "c9b2fff1-71c1-5aa2-89b0-204659d81c64",
    "pay": true,
    "expire": 1725167667,
    "name": "行测（必买）",
    "fullname": "社区工作者-行测",
    "msg": "已开通，到期时间为 2024-09-01",
    "total": 2317,
    "done": 23,
    "correct": 3,
    "error": 20,
    "progress": 0
  }
]);

const goToLearn = (tkid) => {
  console.log('前往学习', tkid);
  // 这里你可以添加导航到相关学习页面的代码，使用 tkid 作为参数
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  background-color: #f0f0f0;
}

.tab {
  width: 692rpx;
  height: 219rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
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
  .go-to-learning-button{
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
