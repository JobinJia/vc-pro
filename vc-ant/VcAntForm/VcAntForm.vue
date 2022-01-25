<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Form, FormItem } from 'ant-design-vue'
  import { formProps } from 'ant-design-vue/es/form'
  import { VcAntFormProps } from '@/vc-ant/VcAntForm/type'

  export default defineComponent({
    name: 'VcAntForm',
    components: {
      AForm: Form,
      AFormItem: FormItem
    },
    props: {
      ...formProps,
      model: {
        type: Object as PropType<VcAntFormProps['model']>
      },
      schemas: {
        type: Object as PropType<VcAntFormProps['schemas']>
      }
    },
    setup(props) {
      return {}
    }
  })
</script>

<template>
  <AForm>
    <AFormItem v-for="schema in schemas" :key="schema.field">

    </AFormItem>
  </AForm>
</template>

<style scoped></style>
