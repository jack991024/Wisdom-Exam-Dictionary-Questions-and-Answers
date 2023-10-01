<template>
  <view>
    <view class="header">
      <zy-segmented :values="list" :current="curNow" @onClickItem="sectionChange"></zy-segmented>
    </view>
    <view v-if="curNow !== 1">
      <view class="list">
        <view v-for="(item, index) in wrongQuestionList" :key="index" class="item"
          @click="navigateToQuestionNew(item, index)">
          <view class="title">
            <text>{{ item.stem }}</text>
          </view>

          <view class="footer">
            <view class="left">
              <view class="sources">
                <text>来源：{{ item.source }}</text>
              </view>
            </view>
            <view class="right">
              <view class="createTime">
                <text>{{ formatDate(item.update_at) }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-if="curNow === 1">
      <!--      自定义模态框-->
      <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-container" @click.stop>
          <button class="modal-button review-button" @click="reviewMistakes">错题回顾</button>
          <button class="modal-button redo-button" @click="redoMistakes">错题重做</button>
        </div>
      </div>

      <view class="header">
        <zy-segmented :values="listMenus" :current="curNowMenus" @onClickItem="sectionChangeMenus"
          styleType='button'></zy-segmented>
      </view>
      <view class="list">
        <view v-for="(item, index) in getCurrentChildren()" :key="index" class="itemTwo">
          <u-cell :title="item.name" :value="item.count" :isLink="true" :center="true" :border="false"
            @click="jumpToItems(item)"></u-cell>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { useStore } from 'vuex'
import zySegmented from "@/uni_modules/zy-segmented-control/components/zy-segmented-control/zy-segmented-control.vue"


const store = useStore()


const visible = ref(false);

const open = () => {
  visible.value = true;
};

const close = () => {
  visible.value = false;
};

const handleOverlayClick = () => {
  close();
};

const reviewMistakes = () => {
  console.log('进行错题回顾');
  navigateToQuestion(currentItem.value, 0)
  close();
};

const redoMistakes = () => {
  console.log('进行错题重做');
  navigateToQuestion2(currentItem.value, 0)
  close();
};

const currentItem = ref(null);

const jumpToItems = (item) => {
  if (item.children.length !== 0) {
    uni.setStorageSync("item", item)
    uni.navigateTo({
      url: "/pages/home/topic/jump-items?name=" + item.name
    })
  } else {
    currentItem.value = item;
    open()
  }
}

const list = ref(['最新错题', '全部错题']);
const listMenus = ref([]);
const curNow = ref(0);
const curNowMenus = ref(0);
const wrongQuestionList = ref([])
const wrongQuestionAllList = ref([])


const navigateToQuestionNew = (item, index) => {
  const result = wrongQuestionList.value.map(item => ({
    chid: item.chid,
    qid: item.qid
  }));

  uni.setStorageSync("wrongQuestionListsNew", result);

  uni.navigateTo({ url: "/pages/home/topic/question-jump?title=最近错题&type=1&currentIndex=" + index })
}

const navigateToQuestion = (item, index) => {
  const result = {
    chid: item.chid,
    qid: item.qid
  };

  uni.setStorageSync("wrongQuestionLists", result);

  uni.navigateTo({ url: "/pages/home/topic/question-jump?title=" + item.name + "&type=2&currentIndex=" + index })
}

const navigateToQuestion2 = (item, index) => {
  const result = {
    chid: item.chid,
    qid: item.qid
  };

  uni.setStorageSync("wrongQuestionLists", result);

  uni.navigateTo({ url: "/pages/home/topic/question-jump?title=" + item.name + "&type=3&currentIndex=" + index })
}


const sectionChangeMenus = (index) => {
  curNowMenus.value = index;
}

// 创建一个响应式变量用于存储分类后的数据
const menuData = ref({});

// 当data更新时，更新menuData
const updateMenuData = (data) => {
  const newData = {};
  data.forEach(item => {
    newData[item.name] = item.children;
  });
  menuData.value = newData;
};

// 当用户在分段器中切换菜单时，显示对应的children内容
const getCurrentChildren = () => {
  return menuData.value[listMenus.value[curNowMenus.value]] || [];
};


const sectionChange = (index) => {
  curNow.value = index;

  // 检查curNow的值
  if (curNow.value === 1) {
    uni.request({
      url: "https://dev.zhikaodian.com/apiV2/tk/myError",
      method: 'POST',
      header: {
        'Authorization': store.getters.getToken,
        'Content-Type': 'application/json'
      },
      data: {
        "tkid": tkid
      },
      success: (response) => {
        let data = response.data.data;
        listMenus.value = uni.getStorageSync("menus").map(item => item.menu)
        updateMenuData(data);
      },
      fail: (error) => {
        console.log(error);
      }
    });
  }
};

const formatDate = (timestamp) => {
  // 如果是秒级时间戳，转换为毫秒
  const date = new Date(timestamp * 1000);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

let tkid = ''
onShow((options) => {
  tkid = uni.getStorageSync("tkid")
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/myErrorRecent',
    method: 'POST',
    header: {
      'Authorization': store.getters.getToken,
      'Content-Type': 'application/json'
    },
    data: {
      "tkid": tkid,
      "offset": 0,
      "limit": 100
    },

    success: (response) => {
      wrongQuestionList.value = response.data.data
    },
    fail: (error) => {
      console.log(error);
    }
  });

})
</script>

<style lang="scss">
.list {
  margin-top: 22rpx;

  .item {
    width: 692rpx;
    height: 167rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
    margin-left: 29rpx;

    .title {
      margin-top: 22rpx;
      font-size: 29rpx;
      color: #262626;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-right: 22rpx;
      margin-left: 22rpx;
      height: 80rpx;

      &::after {
        content: "";
        display: block;
        height: 40rpx;
      }
    }

    .footer {
      margin-top: 15rpx;
      display: flex;
      justify-content: space-between;

      .sources {
        margin-left: 22rpx;
        font-size: 22rpx;
        color: #898989;
      }

      .createTime {
        font-size: 22rpx;
        color: #898989;
        margin-right: 22rpx;
      }
    }
  }

  .itemTwo {
    width: 692rpx;
    height: 167rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
    border-radius: 22rpx 22rpx 22rpx 22rpx;
    opacity: 1;
    margin-left: 29rpx;
    display: flex; // 添加这一行
    flex-direction: column; // 添加这一行
    justify-content: center; // 添加这一行
    margin-bottom: 29rpx;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  width: 286rpx;
  height: 168rpx;
  background: #FFFFFF;
  border-radius: 11rpx 11rpx 11rpx 11rpx;
  opacity: 1;
}

.modal-button {}

.review-button {
  color: #3C7BFB;
}

.redo-button {
  color: #3C7BFB;
}

.modal-button:active {
  opacity: 0.8;
}
</style>
