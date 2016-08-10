import Queueable from './interfaces/queueable';
import Task from './interfaces/task';

import QueuedOnlyPipe from './pipes/queued-only.pipe';
import FormattedTimePipe from './pipes/formatted-time.pipe';

import TaskService from './services/task.service';
import SettingsService from './services/settings.service';

const SHARED_PIPES: any[] = [
	FormattedTimePipe,
	QueuedOnlyPipe
];

const SHARED_PROVIDERS: any[] = [
	SettingsService,
	TaskService
];
export {
	Queueable,
	Task,

	QueuedOnlyPipe,
	FormattedTimePipe,
	SHARED_PIPES,

	TaskService,
	SettingsService,
	SHARED_PROVIDERS
};