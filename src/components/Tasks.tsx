import React, { Component } from 'react';
import ITask from '../types/ITask';
import Task from './Task';
import axios from 'axios';
import * as _ from "lodash";


type Props = {
    data: any,
    children?: React.ReactNode;
    updateData: Function
};

export class Tasks extends Component<Props> {
    render(): React.ReactNode {
        return (<ul className='tasks'>
            {!this.props.data ? <li>no data to show</li> :
                this.props.data.map((x: ITask) => {
                    return <Task daysToComplete={x.daysToComplete} key={x.id} description={x.description} dueDate={x.dueDate} id={x.id} isComplete={x.isComplete} hadlechange={this.hadlechange} ></Task>
                })}
        </ul>);
    }

    hadlechange = async (task: ITask) => {
        let todo_id = task.id;
        const res = await axios.patch(`https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${todo_id}`, { isComplete: !task.isComplete }, { headers: { 'X-Api-Key': 'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c' } });

        if (res.status == 200) {
            this.props.updateData(task);
        }
    }

}

export default Tasks;