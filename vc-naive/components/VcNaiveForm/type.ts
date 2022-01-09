import type { FormProps, GridProps } from 'naive-ui'
import type { Ref } from 'vue'
import {Slots} from "vue";

export type VcNaiveFormComponentName =
  | 'NInput'
  | 'NSelect'
  | 'NRadio'
  | 'NSwitch'
  | 'NColorPicker'
  | 'NCheckbox'
  | 'NDatePicker'
  | 'Slot'

import type { FormItemProps, GridItemProps } from "naive-ui";

export type NaiveGridFormItemProps = Partial<FormItemProps & GridItemProps>

export interface NaiveFormSchema {
  field: string
  component?: VcNaiveFormComponentName
  componentProps?: Record<string, any>
  componentSlots?: (() => Slots | HTMLElement) | Slots
  formItemProps?: NaiveGridFormItemProps
}

export interface VcNaiveFormProps extends FormProps{
  model?: Record<string, any>
  schemas: NaiveFormSchema[]
  gridProps?: Partial<GridProps>
}

export interface VcNaiveFormExpose {
  values: Ref<Record<string, any>>
  updFormProps: (formProps?: Partial<VcNaiveFormProps>) => void
  getFormValue: () => Record<string, any>
  updFormValue: (updModel: Record<string, any>) => void
  validate: (args?: any) => Promise<any>
  restoreValidation: () => void
}

export interface VcNaiveFormEmit {
  (e: 'register', expose?: VcNaiveFormExpose): void
}