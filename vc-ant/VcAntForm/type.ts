import type {
  FormProps,
  SelectProps,
  CheckboxProps,
  SwitchProps,
  TreeSelectProps,
  InputNumberProps,
  DatePickerProps,
  TimePickerProps,
  TimeRangePickerProps,
  RateProps,
  TransferProps
} from 'ant-design-vue'
import { InputProps } from 'ant-design-vue/es/input/inputProps'
import { VNode } from 'vue'

export interface VcAntRunTimeComponentType {
  AInput: InputProps
  AInputNumber: InputNumberProps
  ASelect: SelectProps
  ACheckbox: CheckboxProps
  ASwitch: SwitchProps
  ATreeSelect: TreeSelectProps
  ADatePicker: DatePickerProps
  ATimePicker: TimePickerProps
  ATimeRange: TimeRangePickerProps
  ARate: RateProps
  ATransfer: TransferProps
  Slots: VNode
}

export type VcAntFormComponentName = keyof VcAntRunTimeComponentType

export type ComponentProps<T> = T extends VcAntFormComponentName
  ? VcAntRunTimeComponentType[T]
  : never

export interface AntFormSchema {
  field: string
  component: VcAntFormComponentName
  formItemProps: FormProps
  componentProps: ComponentProps<VcAntFormComponentName>
}

// export interface VcNaiveFormProps extends FormProps {
//   model?: Recordable
//   schemas?: AntFormSchema[]
//   gridProps?: Partial<GridProps>
// }

// export interface VcNaiveFormExpose {
//   values: Ref<Recordable>
//   updFormProps: (formProps?: Partial<VcNaiveFormProps>) => void
//   getFormValue: () => Recordable
//   updFormValue: (updModel: Recordable) => void
//   validate: (args?: any) => Promise<any>
//   restoreValidation: () => void
// }

// export interface VcNaiveFormEmit {
//   (e: 'register-form', expose?: VcNaiveFormExpose): void
// }
