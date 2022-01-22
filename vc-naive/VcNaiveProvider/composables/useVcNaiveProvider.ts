import { createContext, useContext } from '@/vc-composables'
import { InjectionKey } from 'vue'
import { VcNaiveProviderProps } from '@/vc-naive/VcNaiveProvider/VcNaiveProvider'
import { MaybeRef } from '@/shared/interface'

export type VcNaiveProviderConfig = VcNaiveProviderProps['config']

const injectKey: InjectionKey<VcNaiveProviderConfig> = Symbol()
const setStateKey: InjectionKey<(payload: Partial<VcNaiveProviderConfig>) => void> = Symbol()

export function createVcNaiveContext(payload: MaybeRef<VcNaiveProviderConfig>) {
  return createContext<VcNaiveProviderConfig>(injectKey, payload)
}

export function useVcNaiveContext() {
  return useContext<VcNaiveProviderConfig>(injectKey, setStateKey)
}
