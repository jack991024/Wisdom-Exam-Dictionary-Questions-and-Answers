<template>
  <swiper class="swiper-container" :indicator-dots="false" :current="currentIndex" @change="onSwiperChange">
    <swiper-item style="overflow: auto" v-for="(item, index, itemIndex) in questionLists.result" :key="index">
      <scroll-view scroll-y style="height: 100%">
        <view class="main">
          <view class="title-and-count">
            <text class="chapter-name">{{ questionLists.chapter_name }}</text>
            <text class="count-info">{{ index + 1 }}/{{ questionLists.count }}</text>
          </view>

          <view class="question">
            <view class="question-description">
              <view class="type-and-stem">
                <view class="stam">
                  <mp-html :content="processAnalyseContentTitle(item.stem, item.qType)" />
                </view>
              </view>
              <view v-if="item.materials.length > 0">
                <l-floating-panel>
                  <scroll-view scroll-y style="height: 100%">
                    <rich-text :nodes="processAnalyseContent(item.materials[0].content)"></rich-text>
                  </scroll-view>
                </l-floating-panel>
              </view>
            </view>

            <view class="options">
              <view v-if="item.qType === 5" class="jianda">
                <text class="label">请作答</text>

                <view class="textArea">
                  <u-textarea v-model="jiandaAnswer" placeholder="请输入您的解答"
                    placeholderClass="font-size: 25rpx;color: #AEAEB2;"></u-textarea>
                </view>
                <view style="display: flex;flex-direction: column;align-items: center;">
                  <view class="subButton">
                    <text style="font-size: 25rpx;" @click="validateAnswer(itemIndex, itemIndex, item, 'true')">确认答案
                    </text>
                  </view>
                </view>
              </view>
              <!-- 使用v-for来循环渲染所有选项 -->
              <view v-if="item.qType !== 5" v-for="(op, index) in item.option" :key="index"
                :class="['option-item', selectedOptions[itemIndex] && selectedOptions[itemIndex].includes(index) ? 'selected' : '']"
                @tap="() => currentMode.value !== 'recite' && toggleOption(itemIndex, index, item)">
                <!-- 当qType不等于4或者模式不是exam时，显示option-label -->
                <text v-if="item.qType !== 4 || currentMode.value !== 'exam'" class="option-label">
                  {{ op.label }}
                </text>
                <!-- 当qType等于4且模式不是exam时，显示特定的option-label -->
                <text v-else-if="item.qType === 4 && currentMode.value !== 'exam'" :class="[
                  'option-label',
                  userAnswers[itemIndex] && userAnswers[itemIndex].correctOption.includes(index) ? 'option-correct' : '',
                  userAnswers[itemIndex] && userAnswers[itemIndex].incorrectOption.includes(index) ? 'option-incorrect' : ''
                ]">
                </text>
                <rich-text class="option-description" :nodes="processAnalyseContent(op.content)"></rich-text>
              </view>

              <text v-if="item.qType === 2" class="check-answer"
                @click="validateAnswer(itemIndex, itemIndex, item, 'true')">
                确认答案
              </text>
              <view v-if="currentMode.value === 'exam' && index === questionLists.result.length - 1"
                class="submit-button-container">
                <text class="check-answer" @click="handleSubmitPaper">提交试卷</text>
              </view>
            </view>
            <view v-if="currentMode === 'recite'" class="answer">
              <view class="answer">
                <u-divider text="试卷详解"></u-divider>
                <view class="correct-answer">
                  正确答案是：{{ item.qType === 4 ? (item.answer === '1' ? 'B' : 'A') : item.answer }}
                </view>
                <view class="answer-key">
                  <view class="analysis">[解析]</view>
                  <view class="analysis-parse">
                    <rich-text :nodes="processAnalyseContent(item.analyse)"></rich-text>
                  </view>
                </view>
              </view>
            </view>

            <view
              v-if="currentMode === 'practice' && userAnswers[itemIndex] && (item.qType !== 2 || confirmedAnswers[itemIndex])"
              class="answer">
              <view class="answer">
                <u-divider text="试卷详解"></u-divider>
                <view class="correct-answer">
                  正确答案是：{{ item.qType === 4 ? (item.answer === '1' ? 'B' : 'A') : item.answer }}
                </view>
                <view v-if="item.qType !== 5"
                  :class="['your-answer', userAnswers[itemIndex] && userAnswers[itemIndex].isCorrect ? 'correct-answer' : 'incorrect-answer']">
                  您的答案是：{{
                    item.qType === 4
                    ? (userAnswers[itemIndex] && userAnswers[itemIndex].answer[0] === 1 ? 'B' : 'A')
                    : indexToLetter(userAnswers[itemIndex] ? userAnswers[itemIndex].answer : [], item.qType)
                  }}
                </view>
                <view class="answer-key">
                  <view class="analysis">[解析]</view>
                  <view class="analysis-parse">
                    <rich-text :nodes="processAnalyseContent(item.analyse)"></rich-text>
                  </view>
                </view>
              </view>
            </view>


          </view>

          <view v-if="true">
            <view class="my-note"
              v-if="(currentMode === 'practice' && userAnswers[itemIndex] && (item.qType !== 2 || confirmedAnswers[itemIndex])) || currentMode === 'recite'">
              <view class="title"><text>我的笔记</text></view>
              <view v-if="myNoteData">
                <view class="info">
                  <image :src="myNoteData.user.avatar" mode="widthFix"
                    style="width: 72.46rpx;height: 72.46rpx;border-radius: 50%;" />
                  <view style="margin-left:20rpx">
                    <view class="name"><text>{{ myNoteData.user.username }}</text></view>
                    <view class="date"><text>{{ timestampToDate(myNoteData.update_at) }}</text></view>
                  </view>
                </view>
                <view class="body">
                  <text>{{ myNoteData.comment }}</text>
                </view>
              </view>
              <view style="display: flex;
    justify-content: center;">
                <view class="button" @click="isPingLun = true">
                  <text>添加笔记</text>
                </view>
              </view>
            </view>
          </view>


          <view class="question-friend-interaction"
            v-if="(currentMode === 'practice' && userAnswers[itemIndex] && (item.qType !== 2 || confirmedAnswers[itemIndex])) || currentMode === 'recite'">
            <view class="question-friend-interaction-title">
              <view>
                <text>题友互动</text>
              </view>

              <view style="text-align: center;
  font-size: 26rpx;
  color: #7a7a7a;">
                <text>暂无题友互动</text>
              </view>

            </view>
          </view>

          <view class="catalog">
            <!-- 遮罩层 -->
            <div v-show="isMenu" class="overlay" @click="isMenu = false"></div>

            <!-- 弹出层 -->
            <div v-show="isMenu" class="custom-popup-left" :class="{ active: isMenu }">
              <scroll-view scroll-y style="height: 100%; overflow-y: auto;">
                <QuestionLists :initialQuestions="myQuestions" />
              </scroll-view>
            </div>
          </view>

        </view>
      </scroll-view>
    </swiper-item>
  </swiper>

  <!-- 遮罩层 -->
  <div v-show="isTiKa" class="overlay" @click="isTiKa = false"></div>

  <!-- 弹出层 -->
  <div v-show="isTiKa" class="custom-popup">
    <scroll-view scroll-y style="height: 100%; overflow-y: auto;">
      <ExamInfoCard :groupedData="groupedData" @changeQuestion="updateCurrentQuestion" />
    </scroll-view>
  </div>


  <!-- 遮罩层写评论 -->
  <div v-show="isPingLun" class="overlay" @click="isPingLun = false"></div>

  <!-- 弹出层写评论 -->
  <view v-show="isPingLun" class="custom-popup" style="background: #F3F3F3;height: 368rpx;">
    <view style="    
    display: flex;
    flex-direction: row;
    justify-content: space-between;">
      <view class="cancel" style="margin: 29rpx;color:#262626;" @click="isPingLun = false"><text>取消</text></view>
      <view class="sumbit" style="margin: 29rpx;color: #262626;" @click="fabiaopinglun"><text>发表</text></view>
    </view>
    <view class="input">
      <up-input placeholder="请输入内容" border="surround" v-model="pinglun" fontSize="22rpx" customStyle="
        width: 650rpx;
        height: 152rpx;
        background: #FFFFFF;
        border- radius: 7rpx 7rpx 7rpx 7rpx;
      opacity: 1;
      margin-left: 29rpx
      "></up-input>
    </view>
    <view style="margin-left: 29rpx;">
      <u-radio-group v-model="isRadioSelected">
        <u-radio shape="square" label="公开" name="公开" />
      </u-radio-group>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive, onMounted, watch } from 'vue';
