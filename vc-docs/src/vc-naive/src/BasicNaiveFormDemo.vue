<script setup lang="tsx">
  import { defineSchema, VcNaiveFormSchemas } from '../../../../vc-naive/components/VcNaiveForm'
  // import { defineSchema, VcNaiveFormSchemas } from '@vc-view/vc-naive/components/VcNaiveForm'
  import { NRadio } from 'naive-ui'
  import VcNaiveForm from '../../../../vc-naive/components/VcNaiveForm'

  const radioOptions = [
    {
      value: "Rock'n'Roll Star",
      label: "Rock'n'Roll Star"
    },
    {
      value: 'Shakermaker',
      label: 'Shakermaker'
    }
  ]

  const schemas: VcNaiveFormSchemas = [
    defineSchema({
      field: 'inputVal',
      component: 'NInput',
      formItemProps: {
        label: '啊Label1'
      }
    }),
    defineSchema({
      field: 'radioVal',
      component: 'NRadioGroup',
      formItemProps: {
        label: '啊Label2'
      },
      componentSlots: {
        default: () => {
          return radioOptions.map((radio) => {
            return (
              <NRadio key={radio.value} value={radio.value}>
                {radio.label}
              </NRadio>
            )
          })
        }
      }
    })
  ]
</script>

<template>
  <VcNaiveForm :schemas="schemas" />
</template>

<style scoped lang="less"></style>
