import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../utils/apiUrl";


const create_product_sale = createAsyncThunk(
    "create_product_sale", //nombre de la accion
    async (obj) => {
        //callback que realiza la petición
        try {

            let data = await axios.post(apiUrl + "productssales", obj);
            return {
                productSale: data.data.response,
                messages: [],
            };
        } catch (error) {
            return {
                productSale: false,
                messages: error.response.data.messages || [error.response.data.message],
            };
        }
    }
);


const product_sale_actions = {
    create_product_sale,
};
export default product_sale_actions;
