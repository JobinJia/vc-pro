<template>
  <div class="van-doc">
    <custom-header :header="header"></custom-header>
    <custom-nav :navs="navs"></custom-nav>
    <div class="van-doc-container van-doc-row">
      <div class="van-doc-content van-doc-content--common">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CustomNav from "vite-plugin-vue-docs/dist/template/nav.vue";
import CustomHeader from "vite-plugin-vue-docs/dist/template/header.vue";
import "vite-plugin-vue-docs/dist/template/style.css";

export default {
  components: { CustomHeader, CustomNav },
  data() {
    return {
      navs: [{"title":"使用指南","data":[{"name":"使用说明","path":"/docs"},{"name":"更新日志","path":"/docs/@vite-plugin-vue-docs/changelog"}]},{"title":"未分类组件","data":[{"name":"VcNaiveVcNaiveForm","path":"/docs/vc-naive/-vc-naive-form"}]}],
      header: {"title":"@vc-view"},
    };
  },
};
</script>
