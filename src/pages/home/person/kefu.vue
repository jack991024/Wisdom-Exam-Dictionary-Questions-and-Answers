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
      <view style="margin-top: 15px;">
        <text class="title">智考典题库小程序用户问题解答</text>
      </view>
      <view v-for="(item,index) in contents" :key="index" class="item">
        <text class="item-title">{{ item.title }}</text>
        <text class="item-content">{{ item.content }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
let contents = [
  {
    title: "1.题库购买了还要交费吗?",
    content: "您题库是开通了的，选择科目后点击个人中心我的题库做题。"
  },
  {
    title: "2.我怎么找不到我的科目?",
    content: "您先任意选择一个科目，选择科目后点击个人中心我的题库做题。"
  },
  {
    title: "3.怎么清理做题记录?",
    content: "您在刷题界面点击进去，做题界面有个题卡有清除做题记录。"
  },
  {
    title: "4.怎么同步做题记录?",
    content: "点击“我的界面”点击右上角设置按钮，点击同步做题记录。"
  },
  {
    title: "5.怎么退出重新登陆啊?",
    content: "点击“我的界面”点击右上角设置按钮，退出登陆。"
  },
  {
    title: "6.页面提示加载中?",
    content: "1.建议更换成火狐或者谷歌浏览器:\n2、清理浏览器历史记录:\n3.重启路由器:将路由器电源拔掉，断开5分钟以后，再重新接通电源尝试。\n如果以上方法扔无法恢复正常，您可以提供给我们您的Q0号，由技术老师远程远程解决!"
  },
  {
    title: "7.课程支付方式?",
    content: "智考典题库的可以通过在线方式进行支付。目前支付的方式有:支付宝支付、微信支付。支付成功以后，进入学习中心，即可看到已购买的题库。"
  },
  {
    title: "8.题库有效期?",
    content: "题库有效期是指课程能正常学习的时段。用户在购买题库后，可以在有效期内无限次刷题。"
  },
  {
    title: "9.页面卡顿怎么办?",
    content: "重启路由器:拔掉电源冷却几分钟再接通电源。"
  },
  {
    title: "10.可以在手机上登陆学习吗?",
    content: "可以。下载智考典题库APP就可以了。"
  },
  {
    title: "11.如何切换至其他考试?",
    content: "点击右上方的“切换”按钮，然后再选择职业考试“切换考试”，就可以轻松切换到其他的考试。"
  },
  {
    title: "12.刷题产生的流程怎么样?",
    content: "产生的流量非常小。根据我们的测试结果。"
  },
  {
    title: "13.手机客户端支持哪些手机?",
    content: "目前仅支持ios和android两类手机操作系统。"
  },
  {
    title: "14.软件只是试题，有没有解析的?",
    content: "(有)我们查到您使用的这个软件中是有部分试题有解析的，您点击显示全部答案，如果该题有解析，就会和答案一起显示的。解题思路能起到很好的答题效果，我们尽可能多的收集，但因为我们的试题库太大，因此现在还不能做到每一题都有相应的解题思路，我们会继续收集相关资料来更新完善软件。\n(没有)很抱歉了，您使用的这个软件目前还没有收集到相关试题解析，您可以结合一些书籍一起复习理解，我们也会持续关注这方面的资料，一旦收集到都会马上进行更新。"
  }, {
    title: "15.你们的答案都是正确的吧?",
    content: "不会有什么问题我们的试题在录入是都是进行过校对的，但由于试题量很大，不可能一点失误都没有的，市面上的很多同类软件或复习资料，也是存在不少错误，相比起来，我们的题库已经很精准了，再加上不断地升级，错漏只会越来越少的。如果您在使用中对我们的试题有疑问，请在试题下点击错误反馈，保存提交成功后，请点击软件右上角升级帮助中的错误反馈，点击全部反馈。"
  },
  {
    title: "16.看了你们的试题就能通过考试吧?",
    content: "根据这几年用户的反应，购买题库之后试题都有很大的帮助，大部分试题都有解题思路，对知识点的理解和掌握能够达到事半功倍效果，每个人的复习方法，接受能力是不一样的。但是如果能够结合一些书籍一起复习，我相信您是可以顺利通过考试的。"
  },
  {
    title: "17.考题质量怎么样，效果如何?",
    content: "它包含考试中所有的知识点，还有解题思路、历年真题做为参考，再结合软件各项功能一起复习，是能够起到很好的复习效果。"
  },
  {
    title: "18.学习可以手机、电脑、平板一起学习吗?",
    content: "是可以的，支持手机、电脑、平板一起学习。"
  },
  {
    title: "19.智考典题库有网校!",
    content: "有网校的、都是最新课程和题库。"
  },
  {
    title: "20.怎么联系老师!",
    content: "智考典APP里面有添加企业微信。"
  }
];


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
}

.body {
  margin-top: 20rpx;
  margin-left: 29rpx;
  width: 692rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;

  .title {
    margin-left: 14px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .item {
    display: flex;
    flex-direction: column;
    margin-top: 10rpx;
    margin-left: 14px;

    .item-title {
      font-weight: bold;
    }

    .item-content {
      margin-top: 10px;
    }
  }
}
</style>
