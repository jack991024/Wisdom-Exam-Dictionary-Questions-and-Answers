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
import {ref} from 'vue';

const userAnswers = ref()

const totalQuestions = ref();
const answeredCorrectly = ref();
const answeredIncorrectly = ref();
const notAnswered = ref();
const correctRate = ref()
const chapter_name=ref()

onLoad((options) => {
  userAnswers.value = options.param
  console.log(userAnswers.value)

  // 定义一些变量来存储计算结果
  totalQuestions.value = 0;
  answeredCorrectly.value = 0;
  answeredIncorrectly.value = 0;
  notAnswered.value = userAnswers.value[Object.keys(userAnswers.value)[0]].count; // 从数据中获取总题数

// 迭代JSON对象的每个条目
  for (let key in userAnswers.value) {
    totalQuestions.value += 1; // 每次迭代时增加题目总数

    if (data[key].isCorrect === true) {
      answeredCorrectly.value += 1; // 如果答对了，增加答对的题数
    } else if (data[key].answer.length !== 0) {
      answeredIncorrectly.value += 1; // 如果答错了（但有答案），增加答错的题数
    }
  }

// 计算没有回答的问题的数量
  notAnswered.value -= totalQuestions;

// 计算正确率
  correctRate.value = (answeredCorrectly / totalQuestions) * 100;

// 打印结果
  console.log("Total questions: ", totalQuestions);
  console.log("Number of correct answers: ", answeredCorrectly);
  console.log("Number of incorrect answers: ", answeredIncorrectly);
  console.log("Number of unanswered questions: ", notAnswered);
  console.log("Correct rate: ", correctRate.toFixed(2) + "%");
})
</script>

<style lang="scss">
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
</style>
