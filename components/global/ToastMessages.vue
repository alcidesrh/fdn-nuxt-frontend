<template>
    <!-- <div class="card flex justify-center"> -->
    <Toast class="z-999 h-fit" position="top-center">
        <template #message="slotProps">
            <div class="p-toast-message-text u-py-xs" data-p="error" data-pc-section="messagetext">
                <div class="flex items-start gap-5">
                    <i class="pi pi-exclamation-triangle mt-2px"></i>
                    <div class="grid">
                        <span v-if="slotProps.message.summary" class="p-toast-summary" data-p="error" data-pc-section="summary">{{ slotProps.message.summary }}</span>
                        <div class="p-toast-detail font-normal" data-p="error" data-pc-section="detail">{{ slotProps.message.detail }}</div>
                    </div>
                </div>

                <div v-if="slotProps.message.file" class="u-my-2xs p-toast-detail flex gap-2 font-semibold" data-p="error" data-pc-section="detail">
                    <i class="pi pi-code"></i>

                    <div>
                        Archivo: {{ slotProps.message.file }}.
                        <span v-if="slotProps.message.line">line: {{ slotProps.message.line }}</span>
                    </div>
                </div>
            </div>
        </template>
    </Toast>

    <!-- </div> -->
</template>
<script setup lang="ts">
import { ApolloErrorOptions } from '@apollo/client/errors';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const bus = useEventBus('msg');
const error = useEventBus('error');
bus.on((msg: any) => {
    const lifetime = msg?.life === false ? {} : { life: 5000 }; // life: 5000
    toast.add({ ...lifetime, detail: msg?.msg || msg || 'Mensaje vacio.', severity: msg?.severity || 'success', summary: msg.summary || null });
});

error.on((e: any) => {
    let msg: any = {};

    try {
        const { graphQLErrors, networkError } = e?.message as ApolloErrorOptions;

        if (graphQLErrors?.length) {
            msg = { summary: graphQLErrors[0].message, message: graphQLErrors[0]?.extensions?.debugMessage, file: graphQLErrors[0]?.extensions?.file, line: graphQLErrors[0]?.extensions?.line };
        } else if (networkError) {
            msg = { message: networkError?.cause || networkError.message, summary: networkError?.cause ? networkError.message : null };
        } else {
            msg = e;
        }
    } catch (err) {
        msg = e || null;
    }

    const lifetime = msg?.life === false ? {} : { life: 0 }; // life: 5000
    toast.add({ ...lifetime, detail: msg?.message || msg || 'Ha ocurrido un error. Inténtelo de nuevo.', severity: 'error', summary: msg?.summary || 'Error:', file: msg?.file, line: msg?.line });
});
</script>

<!-- <style src="~/assets/layout/components/light/toast.css"></style>
<style src="~/assets/layout/components/dark/toast.css"></style> -->
