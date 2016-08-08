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
	private updo(): void {
		this.frog++;
	}

}

class Nonesense{
	private _foo: number;
	get foo(): number{
		return this._foo;
	}
}

let n:Nonesense = new Nonesense();
n.foo = 6;
bootstrap(DuckTapeComponent);