export function useTable() {
  const names = {
    idNumber: 'id',
  }

  function formatDate(date:string {
    return 
  }
  function columnsAlias(v: string) {
    return Object.keys(names).includes(v) ? names[v] : v
  }
  return {
    getColummns,
    columnsAlias,
  }
}
