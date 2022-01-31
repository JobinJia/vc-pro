<script lang="ts">
  import { computed, defineComponent, PropType, ref, unref } from 'vue'
  import { NDataTable } from 'naive-ui'
  import { TableRequest, VcDataTableProps } from '@/vc-naive/VcNaiveTable/type'
  import { merge, omit } from 'lodash-es'

  const vcDataTableProps = {
    request: {
      type: Object as PropType<TableRequest>,
      default: () => ({
        api: null,
        before: () => {},
        after: () => {}
      })
    }
  }

  export default defineComponent({
    name: 'VcNaiveTable',
    components: {
      NDataTable
    },
    props: {
      ...vcDataTableProps
    },
    setup(props) {
      const innerProps = ref<VcDataTableProps>({} as VcDataTableProps)

      const proxyProps = computed<VcDataTableProps>(() => {
        return merge({}, props, unref(innerProps))
      })

      const nDataTableProps = computed(() => {
        return omit(unref(proxyProps), 'request')
      })

      return {
        proxyProps,
        nDataTableProps
      }
    }
  })
</script>

<template>
  <div>
    <NDataTable v-bind="nDataTableProps">
      <template #empty>
        <slot name="empty" v-if="$slots?.empty"></slot>
      </template>
    </NDataTable>
  </div>
</template>
