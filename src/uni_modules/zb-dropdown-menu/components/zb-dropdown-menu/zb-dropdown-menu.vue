<template>
  <view class="zb-dropdown-menu">
    <view class="zb-dropdown-menu__bar zb-dropdown-menu__bar--opened" :style="[barStyle]" ref="bar">
      <view class="zb-dropdown-menu__item" @click.stop="toggleItem(index, item)" :key="index"
        v-for="item, index in childrenList">
        <view class="zb-dropdown-menu__title" :class="[{
          'zb-dropdown-menu__title--active': item.showWrap,
          'zb-dropdown-menu__title--down': item.showWrap
        }]" :style="[{
  color: item.showWrap ? activeColor : '',
}, titleColorStyle]">{{ item.title }}</view>
      </view>
    </view>
    <view>
      <slot></slot>
    </view>
  </view>
</template>
<script>
export default {
  name: 'zb-dropdown-menu',
  options: {
    virtualHost: true
  },
  props: {
    zIndex: [Number, String],
    titleColorStyle: {
      type: Object,
      default: () => { }
    },
    activeColor: {
      type: String,
      default: '#ee0a24'
    }
  },
  provide() {
    return {
      parent: this
    }
  },
  computed: {
    opened() {
      return this.childrenList.some((item) => item.showWrap);
    },
    barStyle() {
      if (this.opened && this.isDef(this.zIndex)) {
        return {
          zIndex: 1 + this.zIndex,
        };
      }
    },
  },
  // watch:{
  //   childrenList:{
  //     handler(val){
  //       console.log('=====val====ss=',val)
  //     },
  //     immediate:true
  //   }
  // },
  data() {
    return {
      childrenList: [],
      direction: 'down',
      offset: 0,
      style: {
        top: 0
      },
      showMask: true,
      show: false,
      mask: false,
      mask1: false,
      showWrapper: false,
      showWrapper1: false,
      watchTimer: null,
      activeIndex: null,
    }
  },
  mounted() {
    this.updateOffset()
    // #ifdef APP || H5
    if (typeof window == 'object') window.addEventListener('click', this.close)
    // #endif
  },
  beforeDestroy() {
    this.watchTimer && clearTimeout(this.watchTimer)
    // #ifdef APP || H5
    if (typeof window == 'object') window.addEventListener('click', this.close)
    // #endif
  },
  methods: {
    isDef(val) {
      return val !== undefined && val !== null;
    },
    close() {
      if (this.activeIndex == null) return
      if (this.childrenList && this.childrenList.length) {
        let obj = this.childrenList.find(item => {
          return item.showWrap
        })
        if (obj) {
          this.changeStatus(obj, 'mask', 'showWrap', false)
        }
      }
    },
    change(param1, param2, status) {
      this[param1] = status
      this.watchTimer && clearTimeout(this.watchTimer)
      this.watchTimer = setTimeout(() => {
        this[param2] = status
        this.$emit('change', status)

      }, status ? 5 : 200)
    },
    closeMask(ite, index) {
      for (let i = 0; i < this.childrenList.length; i++) {
        let item = this.childrenList[i]
        if (i === index) {
          if (!item.showWrap) {
            this.changeStatus(item, 'showWrap', 'mask', true)
          } else {
            this.changeStatus(item, 'mask', 'showWrap', false)
          }
        } else {
          this.$set(item, 'mask', false)
          this.$set(item, 'showWrap', false)
        }
      }
    },
    changeStatus(item, param1, param2, status) {
      // this.$set(item,param1,status)
      item[param1] = status
      this.watchTimer && clearTimeout(this.watchTimer)
      this.watchTimer = setTimeout(() => {
        // item[param2] = status
        this.$set(item, param2, status)
      }, status ? 20 : 200)
    },
    toggleItem(index) {
      for (let i = 0; i < this.childrenList.length; i++) {
        let item = this.childrenList[i]
        if (i === index) {
          if (!item.showWrap) {
            this.changeStatus(item, 'showWrap', 'mask', true)
          } else {
            this.changeStatus(item, 'mask', 'showWrap', false)
          }
        } else {
          item.mask = false
          item.showWrap = false
        }
      }
      // console.log('=======',this.childrenList)
      this.activeIndex = index
      this.updateOffset()
      this.$emit('toggleItem')
    },
    updateOffset() {
      let query = uni.createSelectorQuery().in(this);
      query.select('.zb-dropdown-menu__bar').boundingClientRect(res => {
        if (this.direction === 'down') {
          this.offset = res.height + uni.getSystemInfoSync().windowTop + res.top;
          this.style.top = `${this.offset}px`;

        } else {
          this.offset = uni.getSystemInfoSync().screenHeight - res.top;
        }
      }).exec();
    },
  }
}
</script>

