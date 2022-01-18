import { FormProps, InputProps, SelectProps } from 'ant-design-vue'
import { Ref } from 'vue'

// export type VcAntFormComponentName =
//   | 'AInput'
//   | 'ASelect'
//   | 'ARadio'
//   | 'ASwitch'
//   | 'ACheckbox'
//   | 'ADatePicker'
//   | 'Slot'

export interface VcAntRunTimeComponentType {
  AInput: InputProps
  ASelect: SelectProps
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
