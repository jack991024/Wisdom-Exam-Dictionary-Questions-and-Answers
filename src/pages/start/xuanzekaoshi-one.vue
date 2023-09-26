<template>
  <view>
    <view class="header">
      <view class="search">
        <u-search placeholder="搜索考试科目" v-model="keyword" action-style="color: #3C7BFB;"
                  @custom="searchByKeyWords(keyword)"></u-search>
      </view>

      <view class="body">

      </view>
    </view>
  </view>
</template>

<script setup>
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
</script>

<style lang="scss">

</style>
