<template>
  <u-navbar leftText="" title="选择考试" :border="true" :safeAreaInsetTop="false" @leftClick="naviToTwo()"
    @rightClick="naviToTiKu()">
    <template #right>
      <text>提交</text>
    </template>
  </u-navbar>
  <view>
    <view class="header">
      <view class="search">
        <u-search placeholder="搜索考试科目" v-model="keyword" action-style="color: #3C7BFB;"
          @custom="searchByKeyWords(keyword)"></u-search>
      </view>
    </view>

    <view class="body">
      <view class="item">
        <u-cell-group>
          <!-- todo 多选怎么解决 -->
          <checkbox-group @change="handleCheckboxChange">
            <view v-for="(item, index) in lists" :key="index">
              <u-cell :title="item.name" size="large">
                <template #value>
                  <label>
                    <checkbox :value="item.tksuid" color="blue" />
                  </label>
                </template></u-cell>
            </view>
          </checkbox-group>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore()
let keyword = ""
const checkedItems = ref([]);

// 添加 handleCheckboxChange 函数
const handleCheckboxChange = (event) => {
  checkedItems.value = event.detail.value;
}

const searchByKeyWords = (keyword) => {
  let subjects = []
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/tk/search",
    data: {
      keyword: keyword
    },
    method: "POST",
    success: (response) => {
      subjects = response.data.data;
      uni.setStorageSync("subjects", subjects);
      uni.navigateTo({
        url: "/pages/home/classification/searchByKeyWordTiKuItem"
      })
    },
    fail: (error) => {
      console.log('error', error);
    }
  })
}

const lists = ref()
onLoad((options) => {
  uni.hideHomeButton()
  let coid = options.coid
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/tk/subject",
    method: "POST",
    data: {
      "coid": coid,
      "region_id": "110000000000"
    },
    success: function (res) {
      lists.value = res.data.data.subjects
    },
    error: function (error) {

    }
  })
})

const naviToTiKu = () => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/evaluateTksuid',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      "Authorization": store.getters.getToken
    },
    data: {
      tksuids: checkedItems.value
    },
    success: (response) => {
      uni.setStorageSync("flag", "true");
      uni.switchTab({
        url: "/pages/home/topic/topic"
      })
    },
    fail: (error) => {
      console.log('error', error);
    }
  });


}

const naviToTwo = () => {
  uni.reLaunch({
    url: "/pages/start/xuanzekaoshi-two"
  })
}
</script>

<style lang="scss">
.header {
  height: 115rpx;
  margin-top: 100rpx;

  .search {
    margin: 28rpx;
  }
}

.body {
  background: #F5F6F8;

  .item {
    position: relative; // 使伪类相对于此元素定位
    background: #FFFFFF;

    &::before {
      content: ""; // 伪类必须有内容，但我们可以设置为空
      display: block;
      width: 100%; // 使伪类的宽度与.item相同
      height: 22rpx; // 设置伪类的高度
      background: #F5F6F8; // 你可以根据需要设置背景颜色
      position: absolute;
      top: -22rpx; // 将伪类放在.item的上方
      left: 0;
    }
  }
}
</style>
