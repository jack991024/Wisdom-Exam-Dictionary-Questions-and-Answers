<template>
  <view class="container">
    <view v-for="(item,index) in questionLists" :key="index" class="question-item"
          :style="item.depth === 2 ? {'background-image': 'url(../../../static/topic/five-stars.png)'} : {}">
      <view class="question-content" @click="jumpQuestion(item)">
        <text class="question-name">{{ item.name }}</text>
        <view v-if="item.depth > 2" style="display: flex;align-items: center;">
          <view style="width: 318.84rpx;margin-right: 15rpx">
            <u-line-progress :percentage="computePercentage(item)" :showText="false" activeColor="#3C7BFB" height="4.5"/>
          </view>
          <view class="done-info" style="font-size: 24.74rpx;color: #262626;">
            {{ item.done }}/{{ item.total }}
          </view>
        </view>
        <view v-else>
          <text class="question-total">本卷共{{ item.total }}卷</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app';
import {ref, computed} from 'vue';

const computePercentage = (item) => {
  const done = item.done || 0;
  const total = item.total || 0;

  // 防止除以零错误
  if (total === 0) {
    return 0;
  }

  // 计算百分比并返回
  return (done / total) * 100;
};

const questionLists = ref([])
let correct = ref(0);
onLoad((options) => {
  questionLists.value = JSON.parse(options.arrayParam);
})

const computedCorrect = computed(() => {
  // 在这里计算correct的值，假设item的done和total属性分别表示已完成和总数
  const done = item.done || 0;
  const total = item.total || 0;

  // 防止除以零错误
  if (total === 0) {
    return 0;
  }

  // 计算百分比并返回
  return Math.floor((done / total) * 100).toFixed(2);
});

const jumpQuestion = (item) => {
  if (item.children && item.children.length > 0) {
    // 如果有子节点，继续跳转到当前页面
    uni.navigateTo({
      url: '/pages/home/topic/questionList?arrayParam=' + JSON.stringify(item.children)
    })
  } else {
    // 否则跳转到做题页面
    let param = item.chid
    uni.reLaunch({
      url: '/pages/home/topic/question?param=' + param
    })
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5; // 一个淡灰色背景
  height: 100vh;
}

.question-item {
  width: 90%; // 这将使内部view占据大多数空间，但留有一些边距
  background-color: #fff; // 白色背景
  border-radius: 10px; // 圆角
  margin-bottom: 10px; // 一些底部边距，以分隔各个项目
  padding: 15px; // 内部填充，使内容不紧贴边缘
  background-repeat: no-repeat;
  background-position: right center;

  .question-content {
    display: flex;
    flex-direction: column;

    .question-name {
      font-size: 33rpx; // 第一个文本元素（问题名称）的字体较大
      color: #262626; // 深色文本
      margin-bottom: 5px; // 在两行文本之间添加一些空间
      overflow: hidden; // 隐藏超出容器的内容
      white-space: nowrap; // 阻止文本换行
      text-overflow: ellipsis; // 添加省略号以指示文本被截断
      max-width: 95%; // 限制最大宽度
    }

    .question-total {
      font-size: 25rpx; // 第二个文本元素（总卷数）的字体稍小
      color: #AEAEB2; // 浅色文本
    }
  }
}
</style>
