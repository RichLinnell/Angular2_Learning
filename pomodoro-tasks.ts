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

@Pipe({
	name: 'pomodoroFormattedTime'
})
class FormattedTimePipe implements PipeTransform {
	transform(totalMinutes: number): string {
		let minutes: number = totalMinutes % 60;
		let hours: number = Math.floor(totalMinutes / 60);
		return `${hours}h:${minutes}m`;
	}
}

@Pipe({
	name: 'pomodoroQueuedOnly',
	pure: false
})
class QueuedOnlyPipe implements PipeTransform{
	transform(tasks: Task[], ...args: any[]): Task[] {
		return tasks.filter((task: Task) => {
			return task.queued === args[0];
		});
	}	
}

@Directive({
	selector: '[task]'
})
class TaskTooltipDirective {
	private defaultTooltipText: string;
	@Input() task: Task;
	@Input() taskTooltip: any;

	@HostListener('mouseover')
	onMouseOver(){
		if(!this.defaultTooltipText && this.taskTooltip){
			this.defaultTooltipText = this.taskTooltip.innerText;
		}
		this.taskTooltip.innerText = this.task.name;
	}
	@HostListener('mouseout')
	onMouseOut() {
		if(this.taskTooltip){
			this.taskTooltip.innerText = this.defaultTooltipText;
		}
	}
}

@Component({
	selector: 'pomodoro-task-icons',
	template: `<img *ngFor="let icon of icons"
					src="/assets/img/pomodoro.png"
					width="{{size}}">`
})
class TaskIconsComponent implements OnInit {
	@Input() task: Task;
	icons: Object[] = [];
	@Input() size: number;

	ngOnInit() {
		this.icons.length = this.task.pomodorosRequired;
		this.icons.fill({name: this.task.name});
	}
}
@Component({
		selector: 'pomodoro-tasks',
		directives: [TaskIconsComponent, TaskTooltipDirective],
		pipes: [FormattedTimePipe, QueuedOnlyPipe],
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