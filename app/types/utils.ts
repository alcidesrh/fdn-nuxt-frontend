import { User } from './user';
import { Collection } from './collection';

export type Metadata = {
    resource: string;
    entity: string;
    singular: string;
    plural: string;
    query: {
        get: string;
        create: string;
        update: string;
        delete: string;
        collection: string;
        form: string;
    };
    updateExclude: Array<string>;
    routes: {
        list: string;
        create: string;
        edit: string;
    };
};

export type Store = {
    item: Ref<Menu, User>;
    formkitSchema: Ref<Array<Record<any, any>>>;
    metadata: Ref<Metadata>;
    collection: Ref<Collection>;
    setFormkitSchema: () => Record<any, any>;
    resource: (arg: Record<string, string>) => void;
    removeMultiple: (items: Ref<Array<any>>) => void;
    remove: (any) => void;
};
