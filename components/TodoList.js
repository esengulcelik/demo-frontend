import React, { useState, useEffect } from 'react';
import Home from '../app/page';
const TodoList = ({ Todo, handleSave, handleDelete, onClose, show, saveToLocalStorage, Todos, setTodos, Save, todo }) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (show && todo) {
            setInputValue(todo.name);
        }
    }, [show, Todo]);

    const onSave = (e) => {
        e.preventDefault();
        handleSave({ ...todo, name: inputValue });
    };

    if (!show) {
        return null;
    }
    return (
        <div>
            <div
                className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <form onSubmit={onSave} className="bg-white rounded-xl shadow-lg px-6 py-5  xl:w-1/4 w-3/4  ">
                    <div className="">
                        <input
                            type="text"
                            class="inp"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder=" "
                            className="border w-full py-4 px-2 rounded-md mb-10"
                            required

                        />
                    </div>

                    <div className="flex justify-center gap-10">
                        <button type='submit' className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-700">
                            Save
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border text-gray-700 rounded-md hover:bg-gray-300">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <div>
            </div>
        </div>
    );
};
export default TodoList;
