<template>
  <view>
    <view class="news-body">
      <view class="news-title"><text>2022年江西一建准考证什么时候可以打印什么时候可以打印？</text></view>
      <view class="news-date"><text>2023-02-02 21:29:26</text></view>
      <view class="news-detail"><text>
          简述呼吸系统的特点及保健要点。简述呼吸系统的特点及保健要点。简述呼吸系统的特点及保健要点。简述呼吸系统的特点及保健要点。简述呼吸系统的特点及保健要点。简述呼吸系统的特点及保健要点。简述呼吸系统的特点及保健要点。简述呼吸系统的特点及保健要点。简述呼吸系统的特点及保健要点。简述呼吸系统的特点及保健要点。简述呼吸系统的特点及保健要点。简述呼吸系统的特点及保健要点。</text>
      </view>
      <view class="news-star">
        <view class="button">点赞</view>
        <view class="star"><text>5人觉得很赞</text></view>
      </view>
    </view>

    <view class="news-pinglun">
      <view class="news-pinglun-title">
        <text>精彩评论</text>
      </view>
      <view class="no-comments"> <!-- 修改这里，添加新的类名 -->
        <text>暂无题友评论</text>
      </view>
    </view>


    <view class="news-xiangguan">
      <view v-for="(item, index) in newsLists" :key="index" class="list-item">
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
  </view>
</template>

<script setup>
let newsLists = [1, 2, 3]
</script>

<style lang="scss">
.news-body {
  margin-top: 21rpx;
  margin-left: 29rpx;
  width: 692rpx;
  height: 908rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;

  .news-title {
    font-size: 29rpx;
    font-weight: bold;
    color: #262626;
    margin-left: 29rpx;
    margin-right: 29rpx;

    ::before {
      content: "";
      display: block;
      height: 10rpx;
    }
  }

  .news-date {
    font-size: 22rpx;
    color: #898989;
    margin-top: 15rpx;
    margin-left: 29rpx;
  }

  .news-detail {
    font-size: 25rpx;
    color: #262626;
    line-height: 58rpx;
    font-weight: 400;
    margin-left: 14px;
    margin-right: 29rpx;
  }

  .news-star {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 108rpx;

    .button {
      width: 152rpx;
      height: 62rpx;
      border-radius: 31rpx 31rpx 31rpx 31rpx;
      opacity: 1;
      border: 2rpx solid #3C7BFB;
      color: #3C7BFB;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .star {
      font-size: 25rpx;
      color: #636363;
      margin-top: 36rpx;
    }
  }
}

.news-pinglun {
  width: 692rpx;
  height: 514rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-left: 29rpx;
  margin-top: 22rpx;
  position: relative; // 添加这一行

  .news-pinglun-title {
    margin-left: 29rpx;
    font-size: 33rpx;
    font-weight: bold;
    color: #262626;

    ::before {
      content: "";
      display: block;
      height: 15rpx;
    }
  }

  .no-comments { // 添加这个新的类
    text-align: center;
    position: absolute; // 添加这一行
    top: 50%; // 添加这一行
    left: 0; // 添加这一行
    right: 0; // 添加这一行
    transform: translateY(-50%); // 添加这一行
  }
}




.news-xiangguan {
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
