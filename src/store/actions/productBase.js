import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/apiUrl";

const read_products_base = createAsyncThunk(
  "read_products_base",
  async (obj) => {

    //callback que realiza la petición
    try {
      let data = await axios(
        apiUrl + "productsbase?codigoBarras=" + obj
      );

      return {
        productBase: data.data.response,
      };
    } catch (error) {
      return {
        productBase: {},
      };
    }
  }
);

const create_product_base = createAsyncThunk(
  "create_product_base", //nombre de la accion
  async (obj) => {
    //callback que realiza la petición
    try {
      let data = await axios.post(apiUrl + "productsbase", obj);
      return {
        productBase: data.data.response,
        messages: [],
      };
    } catch (error) {
      return {
        productBase: false,
        messages: error.response.data.messages || [error.response.data.message],
      };
    }
  }
);



/* const destroy_customer = createAsyncThunk(
  "destroy_customer", //nombre de la accion
  async (obj) => {
    //callback que realiza la petición
    try {
      let data = await axios.delete(apiUrl + "customers/" + obj._id);

      return {
        customer: data.data.response,
        messages: [],
      };
    } catch (error) {
      return {
        customer: {},
        messages: error.response.data.messages || [error.response.data.message],
      };
    }
  }
); */

const productBase_actions = { read_products_base, create_product_base };
export default productBase_actions;
