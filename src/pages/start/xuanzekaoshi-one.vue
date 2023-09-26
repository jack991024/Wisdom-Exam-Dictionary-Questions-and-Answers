<template>
  <view>
    <view class="header">
      <view class="search">
        <u-search placeholder="搜索考试科目" v-model="keyword" action-style="color: #3C7BFB;"
                  @custom="searchByKeyWords(keyword)"></u-search>
      </view>
    </view>

    <view class="body">
      <view class="item">
        <view class="icon">
          <image src="./static/start/1.png" mode="widthFix" style="margin-left:29rpx;width: 57.97rpx;
    height: 57.97rpx;"></image>
        </view>
        <view class="text">
          <view class="title">
            <text>已购课程</text>
          </view>

          <view class="label">
            <text>未购买课程</text>
          </view>
        </view>
      </view>

      <view class="item">
        <view class="icon">
          <image src="./static/start/2.png" mode="widthFix" style=" margin-left:29rpx;  width: 57.97rpx;
    height: 57.97rpx;"></image>
        </view>
        <view class="text">
          <view class="title">
            <text>已购题库</text>
          </view>

          <view class="label">
            <text>未购买课程</text>
          </view>
        </view>
      </view>

      <!--          <view v-for="(item,index) in lists" :key="index">-->
      <!--        ../../../../static/start/1.png-->
      <!--          </view>-->

    </view>
  </view>
</template>

<script setup>
import {onLoad} from "@dcloudio/uni-app";

let keyword = ""

const searchByKeyWords = (keyword) => {
  let subjects = []
  uni.request({
    url: "https://dev.zhikaodian.com/apiV2/tk/search",
    data: {
      keyword: keyword
    },
    method: "POST",
    success: (response) => {
      console.log("response.data", response.data)
      subjects = response.data.data;
      uni.setStorageSync("subjects", subjects);
      uni.navigateTo({
        url: "/pages/home/classification/searchByKeyWordTiKuItem"
      })
    },
    fail: (error) => {
      console.log('error', error);
    }
  })
}

