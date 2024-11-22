export const formkitClasses = (inputs: []): [] => {
    inputs.forEach((i: any) => {
        if (['nit', 'id'].includes(i.name)) {
            i.outerClass = 'max-w-130px!';
        }
        if (['telefono', 'id'].includes(i.name)) {
            i.number = true;
        }
        if (i.$formkit == 'multiselect_fdn') {
            // i.labelClass = 'alcides';
        }
    });

    return inputs;
};
