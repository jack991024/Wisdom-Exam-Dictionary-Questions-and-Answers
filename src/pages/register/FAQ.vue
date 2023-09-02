<template>
  <view class="page">
    <view class="faq-list">
      <view v-for="(category, index) in faqData" :key="index" class="faq-category">
        <view class="category-title">{{ category.question_type }}</view>
        <view v-for="(question, qIndex) in category.questions" :key="qIndex" class="faq-item">
          <view class="question">
            {{ qIndex + 1 }}. {{ question.question }}
          </view>
          <view class="answer" v-html="question.answer"></view>
          <view class="spacer"></view> <!-- Add a spacer for the desired gap -->
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const faqData = ref(null);

const fetchFAQData = () => {
  uni.request({
    method: 'GET',
    url: 'https://dev.zhikaodian.com/apiV2/about/FAQ',
    success: (response) => {
      const data = response.data;
      faqData.value = data.data; // Assuming the data structure has a "data" property
    },
    fail: (error) => {
      console.log('error', error);
    }
  });
};

onMounted(() => {
  fetchFAQData();
});
</script>

<style>
/* Add your styles here */

/* Add styles for the question and answer sections */
.question {
  margin-bottom: 5px; /* Add spacing between questions */
  font-weight: bold;
}

.answer {
  margin-top: 5px; /* Add spacing between question and answer */
}

.spacer {
  margin-bottom: 10px; /* Add spacing between question-answer pairs */
}

.category-title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
