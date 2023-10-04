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
      <view v-for="(item, index) in assistantMsgLists" :key="index" class="assistant">
        <view class="avater-assistant">
          <up-avatar src="../../../../static/question/avata.png" size="36"></up-avatar>
        </view>
        <view class="content-assistant">
          <text>{{ item }}</text>
        </view>
      </view>

      <view v-for="(item, index) in userMsgLists" :key="index" class="user">
        <view class="content-user">
          {{ item }}
        </view>
        <view class="avater-user">
          <up-avatar :src="userImg" size="36"></up-avatar>
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
const assistantMsgLists = ref(["您好，我是智考典答疑小助手“小智”，任何考试有关的内容都可以向我咨询哦～"])
const userMsgLists = ref([])
const inputMessage = ref("");
const userImg = ref(null)
const assistantImg = ref(null)

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
      assistantImg.value = data.assistant
    },
  })
})



const sendMessage = () => {
  const chatId = "b4c3cf21-39d0-464c-839e-5a45010902c9"; // 请替换为您的 chat_id
  requestChatGPT(chatId, inputMessage.value);
  inputMessage.value = "";
};

const requestChatGPT = (chatId, content) => {
  userMsgLists.value.push(inputMessage.value)
  const url = "https://dev.zhikaodian.com/apiV2/chat/inference"; // 请替换为您的 API 地址
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
        // 使用正则表达式全局匹配所有的data对象
        const jsonMatches = response.data.match(/data: (\{.*?\})/g);
        if (!jsonMatches) {
          throw new Error("JSON not found in response data");
        }
        // 遍历所有的匹配项
        jsonMatches.forEach((jsonMatch) => {
          // 提取并解析JSON部分
          const jsonData = jsonMatch.replace('data: ', '') + '}';
          const data = JSON.parse(jsonData);
          // 检查解析后的数据是否包含result字段
          if ('result' in data) {
            console.log("Result:", data.result);
            answer.push(data.result)
          } else {
            console.error("Result not found in response", data);
          }
        });
      } catch (e) {
        // 如果提取或解析失败，打印错误和原始响应数据
        console.error("Failed to parse response data", e, response.data);
      }

      assistantMsgLists.value.push(answer.join(" "))
    },
    fail: (error) => {
      console.error("Request Error:", error);
    }
  });
};
</script>

<style lang="scss">
.body {
  background: #F6F6F6;

  .assistant {
    width: 692rpx;
    height: 145rpx;
    background: #FFFFFF;
    border-radius: 7rpx;
    opacity: 1;
    margin: 29rpx;
    display: flex; // 使用flex布局
    align-items: center; // 垂直居中内容
  }

  .user {
    width: 692rpx;
    height: 145rpx;
    background: #FFFFFF;
    border-radius: 7rpx;
    opacity: 1;
    margin: 29rpx;
    display: flex; // 使用flex布局
    align-items: center; // 垂直居中内容
  }

  .avater-assistant {
    margin-left: 28rpx; // 左侧距离
    margin-right: 25rpx;
  }

  .avater-user {
    margin-left: 530rpx; // 右侧距离
    margin-right: 28rpx;
  }

  .content-user {
    margin-left: 28rpx; // 左侧距离
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
    width: 500rpx;
    margin: 29rpx;
  }
}
</style>


