<script lang="ts">
  import { defineComponent, ref, computed, unref, Ref, PropType } from 'vue'
  import { VcNaiveFormExpose, VcNaiveFormProps, VcNaiveFormSchemas } from './type'
  import { merge, omit } from 'lodash-es'
  import { useNaiveFormModel } from './composables/useNaiveFormModel'
  import { NForm, NGrid, NFormItemGi, NSpace } from 'naive-ui'
  import VcNaiveFormItem from './VcNaiveFormItem'
  import { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/es/form/src/interface'
  import type { GridProps } from 'naive-ui'

  const formProps = NForm.props

  export const vcNaiveFormProps = {
    ...formProps,
    schemas: {
      type: Array as PropType<VcNaiveFormSchemas>
    },
    gridProps: {
      type: Object as PropType<Partial<GridProps>>,
      default: () =>
        ({
          cols: 3,
          collapsed: false,
          collapsedRows: 1,
          responsive: 'screen',
          itemResponsive: false,
          xGap: 12,
          yGap: 0
        } as GridProps)
    }
  }

  export default defineComponent({
    name: 'VcNaiveForm',
    components: {
      NForm,
      VcNaiveFormItem,
      NGrid,
      NFormItemGi,
      NSpace
    },
    props: {
      ...vcNaiveFormProps
    },
    emits: ['register'],
    setup(props, { attrs, emit }) {
      const innerFormRefEl = ref<(HTMLElement & typeof NForm) | null>(null)
      // writable props
      const innerProps = ref<Partial<VcNaiveFormProps>>({})

      const proxyProps = computed((): VcNaiveFormProps => {
        return merge({}, props, innerProps.value) as VcNaiveFormProps
      })

      const {
        modelRef,
        methods: { resetNaiveFormModel }
      } = useNaiveFormModel(proxyProps)

      const bindNaiveFormProps = computed(() => {
        return {
          ...omit(unref(proxyProps), 'model', 'schemas', 'gridProps'),
          ...attrs,
          model: unref(modelRef)
        }
      })

      function updNaiveFormProps(
        updProps: Ref<Partial<VcNaiveFormProps>> | Partial<VcNaiveFormProps>
      ) {
        innerProps.value = merge(unref(innerProps), unref(updProps))
      }

      function resetNaiveForm() {
        innerFormRefEl.value?.restoreValidation()
        resetNaiveFormModel()
      }

      async function validate(
        validateCallback?: FormValidateCallback,
        shouldRuleBeApplied: ShouldRuleBeApplied = () => true
      ) {
        return await innerFormRefEl.value?.validate(validateCallback, shouldRuleBeApplied)
      }

      const exposeObject: VcNaiveFormExpose = {
        modelRef,
        methods: {
          updNaiveFormProps,
          resetNaiveForm,
          validate
        }
      }

      emit('register', exposeObject)

      return {
        innerFormRefEl,
        bindNaiveFormProps,
        proxyProps,
        modelRef,
        // expose
        updNaiveFormProps,
        resetNaiveForm,
        validate
      }
    }
  })
</script>

<template>
  <NForm ref="innerFormRefEl" v-bind="bindNaiveFormProps">
    <NGrid v-bind="proxyProps?.gridProps ?? {}">
      <NFormItemGi
        v-for="schema in proxyProps.schemas"
        :key="schema.field"
        :path="schema.field"
        v-bind="schema?.formItemProps ?? {}"
      >
        <VcNaiveFormItem v-model:form-model-ref="modelRef" :schema="schema" />
      </NFormItemGi>
      <NFormItemGi v-if="$slots.formAction" style="margin-left: auto">
        <NSpace justify="center">
          <slot name="formAction"></slot>
        </NSpace>
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>
