import {Slots} from "vue";
import { VcNaiveFormComponentName } from "@/vc-navie/components/VcNaiveForm/type";
import {Recordable} from "@/interface/global";

import type { FormItemProps, GridItemProps } from "naive-ui";

export type NaiveGridFormItemProps = Partial<FormItemProps & GridItemProps>

export interface BaseFormSchema {
  field: string
  component?: VcNaiveFormComponentName
  componentProps?: Recordable
  componentSlots?: (() => Slots | HTMLElement) | Slots
  formItemProps?: NaiveGridFormItemProps
}