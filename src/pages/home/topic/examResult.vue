<template>
  <view>
    <view class="exam-report">
      <view class="percent">
        <view class="percent-letter">
          <text>练习报告</text>
        </view>
        <view class="percent-body">
          <LCircularProgress :value="stats.correctRate"/>
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
          <view class="info-value" style="font-family: DIN-Bold, DIN;font-weight: bold;color: #1D65FE;">
            {{ stats.totalQuestions }}
          </view>
        </view>

        <view class="info-item">
          <view class="info-label">答对</view>
          <view class="info-value" style="font-family: DIN-Bold, DIN;font-weight: bold;color: #4CDA94;">
            {{ stats.answeredCorrectly }}
          </view>
        </view>

        <view class="info-item">
          <view class="info-label">答错</view>
          <view class="info-value" style="font-family: DIN-Bold, DIN;font-weight: bold;color: #FF3B30;">
            {{ stats.answeredIncorrectly }}
          </view>
        </view>

        <view class="info-item">
          <view class="info-label">未答</view>
          <view class="info-value" style="font-family: DIN-Bold, DIN;font-weight: bold;color: #FFA041;">
            {{ stats.notAnswered }}
          </view>
        </view>

        <view class="info-item">
          <view class="info-label">准确率</view>
          <view class="info-value" style="font-family: DIN-Bold, DIN;font-weight: bold;color: #E068FF;">
            {{ stats.correctRate }}%
          </view>
        </view>
      </view>
    </view>

    <view class="exam-info-card">
      <view class="card-header-container">
        <view class="card-header">
          <text>答题卡</text>
        </view>
        <view class="card-status">
          <view class="status-item">
            <view class="status-icon" style="background-color: #f6f6f6;"></view>
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
      </view>
      <view class="card-body">
        <view class="question-category" v-for="(questions, qType) in groupedData" :key="qType">
          <view class="category-header">
            <text v-if="qType === '1'">{{ '单选题' }}</text>
            <text v-if="qType === '2'">{{ '多选题' }}</text>
            <text v-if="qType === '3'">{{ '材料题' }}</text>
            <text v-if="qType === '4'">{{ '判断题' }}</text>
            <text v-if="qType === '5'">{{ '简答题' }}</text>
          </view>
          <view class="category-body">
            <view
                v-for="(item, index) in questions"
                :key="index"
                :class="['question-block', item.status === '正确' ? 'correct' : item.status === '错误' ? 'incorrect' : 'not-done']"
            >
              <text>{{ parseInt(index) + 1 }}</text>
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

let stats = reactive({
  chapterName: '',
  totalQuestions: 0,
  answeredCorrectly: 0,
  answeredIncorrectly: 0,
  notAnswered: 0,
  correctRate: 0,
  currentDate: ''
});
let groupedData = reactive({});

onLoad(() => {
  const param = JSON.parse(uni.getStorageSync("param"));
  const questionList = JSON.parse(uni.getStorageSync("questionList")).result;

  // 初始化一个新的对象，其中每个题目的默认状态都是"未做"。
  let questionStatus = [];
  for (let question of questionList) {
    questionStatus.push({
      ...question,
      status: "未做"
    });
  }
  // 遍历param，并更新每个题目的状态为"已做"或"做错"。
  for (let qid in param) {
    if (questionStatus[qid]) {
      questionStatus[qid].status = param[qid].isCorrect ? "正确" : "错误";
    }
  }

  // 使用新的对象来更新groupedData，这样它就会包含所有题目的状态。
  groupedData = questionStatus.reduce((acc, question) => {
    const qType = question.qType;
    if (!acc[qType]) {
      acc[qType] = [];
    }
    acc[qType].push(question);
    return acc;
  }, {});

  const calculatedStats = calculateStatistics(param, questionList);
  Object.assign(stats, calculatedStats);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  stats.currentDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  uni.removeStorageSync("param");
  uni.removeStorageSync("questionList");
});

function calculateStatistics(param, questionList) {
  const totalQuestions = questionList.length;
  const answeredCorrectly = Object.values(param).filter(item => item.isCorrect).length;
  const notAnswered = totalQuestions - Object.keys(param).length;
  const answeredIncorrectly = totalQuestions - answeredCorrectly - notAnswered;
  const correctRate = (answeredCorrectly / totalQuestions) * 100;
  const chapterName = questionList[0].chapter_name;

  return {
    chapterName,
    totalQuestions,
    answeredCorrectly,
    answeredIncorrectly,
    notAnswered,
    correctRate: correctRate.toFixed(2)
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

  .card-header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx;
    margin-bottom: 20rpx;

    .card-header {
      font-size: 30rpx;
      font-weight: bold;
    }

    .card-status {
      display: flex;
      align-items: center;
      margin-right: 188rpx;

      .status-item {
        display: flex;
        align-items: center;
        margin-left: 20rpx;

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
  }


  .card-body {
    margin-top: 22rpx;
    margin-left: 22rpx;

    .question-category {
      margin-bottom: 20rpx;

      .category-header {
        font-size: 30rpx;
        color: #636363;
        margin-bottom: 10rpx;
      }

      .category-body {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .question-block {
          width: 90.58rpx; // 调整为适当的宽度以适应5个元素每行
          height: 90.58rpx; // 调整高度以保持它为圆形
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20rpx 40rpx 20rpx 0rpx;
          font-size: 22rpx;
          font-weight: bold;
          border-radius: 50%; // 设置为圆形
          text-align: center;

          &.not-done {
            background-color: #F7F7F7;

            text {
              color: #AEAEB2;
            }
          }

          &.correct {
            background-color: #4CDA94;

            text {
              color: #FFFFFF;
            }
          }

          &.incorrect {
            background-color: #FF3B30;

            text {
              color: #FFFFFF;
            }
          }
        }
      }

    }
  }
}


</style>
