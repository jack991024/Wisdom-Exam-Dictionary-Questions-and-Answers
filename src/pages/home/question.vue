<template>
  <view class="container">
    <view class="chat-box">
      <view v-for="msg in messages" :key="msg.id" class="message">
        {{ msg.content }}
      </view>
    </view>
    <view class="input-box">
      <input v-model="inputMessage" type="text" placeholder="输入消息..." />
      <button @click="sendMessage">发送</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const messages = ref([]);
const inputMessage = ref("string");

const sendMessage = () => {
  const chatId = "81fd8773-0332-4f90-8835-68e690f396fd"; // 请替换为您的 chat_id
  requestChatGPT(chatId, inputMessage.value);
  inputMessage.value = "";
};

const requestChatGPT = (chatId, content) => {
  const url = "https://dev.zhikaodian.com/apiV2/chat/inference"; // 请替换为您的 API 地址
  uni.request({
    url: url,
    method: 'POST',
    enableChunked: true,
    data: {
      chat_id: chatId,
      content: content
    },
    responseType: 'stream',
    header: {
      "Authorization": store.getters.getToken,
      "Accept": 'text/event-stream'
    },
    success: (response) => {
      console.log(response)
      const arrayBuffer = response.data;
      const uint8Array = new Uint8Array(arrayBuffer);
      const text = String.fromCharCode.apply(null, uint8Array);
      messages.value.push({ id: Date.now(), content: text });
    },
    fail: (error) => {
      console.error("Request Error:", error);
    }
  });
};
</script>

<style>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.chat-box {
  flex: 1;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.message {
  padding: 8px 12px;
  margin: 5px 0;
  background-color: #e1f5fe;
  border-radius: 12px;
  max-width: 80%;
  word-wrap: break-word;
}

.input-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  padding: 10px 0;
}

input {
  flex: 1;
  padding: 8px 12px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>

