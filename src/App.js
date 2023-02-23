import React, { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import { db } from './firebase'
import {
  query,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore'

import Todo from './Todo'

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to [#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-x1 p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
}

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [uncomplete, setUncomplete] = useState([])

  //create todo
  async function addTodo(e) {
    e.preventDefault()

    if (input === '') {
      return alert('Please enter a valid task')
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
    setInput('')
  }

  //read todo
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      let uncompleteTodos = []
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
        // console.log(todosArr)
        if (doc.data().completed === false) {
          uncompleteTodos.push({ ...doc.data(), id: doc.id })
        }
      })
      setTodos(todosArr)
      setUncomplete(uncompleteTodos)
    })
    return () => unsubscribe()
  }, [])

  //update todo
  async function toggleComplete(todo) {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    })
  }
  //delete todo
  async function deleteTodo(todo) {
    await deleteDoc(doc(db, 'todos', todo.id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={addTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            className={style.input}
            type="text"
            placeholder="Add Todo"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, i) => (
            <Todo
              key={i}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        <p className={style.count}>
          You have {uncomplete.length} tasks to complete.
        </p>
      </div>
    </div>
  )
}

export default App
