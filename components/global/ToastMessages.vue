<template>
  <!-- <div class="card flex justify-center"> -->
  <Toast class="z-999 h-fit" position="top-center">
    <template #message="slotProps">
      <i class="pi pi-exclamation-triangle"></i>
      <div class="p-toast-message-text" data-p="error" data-pc-section="messagetext"><span class="p-toast-summary"
          data-p="error" data-pc-section="summary">{{ slotProps.message.summary }}</span>
        <div class="p-toast-detail u-text-1 u-mt-s" data-p="error" data-pc-section="detail">{{
          slotProps.message.detail
        }}
        </div>
        <div v-if="slotProps.message.file" class=" u-my-2xs p-toast-detail font-semibold flex  gap-2" data-p="error"
          data-pc-section="detail">
          <i class="pi pi-code"></i>

          <div>
            Archivo: {{
              slotProps.message.file }}.
            <span v-if="slotProps.message.line">line: {{ slotProps.message.line }}</span>
          </div>
        </div>
      </div>

    </template>
  </Toast>

  <!-- </div> -->
</template>
<script setup lang="ts">
import { ApolloErrorOptions, GraphQLErrors } from "@apollo/client/errors";
import { GraphQLFormattedError } from "graphql";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const bus = useEventBus('msg')
const error = useEventBus('error')
bus.on((msg: any) => {

  const lifetime = msg?.life === false ? {} : { life: 5000 }// life: 5000 
  toast.add({ ...lifetime, detail: msg?.msg || msg || 'Mensaje vacio.', severity: msg?.severity || 'success', summary: msg.summary || 'Info:', });
})

error.on((e: any) => {

  const { graphQLErrors, networkError } = e?.message as ApolloErrorOptions

  let msg: any = {}

  if (graphQLErrors?.length) {
    msg = { summary: graphQLErrors[0].message, message: graphQLErrors[0]?.extensions?.debugMessage, file: graphQLErrors[0]?.extensions?.file, line: graphQLErrors[0]?.extensions?.line }
  } else if (networkError) {
    msg = { message: networkError?.cause || networkError.message, summary: networkError?.cause ? networkError.message : null }
  }
  else {
    msg = e
  }

  // cl(msg?.message?.cause?.extentions?.debugMessage, msg)

  const lifetime = msg?.life === false ? {} : { life: 0 }// life: 5000 
  toast.add({ ...lifetime, detail: msg?.message || msg || 'Ha ocurrido un error. Inténtelo de nuevo.', severity: 'error', summary: msg?.summary || 'Error:', file: msg?.file, line: msg?.line });
})

</script>
