import './App.sass'
import { useState, useEffect } from 'react'
import { createNewTask, postCompletedTasks } from './reducers/taskReducer'
import { useAppSelector, useAppDispatch } from './helpers/hooks'
import TaskItem from './components/TaskItem'
import Sidebar from './components/Sidebar'
import { Status } from './types/types'

function App() {

  const dispatch = useAppDispatch()
  const [newTaskTitle, setNewTaskTitle] = useState<string>("")
  const [hoveredTask, setHoveredTask] = useState<string>('')
  const tasks = useAppSelector(state => state.tasks.tasks)
  const [filtertype, setFiltertype] = useState<Status | null>(null)

  // On every change update we sent list of completed tasks
  useEffect(() => {
    dispatch(postCompletedTasks(tasks.filter(task => task.status == Status.Completed).map(task => task.title)))
  }, [tasks, dispatch])

  const createTask = () => {
    if (newTaskTitle.length > 30) {
      alert("Task length is too long")
      return;
    }
    dispatch(createNewTask({title: newTaskTitle}))
    setNewTaskTitle("")
  }

  const changeFilter = () => {
    if (filtertype == null) {
      setFiltertype(Status.Completed)
    }
    else if (filtertype == Status.Completed) {
      setFiltertype(Status.Started)
    }
    else if (filtertype == Status.Started) {
      setFiltertype(Status.Awaits)
    }
    else {
      setFiltertype(null)
    }
  }

  return (
    <div className='app'>
      <Sidebar/>
      <div className='content'>
        <button className='filter' onClick={changeFilter}>{filtertype ? filtertype + " ": "All" + " "}tasks</button>
        <div className='tasklist'>
          {tasks.filter(task => !filtertype || task.status === filtertype).map((task, indx) =>
            <TaskItem indx={indx} key={task.id} task={task} isHovered={hoveredTask == task.id} setOnHover={(id: string) => setHoveredTask(id)}/>  
          )}
        </div>
        <div className='addTask'>
            <input type="text" className='input' placeholder='Add new Task...' value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}/>
            <button className='addTaskButton' style={!newTaskTitle.length ? {color: "gray"} : {}} onClick={createTask} disabled={newTaskTitle.length == 0}>+</button>
        </div>
      </div>
    </div>
  )
}

export default App
