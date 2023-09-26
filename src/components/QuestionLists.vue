<template>
  <view class="header">
    <view class="breadcrumb">
      <text class="breadcrumb-item" v-for="(item, index) in breadcrumbItems" :key="index"
            :style="getBreadcrumbStyle(item.depth)">{{ item.name }}
      </text>
    </view>
  </view>
  <view class="container">
    <view v-for="(item,index) in currentQuestions" :key="index" class="question-item">
      <view class="question-content" @click="jumpQuestion(item)">
        <text class="question-name">{{ item.name }}</text>
        <view style="display: flex;align-items: center;">
          <view style="width: 318.84rpx;margin-right: 15rpx">
            <u-line-progress :percentage="30" :showText="false" activeColor="#3C7BFB" height="4.5"/>
          </view>
          <view class="done-info" style="font-size: 24.74rpx;color: #262626;">
            {{ item.done }}/{{ item.total }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {ref} from 'vue';

export default {
  props: {
    initialQuestions: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const currentQuestions = ref(props.initialQuestions);
    const jumpQuestion = (item) => {
      if (item.children && item.children.length > 0) {
        currentQuestions.value = item.children;
      } else {
        let param = item.chid;
        uni.navigateTo({
          url: '/pages/home/topic/question?param=' + param
        });
      }
    }

    return {
      currentQuestions,
      jumpQuestion
    }
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5; // 一个淡灰色背景
  height: 100vh;
}

.question-item {
  width: 90%; // 这将使内部view占据大多数空间，但留有一些边距
  background-color: #fff; // 白色背景
  border-radius: 10px; // 圆角
  margin-bottom: 10px; // 一些底部边距，以分隔各个项目
  padding: 15px; // 内部填充，使内容不紧贴边缘
  background-repeat: no-repeat;

  .question-content {
    display: flex;
    flex-direction: column;

    .question-name {
      font-size: 33rpx; // 第一个文本元素（问题名称）的字体较大
      color: #262626; // 深色文本
      margin-bottom: 5px; // 在两行文本之间添加一些空间
      overflow: hidden; // 隐藏超出容器的内容
      white-space: nowrap; // 阻止文本换行
      text-overflow: ellipsis; // 添加省略号以指示文本被截断
      max-width: 95%; // 限制最大宽度
    }

    .question-total {
      font-size: 25rpx; // 第二个文本元素（总卷数）的字体稍小
      color: #AEAEB2; // 浅色文本
    }
  }
}

.header .breadcrumb {
  display: flex;
  align-items: center;
  gap: 8rpx; // 为面包屑之间添加间隔
}

.breadcrumb-item:not(:last-child)::after {
  content: "/";
  margin: 0 8rpx;
}
</style>
