<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh">
      <!-- 上拉加载组件 -->
      <van-list v-model="upLoading" :finished="finished" finished-text="没有了" @load="onLoad">
        <!-- 渲染数据循环环遍历 -->
        <van-cell v-for="article in articles" :key="article" >
          <!-- ***********************************************三图模式模板************************ -->
          <div class="article_item">
            <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
            <div class="img_box">
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="info_box">
              <span>你像一阵风</span>
              <span>8评论</span>
              <span>10分钟前</span>
              <span class="close">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
          <!-- **********************************************单图模式模板*************************** -->
          <div class="article_item">
            <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
            <div class="img_box">
              <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="info_box">
              <span>你像一阵风</span>
              <span>8评论</span>
              <span>10分钟前</span>
              <span class="close">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import { getArticle } from '@/api/article'
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false, // 开启刷拉加载状态
      finished: false,
      articles: [],
      downLoading: false, // 是否开启下拉刷新状态
      timestamp: null// 显示最新数据
    }
  },
  props: {
    channel_id: {
      type: Number,
      required: true, // true要求props必需传
      default: null
    }
  },
  methods: {
    onLoad () {
      console.log('获取数据')
      setTimeout(() => {
        // 模拟生成数组
        if (this.articles.length < 50) {
          let arr = Array.from(
            Array(10),
            (value, index) => this.articles.length + index + 1
          )
          // 在数组后面追加数组，...arr解构数组
          this.articles.push(...arr)
          this.upLoading = false
        } else {
          this.finished = true // 加载完毕，改状态
        }
      }, 1000)
    },
    // 下拉刷新方法
    onRefresh () {
      console.log('下拉刷新')
      setTimeout(() => {
        let arr = Array.from(Array(10), (value, index) => '追加' + (index + 1))
        this.articles.unshift(...arr)
        this.downLoading = false
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.article_item{
  h3{
    font-weight: normal;
    line-height: 2;
  }
  .img_box{
    display: flex;
    justify-content: space-between;
    .w33{
      width: 33%;
      height: 90px;
    }
    .w100{
      width: 100%;
      height: 180px;
    }
  }
  .info_box{
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span{
      padding-right: 10px;
      &.close{
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
