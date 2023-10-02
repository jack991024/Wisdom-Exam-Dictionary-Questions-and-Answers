<template>
  <view class="list">
    <view v-for="(item, index) in newsLists" :key="index" class="list-item" @click="naviTo">
      <view>
        <view class="title">
          <text>甲是乙公司的会计，挪用本公司的货币财产，用来投资经济效益很好的丙公司。后来公司发现这一,后来公司发现这一
          </text>
        </view>
        <view class="footer">
          <view class="left">
            <view class="createTime">
              <text>2023-02-02 21:29:26</text>
            </view>
          </view>
          <view class="right">
            <view class="like">
              <image src="./static/news/like.png" mode="widthFix"
                style="width: 21.98rpx;height: 23.55rpx;margin-right: 9.06rpx;"></image>
              <text>50</text>
            </view>
            <view class="comment">
              <image src="./static/news/comment.png" mode="widthFix"
                style="width: 23.55rpx;height: 23.55rpx;margin-right: 9.06rpx;"></image>
              <text>23</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
let newsLists = [1, 2, 3]

const naviTo = () => {
uni.navigateTo({
  url:'/pages/home/topic/exam-news-detail'
})
}
</script>

<style lang="scss">
.list {
  margin-top: 29rpx;

  .list-item {
    width: 692rpx;
    height: 167rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
    margin-left: 29rpx;
    margin-bottom: 29rpx;

    .title {
      margin-top: 22rpx;
      font-size: 29rpx;
      font-weight: bold;
      color: #262626;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-right: 22rpx;
      margin-left: 22rpx;
    }

    .footer {
      margin-top: 15rpx;
      display: flex;
      justify-content: space-between;

      .createTime {
        margin-left: 22rpx;
        font-size: 22rpx;
        color: #898989;
      }

      .right {
        display: flex;

        .like {
          font-size: 22rpx;
          color: #898989;
          margin-right: 35rpx;
        }

        .comment {
          font-size: 22rpx;
          color: #898989;
          margin-right: 22rpx;
        }
      }
    }
  }
}
</style>
