import { computed, DefineComponent, defineComponent, PropType, ref, watch } from 'vue'
import { VcAntFormComponentName, VcAntFormSchema } from './type'
import { componentMap } from './componentMap'
import { isFunction } from 'lodash-es'

export default defineComponent({
  name: 'VcAntFormItem',
  props: {
    formModelRef: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    },
    schema: {
      type: Object as PropType<VcAntFormSchema<VcAntFormComponentName>>,
      required: false,
      default: () => ({})
    }
  },
  setup(props, { emit, attrs }) {
    const modelRef = ref<Record<string, any>>({})

    watch(
      () => props.formModelRef,
      (model) => {
        modelRef.value = model ?? {}
      },
      {
        immediate: true,
        deep: true
      }
    )

    watch(
      modelRef,
      (val: Record<string, any>) => {
        emit('update:formModelRef', val)
      },
      { deep: true }
    )

    const Component = computed((): DefineComponent => {
      const name = props.schema?.component ? props.schema.component : 'NInput'
      return componentMap.get(name) as DefineComponent
    })

    const comProps = computed((): Record<string, any> => {
      // 支持动态props
      const keys = Object.keys(props.schema?.componentProps ?? {})
      /**
       * componentProps: {
       *   aaa: 'aaa',
       *   xxx: (formModelRef) => {
       *     return xxx
       *   },
       *   onXXX: () => function onXXX(){}
       * }
       * 排除以on开头的，一般来说，以on开头的多为函数，所以不做处理
       */
      const innerProps = keys.reduce((resProps, key) => {
        const itemProp = props.schema?.componentProps ?? null
        if (itemProp) {
          return {
            ...resProps,
            [key]:
              isFunction(itemProp[key]) && !key.startsWith('on')
                ? itemProp[key](props.formModelRef)
                : itemProp[key]
          }
        }
        return resProps
      }, {} as Record<string, any>)
      return innerProps
    })

    const comSlots = computed(() => {
      return props.schema?.componentSlots ?? {}
    })

    return () => {
      const DynamicComponent = Component.value
      return (
        <DynamicComponent
          {...{ ...comProps.value, ...attrs }}
          v-model={[modelRef.value[props.schema?.field], 'value']}
          v-slots={comSlots.value}
        />
      )
    }
  }
})
