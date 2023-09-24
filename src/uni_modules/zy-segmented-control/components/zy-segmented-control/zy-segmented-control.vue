<template>
	<view class="zy_segmented_control_container">
		<view id="header" class="zy_segmented_control_values"
			:class="{'zy_segmented_control_values_text':styleType=='text','zy_segmented_control_values_button':styleType=='button','zy_segmented_control_values_inlineButton':styleType=='inlineButton'}">
			<scroll-view scroll-x scroll-with-animation :scroll-left="scrollLeft" class="zy_segmented_control_scroll">
				<view class="zy_segmented_control_values_item" v-for="(item,index) in values"
					@click="onClickItem(index)" :style="{width: width}">
					<!-- 分段器类型为text -->
					<view v-if="styleType=='text'">
						<view :style="{color:isvisited==index?activeColor:''}"
							class="zy_segmented_control_values_text_item">{{item}}</view>
						<!-- 选中的标签下标记线条颜色 -->
						<view :class="{'zy_segmented_control_values_text_border':isvisited==index}"
							:style="{backgroundColor:activeColor}">
						</view>
					</view>
					<!-- 分段器类型为button -->
          <view
                :class="{'zy_segmented_control_values_button_left_borderRadius':index==0,
               'zy_segmented_control_values_button_right_borderRadius':index==(values.length - 1),
               'zy_segmented_control_values_button_border':index!==(values.length- 1)}"
                v-else-if="styleType=='button'">
            <view
                :style="{fontSize: '29rpx',
                 color: isvisited==index ? '#3C7BFB' : '#000'}"
                class="zy_segmented_control_values_button_item"
                :class="{'zy_segmented_control_values_button_item_left_borderRadius':index==0,
                 'zy_segmented_control_values_button_item_right_borderRadius':index==(values.length - 1)}">
              {{item}}
            </view>
          </view>
					<!-- 分段器为内嵌button -->
					<view v-else-if="styleType=='inlineButton'">
						<view
							:style="{backgroundColor:isvisited==index?'#ffffff':'',color:isvisited==index?activeColor:''}"
							class="zy_segmented_control_values_inlineButton_item">
							{{item}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="zy_segmented_control_slot" :style="`height:${topHeight}`">
			<slot></slot>
		</view>
	</view>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
export default {
  emits: ['onClickItem'],
  props: {
    values: {
      type: Array,
      default: () => []
    },
    current: {
      type: Number,
      default: 0
    },
    activeColor: {
      type: String,
      default: '#3C7BFB'
    },
    styleType: {
      type: String,
      default: 'text'
    },
  },
  setup(props, { emit }) {
    const scrollLeft = ref(0);
    const isvisited = ref(props.current);
    const topHeight = ref('');

    const width = computed(() => {
      if (props.values.length > 4) {
        return '25%';
      } else {
        return `${100 / props.values.length}%`;
      }
    });

    onMounted(() => {
      const query = uni.createSelectorQuery();
      query
          .select('#header')
          .boundingClientRect(data => {
            if (data) {
              topHeight.value = `${data.height}px`;
            } else {
              console.warn("Unable to find element with id 'header'");
            }
          })
          .exec();
    });


    const onClickItem = (index) => {
      isvisited.value = index;
      scrollLeft.value = 60 * index - 60;
      emit('onClickItem', isvisited.value);
    }

    return {
      scrollLeft,
      isvisited,
      topHeight,
      width,
      onClickItem
    }
  }
}
</script>


<style lang="scss" scoped>
	@import './index.scss';
</style>
