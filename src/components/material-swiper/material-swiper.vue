<template>
  <swiper class="material-swiper" :indicator-dots="false">
    <swiper-item v-for="(material, index) in materials" :key="index" style="overflow: auto">
      <view class="material-content"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            :style="{ height: componentHeight + 'px' }"> <!-- 使用v-bind来动态更改高度 -->
        <text class="label">{{ material.label }}</text>
        <rich-text :nodes="processAnalyseContent(material.content)"></rich-text>
      </view>
    </swiper-item>
  </swiper>
</template>


<script>
export default {
  props: {
    materials: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      startY: 0,
      currentY: 0,
      componentHeight: 200, // 新增一个变量来存储组件的高度
      maxComponentHeight: 500, // 新增一个变量来存储组件的最大高度
    };
  },
  methods: {
    handleTouchStart(event) {
      this.startY = event.touches[0].clientY;
      this.currentY = this.componentHeight; // Store the current height as the initial state for the new touch
    },
    handleTouchMove(event) {
      if (event.currentTarget) {
        let newHeight = this.currentY - (event.touches[0].clientY - this.startY);
        if (newHeight < 100) {
          newHeight = 100;
        } else if (newHeight > this.maxComponentHeight) {
          newHeight = this.maxComponentHeight;
        }
        this.componentHeight = newHeight; // 更新高度
      }
    },

    processAnalyseContent(item) {
      return item.replace(/\<img/gi, '<img style=max-width:100%;height:auto'); // 返回处理后的内容
    }
  }
}
</script>

<style lang="scss">
.material-swiper {
  height: 200px; /* 设置为auto，以允许动态更改 */
}

.material-content {
  background-color: #fff; /* 背景色 */
  padding: 10px; /* 内边距 */
  overflow-y: auto; /* 允许垂直滚动 */
  display: flex; /* 设置为弹性布局 */
  flex-direction: column; /* 设置弹性方向为列 */
  align-items: center; /* 水平居中对齐 */
  height: 200px; /* 设置初始高度为200px，稍后我们将使用v-bind动态更改它 */

  .label {
    background-color: #2e68f5; /* Background color of the label */
    border-radius: 12px; /* Rounded corners */
    padding: 8px 16px; /* Padding inside the label */
    font-size: 16px; /* Font size */
    color: #fff; /* Text color */
  }
}
</style>

