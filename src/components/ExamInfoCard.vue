<template>
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
      <view class="question-category">
        <view class="category-body">
          <view
              v-for="(item, index) in groupedData"
              :key="index"
              :class="['question-block', item.status === '正确' ? 'correct' : item.status === '错误' ? 'incorrect' : 'not-done']"
          >
            <text>{{ parseInt(index) + 1 }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const {groupedData} = defineProps();
</script>

<style lang="scss">
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

