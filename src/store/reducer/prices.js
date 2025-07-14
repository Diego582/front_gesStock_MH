import { createReducer } from "@reduxjs/toolkit";
import price_actions from "../actions/prices";

const { read_prices, read_price, create_price, destroy_price, update_price } =
  price_actions;

const initial_state = {
  price: {},
  prices: [],
  messages: [],
};

const price_reducer = createReducer(initial_state, (build) =>
  build
    .addCase(read_prices.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        prices: action.payload.prices,
        messages: action.payload.messages,
      };
      return new_state;
    })
    .addCase(read_price.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        price: action.payload.price,
        messages: action.payload.messages,
      };
      return new_state;
    })
    .addCase(create_price.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        price: action.payload.price,
        prices: action.payload.price
          ? [...state.prices, action.payload.price]
          : [...state.prices],
        messages: action.payload.messages,
      };
      return new_state;
    })
    .addCase(update_price.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        price: action.payload.price,
        prices: action.payload.price
          ? [...state.prices, action.payload.price]
          : [...state.prices],
        messages: action.payload.messages,
      };
      return new_state;
    })
    .addCase(destroy_price.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        price: action.payload.price,
        prices: [
          ...state.prices.filter(
            (item) => item._id !== action.payload.price
          ),
        ],
        messages: action.payload.messages,
      };
      return new_state;
    })
);

export default price_reducer;
