<template>
  <view class="content">
    <uv-vtabs :chain="chain" :list="list" :barItemBadgeStyle="{ right: '20px', top: '12px' }" @change="change"
      @scrolltolower="scrolltolower">
      <uv-vtabs-item>
        <view class="item" v-for="(item2, index2) in list2" :key="index2" @click="navi(item2)">
          <view class="item-body">
            <view class="image">
              <image src="./static/freeMaterials/pdf.png" mode="widthFix"
                style="width: 38.04rpx;height: 43.48rpx;margin-top: 20rpx;margin-left: 29rpx;"></image>
            </view>
            <view class="right">
              <view class="title">
                <text>{{ item2.filename }}</text>
              </view>
              <view class="bottom">
                <view class="download-num">
                  {{ item2.download_num }}下载
                </view>
                <view class="page-num">
                  {{ item2.page_num }}页
                </view>
                <view class="size">
                  {{ size(item2.size) }}
                </view>
              </view>
            </view>
          </view>
          <view class="gap"></view>
        </view>
      </uv-vtabs-item>
    </uv-vtabs>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';

const getList = reactive([]);

const list = ref([]);
const chain = ref(false);
const value = ref(0);

const list2 = computed(() => {
  const _list = list.value[value.value]?.childrens;
  return _list ? _list : [];
});

const size = (size) => {
  return (size / 1024 / 1024).toFixed(2) + ' MB';
};

const change = (index) => {
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
    const response1 = await uni.request({ url: 'https://dev.zhikaodian.com/apiV2/resource/classify' });
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
        data: { fcid: data.fcid },
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

const navi = (item2) => {
  uni.navigateTo({ url: '/pages/home/topic/FreeMaterialsItem?fid='+item2.fid })
}
</script>

<style scoped lang="scss">
.header {
  padding: 30rpx;
  font-size: 30rpx;
  color: #333;
}

.item {
  padding: 10rpx 20rpx;

  .item-body {
    height: 135rpx;
    display: flex;
    flex-direction: row;
    align-items: center; // 使子元素垂直居中

    .image {
      margin-right: 20rpx; // 添加一些间距在图片和右侧内容之间
    }

    .right {
      flex-grow: 1; // 使.right元素占用剩余的空间
      display: flex;
      flex-direction: column; // 使.title和.bottom垂直排列

      .title {
        text-align: left;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 29rpx;
      }

      .bottom {
        display: flex;
        flex-direction: row; // 使.bottom的子元素水平排列
        justify-content: space-between; // 使子元素平分空间

        .download-num,
        .page-num,
        .size {
          text-align: center; // 使文本居中
          font-size: 18rpx;
          color: #898989;
          margin-top: 18rpx;
        }
      }
    }
  }

  .gap {
    height: 2rpx;
    border-top: 2rpx solid #E5E5E5; // 使用border-top来创建一个顶部边框
  }
}

.gap {
  padding: 0 30rpx;
}
</style>