onLoad(() => {
  uni.request({
    url:"{\n" +
        "    \"code\": 0,\n" +
        "    \"msg\": \"success\",\n" +
        "    \"data\": {\n" +
        "        \"courses\": [\n" +
        "            {\n" +
        "                \"name\": \"建筑工程\",\n" +
        "                \"coid\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                \"depth\": 1,\n" +
        "                \"order\": 1,\n" +
        "                \"parent\": \"\",\n" +
        "                \"children\": [\n" +
        "                    {\n" +
        "                        \"name\": \"土木工程师\",\n" +
        "                        \"coid\": \"07090427-ce92-5e22-bb4e-a2d5e8a56807\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 1,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"建筑师\",\n" +
        "                        \"coid\": \"7fe2d978-2c71-50c0-a366-ffbcc6f57751\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 2,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"消防工程师\",\n" +
        "                        \"coid\": \"c725e6ee-e145-5945-80f2-78c3e8d365a7\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 3,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"建造师\",\n" +
        "                        \"coid\": \"1d14793b-41bf-57a2-9bf7-647ad703f341\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 4,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"一级造价工程师\",\n" +
        "                        \"coid\": \"f1b57e8d-b86c-5ed2-9cf8-a28e78f62e68\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"二级造价工程师\",\n" +
        "                        \"coid\": \"d1ebdfd7-7416-5152-b57f-2a0f7e2aa090\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 6,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"房地产估价师\",\n" +
        "                        \"coid\": \"effafcb8-f765-5fb8-9d4a-29a38e192bff\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 7,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"注册测绘师\",\n" +
        "                        \"coid\": \"056948e9-4151-5551-b2c8-4b8db54adb64\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 8,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"物业管理师\",\n" +
        "                        \"coid\": \"db850b5a-c4b6-58ae-8d3f-ef4b6872c12a\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 9,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"注册验船师\",\n" +
        "                        \"coid\": \"1b59645a-740a-5a49-b3ce-26e5a1553508\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 10,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"注册验船师B级\",\n" +
        "                        \"coid\": \"890606b5-36b9-50f5-ab96-0342b58cefc7\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 11,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"设备监理师\",\n" +
        "                        \"coid\": \"dfad533a-fe49-5eb4-afa6-4446e43c880f\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 12,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"结构工程师\",\n" +
        "                        \"coid\": \"b4ffc86d-19d1-5bb0-b6e9-0421c22e8fc3\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 13,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"环境影响评价师\",\n" +
        "                        \"coid\": \"11bcc29b-777d-557a-b6dd-85682e0e7cb5\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 14,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"核安全工程师\",\n" +
        "                        \"coid\": \"3306bbaf-7741-50bf-a55d-aff0033cb25a\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 15,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"注册设备监理师\",\n" +
        "                        \"coid\": \"b0eef9fa-efda-59c1-bb74-7c96413dd4e2\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 16,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"注册结构工程师\",\n" +
        "                        \"coid\": \"44c1ddd7-53e9-56f4-aead-ff4c905ae82e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 17,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"注册电气工程师\",\n" +
        "                        \"coid\": \"91b59f81-bb1f-5d67-b4a3-bd7cb5ea9ba5\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 18,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"城乡规划师\",\n" +
        "                        \"coid\": \"7db6a677-f5f1-5707-be89-8b0f91979b8c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 19,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"公路工程监理工程师\",\n" +
        "                        \"coid\": \"8c1aeac7-884a-579e-a9af-88661cf2a355\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 20,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"监理工程师\",\n" +
        "                        \"coid\": \"a332f0f2-1513-5e5e-95e4-c6c29a1e760c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 21,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"环保工程师\",\n" +
        "                        \"coid\": \"1d82c9ac-204b-5111-9b3e-46c49fa05245\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 22,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"质量工程师\",\n" +
        "                        \"coid\": \"09fc435e-5ff8-548a-9860-441ab726d449\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 22,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"咨询工程师\",\n" +
        "                        \"coid\": \"5707f46c-39db-54a6-b57d-db9bcd294654\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 22,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"注册城乡规划师\",\n" +
        "                        \"coid\": \"8a0d3936-ba9a-5ca7-8757-105c37aaf2dc\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 23,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"岩土工程师\",\n" +
        "                        \"coid\": \"0435930f-3f66-5ddf-8803-50ab7637079f\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 24,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"投资项目管理师\",\n" +
        "                        \"coid\": \"7366c5eb-c43f-53bf-8675-5d599bf6202b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 25,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"通信工程师\",\n" +
        "                        \"coid\": \"f397b84b-5772-5f7b-ba47-5d34ad58081e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 26,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"招标师\",\n" +
        "                        \"coid\": \"36e1ae6b-9e8e-5da8-9609-98cb68c3aa59\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 27,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"注册化工工程师\",\n" +
        "                        \"coid\": \"ddf21f9f-a46e-5779-a997-bd8b0dedc572\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 28,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"BIM工程师\",\n" +
        "                        \"coid\": \"8f7d493d-ebaa-58a3-8689-3c8a66792ce9\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 29,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"注册计量师\",\n" +
        "                        \"coid\": \"3b1774bf-ec44-5da8-8e43-f0f11c7e4bff\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 30,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"土地估价师\",\n" +
        "                        \"coid\": \"a3b0c4c5-3db0-5732-a36e-2fa4cf8932c1\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 31,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"化工工程师\",\n" +
        "                        \"coid\": \"e2ea0411-99af-52f4-819b-e2a6166ba964\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 32,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"公用设备工程师\",\n" +
        "                        \"coid\": \"6bb513d7-d569-54b3-b324-7f6b67a6e470\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 33,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"电气工程师\",\n" +
        "                        \"coid\": \"e6749f96-cbb7-52d2-8b2f-ba8d50d904a4\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 34,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"安全工程师\",\n" +
        "                        \"coid\": \"f8c32419-d941-5f98-aaf9-1f8936433c4d\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 34,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"注册环保工程师\",\n" +
        "                        \"coid\": \"8ce204ac-8aa1-5220-95a6-46461a6f0a4c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 35,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"八大员\",\n" +
        "                        \"coid\": \"18796452-b785-530d-9cef-1ca9ca3c0572\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 36,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"电工\",\n" +
        "                        \"coid\": \"c19467bf-8c5a-5a96-97d7-2a5e6180a051\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 37,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"职称评审\",\n" +
        "                        \"coid\": \"b809c395-9c08-5bfa-b49e-bee48a817419\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 38,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"房地产协理\",\n" +
        "                        \"coid\": \"53da0e01-354a-5239-b691-e773588f3c96\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 39,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"房地产经纪人\",\n" +
        "                        \"coid\": \"a918d115-2f4a-56e0-8653-732135ff2689\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 40,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"机动车检测维修\",\n" +
        "                        \"coid\": \"541b1eb8-312d-51b8-9e9f-356b64d133d6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 41,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"不动产登记代理人\",\n" +
        "                        \"coid\": \"e613a58a-80ab-5131-9d4b-44f058717c20\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 42,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"公路水运试验检测\",\n" +
        "                        \"coid\": \"469d4125-91f8-5d4a-94bc-3da82dc1df6f\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 43,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"消防设施操作员\",\n" +
        "                        \"coid\": \"7db1f971-8118-5500-b4a6-e2cc9e9ceba4\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 44,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"CCAA注册审核员\",\n" +
        "                        \"coid\": \"90bc820f-c916-586d-a6fd-2c175b23063c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 45,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"机械工程师\",\n" +
        "                        \"coid\": \"5fc5962b-7256-5307-bdaf-95141e2071aa\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 46,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"勘察设计注册工程师\",\n" +
        "                        \"coid\": \"20bee25f-33ae-5daf-8076-c5a551c71c0a\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 47,\n" +
        "                        \"parent\": \"c5f39f8c-8658-5980-8453-046ba6df9d54\",\n" +
        "                        \"children\": []\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"医药卫生\",\n" +
        "                \"coid\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                \"depth\": 1,\n" +
        "                \"order\": 2,\n" +
        "                \"parent\": \"\",\n" +
        "                \"children\": [\n" +
        "                    {\n" +
        "                        \"name\": \"护士\",\n" +
        "                        \"coid\": \"46de2aaa-a727-541d-a778-9ef4e97e9194\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 1,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"护师\",\n" +
        "                        \"coid\": \"bd9a15e1-3870-5952-abdb-7c0263099664\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 2,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"药士\",\n" +
        "                        \"coid\": \"a0cd22dd-2f94-5f38-a256-d6821c7076ec\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 3,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"药师\",\n" +
        "                        \"coid\": \"02eae5ca-66b3-5aeb-8499-a3486ffaf464\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 4,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"主治医师\",\n" +
        "                        \"coid\": \"a741a106-d628-5356-9cf5-f6c7925125e2\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"中医\",\n" +
        "                        \"coid\": \"e7295562-15a4-56b5-8532-2af03d70c5ac\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"主治医生\",\n" +
        "                        \"coid\": \"8bbb85ef-35fc-50a8-9657-cc3b9d205eaa\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 6,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医学三基\",\n" +
        "                        \"coid\": \"b95b98d0-aa42-5e4e-b5b6-e0821a3f9adf\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 7,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"卫生职称\",\n" +
        "                        \"coid\": \"a096e553-54e4-5bb5-b0ee-283c6d782c30\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 7,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"住院医师规培\",\n" +
        "                        \"coid\": \"e07817b4-4ebe-5c76-91a4-7ae34deff580\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 8,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医学技术类\",\n" +
        "                        \"coid\": \"a1e17665-d51e-5f12-a8b4-700a96336fe3\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 9,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医用设备考评\",\n" +
        "                        \"coid\": \"1a9836f5-2879-595c-b5ec-5d8f601762f7\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 10,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"卫生人才评价\",\n" +
        "                        \"coid\": \"4359fbb4-f0a8-5f35-99aa-b1c98031ac78\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 11,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"副高医药卫生\",\n" +
        "                        \"coid\": \"466802fa-e1d6-5f0f-808a-0cc095225b98\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 12,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"正高医药卫生\",\n" +
        "                        \"coid\": \"1a56a3f4-0946-52f1-b485-02cf5ee775fa\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 13,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"临床检验技术\",\n" +
        "                        \"coid\": \"73f3267b-f7ec-56fd-828d-3feeb409dbb6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 14,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"病案信息技术\",\n" +
        "                        \"coid\": \"b6bcf6a1-b23f-5688-884c-1c77be184af7\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 15,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医院感染类\",\n" +
        "                        \"coid\": \"7583ffd8-da4a-533f-8705-9b20c6bb9884\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 15,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"病理学技术\",\n" +
        "                        \"coid\": \"cef7bb67-80cf-5715-9b59-f50741d2177e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 16,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"放射医学技术\",\n" +
        "                        \"coid\": \"f544ee6f-9880-5628-be2f-cfa43f270496\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 17,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"其他技术中级\",\n" +
        "                        \"coid\": \"f42a0a23-a840-5fa6-8d3e-de18f6a11410\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 18,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"助理医师\",\n" +
        "                        \"coid\": \"1f3af296-eeb6-522f-a02b-c477154ed908\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 19,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"执业医师\",\n" +
        "                        \"coid\": \"1815cbd5-a990-55ef-8d4c-4376072a86e7\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 20,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"药学职称考试\",\n" +
        "                        \"coid\": \"e6655781-a16f-59c0-8655-50a6d75c7c96\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 21,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医疗招聘考试\",\n" +
        "                        \"coid\": \"c3d6ca51-0e4b-5ebb-b9d3-d8bee3320797\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 22,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医疗技师\",\n" +
        "                        \"coid\": \"0143631d-f67e-5388-a0f7-8c4bf349e1f6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 24,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"助听器验配师\",\n" +
        "                        \"coid\": \"80f7433d-32f0-53da-a91f-bddde677bb61\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 25,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"卫生资格\",\n" +
        "                        \"coid\": \"852b9371-f65f-567c-82f8-093223a2e747\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 26,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"健康管理师\",\n" +
        "                        \"coid\": \"6cc7f182-f9b6-57db-835c-8fbe53ef7a0c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 27,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医师定期考核\",\n" +
        "                        \"coid\": \"b4b305e8-268d-5380-ad74-fcfd8f3172bc\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 28,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"预防主治系列\",\n" +
        "                        \"coid\": \"9e651994-3ab6-52b4-a038-906bc012f180\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 29,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"辐射防护类\",\n" +
        "                        \"coid\": \"983ad5c3-8ebc-5f29-b21f-33ac6070d008\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 30,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"临床医学类\",\n" +
        "                        \"coid\": \"05ab3d38-6634-59d2-b963-5107de20d98e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 31,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"护理、药学类\",\n" +
        "                        \"coid\": \"a5d6e577-1659-5873-9506-ca31eaee825e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 31,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医学中医类\",\n" +
        "                        \"coid\": \"ccc67857-a355-5cd7-92ab-ce2e5a6d479e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 32,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"营养学技术\",\n" +
        "                        \"coid\": \"62923d9c-a1d9-5d74-bbd8-bc97e7d57d36\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 33,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"康复医学技术\",\n" +
        "                        \"coid\": \"02252044-9434-5702-96ef-158dfdeacbfe\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 34,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"输血技术\",\n" +
        "                        \"coid\": \"e85fd300-ed01-56cf-93c2-a13992296714\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 35,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医学五官类\",\n" +
        "                        \"coid\": \"423bb0ef-906e-54ad-9a63-779f06363eb4\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 36,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"临床后勤类\",\n" +
        "                        \"coid\": \"23b3ecc2-2fff-5de2-bb3f-f5a0b70bba5a\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 38,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"脑电图技术\",\n" +
        "                        \"coid\": \"72bee5cb-a207-5811-ba31-946af8657b2c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 39,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"中医药适宜技术\",\n" +
        "                        \"coid\": \"349d1975-d417-5779-9622-d1654c1535b3\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 40,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"口腔医学技术\",\n" +
        "                        \"coid\": \"9ee00cd1-3cac-591f-b7e7-a5b5bf429ed2\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 41,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"卫生检验技术\",\n" +
        "                        \"coid\": \"8067cd15-fef0-5165-bc1b-53ad93d0c4ff\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 42,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"辐射安全与防护\",\n" +
        "                        \"coid\": \"9e6a4142-8820-53d0-851f-b612d93e62b7\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 43,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"生殖健康咨询师\",\n" +
        "                        \"coid\": \"9a2719ac-46c9-5dbf-aaf9-4d9da7867546\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 44,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"住院医师招录\",\n" +
        "                        \"coid\": \"e6ef15eb-3019-5c2b-83be-ccda2f63efda\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 45,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"其他科室类\",\n" +
        "                        \"coid\": \"6822f6bf-78f4-51ff-aa13-a1693cc7e372\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 46,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"执业兽医\",\n" +
        "                        \"coid\": \"0e2545a3-b403-5955-9142-04738f2a519e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 47,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医用设备能力考评\",\n" +
        "                        \"coid\": \"bb372a0a-26f8-5075-8295-98a7000d1bf6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 47,\n" +
        "                        \"parent\": \"b0cf58c9-41e6-5333-9514-96fded690002\",\n" +
        "                        \"children\": []\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"财会经济\",\n" +
        "                \"coid\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                \"depth\": 1,\n" +
        "                \"order\": 3,\n" +
        "                \"parent\": \"\",\n" +
        "                \"children\": [\n" +
        "                    {\n" +
        "                        \"name\": \"会计师\",\n" +
        "                        \"coid\": \"5e29bf75-d7ab-5379-8803-b985efed9182\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 1,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"经济师\",\n" +
        "                        \"coid\": \"d661ae31-03e8-5408-9687-b7ea8d905ed8\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 2,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"CFP国际金融理财师\",\n" +
        "                        \"coid\": \"02bb3dcb-05d4-56c1-8406-a6eab707bc45\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 3,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"金融理财师\",\n" +
        "                        \"coid\": \"b9c2f157-fffd-5d08-8977-3a3cbf963827\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 4,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"理财规划师\",\n" +
        "                        \"coid\": \"10671c8d-68d5-55f1-b6a0-6f5b0c65de53\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"FRM金融风险管理师\",\n" +
        "                        \"coid\": \"f6e89ac9-921c-56a5-bc38-1ed7e466f81c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 6,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"AFP金融理财师\",\n" +
        "                        \"coid\": \"b9cf5fe0-c8da-55ae-a413-014cf45ad24e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 7,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"CFA特许金融分析师\",\n" +
        "                        \"coid\": \"0797744d-03e4-511c-bc89-a77c950affa3\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 8,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"CCPA薪税师\",\n" +
        "                        \"coid\": \"586e3b97-e41c-5db3-96f6-8627a13ba045\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 9,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"税务系统稽查人员\",\n" +
        "                        \"coid\": \"72dde620-75a2-5d39-9f04-22f103d38a0f\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 10,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"注册计量师\",\n" +
        "                        \"coid\": \"e0e95545-f2dc-57a3-82ba-21627e19a24b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 11,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"中国精算师\",\n" +
        "                        \"coid\": \"daf1dfea-b184-5d19-b2b2-a58df41684fe\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 12,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"价格鉴证师\",\n" +
        "                        \"coid\": \"f44f15d3-3dc8-502d-809f-b011ce408220\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 13,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"税务师\",\n" +
        "                        \"coid\": \"7e033021-109b-5d41-9b76-0bff2798de0d\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 14,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"CIA内部审计师\",\n" +
        "                        \"coid\": \"43bf9150-1046-52f7-b458-ca91c274656e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 15,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"资产评估师\",\n" +
        "                        \"coid\": \"837d95ce-6043-5264-8dd2-a8eefb207874\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 16,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"统计师\",\n" +
        "                        \"coid\": \"11d27ac1-c186-5f77-8c06-75edf7aba975\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 17,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"审计师\",\n" +
        "                        \"coid\": \"fcf6d720-82e6-5ee3-bf4d-99df90de9dc0\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 17,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"中国人身保险CICE\",\n" +
        "                        \"coid\": \"d60e51e8-73a9-5101-9bc2-2736e40bfb7b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 18,\n" +
        "                        \"parent\": \"661439b4-50d0-5716-998d-25f803410078\",\n" +
        "                        \"children\": []\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"学历提升\",\n" +
        "                \"coid\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                \"depth\": 1,\n" +
        "                \"order\": 4,\n" +
        "                \"parent\": \"\",\n" +
        "                \"children\": [\n" +
        "                    {\n" +
        "                        \"name\": \"自考（专科）\",\n" +
        "                        \"coid\": \"877b53fa-381a-5590-a878-2939b49972b4\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 1,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"自考（本科）\",\n" +
        "                        \"coid\": \"0fbe2e4b-b39e-5108-8006-576cd62bc2f1\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 2,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"自考（专+本）\",\n" +
        "                        \"coid\": \"82dd2ad8-17df-5b58-bf4a-c67941a4d58b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 3,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"考研\",\n" +
        "                        \"coid\": \"1dc8f2a2-37de-5c58-a622-93f96c37ac31\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 4,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"同等学力（申硕）\",\n" +
        "                        \"coid\": \"3f0c3fd0-fe7b-57e7-9ef4-c01466fb5e43\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"MBA考试\",\n" +
        "                        \"coid\": \"6ec99c9c-a4ca-5fae-983a-4aec331902f3\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 6,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医学本科\",\n" +
        "                        \"coid\": \"86ff4155-70dd-5362-8ec0-c5717283c69b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 7,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医学博士\",\n" +
        "                        \"coid\": \"8e88042f-f206-5ea6-9b7a-d9a75e003c43\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 8,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"高起专\",\n" +
        "                        \"coid\": \"ca9747d4-4ec4-571b-9162-601d8a6367f2\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 9,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"高升本\",\n" +
        "                        \"coid\": \"f64c5a9b-ca4d-5657-83f2-c64636409556\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 10,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"专升本\",\n" +
        "                        \"coid\": \"04e03c80-7859-59fc-86eb-8349e934b257\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 11,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"成人高考\",\n" +
        "                        \"coid\": \"ec5f9ba2-d58e-5966-8cd2-8e7d1c76b45b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 12,\n" +
        "                        \"parent\": \"98bc7cce-593b-50d2-afa6-f2c12af54311\",\n" +
        "                        \"children\": []\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"考公考编\",\n" +
        "                \"coid\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                \"depth\": 1,\n" +
        "                \"order\": 5,\n" +
        "                \"parent\": \"\",\n" +
        "                \"children\": [\n" +
        "                    {\n" +
        "                        \"name\": \"市考公务员\",\n" +
        "                        \"coid\": \"7239ba48-cfd1-5bca-b361-dc4efdeef482\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 1,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"国家公务员\",\n" +
        "                        \"coid\": \"c891d272-9f64-505f-82d8-cc28971777ee\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 2,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"省考公务员\",\n" +
        "                        \"coid\": \"2b9e0e91-e235-5efb-9b1d-ebff714512f6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 3,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"乡镇公务员\",\n" +
        "                        \"coid\": \"cab86b77-0410-5a6b-ba2d-4c2b9d2653cb\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 4,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"事业单位非联考\",\n" +
        "                        \"coid\": \"2344034f-50de-5c60-9c20-4fb6378ff61b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"事业单位联考\",\n" +
        "                        \"coid\": \"3df4e434-39c0-55bf-8636-db840bd72cbb\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 6,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"国家电网\",\n" +
        "                        \"coid\": \"af64e077-6223-51d3-b54d-7b9502ca7813\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 7,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"社区工作者\",\n" +
        "                        \"coid\": \"70dc65a1-b316-5cc5-afa3-dfd8499fbf7f\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 8,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"大学生村官\",\n" +
        "                        \"coid\": \"ea408f81-ac15-50b6-8f39-1d01a078711e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 9,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"三支一扶\",\n" +
        "                        \"coid\": \"61a4a206-d68e-513d-89fc-18bd984ecc17\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 10,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"法检系统\",\n" +
        "                        \"coid\": \"6a0a1de3-843a-593b-800d-dfcf21506523\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 11,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"警察考试\",\n" +
        "                        \"coid\": \"67b6902e-0e50-5258-9733-e557bc8fcdf5\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 12,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"公安院校招警\",\n" +
        "                        \"coid\": \"5a376e09-c082-5525-b5e2-16ca62b22bbf\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 12,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"军队文职\",\n" +
        "                        \"coid\": \"171b133c-d3c4-5fe1-a105-3c6ca3afdc6f\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 12,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"政法干警\",\n" +
        "                        \"coid\": \"7822ead5-d7c7-5209-bddf-0d444bda0809\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 13,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"文职辅警\",\n" +
        "                        \"coid\": \"ac1f5aef-815b-5761-b1ed-bf137238ffbc\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 14,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"选调生\",\n" +
        "                        \"coid\": \"1d334951-2157-5626-b4b1-f4c51919a526\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 15,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"书记员\",\n" +
        "                        \"coid\": \"81708d5d-710a-5efd-b3f6-0a0d0b33546e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 16,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"公选遴选\",\n" +
        "                        \"coid\": \"988969ee-bd7e-58be-9159-189978e0f834\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 17,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"军考类招生\",\n" +
        "                        \"coid\": \"a3fc4db8-9b5c-516f-8e1f-1c483202180d\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 18,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"国企\",\n" +
        "                        \"coid\": \"42951e6f-0354-5490-9b5b-c729fbc5b2f6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 18,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"互联网单位校招\",\n" +
        "                        \"coid\": \"3b4693fc-d8f5-540f-bc45-8b78f74b6744\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 18,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"士兵提干\",\n" +
        "                        \"coid\": \"cc7948da-6e4c-5720-96eb-cbce11f78e69\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 19,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"邮政考试\",\n" +
        "                        \"coid\": \"e4a82913-4f61-5bd2-9c24-4eb0ef80ae8b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 20,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"烟草招聘\",\n" +
        "                        \"coid\": \"ae24c7af-c6c0-57ec-9377-c4944f221610\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 21,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"卫生系统招聘\",\n" +
        "                        \"coid\": \"20cb95a8-3dba-5f7f-8ab0-1c70ee9e52a7\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 22,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"卫生事业招聘\",\n" +
        "                        \"coid\": \"f42cfeb6-334b-55c7-9381-1829bc2d3e4d\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 23,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"非技术类网申笔试\",\n" +
        "                        \"coid\": \"daf01d8f-44af-5534-9108-9731069a155f\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 24,\n" +
        "                        \"parent\": \"5c242994-e7bb-56a7-b63e-08f93dd38786\",\n" +
        "                        \"children\": []\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"金融银行\",\n" +
        "                \"coid\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                \"depth\": 1,\n" +
        "                \"order\": 6,\n" +
        "                \"parent\": \"\",\n" +
        "                \"children\": [\n" +
        "                    {\n" +
        "                        \"name\": \"中国进出口银行\",\n" +
        "                        \"coid\": \"0b38af07-08e1-5ede-b6e6-53b17cc5fbae\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 2,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"国家开发银行\",\n" +
        "                        \"coid\": \"431665f6-fc92-5ff5-a99b-a717cae9fcc6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 3,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"农业发展银行\",\n" +
        "                        \"coid\": \"abe5b640-4754-5bfb-be94-b01bf3eb4ab2\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 4,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"农业银行\",\n" +
        "                        \"coid\": \"e55d49be-0f86-5393-b2fc-340672607a11\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"建设银行\",\n" +
        "                        \"coid\": \"23d21374-51ac-5491-bc56-fd50520a6b54\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 6,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"中国银行\",\n" +
        "                        \"coid\": \"df67d6fc-03e2-53da-ac87-cdcb1011ccaf\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 7,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"工商银行\",\n" +
        "                        \"coid\": \"8ff4cbae-9d85-527d-9568-c16ff387bd9d\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 8,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"邮储银行\",\n" +
        "                        \"coid\": \"ad17aa31-c481-55c4-987f-b51928f58593\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 9,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"中信银行\",\n" +
        "                        \"coid\": \"cdc10966-dfa3-5493-8e49-642edd45cdc5\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 10,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"邮蓄银行\",\n" +
        "                        \"coid\": \"7c10de68-7d7b-5da0-9bd0-26b8ff44a1e8\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 11,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"光大银行\",\n" +
        "                        \"coid\": \"0629819a-577c-5ade-a4b4-52235cc1c112\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 12,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"广发银行\",\n" +
        "                        \"coid\": \"d987fda5-1881-5dd2-9d98-6be7d4ca7809\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 13,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"浦发银行\",\n" +
        "                        \"coid\": \"c88cd56e-1e89-563f-8622-a2c1a7f92cce\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 14,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"平安银行\",\n" +
        "                        \"coid\": \"c53f6923-2ebf-56e3-a9d7-a8838c69d619\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 15,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"地方性商业银行\",\n" +
        "                        \"coid\": \"c5e0e765-3876-5576-919f-c354f689ca70\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 16,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"民生银行\",\n" +
        "                        \"coid\": \"2e425e37-22d2-5e98-80c1-cf98cfa6994f\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 17,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"交通银行\",\n" +
        "                        \"coid\": \"ca51a1ae-f6f4-5c3a-8e59-15f2f2917412\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 18,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"招商银行\",\n" +
        "                        \"coid\": \"d80795b5-f685-51c7-a63d-29f938948f74\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 19,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"农信社\",\n" +
        "                        \"coid\": \"a674013a-81a0-5c9b-b063-9e4f0abbc4b0\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 20,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"银行从业资格\",\n" +
        "                        \"coid\": \"27f64dee-235a-5f9a-95ae-fdbbf753b40d\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 21,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"银行考试通用\",\n" +
        "                        \"coid\": \"9db54adf-75c7-51c0-adb0-e159d355d196\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 22,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"证券分析师\",\n" +
        "                        \"coid\": \"a2878cb1-574d-51a7-a5a8-b8c5198805d9\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 24,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"期货从业资格\",\n" +
        "                        \"coid\": \"3a388803-ca91-50ee-bf3c-4e0bc3ca3756\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 24,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"基金从业资格\",\n" +
        "                        \"coid\": \"fdb9501d-8709-5ddc-a943-dd16ba8e73fe\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 25,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"银保监会\",\n" +
        "                        \"coid\": \"98007609-796a-51b1-85ee-6b38f3788096\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 26,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"证券专业评价\",\n" +
        "                        \"coid\": \"0b6106ba-c97e-55de-a8ac-a629bfd7ea90\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 27,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"金融机构高管\",\n" +
        "                        \"coid\": \"301feba2-fd86-5ee8-a7bf-bbe67d82760a\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 28,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"证劵从业\",\n" +
        "                        \"coid\": \"6893aa17-2b89-52ee-8e43-fd0d0a1a30cd\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 29,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"证券投资顾问\",\n" +
        "                        \"coid\": \"02909385-ace3-5102-a65e-c32fbe4263ca\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 30,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"银行招聘考试\",\n" +
        "                        \"coid\": \"78035303-bdbc-5c6b-9193-baa2829fd64b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 31,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"性格测试\",\n" +
        "                        \"coid\": \"937a4896-6b81-5fe6-8deb-e72b068b9562\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 32,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"中国人民银行\",\n" +
        "                        \"coid\": \"84dd56e7-4634-56bd-8e47-8fbde665bfcf\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 10000,\n" +
        "                        \"parent\": \"8ce4940e-281e-582b-9bca-47f2d7158cad\",\n" +
        "                        \"children\": []\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"职业资格\",\n" +
        "                \"coid\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                \"depth\": 1,\n" +
        "                \"order\": 6,\n" +
        "                \"parent\": \"\",\n" +
        "                \"children\": [\n" +
        "                    {\n" +
        "                        \"name\": \"社工证\",\n" +
        "                        \"coid\": \"9a1e9ca0-1c3e-51c4-8a2f-2909b2188498\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 1,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"消防工程师\",\n" +
        "                        \"coid\": \"58387d52-c1a6-511c-8d79-883980d669e9\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 2,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"房地产估价师\",\n" +
        "                        \"coid\": \"0fa79cee-2014-5c5e-9c1a-fadc2fc4598f\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 3,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"人力资源管理师\",\n" +
        "                        \"coid\": \"a13b1975-5823-51af-8c25-9a49330ea100\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 4,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"物流师\",\n" +
        "                        \"coid\": \"bf64d70d-4cec-54cc-badb-05533afc186e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"烟草专卖管理师\",\n" +
        "                        \"coid\": \"e501c2b0-b537-55a5-b1a2-cf886c0c001c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 6,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"营销师\",\n" +
        "                        \"coid\": \"71b654c9-2b9f-5632-adc9-71bb18bbfd3c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 7,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"拍卖师\",\n" +
        "                        \"coid\": \"83a5b8a5-59df-5b5e-ada6-1aaab69d373e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 8,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"有害生物防制员\",\n" +
        "                        \"coid\": \"52b6b891-a382-59ac-a5d5-9ab066d3e1f2\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 9,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"国际商务单证员\",\n" +
        "                        \"coid\": \"2ae1b06e-14d4-5e5f-93d7-2798f31490a6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 10,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"劳动关系协调员\",\n" +
        "                        \"coid\": \"8315e485-32a8-5679-8681-5a59556b9171\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 11,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"外经贸从业人员\",\n" +
        "                        \"coid\": \"f04b1356-68d4-55f5-b069-65a527793d4f\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 12,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"安全评价师\",\n" +
        "                        \"coid\": \"e6437cd1-6768-52fe-bf74-7f04aca50498\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 13,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"CCAA注册审核员\",\n" +
        "                        \"coid\": \"1af9496b-68ad-5529-9a7e-6c70c7512d50\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 14,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"海员船员考试\",\n" +
        "                        \"coid\": \"0e317589-615f-5c30-9850-3b803917a579\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 14,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"法律职业资格\",\n" +
        "                        \"coid\": \"56c7f9ee-4d80-5bb1-9b1d-446739ca72c6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 14,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"不动产登记代理人\",\n" +
        "                        \"coid\": \"498da7e3-c60a-565d-b712-70f2f5274183\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 15,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"黄金交易从业\",\n" +
        "                        \"coid\": \"3d3a3945-ae81-534d-902a-40d41d380e9c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 16,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"物业管理\",\n" +
        "                        \"coid\": \"eca98124-34a9-5a7e-b024-977a96697e9c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 17,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"飞行员执照\",\n" +
        "                        \"coid\": \"3ac7c57a-9931-53f7-87d8-bb54adf80eda\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 18,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"食品安全管理员\",\n" +
        "                        \"coid\": \"3a81b10e-a2eb-5b17-be2f-a59d94368c38\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 19,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"畜牧兽医科学\",\n" +
        "                        \"coid\": \"ab21a8e2-d617-5c80-a93e-f4e28f9bd402\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 20,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"报检员资格证\",\n" +
        "                        \"coid\": \"c2b1a32a-b703-58c6-a61a-99ee4f078254\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 21,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"反假币考试\",\n" +
        "                        \"coid\": \"0d10b4c3-8e8e-531f-932d-00bfd7aa546b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 22,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"司法考试\",\n" +
        "                        \"coid\": \"5327a72a-7681-58cc-a9e6-d7b91a279be0\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 23,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"报关员资格证\",\n" +
        "                        \"coid\": \"02d7af61-d311-5c6d-8b0b-30860e1a7c1d\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 24,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"国际货运代理从业\",\n" +
        "                        \"coid\": \"89a064be-f365-5e40-bb53-31a62c7bc5d2\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 25,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"反假货币上岗资格证\",\n" +
        "                        \"coid\": \"4479f73e-9f57-5dea-824a-9f6beaf1b256\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 26,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"外经贸从业\",\n" +
        "                        \"coid\": \"ee138f47-64c5-56b2-bc8b-9742645e96ea\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 27,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"导游资格证\",\n" +
        "                        \"coid\": \"456b3b7e-a487-5282-8af6-0583406fa20c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 28,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"公路水运工程检测\",\n" +
        "                        \"coid\": \"87e4c023-9790-52da-860f-90540e3a9e4f\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 29,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"全国专利代理人\",\n" +
        "                        \"coid\": \"a13b3446-6230-5f43-89b6-7a82e9351b6e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 29,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"出版专业技术资格\",\n" +
        "                        \"coid\": \"e048f731-1ed8-56ec-bb26-2a816b25f92a\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 30,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"助听器验配师\",\n" +
        "                        \"coid\": \"e9f809b3-8181-5783-9a61-b944589295c6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 31,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"演出经纪人\",\n" +
        "                        \"coid\": \"9b6b18ed-2370-5010-ac6d-009e961069e6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 32,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"保险从业资格\",\n" +
        "                        \"coid\": \"ac919237-3922-5c87-9aea-d730b935e3e8\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 33,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"房地产经纪\",\n" +
        "                        \"coid\": \"2280dd8d-4acb-5ac4-9029-11b9980282a6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 34,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"北京数字编辑\",\n" +
        "                        \"coid\": \"616edcca-d858-5b74-b232-d3dcfdefeb9c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 35,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"档案职称\",\n" +
        "                        \"coid\": \"3bc3b810-4fa9-50d7-8b45-12491519df3d\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 36,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"驾驶证考试\",\n" +
        "                        \"coid\": \"57f1a42f-ef4c-5447-aaff-37de7076628c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 37,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"通信专业技术\",\n" +
        "                        \"coid\": \"145d7d10-916e-5008-b108-97f63ad18582\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 38,\n" +
        "                        \"parent\": \"3ed8a636-d5f6-5b4e-ab59-36017b442117\",\n" +
        "                        \"children\": []\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"教资教招\",\n" +
        "                \"coid\": \"e81f0484-2dae-5730-972b-def61e2aabda\",\n" +
        "                \"depth\": 1,\n" +
        "                \"order\": 7,\n" +
        "                \"parent\": \"\",\n" +
        "                \"children\": [\n" +
        "                    {\n" +
        "                        \"name\": \"中职教师资格\",\n" +
        "                        \"coid\": \"41c766bf-9111-5095-a9cd-4b1c42b841e0\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 1,\n" +
        "                        \"parent\": \"e81f0484-2dae-5730-972b-def61e2aabda\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"高校教师资格证\",\n" +
        "                        \"coid\": \"b85e495a-7c94-5594-89e9-6d4e90759585\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 2,\n" +
        "                        \"parent\": \"e81f0484-2dae-5730-972b-def61e2aabda\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"教师资格\",\n" +
        "                        \"coid\": \"a25c548e-0614-5e39-8684-0d2340ff335c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 3,\n" +
        "                        \"parent\": \"e81f0484-2dae-5730-972b-def61e2aabda\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"教资面试\",\n" +
        "                        \"coid\": \"1c76931d-edf7-51d4-9549-ba36e9d00632\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 4,\n" +
        "                        \"parent\": \"e81f0484-2dae-5730-972b-def61e2aabda\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"教招面试\",\n" +
        "                        \"coid\": \"46385d47-9fa6-51fe-b45c-eb72f2220384\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"e81f0484-2dae-5730-972b-def61e2aabda\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"教师招聘\",\n" +
        "                        \"coid\": \"4cb92e6e-52ea-5cb1-803d-c171df413a1c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 6,\n" +
        "                        \"parent\": \"e81f0484-2dae-5730-972b-def61e2aabda\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"特岗教师\",\n" +
        "                        \"coid\": \"94753b9b-c26f-5713-940d-d62cae49fd00\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 7,\n" +
        "                        \"parent\": \"e81f0484-2dae-5730-972b-def61e2aabda\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"国际汉语教师\",\n" +
        "                        \"coid\": \"bbc9fc6d-2aef-5949-80f7-45a5f3282cdc\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 8,\n" +
        "                        \"parent\": \"e81f0484-2dae-5730-972b-def61e2aabda\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"高校大学辅导员\",\n" +
        "                        \"coid\": \"25d500f2-9108-594b-b821-1d916cec1b43\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 9,\n" +
        "                        \"parent\": \"e81f0484-2dae-5730-972b-def61e2aabda\",\n" +
        "                        \"children\": []\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"技能鉴定\",\n" +
        "                \"coid\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                \"depth\": 1,\n" +
        "                \"order\": 9,\n" +
        "                \"parent\": \"\",\n" +
        "                \"children\": [\n" +
        "                    {\n" +
        "                        \"name\": \"健康管理师\",\n" +
        "                        \"coid\": \"09ae512a-be69-57ea-b253-d6da64f0c8b1\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 1,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"心理咨询师\",\n" +
        "                        \"coid\": \"e7d937c8-470c-5254-ae17-ecf99f1b0551\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 2,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"美容师\",\n" +
        "                        \"coid\": \"15aad0f4-17f3-5e6e-bcfc-23f472ab707b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 3,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"中式面点师\",\n" +
        "                        \"coid\": \"165d8d12-60e6-573e-87e1-1964af6cdef0\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 4,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"西式面点师\",\n" +
        "                        \"coid\": \"fc23a911-895a-5e78-8e1f-1166d48dda6e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"茶艺师\",\n" +
        "                        \"coid\": \"f5a5ca85-c23e-5535-a6ae-6ecb6422b48b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 6,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"营养师\",\n" +
        "                        \"coid\": \"56c9f18c-a86c-5214-9506-9367b376d30d\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 7,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"中式烹调师\",\n" +
        "                        \"coid\": \"d3d2f3e4-d602-5d0f-bb4a-b62e116594ce\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 8,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"育婴员\",\n" +
        "                        \"coid\": \"53ca7161-a036-53aa-9140-b5c12d3de995\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 9,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"养老护理员\",\n" +
        "                        \"coid\": \"67d5ca15-ee80-5a09-97ed-4ffd14154f7d\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 10,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"保育员\",\n" +
        "                        \"coid\": \"eb091a2d-191a-54b3-a712-07668b10daa1\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 11,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"收银员\",\n" +
        "                        \"coid\": \"e29384d8-a68e-5a9c-97d4-084b3bd5c736\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 12,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"眼镜验光员\",\n" +
        "                        \"coid\": \"42f81bdb-69d6-5844-ae3a-88fd5b79c982\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 13,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"企业安全管理人员\",\n" +
        "                        \"coid\": \"c50a5b59-693c-5c7e-b756-78e8f14dffce\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 14,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"特种设备作业人员\",\n" +
        "                        \"coid\": \"f27848b1-d82c-5155-bdca-6e4265d23c55\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 15,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"特种作业\",\n" +
        "                        \"coid\": \"a36f0e2f-de88-586d-8d9d-dce1d87c066e\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 16,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"煤矿安全生产管理\",\n" +
        "                        \"coid\": \"4d611665-9861-5fbf-b19f-0a272c15a31c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 17,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"职业技能鉴定\",\n" +
        "                        \"coid\": \"89b67cdb-a6a6-5181-afcd-b049da377cd2\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 18,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"机动车检测\",\n" +
        "                        \"coid\": \"ffa5e025-e8bc-57b1-8dc6-cedcd64cab6d\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 19,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"特种设备检测检验\",\n" +
        "                        \"coid\": \"0cdd5fc5-a757-5f2f-96f3-a41b8c6b51c2\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 19,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"汽车维修工\",\n" +
        "                        \"coid\": \"0cb9e467-51b1-5502-bde5-d84ba782961c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 20,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"药学职业技能\",\n" +
        "                        \"coid\": \"b9f70218-01e7-51ec-895f-353c4cda3f57\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 21,\n" +
        "                        \"parent\": \"59cb185e-cc2a-504a-bb08-3efa38f13717\",\n" +
        "                        \"children\": []\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"语言考试\",\n" +
        "                \"coid\": \"ffe2c5a3-483a-545c-8995-5f9985825509\",\n" +
        "                \"depth\": 1,\n" +
        "                \"order\": 10,\n" +
        "                \"parent\": \"\",\n" +
        "                \"children\": [\n" +
        "                    {\n" +
        "                        \"name\": \"大学英语\",\n" +
        "                        \"coid\": \"409437fe-4078-52a3-a4bd-69d85a7cb1f9\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 1,\n" +
        "                        \"parent\": \"ffe2c5a3-483a-545c-8995-5f9985825509\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"英语四六级考试\",\n" +
        "                        \"coid\": \"612a4725-58ad-53b7-8122-61eaa04cf214\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 2,\n" +
        "                        \"parent\": \"ffe2c5a3-483a-545c-8995-5f9985825509\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"成人英语等级考试\",\n" +
        "                        \"coid\": \"40ddeab0-74e6-5af3-9841-2e7ecd92c5b6\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 3,\n" +
        "                        \"parent\": \"ffe2c5a3-483a-545c-8995-5f9985825509\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"国外英语考试\",\n" +
        "                        \"coid\": \"e0ff5200-2d22-5867-b102-77c633170965\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 4,\n" +
        "                        \"parent\": \"ffe2c5a3-483a-545c-8995-5f9985825509\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"医护英语\",\n" +
        "                        \"coid\": \"21e2e27e-8322-5768-b5b7-8d12575ab859\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"ffe2c5a3-483a-545c-8995-5f9985825509\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"英语竞赛\",\n" +
        "                        \"coid\": \"44f9bfa6-072f-5553-9df1-bcb7e4f47314\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 6,\n" +
        "                        \"parent\": \"ffe2c5a3-483a-545c-8995-5f9985825509\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"国际货运代理专业英语\",\n" +
        "                        \"coid\": \"625dcbd7-ba01-5edb-a359-017fef9744d4\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 7,\n" +
        "                        \"parent\": \"ffe2c5a3-483a-545c-8995-5f9985825509\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"剑桥少儿英语\",\n" +
        "                        \"coid\": \"2dc99a96-d802-55a4-877f-dcfe1fc27081\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 8,\n" +
        "                        \"parent\": \"ffe2c5a3-483a-545c-8995-5f9985825509\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"网络统考英语\",\n" +
        "                        \"coid\": \"4bd96458-f2f0-5400-9fc5-fb93e35c10c9\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 9,\n" +
        "                        \"parent\": \"ffe2c5a3-483a-545c-8995-5f9985825509\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"翻译专业资格\",\n" +
        "                        \"coid\": \"fb7bcf25-2e00-542e-b727-0103c3256909\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 10,\n" +
        "                        \"parent\": \"ffe2c5a3-483a-545c-8995-5f9985825509\",\n" +
        "                        \"children\": []\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"name\": \"计算机类\",\n" +
        "                \"coid\": \"e176c05e-8752-579b-a5b8-b1a8ceca861b\",\n" +
        "                \"depth\": 1,\n" +
        "                \"order\": 11,\n" +
        "                \"parent\": \"\",\n" +
        "                \"children\": [\n" +
        "                    {\n" +
        "                        \"name\": \"计算机一级\",\n" +
        "                        \"coid\": \"a2a0d151-32c4-5f8a-a4a5-1b4fa2c6c83b\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 1,\n" +
        "                        \"parent\": \"e176c05e-8752-579b-a5b8-b1a8ceca861b\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"计算机二级\",\n" +
        "                        \"coid\": \"175bfd3e-ad13-501d-89fd-537869ebe2af\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 2,\n" +
        "                        \"parent\": \"e176c05e-8752-579b-a5b8-b1a8ceca861b\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"计算机三级\",\n" +
        "                        \"coid\": \"6c3478c4-dd6f-585f-b11a-b285ac8de54c\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 3,\n" +
        "                        \"parent\": \"e176c05e-8752-579b-a5b8-b1a8ceca861b\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"软考（初级）\",\n" +
        "                        \"coid\": \"b71d3024-29c4-5741-b9bc-11d224b97d77\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 4,\n" +
        "                        \"parent\": \"e176c05e-8752-579b-a5b8-b1a8ceca861b\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"软考（中级）\",\n" +
        "                        \"coid\": \"da4c9ad1-89de-57ce-8315-26c1cc9ae8f9\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 5,\n" +
        "                        \"parent\": \"e176c05e-8752-579b-a5b8-b1a8ceca861b\",\n" +
        "                        \"children\": []\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"name\": \"软考（高级）\",\n" +
        "                        \"coid\": \"69b85eb2-270d-5979-8d81-54d5af33ba35\",\n" +
        "                        \"depth\": 2,\n" +
        "                        \"order\": 6,\n" +
        "                        \"parent\": \"e176c05e-8752-579b-a5b8-b1a8ceca861b\",\n" +
        "                        \"children\": []\n" +
        "                    }\n" +
        "                ]\n" +
        "            }\n" +
        "        ],\n" +
        "        \"region\": {\n" +
        "            \"id\": \"110000000000\",\n" +
        "            \"name\": \"北京\"\n" +
        "        }\n" +
        "    }\n" +
        "}"
  })
})
</script>

<style lang="scss">
.header {
  height: 115rpx;

  .search {
    margin: 28rpx;
  }
}

.body {
  background: #F5F6F8;

  .item {
    width: 750rpx;
    height: 156rpx;
    background: #FFFFFF;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    opacity: 1;
    align-items: center;
    display: flex;

    position: relative; // 使伪类相对于此元素定位

    &::before {
      content: ""; // 伪类必须有内容，但我们可以设置为空
      display: block;
      width: 100%; // 使伪类的宽度与.item相同
      height: 22rpx; // 设置伪类的高度
      background: #F5F6F8; // 你可以根据需要设置背景颜色
      position: absolute;
      top: -22rpx; // 将伪类放在.item的上方
      left: 0;
    }

    .text {
      margin-left: 29rpx;
      margin-top: -10rpx;

      .title {
        font-size: 29rpx;
        font-weight: bold;
        color: #333333;
      }

      .label {
        font-size: 25rpx;
        color: #999999;
        font-weight: 400;
        margin-top: 10rpx;
      }
    }
  }
}
</style>
