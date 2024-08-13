export function useTable() {
    const names = {
        idNumber: 'id'
    };
    const rowPerPage = ref(10);

    function getColummns(mixed: string[] | {}, remove = []) {
        if (typeof mixed == 'object') {
            return Object.keys(mixed).filter((v) => !['__typename', 'id'].includes(v));
        }
        return mixed.filter((v) => !['__typename', 'id'].includes(v));
    }
    function columnsAlias(v: string) {
        return Object.keys(names).includes(v) ? names[v] : v;
    }
    return {
        getColummns,
        columnsAlias,
        rowPerPage
    };
}
