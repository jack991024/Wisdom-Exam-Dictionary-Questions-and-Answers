<template>
  <view>
    <rich-text :nodes="html"></rich-text>
  </view>
</template>

<script setup>
import {ref} from "vue";


let html = ref("")

uni.request({
  method: 'GET',
  url: 'https://dev.zhikaodian.com/apiV2/about/policy?key=registration_protocol&model=html',
  success: function (response) {
    html.value = response.data
  },
  fail: function (error) {
    console.log(error);
  }
});

</script>

<style lang="scss">

</style>
