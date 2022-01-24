import { inject, InjectionKey, provide, readonly, ref, unref, watch } from 'vue'
import { MaybeRef } from '@vc-pro/shared/dist/interface'
import { merge } from 'lodash-es'

export type SetState<T> = (payload: Partial<T>) => void

/**
 * use
 * @param injectKey
 * @param payload
 * interface State {[key: string]: unknown}
 * const injectKey:InjectionKey<State> = Symbol()
 * // ref object
 * const state = ref<>({})
 * createContext
 */

export function createContext<T extends { [key: string]: any }>(
  injectKey: InjectionKey<MaybeRef<T>>,
  payload: MaybeRef<T>,
  setStateInjectKey?: InjectionKey<SetState<T>>
) {
  const state = ref<T>({} as T)

  //  payload is reactivity object or normal object
  watch(
    () => payload,
    (data) => {
      const val: T = unref(payload)
      state.value = val
    },
    {
      immediate: true,
      deep: true
    }
  )

  function setState(payload: Partial<T>) {
    merge(state.value, state.value, payload)
  }

  // do provide
  provide<T>(injectKey, readonly(state.value))

  // If createContext function args has setStateInjectKey, add setState to provide
  if (setStateInjectKey) {
    provide<SetState<T>>(setStateInjectKey, setState)
  }

  // use
  return {
    state,
    setState
  }
}

export function useContext<T extends { [key: string]: any }>(
  injectKey: InjectionKey<T>,
  setStateKey?: InjectionKey<SetState<T>>
): {
  state: T
  setState?: SetState<T> | null
} {
  const state = inject<T>(injectKey) as T
  return {
    state,
    setState: setStateKey ? (inject<SetState<T>>(setStateKey) as SetState<T>) : null
  }
}
