<template>
  <view>
    <view class="header">
      <image :src="item.detail?.cover" style="width:750rpx;height:422rpx;"></image>
    </view>
    <u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
    <u-gap height="1" bgColor="#f6f6f6"></u-gap>
    <view v-if="curNow===0">
      <view class="info">
        <text>{{ item.name }}</text>
        <view class="labels">
          <view class="label" v-for="(item,index) in item.detail?.labels" :key="index">
            <text>{{ item }}</text>
          </view>
        </view>
        <view class="footer">
          <view class="price">
            <view class="priceNow">
              <text>折后{{ item.detail?.min_price }}</text>
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
  </view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";
import {reactive, ref} from "vue";

const list = ref(['套餐', '介绍']);
const curNow = ref(0);

const sectionChange = (index) => {
  curNow.value = index;
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
    margin-left: 22rpx;
    margin-top: 18rpx;
    display: flex;

    .label {
      width: 123rpx;
      height: 33rpx;
      background: #3D7BFB;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      opacity: 0.16;
      display: flex; // 添加这一行
      justify-content: center; // 添加这一行
      align-items: center; // 添加这一行

      text {
        font-size: 21.74rpx;
      }

      &:not(:last-child) {
        margin-right: 18rpx; // 添加这一行
      }

      &:nth-child(3n+1) {
        background: #3D7BFB;
      }

      &:nth-child(3n+2) {
        background: #FF5756;
      }

      &:nth-child(3n+3) {
        background: #FF9957;
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
      border-radius: 7rpx;
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

</style>
