<template>
  <div class="article">
    <div class="showPart"></div>
    <div class="editPart">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="阅读量">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <Editor id="tinymce" v-model="tinymceHtml" :init="tinyInit"></Editor>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="点赞">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Article } from "@/types/index";
import { tinymce } from "tinymce/tinymce";
import "tinymce/themes/silver";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import Editor from "@tinymce/tinymce-vue";
@Component({
  components: { Editor }
})
export default class Article1 extends Vue {
  private form: Article = {
    title: "",
    gmtCreated: new Date(),
    author: "", //作者
    readCount: 0, //阅读量
    content: "", //内容
    type: "", //分类
    star: 0, //点赞
    titleImg: "" //图片
  };
  private tinymceHtml: string = "请输入内容";
  private tinyInit: any = {
    height: 300,
    skin_url: '/tinymce/skins/ui/oxide',
    plugins:
      "link lists image code table wordcount",
    toolbar:
      "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
    branding: false
  };
  mounted(): void {
    tinymce.init({});
  }
  private async onSubmit(): Promise<void> {}
}
</script>
<style lang="less" scoped>
</style>