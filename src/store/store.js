import { configureStore } from "@reduxjs/toolkit";
import user_reducer from "./reducer/users";
import customer_reducer from "./reducer/customers";
import product_reducer from "./reducer/products";
import grouping_reducer from "./reducer/groupings";
import productBase_reducer from "./reducer/productBase";
import prices_reducer from "./reducer/prices";
import check_reducer from "./reducer/checks";
import comprobante_check_reducer from "./reducer/comprobanteCheck"

export default configureStore({
  reducer: {
    users: user_reducer,
    customers: customer_reducer,
    products: product_reducer,
    groupings: grouping_reducer,
    productBase: productBase_reducer,
    prices: prices_reducer,
    checks: check_reducer,
    comprobantesCheck: comprobante_check_reducer,
  },
});
