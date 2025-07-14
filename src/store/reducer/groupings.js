import { createReducer } from "@reduxjs/toolkit";
import grouping_actions from "../actions/groupings";

const { read_groupings, create_grouping, destroy_grouping } = grouping_actions;

const initial_state = {
  grouping: {},
  groupings: [],
  messages: [],
};

const grouping_reducer = createReducer(initial_state, (build) =>
  build
    .addCase(read_groupings.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        groupings: action.payload.groupings,
        messages: action.payload.messages,
      };
      return new_state;
    })
    .addCase(create_grouping.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        grouping: action.payload.grouping,
        groupings: action.payload.grouping
          ? [...state.groupings, action.payload.grouping]
          : [...state.groupings],
        messages: action.payload.messages,
      };
      return new_state;
    })
    .addCase(destroy_grouping.fulfilled, (state, action) => {
      let new_state = {
        ...state,
        grouping: action.payload.grouping,
        groupings: [
          ...state.groupings.filter(
            (item) => item._id !== action.payload.grouping
          ),
        ],
        messages: action.payload.messages,
      };
      return new_state;
    })
);

export default grouping_reducer;