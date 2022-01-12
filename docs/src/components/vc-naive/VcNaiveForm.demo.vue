<script setup lang="ts">
  import { NaiveFormSchema } from '@/vc-naive/components/VcNaiveForm/type'
  import { useNaiveForm } from '@/vc-naive/components/VcNaiveForm'

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

  const {
    modelRef,
    methods: { register }
  } = useNaiveForm<{
    input1: string
  }>({
    schemas: formSchemas
  })
  function handleClick() {
    modelRef.value.input1 = Math.random().toString(32).substr(4, 8)
  }

  function getData() {
    console.log(modelRef.value)
  }

  const formSchemas2: NaiveFormSchema[] = [
    {
      field: 'input2',
      component: 'NInput',
      formItemProps: {
        label: 'InputLabel',
        labelPlacement: 'left'
      }
    }
  ]

  const {
    modelRef: modelRef1,
    methods: { register: register1 }
  } = useNaiveForm<{
    input2: string
  }>({
    schemas: formSchemas2
  })
</script>

<template>
  <div>
    <VcNaiveForm @register="register"></VcNaiveForm>
    <VcNaiveForm @register="register1"></VcNaiveForm>
    <button @click="handleClick">Click</button>
    <button @click="getData">Click2</button>

    <button @click="modelRef1.input2 = Math.random().toString(32)">FORM2</button>
  </div>
</template>
