import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export default class AuthenticationService {
	userIsLoggedIn: EventEmitter<boolean>;

constructor(){
	this.userIsLoggedIn = new EventEmitter();
}

login({username, password}) : Promise<boolean> {
	return new Promise(resolve => {
		let validCredentials: boolean = false;

		if(username ==='richlinnell@gmail.com' &&
			password ==='mmmm'){
			validCredentials = true;
		window.sessionStorage.setItem('token', 'eyJhbGciOi');
		}

		this.userIsLoggedIn.emit(validCredentials);
		resolve(validCredentials);
	})
}

logout (): Promise<boolean> {
	return new Promise (resolve => {
		window.sessionStorage.removeItem('token');
		this.userIsLoggedIn.emit(false);
		resolve(true);
	})
}

static isAuthorised(): boolean {
	return !!window.sessionStorage.getItem('token');
}

}