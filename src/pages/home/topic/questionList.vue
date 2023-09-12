<template>
  <view class="container">
    <view v-for="(item,index) in questionLists" :key="index" class="question-item">
      <view class="question-content" @click="jumpQuestion(item)">
        <text class="question-name">{{ item.name }}</text>
<!--        <view :v-if="item.depth > 3">-->
<!--          <u-line-progress :percentage="correct" :showText="false" activeColor="#3C7BFB"/>-->
<!--        </view>-->
        <text class="question-total">本卷共{{ item.total }}卷</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app';
import {ref, computed} from 'vue';

const questionLists = ref([])
let correct = ref(0);
onLoad((options) => {
  console.log("param:" + options.arrayParam)
  questionLists.value = JSON.parse(options.arrayParam);
  console.log(questionLists.value)
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
    console.log(item.children)
    uni.navigateTo({
      url: '/pages/home/topic/questionList?arrayParam=' + JSON.stringify(item.children)
    })
  } else {
    // 否则跳转到做题页面
    let param = item.chid
    uni.navigateTo({
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
