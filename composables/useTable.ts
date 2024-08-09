export function useTable() {
  const names = {
    idNumber: 'id',
  }
  const rowPerPage = ref(10)

  function getColummns(fields: string[], remove = []) {
    return fields.filter((v) => !['__typename', 'id'].includes(v))
  }
  function columnsAlias(v: string) {
    return Object.keys(names).includes(v) ? names[v] : v
  }
  return {
    getColummns,
    columnsAlias,
    rowPerPage,
  }
}
