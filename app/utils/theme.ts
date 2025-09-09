const { width } = useWindowSize();

export const isMobil = computed(() => width.value <= 768);
