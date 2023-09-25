<template>
  <view>
    <view class="header">
      <view style="margin-top: 30rpx">
        <view class="kefu-body">
          <view class="kefu1" @click="">
            <image src="../../../static/person/kefu1.png" class="kefu-icon"></image>
            <text class="item-text">售前客服</text>
          </view>
          <view class="kefu2" @click="">
            <image src="../../../static/person/kefu2.png" class="kefu-icon"></image>
            <text class="item-text">售后客服</text>
          </view>
          <view class="kefu3" @click="">
            <image src="../../../static/person/kefu3.png" class="kefu-icon"></image>
            <text class="item-text">技术支持</text>
          </view>
        </view>
      </view>
    </view>

    <view style="margin-top: 30rpx;margin-left: 28rpx;margin-bottom: 20rpx">
      <text style="font-size: 38rpx;color: #262626;">常见问题</text>
    </view>

    <view class="body">
      <mp-html content="123"></mp-html>
    </view>
  </view>
</template>

<script>

</script>

<style lang="scss">
.header {
  width: 692rpx;
  height: 203rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-top: 22rpx;
  margin-left: 29rpx;

  .kefu-body {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 28rpx;

    .kefu1, .kefu2, .kefu3 {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30rpx;

      .kefu-icon {
        width: 106.88rpx;
        height: 106.88rpx;
      }

      .item-text {
        text-align: center;
        height: 31rpx;
        font-size: 22rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        color: #262626;
        margin-top: 18rpx;
      }
    }
  }

  .body {
    margin-top: 20rpx;
    margin-left: 29rpx;
    width: 692rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
  }
}
</style>
