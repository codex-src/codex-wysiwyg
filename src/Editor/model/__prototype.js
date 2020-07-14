import { immerable } from "immer"

// Prototypes methods to a class. Supports __static__ and
// __get__ methods.
function __prototype(Class, methods) {
	Class[immerable] = true
	for (const each of Object.keys(methods)) {
		if (each.startsWith("__static__")) {
			Class[each.slice("__static__".length)] = methods[each]
			continue
		} else if (each.startsWith("__get__")) {
			Object.defineProperty(Class.prototype, each.slice("__get__".length), {
				get: methods[each],
			})
			continue
		}
		Class.prototype[each] = methods[each]
	}
}

export default __prototype
