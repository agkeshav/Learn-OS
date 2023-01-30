import createDataContext from "./createDataContext";
import { useState } from "react";

const algoReducer = (state, action) => {
  switch (action.type) {
    case "add":
      state.process = [
        ...state.process,
        {
          arrTime: action.payload.arrTime,
          burstTime: action.payload.burstTime,
          id: state.process.length,
        },
      ];
      console.log(state.process);
      return state;
    case "schedule":
      state.scheduledProcess = state.process.slice();

      state.scheduledProcess.sort((a, b) => a.arrTime.localeCompare(b.arrTime));
      console.log(state.scheduledProcess);
      return state;

    case "clear":
      state.process = [];
      state.scheduledProcess = [];
      return state;
    default:
      return state;
  }
};

const addProcess = (dispatch) => (arrTime, burstTime) => {
  dispatch({ type: "add", payload: { arrTime, burstTime } });
};

const clear = (dispatch) => () => {
  dispatch({ type: "clear" });
};

const schedule = (dispatch) => () => {
  dispatch({ type: "schedule" });
};

export const { Context, Provider } = createDataContext(
  algoReducer,
  { addProcess, clear, schedule },
  {
    process: [],
    scheduledProcess: [],
    showProcess: true,
  }
);