import { useStore } from 'vuex'
import ExamInfoCard from "../../../components/ExamInfoCard.vue";
import QuestionLists from "../../../components/QuestionLists.vue";

const store = useStore()
const questionLists = ref([])
const selectedOptions = reactive({});
const componentHeight = ref(200); // 新增一个变量来存储组件的高度
let show = ref(false); // 初始化为未收藏状态
const isPingLun = ref(false)
let jiandaAnswer = ""
const isRadioSelected = ref(true)
const pinglun = ref("")

const fabiaopinglun = () => {
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/tk/pushComment",
    method: 'POST',
    data: {
      chid: questionLists.value.result[currentIndex.value].chid,
      qid: questionLists.value.result[currentIndex.value].qid,
      comment: pinglun.value
    },
    header: {
      "Content-Type": "application/json",
      "Authorization": store.getters.getToken
    },
    success: (res) => {
      console.log(res)
    },
    error: (error) => { }
  })
}

const open = () => {

  show.value = true
}

const close = () => {
  show.value = false
}

let currentIndex = ref(0); // 初始化为第一个题目

function updateCurrentQuestion(index) {
  currentIndex.value = index;
  isTiKa.value = false
}

function processAnalyseContentTitle(analyse, qType) {
  let questionTypeText = '';

  switch (qType) {
    case 1:
      questionTypeText = '单选';
      break;
    case 2:
      questionTypeText = '多选';
      break;
    case 4:
      questionTypeText = '判断';
      break;
    case 5:
      questionTypeText = '简答';
      break;
    default:
      break;
  }

  return `
    <view class="flex-container">
      <text class="question-type">${questionTypeText}</text>
      ${analyse.replace(/\<img/gi, '<img style=max-width:100%;height:auto')}
    </view>
  `;
}

