<template>
  <view class="tikuPart">
    <text>题库</text>
  </view>

</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {reactive} from "vue";

let itemName = ""
let itemCoid = ""
let regionId = ""
const subjects = reactive([])
onLoad((options) => {
  itemName = options.itemName
  itemCoid = options.itemCoid
  regionId = options.regionId
  console.log(options)
  uni.setNavigationBarTitle({
    title: itemName
  });


  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/tk/subject",
    data: {
      coid: itemCoid,
      regionId: regionId
    },
    method: "POST",
    success: (response) => {
      console.log("response.data", response.data)
      subjects.values = response.data.subjects;
      console.log("subjects.values", subjects.values)
    },
    fail: (error) => {
      console.log('error', error);
    }
  })
})
</script>

<style lang="scss">
.tikuPart {
  margin-top: 32rpx;
  margin-left: 32rpx;

  text {
    font-size: 33rpx;
    color: #262626;
  }
}
</style>
