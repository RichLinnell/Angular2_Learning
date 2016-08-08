function Log(target: Function, key: string, parameterIndex: number) {
	var functionLogged = key || target.prototype.constructor.name;
	console.log(`
		The parameter in position ${parameterIndex} at ${functionLogged} has been decorated
		 `);
}

class Greeter {
	greeting: string;
	constructor(@Log phrase: string){
		this.greeting = phrase;
	}
}

module Stinkers {
	export interface IShit{
		smell: string;
	}
	export class CatShit implements IShit{
		constructor(public smell: string){
			console.log(`Catshit made with smell ${smell}`);
		}
	}

	export class DogShit implements IShit{
		constructor(public smell: string){
			console.log(`Dogshit made with smell ${smell}`);
		}
	}
}