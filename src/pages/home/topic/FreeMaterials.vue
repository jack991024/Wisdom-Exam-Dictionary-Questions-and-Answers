<template>
  <view class="content">
    <uv-vtabs
        :chain="chain"
        :list="list"
        :barItemBadgeStyle="{right:'20px',top:'12px'}"
        @change="change"
        @scrolltolower="scrolltolower">
      <uv-vtabs-item>
        <view
            class="item"
            v-for="(item2,index2) in list2"
            :key="index2">
          <view class="item-title">
            <text class="text">{{ item2.filename }}</text>
          </view>
          <view class="item-content">
            <text class="text">{{ item2.summary_text }}</text>
          </view>
        </view>
      </uv-vtabs-item>
    </uv-vtabs>
  </view>
</template>

<script setup>
import {ref, computed, onMounted, reactive} from 'vue';

const getList = reactive([]);

const list = ref([]);
const chain = ref(false);
const value = ref(0);

const list2 = computed(() => {
  const _list = list.value[value.value]?.childrens;
  console.log("_list", _list)
  return _list ? _list : [];
});

const change = (index) => {
  console.log('选项改变：', index);
  value.value = index;
};

const scrolltolower = (index) => {
  console.log('内容滚动到底部触发：', index);
};

onMounted(async () => {
  uni.showLoading({
    title: '加载中'
  });

  try {
    // 第一次请求获取name和fcid
    const response1 = await uni.request({url: 'https://dev.zhikaodian.com/apiV2/resource/classify'});
    const responseData1 = response1.data.data;
    // 更新getList数组
    responseData1.forEach((data, index) => {
      getList[index] = {
        name: data.name,
        fcid: data.fcid,
        childrens: []  // 初始化childrens属性为一个空数组
      };
    });

    // 对每个fcid执行第二次请求来获取childrens数据
    const promises = responseData1.map((data, index) => {
      return uni.request({
        url: 'https://dev.zhikaodian.com/apiV2/resource/search',
        data: {fcid: data.fcid},
        method: 'POST',
      }).then(response2 => {
        if (getList[index]) {
          getList[index].childrens = response2.data.data.results;
        }
      });
    });

    // 等待所有请求完成
    await Promise.all(promises);
    // 更新list引用
    list.value = getList;

  } catch (error) {
    console.error('Request failed:', error);
  } finally {
    uni.hideLoading();
  }
});

</script>

<style scoped lang="scss">
.header {
  padding: 30rpx;
  font-size: 30rpx;
  color: #333;
}

.item {
  padding: 10rpx 20rpx;

  &-title {
    .text {
      font-weight: 700;
      font-size: 32rpx;
      color: #111;
    }
  }

  &-content {
    padding: 20rpx 0;

    .text {
      line-height: 48rpx;
      font-size: 30rpx;
      color: #111;
      /* #ifndef APP-NVUE */
      word-break: break-all;
      /* #endif */
    }
  }
}

.gap {
  padding: 0 30rpx;
}
</style>
