import { FC, useState } from 'react'
import '../styles/Sidebar.sass'
import { useAppSelector } from '../helpers/hooks'
import ArchivedTasks from './ArchivedTasks'

const Sidebar:FC = () => {

	const progress = useAppSelector(state => state.tasks.completedProgress)
	const archivedTasks = useAppSelector(state => state.tasks.archivedTasks)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
	<div className='sidebar'>
		<ArchivedTasks isOpen={isModalOpen} setIsOpen={(isOpen) => setIsModalOpen(isOpen)}/>
		<div className='progress'>
			<h2 className='progressTitle'>Tasks progress: {progress != undefined && ((progress * 100).toFixed(0)).toString()+"%"}</h2>
			<div className='progressBar' style={progress == undefined ? {backgroundColor: "#7d7d7d"} : {backgroundColor: "white"}}>
				{progress !== undefined && <div className='fullness' style={{width: `${progress * 100}%`}}></div>}
			</div>
		</div>
		<div className='sidemenu'>
			<button className='sideButton' onClick={() => setIsModalOpen(true)}>
				<p>Archived tasks</p>
				<p>{archivedTasks.length}</p>
			</button>
		</div>
	</div>
  )

}

export default Sidebar