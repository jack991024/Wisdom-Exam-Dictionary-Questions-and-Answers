<template>
  <view>
    <view class="header">
      <view class="avatar">
        <up-avatar
            src="https://vod.zhikaodian.com/6cbdfa1cvodcq1500024941/974781b75576678020665569951/5576678020665571249.jpg"
            :size="60"></up-avatar>
      </view>
      <view class="info">
        <view class="name">
          <text>Shinn</text>
        </view>
        <view class="xuehao">
          <text>学号：{{ 12345 }}</text>
        </view>
      </view>
    </view>

    <view class="control">
      <zy-segmented :values="list" :current="curNow" @onClickItem="sectionChange"></zy-segmented>
    </view>

    <view class="list">
      <!-- 使用 :style 绑定来动态设置背景图 -->
      <view class="item" v-for="(item,index) in likeList" :key="index"
            :style="{ backgroundImage: `url(${item.media.cover_url})` }">
        <view class="num">{{ 220 }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import zySegmented from "@/uni_modules/zy-segmented-control/components/zy-segmented-control/zy-segmented-control.vue"
import {ref} from "vue";
import {onLoad} from "@dcloudio/uni-app";
import {useStore} from "vuex";

const store = useStore()

const list = ref(['赞过', '收藏']);
const curNow = ref(0);
const sectionChange = (index) => {
  curNow.value = index;
  console.log("value", curNow.value)
  let url = ""
  if (curNow.value === 1) {
    url = "https://dev.zhikaodian.com/apiV2/svideo/myFav"
  } else if (curNow.value === 0) {
    url = "https://dev.zhikaodian.com/apiV2/svideo/myLike"
  }
  uni.request({
    url: url,
    method: 'GET',
    header: {
      'Authorization': store.getters.getToken,
      'Content-Type': 'application/json'
    },
    success: (response) => {
      let data = response.data.data;
      likeList.value = data.videos;
    },
    fail: (error) => {
      console.log(error);
    }
  });
}

const likeList = ref([])
onLoad(() => {
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/svideo/myLike",
    method: 'GET',
    header: {
      'Authorization': store.getters.getToken,
      'Content-Type': 'application/json'
    },
    success: (response) => {
      let data = response.data.data;
      likeList.value = data.videos;
    },
    fail: (error) => {
      console.log(error);
    }
  });
})
</script>

<style lang="scss">
.header {
  display: flex;
  margin-top: 42rpx;
  align-items: center;

  .avatar {
    height: 123.19rpx;
    width: 123.19rpx;
    margin-left: 66rpx;
    margin-right: 36rpx;
    border-radius: 50%;
  }

  .info {
    .name {
      font-size: 33rpx;
      color: #262626;
      font-weight: bold;
    }

    .xuehao {
      font-size: 22rpx;
      color: #898989;
    }
  }
}

.control {
  margin-top: 78rpx;

}

.list {
  margin-top: 32rpx;
  display: flex;
  margin-left: 22rpx;

  .item {
    margin-right: 5rpx;
    background-size: cover; /* 使背景图填充整个元素 */
    background-position: center; /* 使背景图居中 */
    width: 232rpx;
    height: 308rpx;
    position: relative;

    .num {
      position: absolute;
      bottom: 0;
      right: 14rpx;
      color: #fff;
      font-size: 22rpx;
    }
  }
}
</style>
