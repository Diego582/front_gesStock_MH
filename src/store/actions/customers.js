import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/apiUrl";


const read_customers = createAsyncThunk("read_customers", async (obj) => {
  //callback que realiza la petición
  try {
    let data = await axios(apiUrl + "customers?lastName=" + obj.lastName);

    return {
      customers: data.data.response,
    };
  } catch (error) {
    return {
      customers: [],
    };
  }
});

const read_customer = createAsyncThunk("read_customer", async (obj) => {
  //callback que realiza la petición
  try {
    let data = await axios(apiUrl + "customers/" + obj._id);

    return {
      customer: data.data.response,
    };
  } catch (error) {
    return {
      customer: {},
    };
  }
});


const create_customer = createAsyncThunk(
  "create_customer", //nombre de la accion
  async (obj) => {
    //callback que realiza la petición
    try {
      let data = await axios.post(apiUrl + "customers", obj);
      return {
        customer: data.data.response,
        messages: [],
      };
    } catch (error) {
      return {
        customer: false,
        messages: error.response.data.messages || [error.response.data.message],
      };
    }
  }
);

const destroy_customer = createAsyncThunk(
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
);

const customer_actions = { read_customers, create_customer, destroy_customer, read_customer };
export default customer_actions;
