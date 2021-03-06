import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ROUTER_DIRECTIVES,
		 Router,
		 CanActivate,
		 ComponentInstruction,
		 OnActivate,
		 CanDeactivate,
		 OnDeactivate } from '@angular/router-deprecated';
import {Task, TaskService, AuthenticationService} from '../shared/shared';


@Component({
	selector: 'pomodoro-tasks-editor',
	directives: [ROUTER_DIRECTIVES],
	templateUrl: 'app/tasks/task-editor.component.html',
	providers: [Title],
	styles: [`
    .ng-valid { border-color: #3c763d; }
    .ng-invalid { border-color: #a94442; }
    .ng-untouched { border-color: #999999; }
  `]
})

export default class TaskEditorComponent implements OnActivate, CanDeactivate, OnDeactivate{
	task: Task;
	changesSaved: boolean;

	constructor(
		private title: Title,
		private router: Router,
		private taskService: TaskService) {
			this.task = <Task>{};
		}
	
	saveTask() {
		this.task.deadline = new Date(this.task.deadline.toString());

		this.taskService.addTask(this.task);
		this.changesSaved = true;
		this.router.navigate(['TaskList']);
	}




	routerOnActivate(
		next: ComponentInstruction, prev: ComponentInstruction): void {
		this.title.setTitle('Welcome to the Task Form!');
	}
	routerCanDeactivate(
		next: ComponentInstruction,
		prev: ComponentInstruction
		): Promise<boolean> | boolean {
		return this.changesSaved || confirm('Are you sure you wanna go?');
	}
	routerOnDeactivate(): void {
		this.title.setTitle('Do you feel lika chainstore?');
	}
}