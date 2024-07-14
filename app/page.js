"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { IoSearch } from "react-icons/io5";
import { FaRegArrowAltCircleRight,FaRegArrowAltCircleDown } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GiSave } from "react-icons/gi";
import { FiEdit } from "react-icons/fi";
import Modal from '../components/modal';
import TodoList from '../components/TodoList';


export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [Showtodolist, setShowtodolist] = useState(false);
  const [Todos, setTodos] = useState([]);
  const [Todo, setTodo] = useState([]);
  const [dosya, setdosya] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const todolist = (todo) => {
    setShowtodolist(!Showtodolist);
    setSelectedTodo(todo);
  };

  useEffect(() => {
    const todosFromStorage = localStorage.getItem("Todos");
    const TodoArray = todosFromStorage ? JSON.parse(todosFromStorage) : [];
    setTodos(TodoArray);
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  };

  const handleInputChange = (e) => {
    setTodos(e.target.value);
  };

  const filteredTodos = Todos.filter(todo =>
    todo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


    //ARAMA BUTONU
    const handleSearch = () => {
      const todos = JSON.parse(localStorage.getItem('Todos')) || [];
      const filtered = todos.filter(todo =>
        typeof todo.name === 'string' && todo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log('Filtered Todos:', filtered);
    };

  //Silme İşlemi
  const handleDelete = (index) => {
    const updatedTodos = [...Todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    localStorage.setItem('Todos', JSON.stringify(updatedTodos));
  };
//statusu 0dan 1 e cevirme
  const handleUpdate = (clickedTodo) => {
    const updatedTodos = Todos.map(todo =>
      todo.date === clickedTodo.date ? { ...todo, status: todo.status === 0 ? 1 : todo.status } : todo
    );
    setTodos(updatedTodos);
    saveToLocalStorage();
  };
  //status 1den 0a cevirme
  const handleUnupdate = (clickedTodo) => {
    const updatedTodos = Todos.map(todo =>
      todo.date === clickedTodo.date ? { ...todo, status: todo.status === 1 ? 0 : todo.status } : todo
    );
    setTodos(updatedTodos);
    saveToLocalStorage();
  };
 //todoname güncelleme
 const handleSave = (updatedTodo) => {
  const updatedTodos = Todos.filter((item) => item.date === updatedTodo.date)
  const newData = updatedTodos.map((item) => {
    return {
      ...item,
      name: updatedTodo.name
    }
  });
  const savedData = [...Todos.filter((item) => item.date !== updatedTodo.date), ...newData];
  setTodos(savedData);
  saveToLocalStorage();
  setShowtodolist(false);
}

  const handleCompletedTodosClick = () => {
    setShowCompleted(!showCompleted);
  };

  const incompleteTodos = Todos.filter(todo => todo.status === 0);
  const completedTodos = Todos.filter(todo => todo.status === 1);

  return (
    <div className="flex flex-col min-h-screen items-center bg-slate-100">
      <div className="xl:w-2/5 w-3/4 flex flex-col gap-4 mx-auto max-w-3xl">
        <h1 className="text-black xl:text-4xl text-lg whitespace-nowrap xl:whitespace-normal font-semibold text-center mb-5">
          <span className="bg-gradient-to-r from-blue-400 to-emerald-600 bg-clip-text text-transparent">
            Smatyx
          </span>{" "}
          Todos App
        </h1>
        <div>
          <div className="flex xl:gap-3 gap-1">
            <div className='w-full flex relative'>
              <input
                type="search"
                placeholder="Search Todos"
                className="w-full border border-gray-300 px-4 py-4 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="xl:px-3 xl:py-3 px-2 py-2 bg-blue-600 rounded-md absolute right-2 mt-3 xl:mt-2 hover:bg-blue-800"
                onClick={handleSearch}>
                <IoSearch className="text-white xl:h-5 xl:w-5 h-3 w-3" />
              </button>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleModal}
                type="button"
                className="bg-green-700 hover:bg-green-900 xl:text-lg text-xs text-white rounded-lg xl:px-3 px-1 xl:h-10 h-6 whitespace-nowrap"
              >
                Add Todos
              </button>
            </div>
          </div>
        </div>

        {incompleteTodos.map((todo, index) => (
          <div key={todo.id} className="flex border border-gray-300 xl:px-4 xl:py-5 px-2 py-3 rounded-md mt-2.5 w-full items-center justify-between bg-white p-4 shadow">
            <span> {todo.name} </span>
            <div className='flex xl:gap-2 gap-1'>
              <button className="px-2 py-2 bg-red-600 rounded-md hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300"
                onClick={() => handleDelete(index)}>
                <RiDeleteBin5Line className="text-white xl:h-5 xl:w-5 h-3 w-3" />
              </button>
              <button onClick={() => todolist(todo)} className="px-2 py-2 bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-rose-300">
                <FiEdit className="text-white xl:h-5 xl:w-5 h-3 w-3" />
              </button>
              <button onClick={() => handleUpdate(todo)} className="px-2 py-2 bg-gray-400 rounded-md hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-rose-300">
                <GiSave className="text-white xl:h-5 xl:w-5 h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
        <div className="flex">
          <button onClick={handleCompletedTodosClick}
            type="button"
            className="flex xl:text-lg text-xs xl:gap-2 gap-1 xl:whitespace-normal whitespace-nowrap text-white bg-gray-400 focus:bg-green-800 rounded-lg xl:px-6 px-2 xl:py-2.5 py-1"
          >
            Completed Todos 1 
            {showCompleted ? (
              <FaRegArrowAltCircleDown className="xl:mt-1 mt-0.5" />
            ) : (
              <FaRegArrowAltCircleRight className="xl:mt-1 mt-0.5" />
            )}
          </button>
        </div>
      </div>

      {showCompleted && completedTodos.length > 0 && (
        <div className="mt-4 xl:w-2/5 w-3/4 flex flex-col gap-4 mx-auto max-w-3xl">
       
          {completedTodos.map((todo, index) => (
            <div key={todo.id} >
              <div className="flex border border-gray-300 xl:px-4 xl:py-5 px-2 py-3 rounded-md mt-2.5 items-center justify-between bg-white p-4 shadow">
                <span> {todo.name} </span>
                <div className='flex xl:gap-2 gap-1'>
                  <button className="px-2 py-2 bg-red-600 rounded-md hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300"
                    onClick={() => handleDelete(index)}>
                    <RiDeleteBin5Line className="text-white xl:h-5 xl:w-5 h-3 w-3" />
                  </button>
                  <button onClick={() => todolist(todo)} className="px-2 py-2 bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-rose-300">
                    <FiEdit className="text-white xl:h-5 xl:w-5 h-3 w-3" />
                  </button>
                  <button onClick={() => handleUnupdate(todo)} className="px-2 py-2 bg-gray-400 rounded-md hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-rose-300">
                    <GiSave className="text-white xl:h-5 xl:w-5 h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        show={showModal}
        onClose={toggleModal}
        saveToLocalStorage={saveToLocalStorage}
        Todos={Todos}
        setTodos={setTodos}
        handleInputChange={handleInputChange}
      />
      <TodoList
        show={Showtodolist}
        onClose={todolist}
        todo={selectedTodo}
        handleSave={handleSave}
      />
    </div>
  );
}
