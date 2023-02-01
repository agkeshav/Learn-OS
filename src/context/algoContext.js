import createDataContext from "./createDataContext";
import { useState } from "react";

const algoReducer = (state, action) => {
  switch (action.type) {
    case "add":
      state.process = [
        ...state.process,
        {
          arrTime: parseInt(action.payload.arrTime),
          burstTime: parseInt(action.payload.burstTime),
          id: state.process.length,
        },
      ];
      console.log(state.process);
      return state;
    case "schedule":
      state.scheduledProcess = state.process.slice();

      state.scheduledProcess.sort((p1, p2) =>
        p1.arrTime > p2.arrTime ? 1 : p1.arrTime < p2.arrTime ? -1 : 0
      );

      var new_arr = [];
      var totalWaitingTime = 0;
      var totalTurnArroundTime = 0;

      new_arr = [
        ...new_arr,
        {
          arrTime: state.scheduledProcess[0].arrTime,
          burstTime: state.scheduledProcess[0].burstTime,
          compTime:
            state.scheduledProcess[0].burstTime +
            state.scheduledProcess[0].arrTime,
          turnArrTime: state.scheduledProcess[0].burstTime,
          waitingTime: 0,
        },
      ];
      totalWaitingTime += new_arr[0].waitingTime;
      totalTurnArroundTime += new_arr[0].turnArrTime;

      for (var i = 1; i < state.scheduledProcess.length; i++) {
        new_arr = [
          ...new_arr,
          {
            arrTime: state.scheduledProcess[i].arrTime,
            burstTime: state.scheduledProcess[i].burstTime,
            compTime:
              state.scheduledProcess[i].burstTime + new_arr[i - 1].compTime,
            turnArrTime:
              state.scheduledProcess[i].burstTime +
              new_arr[i - 1].compTime -
              state.scheduledProcess[i].arrTime,
            waitingTime:
              new_arr[i - 1].compTime - state.scheduledProcess[i].arrTime,
          },
        ];
        totalWaitingTime += new_arr[i].waitingTime;
        totalTurnArroundTime += new_arr[i].turnArrTime;
      }

      state.scheduledProcess = new_arr;
      state.avgWaitingTime = totalWaitingTime / state.scheduledProcess.length;
      state.avgTurnArrTime =
        totalTurnArroundTime / state.scheduledProcess.length;

      var perArr = [];
      const totalTime =
        state.scheduledProcess[state.scheduledProcess.length - 1].compTime;
      if (state.scheduledProcess[0].arrTime > 0) {
        perArr = [
          ...perArr,
          (state.scheduledProcess[0].arrTime / totalTime) * 100,
        ];
        for (var i = 0; i < state.scheduledProcess.length; i++) {
          perArr = [
            ...perArr,
            (state.scheduledProcess[i].burstTime / totalTime) * 100,
          ];
        }
      } else {
        for (var i = 0; i < state.scheduledProcess.length; i++) {
          perArr = [
            ...perArr,
            (state.scheduledProcess[i].burstTime / totalTime) * 100,
          ];
        }
      }

      state.perArr = perArr;

      console.log(state.scheduledProcess);
      console.log(state.perArr);
      console.log(state.process[0].arrTime + state.process[0].burstTime);
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
    perArr: [],
    avgWaitingTime: 0,
    avgTurnArrTime: 0,
    showProcess: true,
  }
);
