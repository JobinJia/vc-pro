<script setup lang="ts">
  import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
  import DocMenus from './DocMenus.vue'
</script>

<template>
  <n-layout has-sider class="doc-layout">
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="0"
      :width="200"
      :show-collapsed-content="false"
      show-trigger="arrow-circle"
      bordered
    >
      <DocMenus />
    </n-layout-sider>
    <n-layout-content bordered content-style="padding: 24px;">
      <router-view />
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang="less">
  .doc-layout {
    height: 100%;
  }
</style>
