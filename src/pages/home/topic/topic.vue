<template>
  <view class="container">
    <!-- Header Section -->
    <view class="header">
      <view>
        <zb-dropdown-menu :zIndex="100" ref="dropdown" active-color="#3C7BFB">
          <zb-dropdown-item name="two" :options="option2" v-model="value2" @change="change1"></zb-dropdown-item>
        </zb-dropdown-menu>
      </view>
    </view>

    <view class="header-swiper">
      <u-swiper v-if="swiperLists.length > 0" :list="swiperLists" indicator indicatorMode="dot" circular></u-swiper>
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
      <u-cell title="总题数" :value="questionNums.total" center />
      <u-cell title="已做" :value="questionNums.done" center />
      <u-cell title="错题" :value="questionNums.error" center :border="false" />
    </view>
    <view class="question-rate">
      <view class="rate-item-done">
        <u-cell title="完成率" :value="doneRate" center :border="false" :size="small" />
        <u-line-progress :percentage="done" :showText="false" activeColor="#3C7BFB" />
      </view>
      <view class="rate-item-correct">
        <u-cell title="正确率" :value="correctRate" center :border="false" />
        <u-line-progress :percentage="correct" :showText="false" activeColor="#3C7BFB" />
      </view>
    </view>
  </view>

  <view class="topic-body">
    <view class="item exam-information" @click="navigateToPath('exam-news')">
      <image src="../../../static/topic/01.png" class="item-icon"></image>
      <view class="text-container">
        <text class="item-text">考试资讯</text>
        <text class="item-text-value">前沿考试资讯</text>
      </view>
    </view>
    <view class="item free-information" @click="navigateToPath('FreeMaterials')">
      <image src="../../../static/topic/02.png" class="item-icon"></image>
      <view class="text-container">
        <text class="item-text">免费信息</text>
        <text class="item-text-value">各类优质免费资料</text>
      </view>
    </view>
    <view class="item my-wrong-question" @click="navigateToPath('my-wrong-question')">
      <image src="../../../static/topic/03.png" class="item-icon"></image>
      <view class="text-container">
        <text class="item-text">我的错题</text>
        <text class="item-text-value">所有错题在这查看</text>
      </view>
    </view>
    <view class="item my-collection" @click="navigateToPath('my-favorite-question')">
      <image src="../../../static/topic/04.png" class="item-icon"></image>
      <view class="text-container">
        <text class="item-text">我的收藏</text>
        <text class="item-text-value">所有收藏在这查看</text>
      </view>
    </view>
    <view class="item wrong-question-list" @click="navigateToPath('error-board')">
      <image src="../../../static/topic/05.png" class="item-icon"></image>
      <view class="text-container">
        <text class="item-text">错题列表</text>
        <text class="item-text-value">哪些题最容易踩坑</text>
      </view>
    </view>
    <view class="item collection-list" @click="navigateToPath('favourite-board')">
      <image src="../../../static/topic/06.png" class="item-icon"></image>
      <view class="text-container">
        <text class="item-text">收藏列表</text>
        <text class="item-text-value">哪些题才是收藏之最</text>
      </view>
    </view>
  </view>

  <view class="wechatZiXun" @click="kefu0">
    <image src="./static/topic/wechat.png" style="width: 108.7rpx;height: 108.7rpx;"></image>
  </view>

  <view class="share">
    <u-divider text="分享好友" textColor="#AEAEB2" lineColor="white"></u-divider>
    <view class="share-body">
      <view class="weixin" @click="onShareAppMessage">
        <image src="../../..//static/topic/share_1.png" class="share-icon"></image>
        <text class="item-text">微信好友</text>
      </view>
      <view class="weixinpengyouquan" @click="onShareAppMessage">
        <image src="../../../static/topic/share_2.png" class="share-icon"></image>
        <text class="item-text">朋友圈</text>
      </view>
      <view class="qq" @click="onShareAppMessage">
        <image src="../../../static/topic/share_3.png" class="share-icon"></image>
        <text class="item-text">QQ好友</text>
      </view>
      <view class="qqzone" @click="onShareAppMessage">
        <image src="../../../static/topic/share_4.png" class="share-icon"></image>
        <text class="item-text">QQ空间</text>
      </view>
    </view>
  </view>

  <view class="end">
    <u-divider text="爱学出勤奋 勤奋出天才"></u-divider>
  </view>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue';
import { useStore } from 'vuex'
import { onShow, onLoad } from '@dcloudio/uni-app';

