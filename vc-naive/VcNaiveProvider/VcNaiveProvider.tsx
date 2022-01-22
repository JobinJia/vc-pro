import { computed, defineComponent, PropType } from "vue";
import { createVcNaiveContext } from "@/vc-naive/VcNaiveProvider/composables/useVcNaiveProvider";

export interface VcNaiveProviderProps {
  config: {
    table: {
      dataKey: string
      pageNo: string
      pageSize: string
      total?: string
    }
  }
}

const defaultVcConfig: VcNaiveProviderProps = {
  config: {
    table: {
      dataKey: 'data',
      pageNo: 'pageNo',
      pageSize: 'pageSize',
      total: 'total'
    }
  }
}

export default defineComponent({
  name: 'VcNaiveProvider',
  props: {
    config: {
      type: Object as PropType<VcNaiveProviderProps['config']>,
      default: () => ({
        ...defaultVcConfig
      })
    }
  },
  setup(props, { slots }) {
    const provideState = computed(() => props.config)

    createVcNaiveContext(provideState)

    return () => slots.default?.()
  }
})
