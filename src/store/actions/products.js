import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/apiUrl";

const read_products = createAsyncThunk("read_products", async (obj) => {
  //callback que realiza la petición

  try {

    if (!obj.descripcion) {
      obj.descripcion = ""
    }
    if (!obj.codigoBarras) {
      obj.codigoBarras = ""
    }

    let data = await axios(apiUrl + "products?descripcion=" + obj.descripcion + "&codigoBarras=" + obj.codigoBarras);

    return {
      products: data.data.response,
    };
  } catch (error) {

    return {
      products: [],
    };
  }
});

const read_product = createAsyncThunk("read_product", async (obj) => {
  //callback que realiza la petición
  try {

    let data = await axios(
      apiUrl + "products?codigoBarras=" + obj.codigoBarras
    );

    return {
      product: data.data.response,
    };
  } catch (error) {
    return {
      product: {},
    };
  }
});

const create_product = createAsyncThunk(
  "create_product", //nombre de la accion
  async (obj) => {
    //callback que realiza la petición
    try {

      let data = await axios.post(apiUrl + "products", obj);
      return {
        product: data.data.response,
        messages: [],
      };
    } catch (error) {
      return {
        product: false,
        messages: error.response.data.messages || [error.response.data.message],
      };
    }
  }
);

const update_product = createAsyncThunk(
  "update_product", //nombre de la accion
  async (obj) => {
    //callback que realiza la petición
    try {

      let data = await axios.put(apiUrl + "prices/" + obj._id, obj.data);
      return {
        product: data.data.response,
        messages: [],
      };
    } catch (error) {
      return {
        product: false,
        messages: error.response.data.messages || [error.response.data.message],
      };
    }
  }
);


const destroy_product = createAsyncThunk(
  "destroy_product", //nombre de la accion
  async (obj) => {
    //callback que realiza la petición
    try {
      let data = await axios.delete(apiUrl + "products/" + obj._id);

      return {
        product: data.data.response,
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

const product_actions = {
  read_products,
  read_product,
  create_product,
  destroy_product,
  update_product
};
export default product_actions;
