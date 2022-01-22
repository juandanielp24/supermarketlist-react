import React, {useEffect, useState} from "react";
import {Button, VStack, Text, Stack, Input} from "@chakra-ui/react";

const initialValues = () => {
  const localProducts = typeof window !== "undefined" ? localStorage.getItem("marketlist") : null;

  if (typeof localProducts === "string") {
    const parseProducts = JSON.parse(localProducts);

    return parseProducts;
  } else {
    return [];
  }
};

const IndexRoute: React.FC = () => {
  const [products, setProducts] = useState<string[]>(initialValues);

  useEffect(() => {
    localStorage.setItem("marketlist", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (event: any) => {
    event.preventDefault();

    const textProduct = event.target["productInput"].value;

    if (!textProduct || products.includes(textProduct)) return;

    setProducts((products) => products.concat(textProduct));

    event.target["productInput"].value = "";
  };

  const handleRemoveProduct = (index: number) => {
    setProducts((products) => products.filter((product, productIndex) => productIndex !== index));
  };

  return (
    <VStack>
      <Stack paddingBottom={4}>
        <Text fontSize="xl">{products.length} items(s)</Text>
      </Stack>
      <Stack width="80%">
        <form onSubmit={handleAddProduct}>
          <Stack direction="row" paddingBottom={4}>
            <Input name="productInput" placeholder="Product" type="text" />
            <Button colorScheme="primary" type="submit">
              Add item
            </Button>
          </Stack>
        </form>
      </Stack>
      {products.length ? (
        products.map((product, index) => (
          <Stack
            key={index}
            alignItems="center"
            borderColor="gray.100"
            borderRadius="md"
            borderWidth={1}
            direction="row"
            justifyContent="space-between"
            padding={3}
            width="80%"
          >
            <Text>{product}</Text>
            <Button colorScheme="red" variant="link" onClick={() => handleRemoveProduct(index)}>
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
