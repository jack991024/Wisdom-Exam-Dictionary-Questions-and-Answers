<template>
  <view class="content">
    <uv-vtabs
        :chain="chain"
        :list="list"
        :barItemBadgeStyle="{right:'20px',top:'12px'}"
        @change="change"
        @scrolltolower="scrolltolower">
      <uv-vtabs-item>
        <view
            class="item"
            v-for="(item2,index2) in list2"
            :key="index2">
          <view class="item-title">
            <text class="text">{{item2.name}}</text>
          </view>
          <view class="item-content">
            <text class="text">{{item2.desc}}</text>
          </view>
        </view>
      </uv-vtabs-item>
    </uv-vtabs>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const getList = [{
  name: 'uv-ui简介'
}, {
  name: 'uv-ui特点',
  childrens: [{
    name: '全端兼容',
    desc: 'uv-ui支持App（vue）、App（nvue）、H5、小程序、VUE2、VUE3，支持nvue原生渲染。uv-ui的组件都是多端自适应的，底层会抹平很多小程序平台的差异或bug。'
  }, {
    name: '集成工具',
    desc: 'uv-ui中的uv-ui-tools组件集成了强大的网络请求 HTTP 及常用的工具函数，无需自己再去寻找，并且直接挂载在uni上面，方便使用，只需要在mian.js中引入即可，更多工具请参考：https://www.uvui.cn/js/http.html。使用方式请参考：https://www.uvui.cn/components/setting.html。'
  }, {
    name: '主题扩展',
    desc: 'uv-ui中的uv-ui-tools组件下面的theme.scss为主题文件，直接在uni.scss中引入主题即可，可以根据自己的需求进行扩展。下面也有说明具体使用方式。使用方法请参考：https://www.uvui.cn/components/setting.html'
  }]
}, {
  name: '更新日志',
  badge: {
    isDot: true
  },
  childrens: [{
    name: '更新日志',
    desc: 'uv-ui的重大更新在更新日志中都有所说明，如果在开发的过程中遇到文档不完善，可以提供给我们，我们会持续完善，非常感谢大家的支持。更新日志：https://www.uvui.cn/components/changelog.html'
  }]
}, {
  name: '设计规范',
  childrens: [{
    name: '设计规范',
    desc: '为了约束合成更多优秀的组件和模板，打造优质的体验，我们拟定了一些UI界面设计和建议。同时部分之间会有依赖，这是为了减少代码冗余的同时提高开发效率，模块化是我们的基础。如果大家有好的建议，可以提出进行改进。'
  }]
}, {
  name: '交流反馈',
  childrens: [{
    name: '交流反馈',
    desc: 'uv-ui为采用MIT许可证的开源项目，使用完全免费。欢迎加QQ群交流反馈，一起学习，共同进步。QQ群： 549833913'
  }]
}];

const list = ref([]);
const chain = ref(false);
const value = ref(0);

const list2 = computed(() => {
  const _list = list.value[value.value]?.childrens;
  return _list ? _list : [];
});

const change = (index) => {
  console.log('选项改变：', index);
  value.value = index;
};

const scrolltolower = (index) => {
  console.log('内容滚动到底部触发：', index);
};

onMounted(() => {
  uni.showLoading({
    title: '加载中'
  });
  setTimeout(() => {
    list.value = getList;
    uni.hideLoading();
  }, 200);
});
</script>

<style scoped lang="scss">
.header {
  padding: 30rpx;
  font-size: 30rpx;
  color: #333;
}
.item {
  padding: 10rpx 20rpx;
  &-title {
    .text {
      font-weight: 700;
      font-size: 32rpx;
      color: #111;
    }
  }
  &-content {
    padding: 20rpx 0;
    .text {
      line-height: 48rpx;
      font-size: 30rpx;
      color: #111;
      /* #ifndef APP-NVUE */
      word-break: break-all;
      /* #endif */
    }
  }
}
.gap {
  padding: 0 30rpx;
}
</style>
