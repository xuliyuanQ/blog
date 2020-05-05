<template>
  <div class="article">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文章标题" class="input_large">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="分类" class="input_middle">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="作者" class="input_small">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="阅读量" class="input_small">
        <el-input v-model="form.readCount"></el-input>
      </el-form-item>
      <el-form-item label="点赞" class="input_small">
        <el-input v-model="form.star"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-input v-model="form.titleImg"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <Editor id="tinymce" v-model="form.content" :init="tinyInit"></Editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
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
    content: "请输入内容", //内容
    type: "", //分类
    star: 0, //点赞
    titleImg: "" //图片
  };
  private tinyInit: any = {
    height: 300,
    skin_url: "/tinymce/skins/ui/oxide",
    plugins: "link lists image code table wordcount",
    toolbar:
      "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
    branding: false
  };
  mounted(): void {}
  private async onSubmit(): Promise<void> {
    await this.$https.post(this.$urls.add, this.form, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }
}
</script>
<style lang="less" scoped>
.article {
  margin: 0 auto;
  width: 80%;
  .input_large {
    width: 80%;
  }
  .input_middle {
    width: 50%;
  }
  .input_small {
    width: 30%;
  }
}
</style>