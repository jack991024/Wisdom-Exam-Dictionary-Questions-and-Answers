<template>
  <u-navbar leftText="" title="选择题库" :border="true" :safeAreaInsetTop="false" @leftClick="naviToTopic"
    @rightClick="naviToTopicByParam">
    <template #right>
      <text>提交</text>
    </template>
  </u-navbar>

  <view class="body">
    <u-cell-group>
      <checkbox-group @change="handleCheckboxChange">
        <u-cell v-for="(item, index) in items" :title="item.fullname" :size="large" :key="index" :clickable="true">
          <template #value>
            <label>
              <checkbox :value="item.tkid" color="blue" />
            </label>
          </template>
        </u-cell>
      </checkbox-group>
    </u-cell-group>
  </view>
</template>

<script setup>
import { onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const checked = ref(false)

const checkedItems = ref([]);

let items = ref([]);
onShow(() => {
  uni.hideHomeButton();

  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/myCourse',
    method: 'GET',
    header: {
      "Content-Type": "application/json",
      "Authorization": store.getters.getToken
    },
    success: (res) => {
      if (res.data && Array.isArray(res.data.data)) {
        items.length = 0; // 首先清空数组
        res.data.data.forEach(item => items.value.push(item)); // 然后将新数据推送到数组中
      }

    },
    fail: (err) => {
      console.log('error', err);
    }
  });
})

const naviToTopic = () => {
  uni.switchTab({ url: '/pages/home/topic/topic' })
}

// 添加 handleCheckboxChange 函数
const handleCheckboxChange = (event) => {
  checkedItems.value = event.detail.value;
}

// option2.value.push(
//             { text: option.fullname, value: option.tkid }
//           );

const naviToTopicByParam = () => {
  let option = [];

  // 遍历checkedItems中的所有tkid
  checkedItems.value.forEach(tkid => {
    // 使用find方法从items中找到匹配的item
    let matchedItem = items.value.find(item => item.tkid === tkid);
    if (matchedItem) {
      // 将item的fullname和tkid组合成新的对象格式，并添加到option数组中
      option.push({ text: matchedItem.fullname, value: matchedItem.tkid });
    }
  });
  console.log(option)
  uni.setStorageSync("menuList", option)
  naviToTopic()

}
</script>

<style scoped>
.body {
  margin-top: 88rpx;
}
</style>
