<template>
  <view>
    <view class="header">
      <view class="title">
        <text>考试答疑-ChatGPT</text>
      </view>
      <view class="clear">
        <text>清空记录</text>
      </view>
    </view>

    <view class="body">
      <view v-for="(message, index) in messages" :key="index" :class="message.type">
        <view class="avatar">
          <up-avatar :src="message.type === 'user' ? userImg : assistantImg" size="36"></up-avatar>
        </view>
        <view class="content">
          <text>{{ message.content }}</text>
        </view>
      </view>
    </view>

    <view class="input-question">
      <view class="input">
        <up-input placeholder="请输入您的问题" v-model="inputMessage"></up-input>
      </view>
      <view class="submit" @click="sendMessage">
        <image src="../../static/question/submit.png" mode="widthFix" style="width: 70rpx;height: 70rpx;" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { onLoad } from '@dcloudio/uni-app';

const store = useStore()
const messages = ref([{ type: 'assistant', content: '您好，我是智考典答疑小助手“小智”，任何考试有关的内容都可以向我咨询哦～' }])
const inputMessage = ref("");
const userImg = ref(null)
const assistantImg = ref("../../../../static/question/avata.png")
const chatId=ref(null)
onLoad(() => {
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/chat/profile",
    method: 'GET',
    header: {
      "Authorization": store.getters.getToken
    },
    success: (res) => {
      let data = res.data.data
      userImg.value = data.user
    },
  }) 
  
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/chat/newChat",
    method: 'GET',
    header: {
      "Authorization": store.getters.getToken
    },
    success: (res) => {
      let data = res.data.data
      chatId.value = data.chat_id
    },
  })


})

const sendMessage = () => {
  messages.value.push({ type: 'user', content: inputMessage.value });
  requestChatGPT(chatId.value, inputMessage.value);
  inputMessage.value = "";
};

const requestChatGPT = (chatId, content) => {
  const url = "https://dev.zhikaodian.com/apiV2/chat/inference";
  uni.request({
    url: url,
    method: 'POST',
    data: {
      chat_id: chatId,
      content: content
    },
    header: {
      "Authorization": store.getters.getToken
    },
    success: (response) => {
      let answer = []
      try {
        const jsonMatches = response.data.match(/data: (\{.*?\})/g);
        if (!jsonMatches) {
          throw new Error("JSON not found in response data");
        }
        jsonMatches.forEach((jsonMatch) => {
          const jsonData = jsonMatch.replace('data: ', '') + '}';
          const data = JSON.parse(jsonData);
          if ('result' in data) {
            answer.push(data.result)
          }
        });
      } catch (e) {
        console.log(JSON.stringify(jsonMatch))
        console.error("Failed to parse response data", e, response.data);
      }
      messages.value.push({ type: 'assistant', content: answer.join(" ") })
    },
    fail: (error) => {
      console.error("Request Error:", error);
    }
  });
};
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 85rpx;


  .title {
    flex-grow: 1;
    text-align: center;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }

  .clear {
    margin-left: auto;
    margin-right: 22rpx
  }
}


.body {
  background: #F6F6F6;
  height: 100vh;
  overflow-y: auto;
  margin-top: 85rpx;

  &::before {
    content: "";
    display: block;
    height: 15rpx;
    background: #F6F6F6;
  }

  .assistant,
  .user {
    width: 692rpx;
    background: #FFFFFF;
    border-radius: 7rpx;
    opacity: 1;
    margin-left: 29rpx;
    margin-top: 15rpx;
    font-size: 25rpx;
    display: flex;
    align-items: center;
  }

  .avatar {
    margin-left: 28rpx;
    margin-right: 25rpx;
  }

  .content {
    margin-left: 28rpx;
  }
}

.input-question {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .input {
    width: 590rpx;
    margin: 29rpx;
  }
}
</style>
