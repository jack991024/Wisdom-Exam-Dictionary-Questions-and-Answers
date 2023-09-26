<template>
  <view>
    <mp-html :content="content"></mp-html>
  </view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {ref} from "vue";

const content = ref(null)
onLoad(() => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/about/policy',
    data: {
      key: "questions",
      model: "html"
    },
    success: function (res) {
      content.value = res.data
    }
  })
})
</script>

<style lang="scss">
.body {

  .title {
    margin-left: 14px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .item {
    display: flex;
    flex-direction: column;
    margin-top: 10rpx;
    margin-left: 14px;

    .item-title {
      font-weight: bold;
    }

    .item-content {
      margin-top: 10px;
    }
  }
}
</style>
