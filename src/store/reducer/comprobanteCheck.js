import { createReducer } from "@reduxjs/toolkit";
import comprobante_check_actions from "../actions/comprobanteCheck";

const { add_comprobante_check, destroy_comprobante_check, reset_comprobanteCheck_store } = comprobante_check_actions;

const initial_state = {
    compCheck: {},
    compsChecks: [],
    messages: [],
};

const comprobante_check_reducer = createReducer(initial_state, (build) =>
    build
        .addCase(add_comprobante_check.fulfilled, (state, action) => {
            let new_state = {
                ...state,
                compCheck: action.payload.compCheck,
                compsChecks: action.payload.compCheck
                    ? [...state.compsChecks, action.payload.compCheck]
                    : [...state.compsChecks],
                messages: action.payload.messages,
            };
            return new_state;
        })

        .addCase(destroy_comprobante_check.fulfilled, (state, action) => {
            let new_state = {
                ...state,
                compCheck: action.payload.compCheck,
                compsChecks: [
                    ...state.compsChecks.filter(
                        (item) => item._id !== action.payload.compCheck
                    ),
                ],
                messages: action.payload.messages,
            };
            return new_state;
        })

        .addCase(reset_comprobanteCheck_store, () => {
            return initial_state;
        })
);

export default comprobante_check_reducer;