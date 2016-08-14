import TaskComponent from './tasks.component';
import TaskEditorComponent from './task-editor.component';
import TaskTooltipDirective from './task-tooltip.directive';

const TASKS_DIRECTIVES: any[] =[
	TaskComponent,
	TaskEditorComponent,
	TaskTooltipDirective
];

export {
	TASKS_DIRECTIVES,
	TaskComponent,
	TaskEditorComponent,
	TaskTooltipDirective
};