<template>
  <u-navbar leftText="" title="选择题库" :border="true" :safeAreaInsetTop="false" @leftClick="naviToTopic">
    <template #right>
      <text>提交</text>
    </template>
  </u-navbar>

  <view class="body">
    <u-cell-group>
      <checkbox-group>
        <u-cell v-for="(item, index) in items" :title="item.fullname" :size="large" :key="index" :clickable="true">
          <template #value>
            <label>
              <checkbox :value="item.tkid" color="blue" @change="handleCheckboxChange($event, item.tkid)" />
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
const handleCheckboxChange = (event, tkid) => {
  if (event.detail.value) { // 如果 checkbox 被选中
    checkedItems.value.push(tkid);
  } else { // 如果 checkbox 被取消选中
    const index = checkedItems.value.indexOf(tkid);
    if (index !== -1) {
      checkedItems.value.splice(index, 1);
    }
  }
}
</script>

<style scoped>
.body {
  margin-top: 88rpx;
}
</style>
