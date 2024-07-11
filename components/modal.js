// components/Modal.js
import React, { useState } from 'react';

const Modal = ({ show, onClose, saveToLocalStorage, Todos, setTodos, Save }) => {

    const [inputValue, setInputValue] = useState(null);

    if (!show) {
        return null;
    }

    const submit = () => {

        setTodos((prev) => [...prev, { name: inputValue, status: 0, date: new Date() }]);

    }

    console.log(Todos);

    return (
        <div>
            <div
                className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <form onSubmit={saveToLocalStorage} className="bg-white rounded-xl shadow-lg px-6 py-5 xl:w-1/4 w-3/4  ">
                    <div className="">
                        <input
                            type="text"
                            // value={Todos}
                            class="inp"
                            placeholder="Add Todos"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="border w-full py-4 px-2 rounded-md mb-10"
                            required
                        />
                    </div>

                    <div className="flex justify-center gap-10">

                        <button type='submit' onChange={(e) => setTodos(e.target.value)} onClick={() => submit()} className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-700">
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

export default Modal;
