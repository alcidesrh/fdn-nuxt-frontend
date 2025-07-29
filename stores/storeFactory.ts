// src/stores/resourceStoreFactory.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Define a generic type for resources
interface Resource {
    id: string;
    [key: string]: any; // Flexible for additional properties
}

// Factory function to create a store
export function storeFactory<T extends Resource>(storeId: string, initialData: T[] = []) {
    return defineStore(storeId, () => {
        // State
        const collection = ref<T[]>(initialData);

        // Actions
        function addItem(item: T) {
            collection.value.push(item);
        }

        function removeItem(id: string) {
            collection.value = collection.value.filter((item) => item.id !== id);
        }

        // Getters
        const getItemById = (id: string) => {
            return collection.value.find((item) => item.id === id);
        };

        return {
            collection,
            addItem,
            removeItem,
            getItemById
        };
    });
}
