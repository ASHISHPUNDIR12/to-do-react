import React, { useState, useEffect } from 'react';

const Searchbar = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    const handleTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask('');
        }
    };

    const handleToggleCompletion = (index) => {
        const updateTasks = tasks.map((t, i) => {
            if (i === index) {
                return { ...t, completed: !t.completed };
            }
            return t;
        });
        setTasks(updateTasks);
    };

    const handleDeleteTask = (index) => {
        const updateTasks = tasks.filter((_, i) => i !== index);
        setTasks(updateTasks);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditText(tasks[index].text);
    };

    const handleSave = (index) => {
        const updateTasks = tasks.map((t, i) => {
            if (i === index) {
                return { ...t, text: editText };
            }
            return t;
        });
        setTasks(updateTasks);
        setEditingIndex(null);
        setEditText('');
    };

    const handleClearAll = () => {
        setTasks([]); // Clear the tasks array
        localStorage.removeItem('tasks'); // Clear local storage
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex space-x-2 mb-4">
                <input 
                    className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    type="text" 
                    placeholder="Enter task" 
                    value={task} 
                    onChange={handleInputChange} 
                />
                <button onClick={handleTask} className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600 transition duration-200">Add</button>
                <button onClick={handleClearAll} className="bg-red-500 text-white p-2 rounded shadow hover:bg-red-600 transition duration-200">Clear All</button>
            </div>
            <ul className="list-none">
                {tasks.map((t, index) => (
                    <li key={index} className="flex items-center justify-between border-b py-2">
                        <div className="flex items-center space-x-2">
                            <input 
                                type="checkbox" 
                                checked={t.completed} 
                                onChange={() => handleToggleCompletion(index)} 
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            {editingIndex === index ? (
                                <div className="flex items-center space-x-2">
                                    <input 
                                        type="text" 
                                        value={editText}                
                                        onChange={(e) => setEditText(e.target.value)} 
                                        className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button onClick={() => handleSave(index)} className="bg-green-500 text-white p-2 rounded shadow hover:bg-green-600 transition duration-200">Save</button>
                                </div>
                            ) : (
                                <div className="flex-1">
                                    <span className={`text-lg ${t.completed ? 'line-through text-gray-500' : ''}`}>
                                        {t.text}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex space-x-2">
                            {editingIndex !== index && (
                                <>
                                    <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 transition duration-200">Edit</button>
                                    <button onClick={() => handleDeleteTask(index)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition duration-200">Delete</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Searchbar;
