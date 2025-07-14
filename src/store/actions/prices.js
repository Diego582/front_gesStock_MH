import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/apiUrl";

const read_prices = createAsyncThunk("read_prices", async (obj) => {
  //callback que realiza la petición


  try {
    let data = await axios(apiUrl + "prices");

    return {
      prices: data.data.response,
    };
  } catch (error) {

    return {
      prices: [],
    };
  }
});

const read_price = createAsyncThunk("read_price", async (obj) => {
  //callback que realiza la petición
  try {

    let data = await axios(
      apiUrl + "prices?codigoBarras=" + obj.codigoBarras
    );

    return {
      price: data.data.response,
    };
  } catch (error) {
    return {
      price: {},
    };
  }
});

const create_price = createAsyncThunk(
  "create_price", //nombre de la accion
  async (obj) => {
    //callback que realiza la petición
    try {
    
      let data = await axios.post(apiUrl + "prices", obj);
      return {
        price: data.data.response,
        messages: [],
      };
    } catch (error) {
      return {
        price: false,
        messages: error.response.data.messages || [error.response.data.message],
      };
    }
  }
);

const update_price = createAsyncThunk(
  "update_price", //nombre de la accion
  async (obj) => {
    //callback que realiza la petición
    try {

      let data = await axios.put(apiUrl + "prices/" + obj._id, obj.data);
      return {
        price: data.data.response,
        messages: [],
      };
    } catch (error) {
      return {
        price: false,
        messages: error.response.data.messages || [error.response.data.message],
      };
    }
  }
);



const destroy_price = createAsyncThunk(
  "destroy_price", //nombre de la accion
  async (obj) => {
    //callback que realiza la petición
    try {
      let data = await axios.delete(apiUrl + "prices/" + obj._id);

      return {
        price: data.data.response,
        messages: [],
      };
    } catch (error) {
      return {
        customer: {},
        messages: error.response.data.messages || [error.response.data.message],
      };
    }
  }
);

const price_actions = {
  read_prices,
  read_price,
  create_price,
  destroy_price,
  update_price
};
export default price_actions;