<style lang="scss" scoped>
.zb-dropdown-item {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 10;
  overflow: hidden;
}

.zb-dropdown-menu {
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
}

.zb-popup {

  &-slide-top-leave-active,
  &-slide-left-leave-active,
  &-slide-right-leave-active,
  &-slide-bottom-leave-active {
    transition-timing-function: ease-in;
  }
}

.zb-popup-slide-top-enter,
.zb-popup-slide-top-leave-active {
  transform: translate3d(0, -100%, 0);
}

.zb-popup-slide-right-enter,
.zb-popup-slide-right-leave-active {
  transform: translate3d(100%, -50%, 0);
}

.zb-popup-slide-bottom-enter,
.zb-popup-slide-bottom-leave-active {
  transform: translate3d(0, 100%, 0);
}

.zb-dropdown-menu__bar {
  position: relative;
  display: flex;
  height: 48px;
  background-color: #fff;
  box-shadow: 0 2px 12px #6465661f;
}

.zb-dropdown-menu__item {
  display: flex;
  flex: 1;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  min-width: 0;
  //cursor: pointer;
}

.zb-dropdown-menu__title {
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0 8px;
  color: #323233;
  font-size: 15px;
  line-height: 22px;
}

.zb-dropdown-menu__title::after {
  // position: absolute;
  // top: 50%;
  // right: -4px;
  // margin-top: -5px;
  // border: 3px solid;
  // border-color: transparent transparent #dcdee0 #dcdee0;
  // -webkit-transform: rotate(-45deg);
  // transform: rotate(-45deg);
  // opacity: 0.8;
  // content: '';
  position: absolute;
  top: 34%;
  right: -28rpx;
  margin-top: -11rpx;
  width: 34.42rpx; // 根据你的图片大小调整
  height: 30.8rpx; // 根据你的图片大小调整
  content: '';
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAzCAYAAAAtg6DjAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAOaADAAQAAAABAAAAMwAAAAD9IZIBAAAEVklEQVRoBe2ay0tUURzH56nptAjM99IWEkE+BqEWqeWzTasoiDZRbcKFy/oDWkc7K1oFIbUIpFXQKgIXjZOPsDA1xccoQpCW+Jo+38ErM3PvjM/ozDAHDvfec8+58/v8vuecOff8rtdlcKqrq7tRUVHRR47Ozc31H9RU70Eb/ut2tbW11z0eT4/b7S7htxrLy8sXAA0d5HeNhASwC8DHAB6PRqMujn6uW8rKymYADe8X1DhIAIMA9QJWIMC45KesHdB9K+qJe4gRp4CskVeTjREwuYB7j3DEreT76a6NU5LuGEGtcYxuBqgw2XjK1HXbSktLp+bn5weT7ztdGwcpIwEdKSkpGQOmA6hjyYYLlNzBZLSnMWokpKAikcgoiv4AtBWg/GRQrgXaSp3p3RQ1FlJQGD/Mf+QMY7EZICdF83BCO4pOov6QgyNiRUZDysLZ2dlBxt80kG1km6KU+anWSfeeQn3HMWo8pEBRdKiysnKGU3XdPJUlJb/X621F9UmcMpx0z5URkDIa4z+jaITu2ZxC0Xy6tSajMU1c8aAZAymjUXSAiWaC00ZyQGXxaVvlTtXReLbuuevr609ubW2dpYKPnLDEsCqZdETJrc3Nzdscr2mBkCL9pM7dcDj8SvfdwWDwI5VrOPeRU7ZSZUOSbNwk2xYKln2IpdXRMqA3AX0jyBhYGq9YbTPquA06g+LnfNkGZykhLkArUTNo3ALdMvKojhrDGocuTo7qmcY8R911Y2Pjvc/n+6Du2sPset4Y647AEABXYRpcX19/GAqFlnxVVVX3xsfHtcWQNWl5eXltdHR0KWuAciA5D+Q8kPNAzgM5D+Q8cDgPuOObV1dXFwUCAac9lPhqGXPO0m5jYGBgMQZJiOwUlj9goX6Gtaxt6y9jqOyGrgP6zt3Q0FDEO9drdruasvHdEkiXj9eRCyjYBKjdD1lS4uG1JBP2dQ7lbr0t99NNv+olMxuTuGJkNTU1VxiTLyiIRXbTwP7mnvZqM8UjsnNkx1hArwL6hMITZFuSRxjEvdR5xjEj9kvooZjtHtuBFNX2xwhP0yi6SMMuthR6bV4wuCAhTKCtdWIJ37H3MqC2RQFlAbKivAvasjeYK8G0BEjdUbCECNIEp21kp1BZPn85lxQ3VBBGbUxPNkgZrPBXcXHxNDAKZyv+l5CkMt1Wn5xMxgdWEioZdOEIKfsU0FS8D6DOFKD5lF+kznS6KK8JrCkhZZyMt6K8XDqNUX1y0qpxTN0vJgA52ZAWUg3ojoNAzALTnkpRqrUQzv6mjxmcfuR/l+0KKQNRKayvLNKM0QJNRtvBT+MU3ROkQFFU4ew5dU8unSajQjkB1d/ilAW1MSXta+XCC+hzZtVuQP+QbQxaYZi4GtqzkhYRKn1iRpWi7ZTFomICBnCFfB9H9Fl1TTnuG1KG8z+qDxTUJVsA9AP3CwXvSGlTwOLtOBCkHoCiIcbfCqenyd2sZ1+q3MT0F1URqp+zYIIEAAAAAElFTkSuQmCC');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.zb-dropdown-menu__title--down::after {
  // margin-top: -1px;
  // -webkit-transform: rotate(135deg);
  // transform: rotate(135deg);
}

