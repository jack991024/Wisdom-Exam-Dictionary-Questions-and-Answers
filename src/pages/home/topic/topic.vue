<template>
  <view class="container">
    <!-- Header Section -->
    <view class="header">
      <view>
        <zb-dropdown-menu
            :zIndex="100"

            ref="dropdown"
        >
          <zb-dropdown-item
              name="two"
              :options="option2"
              v-model="value2"
              @change="change1"
          ></zb-dropdown-item>
        </zb-dropdown-menu>
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
      <u-cell title="总题数" :value="questionNums.total" center/>
      <u-cell title="已做" :value="questionNums.done" center/>
      <u-cell title="错题" :value="questionNums.error" center :border="false"/>
    </view>
    <view class="question-rate">
      <view class="rate-item-done">
        <u-cell title="完成率" :value="doneRate" center :border="false" :size="small"/>
        <u-line-progress :percentage="done" :showText="false" activeColor="#3C7BFB"/>
      </view>
      <view class="rate-item-correct">
        <u-cell title="正确率" :value="correctRate" center :border="false"/>
        <u-line-progress :percentage="correct" :showText="false" activeColor="#3C7BFB"/>
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
    <!--    <view class="share-body">-->
    <!--      <view class="weixin">-->
    <!--        <image src="../../../static/topic/06.png" class="item-icon"></image>-->
    <!--        <text class="item-text">收藏列表</text>-->
    <!--      </view>-->
    <!--      <view class="weixinpengyouquan">-->
    <!--        <image src="../../../static/topic/06.png" class="item-icon"></image>-->
    <!--        <text class="item-text">收藏列表</text>-->
    <!--      </view>-->
    <!--      <view class="qq">-->
    <!--        <image src="../../../static/topic/06.png" class="item-icon"></image>-->
    <!--        <text class="item-text">收藏列表</text>-->
    <!--      </view>-->
    <!--      <view class="qqzone">-->
    <!--        <image src="../../../static/topic/06.png" class="item-icon"></image>-->
    <!--        <text class="item-text">收藏列表</text>-->
    <!--      </view>-->
    <!--    </view>-->
  </view>

</template>

<script setup>
import {ref, computed, nextTick, watch} from 'vue';
import {useStore} from 'vuex'
import {onShow, onLoad} from '@dcloudio/uni-app';

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
      }
      console.log(menus.value);
    },
    fail: (err) => {
      console.log('error', err);
    }
  });
}

const bannerLoads = () => {
  console.log("tkid:",tkid)
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


const dropdown = ref(null)
const dropdown1 = ref(null)
const value2 = ref('a');
const option2 = ref([
  {text: '请选择学习科目', value: 'a'}
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
  tkid.value = val.value
  console.log(tkid.value)
}

const loadQuestionBanks = () => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/myCourse',
    method: 'GET',
    header: {
      "Content-Type": "application/json",
      "Authorization": store.getters.getToken
    },
    success: (res) => {
      if (res.data && Array.isArray(res.data.data)) {
        res.data.data.forEach(option => {
          option2.value.push(
              {text: option.fullname, value: option.tkid}
          )
          ;
        });
      }
    },
    fail: (err) => {
      console.log('error', err);
    }
  });
}

const questionNums = ref({
  total: 0,
  done: 0,
  error: 0
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
          console.log(questionNums)
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
      console.log(1);
      bannerLoads();
      loadMenus();
      loadQuestionBanks();
      loadState();
    },
    { deep: true, immediate: true } // 使用deep和immediate选项
);
onLoad(() => {
  bannerLoads()
  loadMenus()
  loadQuestionBanks()
  loadState()
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

  .question-num, .question-rate {
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

    .rate-item-done, .rate-item-correct {
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
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  .menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

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
    flex-direction: column;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 10px;

    .item-icon {
      width: 40px;
      height: 40px;
    }

    .item-text {
      margin-top: 10px;
      text-align: center;
      font-size: 14px;
    }
  }
}

.share {
  margin-top: 12px;
}

</style>
