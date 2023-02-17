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
      state.showBar = true;
      console.log(timeLine)
      state.scheduledProcess.sort((p1, p2) =>
        p1.arrTime > p2.arrTime ? 1 : p1.arrTime < p2.arrTime ? -1 : 0
      );

      let n = state.scheduledProcess.length;
      let ct = [];
      let tat = [];
      let wt = [];

      let currTime = 0;
      let initialIdleTime = state.scheduledProcess[0].arrTime;
      for (let i = 0; i < n; i++) {
        if (currTime < state.scheduledProcess[i].arrTime) {
          currTime = state.scheduledProcess[i].arrTime;
        }
        currTime = currTime + state.scheduledProcess[i].burstTime;
        ct[i] = currTime;
      }

      initialIdleTime = state.scheduledProcess[0].arrTime - initialIdleTime;

      for (let i = 0; i < n; i++) {
        tat[i] = ct[i] - state.scheduledProcess[i].arrTime;
        wt[i] = tat[i] - state.scheduledProcess[i].burstTime;
      }

      for (let i = 0; i < n; i++) {
        ct[i] += initialIdleTime;
      }

      for (let i = 0; i < n; i++) {
        state.scheduledProcess[i].ct = ct[i];
        state.scheduledProcess[i].tat = tat[i];
        state.scheduledProcess[i].wt = wt[i];
      }

      let t = ct[n - 1];

      let timeLine = new Array(t);

      let st = new Array(n);
      st[0] = state.scheduledProcess[0].arrTime;
      for (let i = 1; i < n; i++) {
        st[i] = Math.max(
          state.scheduledProcess[i - 1].ct,
          state.scheduledProcess[i].arrTime
        );
      }

      for (let i = 0; i < t; i++) {
        timeLine[i] = -1;
      }

      for (let i = 0; i < n; i++) {
        for (
          let j = st[i];
          j < st[i] + state.scheduledProcess[i].burstTime;
          j++
        ) {
          timeLine[j] = state.scheduledProcess[i].id;
        }
      }

      state.timeLine = timeLine;

      console.log(state.scheduledProcess);
      console.log(st);
      console.log(timeLine);

      return state;

    case "clear":
      state.process = [];
      state.showBar = false;
      state.scheduledProcess = [];
      state.perArr = [];
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
    timeLine: [],
    avgWaitingTime: 0,
    avgTurnArrTime: 0,
    showProcess: true,
    showBar: false,
  }
);
