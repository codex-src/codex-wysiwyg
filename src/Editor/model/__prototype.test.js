import __prototype from "./__prototype"
import { immerable } from "immer"

class Class {
	__internal = true
}

function __static__constructor() {
	return new this()
}
function __get__get() {
	return this.__internal
}
function method() {
	return true
}

;(() => {
	__prototype(Class, {
		__static__constructor,
		__get__get,
		method,
	})
})()

test("__prototype(...)", () => {
	expect(Class[immerable]).toBe(true)

	const c = Class.constructor()
	expect(c instanceof Class).toBeTruthy()
	expect(c.get).toBeTruthy()
	expect(c.method()).toBeTruthy()
})
