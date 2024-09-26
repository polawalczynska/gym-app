import React, { useState, ChangeEvent } from 'react'

type Props = {}

function ToDoList({ }: Props) {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState<string>('')

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setNewTask(e.target.value);
    }

    function addTask() {
        if (newTask.trim() !== '') {
            setTasks(t => [...t, newTask]);
            setNewTask('');
        }
    }

    function deleteTask(index: number) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index: number) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index: number) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className='toDoList'>
            <h1>To Do List</h1>
            <div>
                <input
                    type='text'
                    placeholder='Enter a task...'
                    value={newTask}
                    onChange={handleInputChange} />
                <button
                    className='addButton'
                    onClick={addTask}>
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task, index) => <li key={index}>
                    <span className='text'>{task}</span>
                    <button
                        className='deleteButton'
                        onClick={() => deleteTask(index)}>
                        Delete
                    </button>
                    <button
                        className='moveButton'
                        onClick={() => moveTaskUp(index)}>
                        👆
                    </button>
                    <button
                        className='moveButton'
                        onClick={() => moveTaskDown(index)}>
                        👇
                    </button>
                </li>)}
            </ol>
        </div>
    )
}

export default ToDoList