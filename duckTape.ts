import { Component } from '@angular/core';
import  { bootstrap } from '@angular/platform-browser-dynamic';


@Component({
	selector:'duck-tape',
	template:'<h1> Frog = {{frog}} </h1>'
})

class DuckTapeComponent{
	frog : number;

	constructor(){
		this.frog = 100;
		setInterval(()=>this.updo(), 500);
	}
	updo(): void {
		this.frog++;
	}

}
bootstrap(DuckTapeComponent);