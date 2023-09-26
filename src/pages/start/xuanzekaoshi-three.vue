<template>
  <view>
    <view class="header">
      <view class="search">
        <u-search placeholder="搜索考试科目" v-model="keyword" action-style="color: #3C7BFB;"
                  @custom="searchByKeyWords(keyword)"></u-search>
      </view>
    </view>

    <view class="body">
      <view class="item">
        <u-cell-group>
          <view v-for="(item,index) in lists" :key="index" @click="">
            <u-cell :title="item.name" :is-link="true" size="large"></u-cell>
          </view>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {ref} from "vue";

let keyword = ""

const searchByKeyWords = (keyword) => {
  let subjects = []
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/tk/search",
    data: {
      keyword: keyword
    },
    method: "POST",
    success: (response) => {
      console.log("response.data", response.data)
      subjects = response.data.data;
      uni.setStorageSync("subjects", subjects);
      uni.navigateTo({
        url: "/pages/home/classification/searchByKeyWordTiKuItem"
      })
    },
    fail: (error) => {
      console.log('error', error);
    }
  })
}

const lists = ref()
onLoad((options) => {
  let coid = options.coid
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/tk/subject",
    method: "POST",
    data: {
      "coid": coid,
      "region_id": "110000000000"
    },
    success: function (res) {
      lists.value = res.data.data.subjects
    },
    error: function (error) {

    }
  })
})
</script>

<style lang="scss">
.header {
  height: 115rpx;

  .search {
    margin: 28rpx;
  }
}

.body {
  background: #F5F6F8;

  .item {
    position: relative; // 使伪类相对于此元素定位
    background: #FFFFFF;

    &::before {
      content: ""; // 伪类必须有内容，但我们可以设置为空
      display: block;
      width: 100%; // 使伪类的宽度与.item相同
      height: 22rpx; // 设置伪类的高度
      background: #F5F6F8; // 你可以根据需要设置背景颜色
      position: absolute;
      top: -22rpx; // 将伪类放在.item的上方
      left: 0;
    }
  }
}
</style>
