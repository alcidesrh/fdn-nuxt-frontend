import { defineStore } from 'pinia';
import mergeDeepWith from 'ramda/es/mergeDeepWith';
import concat from 'ramda/es/concat';
import routes from '~/router.options';
import omit from 'ramda/es/omit';
import { User } from '~/types/user';

export const useUserStore = defineStore('userStore', () => {
    const { metadata, collection, itemGeneric, formkitSchema, setFormkitSchema, updateGeneric, remove, removeMultiple, iniCollection, resource, sort, formkitFields } = createStore('user');

    metadata.value.plural = 'usuarios';

    let item: Ref<User> = ref({}) as Ref<User>;

    watch(
        () => itemGeneric.value,
        (v) => {
            item.value = v as User;
        }
    );

    metadata.value.singular = 'usuario';
    collection.value.query = 'users';

    collection.value.columnClass = (c: Record<string, string>) => {
        const temp = '';
        switch (c.name) {
            case 'id':
                return `${temp} pl-5 w-180px`;
            case 'username':
                return `${temp} w-250px`;
            case 'fullName':
                return `${temp} w-250px`;
            case 'createdAt':
                return `${temp} w-435px`;
            case 'status':
                return `${temp}  w-110px`;

            default:
                if (c.action) {
                    return `${temp} min-w-60px border-r border-surface-contrast-2`;
                }
                return `${temp} min-w-200px`;
        }
    };

    collection.value.filterInputClass = (input: any) => {
        const defaultClass = { outerClass: 'mb-0! ' };
        const temp = {
            texticon_fdn: {
                id: { outerClass: 'min-w-100px max-w-130px ' },
                username: { outerClass: 'max-w-200px! ' },
                fullName: { outerClass: 'max-w-200px ' },
                status: { outerClass: 'max-w-50px ' }
            },
            datepicker_fdn: {
                inputClass: { outerClass: 'max-w-315px! ' }
            }
        };
        if (temp[input.schema.$formkit]) {
            const classes = temp[input.schema.$formkit][input.schema.name] || {};
            const inputClass = temp[input.schema.$formkit]['inputClass'] || {};

            return mergeDeepWith(concat, classes, mergeDeepWith(concat, inputClass, defaultClass));
        }
        return {};
    };

    extractObjectField(routes.routes(), 'meta', 'user').forEach((i) => {
        if (typeof i.action != 'undefined' && typeof i.route != 'undefined' && typeof metadata.value.routes[i.action] != 'undefined') {
            metadata.value.routes[i.action] = i.route;
        }
    });

    function update() {
        const { mutate, onDone } = updateGeneric({ properties: { user: { username: true } } });
        onDone(
            ({
                data: {
                    updateUser: { user }
                }
            }) => {
                const router = useRouter();
                // reload();
                router.push({ name: metadata.value.routes.list });
            }
        );
        mutate({ input: omit(['__typename', '_id'], item.value) });
    }

    return { metadata, collection, item, formkitSchema, update, resource, remove, removeMultiple, sort, iniCollection, setFormkitSchema, formkitFields };
});
