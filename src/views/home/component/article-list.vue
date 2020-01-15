<template>

  <div class="scroll-wrapper">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh">
      <!-- 上拉加载组件 -->
      <van-list v-model="upLoading" :finished="finished" finished-text="没有了" @load="onLoad">
        <!-- 渲染数据循环环遍历 -->
        <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false, // 开启刷拉加载状态
      finished: false,
      articles: [],
      downLoading: false // 是否开启下拉刷新状态
    }
  },
  methods: {
    onLoad () {
      console.log('获取数据')
      setTimeout(() => {
        // 模拟生成数组
        if (this.articles.length < 50) {
          let arr = Array.from(Array(10), (value, index) => this.articles.length + index + 1)
          // 在数组后面追加数组，...arr解构数组
          this.articles.push(...arr)
          this.upLoading = false
        } else {
          this.finished = true// 加载完毕，改状态
        }
      }, 1000)
    },
    // 下拉刷新方法
    onRefresh () {
      console.log('下拉刷新')
      setTimeout(() => {
        let arr = Array.from(Array(10), (value, index) => ('追加' + (index + 1)))
        this.articles.unshift(...arr)
        this.downLoading = false
      }, 1000)
    }

  }
}

</script>

<style lang="less" scoped>
</style>
