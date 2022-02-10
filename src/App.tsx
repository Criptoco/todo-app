import React, { useState, useEffect } from 'react';
import Tasks from './components/Tasks';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import * as _ from "lodash";
import ITask from './types/ITask';
import moment from 'moment';

function App() {
  const state: ITask[] = [];
  const [data, setData] = useState(state);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get', {
        headers: {
          'X-Api-Key': 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c'
        }
      });

      setData(result.data.map((x: ITask) => {
        return calcoverdue(x);
      }));

    };
    fetchData();
  }, []);
  //update state when check or uncheck
  const updateState = (task: ITask) => {
    setData(data.map((x: ITask) => {
      if (x.id === task.id) {
        x.isComplete = !x.isComplete;
      }
      return calcoverdue(x);
    }));
  }

  const calcoverdue = (task: ITask) => {
    if (task.dueDate) {
      let dateOne = moment(task.dueDate);
      let dateTwo = moment();
      let result = dateOne.diff(dateTwo, 'days')
      task.daysToComplete = task.isComplete ? 0 : result;
    } else if (task.isComplete == false) {
      task.daysToComplete = -1;
    }
    return task;
  }

  return (
    <div>
      <div className='main'>
        <h1>Todo App </h1>
        <Tasks data={_.sortBy(data, (d: ITask) => { return d.daysToComplete }, false)} updateData={updateState} >
        </Tasks>
      </div>
    </div >
  );
}

export default App;
