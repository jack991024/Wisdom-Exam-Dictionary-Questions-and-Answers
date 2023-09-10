<template>
  <view class="container">
    <!-- Header Section -->
    <view class="header">
      <view>
        <u-cell title="面板1" :border="false" :is-link="true" @click="togglePanel('panel1')"
                :title-style="{ textAlign: 'center' }"/>
        <transition name="slide-fade">
          <view v-if="activePanels.includes('panel1')" class="panel-overlay-container">
            <view class="overlay"></view>
            <view class="panel-content-container">
              <view class="panel-content"
                    :style="{ maxHeight: activePanels.includes('panel1') ? panelContentMaxHeight : '0' }">
                <u-cell title="面板2" :is-link="true" @click="togglePanel('panel2')"/>
                <u-cell title="面板3" :is-link="true" @click="togglePanel('panel3')"/>
              </view>
            </view>
          </view>
        </transition>
      </view>
    </view>

    <view class="header-swiper">
      <u-swiper
          v-if="swiperLists.length > 0"
          :list="swiperLists"
          indicator
          indicatorMode="dot"
          circular
      ></u-swiper>
    </view>
  </view>

  <view class="question">
    <view class="question-num">
      <u-cell title="总题数" value="17698" center/>
      <u-cell title="已做" value="9802" center/>
      <u-cell title="错题" value="1990" center :border="false"/>
    </view>
    <view class="question-rate">
      <view class="rate-item">
        <u-cell title="完成率" value="75%" center :border="false"/>
        <u-line-progress :percentage="75" :showText="false"/>
      </view>
      <view class="rate-item">
        <u-cell title="正确率" value="85%" center :border="false"/>
        <u-line-progress :percentage="85" :showText="false"/>
      </view>
    </view>

  </view>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useStore} from 'vuex'
import {onShow} from '@dcloudio/uni-app';

const store = useStore()
const activePanels = ref([]); // 默认只有面板1展开

const panelContentMaxHeight = computed(() => {
  return activePanels.value.includes('panel1') ? '100vh' : '0';
});

function togglePanel(panelName) {
  const index = activePanels.value.indexOf(panelName);
  if (index === -1) {
    activePanels.value.push(panelName);
  } else {
    activePanels.value.splice(index, 1);
  }
}

const swiperLists = ref(['https://cdn.zhikaodian.com/tk/details/29/c2/29c2e26123124ce5c15deb600d4ca3ba.png']);

const bannerLoads = () => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/banners',
    method: 'POST',
    header: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImFkZGl0aW9uYWxfY2xhaW1zIjp7InRlcm1pbmFsIjoid3gifSwiZXhwIjoxNzI1ODQyMTEyfQ.YlAp50IFMZG_7lf4MaPOF3Nj__NelB7evCRTHdmXMXA"
    },
    data: {
      "tkid": "c9b2fff1-71c1-5aa2-89b0-204659d81c64"
    },
    success: (res) => {
      console.log(res.data)
      console.log(Array.isArray(res.data.data))
      if (res.data && Array.isArray(res.data.data)) {
        res.data.data.forEach(img => {
          swiperLists.value.push(
              img.image_src2
          );
        });
        console.log(swiperLists.value)
      }
    },
    fail: (err) => {
      console.log('error', err);
    }
  });
}


onShow(() => {
  console.log("123")
  bannerLoads()
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
}

.header {
  width: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明灰色背景 */
}

.panel-content-container {
  position: relative; /* 以确保它位于.overlay之上 */
  background-color: #fff;
  z-index: 1000; /* 确保它位于.overlay之上 */
}

.panel-overlay-container {
  position: fixed;
  top: 42px; /* 或更多，以避免覆盖面板1 */
  left: 0;
  width: 100%;
  z-index: 999;
}

.panel-content {
  transition: max-height 0.3s ease;
  overflow: hidden;
  max-height: 0;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: max-height 0.3s ease;
}

.slide-fade-enter-to, .slide-fade-leave-to {
  max-height: 100vh;
}

.header-swiper {
  width: 100%; /* 设置宽度为100%，使其占满容器宽度 */
  height: 200px; /* 设置一个固定的高度，你可以根据需求调整这个值 */
}

.u-swiper {
  width: 100%; /* 使 u-swiper 组件占满 .header-swiper 容器的宽度 */
  height: 100%; /* 使 u-swiper 组件占满 .header-swiper 容器的高度 */
}

.question {
  display: flex;
  justify-content: space-between;
  border: 1px red solid;
  width: calc(100% - 20px);
  height: 150px;
  margin: 0 10px;
  background: #f4f7fe;
  border-radius: 12px;
}

.question-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.question-num {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
}

.question-rate {
  width: 53%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.rate-item {
  display: flex;
  flex-direction: column;
}

</style>
