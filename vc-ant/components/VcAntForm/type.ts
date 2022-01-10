// import {BaseFormSchema} from "@/interface/form";
// import {FormProps, RowProps} from "ant-design-vue";
// import {Recordable} from "@/interface/global";
// import {Ref} from "vue";
//
// export type VcNaiveFormComponentName =
//   | 'AInput'
//   | 'ASelect'
//   | 'ARadio'
//   | 'ASwitch'
//   | 'ACheckbox'
//   | 'ADatePicker'
//   | 'Slot'
//
//
// export interface NaiveFormSchema extends BaseFormSchema {}
//
// export interface VcNaiveFormProps extends FormProps{
//   model?: Recordable
//   schemas?: NaiveFormSchema[]
//   gridProps?: Partial<GridProps>
// }
//
// export interface VcNaiveFormExpose {
//   values: Ref<Recordable>
//   updFormProps: (formProps?: Partial<VcNaiveFormProps>) => void
//   getFormValue: () => Recordable
//   updFormValue: (updModel: Recordable) => void
//   validate: (args?: any) => Promise<any>
//   restoreValidation: () => void
// }
//
// export interface VcNaiveFormEmit {
//   (e: 'register-form', expose?: VcNaiveFormExpose): void
// }
