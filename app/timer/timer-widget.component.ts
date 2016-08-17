import { Component, Input, OnInit, ElementRef} from '@angular/core';
import { SettingsService, TaskService } from '../shared/shared';
import { RouteParams, CanReuse, OnReuse, ComponentInstruction } from '@angular/router-deprecated';
import { AnimationBuilder } from '@angular/platform-browser/src/animate/animation_builder';
import { CssAnimationBuilder } from '@angular/platform-browser/src/animate/css_animation_builder';

@Component({
	selector: 'pomodoro-timer-widget',
	styleUrls: ['app/timer/timer-widget.component.css'],
	template : `
		<div class="text-center">
			<img src="/app/shared/assets/img/pomodoro.png"
				[ngClass]="{ pulse: !isPaused }">
			<h3><small>{{ taskName }}</small></h3>
			<h1> {{ minutes}}:{{ seconds | number: '2.0'}} </h1>
			<p>
				<button (click)="togglePause()" class="btn btn-danger">
				{{ buttonLabelKey | i18nSelect: buttonLabelsMap }}
				</button>
			</p>
		</div>`
})
export default class TimerWidgetComponent implements CanReuse, OnReuse {
	minutes: number;
	seconds: number;
	isPaused: boolean;
	buttonLabelKey: string;
	buttonLabelsMap: any;
	taskName: string;
	fadeInAnimationBuilder: CssAnimationBuilder;

	constructor(
		private settingsService: SettingsService,
		private routeParams: RouteParams,
		private taskService: TaskService,
		private animationBuilder: AnimationBuilder,
		private elementRef: ElementRef
		) {
		this.buttonLabelsMap = settingsService.labelsMap.timer;

		this.fadeInAnimationBuilder = animationBuilder.css();
		this.fadeInAnimationBuilder.setDuration(1000)
			.setDelay(300)
			.setFromStyles({ opacity: 0, marginLeft: 500})
			.setToStyles({ opacity: 1, marginLeft: 0});

	}

	ngOnInit(): void {
		this.resetPomodoro();
		setInterval(() => this.tick(), 1000);

		let taskIndex = parseInt(this.routeParams.get('id'));
		if (!isNaN(taskIndex)) {
			this.taskName = this.taskService.taskStore[taskIndex].name;
		}

		const anim = this.fadeInAnimationBuilder.start(
			this.elementRef.nativeElement.firstElementChild
			);
		anim.onComplete(()=> alert('blah'));
	}

	resetPomodoro(): void{
		this.isPaused = true;
		this.minutes = this.settingsService.timerMinutes -1 ;
		this.seconds = 59;
		this.buttonLabelKey = 'start';
	}

	private tick(): void {
		if(!this.isPaused) {
			this.buttonLabelKey = 'pause';

			if (--this.seconds < 0){
				this.seconds=59;
				if (--this.minutes < 0){
					this.resetPomodoro();
				}
			}
		}
	}

	togglePause(): void {
		this.isPaused = !this.isPaused;
		if (this.minutes < this.settingsService.timerMinutes || this.seconds < 59) {
			this.buttonLabelKey = this.isPaused ? 'resume' : 'pause';
		}
	}

	routerCanReuse(): boolean{
		return true;
	}

	routerOnReuse(next: ComponentInstruction): void{
		this.taskName = null;
  this.isPaused = false;
  this.resetPomodoro();
	}
}