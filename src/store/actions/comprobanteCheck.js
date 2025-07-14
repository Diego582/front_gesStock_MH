import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/apiUrl";


const add_comprobante_check = createAsyncThunk(
    "add_comprobante_check", //nombre de la accion
    async (obj) => {
        //callback que realiza la petición
        try {

            let data = await axios.post(apiUrl + "productssales", obj);
            return {
                compCheck: data.data.response,
                messages: [],
            };
        } catch (error) {
            return {
                compCheck: {},
                messages: error.response.data.messages || [error.response.data.message],
            };
        }
    }
);


const destroy_comprobante_check = createAsyncThunk(
    "destroy_comprobante_check", //nombre de la accion
    async (obj) => {
        //callback que realiza la petición
        try {
            let data = await axios.delete(apiUrl + "productssales/" + obj._id);


            return {
                compCheck: data.data.response,
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

const destroy_comprobantes_check = createAsyncThunk(
    "destroy_comprobante_check", //nombre de la accion
    async () => {
        //callback que realiza la petición
        try {

            return {
                checks: [],
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

const reset_comprobanteCheck_store = createAction("reset_comprobanteCheck_store");


const comprobante_check_actions = {
    add_comprobante_check, destroy_comprobante_check, destroy_comprobante_check, reset_comprobanteCheck_store
};
export default comprobante_check_actions;