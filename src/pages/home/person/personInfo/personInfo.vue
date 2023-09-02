<template>
  <view class="background">
    <view>
      <u-list class="uview-page">
        <u-list-item>
          <u-cell
              title="头像"
              :isLink="true"
              @click="changeAvatar"
              size="large"
          >
            <template #value>
              <u-avatar
                  shape="square"
                  size="35"
                  text="sfg"
              ></u-avatar>
            </template>
          </u-cell>
        </u-list-item>
        <u-list-item>
          <u-cell
              title="用户名"
              :isLink="true"
              @click="navigateToProfile('username')"
              size="large"
          >
            <template #value>
              <text>Shinn</text>
            </template>
          </u-cell>
        </u-list-item>
        <u-list-item>
          <u-cell
              title="性别"
              :isLink="true"
              @click="navigateToProfile('gender')"
              size="large"
          >
            <template #value>
              <text>保密</text>
            </template>
          </u-cell>
        </u-list-item>
        <u-list-item>
          <u-cell
              title="修改密码"
              :isLink="true"
              @click="navigateToProfile('password')"
              size="large"
          >
          </u-cell>
        </u-list-item>
      </u-list>

    </view>
  </view>
</template>

<script setup>
import {ref} from 'vue';

const avatarUrl = ref('../../../../static/logo.png');
const username = ref('ChatGPT');
const gender = ref('男');

const changeGender = () => {
  uni.showActionSheet({
    itemList: ['男', '女', '保密'],
    success: (res) => {
      switch (res.tapIndex) {
        case 0:
          gender.value = '男';
          break;
        case 1:
          gender.value = '女';
          break;
        case 2:
          gender.value = '保密';
          break;
      }
      // 如果你需要将修改的性别保存到后端，你可以在这里发起请求。
      // 例如：updateGenderOnServer(gender.value);
    },
    fail: (res) => {
      console.log('选择失败', res.errMsg);
    }
  });
};

const changeAvatar = () => {
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

const navigateToProfile = (section) => {
  switch (section) {
    case 'username':
      uni.navigateTo({url: '/pages/home/person/editUsername/editUsername'});
      break;
    case 'gender':
      changeGender();  // 调用性别修改方法
      break;
    case 'password':
      uni.navigateTo({url: '/pages/changePassword/changePassword'});
  }
};

// 如果你需要与后端交互，可以添加类似以下的函数：
// const updateGenderOnServer = (newGender) => {
//   uni.request({
//     url: 'YOUR_API_ENDPOINT',
//     method: 'POST',
//     data: {
//       gender: newGender
//     },
//     success: (res) => {
//       if (res.data.success) {
//         uni.showToast({ title: '性别更新成功', icon: 'success' });
//       } else {
//         uni.showToast({ title: '性别更新失败', icon: 'none' });
//       }
//     },
//     fail: (err) => {
//       console.error('Error updating gender:', err);
//     }
//   });
// };

const showPopup = ref(false);

const openPopup = () => {
  showPopup.value = true;
};

const closePopup = () => {
  showPopup.value = false;
};

const takePhoto = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['camera'],
    success: (res) => {
      console.log(res);
      // 此处可以处理图片，例如上传等操作
      closePopup();
    }
  });
};

const chooseFromAlbum = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['album'],
    success: (res) => {
      console.log(res);
      // 此处可以处理图片，例如上传等操作
      closePopup();
    }
  });
};
</script>

<style scoped>
.avatar {
  width: 50rpx;
  height: 50rpx;
  border-radius: 25rpx;
}

/* 设置整个页面的背景色 */
::v-deep .uview-page {
  height: 100%; /* 确保整个页面都有背景色 */
  margin-top: 10px !important;
  background-color: white !important;
}

.popup-content {
  background-color: #fff;
  padding: 20rpx 0;
}

.popup-content view {
  padding: 20rpx;
  text-align: center;
  border-bottom: 1px solid #ebebeb;
}

.popup-content view:last-child {
  border-bottom: none;
}


</style>
