<template>
  <view id="web-info">
    <web-view :src="src"></web-view>
  </view>
</template>
<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const src = ref(null)

onLoad((option) => {
  src.value = option.url
  uni.downloadFile({
    url: src.value,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.openDocument({
          filePath: res.tempFilePath,
          fileType: 'pdf',
          success: () => {
            uni.showToast({
              title: '打开文档成功',
              icon: 'success',
              duration: 2000
            })
            console.log('打开文档成功');
          },
          fail: (error) => {
            console.error('打开文档失败', error);
          }
        });
      }
    },
    fail: (error) => {
      console.error('下载文件失败', error);
    }
  });

})
</script>