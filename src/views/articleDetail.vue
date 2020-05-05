<template>
  <div class="articleDetail">
    <h4 class="title">123123</h4>
    <div class="content">123132</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
export default class ArticleDetail extends Vue {
  private article: any = {};
  mounted(): void {
    this.getarticle();
  }
  private async getarticle(): Promise<void> {
      console.log(this.$urls.detail);
    this.article = await this.$https.get(this.$urls.detail,{});
  }
}
</script>
<style lang="less" scoped>
.articleDetail {
  margin: 0 auto;
  padding: 0 15%;
  .title {
    color: #333;
    margin: 7px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
  }
}
</style>