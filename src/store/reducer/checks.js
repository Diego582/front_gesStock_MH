import { createReducer } from "@reduxjs/toolkit";
import check_actions from "../actions/check";

const { read_checks, create_check, destroy_check, read_last_check, reset_check_store, read_check } = check_actions;

const initial_state = {
    check: {},
    checkLast: {},
    checks: [],
    messages: [],
};

const check_reducer = createReducer(initial_state, (build) =>
    build
        .addCase(read_checks.fulfilled, (state, action) => {
            let new_state = {
                ...state,
                checks: action.payload.checks,
                messages: action.payload.messages,
            };
            return new_state;
        })
        .addCase(read_last_check.fulfilled, (state, action) => {
            let new_state = {
                ...state,
                checkLast: action.payload.checkLast,
                messages: action.payload.messages,
            };
            return new_state;
        })

        .addCase(create_check.fulfilled, (state, action) => {
            let new_state = {
                ...state,
                check: action.payload.check,
                checks: action.payload.check
                    ? [...state.checks, action.payload.check]
                    : [...state.checks],
                messages: action.payload.messages,
            };
            return new_state;
        })
        .addCase(destroy_check.fulfilled, (state, action) => {
            let new_state = {
                ...state,
                check: action.payload.check,
                checks: [
                    ...state.checks.filter(
                        (item) => item._id !== action.payload.check
                    ),
                ],
                messages: action.payload.messages,
            };
            return new_state;
        })
        .addCase(reset_check_store, () => {
            return initial_state;
        })
        .addCase(read_check.fulfilled, (state, action) => {
            let new_state = {
                ...state,
                check: action.payload.check,
                messages: action.payload.messages,
            };
            return new_state;
        })


);

export default check_reducer;