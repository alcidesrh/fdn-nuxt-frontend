import { OperationVariables } from '@apollo/client/core';
import { useChangeCase } from '@vueuse/integrations/useChangeCase';
import { VariablesParameter } from '@vue/apollo-composable/dist/useQuery.js';

export const random = (number = false, length = 5) => Array.from({ length }, () => Math.floor(Math.random() * 256)).join('');

export const getAlertText = (type: string, text: {} | null = null) => {
    switch (type) {
        case 'remove':
            return `Desea eliminar ${text} ?`;
        case 'remove_multiple':
            return `Se eliminaran ${text}.`;

        default:
            return '';
    }
};

export const highlighted = (collection: Ref<Collection>): void => {
    if (!CSS.highlights) {
        return;
    }

    CSS.highlights.clear();

    let properties: any = [],
        property: any = null;

    collection.value.columns.forEach((i: any, index) => {
        if (!i.schema) {
            properties.push([]);
        } else {
            property = i.schema.name;
            const highlights = document.querySelectorAll(`.highlight-${index}`);
            if (!highlights.length) {
                return;
            }

            if (typeof properties[property] == 'undefined') {
                properties[property] = [];
            }
            highlights.forEach((i) => {
                // console.log(`.highlight.${property}`);

                const iter = document.createNodeIterator(i, NodeFilter.SHOW_TEXT);
                let temp = iter.nextNode();
                if (temp) {
                    properties[property].push(temp);
                    while ((temp = iter.nextNode())) {
                        properties[property].push(temp);
                    }
                }
            });
        }
    });
    Object.keys(properties).forEach((i, index) => {
        if (properties[i].length) {
            let str = collection.value.vars[i]?.toString().trim().toLowerCase();
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
            CSS.highlights.set(`highlight-${index}`, searchResultsHighlight);
        }
    });
};

export const arrayToObject = (i, o = {}) => {
    i.forEach((e) => {
        if (typeof e == 'object') {
            Object.keys(e).forEach((k) => {
                o[k] = arrayToObject(e[k]);
                return o;
            });
        } else {
            o[e] = true;
        }
        return o;
    });
    return o;
};

export function extractObjectField(mixed: any, target, key = '', stack: any = []): any {
    if (Array.isArray(mixed)) {
        mixed.forEach((element) => {
            extractObjectField(element, target, key, stack);
        });
    } else if (typeof mixed == 'object') {
        for (var property in mixed) {
            if (mixed.hasOwnProperty(property)) {
                if (property == target) {
                    if (key && typeof mixed[property] == 'object') {
                        if (typeof mixed[property]['type'] != 'undefined' && mixed[property]['type'] == key) {
                            stack.push(mixed[property]);
                        }
                    } else {
                        stack.push(mixed[property]);
                    }
                } else if (typeof mixed[property] == 'object') {
                    extractObjectField(mixed[property], target, key, stack);
                }
            }
        }
    }
    return stack;
}

export function getColumnClass(column: Column) {
    const fields = {
        status: 'max-width: 50px;'
    };
    if (fields[column.name]) {
        column.style = fields[column.name];
    }
}

export function sortCollection(collection: Ref<Collection>, d: string) {
    const col = collection.value.columns.find((i) => i.name == d);
    if (typeof col != 'undefined') {
        d = col.name;
    }
    if (collection.value.orderField == d) {
        if (collection.value.orderType == 'ASC') {
            collection.value.orderType = 'DESC';
        } else if (collection.value.orderType == 'DESC') {
            collection.value.orderField = '';
            collection.value.orderType = '';
        }
    } else if (d) {
        collection.value.vars.page = 1;
        collection.value.orderField = d;
        collection.value.orderType = 'ASC';
    } else {
        collection.value.orderField = '';
        collection.value.orderType = '';
    }

    if (!collection.value.orderField) {
        collection.value.vars.order = [{}];
    } else {
        // const
        const order = {} as any;
        order[collection.value.orderField] = collection.value.orderType;
        collection.value.vars.order = [order];
    }
}
export function parseVariablesGraphQl(vars: Record<string, any>, resource?: any): VariablesParameter<OperationVariables> {
    const temp = {};
    if (resource) {
        resource = useChangeCase(resource, 'pascalCase').value;
    }
    Object.keys(vars).forEach((i) => {
        if (['id', 'page', 'itemsPerPage'].includes(i)) {
            temp[i] = { type: 'Int' };
        } else if ('createdAt' == i && resource) {
            temp[i] = { type: `[${resource}Filter_createdAt]` };
        } else if ('order' == i && resource) {
            temp[i] = { type: `[${resource}Filter_order]` };
        } else if ('input' == i && resource) {
            temp[i] = { type: `${resource}Input!` };
        } else {
            temp[i] = { type: 'String' };
        }
        temp[i] = { ...temp[i], value: vars[i] };
    });
    return temp;
}
export function parseFieldsGraphQl(fields: any) {
    const temp: any = [];
    let temp2 = {};
    Object.keys(fields).forEach((i) => {
        if (Array.isArray(fields[i])) {
            temp2[i] = fields[i];
            temp.push(temp2);
            temp2 = {};
        } else {
            temp.push(i);
        }
    });
    return temp;
}
