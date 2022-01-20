export function containsProp(obj: object, ...props: string[]) {
  return props.some((k) => k in obj)
}
