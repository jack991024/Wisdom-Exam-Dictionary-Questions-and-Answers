<template>
  <view>
    <!--      自定义模态框-->
    <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-container" @click.stop>
        <button class="modal-button review-button" @click="reviewMistakes">错题回顾</button>
        <button class="modal-button redo-button" @click="redoMistakes">错题重做</button>
      </div>
    </div>
    <view class="list">
      <view v-for="(item,index) in items" :key="index" class="itemTwo">
        <u-cell :title="item.name" :value="item.count" :isLink="true" :center="true" :border="false"
                @click="jumpToItems(item)"></u-cell>
      </view>
    </view>
  </view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {ref} from "vue";

const items = ref([]);
// 定义一个新的响应式引用来存储当前的 item
const currentItem = ref(null);
onLoad((option) => {
  let name = option.name
  uni.setNavigationBarTitle({
    title: name
  });

  items.value = uni.getStorageSync("item").children
  uni.removeStorageSync("item")
})

const jumpToItems = (item) => {
  if (item.children.length !== 0) {
    uni.setStorageSync("item", item)
    uni.navigateTo({
      url: "/pages/home/topic/jump-items?name=" + item.name
    })
  } else {
    // 当你打开模态框时，设置 currentItem 的值
    currentItem.value = item;
    open()
  }
}

const navigateToQuestion = (item, index) => {
  const result = {
    chid: item.chid,
    qid: item.qid
  };

  uni.setStorageSync("wrongQuestionLists", result);

  uni.navigateTo({url: "/pages/home/topic/question-jump?title=" + item.name + "&type=2&currentIndex=" + index})
}

const navigateToQuestion2 = (item, index) => {
  const result = {
    chid: item.chid,
    qid: item.qid
  };

  uni.setStorageSync("wrongQuestionLists", result);

  uni.navigateTo({url: "/pages/home/topic/question-jump?title=" + item.name + "&type=3&currentIndex=" + index})
}

const visible = ref(false);

const open = () => {
  visible.value = true;
};

const close = () => {
  visible.value = false;
};

const handleOverlayClick = () => {
  close();
};

const reviewMistakes = () => {
  console.log('进行错题回顾');
  console.log('当前 item:', currentItem.value);
  navigateToQuestion(currentItem.value, 0)
  close();
};

const redoMistakes = () => {
  console.log('进行错题重做');
  console.log('当前 item:', currentItem.value);
  navigateToQuestion2(currentItem.value, 0)
  close();
};
</script>

<style lang="scss">
.itemTwo {
  width: 692rpx;
  height: 167rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-left: 29rpx;
  display: flex; // 添加这一行
  flex-direction: column; // 添加这一行
  justify-content: center; // 添加这一行
  margin-bottom: 29rpx;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  width: 286rpx;
  height: 168rpx;
  background: #FFFFFF;
  border-radius: 11rpx 11rpx 11rpx 11rpx;
  opacity: 1;
}

.modal-button {

}

.review-button {
  color: #3C7BFB;
}

.redo-button {
  color: #3C7BFB;
}

.modal-button:active {
  opacity: 0.8;
}
</style>
