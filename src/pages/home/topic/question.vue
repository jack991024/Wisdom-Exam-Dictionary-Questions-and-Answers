<template>
  <swiper class="swiper-container" :indicator-dots="false">
    <swiper-item v-for="(item,index,itemIndex) in questionLists.result" :key="index">
      <view class="main">
        <view class="title-and-count">
          <text class="chapter-name">{{ questionLists.chapter_name }}</text>
          <text class="count-info">{{ index + 1 }}/{{ questionLists.count }}</text>
        </view>

        <view class="question">
          <view class="question-description">
            <text class="question-type" v-if="item.qType===1">单选</text>
            <text>{{ item.stem }}</text>
          </view>

          <view class="options">
            <!-- 使用v-for来循环渲染所有选项 -->
            <view
                v-for="(op, index) in item.option"
                :key="index"
                :class="['option-item', selectedOptions[itemIndex] && selectedOptions[itemIndex].includes(index) ? 'selected' : '']"
                @tap="() => toggleOption(itemIndex, index)"
            >
              <text class="option-label">{{ op.label }}</text>
              <text class="option-description">{{ op.content }}</text>
            </view>
          </view>
        </view>

      </view>
    </swiper-item>
  </swiper>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app';
import {ref, reactive} from 'vue';

const questionLists = ref([])
const selectedOptions = reactive({});

onLoad((options) => {
  console.log(options)
  let chid = options.param
  let data = {
    chid: chid,
    encrypt: 0
  }

  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/getExercise',
    header: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImFkZGl0aW9uYWxfY2xhaW1zIjp7InRlcm1pbmFsIjoid3gifSwiZXhwIjoxNzI1OTE3MjQ2fQ.8R2twadVvhI0EeiJImnkrgF8ryS2SyJI-qf5geKeU04"
    },
    method: 'POST',
    data: data,
    success: (res) => {
      // 确保响应中有数据
      if (res.data && res.data.data) {
        questionLists.value = {
          chapter_name: res.data.data.chapter_name,
          count: res.data.data.count,
          result: res.data.data.result
        }
      }
    },
    fail: (err) => {
      console.log('error', err);
    }
  })
})

function toggleOption(questionIndex, optionIndex) {
  if (!selectedOptions[questionIndex]) {
    selectedOptions[questionIndex] = [];
  }

  const optionLetter = String.fromCharCode(65 + optionIndex); // 将索引转换为字母

  if (questionLists.value.result[questionIndex].qType === 1) {
    selectedOptions[questionIndex] = [optionLetter];
  } else {
    const index = selectedOptions[questionIndex].indexOf(optionLetter);
    if (index === -1) {
      selectedOptions[questionIndex].push(optionLetter);
    } else {
      selectedOptions[questionIndex].splice(index, 1);
    }
  }

  // 验证答案
  validateAnswer(questionIndex);
}

function validateAnswer(questionIndex, optionIndex) {
  const correctAnswer = questionLists.value.result[questionIndex].answer;
  const selectedAnswer = selectedOptions[questionIndex];

  // 将两个数组（答案和选定的选项）转换为字符串进行比较
  if (JSON.stringify(correctAnswer) === JSON.stringify(selectedAnswer[0])) {
    // 答案正确的业务逻辑
    console.log("Correct Answer");
    // ... 添加您的业务逻辑代码
  } else {
    // 答案错误的业务逻辑
    console.log("Wrong Answer");
    // ... 添加您的业务逻辑代码
  }
}

</script>

<style lang="scss">
.swiper-container {
  height: 100vh; // 设置swiper容器的高度为视口的高度

  .swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main {
  }

  .title-and-count {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff; // 灰色背景
    padding: 15px; // 内部填充，使内容不紧贴边缘
    border-radius: 10px; // 圆角边框
    margin: 10px 0; // 上下外边距，为元素提供一些间距

    .chapter-name {
      font-size: 16px; // 较大的字体大小
      font-weight: bold; // 加粗字体
      color: #333; // 深色文本
    }

    .count-info {
      font-size: 16px; // 较小的字体大小
      color: #666; // 浅色文本
    }
  }

  .question {
    background-color: #fff; // 白色背景
    padding: 15px; // 内部填充
    border-radius: 10px; // 圆角边框

    .question-description {
      font-size: 16px; // 问题描述的字体大小
      color: #333; // 深色文本
      margin-bottom: 10px; // 问题描述和选项之间的间距

      .question-type {
        background-color: #f0f0f0; // 灰色背景
        color: #666; // 浅色文本
        font-size: 11px; // 字体大小
        padding: 2px 8px; // 内部填充
        border-radius: 12px; // 圆角边框
        margin-right: 10px; // 标签和问题描述之间的间距
      }
    }

    .options {
      .option-item {
        display: flex; // 使标签和描述水平对齐
        align-items: center; // 垂直居中对齐
        margin-bottom: 8px; // 选项之间的间距
        padding: 10px; // 增加一些内部填充
        border-radius: 5px; // 增加一些边框半径
        transition: background-color 0.3s; // 添加过渡效果

        &.selected {
          //background-color: #f0f0f0; // 选中状态的背景颜色
          //color: #333; // 选中状态的文本颜色

          .option-label {
            background-color: transparent; // 使背景透明
            border: 1px solid #3C7BFB; // 设置边框颜色为 #3C7BFB
            color: #3C7BFB; // 设置文本颜色为 #3C7BFB
          }
        }

        .option-label {
          background-color: transparent; // 使背景透明
          border-radius: 50%; // 圆角效果
          padding: 5px; // 内部填充
          width: 24px; // 设置一个固定的宽度
          height: 24px; // 设置一个固定的高度
          display: flex; // 使得内容在中心
          align-items: center; // 垂直居中
          justify-content: center; // 水平居中
          font-size: 14px; // 字体大小
          font-weight: bold; // 加粗字体
          color: #333; // 文本颜色
          border: 1px solid #333;
          margin-right: 10px; // 标签和描述之间的间距
        }


        .option-description {
          font-size: 16px; // 选项描述的字体大小
          color: #333; // 深色文本
        }
      }
    }
  }

}
</style>