function processAnalyseContent(analyse) {
  return analyse.replace(/\<img/gi, '<img style=max-width:100%;height:auto'); // 返回处理后的内容
}

const userAnswers = reactive({});

//确认答案
const confirmedAnswers = reactive({});
const groupedData = ref([])
const myQuestions = ref([])
const myNoteData = ref(null);

onLoad((options) => {
  let type = parseInt(options.type)
  let title = options.title
  let data = {}
  let current = options.currentIndex
  let url = ""
  if (type === 1) {
    let items = uni.getStorageSync("wrongQuestionListsNew")
    data = {
      items: items,
      encrypt: 0
    }

    uni.setNavigationBarTitle({
      title: title
    })
    url = 'https://dev.zhikaodian.com/apiV2/tk/getQuestions'
    selectMode('recite');
  } else if (type === 2) {
    let items = uni.getStorageSync("wrongQuestionLists")
    data = {
      chid: items.chid,
      encrypt: 0
    }

    uni.setNavigationBarTitle({
      title: title
    })
    url = 'https://dev.zhikaodian.com/apiV2/tk/myErrorQuestion'
    selectMode('recite');
  } else if (type === 3) {
    let items = uni.getStorageSync("wrongQuestionLists")
    data = {
      chid: items.chid,
      encrypt: 0
    }

    uni.setNavigationBarTitle({
      title: title
    })
    url = 'https://dev.zhikaodian.com/apiV2/tk/myErrorQuestion'
    selectMode('practice');
  } else if (type === 4) {
    let items = uni.getStorageSync("favQuestionListsNew")
    data = {
      items: items,
      encrypt: 0
    }

    uni.setNavigationBarTitle({
      title: title
    })
    url = 'https://dev.zhikaodian.com/apiV2/tk/getQuestions'
    selectMode('recite');
  } else if (type === 5) {
    let items = uni.getStorageSync("favQuestionLists")
    data = {
      chid: items.chid,
      encrypt: 0
    }

    uni.setNavigationBarTitle({
      title: title
    })
    url = 'https://dev.zhikaodian.com/apiV2/tk/myFavQuestion'
    selectMode('recite');
  } else if (type === 6) {
    let items = uni.getStorageSync("favQuestionLists")
    data = {
      chid: items.chid,
      encrypt: 0
    }

    uni.setNavigationBarTitle({
      title: title
    })
    url = 'https://dev.zhikaodian.com/apiV2/tk/myFavQuestion'
    selectMode('practice');
  } if (type === 7) {
    let items = uni.getStorageSync("wrongQuestionListsNew")
    data = {
      items: items,
      encrypt: 0
    }

    uni.setNavigationBarTitle({
      title: title
    })
    url = 'https://dev.zhikaodian.com/apiV2/tk/getQuestions'
    selectMode('recite');
  } if (type === 8) {
    let items = uni.getStorageSync("favQuestionListsNew")
    data = {
      items: items,
      encrypt: 0
    }

    uni.setNavigationBarTitle({
      title: title
    })
    url = 'https://dev.zhikaodian.com/apiV2/tk/getQuestions'
    selectMode('recite');
  } if (type === 9) {
    let chid = uni.getStorageSync("quanbujiexi");
    data = {
      chid: chid,
      encrypt: 0
    }


    uni.setNavigationBarTitle({
      title: title
    })
    url = 'https://dev.zhikaodian.com/apiV2/tk/getExercise'
    selectMode('recite');
  } if (type === 10) {
    let items = uni.getStorageSync("cuotijiexi");
    data = {
      items: items,
      encrypt: 0
    }


    uni.setNavigationBarTitle({
      title: title
    })
    url = 'https://dev.zhikaodian.com/apiV2/tk/getQuestions'
    selectMode('recite');
  }

  uni.request({
    url: url,
    header: {
      "Content-Type": "application/json",
      "Authorization": store.getters.getToken
    },
    method: 'POST',
    data: data,
    success: (res) => {
      // 确保响应中有数据
      if (res.data && (res.data.data || res.data.data.result)) {
        let result = res.data.data;
        if (!Array.isArray(result)) {
          result = res.data.data.result
        }

        // 对于每个问题，如果qType为4，则为其添加选项
        for (let item of result) {
          if (item.qType === 4) {
            item.option = [
              {
                "label": "A",
                "content": "错误"
              },
              {
                "label": "B",
                "content": "正确"
              }
            ];
          }
        }

        questionLists.value = {
          chapter_name: title,
          count: result.length,
          result: result
        }
      }
      currentIndex.value = current
    },
    fail: (err) => {
      console.log('error', err);
    }
  })
})

