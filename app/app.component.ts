import {Component} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import { TIMER_DIRECTIVES } from './timer/timer';
import { TimerComponent } from './timer/timer';
import { TASKS_DIRECTIVES } from './tasks/tasks';
import {TaskComponent,TaskEditorComponent} from './tasks/tasks';
import { SHARED_PROVIDERS, AuthenticationService } from './shared/shared';
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { FORM_PROVIDERS } from '@angular/common';
import { LoginComponent } from './login/login';
import { SHARED_DIRECTIVES } from './shared/shared';

@Component({
	selector: 'pomodoro-app',
	directives: [ROUTER_DIRECTIVES, SHARED_DIRECTIVES],
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
		name:'Home',
		redirectTo: ['TaskComponent']
	},
	{
		path: 'tasks',
		name: 'TaskComponent',
		component: TaskComponent,
		useAsDefault: true
	},
	{
		path: 'tasks/editor',
		name: 'TaskEditorComponent',
		component: TaskEditorComponent
	},
	{
		path: 'timer/...',
		name: 'TimerComponent',
		loader: () => {
			return new Promise(resolve => {
				setTimeout(() => resolve(TimerComponent), 2000);
			});
		}
	}, {
		path: 'login',
		name: 'LoginComponent',
		component: LoginComponent
	}
	])
export default class AppComponent {
	userIsLoggedIn: boolean;

	constructor(
		private authenticationService: AuthenticationService,
		private router : Router) {
		authenticationService.userIsLoggedIn.subscribe(isLoggedIn => {
			this.userIsLoggedIn = isLoggedIn;
		});
	}

	logout($event): void {
		$event.preventDefault();

		this.authenticationService.logout().then(success =>{
			if(success) {
				this.router.navigateByUrl('/');
			}
		});
	}
}