import { effectScope, onScopeDispose, ref, Ref, unref, UnwrapRef, watch, watchEffect } from 'vue'
import { isFunction, merge, omit } from 'lodash-es'
import { containsProp } from '@vc-pro/shared/utils'
import { MaybeRef } from '@vc-pro/shared/interface'

/**
 * useFetch(api, params, config)
 * const { data, loading } = useFetch(getUser, apiParams, { // config
 *   immediate: true,
 *   redo: true
 * })
 * or
 * const { data, loading } = useFetch(getUser, apiParams, config)
 */
export type FetchApi<T> = () => Promise<T>

export type ApiParams = MaybeRef<{ [key: string]: any }>

export interface FetchConfig<T> {
  initialData?: MaybeRef<T>
  immediate?: MaybeRef<boolean>
  redo?: MaybeRef<boolean>
}

export interface UseFetchReturn<T> {
  data: Ref<UnwrapRef<T | null>>
  loading: Ref<boolean>
  finished: Ref<boolean>
  error: Ref<unknown>
}

export function useFetch<T extends { [key: string]: any }>(api: FetchApi<T>): UseFetchReturn<T>

export function useFetch<T extends { [key: string]: any }>(
  api: FetchApi<T>,
  apiParams: ApiParams,
  config?: FetchConfig<T>
): UseFetchReturn<T>

export function useFetch<T extends { [key: string]: any }>(
  api: FetchApi<T>,
  config?: FetchConfig<T>
): UseFetchReturn<T>

export function useFetch<T extends { [key: string]: any }>(
  api: FetchApi<T>,
  ...args: any[]
): UseFetchReturn<T> {
  if (!isFunction(api)) {
    throw new Error(`the api ${api} must be function!`)
  }

  const config = ref<FetchConfig<T>>({
    initialData: {} as T,
    immediate: true,
    redo: false
  })

  const data = ref<T>({} as T)
  const loading = ref<boolean>(false)
  const finished = ref<boolean>(false)
  const apiParams = ref<ApiParams>({})
  const error = ref<unknown>(null)
  const executor = ref<(apiParams?: ApiParams) => Promise<T>>(() => Promise.resolve({} as T))

  const scope = effectScope()

  scope.run(() => {
    watchEffect(() => {
      analysisArgs()
      executor.value = createExecutor()
    })

    watch(
      apiParams,
      (params) => {
        if (unref(config).redo) {
          unref(executor)()
        }
      },
      { deep: true }
    )
  })

  onScopeDispose(() => {
    scope.stop()
  })

  // is config
  function isConfig(object: { [key: string]: any }): boolean {
    return containsProp(object, 'initialData', 'immediate', 'redo')
  }

  function analysisArgs() {
    if (args.length > 0) {
      // useFetch second params is config, current fetch not default params
      if (isConfig(args[0])) {
        config.value = {
          ...unref(config),
          ...args[0]
        }
        data.value = unref(args[0])?.initialData
      } else {
        apiParams.value = args[0]
      }
    }

    if (args.length > 1) {
      if (isConfig(args[1])) {
        data.value = unref(args[1])?.initialData
        apiParams.value = args[0]
        config.value = {
          ...unref(config),
          ...args[1]
        }
      }
    }
  }

  function createExecutor(): () => Promise<T> {
    return (params?: ApiParams) => {
      return new Promise((resolve, reject) => {
        loading.value = true
        finished.value = false
        data.value = null
        error.value = null
        const callArgs = merge({}, omit(unref(apiParams), 'initialData'), params ? params : {})
        api
          .call(callArgs)
          .then((response) => {
            error.value = null
            data.value = response
            resolve(response)
          })
          .catch((e) => {
            error.value = e
            data.value = null
            reject(error)
          })
          .finally(() => {
            loading.value = false
            finished.value = true
          })
      })
    }
  }

  if (!unref(config).immediate) {
    unref(executor)()
  }

  return {
    data,
    loading,
    finished,
    error
  }
}