function onSwiperChange(event) {
  // 更新当前索引
  currentIndex.value = event.detail.current;

  // 获取新的chid和qid
  const chid = questionLists.value.result[currentIndex.value].chid;
  const qid = questionLists.value.result[currentIndex.value].qid;

  // 重新请求笔记数据
  fetchMyNoteData(chid, qid);
}

function fetchMyNoteData(chid, qid) {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/getComment',
    method: 'POST',
    header: {
      "Authorization": store.getters.getToken,
      'Content-Type': 'application/json'
    },
    data: {
      chid: chid,
      qid: qid
    },
    success: (response) => {
      console.log(1)
      if (response.data && response.data.data && response.data.data.my) {
        console.log(2)
        myNoteData.value = response.data.data.my;
      }
    },
    fail: (error) => {
      console.error("Failed to fetch note data:", error);
    }
  });
}


function toggleOption(questionIndex, optionIndex, item) {
  if (currentMode.value === 'recite') {
    // If the current mode is 'recite', don't allow toggling options
    return;
  }

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
  validateAnswer(questionIndex, optionIndex, item);
}


function validateAnswer(questionIndex, optionIndex, item, clickButton) {
  const question = questionLists.value.result[questionIndex];
  let correctAnswer;

  if (item.qType === 2 && clickButton === 'true') {
    confirmedAnswers[questionIndex] = true;
  }
  if (question.qType === 4) {
    // For qType 4, the correct answer is directly the value of the "answer" field
    correctAnswer = [parseInt(question.answer)];
  } else {
    // For other question types, convert the letter indices to number indices
    correctAnswer = question.answer.split('').map(char => char.charCodeAt(0) - 65);
  }

  const selectedAnswer = selectedOptions[questionIndex];

  if (item.qType !== 5) {
    userAnswers[questionIndex] = {
      answer: selectedOptions[questionIndex],
      isCorrect: JSON.stringify(correctAnswer.sort()) === JSON.stringify(selectedAnswer.sort()),
      correctOption: correctAnswer, // Storing correct answer options
      incorrectOption: selectedAnswer.filter(option => !correctAnswer.includes(option)), // Storing incorrect answer options
      qType: item.qType,
      total: questionLists.value.result.length,
      chapter_name: questionLists.value.chapter_name
    };
  } else if (item.qType === 5) {
    userAnswers[questionIndex] = {
      answer: jiandaAnswer,
      isCorrect: true,
      qType: item.qType,
      total: questionLists.value.result.length,
      chapter_name: questionLists.value.chapter_name
    };
  }

  if ((item.qType !== 2 && item.qType !== 5 && !clickButton) || (item.qType === 2 && clickButton === 'true')) {
    let selectAnswer = indexToLetter(selectedAnswer, item.qType)
    uni.request({
      url: 'https://dev.zhikaodian.com/apiV2/tk/submit',
      method: 'POST',
      header: {
        "Authorization": store.getters.getToken,
        'Content-Type': 'application/json'
      },
      data: {
        "chid": item.chid,
        "qid": item.qid,
        "answer": selectAnswer
      },
      success: (response) => {

        // 如果当前模式是“检测模式”并且这是最后一题，则跳转到另一页面
        if (currentMode.value === 'exam' && questionIndex === questionLists.value.result.length - 1) {
          handleSubmitPaper(userAnswers);
        }
      },
      fail: (error) => {

      }
    });
  }

  if (item.qType === 5) {
    uni.request({
      url: 'https://dev.zhikaodian.com/apiV2/tk/submit',
      method: 'POST',
      header: {
        "Authorization": store.getters.getToken,
        'Content-Type': 'application/json'
      },
      data: {
        "chid": item.chid,
        "qid": item.qid,
        "answer": jiandaAnswer
      },
      success: (response) => {

        // 如果当前模式是“检测模式”并且这是最后一题，则跳转到另一页面
        if (currentMode.value === 'exam' && questionIndex === questionLists.value.result.length - 1) {
          handleSubmitPaper(userAnswers);
        }
      },
      fail: (error) => {

      }
    });
  }

}


