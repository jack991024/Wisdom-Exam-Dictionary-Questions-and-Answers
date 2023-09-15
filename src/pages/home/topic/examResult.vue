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
            <text class="score-value">{{ stats.correctRate }}%</text>
            <text class="">/</text>
            <text class="">100</text>
          </view>
        </view>
        <view class="line">
          <u-line length="610rpx"></u-line>
        </view>
        <view class="exam-title">
          <text>练习类型：{{ stats.chapterName }}</text>
        </view>
        <view class="exam-time">
          <text>交卷时间：{{ stats.currentDate }}</text>
        </view>
      </view>
    </view>

    <view class="exam-person-info">
      <view class="title" style="padding-top: 22rpx;padding-left: 22rpx;">
        考试情况
      </view>
      <view class="body">
        <view class="info-item">
          <view class="info-label">一共</view>
          <view class="info-value" style="font-family: DIN-Bold, DIN;font-weight: bold;color: #1D65FE;">{{ stats.totalQuestions }}</view>
        </view>

        <view class="info-item">
          <view class="info-label">答对</view>
          <view class="info-value" style="font-family: DIN-Bold, DIN;font-weight: bold;color: #4CDA94;">{{ stats.answeredCorrectly }}</view>
        </view>

        <view class="info-item">
          <view class="info-label">答错</view>
          <view class="info-value" style="font-family: DIN-Bold, DIN;font-weight: bold;color: #FF3B30;">{{ stats.answeredIncorrectly }}</view>
        </view>

        <view class="info-item">
          <view class="info-label">未答</view>
          <view class="info-value" style="font-family: DIN-Bold, DIN;font-weight: bold;color: #FFA041;">{{ stats.notAnswered }}</view>
        </view>

        <view class="info-item">
          <view class="info-label">准确率</view>
          <view class="info-value" style="font-family: DIN-Bold, DIN;font-weight: bold;color: #E068FF;">{{ stats.correctRate }}%</view>
        </view>
      </view>
    </view>

    <view class="exam-info-card">
      <view class="card-header">
        <text>答题卡</text>
      </view>
      <view class="card-status">
        <view class="status-item">
          <view class="status-icon" style="background-color: grey;"></view>
          <text>未做</text>
        </view>
        <view class="status-item">
          <view class="status-icon" style="background-color: #4CDA94;"></view>
          <text>正确</text>
        </view>
        <view class="status-item">
          <view class="status-icon" style="background-color: #FF3B30;"></view>
          <text>错误</text>
        </view>
      </view>
      <view class="card-body">
        <view class="question-category" v-for="(questions, qType) in groupedData" :key="qType">
          <view class="category-header">
            <text>{{ qType == '1' ? '单选题' : '多选题' }}</text>
          </view>
          <view class="category-body">
            <view
                v-for="(item, index) in questions"
                :key="index"
                :class="['question-block', item.isCorrect ? 'correct' : item.answer.length === 0 ? 'not-done' : 'incorrect']"
            >
              <text>{{ parseInt(item.questionNumber) + 1 }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import LCircularProgress from './CustomProgress.vue'
import {onLoad} from '@dcloudio/uni-app';
import {reactive, ref} from 'vue';


let chapterName = {value: ""};
let totalQuestions = {value: 0};
let answeredCorrectly = {value: 0};
let answeredIncorrectly = {value: 0};
let notAnswered = {value: 0};
let correctRate = {value: 0};
let groupedData = reactive()
let stats = reactive({})
onLoad((options) => {
  let data = JSON.parse(options.param)

  console.log(JSON.stringify(data))


  groupedData = Object.entries(data).reduce((acc, [questionNumber, item]) => {
    if (!acc[item.qType]) {
      acc[item.qType] = [];
    }
    acc[item.qType].push({...item, questionNumber});
    return acc;
  }, {});

  console.log(JSON.stringify(groupedData))

  const calculatedStats = calculateStatistics(data);

  stats.chapterName = calculatedStats.chapterName;
  stats.totalQuestions = calculatedStats.totalQuestions;
  stats.answeredCorrectly = calculatedStats.answeredCorrectly;
  stats.answeredIncorrectly = calculatedStats.answeredIncorrectly;
  stats.notAnswered = calculatedStats.notAnswered;
  stats.correctRate = calculatedStats.correctRate.toFixed(2);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  stats.currentDate = `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;


  console.log("Chapter Name:", stats.chapterName);
  console.log("Total Questions:", stats.totalQuestions);
  console.log("Answered Correctly:", stats.answeredCorrectly);
  console.log("Answered Incorrectly:", stats.answeredIncorrectly);
  console.log("Not Answered:", stats.notAnswered);
  console.log("Correct Rate:", stats.correctRate);
  console.log("Current Date:", stats.currentDate);
})


function calculateStatistics(data) {
  const totalQuestions = data[Object.keys(data)[0]].total;
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
  height: 505rpx;
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
      margin-top: -20rpx;

      text {
        color: #333; // 根据您的图片选择的字体颜色
      }

      .score-value {
        font-size: 30px; // 根据您的图片选择的字体大小
      }
    }
  }

  .line {
    margin-top: -215rpx;
    margin-left: 22rpx;
  }

  .exam-title {
    font-size: 25rpx;
    color: #262626;
    margin-left: 22rpx;
    margin-top: 22rpx;
    font-family: PingFang SC-Regular, PingFang SC;
  }

  .exam-time {
    font-size: 25rpx;
    margin-top: 22rpx;
    margin-left: 22rpx;
    font-family: PingFang SC-Regular, PingFang SC;
  }

}

.exam-person-info {
  width: 692rpx;
  height: 208rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin: 23rpx 29rpx 0rpx 29rpx;

  .body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;
    width: 612rpx;
    height: 109rpx;
    background: rgba(28, 101, 254, 0.05);
    border-radius: 7rpx 7rpx 7rpx 7rpx;
    opacity: 1;
    margin-left: 22rpx;
    margin-top: 12rpx;

    .info-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100rpx; // 调整为适合的宽度

      .info-label,
      .info-value {
        text-align: center; // 使文本居中对齐
      }

      .info-label {
        font-size: 22rpx;
      }
    }
  }
}

.exam-info-card {
  width: 692rpx;
  margin: 20rpx 29rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx;
  padding: 20rpx;

  .card-header {
    font-size: 30rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20rpx;
  }

  .card-status {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20rpx;

    .status-item {
      display: flex;
      align-items: center;

      .status-icon {
        width: 20rpx;
        height: 20rpx;
        border-radius: 10rpx;
        margin-right: 10rpx;
      }

      text {
        font-size: 22rpx;
      }
    }
  }

  .card-body {
    .question-category {
      margin-bottom: 20rpx;

      .category-header {
        font-size: 26rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }

      .category-body {
        display: flex;
        flex-wrap: wrap;

        .question-block {
          width: 60rpx;
          height: 60rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 5rpx;
          font-size: 22rpx;
          font-weight: bold;
          border-radius: 10rpx;
          text-align: center;

          &.not-done {
            background-color: grey;
          }

          &.correct {
            background-color: #4CDA94;
          }

          &.incorrect {
            background-color: #FF3B30;
          }
        }
      }
    }
  }
}


</style>
