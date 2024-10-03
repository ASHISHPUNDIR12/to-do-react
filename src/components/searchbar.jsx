import React from 'react'
import { useState } from 'react'


const Searchbar = () => {
    const [task, settask] = useState('')
    const [tasks, settasks] = useState([])
    const handleInputchange = (e) => {
        settask(e.target.value)
    }
    const handleTask = () => {
        if(task.trim()){
        settasks([...tasks, {text : task , completed : false}])
        settask('')
    }}
    const handletogglecompletion = (index)=>{
        const updateTasks = tasks.map((t , i )=>{
            if(i=== index){
                return  {...t , completed: !t.completed}
            }
            return t ; 
        })
        settasks(updateTasks) ; 
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
                        return <li key={index} >
                          <input type="checkbox" checked = {t.completed} onChange={()=>{handletogglecompletion(index)}} />
                          <span  style={{ textDecoration: t.completed ? 'line-through' : 'none' }} >{t.text}</span>
                        </li>
                        
                    })
                }
            </ul>
        </>
    )
}

export default Searchbar
