<template>
  <view>
    <view class="header">
      <image :src="item.detail?.cover" style="width:750rpx;height:422rpx;"></image>
    </view>
    <view style="border-bottom: 2rpx solid #C7C7CC;">
      <zy-segmented :values="list" :current="curNow" @onClickItem="sectionChange"></zy-segmented>
    </view>
    <u-gap height="1" bgColor="#f6f6f6"></u-gap>
    <view v-if="curNow===0">
      <view class="info">
        <view class="name">
          <text>{{ item.name }}</text>
        </view>
        <view class="labels">
          <view class="label" v-for="(item,index) in item.detail?.labels" :key="index">
            <text>{{ item }}</text>
          </view>
        </view>
        <view class="footer">
          <view class="price">
            <view class="priceNow">
              <text class="label" style="color: #FF3B30;font-size: 25.36rpx;">折后 ¥</text>
              <text class="value" style="color: #FF3B30;font-size: 38.04rpx;">{{ item.detail?.min_price }}</text>
            </view>
            <view class="priceOld">
              <text>¥{{ item.detail?.max_price }}</text>
            </view>
          </view>
          <view class="days">
            <text>有效期：{{ item.detail?.days }}天</text>
          </view>
        </view>
      </view>
      <u-gap height="30rpx" bgColor="#f6f6f6"></u-gap>
      <view class="subjects">
        <view class="header">
          <text>科目</text>
        </view>
        <view class="subjects-item">
          <view class="subject-item"
                v-for="(item, index) in courses"
                :key="index"
                :class="{ 'selected': isSelected(item) }"
                @click="toggleSelect(item)">
            <text>{{ item.name }}</text>
          </view>
        </view>
      </view>
    </view>
    <view v-if="curNow===1">
      <image src="https://cdn.zhikaodian.com/tk/details/6c/ab/6cab94c1d979a420fa823629f416db33.png" mode="widthFix"
             style="width: 100%"></image>
      <image src="https://cdn.zhikaodian.com/tk/details/10/74/107434ca744e30849198f63c7bd504c8.png" mode="widthFix"
             style="width: 100%"></image>
      <image src="https://cdn.zhikaodian.com/tk/details/6e/73/6e732c7cdd52c8e82803b86484fac2ba.png" mode="widthFix"
             style="width: 100%"></image>
      <image src="https://cdn.zhikaodian.com/tk/details/b7/61/b761f94c723c3dad38675c1320c99863.png" mode="widthFix"
             style="width: 100%"></image>
      <image src="https://cdn.zhikaodian.com/tk/details/51/f5/51f5ba41a518dc133ef09d19b7c58a2b.png" mode="widthFix"
             style="width: 100%"></image>
    </view>
    <!-- 底部导航栏 -->
    <view class="bottom-nav">
      <view class="zixun" @click="kefu0">
        <view>
          <image src="./static/fenlei/zixun.png" style="width: 45.29rpx;height: 45.29rpx;"></image>
        </view>
        <view>
          <text>咨询</text>
        </view>
      </view>
      <view class="shiyong" @click="shiyong">点击试用</view>
      <view class="buy">立即购买</view>
    </view>

    <u-modal
        :show="showModal"
        :showConfirmButton="false"
        :showCancelButton="false" width="507.25rpx" height="362.32rpx">
      <template v-slot:default>
        <text>{{ modalContent }}</text>
      </template>
      <template v-slot:confirmButton>
        <view class="modal-button-group">
          <view class="modal-button" @click="goToHome">返回首页</view>
          <view class="modal-button" @click="tryNow">立即试用</view>
        </view>
      </template>
    </u-modal>
  </view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {reactive, ref} from "vue";
import {useStore} from "vuex";
import zySegmented from "@/uni_modules/zy-segmented-control/components/zy-segmented-control/zy-segmented-control.vue"

const store = useStore()
const list = ref(['套餐', '介绍']);
const curNow = ref(0);
const showModal = ref(false);  // 控制模态框的显示
const modalContent = '添加成功！';  // 模态框的内容

// 返回首页的函数
const goToHome = () => {
  // 在这里添加跳转到首页的代码
  console.log('返回首页');
  showModal.value = false;  // 关闭模态框
  uni.switchTab({url: "/pages/home/classification/classificationRegions"})
};

// 立即试用的函数
const tryNow = () => {
  // 在这里添加立即试用的代码
  console.log('立即试用');
  showModal.value = false;  // 关闭模态框
  uni.navigateTo({url: "/pages/home/person/personInfo/tiku"})
};

