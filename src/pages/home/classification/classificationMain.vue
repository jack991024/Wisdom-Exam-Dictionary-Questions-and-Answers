<template>
  <view class="content">
    <uv-vtabs
        :chain="chain"
        :list="list"
        :barItemBadgeStyle="{right:'20px',top:'12px'}"
        @change="change"
        @scrolltolower="scrolltolower">
      <uv-vtabs-item>
        <view class="root">
          <view
              class="item"
              v-for="(item2,index2) in list2"
              :key="index2"
              @click="navigatorToItem(item2)">
            <view class="item-body">
              <text style="font-size: 25rpx;color: #262626;">{{ item2.name }}</text>
            </view>
          </view>
        </view>
      </uv-vtabs-item>
    </uv-vtabs>
  </view>
</template>

<script setup>
import {ref, computed, onMounted, reactive} from 'vue';
import {onLoad} from "@dcloudio/uni-app"

const getList = reactive([]);

const list = ref([]);
const chain = ref(false);
const value = ref(0);

const list2 = computed(() => {
  const _list = list.value[value.value]?.children;
  return _list ? _list : [];
});

const size = (size) => {
  return (size / 1024 / 1024).toFixed(2) + ' MB';
};

const change = (index) => {
  console.log('选项改变：', index);
  value.value = index;
};

const scrolltolower = (index) => {
  console.log('内容滚动到底部触发：', index);
};

let regionId = ""

onLoad(async (options) => {
  uni.showLoading({
    title: '加载中'
  });
  regionId = options.id
  try {
    // 第一次请求获取name和fcid
    const response1 = await uni.request({
      url: 'https://dev.zhikaodian.com/apiV2/course/classify',
      data: {region_id: regionId},
      method: "POST"
    });
    const responseData1 = response1.data.data.courses;
    // 更新getList数组
    responseData1.forEach((data, index) => {
      getList[index] = data;
    });

    // 更新list引用
    list.value = getList;

  } catch (error) {
    console.error('Request failed:', error);
  } finally {
    uni.hideLoading();
  }
});

const navigatorToItem = (item) => {
  uni.navigateTo({url: "/pages/home/classification/TiKuItem?itemName=" + item.name + "&itemCoid=" + item.coid + "&regionId=" + regionId})
}
</script>

<style scoped lang="scss">
.header {
  padding: 30rpx;
  font-size: 30rpx;
  color: #333;
}

.root {
  display: flex;
  flex-wrap: wrap;

  .item {
    padding: 10rpx 20rpx;

    .item-body {
      width: 225rpx;
      height: 105rpx;
      background: #F6F6F6;
      border-radius: 14rpx 14rpx 14rpx 14rpx;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }
}

.gap {
  padding: 0 30rpx;
}

</style>
