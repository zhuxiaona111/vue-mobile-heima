<template>
  <div class="scroll-wrapper">
    <van-list v-model="upLoading" :finished="finished" finished-text="没有了" @load="onLoad">
      <!-- 渲染数据循环环遍历 -->
      <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false,
      finished: false,
      articles: []
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        if (this.articles.length === 50) {
          this.finished = true
        } else {
          let arr = Array.from(Array(10), (value, index) => index + this.articles.length + 1)
          this.articles.push(...arr) // 把生成的数据追加到末尾
          this.upLoading = false // 关闭状态
        }
      }, 2000)
      console.log('开始加载数据')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
