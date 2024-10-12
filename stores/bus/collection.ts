import { defineStore } from 'pinia';

export const useBusCollectionStore = defineStore('busList', () => {
    const { collection, params, columns } = collectionState();
    const data = ref({ loading: false });

    watch(
        () => collection.items,
        (v) => {
            highlighted();
        }
    );
    function sort(d: string) {
        const col = columns.value.find((i) => i.name == d);

        if (typeof col != 'undefined') {
            d = col.name;
        }
        if (params.value.orderField == d) {
            if (params.value.orderType == 'ASC') {
                params.value.orderType = 'DESC';
            } else if (params.value.orderType == 'DESC') {
                params.value.orderField = '';
                params.value.orderType = '';
            }
        } else if (d) {
            params.value.page = 1;
            collection.pagination.page = 1;
            params.value.orderField = d;
            params.value.orderType = 'ASC';
        } else {
            params.value.orderField = '';
            params.value.orderType = '';
        }

        if (!params.value.orderField) {
            params.value.order = [{}];
        } else {
            // const
            const order = {} as any;
            order[params.value.get(params.value.orderField)] = params.value.orderType;
            params.value.order = [order];
        }
    }

    function highlighted(): void {
        if (!CSS.highlights) {
            return;
        }

        CSS.highlights.clear();

        let properties: any = [],
            property: any = null;

        columns.value
            .filter((i) => i.schema)
            .forEach((i: any) => {
                property = i.schema.name;
                const highlights = document.querySelectorAll(`.highlight`);
                if (!highlights.length) {
                    return;
                }

                if (typeof properties[property] == 'undefined') {
                    properties[property] = [];
                }
                highlights.forEach((i) => {
                    const iter = document.createNodeIterator(i, NodeFilter.SHOW_TEXT);
                    let temp = iter.nextNode();
                    if (temp) {
                        properties[property].push(temp);
                        while ((temp = iter.nextNode())) {
                            properties[property].push(temp);
                        }
                    }
                });
            });
        Object.keys(properties).forEach((i) => {
            let str = params.value[i]?.toString().trim().toLowerCase();
            if (!str) {
                return;
            }

            const ranges = properties[i]
                .map((el) => {
                    return { el, text: el.textContent.toLowerCase() };
                })
                .map(({ text, el }) => {
                    const indices = [];
                    let startPos = 0;
                    while (startPos < text.length) {
                        const index = text.indexOf(str, startPos);
                        if (index === -1) break;
                        indices.push(index);
                        startPos = index + str.length;
                    }

                    // Create a range object for each instance of
                    // str we found in the text node.
                    return indices.map((index) => {
                        const range = new Range();
                        range.setStart(el, index);
                        range.setEnd(el, index + str.length);
                        // console.log(index, index + str.length);

                        return range;
                    });
                });
            const searchResultsHighlight = new Highlight(...ranges.flat());
            CSS.highlights.set(`highlight`, searchResultsHighlight);
        });
    }

    msgbus('collection').on((v: any) => {
        data.value.loading = v;
    });
    return { columns, collection, params, sort, data };
});