watch(userAnswers, () => {
  for (let qid in userAnswers) {
    if (groupedData.value[qid]) {
      groupedData.value[qid].status = userAnswers[qid].isCorrect ? "正确" : "错误";
    }
  }

}, { deep: true });


const isTiKa = ref(false); // 初始化为未展开状态
const isMenu = ref(false); // 初始化为未展开状态

const toggleTiKa = () => {
  isTiKa.value = !isTiKa.value
  isMenu.value = false
}

const toggleMenu = () => {
  isMenu.value = !isMenu.value
  isTiKa.value = false
}

const isFavorited = ref(false); // 初始化为未收藏状态

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
  const currentItem = questionLists.value.result[currentIndex.value];
  const chid = currentItem.chid;
  const qid = currentItem.qid;
  if (isFavorited.value === true) {

    uni.request({
      url: 'https://dev.zhikaodian.com/apiV2/tk/fav',
      header: {
        "Authorization": store.getters.getToken,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        "chid": chid,
        "qid": qid
      },
      success: (res) => {
        console.log(res)
        if (res.data.code === 0) {
          uni.showToast({ title: '已收藏', icon: 'success' });
        }
      },
      error: (errr) => { console.log(err) }
    })
  } else if (isFavorited.value === false) {

    uni.request({
      url: 'https://dev.zhikaodian.com/apiV2/tk/favCancel',
      header: {
        "Authorization": store.getters.getToken,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        "chid": chid,
        "qid": qid
      },
      success: (res) => {
        console.log(res)
        if (res.data.code === 0) {
          uni.showToast({ title: '已取消收藏', icon: 'success' });
        }
      },
      error: (errr) => { console.log(err) }
    })
  }

}

