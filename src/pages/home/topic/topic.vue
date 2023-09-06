<template>
  <view class="bottom-section">
    <view class="bottom-row" v-for="(row, index) in bottomItemsChunked" :key="index">
      <view class="bottom-item" v-for="item in row" :key="item.id">
        <image :src="item.icon" class="bottom-icon" />
        <text class="bottom-text">{{ item.text }}</text>
        <text class="bottom-subtext">{{ item.subtext }}</text>
      </view>
    </view>
  </view>

</template>

<script setup>
import { ref, computed } from 'vue';

const bottomItems = ref([
  { id: 1, text: '考试资讯', subtext: '前沿考试资讯', icon: '/path/to/your/icon1.png' },
  { id: 2, text: '免费资料', subtext: '热门资料免费领', icon: '/path/to/your/icon2.png' },
  { id: 3, text: '我的错题', subtext: '专业错题解析', icon: '/path/to/your/icon3.png' },
  { id: 4, text: '我的收藏', subtext: '个性化题目收藏', icon: '/path/to/your/icon4.png' },
  { id: 5, text: '错题榜', subtext: '错题排行榜', icon: '/path/to/your/icon5.png' },
  { id: 6, text: '收藏榜', subtext: '收藏题目排行', icon: '/path/to/your/icon6.png' },
]);

const bottomItemsChunked = computed(() => {
  let result = [];
  for (let i = 0; i < bottomItems.value.length; i += 2) {
    result.push(bottomItems.value.slice(i, i + 2));
  }
  return result;
});
</script>

<style lang="scss" scoped>
.bottom-section {
  padding: 10px;
  background-color: #f0f0f0;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
}

.bottom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%; /* 留出一些间隙 */
}

.bottom-icon {
  width: 50px;
  height: 50px;
}

.bottom-text {
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
}

.bottom-subtext {
  margin-top: 2px;
  font-size: 12px;
  text-align: center;
  color: #888;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
}

.bottom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  margin: 10px; /* 添加边距来创建空隙 */
  border: 1px solid #ccc; /* 可选：添加边框 */
  padding: 10px; /* 添加内边距 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 可选：添加阴影 */
  border-radius: 10px; /* 可选：添加圆角 */
}

.bottom-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 5px; /* 在图标和文本之间添加空隙 */
}

.bottom-text {
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
}

.bottom-subtext {
  margin-top: 2px;
  font-size: 12px;
  text-align: center;
  color: #888;
}

</style>
  