import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITask, Status } from "../types/types";
import { v4 as idGen} from 'uuid';
import axios from "axios";

interface IReduxState {
	tasks: Array<ITask>,
	archivedTasks: Array<ITask>,
	completedProgress: number | undefined,
}

const initialState:IReduxState = {
	tasks: [],
	archivedTasks: [],
	completedProgress: undefined
}

export const postCompletedTasks = createAsyncThunk('postCompletedTasks', async (tasks: string[]) => {
    const response = await axios.post('fake/url', {completedTasks: tasks})
	console.log("fsfsd" + response.data)
    return response.data
})

export const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		changeTaskStatus: (state:IReduxState, action:PayloadAction<{taskId: string, newStatus: Status}>) => {
			const task = state.tasks.find(task => task.id == action.payload.taskId)
			if (task) {
				task.status = action.payload.newStatus
				state.completedProgress = state.tasks.filter(task => task.status == Status.Completed).length / state.tasks.length
			}
		},
		createNewTask: (state: IReduxState, action:PayloadAction<{title: string}>) => {
			state.tasks.push({title: action.payload.title, id: idGen(), description: "", status: Status.Awaits})
			state.completedProgress = state.tasks.filter(task => task.status == Status.Completed).length / state.tasks.length
		},
		changeTaskDescription: (state:IReduxState, action:PayloadAction<{taskId: string, newDescription: string}>) => {
			const task = state.tasks.find(task => task.id == action.payload.taskId)
			if (task) {
				task.description = action.payload.newDescription
			}
		},
		archiveTask: (state: IReduxState, action: PayloadAction<{taskId: string}>) => {
			const task = state.tasks.find(task => task.id == action.payload.taskId)
			if (task) {
				state.tasks = state.tasks.filter(task => task.id != action.payload.taskId)
				state.archivedTasks.push(task)
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(postCompletedTasks.fulfilled, () => {
				console.log('fullfilled')
			})
	},
})

export const {changeTaskStatus, createNewTask, changeTaskDescription, archiveTask} = taskSlice.actions

export default taskSlice.reducer