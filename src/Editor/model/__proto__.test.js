import __proto__ from "./__proto__"
import { immerable } from "immer"

class Class {
	__internal = true
}

function __constructor__constructor() {
	return new this()
}
function __computed__computed() {
	return this.__internal
}
function method() {
	return true
}

__proto__(Class, {
	__constructor__constructor,
	__computed__computed,
	method,
})

test("__proto__(...)", () => {
	expect(Class[immerable]).toBe(true)

	const c = Class.constructor()
	expect(c instanceof Class).toBeTruthy()
	expect(c.computed).toBeTruthy()
	expect(c.method()).toBeTruthy()
})
