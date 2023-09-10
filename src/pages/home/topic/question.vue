<template>
  <view>

  </view>
</template>

<script setup>
import {onLoad} from '@dcloudio/uni-app';
import {ref} from 'vue';

const questionLists = ref([])

onLoad((options) => {
  questionLists.value = JSON.parse(options.param);
  console.log(questionLists.value)
})
</script>

<style lang="scss">

</style>
