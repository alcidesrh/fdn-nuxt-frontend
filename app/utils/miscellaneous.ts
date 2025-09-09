import { useChangeCase } from "@vueuse/integrations/useChangeCase.mjs";
import type { Collection } from "~/types/collection";
import voca from "voca";

export const str = voca;

export const random = (number = false, length = 5) =>
  Array.from({ length }, () => Math.floor(Math.random() * 256)).join("");

export const getAlertText = (type: string, target: {} | null = null) => {
  switch (type) {
    case "update":
      return `Actualizado correctamente.`;
    case "remove":
      return `Se eliminará: <b>${target}</b>.`;
    case "remove_after":
      return target
        ? `Se ha eliminado <b>${target}</b> correctamente.`
        : `Se ha eliminado correctamente.`;
    case "remove_multiple":
      return `Se eliminaran ${target}.`;

    default:
      return "";
  }
};

export const highlighted = (collection: Collection): void => {
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

      if (typeof properties[property] == "undefined") {
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
    if (typeof e == "object") {
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

export const treeKey = (items: {}[], l = 0, key = "") => {
  const data = [];
  let key2 = "";
  items.forEach((v: any, i) => {
    key2 = key != "" ? key + "-" + i : `${i}`;
    if (v.name) {
      const words = str(v.name).capitalize().words();
    }
    const label =
      str(v.name).capitalize().words().join(" ") ||
      str.capitalize(v?.meta?.label);
    const temp: any = { key: key2, label: label, path: v.path, name: v.name };

    if (v.children) {
      temp.children = treeKey(v.children, l + 1, key2);
    }

    data.push(temp);
  });
  return data;
};

export const gLoading = ref(false);
