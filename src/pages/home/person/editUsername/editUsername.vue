<template>
  <view>
    <up-input
        placeholder="请输入用户名"
        border="surround"
        v-model="username"
    ></up-input>
  </view>
</template>

<script setup>
import {ref} from 'vue'

let username = ref('')
</script>

<style lang="scss">

</style>
