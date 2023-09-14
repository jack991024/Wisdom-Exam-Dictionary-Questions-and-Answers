<template>
  <view class="container">
    <view class="tab" v-for="item in data" :key="item.tkid">
      <view class="tab-header">
        <text class="tab-fullname">{{ item.fullname }}</text>
      </view>
      <text class="tab-msg">{{ item.msg }}</text>
      <button class="learn-button" @click="goToLearn(item.tkid)">前往学习</button>
    </view>
  </view>
</template>

<script setup>
import { reactive } from 'vue';

const data = reactive([
  {
    "tkid": "b9f70835-87d5-5a98-a322-74129ecf156c",
    "fullname": "考公考编-社区工作者-吉林社区工作者真题",
    "msg": "已开通，到期时间为 2024-09-01",
    "progress": 0
  },
  {
    "tkid": "cad0cde8-3d23-531f-bf09-cfe441106bf3",
    "fullname": "考公考编-社区工作者-时事政治+政策文件",
    "msg": "已开通，到期时间为 2024-09-01",
    "progress": 0
  },
  {
    "tkid": "c9b2fff1-71c1-5aa2-89b0-204659d81c64",
    "fullname": "社区工作者-行测",
    "msg": "已开通，到期时间为 2024-09-01",
    "progress": 0
  }
]);

const goToLearn = (tkid) => {
  console.log('前往学习', tkid);
  // 这里你可以添加导航到相关学习页面的代码，使用 tkid 作为参数
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  background-color: #f0f0f0;
}

.tab {
  width: 100%;
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-fullname {
  font-size: 14px;
  font-weight: normal;
}

.tab-progress {
  font-size: 12px;
  color: #4CAF50;
}

.tab-msg {
  margin: 10px 0;
  font-size: 12px;
}

.learn-button {
  padding: 10px;
  background-color: #4CAF50;
  border: none;
  color: white;
  text-align: center;
  border-radius: 16px;
  font-size: 16px;
}
</style>
