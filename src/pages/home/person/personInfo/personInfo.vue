<template>
  <view class="background">
    <view>
      <u-list class="uview-page">
        <u-list-item>
          <u-cell title="头像" :isLink="true" @click="changeAvatar" customHeight="185rpx" size="large">
            <template #value>
              <up-avatar size="50" :src="userInfo.avatar"></up-avatar>
            </template>
          </u-cell>
        </u-list-item>
        <u-list-item>
          <u-cell title="用户名" :isLink="true" @click="navigateToProfile('username')" size="large" customHeight="127rpx">
            <template #value>
              <text>{{ userInfo.username }}</text>
            </template>
          </u-cell>
        </u-list-item>
        <u-list-item>
          <u-cell title="性别" :isLink="true" @click="navigateToProfile('gender')" size="large" customHeight="127rpx">
            <template #value>
              <text>{{ userInfo.gender }}</text>
            </template>
          </u-cell>
        </u-list-item>
        <u-list-item>
          <u-cell title="修改密码" :isLink="true" @click="navigateToProfile('password')" size="large" customHeight="127rpx">
          </u-cell>
        </u-list-item>
        <u-list-item>
          <u-cell title="其他登录方式" :isLink="true" @click="navigateToProfile('other-login')" size="large"
            customHeight="127rpx" :border="false">
          </u-cell>
        </u-list-item>
      </u-list>

    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
let data = {}
const avatarUrl = ref('../../../../static/logo.png');
const username = ref('ChatGPT');
const gender = ref('男');
const userInfo = reactive(uni.getStorageSync("userInfo"));
// 监听全局事件
uni.$on('usernameUpdated', (updatedUsername) => {
  userInfo.username = updatedUsername;
});

const changeGender = () => {
  uni.showActionSheet({
    itemList: ['男', '女', '保密'],
    success: (res) => {
      switch (res.tapIndex) {
        case 0:
          userInfo.gender = '男';
          break;
        case 1:
          userInfo.gender = '女';
          break;
        case 2:
          userInfo.gender = '保密';
          break;
      }
      data = { gender: userInfo.gender }
      updateUserInfoOnServer()
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
      uni.redirectTo({ url: '/pages/home/person/editUsername/editUsername' });
      break;
    case 'gender':
      changeGender();  // 调用性别修改方法
      break;
    case 'password':
      uni.navigateTo({ url: '/pages/home/person/personInfo/modify-password' });
    case 'other-login':
      uni.navigateTo({ url: '/pages/home/person/personInfo/other-login' })
      break;
  }
};

const updateUserInfoOnServer = () => {
  uni.request({
    url: 'https://dev.zhikaodian.com/apiV2/user/edit',
    method: 'POST',
    data: data,
    header: { "Authorization": store.getters.getToken },
    success: (res) => {
      console.log(res.data)
      if (res.data.code === 0) {
        uni.showToast({ title: '更新成功', icon: 'success' });
      } else {
        uni.showToast({ title: '更新失败', icon: 'none' });
      }
    },
    fail: (err) => {
      console.error('Error updating gender:', err);
    }
  });
};

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
      const filePath = res.tempFilePaths[0];
      // 读取文件内容
      uni.getFileSystemManager().readFile({
        filePath: filePath,
        encoding: 'base64',
        success: (base64Data) => {
          const prefix = getBase64Prefix(filePath);
          userInfo.avatar = (prefix + base64Data.data);
          data = {
            avatar_base64: base64Data.data
          }
          updateUserInfoOnServer()
          // 此处可以处理图片，例如上传等操作
          closePopup();
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
          const prefix = getBase64Prefix(filePath);
          userInfo.avatar = (prefix + base64Data.data);
          data = {
            avatar_base64: base64Data.data
          }
          updateUserInfoOnServer()
          // 此处可以处理图片，例如上传等操作
          closePopup();
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

function getBase64Prefix(filePath) {
  const ext = filePath.split('.').pop().toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'data:image/jpeg;base64,';
    case 'png':
      return 'data:image/png;base64,';
    case 'gif':
      return 'data:image/gif;base64,';
    // ... 其他文件格式
    default:
      return 'data:image/png;base64,'; // 默认为PNG
  }
}


</script>

<style scoped>
.background {
  width: 692rpx;
  height: 522rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 0rpx 11rpx 2rpx rgba(0, 0, 0, 0.08);
  border-radius: 22rpx 22rpx 22rpx 22rpx;
  opacity: 1;
  margin-left: 29rpx;
  margin-top: 22rpx;
}

.avatar {
  width: 50rpx;
  height: 50rpx;
  border-radius: 25rpx;
}

/* 设置整个页面的背景色 */
::v-deep .uview-page {
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
