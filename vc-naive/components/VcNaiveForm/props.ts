import type { PropType } from 'vue'
import { GridProps } from 'naive-ui'
import { VcNaiveFormSchemas } from './type'
import { NForm } from 'naive-ui'

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