const store = useStore()
const activePanels = ref([]); // 默认只有面板1展开
const menus = ref([]);
let tkid = ref("")

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

const onShareAppMessage = (res) => {
  return {
    title: '智考典题库',
    path: '/pages/login/login'//分享的页面路径
  }
}

function deduplicateOption2() {
  const seen = new Set();
  option2.value = option2.value.filter(option => {
    const isDuplicate = seen.has(option.value);
    seen.add(option.value);
    return !isDuplicate;
  });
}

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
      "Authorization": store.getters.getToken
    },
    data: {
      "tkid": tkid.value
    },
    success: (res) => {
      // 确保响应中有数据
      if (res.data && res.data.data) {
        menus.value = processData(res.data.data);
        uni.setStorageSync("menus", menus.value);
        uni.setStorageSync("myQuestions", res.data.data);
      }
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
      "Authorization": store.getters.getToken
    },
    data: {
      "tkid": tkid.value
    },
    success: (res) => {
      if (res.data && Array.isArray(res.data.data)) {
        swiperLists.value = []
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

const kefu0 = () => {
  wx.openCustomerServiceChat({
    //企业微信的企业id
    corpId: 'wwd3c8149b29b98603',
    extInfo: {
      //客服链接
      url: 'https://work.weixin.qq.com/kfid/kfc4f5b715bf166f166'
    },
    success: (e) => {
      console.log('e', e)
    },
    fail: (err) => {
      console.log('err', err)
    }
  })
}

const jumpQuestionList = (child) => {
  let arrayParam = JSON.stringify(child)
  uni.navigateTo({
    url: '/pages/home/topic/questionList?arrayParam=' + arrayParam
  })
}


const dropdown = ref(null)
const dropdown1 = ref(null)
const value2 = ref('a');
const option2 = ref([
  { text: '请选择学习科目', value: 'a' }
]);

const toggleItem = (val) => {
  if (val === 1) {
    dropdown1.value.close()
  } else {
    dropdown.value.close()
  }
}

const close = () => {
  dropdown.value.close()
}

const change1 = (val) => {
  if (val.value === 'a') {
    uni.redirectTo({
      url: '/pages/home/topic/menu-list'
    })
  } else {
    tkid.value = val.value
  }
}

const isValue2Set = ref(false);

const loadQuestionBanks = () => {
  // 如果option2中已经有除默认选项外的其他元素，则直接返回，不再执行后续操作
  if (option2.value.length > 1) {
    return;
  }
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/myCourse',
    method: 'GET',
    header: {
      "Content-Type": "application/json",
      "Authorization": store.getters.getToken
    },
    success: (res) => {
      if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        // 检查option2.value是否已经包含从本地存储中获取的menu数据
        const existingOption = option2.value.find(opt => opt.value === res.data.data[0].tkid);
        if (!existingOption) {
          option2.value.push(
            { text: res.data.data[0].fullname, value: res.data.data[0].tkid }
          );
          deduplicateOption2();
          value2.value = res.data.data[0].tkid;  // 设置value2为storedMenuList中的第一个元素的value
          tkid.value = value2.value
        }
      }
    },
    fail: (err) => {
      console.log('error', err);
    }
  });
}

const questionNums = ref({
  total: "0",
  done: "0",
  error: "0"
})
let doneRate = ref('0');
let correctRate = ref('0');
let done = ref(0);
let correct = ref(0);
const loadState = () => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/state',
    method: 'POST',
    header: {
      "Content-Type": "application/json",
      "Authorization": store.getters.getToken
    },
    data: {
      "tkid": tkid.value
    },
    success: (res) => {
      if (res.data && res.data.data) {
        nextTick(() => {
          questionNums.value = res.data.data;
          if (questionNums.value.total === 0) {
            questionNums.value.total = "0"
          }
          if (questionNums.value.done === 0) {
            questionNums.value.done = "0"
          }
          if (questionNums.value.correct === 0) {
            questionNums.value.correct = "0"
          }
          if (questionNums.value.error === 0) {
            questionNums.value.error = "0"
          }
          if (questionNums.value.progress === 0) {
            questionNums.value.progress = "0"
          }
          console.log("首页values,", questionNums.value)

          doneRate.value = ((questionNums.value.done / questionNums.value.total) * 100).toFixed(2) + '%';
          done.value = ((questionNums.value.done / questionNums.value.total) * 100).toFixed(2);

          // 计算正确率
          correctRate.value = ((questionNums.value.correct / questionNums.value.total) * 100).toFixed(2) + '%';
          correct.value = ((questionNums.value.correct / questionNums.value.total) * 100).toFixed(2);
        });
      } else {
        // Handle the case where the data is not available or not in the expected format.
        console.error('Invalid data format:', res.data);
      }
    },
    fail: (err) => {
      console.log('error', err);
    }
  });

}

