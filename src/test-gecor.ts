function Component(id: number) {
	console.log('init Component');
	return (target: Function) => {
		//
		console.log('run Component');
		target.prototype.id = id;
	};
}

function Logger() {
	console.log('init logger');
	return (target: Function) => {
		console.log('run logger');
	};
}

function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
	console.log(propertyKey);
	const oldValue = propertyDescriptor.value;

	console.log(target, 'target');

	propertyDescriptor.value = function (...args: any[]) {
		return args[0] * 10;
	};
}

function Prop(target: Object, propertyKey: string) {
	let value: number;

	const getter = () => {
		console.log('get');

		return value;
	};

	const setter = (newValue: number) => {
		console.log('set');
		value = newValue;
	};

	Object.defineProperty(target, propertyKey, {
		get: getter,
		set: setter,
	});
}

function Param(target: Object, propertyKey: string, index: number) {
	//
	console.log(target, propertyKey, index);
}

@Logger()
@Component(1)
export class User {
	@Prop id: number;

	@Method
	updateId(@Param newId: number) {
		this.id = newId;
		return this.id;
	}
}

console.log(new User().id);
console.log(new User().updateId(2));
