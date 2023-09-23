## zySegmented 分段器

## zySegmented 分段器属性
|序号	|参数		|说明							|类型	|可选值						|默认值	|是否必须	|
|---	| ---		| ---							| ---	| ---						| ---	| ---		|
|1		|values		|选项数组						|Array	| ---						| ---	|√			|
|2		|current	|当前选中的tab索引值，从0计数	    |Number	| ---						|0		|√			|
|3		|activeColor|选中的标签背景色与边框颜色		|String	| ---						|#409efe|√			|
|4		|styleType	|样式类型						|String	|text/button/inlineButton	|text	|√			|

## zySegmented 分段器事件
|序号	|参数		|说明							|类型		|传值			|
|---	| ---		| ---							| ---		| ---			|
|1		|onClickItem|用于点击分段器，切换选中状态	|Function	|(current)=>{}	|

## zyTable 使用方式
```
<template>
	<view class="container">
		<!-- 基础模式 -->
		<view class="text">基础模式</view>
		<zySegmented :values="items"></zySegmented>
		<!-- 按钮模式 -->
		<view class="text">按钮模式</view>
		<zySegmented :values="items" styleType='button'></zySegmented>
		<!-- 内嵌按钮模式 -->
		<view class="text">内嵌按钮模式</view>
		<zySegmented :values="items" styleType='inlineButton'></zySegmented>
		<!-- 更换主题 -->
		<view class="text">更换主题</view>
		<zySegmented :values="items" activeColor='#ff0000'></zySegmented>
		<!-- 自定义初始位置 -->
		<view class="text">自定义初始位置</view>
		<zySegmented :values="items" :current="current" @onClickItem="onClickItem"></zySegmented>
	</view>
</template>

<script>
	import zySegmented from "@/uni_modules/zy-segmented-control/components/zy-segmented-control/zy-segmented-control.vue"
	export default {
		components: {
			zySegmented
		},
		data() {
			return {
				items: ['分段器1', '分段器2', '分段器3'], //分段器名称
				current: 1, //分段器默认初始值
			}
		},
		methods: {
			// 分段器选项发生改变时触发
			onClickItem(e) {
				this.current = e
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 白色 */
	$zy-classic-white: #ffffff;

	/* 灰色 */
	$zy-classic-grey: #999999;

	.container {
		width: 100%;
		background-color: $zy-classic-white;
	}

	.text {
		padding: 20rpx;
		font-size: 26rpx;
		color: $zy-classic-grey;
	}
</style>

```
#### 如使用过程中有任何问题，或者您有一些好的建议，欢迎联系QQ：2360273432 
