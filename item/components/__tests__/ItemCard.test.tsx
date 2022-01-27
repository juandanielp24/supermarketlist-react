import * as React from "react";
import {fireEvent, render, screen} from "@testing-library/react";

import ItemCard from "../ItemCard";
import {Item} from "../../types";

const item: Item = {
  id: 123456,
  text: "salchichon",
};

test("deberia mostrar el texto del item y boton delete", () => {
  render(<ItemCard item={item} onRemove={jest.fn()} />);

  expect(screen.getByText(item.text)).toBeInTheDocument();
  expect(screen.getByText("delete")).toBeInTheDocument();
});

test("deberia ejecutar onRemove cuando clickeo delete", () => {
  const onRemove = jest.fn();

  render(<ItemCard item={item} onRemove={onRemove} />);

  fireEvent.click(screen.getByText("delete"));

  expect(onRemove).toHaveBeenCalled();
});
