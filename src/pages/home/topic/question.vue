<template>
  <swiper class="swiper-container" :indicator-dots="false">
    <swiper-item style="overflow: auto" v-for="(item,index,itemIndex) in questionLists.result" :key="index">
      <view class="main">
        <view class="title-and-count">
          <text class="chapter-name">{{ questionLists.chapter_name }}</text>
          <text class="count-info">{{ index + 1 }}/{{ questionLists.count }}</text>
        </view>

        <view class="question">
          <view class="question-description">
            <text class="question-type" v-if="item.qType===1 || item.qType===4">单选</text>
            <text class="question-type" v-if="item.qType===2">多选</text>
            <view v-if="item.materials!=null" class="material-swiper-container">
              <material-swiper :materials="item.materials"
                               :style="{ height: componentHeight + 'px' }"></material-swiper>
            </view>
            <rich-text :nodes="processAnalyseContent(item.stem)"></rich-text>
          </view>

          <view class="options">
            <!-- 使用v-for来循环渲染所有选项 -->
            <view
                v-for="(op, index) in item.option"
                :key="index"
                :class="['option-item', selectedOptions[itemIndex] && selectedOptions[itemIndex].includes(index) ? 'selected' : '']"
                @tap="() => toggleOption(itemIndex, index)"
            >
              <text class="option-label" v-if="item.qType !== 4">{{ op.label }}</text>
              <text class="option-label" v-else></text>
              <text class="option-description">{{ op.content }}</text>
            </view>
            <text v-if="item.qType===2" class="check-answer" @click="validateAnswer(itemIndex)">确认答案</text>

          </view>
          <view
              v-if="currentMode === 'recite'"
              class="answer"
          >
            <view class="answer">
              <u-divider text="试卷详解"></u-divider>
              <view class="correct-answer">正确答案是：{{ item.answer }}</view>
              <view class="answer-key">
                <view class="analysis">[解析]</view>
                <view class="analysis-parse">
                  <rich-text :nodes="processAnalyseContent(item.analyse)"></rich-text>
                </view>
              </view>
            </view>

            <view class="my-note" v-if="false">
              <view>我的笔记</view>
              <view>
                <up-button type="primary" icon="map" text="添加笔记"></up-button>
              </view>
            </view>

            <view class="question-friend-interaction" v-if="false">
              <view>题友互动</view>
            </view>
          </view>

          <view
              v-else-if="currentMode === 'practice' && userAnswers[itemIndex]"
              class="answer"
          >
            <view class="answer">
              <u-divider text="试卷详解"></u-divider>
              <view class="correct-answer">正确答案是：{{ item.answer }}</view>
              <view
                  :class="['your-answer', userAnswers[itemIndex] && userAnswers[itemIndex].isCorrect ? 'correct-answer' : 'incorrect-answer']">
                您的答案是：{{ indexToLetter(userAnswers[itemIndex] ? userAnswers[itemIndex].answer : []) }}
              </view>
              <view class="answer-key">
                <view class="analysis">[解析]</view>
                <view class="analysis-parse">
                  <rich-text :nodes="processAnalyseContent(item.analyse)"></rich-text>
                </view>
              </view>
            </view>

            <view class="my-note" v-if="false">
              <view class="note">
                <u-text text="我的笔记" size="18" align="center"></u-text>
                <view class="button">
                  <up-button type="primary" icon="edit-pen" text="添加笔记"></up-button>
                </view>
              </view>
            </view>

            <view class="question-friend-interaction" v-if="false">
              <view>题友互动</view>
            </view>
          </view>
        </view>

      </view>
    </swiper-item>
  </swiper>

  <view class="tarBar">
    <u-tabbar
        value=""
        @change=""
        :fixed="false"
        :placeholder="false"
        :safeAreaInsetBottom="false"
    >
      <u-tabbar-item text="目录" icon="list-dot" @click="openCatalog"></u-tabbar-item>
      <u-tabbar-item text="题卡" icon="list-dot" @click="openQuestionCard"></u-tabbar-item>
      <u-tabbar-item text="收藏" icon="star" @click="toggleFavorite"></u-tabbar-item>
      <u-tabbar-item text="模式" icon="list" @click="changeMode"></u-tabbar-item>
    </u-tabbar>

    <view v-if="isModeModalOpen" class="mode-modal">
      <u-button :plain="true" icon="edit-pen" text="练习模式" @click="selectMode('practice')"></u-button>
      <u-button :plain="true" icon="search" text="检测模式" @click="selectMode('exam')"></u-button>
      <u-button :plain="true" icon="grid" text="背题模式" @click="selectMode('recite')"></u-button>
    </view>

  </view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app';
import {ref, reactive} from 'vue';

const questionLists = ref([])
const selectedOptions = reactive({});
const componentHeight = ref(200); // 新增一个变量来存储组件的高度
function processAnalyseContent(analyse) {
  return analyse.replace(/\<img/gi, '<img style=max-width:100%;height:auto'); // 返回处理后的内容
}

const userAnswers = reactive({});

