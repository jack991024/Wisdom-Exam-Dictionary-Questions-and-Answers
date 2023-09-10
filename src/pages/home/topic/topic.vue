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

    <view class="question-menu" v-if="menus.length">
      <view class="menu-item" v-for="(item, index) in menus" :key="index">
        <view>
          <image :src="item.src" class="menu-image" @click="jumpQuestionList(item.children)"></image>
          <!-- 将item.imageSrc替换为实际的图片URL属性 -->
        </view>
        <view>
          <text>{{ item.menu }}</text> <!-- 将item.text替换为实际的文本属性 -->
        </view>
      </view>
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
        <u-cell title="完成率" value="75%" center :border="false" :size="small"/>
        <u-line-progress :percentage="75" :showText="false" activeColor="#3C7BFB"/>
      </view>
      <view class="rate-item">
        <u-cell title="正确率" value="85%" center :border="false"/>
        <u-line-progress :percentage="85" :showText="false" activeColor="#3C7BFB"/>
      </view>
    </view>
  </view>

  <view class="topic-body">
    <view class="item exam-information">
      <image src="../../../static/topic/01.png" class="item-icon"></image>
      <text class="item-text">考试信息</text>
    </view>
    <view class="item free-information">
      <image src="../../../static/topic/02.png" class="item-icon"></image>
      <text class="item-text">免费信息</text>
    </view>
    <view class="item my-wrong-question">
      <image src="../../../static/topic/03.png" class="item-icon"></image>
      <text class="item-text">我的错题</text>
    </view>
    <view class="item my-collection">
      <image src="../../../static/topic/04.png" class="item-icon"></image>
      <text class="item-text">我的收藏</text>
    </view>
    <view class="item wrong-question-list">
      <image src="../../../static/topic/05.png" class="item-icon"></image>
      <text class="item-text">错题列表</text>
    </view>
    <view class="item collection-list">
      <image src="../../../static/topic/06.png" class="item-icon"></image>
      <text class="item-text">收藏列表</text>
    </view>
  </view>

  <view class="share">
    <u-divider
        text="分享好友"
        textColor="#AEAEB2"
        lineColor="white"
    ></u-divider>
    <view class="share-body">
      <view class="weixin">
        <image src="../../../static/topic/06.png" class="item-icon"></image>
        <text class="item-text">收藏列表</text>
      </view>
      <view class="weixinpengyouquan">
        <image src="../../../static/topic/06.png" class="item-icon"></image>
        <text class="item-text">收藏列表</text>
      </view>
      <view class="qq">
        <image src="../../../static/topic/06.png" class="item-icon"></image>
        <text class="item-text">收藏列表</text>
      </view>
      <view class="qqzone">
        <image src="../../../static/topic/06.png" class="item-icon"></image>
        <text class="item-text">收藏列表</text>
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
const menus = ref([]);

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

const imagePaths = [
  '../../../static/topic/menu01.png',
  '../../../static/topic/menu02.png',
  '../../../static/topic/menu03.png',
  '../../../static/topic/menu04.png'
];

let imageIndex = 0;

function processData(data) {
  return data.map((item, index) => {
    return {
      src: imagePaths[index % 4],
      menu: item.name,
      children: item.children.map(child => {
        return {
          tkid: child.tkid,
          chid: child.chid,
          parent: child.parent,
          name: child.name,
          depth: child.depth,
          end: child.end,
          paper: child.paper,
          free: child.free,
          order: child.order,
          total: child.total,
          done: child.done,
          correct: child.correct,
          children: child.children
        };
      })
    };
  });
}


const loadMenus = () => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/chapterList',
    method: 'POST',
    header: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImFkZGl0aW9uYWxfY2xhaW1zIjp7InRlcm1pbmFsIjoid3gifSwiZXhwIjoxNzI1ODQyMTEyfQ.YlAp50IFMZG_7lf4MaPOF3Nj__NelB7evCRTHdmXMXA"
    },
    data: {
      "tkid": "c9b2fff1-71c1-5aa2-89b0-204659d81c64"
    },
    success: (res) => {
      // 确保响应中有数据
      if (res.data && res.data.data) {
        menus.value = processData(res.data.data);
      }
      console.log(menus.value);
    },
    fail: (err) => {
      console.log('error', err);
    }
  });
}

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
      if (res.data && Array.isArray(res.data.data)) {
        res.data.data.forEach(img => {
          swiperLists.value.push(
              img.image_src2
          );
        });
      }
    },
    fail: (err) => {
      console.log('error', err);
    }
  });
};

const jumpQuestionList = (child) => {
  let arrayParam = JSON.stringify(child)
  uni.navigateTo({
    url: '/pages/home/topic/questionList?arrayParam=' + arrayParam
  })
}

onShow(() => {
  bannerLoads()
  loadMenus()
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
  height: 130px; /* 设置一个固定的高度，你可以根据需求调整这个值 */
}

.u-swiper {
  width: 100%; /* 使 u-swiper 组件占满 .header-swiper 容器的宽度 */
  height: 100%; /* 使 u-swiper 组件占满 .header-swiper 容器的高度 */
}

.question {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 20px);
  margin: 16px 10px 0px 10px;
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

.question-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}


.menu-image {
  width: 35px;
  height: 35px;
}

.topic-body {
  margin-top: 13px;
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列等宽 */
  grid-template-rows: 1fr 1fr 1fr; /* 三行等高 */
  gap: 10px; /* 设置网格间距 */
  background-color: white; /* 设置背景色 */
  padding: 10px; /* 设置内边距 */
  border-radius: 10px; /* 设置圆角 */
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7; /* 为每个区块设置一个背景色来区分它们 */
  border-radius: 10px; /* 为每个区块设置圆角 */
  padding: 10px; /* 为每个区块设置内边距 */
}

.item-icon {
  width: 40px; /* 设置图标宽度 */
  height: 40px; /* 设置图标高度 */
}

.item-text {
  margin-top: 10px; /* 设置文本和图标之间的间距 */
  text-align: center; /* 让文本居中显示 */
  font-size: 14px; /* 设置字体大小 */
}

.share {
  margin-top: 12px;
}
</style>
