<template>
  <view>
    <view class="header">
      <view class="title">
        <text>您的反馈是：</text>
      </view>
      <view class="radio-list">
        <radio-group :value="feedbackType" @change="updateFeedbackType" style="display: flex;
    justify-content: space-between;
    margin-left: 29rpx;
    margin-right: 29rpx;">
          <label class="radio-item">
            <radio value="BUG" color="blue" />
            <text>BUG</text>
          </label>
          <label class="radio-item">
            <radio value="建议" color="blue" />
            <text>建议</text>
          </label>
          <label class="radio-item">
            <radio value="其他" color="blue" />
            <text>其他</text>
          </label>
        </radio-group>

      </view>
    </view>

    <view class="body">
      <view class="title">
        <text>您的反馈是：</text>
      </view>
      <view class="tips">
        <up-input placeholder="您的反馈对我们非常重要，请详细填写您的问题和意见，以便我们更好的为您提供帮助。" v-model="tips" :border="false"></up-input>
      </view>
      <view class="add-image" @click="changeImage">
        <image src="../../../static/person/feedback.png" mode="widthFix"
          style="width: 163.04rpx; height: 163.04rpx;margin-bottom: 29rpx;" />
      </view>
    </view>

    <view class="contact-info">
      <view style="
font-size: 33rpx;
color: #333333;">
        <text>联系方式(选填)：</text>
      </view>
      <view><up-input placeholder="以便及时给您回复" v-model="phone_number" :border="false"></up-input></view>
    </view>

    <view class="bottom" @click="updateOnServer"><text>提交</text></view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
let phone_number = ref("")
let tips = ref("")
let feedbackType = ref("");
let images = []
const updateFeedbackType = (event) => {
  feedbackType.value = event.detail.value;
};

const changeImage = () => {
  uni.showActionSheet({
    itemList: ['拍照', '从相册选择'],
    success: (res) => {
      switch (res.tapIndex) {
        case 0:
          takePhoto();
          break;
        case 1:
          chooseFromAlbum();
          break;
      }
    },
    fail: (res) => {
      console.log('选择失败', res.errMsg);
    }
  });
};


const takePhoto = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['camera'],
    success: (res) => {
      const filePath = res.tempFilePaths[0];
      // 读取文件内容
      uni.getFileSystemManager().readFile({
        filePath: filePath,
        encoding: 'base64',
        success: (base64Data) => {

          images = [base64Data.data]
          // 此处可以处理图片，例如上传等操作

        },
        fail: (err) => {
          console.error('Error reading file:', err);
        }
      });
    },
    fail: (err) => {
      console.error('Error taking photo:', err);
    }
  });
};


const chooseFromAlbum = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['album'],
    success: (res) => {
      const filePath = res.tempFilePaths[0];
      // 读取文件内容
      uni.getFileSystemManager().readFile({
        filePath: filePath,
        encoding: 'base64',
        success: (base64Data) => {
          images = [base64Data.data]
          // 此处可以处理图片，例如上传等操作

        },
        fail: (err) => {
          console.error('Error reading file:', err);
        }
      });
    },
    fail: (err) => {
      console.error('Error choosing image:', err);
    }
  });
};

const updateOnServer = () => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/feedback/appFeedback',
    method: 'POST',
    data: {
      suggest: feedbackType.value,
      text: tips.value,
      images: images,
      contact: phone_number.value
    },
    header: { "Authorization": store.getters.getToken },
    success: (res) => {
      console.log(res.data)
      if (res.data.code === 0) {
        uni.showToast({ title: '反馈成功', icon: 'success' });
      } else {
        uni.showToast({ title: '反馈成功', icon: 'none' });
      }
    },
    fail: (err) => {
      console.error('Error updating gender:', err);
    }
  });
};
</script>

<style scoped lang="scss">
.header {
  width: 692rpx;
  height: 185rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-top: 29rpx;
  margin-left: 29rpx;

  .title {
    font-size: 33rpx;
    font-weight: bold;
    color: #333333;
    margin-left: 29rpx;
    margin-top: 36rpx;

    ::before {
      content: "";
      display: block;
      height: 15rpx;
    }
  }

  .radio-list {
    margin-top: 29rpx;

    .radio-item {
      display: flex;
      align-items: center;
      margin: 0 10rpx;

      text {
        margin-left: 5rpx;
      }
    }
  }
}

.body {
  width: 692rpx;
  height: 440rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-top: 29rpx;
  margin-left: 29rpx;

  .title {
    margin-left: 29rpx;

    ::before {
      content: "";
      display: block;
      height: 10rpx;
    }
  }

  .tips {
    margin-top: 22rpx;
    margin-left: 29rpx;
    margin-right: 36rpx;
    font-size: 29rpx;
    font-weight: 400;
    color: #999999;
  }

  .add-image {
    margin-top: 72rpx;
    margin-left: 29rpx;
    margin-bottom: 29rpx;
  }
}

.contact-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 692rpx;
  height: 103rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-top: 29rpx;
  margin-left: 29rpx;
}

.bottom {
  width: 692rpx;
  height: 87rpx;
  background: #3C7BFB;
  border-radius: 7rpx 7rpx 7rpx 7rpx;
  opacity: 1;
  margin-top: 108rpx;
  margin-left: 29rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
}
</style>