<script lang="ts">
  import { defineComponent, ref, computed, unref, Ref } from 'vue'
  import { VcNaiveFormExpose, VcNaiveFormProps } from './type'
  import { merge, omit } from 'lodash-es'
  import { useNaiveFormModel } from './composables/useNaiveFormModel'
  import { vcNaiveFormProps } from './props'
  import { NForm, NGrid, NFormItemGi, NSpace } from 'naive-ui'
  import VcNaiveFormItem from './VcNaiveFormItem'
  import { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/lib/form/src/interface'

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
        innerProps.value = merge(innerProps.value, unref(updProps))
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
        <VcNaiveFormItem :schema="schema" :form-model-ref="modelRef" />
      </NFormItemGi>
      <NFormItemGi v-if="$slots.formAction" suffix style="margin-left: auto">
        <NSpace justify="end">
          <slot name="formAction"></slot>
        </NSpace>
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>
