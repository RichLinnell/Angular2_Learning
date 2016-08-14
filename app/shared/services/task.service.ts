import { Injectable } from '@angular/core';
import { Task } from '../shared';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export default class TaskService {
	public taskStore: Array<Task> = [];
	taskFeed: Observable<Task>;
	private taskObserver: any;
	private dataUrl = 'http://playapi.azurewebsites.net/api/Task';//'/app/shared/data/raw-tasks.json';

	constructor(private http: Http){
		this.taskFeed = new Observable(observer => {
			this.taskObserver = observer;
		});
		this.fetchTasks();
	}

	private fetchTasks(): void {
		this.http.get(this.dataUrl)
		.map(response => response.json())
		.map(stream => stream.map(res => {
			return {
				name: res.Name,
				deadline: new Date(res.Deadline),
				pomodorosRequired: res.PomodorosRequired,
				queued: res.queued
			}
		}))
		.subscribe(
			tasks => {
				this.taskStore = tasks;
				tasks.forEach(task => this.taskObserver.next(task))
			},
			error => console.log(error)
			);
	}

	addTask(task: Task): void {
		this.taskObserver.next(task);
	}
}