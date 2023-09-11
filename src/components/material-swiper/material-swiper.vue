<template>
  <swiper class="material-swiper" :indicator-dots="true">
    <swiper-item v-for="(material, index) in materials" :key="index">
      <view class="material-content" @touchstart="handleTouchStart" @touchmove="handleTouchMove">
        <text>{{ material.label }}</text>
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
      translateY: 0
    };
  },
  methods: {
    handleTouchStart(event) {
      this.startY = event.touches[0].clientY;
    },
    handleTouchMove(event) {
      this.translateY = event.touches[0].clientY - this.startY;
      event.currentTarget.style.transform = `translateY(${this.translateY}px)`;
    },
    processAnalyseContent(item) {
      return item.replace(/\<img/gi, '<img style=max-width:100%;height:auto'); // 返回处理后的内容
    }
  }
}
</script>

<style>
.material-swiper {
  height: 200px; /* Adjust height as needed */
}

.material-content {
  background-color: #fff; /* Background color */
  padding: 10px; /* Padding */
  overflow-y: auto; /* Allow vertical scrolling */
}
</style>
