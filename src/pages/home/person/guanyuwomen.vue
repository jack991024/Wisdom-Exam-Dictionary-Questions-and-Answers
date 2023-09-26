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
      key: "about_us",
      model: "html"
    },
    success: function (res) {
      content.value = res.data
    }
  })
})
</script>

<style lang="scss">

</style>
