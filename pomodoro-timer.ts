import { Component } from '@angular/core';
import  { bootstrap } from '@angular/platform-browser-dynamic';

@Component({
	selector: 'pomodoro-timer',
	template: `
	<div class="text-center">
		<img src="assets/img/pomodoro.png" alt="Pomodoro">
		<h1> {{ minutes }}:{{ seconds | number: '2.0' }} </h1>
		<p>
			<button (click)="togglePause()" class="btn btn-danger">
			{{ buttonLabel }}
			</button>
		</p>
	</div>
	`
})

class PomodoroTimerComponent {
	minutes: number;
	seconds: number;
	isPaused: boolean;
	buttonLabel: string;

	constructor(){
		this.resetPomodoro();
		setInterval(() => this.tick(), 500);
	}

	togglePause(): void {
		this.isPaused = !this.isPaused;
		// if countdown has started
		if (this.minutes < 24 || this.seconds < 59){
			this.buttonLabel = this.isPaused? 'Resume' : 'Pause';
		}
	}

	private resetPomodoro(): void{
		this.minutes = 24;
		this.seconds = 59;
		this.buttonLabel = 'Start';
		this.togglePause();
	}

	private tick(): void {
		if(!this.isPaused){
			this.buttonLabel = 'Pause';

			if(--this.seconds < 0) {
				this.seconds = 59;
				if (--this.minutes < 0 ) {
					this.resetPomodoro();
				}
			}
		}
	}
}


bootstrap(PomodoroTimerComponent);
