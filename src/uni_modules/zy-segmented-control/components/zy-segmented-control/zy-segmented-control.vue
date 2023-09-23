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
					<view :style="{borderColor:activeColor}" :class="{'zy_segmented_control_values_button_left_borderRadius':index==0,'zy_segmented_control_values_button_right_borderRadius':index==(values.length
				 	- 1),'zy_segmented_control_values_button_border':index!==(values.length- 1)}" v-else-if="styleType=='button'">
						<view
							:style="{backgroundColor:isvisited==index?activeColor:'#fff',color:isvisited==index?'#fff':activeColor}"
							class="zy_segmented_control_values_button_item" :class="{'zy_segmented_control_values_button_item_left_borderRadius':index==0,'zy_segmented_control_values_button_item_right_borderRadius':index==(values.length
				 	- 1)}">
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
	export default {
		emits: ['onClickItem'],
		props: {
			//选项数组
			values: {
				type: Array,
				default: ''
			},
			//当前选中的tab索引值，从0计数
			current: {
				type: Number,
				default: 0
			},
			//选中的标签背景色与边框颜色
			activeColor: {
				type: String,
				default: '#409efe'
			},
			//样式类型，text/button/inlineButton
			styleType: {
				type: String,
				default: 'text'
			},
		},
		data() {
			return {
				scrollLeft:0,
				isvisited: this.current, //当前选中的tab索引值
				topHeight: '', //slot距离顶部高度
			}
		},
		computed: {
			//动态获取数组个数分布宽度
			width: function() {
				if (this.values.length > 4) {
					return Number(25) + '%';
				} else {
					return Number(100) / this.values.length + '%';
				}
			},
		},
		mounted() {
			//app端获取分段器高度
			const query = uni.createSelectorQuery().in(this)
			query
				.select('#header')
				.boundingClientRect(data => {
					this.topHeight = data.height + 'px'
				})
				.exec();
		},
		methods: {
			// 组件触发点击事件时触发
			onClickItem(index) {
				this.isvisited = index;
				this.scrollLeft = 60 * index - 60
				this.$emit('onClickItem', this.isvisited)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
