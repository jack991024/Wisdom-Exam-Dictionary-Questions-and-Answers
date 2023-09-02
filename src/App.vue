<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    // #ifdef MP
    uni.onAppRoute((res) => {
      const currPath = res.path || '';
      console.log('---路由监听--小程序---', currPath);
    });
// #endif
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
  @import "uview-plus/index.scss";
</style>
