<script setup lang="ts">
  // import { NaiveFormSchema } from '@vc-view/vc-naive/components/VcNaiveForm/type'
  import {NaiveFormSchema} from "@/vc-naive/components/VcNaiveForm/type";
  import {useNaiveForm} from "@/vc-naive/components/VcNaiveForm";

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

  const { modelRef, methods: { register } } = useNaiveForm<{
    input1: string
  }>({
    schemas: formSchemas
  })
  function handleClick () {
    modelRef.value.input1 = Math.random().toString(32).substr(4, 8)
  }

  function getData () {
    console.log(modelRef.value)
  }
</script>

<template>
  <div>
    <VcNaiveForm @register="register"></VcNaiveForm>
    <button @click="handleClick">Click</button>
    <button @click="getData">Click2</button>
  </div>
</template>

<style>
</style>
