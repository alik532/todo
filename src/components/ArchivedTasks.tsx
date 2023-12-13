import {FC} from 'react'
import '../styles/ArchivedTasks.sass'
import TaskItem from './TaskItem'
import { useAppSelector } from '../helpers/hooks'

interface IArchivedTasksProps {
	isOpen: boolean,
	setIsOpen: (isOpen: boolean) => void,
}

const ArchivedTasks:FC<IArchivedTasksProps> = ({isOpen, setIsOpen}) => {

	const archivedTasks = useAppSelector(state => state.tasks.archivedTasks)

  return (
	<div className='modal' style={{display: isOpen ? "flex" : "none"}}>
		<div className='modalContent'>
			<div className='modalHead'>
				<h2 className='modalTitle'>Archived tasks:</h2>
				<button className='closeModal' onClick={() => setIsOpen(false)}>X</button>
			</div>
			<div className='archivedTaskList'>
				{archivedTasks.map((task, indx) => 
					<TaskItem key={task.id} task={task} indx={indx} isHovered={false} setOnHover={() => {return;}}/>	
				)}
			</div>
		</div>
	</div>
  )
}

export default ArchivedTasks