<script lang="ts">
  import { computed, defineComponent, PropType, ref, unref } from 'vue'
  import { Form, FormItem, Space } from 'ant-design-vue'
  import { formProps } from 'ant-design-vue/es/form'
  import { VcAntFormProps } from './type'
  import { omit, merge } from 'lodash-es'
  import { useAntFormModel } from './composables/useAntFormModel'
  import VcAntFormItem from './VcAntFormItem'

  // const formProps = Form.props
  export const vcAntFormProps = {
    ...formProps,
    model: {
      type: Object as PropType<VcAntFormProps['model']>
    },
    schemas: {
      type: Object as PropType<VcAntFormProps['schemas']>,
      required: true
    }
  }

  export default defineComponent({
    name: 'VcAntForm',
    components: {
      AForm: Form,
      AFormItem: FormItem,
      VcAntFormItem,
      NSpace: Space
    },
    props: {
      ...vcAntFormProps
    },
    setup(props) {
      const innerProps = ref<Partial<VcAntFormProps>>({})
      const proxyProps = computed((): VcAntFormProps => {
        // @see https://github.com/microsoft/TypeScript/issues/34933
        // maybe ts version 4.6.0 can resolve it
        // @ts-ignore
        return merge({}, props, unref(innerProps)) as VcAntFormProps
      })

      // form model
      const { modelRef } = useAntFormModel(proxyProps)

      return {
        antFormProps: computed(() => {
          return omit(unref(proxyProps), 'model', 'schemas')
        }),
        proxyProps,
        modelRef
      }
    }
  })
</script>

<template>
  <AForm v-bind="antFormProps" :model="modelRef">
    <AFormItem
      v-for="schema in proxyProps.schemas"
      :key="schema.field"
      v-bind="schema.formItemProps"
    >
      <VcAntFormItem v-model:form-model-ref="modelRef" :schema="schema" />
    </AFormItem>
    <AFormItem :wrapper-col="{ span: 14, offset: 4 }">
      <NSpace>
        <slot name="formAction"></slot>
      </NSpace>
    </AFormItem>
  </AForm>
</template>

<style scoped></style>
