<template>
  <div class="articleList">
    <div class="left">
      <div class="article" v-for="(item,index) in articleList" :key="index">
        <a :href="111" target="_blank">
          <img class="articleImg" :src="item.titleImg" alt="文章封面" />
          <div class="content">
            <!-- 显示html代码 -->
            <!-- <p v-html="item.content">{{item.content}}</p> -->
            <h4 class="title">{{item.title}}</h4>
            <p class="describe">{{item.subTitle}}</p>
            <div class="meta">
              <span>查看 {{item.readCount}}</span>
              <span>评论 {{item.commentCount}}</span>
              <span>赞 {{item.star}}</span>
              <span></span>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Article } from "@/types/index";
@Component({
  components: {}
})
export default class ArticleList extends Vue {
  private articleList: Array<object> = [];

  mounted(): void {
    this.getData();
  }
  private async getData(): Promise<void> {
    const data: Array<Article> = await this.$https.get(this.$urls.showData);
    this.articleList = data;
  }
}
</script>
<style lang="less" scoped>
.articleList {
  margin: 0;
  padding: 0px 150px;
  list-style: none;
  text-align: left;
  display: flex;
  .left {
    padding-right: 20px !important;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    .article {
      padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
      a {
        width: 100%;
        display: inline-block;
        margin-right: 10px;
        color: #b4b4b4;
        text-decoration: none;
        position: relative;
        &::hover {
          transition: 0.1s ease-in;
          -webkit-transition: 0.1s ease-in;
          -moz-transition: 0.1s ease-in;
          -o-transition: 0.1s ease-in;
          -ms-transition: 0.1s ease-in;
        }
        .articleImg {
          position: absolute;
          right: 0;
          top: 7px;
          width: 100px;
          height: 80px;
        }
        .content {
          .title {
            color: #333;
            margin: 7px 0 4px;
            display: inherit;
            font-size: 18px;
            font-weight: 700;
            line-height: 1.5;
          }
          .describe {
            min-height: 30px;
            margin: 0 0 8px;
            font-size: 13px;
            line-height: 24px;
            color: #555;
          }
          .meta {
            padding-right: 0 !important;
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
            a {
              margin-right: 10px;
              color: #b4b4b4;
              &::hover {
                transition: 0.1s ease-in;
                -webkit-transition: 0.1s ease-in;
                -moz-transition: 0.1s ease-in;
                -o-transition: 0.1s ease-in;
                -ms-transition: 0.1s ease-in;
              }
            }
            span {
              margin-right: 10px;
              color: #666;
            }
          }
        }
      }
    }
  }
  .right {
    border: 1px solid red;
    width: 350px;
  }
}
</style>