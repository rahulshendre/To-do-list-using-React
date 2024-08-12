import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import delete_icon from '../assets/delete.png';
import Todoitems from './Todoitems';

const Todo = () => {
    const [todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")):[]);

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
        
        if (inputText === "") {
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        };
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    };

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const toggle = (id) =>{
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })

    }
useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList))
}, [todoList])
    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
            {/* -------- title -------- */}
            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="Todo Icon" />
                <h1 className='text-3xl font-semibold'>To-do list</h1>
            </div>

            {/* -------- input-box -------- */}
            <div className='flex items-center my-7 bg-gray-200 rounded-full'>
                <input 
                    ref={inputRef} 
                    className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' 
                    type="text" 
                    placeholder='Add your task' 
                />
                <button onClick={add} className='border-none rounded-full bg-slate-500 w-32 h-14 text-white text-lg font-medium cursor-pointer'>
                    Add +
                </button>
            </div>

            {/* -------- todo list -------- */}
            <div>
                {todoList.map((item, index) => (
                    <Todoitems 
                        key={index} 
                        text={item.text} 
                        id={item.id} 
                        isComplete={item.isComplete} 
                        deleteTodo={deleteTodo}
                        delete_icon={delete_icon} // Pass delete_icon as a prop here
                        toggle={toggle}
                    />
                ))}
            </div>
        </div>
    );
}

export default Todo;
