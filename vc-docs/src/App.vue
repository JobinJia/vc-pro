<script setup lang="ts">
  // import { NaiveFormSchema } from '@vc-view/vc-naive/components/VcNaiveForm/type'
  import {NaiveFormSchema} from "@/vc-naive/components/VcNaiveForm/type";

  const formSchemas: NaiveFormSchema[] = [
    {
      field: 'input1',
      component: 'NInput',
      formItemProps: {
        label: 'InputLabel',
        labelPlacement: 'left'
      }
    }
  ]
</script>

<template>
  <div>
    <VcNaiveForm :schemas="formSchemas"></VcNaiveForm>
  </div>
</template>

<style>
</style>
