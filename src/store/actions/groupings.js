import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/apiUrl";
//agrupamientos
const read_groupings = createAsyncThunk("read_groupings", async (obj) => {
  //callback que realiza la petición
  try {
    let data = await axios(apiUrl + "groupings");

    return {
      groupings: data.data.response,
    };
  } catch (error) {
    return {
      groupings: [],
    };
  }
});

const create_grouping = createAsyncThunk(
  "create_grouping", //nombre de la accion
  async (obj) => {
    //callback que realiza la petición
    try {
      let data = await axios.post(apiUrl + "groupings", obj);
      return {
        grouping: data.data.response,
        messages: [],
      };
    } catch (error) {
      return {
        grouping: false,
        messages: error.response.data.messages || [error.response.data.message],
      };
    }
  }
);

const destroy_grouping = createAsyncThunk(
  "destroy_grouping", //nombre de la accion
  async (obj) => {
    //callback que realiza la petición
    try {
      let data = await axios.delete(apiUrl + "groupings/" + obj._id);

      return {
        grouping: data.data.response,
        messages: [],
      };
    } catch (error) {
      return {
        grouping: {},
        messages: error.response.data.messages || [error.response.data.message],
      };
    }
  }
);

const grouping_actions = { read_groupings, create_grouping, destroy_grouping };
export default grouping_actions;