const sectionChange = (index) => {
  curNow.value = index;
  console.log("value", curNow.value)
};

let item = reactive({})
const courses = ref([])
onLoad((option) => {
  Object.assign(item, JSON.parse(option.item));
  console.log(item)

  let tksuid = item.tksuid
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/tk/course",
    data: {tksuid: tksuid},
    method: "POST",
    success: (response) => {
      courses.value = response.data.data.courses
      console.log("courses", courses.value)
    },
    error: (err) => {
      console.log(err)
    }
  })
})

const selectedItems = ref([]);  // 新增：用于存储选中的项

const toggleSelect = (item) => {
  const index = selectedItems.value.findIndex(selectedItem => selectedItem.name === item.name);
  if (index !== -1) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push(item);
  }
  console.log("selectedItems", selectedItems)
};

const isSelected = (item) => {
  return selectedItems.value.some(selectedItem => selectedItem.name === item.name);
};

const shiyong = () => {
  const tksuids = selectedItems.value.map(item => item.tksuid);
  console.log(store.getters.getToken)
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/tk/evaluateTksuid',
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
      "Authorization": store.getters.getToken
    },
    data: {
      "tksuids": tksuids
    },
    success: (response) => {
      showModal.value = true;
    },
    fail: (error) => {
      console.log('error', error);
    }
  });

}

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
</script>

<style lang="scss">
.info {
  margin-top: 43rpx;
  margin-left: 27rpx;

  text {
    font-size: 38.04rpx;
    font-weight: bold;
    color: #262626;
  }

  .labels {
    margin-top: 18rpx;
    display: flex;
    flex-wrap: wrap;

    .label {
      height: 33rpx;
      background: #E1EAFD;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      display: flex; // 添加这一行
      justify-content: center; // 添加这一行
      align-items: center; // 添加这一行
      padding-left: 18rpx;
      padding-right: 18rpx;
      margin-bottom: 10rpx;

      text {
        font-size: 21.74rpx;
      }

      &:not(:last-child) {
        margin-right: 18rpx; // 添加这一行
      }

      &:nth-child(3n+1) {
        background: #E1EAFD;

        text {
          color: #3D7BFB;
        }
      }

      &:nth-child(3n+2) {
        background: #FBE5E4;

        text {
          color: #FF5756;
        }
      }

      &:nth-child(3n+3) {
        background: #FCEFE5;

        text {
          color: #FF9957;
        }
      }
    }
  }

  .footer {
    display: flex;
    margin-top: 35rpx;
    margin-right: 30rpx;
    flex-direction: row;
    justify-content: space-between;

    .price {
      display: flex;
      align-items: center;
      margin-bottom: 41rpx;

      .priceNow {
        margin-right: 24rpx;

        text {
          color: #FF3B30;
          font-size: 38rpx;
          font-weight: bold;
        }
      }

      .priceOld {
        text {
          font-size: 25rpx;
          color: #AEAEB2;
          text-decoration: line-through;
          margin-top: 5rpx;
        }
      }
    }

    .days {
      text {
        color: #AEAEB2;
        font-size: 25rpx;
      }
    }

  }
}

.subjects {
  .header {
    margin-top: 38rpx;
    margin-left: 29rpx;
  }

  .subjects-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 30rpx;

    .subject-item {
      width: 210rpx;
      height: 94rpx;
      background: #F7F7F7;
      border-radius: 10rpx;
      opacity: 1;
      margin-right: 31rpx;
      margin-bottom: 31rpx;
      margin-top: 27rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      &:nth-child(3n) {
        margin-right: 0;
      }

      text {
        font-size: 29rpx;
        color: #262626;
      }

      &.selected {
        background: #3C7BFB;

        text {
          color: #FFFFFF;
        }
      }
    }
  }
}

.bottom-nav {
  position: fixed;
  bottom: 0rpx;
  left: 0;
  width: 100%;
  height: 161.23rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1rpx solid #ccc;

  .zixun {
    width: 150rpx;
    height: 109rpx;
    background: #FFFFFF;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .shiyong {
    color: #fff;
    width: 283rpx;
    height: 87rpx;
    background: #F19D64;
    border-radius: 14rpx 14rpx 14rpx 14rpx;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buy {
    color: #fff;
    width: 283rpx;
    height: 87rpx;
    background: #497DF3;
    border-radius: 14rpx 14rpx 14rpx 14rpx;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.modal-button-group {
  display: flex;
  justify-content: space-between;
}

.modal-button {
  /* 你的按钮样式 */
}
</style>
