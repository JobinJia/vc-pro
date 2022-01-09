import {VcNaiveFormExpose, VcNaiveFormProps} from "@/vc-naive/components/VcNaiveForm/type";
import {ComputedRef, ref, Ref, unref, watch, watchEffect} from "vue";

export function useNaiveForm<T extends Record<string, any>>(
  vcNaiveFormProps?:  Ref<Partial<VcNaiveFormProps>> | Partial<VcNaiveFormProps>,
  initialModel: T = {} as T
) {
  const formExpose = ref<VcNaiveFormExpose | null>(null)
  const modelRef = ref<T>(initialModel)

  function register (expose: VcNaiveFormExpose) {
    formExpose.value = expose
  }

  watchEffect(() => {
    if (vcNaiveFormProps) {
      formExpose?.value?.methods.updNaiveFormProps(vcNaiveFormProps)
    }
    modelRef.value = unref(formExpose)?.modelRef
  })

  return {
    modelRef,
    methods: {
      ...unref(formExpose),
      register
    }
  }
}