<template>
  <view>
    <view class="exam-report">
      <view class="percent">
        <view class="percent-letter">
          <text>练习报告</text>
        </view>
        <view class="percent-body">
          <LCircularProgress :value="35"/>
          <view class="score">
            <text>准确率</text>
            <text class="score-value">{{ correctRate.value.toFixed(2) }}%</text>
            <text class="">/</text>
            <text class="">100</text>
          </view>
        </view>
        <u-line></u-line>
        <view class="exam-title">
          <text>练习类型：{{}}</text>
        </view>
        <view class="exam-time">
          <text>交卷时间：{{}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import LCircularProgress from './CustomProgress.vue'
import {onLoad} from '@dcloudio/uni-app';
import {reactive, ref} from 'vue';


let chapterName = { value: "" };
let totalQuestions = { value: 0 };
let answeredCorrectly = { value: 0 };
let answeredIncorrectly = { value: 0 };
let notAnswered = { value: 0 };
let correctRate = { value: 0 };
let groupedData = reactive()
onLoad((options) => {
  let data = JSON.parse(options.param)

  groupedData = Object.values(data).reduce((acc, item) => {
    if (!acc[item.qType]) {
      acc[item.qType] = [];
    }
    acc[item.qType].push(item);
    return acc;
  }, {});

  const stats = calculateStatistics(data);

  console.log("Chapter Name:", stats.chapterName);
  console.log("Total Questions:", stats.totalQuestions);
  console.log("Answered Correctly:", stats.answeredCorrectly);
  console.log("Answered Incorrectly:", stats.answeredIncorrectly);
  console.log("Not Answered:", stats.notAnswered);
  console.log("Correct Rate:", stats.correctRate.toFixed(2));
})


function calculateStatistics(data) {
  const totalQuestions = Object.keys(data).length;
  const answeredCorrectly = Object.values(data).filter(item => item.isCorrect).length;
  const answeredIncorrectly = Object.values(data).filter(item => !item.isCorrect).length;
  const notAnswered = totalQuestions - (answeredCorrectly + answeredIncorrectly);
  const correctRate = (answeredCorrectly / totalQuestions) * 100;
  const chapterName = data[Object.keys(data)[0]].chapter_name;

  return {
    chapterName,
    totalQuestions,
    answeredCorrectly,
    answeredIncorrectly,
    notAnswered,
    correctRate
  };
}

</script>

<style lang="scss">
.exam-report {
  width: 692rpx;
  height: 458rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin: 23rpx 29rpx 0rpx 29rpx;

  .percent-letter {
    width: 116rpx;
    height: 40rpx;
    font-size: 29rpx;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #262626;
    line-height: 0rpx;
    padding-top: 45rpx;
    padding-left: 22rpx;
  }

  .percent-body {
    position: relative;
    margin-bottom: 20px; // 添加底部边距

    .score {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      text {
        color: #333; // 根据您的图片选择的字体颜色
      }

      .score-value {
        font-size: 30px; // 根据您的图片选择的字体大小
      }
    }
  }
}

</style>
