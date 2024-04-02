import { PagedCollection } from "~~/types/collection";
import { FetchAllData, FetchItemData } from "~~/types/api";
import { Ref } from "vue";
import { View } from "~~/types/view";
import { UseFetchOptions } from "#app";
import { SubmissionErrors } from "~~/types/error";
import { Item } from "~~/types/item";

const MIME_TYPE = "application/json";

async function useApi<T>(
  path: string,
  options: UseFetchOptions<T> = {},
  method: "POST"
) {
  const response = await useFetch(path, {
    baseURL: ENTRYPOINT,
    mode: "no-cors",
    headers: {
      Accept: MIME_TYPE,
    },
    onResponseError({ response }) {
      const data = response._data;
      const error = data["hydra:description"] || response.statusText;

      throw new Error(error);
    },
    method: method,
    ...options,
  });

  return response;
}

export async function useUserLogin<T>(
  user: Record<string, string>,
  resource: string = "/login"
) {
  const data = {
    username: user.username,
    password: user.password,
  };
  return await $fetch("/login", {
    baseURL: ENTRYPOINT,
    method: "POST",
    headers: {
      Accept: MIME_TYPE,
      "Content-Type": MIME_TYPE,
    },
    body: JSON.stringify(data),
    // onResponseError({ response }) {

    // return response

    // const data = response._data;
    //   const error = data["hydra:description"] || response.statusText;
    // throw new Error(error);
    // },

    // ...options,
  });
}
