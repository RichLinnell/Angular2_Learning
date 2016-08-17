import Queueable from './interfaces/queueable';
import Task from './interfaces/task';

import QueuedOnlyPipe from './pipes/queued-only.pipe';
import FormattedTimePipe from './pipes/formatted-time.pipe';

import AuthenticationService from './services/authentication.service';
import TaskService from './services/task.service';
import SettingsService from './services/settings.service';

import RouterOutletDirective from './directives/router-outlet.directive';

const SHARED_PIPES: any[] = [
	FormattedTimePipe,
	QueuedOnlyPipe
];

const SHARED_PROVIDERS: any[] = [
	AuthenticationService,
	SettingsService,
	TaskService
];

const SHARED_DIRECTIVES: any[] = [
	RouterOutletDirective
	];

export {
	Queueable,
	Task,

	QueuedOnlyPipe,
	FormattedTimePipe,
	SHARED_PIPES,

	AuthenticationService,
	TaskService,
	SettingsService,
	SHARED_PROVIDERS,

	RouterOutletDirective,
	SHARED_DIRECTIVES

};