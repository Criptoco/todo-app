interface Task {
    id: string,
    description: string,
    dueDate: Date,
    isComplete: boolean,
    hadlechange: Function,
    daysToComplete: number
}

export default Task;