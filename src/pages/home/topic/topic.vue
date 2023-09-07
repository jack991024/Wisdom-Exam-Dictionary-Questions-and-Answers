<template>
  <view class="header">
    <u-collapse>
      <u-collapse-item title="折叠面板1">
        <u-cell title="功能1"></u-cell>
        <u-cell title="功能2"></u-cell>
        <u-cell title="功能3"></u-cell>
        <!-- ...可以添加更多的<u-cell>组件来表示更多的功能 -->
      </u-collapse-item>
    </u-collapse>
  </view>

  <view class="header-swiper">
    <swiper :indicator-dots="true">
      <swiper-item>
        <image src="./static/login/logo.png" class="slide-image"></image>
      </swiper-item>
      <swiper-item>
        <image src="./static/login/logo.png" class="slide-image"></image>
      </swiper-item>
    </swiper>
  </view>

  <view class="header-menu">
    <view class="flex-container">
      <view class="flex-item" style="background-color: red;">元素1</view>
      <view class="flex-item" style="background-color: green;">元素2</view>
      <view class="flex-item" style="background-color: blue;">元素3</view>
      <view class="flex-item" style="background-color: yellow;">元素4</view>
    </view>
  </view>

  <view class="question-info">
    <view class="question-num">
      <u-cell-group :border=false>
        <u-cell title="总题数" value="123" center></u-cell>
        <u-cell title="已做" value="123" center></u-cell>
        <u-cell title="错题" value="123" center></u-cell>
      </u-cell-group>
    </view>
    <view class="question-rate">
      <u-cell title="完成率" value="123" center></u-cell>
      <u-line-progress :percentage="30" :showText="false" activeColor="#497df3"></u-line-progress>
      <u-cell title="正确率" value="123" center></u-cell>
      <u-line-progress :percentage="30" :showText="false" activeColor="#497df3"></u-line-progress>
    </view>
  </view>

</template>

<script setup>
import {ref} from 'vue';
</script>

<style lang="scss" scoped>
.header-menu {
  .flex-container {
    display: flex;
    flex-direction: row;
  }

  .flex-item {
    flex: 1;
    text-align: center;
    padding: 10px;
  }
}

.question-info{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: lightsteelblue;

  .question-num .question-rate{
    margin: 10px;
    background-color:lightsalmon;
  }
}
</style>