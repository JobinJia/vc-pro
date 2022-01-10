<script setup lang="tsx">
  import { MenuOption, NMenu } from 'naive-ui'
  import routes from '@/docs/src/router/routes'
  import { RouteRecordRaw } from 'vue-router'
  import { computed } from 'vue'

  // const routeMenus = routes[0]

  const menuRoutes = computed((): RouteRecordRaw[] => {
    return routes[0]?.children as RouteRecordRaw[]
  })

  function getMenuOptions (routes: RouteRecordRaw[]) {
    const menus: MenuOption[] = []
    routes.forEach(it => {
      const menuOption: MenuOption = {}
      menuOption.key = it.name as string
      menuOption.label = (it.children && it.children.length > 0) ? it.meta?.title : () => <router-link to={{name: it.name}}>{it.meta?.title}</router-link>
      if (it.children) {
        menuOption.children = getMenuOptions(it.children)
      }
      menus.push(menuOption)
    })
    return menus
  }

  const menuOptions = computed(() => {
    return getMenuOptions(menuRoutes.value)
  })
</script>

<template>
  <NMenu :options="menuOptions"></NMenu>
</template>

<style scoped lang="less"></style>
