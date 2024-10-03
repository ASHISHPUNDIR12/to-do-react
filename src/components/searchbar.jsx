import React from 'react'
import { useState } from 'react'


const Searchbar = () => {
    const [task, settask] = useState('')
    const [tasks, settasks] = useState([])
    const handleInputchange = (e) => {
        settask(e.target.value)
    }
    const handleTask = () => {
        settasks([...tasks, task])
        settask('')
    }
    return (
        <>
            <div>
                <input className="input" type="text" placeholder="Enter task" value={task} onChange={handleInputchange} />
                <button onClick={handleTask} className="add-btn">Add</button>
            </div>
            <ul>
                {
                    tasks.map((t, index) => {
                       return  <li key={index} >{t}</li>
                    })
                }
            </ul>
        </>
    )
}

export default Searchbar
