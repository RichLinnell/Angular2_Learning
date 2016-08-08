import {
	Component,
	Input,
	Pipe,
	PipeTransform,
	Directive,
	OnInit,
	HostListener
} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

interface Task {
	name: string;
	deadline: Date;
	queued: boolean;
	pomodorosRequired: number;
}

class TaskService {
	public taskStore: Array<Task> = [];

	constructor(){
		const tasks = [
		{			
			name: "Code an HTML Table",
			deadline: "June 23 2015",
			pomodorosRequired: 1
		},
		{
			name: "Sketch a wireframe for the new homepage",
			deadline: "June 24 2016",
			pomodorosRequired: 2
		},
		{
			name: "Style table with bootstrap styles",
			deadline: "June 25 2016",
			pomodorosRequired: 1
		},
		{
			name: "Reinforce SEO with custom sitemap.xml",
			deadline: "June 26 2016",
			pomodorosRequired: 3
		},
		];

		this.taskStore = tasks.map(task => {
			return {
				name: task.name,
				deadline: new Date(task.deadline),
				queued: false,
				pomodorosRequired: task.pomodorosRequired
			};
		});
	}
}
@Component({
		selector: 'pomodoro-tasks',
		styleUrls: ['pomodoro-tasks.css'],
		templateUrl: 'pomodoro-tasks.html'
	})
	class TasksComponent {
		today: Date;
		tasks: Task[];
		queuedPomodoros: number;
		queueHeaderMapping: any = {
			'=0': 'No pomodoros',
			'=1': 'One pomodoro',
			'other': '# pomodoros'
		};
		
		constructor() {
			const taskService: TaskService = new TaskService();
			this.tasks = taskService.taskStore;
			this.today = new Date();
			this.updateQueuedPomodoros();
		}

		toggleTask(task: Task): void {
			task.queued = !task.queued;
			this.updateQueuedPomodoros();
		}

		private updateQueuedPomodoros(): void {
			this.queuedPomodoros = this.tasks
				.filter((task: Task) => task.queued)
				.reduce((pomodoros: number, queuedTask: Task) => {
					return pomodoros + queuedTask.pomodorosRequired;
			}, 0);
		}
	};

bootstrap(TasksComponent);