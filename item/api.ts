import {Item} from "./types";

export default {
  list: (items: Item[]): Promise<Item[]> => Promise.resolve(items),
  create: (text: Item["text"]): Promise<Item> => Promise.resolve({id: +new Date(), text}),
  remove: (id: Item["id"]): Promise<Item["id"]> => Promise.resolve(id),
};
