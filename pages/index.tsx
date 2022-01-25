import React, {FormEvent, useEffect, useState} from "react";
import {Button, VStack, Text, Stack, Input, Spinner} from "@chakra-ui/react";

import api from "../item/api";
import {Item} from "../item/types";

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
      //setStatus(Status.success);
    });
  }, []);

  const handleAddItem = (event: FormEvent<Form>) => {
    event.preventDefault();

    //const textProduct = event.target["productInput"].value;
    const text = event.currentTarget.productInput.value.trim();

    //if (!textProduct || items.includes(textProduct)) return;
    if (!text) return;

    //setItems((items) => items.concat(textProduct));
    api.create(text).then((item) => {
      setItems((items) => items.concat(item));
    });

    //event.target["productInput"].value = "";
    event.currentTarget.productInput.value = "";
  };

  const handleRemoveItem = (id: Item["id"]) => {
    //setItems((items) => items.filter((item, itemIndex) => itemIndex !== index));
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
          <Stack
            key={item.id}
            alignItems="center"
            borderColor="gray.100"
            borderRadius="md"
            borderWidth={1}
            direction="row"
            justifyContent="space-between"
            padding={3}
            width="80%"
          >
            <Text>{item.text}</Text>
            <Button colorScheme="red" variant="link" onClick={() => handleRemoveItem(item.id)}>
              delete
            </Button>
          </Stack>
        ))
      ) : (
        <Text color="gray.500">There are no products in the list</Text>
      )}
    </VStack>
  );
};

export default IndexRoute;
