<template>
  <view>
    <view class="header">
      <u-navbar
          leftText="返回"
          title="选择考试"
          :safeAreaInsetTop="false"
          :auto-back="true"
      >
        <template #right>
          <view>
            <text>完成</text>
          </view>
        </template>
      </u-navbar>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  }
}
</script>

<style lang="scss">

</style>
