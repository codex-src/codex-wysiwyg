import { immerable } from "immer"

const __constructor__ = "__constructor__"
const __computed__ = "__computed__"

// Prototypes methods to a class. Supports __constructor__
// and __computed__ namespaces.
function __proto__(Class, methods) {
	Class[immerable] = true
	for (const each of Object.keys(methods)) {
		if (each.startsWith(__constructor__)) {
			Class[each.slice(__constructor__.length)] = methods[each]
			continue
		} else if (each.startsWith(__computed__)) {
			Object.defineProperty(Class.prototype, each.slice(__computed__.length), {
				get: methods[each],
			})
			continue
		}
		Class.prototype[each] = methods[each]
	}
}

export default __proto__
