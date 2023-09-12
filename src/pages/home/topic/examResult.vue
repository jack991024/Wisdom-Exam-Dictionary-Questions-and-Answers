<template>
  <view>
    <view class="exam-report">
      <view class="percent">
        <view class="percent-letter">
          <text>练习报告</text>
        </view>
        <view class="percent-body">
          <LCircularProgress :value="35"/>
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
import {ref, reactive} from 'vue';
import {useStore} from 'vuex'

const userAnswers = ref()
onLoad((options) => {
  let param = options.param
  userAnswers.value = param
  console.log(userAnswers)
})
</script>

<style lang="scss">

</style>
