<template>
    <view class="header">
        <view class="title">
            <text>{{ summary?.summary.filename }}</text>
        </view>
        <view class="detail" :class="{ expanded: isDetailExpanded }">
            <text>{{ summary?.summary.summary_text }}</text>
        </view>
        <view class="detail-button" @click="toggleDetail">
            <text>{{ isDetailExpanded ? '收起' : '展开' }}</text>
        </view>
        <view class="footer">
            <view><text>{{ summary?.summary.page_num }}页</text></view>
            <view><text>{{ summary?.summary.download_num }}下载</text></view>
            <view><text>{{ size(summary?.summary.size) }}MB</text></view>
        </view>
    </view>

    <view class="gap">
    </view>

    <view class="review">
        <view class="title">
            <text style="font-size: 36rpx;
    font-weight: bold;
    color: #262626;
    margin-right: 195rpx;">文件预览</text>
            <text style="font-size: 29rpx;
    color: #898989;">共计{{ summary?.summary.page_num }}页，预览仅显示前4页</text>
        </view>

        <view>
            <view class="summary_images">
                <view v-for="(item, index) in summary?.summary.summary_images" :key="index">
                    <image :src="item" mode="widthFix" style="margin-left: 75rpx;" />
                </view>
            </view>
        </view>
    </view>
    <view class="gap"></view>
    <view class="recommend">
        <view class="title">
            <text style="font-size: 36rpx;
    font-weight: bold;
    color: #262626;
    margin-right: 195rpx;">其他文档</text>
        </view>

        <view>
            <view class="item" v-for="(item2, index2) in summary?.recommend" :key="index2" @click="navi(item2)">
                <view class="item-body">
                    <view class="image">
                        <image src="./static/freeMaterials/pdf.png" mode="widthFix"
                            style="width: 38.04rpx;height: 43.48rpx;margin-top: 20rpx;margin-left: 29rpx;"></image>
                    </view>
                    <view class="right">
                        <view class="title">
                            <text>{{ item2.filename }}</text>
                        </view>
                        <view class="bottom">
                            <view class="download-num">
                                {{ item2.download_num }}下载
                            </view>
                            <view class="page-num">
                                {{ item2.page_num }}页
                            </view>
                            <view class="size">
                                {{ size(item2.size) }}
                            </view>
                        </view>
                    </view>
                </view>

            </view>
        </view>
    </view>

    <view class="bottom-nav">
        <view class="share">
            <text>分享文档</text>
        </view>
        <view class="download" @click="download(summary?.summary.fid)">
            <text>下载文档</text>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import { useStore } from 'vuex';

const store = useStore()

const isDetailExpanded = ref(false); // 初始状态为未展开

const toggleDetail = () => {
    isDetailExpanded.value = !isDetailExpanded.value; // 切换展开/折叠状态
};

const summary = ref(null)
onLoad((options) => {
    let fid = options.fid

    uni.request({
        url: 'https://dev.zhikaodian.com/apiV2/resource/reader',
        method: "POST",
        header: {
            "Authorization": store.getters.getToken
        },
        data: {
            fid: fid
        },
        success: (res) => {
            console.log(res.data)
            summary.value = res.data.data
        },
        error: (error) => { }
    })
})

const size = (size) => {
    return (size / 1024 / 1024).toFixed(2) + ' MB';
};

const navi = (item2) => {
    uni.navigateTo({ url: '/pages/home/topic/FreeMaterialsItem?fid=' + item2.fid })
}

const download = (fid) => {
    console.log(fid)
    uni.request({
        url: 'https://dev.zhikaodian.com/apiV2/resource/download',
        method: 'POST',
        header: {
            "Authorization": store.getters.getToken
        },
        data: {
            fid: fid
        },
        success: (res) => {
            if (res.data.data.url != null && res.data.data.url != '') {
                uni.navigateTo({
                    url: '/pages/home/topic/review-file?url=' + res.data.data.url
                })
            } else {
                uni.showToast({
                    title: '下载失败',
                    icon: 'error',
                    duration: 2000
                })
            }
        },
        error: (err) => { }
    })
}
</script>

<style scoped lang="scss">
.header {
    width: 750rpx;

    .title {
        width: 538rpx;
        height: 51rpx;
        font-size: 30rpx;
        font-weight: bold;
        color: #262626;
        margin: 29rpx;
        margin-bottom: 60rpx;
    }

    .detail {
        margin-top: 22rpx;
        margin-left: 29rpx;
        margin-right: 32rpx;
        max-height: 3em; // 限制最大高度以只显示部分内容
        overflow: hidden; // 隐藏超出部分

        &.expanded {
            max-height: none; // 移除高度限制以显示全部内容
        }
    }

    .detail-button {
        margin-top: 7.25rpx;
        margin-left: 660rpx;
        width: 58rpx;
        height: 40rpx;
        color: #3D7BFB;
        font-weight: 400;
    }

    .footer {
        margin: 29rpx;
        color: #898989;
        display: flex;

        view {
            margin-right: 22rpx;

            &:last-child {
                margin-right: 0; // 移除最后一个元素的右边距，避免额外的空间
            }
        }
    }
}

.gap {
    background-color: #F5F6F8;
    width: 750rpx;
    height: 22rpx;
}

.review {
    width: 750rpx;

    .title {
        padding: 29rpx;
        border-bottom: 1px #E0E0E0 solid;
    }
}

.recommend {
    .item {
        padding: 10rpx 20rpx;
        overflow-y: auto;

        .item-body {
            height: 135rpx;
            display: flex;
            flex-direction: row;
            align-items: center; // 使子元素垂直居中

            .image {
                margin-right: 20rpx; // 添加一些间距在图片和右侧内容之间
            }

            .right {
                flex-grow: 1; // 使.right元素占用剩余的空间
                display: flex;
                flex-direction: column; // 使.title和.bottom垂直排列

                .title {
                    text-align: left;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    font-size: 29rpx;
                }

                .bottom {
                    display: flex;
                    flex-direction: row; // 使.bottom的子元素水平排列
                    justify-content: space-between; // 使子元素平分空间

                    .download-num,
                    .page-num,
                    .size {
                        text-align: center; // 使文本居中
                        font-size: 18rpx;
                        color: #898989;
                        margin-top: 18rpx;
                    }
                }
            }
        }

        .gap {
            height: 2rpx;
            border-top: 2rpx solid #E5E5E5; // 使用border-top来创建一个顶部边框
        }
    }
}

.bottom-nav {
    width: 750rpx;
    height: 159rpx;
    background: #FFFFFF;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    opacity: 1;
    position: fixed;
    bottom: 0;
    display: flex;

    .share {
        width: 333rpx;
        height: 87rpx;
        background: #FF9957;
        border-radius: 14rpx 14rpx 14rpx 14rpx;
        opacity: 1;
        display: flex;
        margin: 29rpx;
        color: #FFF;
        justify-content: center;
        align-items: center;
    }

    .download {
        width: 333rpx;
        height: 87rpx;
        background: #3C7BFB;
        border-radius: 14rpx 14rpx 14rpx 14rpx;
        opacity: 1;
        display: flex;
        margin: 29rpx;
        color: #FFF;
        justify-content: center;
        align-items: center;
    }
}
</style>