function indexToLetter(indexArray) {
  if (!indexArray) return '';
  return indexArray.map(index => String.fromCharCode(65 + index)).join(', ');
}

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
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImFkZGl0aW9uYWxfY2xhaW1zIjp7InRlcm1pbmFsIjoid3gifSwiZXhwIjoxNzI2MDAxODU3fQ.8vUDSNWDx3B_bwxRj2mPK6gABzWcwUs6pw6VKRuJVgY"
    },
    method: 'POST',
    data: data,
    success: (res) => {
      console.log(123)
      console.log(res.data.data)
      // 确保响应中有数据
      if (res.data && res.data.data) {
        let result = res.data.data.result;

        // 对于每个问题，如果qType为4，则为其添加选项
        for (let item of result) {
          if (item.qType === 4) {
            item.option = [
              {
                "label": "0",
                "content": "错误"
              },
              {
                "label": "1",
                "content": "正确"
              }
            ];
          }
        }

        questionLists.value = {
          chapter_name: res.data.data.chapter_name,
          count: res.data.data.count,
          result: result
        }
      }
      console.log(questionLists)
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

  const currentQuestionType = questionLists.value.result[questionIndex].qType;

  // If it's a single-choice question or qType === 4, clear the current question's selected options array
  if (currentQuestionType === 1 || currentQuestionType === 4) {
    selectedOptions[questionIndex] = [optionIndex];
  } else {
    // For other types of questions, maintain the existing multi-choice logic
    const index = selectedOptions[questionIndex].indexOf(optionIndex);
    if (index === -1) {
      selectedOptions[questionIndex].push(optionIndex);
    } else {
      selectedOptions[questionIndex].splice(index, 1);
    }
  }

  // Validate the answer
  validateAnswer(questionIndex, optionIndex);
}



function validateAnswer(questionIndex) {
  const question = questionLists.value.result[questionIndex];
  const correctAnswer = question.answer.split('').map(char => char.charCodeAt(0) - 65);
  const selectedAnswer = selectedOptions[questionIndex];

  userAnswers[questionIndex] = {
    answer: selectedOptions[questionIndex],
    isCorrect: JSON.stringify(correctAnswer.sort()) === JSON.stringify(selectedAnswer.sort())
  };
}


const isModeModalOpen = ref(false);

function changeMode() {
  isModeModalOpen.value = !isModeModalOpen.value;
}

const currentMode = ref('exam');  // 新增，用于存储当前选择的模式，默认exam

function selectMode(mode) {
  console.log('Selected mode:', mode);
  currentMode.value = mode;  // 更新当前模式
  isModeModalOpen.value = false;
  // 在这里添加你的模式切换逻辑...
}

</script>

<style lang="scss">
.swiper-container {
  height: 100vh; // 设置swiper容器的高度为视口的高度

  .swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
  }

  .main {
    overflow-y: auto; // 允许垂直滚动
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
      display: flex;
      flex-direction: column;

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
            min-width: 24px;
            min-height: 24px;
            background-color: transparent; // 使背景透明
            border: 1px solid #3C7BFB; // 设置边框颜色为 #3C7BFB
            color: #3C7BFB; // 设置文本颜色为 #3C7BFB
          }
        }

        .option-label {
          min-width: 24px;
          min-height: 24px;
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

  .answer {
    background-color: #F8F8F8; // 设置背景颜色
    padding: 10px; // 设置内部填充
    border-radius: 10px; // 设置边框半径
    margin-top: 10px; // 设置上边距

    .correct-answer {
      font-size: 14px; // 设置字体大小
      color: #b4dcab; // 设置字体颜色
      margin-bottom: 5px; // 设置下边距
    }

    .incorrect-answer {
      font-size: 14px; // 设置字体大小
      color: #ec5c4e; // 设置字体颜色
      margin-bottom: 5px; // 设置下边距
    }

    .answer-key {
      display: block; // 设置为弹性布局
      align-items: flex-start; // 设置垂直对齐方式

      .analysis {
        display: block; // 设置为块级元素，占据整行
        font-size: 14px; // 设置字体大小
        color: #333; // 设置字体颜色
        margin-right: 10px; // 设置右边距
      }

    }
  }

}

.mode-modal {
  position: fixed;
  bottom: 50px;
  left: 273px;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent background
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.mode-options-container {
  background-color: #fff; // White background
  border-radius: 22px 22px 0 0; // Top rounded corners
  width: 100%; // Full width
  padding: 20px; // Padding inside
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); // Shadow at the bottom
}

.mode-option {
  padding: 10px;
  margin: 10px 0; // Margin at top and bottom
  border-radius: 12px; // Rounded corners
  background-color: #f0f0f0; // Grey background
  text-align: center; // Centered text
}

.analysis-parse {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%; /* 设置宽度为100% */
}

rich-text {
  width: 100%; /* 设置宽度为100% */
}

.my-note {
  margin-top: 12px;

  .note {
    margin-top: 16px;

    .button {
      margin-top: 12px;
      width: 96px;
      height: 34px;
    }
  }
}

.material-swiper-container {
  position: fixed; /* Fixed position */
  bottom: 0; /* Align to the bottom */
  width: 100%; /* Full width */
  right: 1px;
  background-color: white; /* Background color */
  border-top-left-radius: 15px; /* Rounded corners at the top */
  border-top-right-radius: 15px; /* Rounded corners at the top */
}

.check-answer {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3C7BFB;
  color: #FFFFFF;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin: 0 auto; /* This will center the button */
}

</style>
