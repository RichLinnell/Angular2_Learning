import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import { TIMER_DIRECTIVES } from './timer/timer';
import {TimerWidgetComponent} from './timer/timer';
import { TASKS_DIRECTIVES } from './tasks/tasks';
import {TaskComponent,TaskEditorComponent} from './tasks/tasks';
import { SHARED_PROVIDERS } from './shared/shared';
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
	selector: 'pomodoro-app',
	directives: [ROUTER_DIRECTIVES],
	providers: [SHARED_PROVIDERS, HTTP_PROVIDERS, ROUTER_PROVIDERS],
	styles: [`
		.router-link-active {
			font-weight: bold;
			border-bottom: 2px #d9534f solid;
		}`],
	templateUrl: 'app/app.component.html'
})
@RouteConfig([
	{ 
		path: '',
		name:'TaskComponent',
		component: TaskComponent
	},
	{
		path: 'tasks/editor',
		name: 'TaskEditorComponent',
		component: TaskEditorComponent
	},
	{
		path: 'timer',
		name: 'TimerComponent',
		component: TimerWidgetComponent
	}
	])
export default class AppComponent {}