import { ComputedRef, ref, unref, watchEffect } from 'vue'
import { VcNaiveFormProps } from '../type'
import { merge } from 'lodash-es'

export function useNaiveFormModel(props: ComputedRef<VcNaiveFormProps>) {
  const modelRef = ref<Record<string, any>>({})

  watchEffect(() => {
    generateModel()
  })

  function generateModel() {
    const userModel = unref(props).model ?? {}
    const formSchemas = unref(props).schemas
    if (formSchemas && formSchemas.length > 0) {
      const modelObject = formSchemas.reduce((result, schema) => {
        const { field } = schema
        result[field] = null
        return result
      }, {} as Record<string, any>)
      modelRef.value = merge(modelObject, userModel)
    }
  }

  function resetNaiveFormModel() {
    generateModel()
  }

  return {
    modelRef,
    methods: {
      resetNaiveFormModel
    }
  }
}