.zb-dropdown-menu__title--active::after {
  border-color: transparent transparent currentColor currentColor;
}

.zb-dropdown-menu__bar--opened {
  z-index: 11;
}

.zb-dropdown-menu__title--active {
  color: #ee0a24;
}

.zb-dropdown-item--down {
  bottom: 0;
}

.zb-overlay {
  z-index: 2003;
  position: absolute;
  animation-duration: 0.2s;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.3s;
}

.mask__visible {
  opacity: 1;
}

.zb-popup {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  background-color: #fff;
  -webkit-transition: -webkit-transform 0.2s;
  transition: -webkit-transform 0.2s;
  transition: transform 0.2s;
  transition: transform 0.2s, -webkit-transform 0.2s;
  -webkit-overflow-scrolling: touch;
}

.zb-dropdown-item__content {
  position: absolute;
  max-height: 80%;
  transition-duration: 0.2s;
  z-index: 2006;
}

.zb-popup--top {
  top: 0;
  left: 0;
  width: 100%;
}

.content--visible_Y {
  transform: translateY(0px);
}


@keyframes zb-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes zb-fade-out {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.zb-fade {
  &-enter-active {
    animation: 0.2s zb-fade-in both ease-out;
  }

  &-leave-active {
    animation: 0.2s zb-fade-out both ease-in;
  }
}


.zb-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  align-items: center;
  line-height: 24px;
  background-color: #fff;
}

.zb-cell::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.zb-cell--clickable {
  //cursor: pointer;
}


@font-face {
  font-family: "iconfont";
  /* Project id 3711565 */
  src:
    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAJ0AAsAAAAABiwAAAIqAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACCcAooRgE2AiQDCAsGAAQgBYRnBzAbggXIrrApw71IoCYMFA7zwg8FpwSIh//2a/fNnxXFNKlm0SyaaJYoYSsJQqJ0UrcOmUPc/Z+2G0vd+VMRqtMdYw3bmbT7/5emDL2VRVgUDiFxWIyiVpkbW96eX2X9dryc+m6f/lTOAgrwA7GsfRdK96BF0/qBWi9QALuHtVTCXs+LXIXhVQe5E88I1G1Y1TvePb7uTJ8CqTtzA/Z4kDXHU5YEnYmUlmVaqwpldG8Wr0qk5xQv0efj11ZMSEoFu+3scSfufJ2zoOh0OxQfOvP10McSSiiwoiMTV93lE33RxPfVg4Ep2pkFP7rdwBe79oT419mNTTBJK8EPb6kACW6LNtwY9SBRvqOrm+TinWt8/sfn7NN08ZbovwqOnx96s+2/aiOD7zxyMyxKdbUg+AfGLUjMRoaUmwRpNCnvVq07ObrseL/fsfbAueqhamBEtGIiQ6FqisrcEkoatlBWtYO6ZTuHGwZofZFrmPNEEHp9IGl7R6HXN5W5H5QM+0NZr3/U3UTrvIa5iLYYA8EYwkfIIlWTa0kU9hKTtgy4rnCL3GQ0B7ZhlWt7WCNPsaG5SxwRAmJVwa7wGJalAs0qx0iMVEQvTJOa3mJEqupsYSggUAyEHoFMRKlRQJbi911CiVYpwCB1W2aNjIYHNoMFUHt6DQ3cySuNOwmHEAQQplTArjQLlUoK0M2zcigiDOmIorZgOiRCdWN9s/q0E1BnOymcaYXyfZulgep0AA==') format('woff2')
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-duihao:before {
  content: "\eaf1";
}

.zb-cell__title,
.zb-cell__value {
  flex: 1;
}

.zb-cell__value {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
