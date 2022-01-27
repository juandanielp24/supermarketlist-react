import * as React from "react";
import {Stack, Text, Button} from "@chakra-ui/react";

import {Item} from "../types";

interface Props {
  item: Item;
  onRemove: (id: Item["id"]) => void;
}

const ItemCard: React.FC<Props> = ({item, onRemove}) => {
  return (
    <Stack
      key={item.id}
      alignItems="center"
      borderColor="gray.100"
      borderRadius="md"
      borderWidth={1}
      data-testid="item"
      direction="row"
      justifyContent="space-between"
      padding={3}
      width="80%"
    >
      <Text>{item.text}</Text>
      <Button colorScheme="red" variant="link" onClick={() => onRemove(item.id)}>
        delete
      </Button>
    </Stack>
  );
};

export default ItemCard;
