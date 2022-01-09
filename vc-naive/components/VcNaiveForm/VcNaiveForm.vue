<script lang="ts">
import {defineComponent, ref, computed, unref} from 'vue'
import {VcNaiveFormExpose, VcNaiveFormProps} from "./type";
import {merge, omit} from "lodash-es";
import {useNaiveFormModel} from "./composables/useNaiveFormModel";
import {vcNaiveFormProps} from "./props";
import {NForm, NGrid, NFormItemGi, NSpace} from "naive-ui";
import VcNaiveFormItem from "./VcNaiveFormItem";

export default defineComponent({
  name: "VcNaiveForm",
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
    console.log(props)
    const innerFormRefEl = ref<HTMLElement & typeof NForm | null>(null)
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

    const formExpose: VcNaiveFormExpose = {
      values: modelRef,
      getFormValue: (): Record<string, any> => {
        return modelRef.value
      },
      updFormProps: (formProps) => {
        formProps && merge(innerProps.value, formProps)
      },
      updFormValue: (updModel: Record<string, any>): void => {
        modelRef.value = merge(modelRef.value, updModel)
      },
      validate: async (args?: any) => {
        return modelRef.value?.validate(args)
      },
      restoreValidation: () => {
        innerFormRefEl.value?.restoreValidation()
        resetNaiveFormModel()
      }
    }

    return {
      innerFormRefEl,
      bindNaiveFormProps,
      proxyProps,
      modelRef,
      ...formExpose
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

<style scoped>

</style>