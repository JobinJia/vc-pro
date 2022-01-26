<script setup lang="ts">
  import { defineSchema, VcAntFormSchemas } from '..'
  import VcAntForm from '..'
  import { Button as AButton } from 'ant-design-vue'
  import 'ant-design-vue/dist/antd.css'

  const options = [
    {
      value: 'jack',
      label: 'Jack'
    },
    {
      value: 'lucy',
      label: 'Lucy'
    },
    {
      value: 'disabled',
      label: 'Disabled',
      disabled: true
    },
    {
      value: 'yiminghe',
      label: 'Yiminghe'
    }
  ]

  const schemas: VcAntFormSchemas = [
    defineSchema({
      field: 'inputVal',
      component: 'AInput',
      formItemProps: {
        label: 'AInput',
        labelAlign: 'left'
      }
    }),
    defineSchema({
      field: 'selectVal',
      component: 'ASelect',
      formItemProps: {
        label: 'ASelect',
        labelAlign: 'left'
      },
      componentProps: {
        options: options
      }
    })
  ]
</script>

<template>
  <VcAntForm :schemas="schemas" :label-col="{ span: 3 }">
    <template #formAction>
      <AButton type="primary">按钮1</AButton>
      <AButton type="ghost">按钮2</AButton>
    </template>
  </VcAntForm>
</template>

<style scoped lang="less"></style>
