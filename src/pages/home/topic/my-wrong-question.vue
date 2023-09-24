<template>
  <view>
    <view class="header">
      <zy-segmented :values="list" :current="curNow" @onClickItem="sectionChange"></zy-segmented>
    </view>
    <view class="list">
      <view v-for="(item,index) in wrongQuestionList" :key="index" class="item">
        <view class="title">
          <text>{{ item.stem }}</text>
        </view>

        <view class="footer">
          <view class="left">
            <view class="sources">
              <text>来源：{{ item.source }}</text>
            </view>
          </view>
          <view class="right">
            <view class="createTime">
              <text>{{ formatDate(item.update_at) }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref} from "vue";
import {onShow} from "@dcloudio/uni-app";
import {useStore} from 'vuex'
import zySegmented from "@/uni_modules/zy-segmented-control/components/zy-segmented-control/zy-segmented-control.vue"


const store = useStore()

const list = ref(['最新错题', '全部错题']);
const curNow = ref(0);
const wrongQuestionList = ref([])

const sectionChange = (index) => {
  curNow.value = index;
  console.log("value", curNow.value)
};

const formatDate = (timestamp) => {
  // 如果是秒级时间戳，转换为毫秒
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

let tkid = ''
onShow((options) => {
  tkid = uni.getStorageSync("tkid")
  console.log("tkid:", tkid)
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/myErrorRecent',
    method: 'POST',
    header: {
      'Authorization': store.getters.getToken,
      'Content-Type': 'application/json'
    },
    data: {
      "tkid": tkid,
      "offset": 0,
      "limit": 100
    },

    success: (response) => {
      wrongQuestionList.value = response.data.data
    },
    fail: (error) => {
      console.log(error);
    }
  });

})
</script>

<style lang="scss">
.list {
  margin-top: 22rpx;

  .item {
    width: 692rpx;
    height: 167rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
    margin-left: 29rpx;

    .title {
      margin-top: 22rpx;
      font-size: 29rpx;
      font-weight: bold;
      color: #262626;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-right: 22rpx;
      margin-left: 22rpx;
    }

    .footer {
      margin-top: 15rpx;
      display: flex;
      justify-content: space-between;

      .sources {
        margin-left: 22rpx;
        font-size: 22rpx;
        color: #898989;
      }

      .createTime {
        font-size: 22rpx;
        color: #898989;
        margin-right: 22rpx;
      }
    }
  }
}
</style>
