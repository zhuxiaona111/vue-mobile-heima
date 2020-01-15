<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="downLoading" :success-text="refreshSuccessText" @refresh="onRefresh">
      <!-- 上拉加载组件 -->
      <van-list v-model="upLoading" :finished="finished" finished-text="没有了" @load="onLoad">
        <!-- 渲染数据循环环遍历 -->
        <van-cell v-for="article in articles" :key="article.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{ article.title}}</h3>
            <!-- ***********************************************三图模式模板************************ -->
            <div class="img_box" v-if="article.cover.type === 3">
              <van-image class="w33" fit="cover" :src="article.cover.images[0]" />
              <van-image class="w33" fit="cover" :src="article.cover.images[1]" />
              <van-image class="w33" fit="cover" :src="article.cover.images[2]" />
            </div>
            <!-- **********************************************单图模式模板*************************** -->
            <div class="img_box" v-if="article.cover.type === 1">
              <van-image class="w100" fit="cover" :src="article.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{article.aut_name}}</span>
              <span>{{article.comm_count}}评论</span>
              <span>{{article.pubdate}}</span>
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
import { getArticles } from '@/api/article'
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false, // 开启刷拉加载状态
      finished: false,
      articles: [],
      downLoading: false, // 是否开启下拉刷新状态
      timestamp: null, // 显示最新数据
      refreshSuccessText: null
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
    async onLoad () {
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now()
      })
      // this.articles = data.results
      this.articles.push(...data.results)
      this.upLoading = false // 关闭状态
      // 判断历史时间戳，有就继续加载，没有将finished改为true
      if (data.pre_timestamp) {
        // 如果有数据中有时间戳就将后台返给的的历史时间戳赋给data
        this.timestamp = data.pre_timestamp
      } else {
        // 没有就将状态设为加载完毕
        this.finished = true
      }
    },
    // 下拉刷新方法
    async onRefresh () {
      const data = await getArticles({ channel_id: this.channel_id, timestamp: Date.now() })
      this.downLoading = false // 加载完数据关掉下拉状态
      if (data.results.length > 0) {
        this.articles = data.results
        this.finished = false
        this.timestamp = data.pre_timestamp
        this.refreshSuccessText = `更新了${data.results.length}数据`
      } else {
        this.refreshSuccessText = '已是最新数据'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
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
