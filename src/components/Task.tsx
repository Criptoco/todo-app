import React, { Component, useState } from 'react';
import ITask from '../types/ITask';
import moment from 'moment';


export class Task extends Component<ITask> {
    getClass(): string {
        let className = ["task"];
        className.push((this.props.isComplete ? "completed" : (this.props.daysToComplete < -1 ? 'overdued' : 'pending')));
        return className.join(" ");
    }
    render(): React.ReactNode {
        return (
            <li className={this.getClass()}>
                <input title='isComplete' type={'checkbox'} onChange={() => { this.props.hadlechange(this.props); }} checked={this.props.isComplete}
                ></input>
                <label>{this.props.description}</label>
                {this.props.dueDate ? <label className='date'>{moment(this.props.dueDate).format('MM-DD-YYYY')} </label> : ""}
            </li>);
    }
}

export default Task;