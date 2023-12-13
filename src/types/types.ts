export interface ITask {
	id: string,
	title: string, 
	description: string,
	status: Status
}

export enum Status {
	Completed = 'completed',
	Started = 'started',
	Awaits = 'awaits'
}