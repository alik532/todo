import {FC, useState} from 'react'
import '../styles/TaskItem.sass'
import { ITask, Status } from '../types/types'
import { useAppDispatch } from '../helpers/hooks'
import { changeTaskStatus, changeTaskDescription, archiveTask } from '../reducers/taskReducer'
import tickSvg from '../assets/tick.svg'

interface ITaskProps {
	task: ITask,
	isHovered: boolean,
	setOnHover: (id: string) => void,
	indx: number,
}

const TaskItem:FC<ITaskProps> = ({task, setOnHover, isHovered, indx}) => {

	const dispatch = useAppDispatch()
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const [description, setDescritpion] = useState<string>(task.description)


	const handleCompleteTask = () => {
		if (task.status == Status.Completed) {
			dispatch(changeTaskStatus({taskId: task.id, newStatus: Status.Awaits}))
		}
		else {
			dispatch(changeTaskStatus({taskId: task.id, newStatus: Status.Completed}))
		}
	}

	const onUnhover = () => {
		if (!description.length) {
			setIsMenuOpen(false);
			setOnHover('')
		}
	}

	const onDescriptionChange = () => {
		if (!description.length) {
			alert("The task desciption is too short")
			return
		}
		dispatch(changeTaskDescription({taskId: task.id, newDescription: description}))
		setDescritpion("")
	}

  return (
	<div className='task' style={{background: isHovered ? "linear-gradient(45deg, #222222, #121212)" : "linear-gradient(45deg, #222222, #222222)"}} onMouseLeave={onUnhover} onMouseEnter={() => setOnHover(task.id)}>
		<div className='head'>
			<h1 className='number'>{indx+1}</h1>
			<div className='status'>
				<div className='statusDot' style={{backgroundColor: task.status == Status.Completed ? "#30e23c" : task.status == Status.Started ? "#e28030" : "white"}}></div>
				<h6 className='statusTitle'>{task.status}</h6>
			</div>
		</div>
		<div className='main'>
			<h2 className='title'>{task.title}</h2>
			{isMenuOpen && !task.description.length ? <input className='descriptionInput' value={description} onChange={(e) => setDescritpion(e.target.value)} type="text" placeholder='Type in task description...' /> : <h5 className='description'>{task.description}</h5>}
		</div>
		{description.length
			?   <div className='setDescButtons'>
					<button className='setDescription' onClick={onDescriptionChange}>Apply</button>
					<button className='cancelDescription' onClick={() => {setDescritpion(""); setOnHover('')}}>Cancel</button>
				</div> 
			: 	<div className='complete' onClick={handleCompleteTask}>
					{task.status == Status.Completed && <img className='tick' src={tickSvg} alt="" />}
				</div>
		}
		{isMenuOpen ? (!description.length && <div className='menu'>
			<button className={`taskButton toggle`} onClick={task.status == Status.Started ? handleCompleteTask : () => {dispatch(changeTaskStatus({taskId: task.id, newStatus: Status.Started}))}}>{task.status == Status.Started ? "Mark as Completed" : "Mark as Started"}</button>
			<button className={`taskButton archive`} onClick={() => dispatch(archiveTask({taskId: task.id}))}>Archive</button>
		</div>) : <div className='menuButton' style={isHovered ? {display: 'flex'} : {display: "none"}} onClick={() => setIsMenuOpen(prev => !prev)}><img className='menuIcon' src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/menu-512.png" alt="" /></div>}
	</div>
  )
}

export default TaskItem