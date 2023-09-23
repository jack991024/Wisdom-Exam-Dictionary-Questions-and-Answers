<template>
  <view class="header">
    <view class="region">
      <text>北京</text>
      <image src="./static/fenlei/jiantou.png" style="width: 21.74rpx;height: 13.57rpx;"></image>
    </view>
    <view class="search">
      <u-search placeholder="搜索考试科目" v-model="keyword" action-style="color: #3C7BFB;"></u-search>
    </view>

  </view>
  <view class="content">
    <uv-vtabs
        :chain="chain"
        :list="list"
        :barItemBadgeStyle="{right:'20px',top:'12px'}"
        @change="change"
        @scrolltolower="scrolltolower"
        barBgColor="#FFF"
    >
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
import {useStore} from 'vuex'

const store = useStore()
const getList = reactive([]);

const list = ref([]);
const chain = ref(false);
const value = ref(0);

let keyword=""

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
  if (!options.id) {
    regionId = "110000000000"
  } else {
    regionId = options.id
  }
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
  height: 95rpx;

  display: flex;          // Convert the container to a flexbox container.
  flex-direction: row;    // This is the default value, but added for clarity.
  justify-content: flex-start; // Position children to the start.
  align-items: center;    // Center children vertically.
  padding-left: 29rpx;    // Add padding to the left side to make .region start after 29rpx from the left.

  .region {
    display: flex;
    align-items: center;
    margin-right: 22rpx;  // Create a gap between .region and .search.

    text {
      margin-right: 6rpx;
    }
  }

  .search {
    flex: 1; // Let the search take up all the remaining space.
  }
}


.root {
  display: flex;
  flex-wrap: wrap;

  .item {
    padding: 10rpx 23rpx;

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