const indexToLetter = (indexArray, qType) => {
  if (!indexArray) return '';
  if (qType === 4) {
    return indexArray.map(index => index === 1 ? '1' : '0').join('');
  }
  return indexArray.map(index => String.fromCharCode(65 + index)).join('');
}

const isModeModalOpen = ref(false);

function changeMode() {
  isModeModalOpen.value = !isModeModalOpen.value;
}

const currentMode = ref('exam');  // 新增，用于存储当前选择的模式，默认exam

function selectMode(mode) {

  currentMode.value = mode;  // 更新当前模式
  isModeModalOpen.value = false;
  // 在这里添加你的模式切换逻辑...
}

function handleSubmitPaper() {
  uni.setStorageSync("questionList", JSON.stringify(questionLists.value));
  uni.setStorageSync("param", JSON.stringify(userAnswers));
  uni.navigateTo({
    url: '/pages/home/topic/examResult'
  });
}

function timestampToDate(timestamp) {
  const date = new Date(timestamp * 1000); // 转换为毫秒
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
    width: 693rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
    margin-left: 29rpx;
    display: flex;
    flex-direction: column;

    .question-description {
      margin-top: 27rpx;
      margin-left: 29rpx;
      display: flex;
      align-items: flex-start; // 更改为flex-start以使其与第一行对齐
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;

      .type-and-stem {
        display: flex;
        align-items: flex-start;

        .question-type {
          background: #3C7BFB;
          color: #FFF;
          font-size: 11px;
          padding: 1px 8px;
          margin-bottom: 5rpx;
          border-radius: 12px;
          margin-right: 5px;
          display: inline-block;
          vertical-align: middle; // 添加此属性以使其垂直居中
          flex: none;
        }

        .stem {
          flex: 1;
          /* This allows the stem to take up the remaining width */
          position: relative;
        }

        .stem::before {
          content: '';
          width: calc(11px + 2px + 8px + 10px);
          /* Font size + padding + margin of question-type */
          display: block;
          visibility: hidden;
        }
      }
    }


    .options {
      display: flex;
      flex-direction: column;

      .jianda {
        margin-top: 10rpx;

        .label {
          font-size: 29rpx;
          color: #636363;
        }

        .textArea {
          margin-top: 22rpx;
          width: 634rpx;
          height: 163rpx;
          border-radius: 7rpx 7rpx 7rpx 7rpx;
          opacity: 1;
          width: 692.03rpx;
        }

        .subButton {
          width: 199rpx;
          height: 51rpx;
          background: #3C7BFB;
          border-radius: 25rpx 25rpx 25rpx 25rpx;
          opacity: 1;
          margin-top: 45rpx;
          color: #fff;
          justify-content: center;
          align-items: center;
          display: flex;
        }
      }

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

  .my-note {
    display: flex;
    flex-direction: column;
    width: 692rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
    margin-left: 29rpx;

    .title {
      margin-top: 32rpx;
      display: flex;
      justify-content: center;
      font-size: 33rpx;
      font-weight: bold;
      color: #262626;
      height: 45rpx;
    }

    .info {
      margin-left: 29rpx;
      display: flex;

      .name {
        font-size: 29rpx;
        color: #636363;
      }

      .date {
        font-size: 20rpx;
        color: #AEAEB2;
      }
    }

    .body {
      margin-top: 14rpx;
      margin-left: 120rpx;
      font-size: 25rpx;
    }

    .button {
      width: 174rpx;
      height: 62rpx;
      background: #3C7BFB;
      border-radius: 7rpx 7rpx 7rpx 7rpx;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFF;
      font-size: 28rpx;
      margin-top: 24rpx;
      margin-bottom: 29rpx;
    }
  }

  .question-friend-interaction {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 692rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
    margin-left: 29rpx;
    margin-top: 32rpx;
    height: 200rpx;

    .question-friend-interaction-title {
      margin-top: 32rpx;
      display: flex;
      justify-content: center;
      font-size: 33rpx;
      font-weight: bold;
      color: #262626;
      height: 45rpx;
      flex-direction: column;
    }
  }

  .answer {
    background-color: #ffffff; // 设置背景颜色
    border-radius: 10px; // 设置边框半径

    .correct-answer {
      font-size: 14px; // 设置字体大小
      color: #b4dcab; // 设置字体颜色
      margin-bottom: 5px; // 设置下边距
      margin-left: 29rpx;
    }

    .incorrect-answer {
      font-size: 14px; // 设置字体大小
      color: #ec5c4e; // 设置字体颜色
      margin-bottom: 5px; // 设置下边距
      margin-left: 29rpx;
    }

    .answer-key {
      display: block; // 设置为弹性布局
      align-items: flex-start; // 设置垂直对齐方式
      margin-left: 29rpx;
      margin-right: 20rpx;

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
  bottom: 84px;
  right: 0rpx;
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
  width: 100%;
  /* 设置宽度为100% */
}

rich-text {
  width: 100%;
  /* 设置宽度为100% */
}

.my-note {
  margin-top: 32rpx;

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
  position: fixed;
  /* Fixed position */
  bottom: 0;
  /* Align to the bottom */
  width: 100%;
  /* Full width */
  right: 1px;
  background-color: white;
  /* Background color */
  border-top-left-radius: 15px;
  /* Rounded corners at the top */
  border-top-right-radius: 15px;
  /* Rounded corners at the top */
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
  margin: 0 auto;
  /* This will center the button */
}

.option-correct {
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: green;
    height: 2px;
    transition: all 0.3s;
  }

  &::before {
    width: 50%;
    top: 50%;
    left: 15%;
    transform: rotate(45deg);
  }

  &::after {
    width: 25%;
    bottom: 40%;
    left: 15%;
    transform: rotate(-45deg);
  }
}

.option-incorrect {
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: red;
    height: 2px;
    width: 50%;
    top: 50%;
    left: 25%;
    transform-origin: center center;
    transition: all 0.3s;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}

/*
.label {
  background-color: #2e68f5; !* Background color of the label *!
  border-radius: 12px; !* Rounded corners *!
  padding: 8px 16px; !* Padding inside the label *!
  font-size: 16px; !* Font size *!
  color: #fff; !* Text color *!
}
*/

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* 半透明的黑色背景 */
  z-index: 1000;
  /* 确保在其他内容之上 */
}

.custom-popup {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 630rpx;
  /* 根据你的需求设置高度 */
  background-color: #fff;
  /* 白色背景 */
  z-index: 1001;
  /* 确保在遮罩层之上 */
  /* 可以添加其他样式，如过渡效果等 */
}

.custom-popup-left {
  position: fixed; // 使用固定定位
  top: 0; // 从顶部开始
  left: 0; // 从左边开始
  width: 80%; // 设置弹出层的宽度为屏幕宽度的80%
  height: 100%; // 设置弹出层的高度为屏幕的100%
  background-color: #fff; // 设置背景颜色为白色
  overflow-y: auto; // 允许垂直滚动
  transform: translateX(-100%); // 初始状态，将弹出层移动到屏幕的左侧
  transition: transform 0.3s ease-out; // 添加平滑的过渡效果
  z-index: 1000; // 设置一个较高的z-index值，确保弹出层在其他元素之上
}

// 当弹出层被触发显示时，我们可以使用一个类（例如.active）来改变其位置
.custom-popup-left.active {
  transform: translateX(0); // 将弹出层移动到屏幕的可见区域
}
</style>
