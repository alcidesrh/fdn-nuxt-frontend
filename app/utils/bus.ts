export const msg: Record<
	'emit',
	(v: Record<'detail' | 'severity' | 'summary', string>) => void
> = useEventBus('msg');

const error = useEventBus('error');

export const merror = (msg: any) => error.emit(msg);

export function msgbus(b) {
	return useEventBus(b);
}
