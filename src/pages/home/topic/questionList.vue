<template>
  <view class="container">
    <view v-for="(item,index) in questionLists" :key="index" class="question-item">
      <view class="question-content" @click="jumpQuestion(item.chid)">
        <text class="question-name">{{ item.name }}</text>
        <text class="question-total">本卷共{{ item.total }}卷</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app';
import {ref} from 'vue';

const questionLists = ref([])

onLoad((options) => {
  questionLists.value = JSON.parse(options.arrayParam);
  console.log(questionLists.value)
})

const jumpQuestion = (item) => {
  let param = item
  uni.navigateTo({
    url: '/pages/home/topic/question?param=' + param
  })
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5; // 一个淡灰色背景
}

.question-item {
  width: 90%; // 这将使内部view占据大多数空间，但留有一些边距
  background-color: #fff; // 白色背景
  border-radius: 10px; // 圆角
  margin-bottom: 10px; // 一些底部边距，以分隔各个项目
  padding: 15px; // 内部填充，使内容不紧贴边缘

  .question-content {
    display: flex;
    flex-direction: column;

    .question-name {
      font-size: 16px; // 第一个文本元素（问题名称）的字体较大
      color: #333; // 深色文本
      margin-bottom: 5px; // 在两行文本之间添加一些空间
      overflow: hidden; // 隐藏超出容器的内容
      white-space: nowrap; // 阻止文本换行
      text-overflow: ellipsis; // 添加省略号以指示文本被截断
      max-width: 95%; // 限制最大宽度
    }

    .question-total {
      font-size: 12px; // 第二个文本元素（总卷数）的字体稍小
      color: #666; // 浅色文本
    }
  }
}
</style>
