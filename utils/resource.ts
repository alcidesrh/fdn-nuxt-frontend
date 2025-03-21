export const getIdFromIri = (iri?: string): string => {
    if (!iri) return '';

    const id = iri.split('/').pop();

    if (!id) {
        return '';
    }

    return id;
};

export const getIriFromId = (id, entity): string => `/api/${entity}s/${id}`;
