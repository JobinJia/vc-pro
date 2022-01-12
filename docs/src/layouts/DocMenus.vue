<script setup lang="tsx">
  import { MenuOption, NMenu } from 'naive-ui'
  import routes from '@/docs/src/router/routes'
  import { RouteRecordRaw, useRoute } from 'vue-router'
  import { computed, ref, watch } from 'vue'

  // const routeMenus = routes[0]

  const menuRoutes = computed((): RouteRecordRaw[] => {
    return routes[0]?.children as RouteRecordRaw[]
  })

  function getMenuOptions(routes: RouteRecordRaw[]) {
    const menus: MenuOption[] = []
    routes.forEach((it) => {
      const menuOption: MenuOption = {}
      menuOption.key = it.name as string
      menuOption.label =
        it.children && it.children.length > 0
          ? it.meta?.title
          : () => <router-link to={{ name: it.name }}>{it.meta?.title}</router-link>
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

  const route = useRoute()

  const expandKeys = ref<string[]>([])
  const currentMenu = ref<string>('')

  function setKeys() {
    const matched = route.matched
    const matchedNames = matched.map((it) => it.name as string)
    const matchLen = matchedNames.length
    const matchExpandKeys = matchedNames.slice(0, matchLen - 1)
    const openKey = matchedNames[matchLen - 1]
    expandKeys.value = matchExpandKeys
    // 处理平级模式的菜单
    if (route?.meta?.activeMenuName) {
      currentMenu.value = route.meta.activeMenuName as string
    } else {
      currentMenu.value = openKey
    }
  }

  // 展开收起
  function updateExpandKeys(keys: string[]) {
    expandKeys.value = keys
  }

  // 选中的菜单
  function updateValue(key: string) {
    currentMenu.value = key
  }

  watch(
    () => route.path,
    () => {
      setKeys()
    },
    { immediate: true }
  )
</script>

<template>
  <NMenu
    :options="menuOptions"
    :expanded-keys="expandKeys"
    :on-update:expanded-keys="updateExpandKeys"
    :value="currentMenu"
    :on-update:value="updateValue"
  />
</template>

<style scoped lang="less"></style>
