export const msg = useEventBus('msg')

const error = useEventBus('error')

export const merror = (msg: any) => error.emit(msg)

export function msgbus(b) {
  return useEventBus(b)
}