watch(
  () => tkid.value, // 使用函数返回tkid的值，以确保深度监听
  (newTkid, oldTkid) => {
    uni.setStorageSync("tkid", newTkid)
    bannerLoads();
    loadMenus();
    loadQuestionBanks();
    loadState();
  },
  { deep: true, immediate: true } // 使用deep和immediate选项
);

onShow(() => {
  loadMenuListFromStorage();
  let tikuFromLocal = store.getters.getTiKu
  if (tikuFromLocal != null && tikuFromLocal !== "") {
    let tiku = JSON.parse(tikuFromLocal)
    option2.value.push(
      { text: tiku.fullname, value: tiku.tkid }
    )
    deduplicateOption2();
    value2.value = tiku.tkid
    tkid.value = tiku.tkid
  }
  uni.setStorageSync("tkid", tkid.value)
  bannerLoads()
  loadMenus()
  loadQuestionBanks()
  loadState()
})

const navigateToPath = (param) => {
  uni.navigateTo({
    url: '/pages/home/topic/' + param
  })
}

const loadMenuListFromStorage = () => {
  const storedMenuList = uni.getStorageSync("menuList");
  if (storedMenuList && Array.isArray(storedMenuList) && storedMenuList.length > 0) {
    option2.value = [{ text: '请选择学习科目', value: 'a' }, ...storedMenuList];
    deduplicateOption2();
    value2.value = storedMenuList[0].value;  // 设置value2为storedMenuList中的第一个元素的value
    tkid.value = value2.value
  }
}

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

.header-swiper {
  width: 100%;
  height: 130px;

  .u-swiper {
    width: 100%;
    height: 100%;
  }
}

.question {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: calc(100% - 20px);
  margin: 16px 10px 0 10px;
  background: #f4f7fe;
  border-radius: 12px;

  .question-num,
  .question-rate {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .u-cell {
      display: flex;
      align-items: center;
      height: 50%;
    }
  }

  .question-num {
    width: 40%;
  }

  .question-rate {
    width: 53%;

    .rate-item-done,
    .rate-item-correct {
      display: flex;
      flex-direction: column;
      height: 100%;

      .u-line-progress {
        height: 100%;
      }
    }
  }
}

.question-menu {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  justify-content: flex-start; // 从左侧开始排列

  .menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-right: 65rpx; // 为每个元素添加右边距

    &:last-child {
      margin-right: 0; // 移除最后一个元素的右边距
    }

    .menu-image {
      width: 35px;
      height: 35px;
    }
  }
}

.topic-body {
  margin-top: 13px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;

  .item {
    display: flex;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 10px;
    height: 155rpx;
    width: 300rpx;
    background: #F7F7F7;
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
    justify-content: center;

    .item-icon {
      width: 40px;
      height: 40px;
      margin-right: 10px; // 增加与文本区域的间距
    }

    .text-container {
      display: flex;
      flex-direction: column; // 设置文本容器为垂直布局
      align-items: flex-start; // 从顶部开始布局

      .item-text {
        margin-bottom: 6px; // 增加与下方文本的间距
        font-size: 14px;
        color: #333333; // 设置深色字体
      }

      .item-text-value {
        font-size: 11px;
        color: #9A9A9A; // 设置浅色字体
      }
    }
  }
}

.share {
  margin-top: 12px;

  .share-body {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .weixin,
    .weixinpengyouquan,
    .qq,
    .qqzone {
      display: flex;
      flex-direction: column;
      align-items: center;

      .share-icon {
        width: 40px;
        height: 40px;
      }

      .item-text {
        text-align: center;
        height: 31rpx;
        font-size: 22rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        color: #262626;
        margin-top: 18rpx;
      }
    }
  }
}

.end {
  width: 693rpx;
  margin-left: 29rpx;
  margin-top: 50rpx;
  margin-bottom: 100rpx;
  height: 70rpx;
}

.wechatZiXun {
  width: 54.0px;
  height: 54.0px;
  margin-left: 640rpx;
  margin-bottom: 572rpx;
  position: fixed;
  bottom: 10px;
  z-index: 1000;
}
</style>
