import React, {FormEvent, useEffect, useState} from "react";
import {Button, VStack, Text, Stack, Input, Spinner} from "@chakra-ui/react";

import api from "../item/api";
import {Item} from "../item/types";
import ItemCard from "../item/components/ItemCard";

enum Status {
  Init = "init",
  success = "success",
}

const initialValues = (): Item[] => {
  const localProducts = typeof window !== "undefined" ? localStorage.getItem("marketlist") : null;

  if (typeof localProducts === "string") {
    const parseProducts = JSON.parse(localProducts);

    return parseProducts;
  } else {
    return [];
  }
};

interface Form extends HTMLFormElement {
  productInput: HTMLInputElement;
}

const IndexRoute: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialValues);
  const [status, setStatus] = useState<Status>(Status.Init);

  useEffect(() => {
    localStorage.setItem("marketlist", JSON.stringify(items));
    setStatus(Status.success);
  }, [items]);

  useEffect(() => {
    api.list(initialValues()).then((items) => {
      setItems(items);
    });
  }, []);

  const handleAddItem = (event: FormEvent<Form>) => {
    event.preventDefault();

    const text = event.currentTarget.productInput.value.trim();

    if (!text || items.some((item) => item["text"] === text)) return;

    api.create(text).then((item) => {
      setItems((items) => items.concat(item));
    });

    event.currentTarget.productInput.value = "";
  };

  const handleRemoveItem = (id: Item["id"]) => {
    api.remove(id).then(() => setItems((items) => items.filter((item) => item.id !== id)));
  };

  if (status === Status.Init) {
    return (
      <VStack marginTop={6}>
        <Spinner />
      </VStack>
    );
  }

  return (
    <VStack>
      <Stack paddingBottom={4}>
        <Text fontSize="xl">{items.length} items(s)</Text>
      </Stack>
      <Stack width="80%">
        <form onSubmit={handleAddItem}>
          <Stack direction="row" paddingBottom={4}>
            <Input name="productInput" placeholder="Product" type="text" />
            <Button colorScheme="primary" type="submit">
              Add item
            </Button>
          </Stack>
        </form>
      </Stack>
      {items.length ? (
        items.map((item) => (
          <ItemCard key={item.id} item={item} onRemove={(id) => handleRemoveItem(id)} />
        ))
      ) : (
        <Text color="gray.500">There are no products in the list</Text>
      )}
    </VStack>
  );
};

export default IndexRoute;
