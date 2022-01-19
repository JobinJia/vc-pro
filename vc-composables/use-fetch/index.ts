import { MaybeRef } from '@/shared/interface/utils-types'
import { ref, Ref, unref } from 'vue'

/**
 * useFetch(api, params, config)
 * const useFetch = useFetch(getUser, {}, {
 *   immediate: true,
 *   redo: true
 * })
 */
export type FetchApi<T> = Promise<() => T>

export type ApiParams = MaybeRef<{ [key: string]: any }>

export interface FetchConfig<T> {
  initialData?: MaybeRef<T>
  immediate?: MaybeRef<boolean>
  redo?: MaybeRef<boolean>
}

export interface UseFetchArgs<T> {
  api: FetchApi<T>
  apiParams?: ApiParams
  config?: FetchConfig<T>
}

export interface UseFetchReturn<T> {
  data: Ref<T>
  loading: Ref<boolean>
  finished: Ref<boolean>
}

// export function useFetch<T extends { [key: string]: any }>(
//   api: FetchApi<T>,
//   apiParams?: ApiParams,
//   config?: FetchConfig<T>
// ) {
//   const args = ...args
//   const data = ref<T>(unref(config?.initialData) ?? ({} as T))
//   const params = ref<{[key: string]: any}>(apiParams)
// }
