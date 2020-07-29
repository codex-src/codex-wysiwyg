import keyCodeFor from "lib/Client/keyCodeFor"
import userAgent from "lib/Client/userAgent"

const MODIFIERS = ["shiftKey", "ctrlKey", "altKey", "metaKey"]

// Tests a keydown event.
function testKeyDown(e) {
	const flags = {
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: 0,
		key: "",
	}
	const state = {
		forShift({ passthrough } = {}) {
			const key = "shiftKey"
			if (passthrough) {
				flags[key] = undefined
				return this
			}
			flags[key] = true
			return this
		},
		forCtrl({ passthrough } = {}) {
			const key = "ctrlKey"
			if (passthrough) {
				flags[key] = undefined
				return this
			}
			flags[key] = true
			return this
		},
		forAlt({ passthrough } = {}) {
			const key = "altKey"
			if (passthrough) {
				flags[key] = undefined
				return this
			}
			flags[key] = true
			return this
		},
		forMeta({ passthrough } = {}) {
			const key = "metaKey"
			if (passthrough) {
				flags[key] = undefined
				return this
			}
			flags[key] = true
			return this
		},
		forCtrlOrMeta({ passthrough } = {}) {
			const key = !userAgent.MacOSX ? "ctrlKey" : "metaKey"
			if (passthrough) {
				flags[key] = undefined
				return this
			}
			flags[key] = true
			return this
		},
		forKeyCode(keyCode) {
			if (typeof keyCode === "string") {
				keyCode = keyCodeFor(keyCode)
			}
			flags.keyCode = keyCode
			return this
		},
		forKey(key) {
			flags.key = key
			return this
		},
		check() {
			// NOTE: e.keyCode and e.key takes precedence for
			// performance reasons.
			if (e.keyCode !== flags.keyCode && e.key !== flags.key) {
				return false
			}
			for (const each of MODIFIERS) {
				if (flags[each] !== undefined) {
					if (e[each] !== flags[each]) {
						return false
					}
				}
			}
			return true
		},
	}
	return state
}

export default testKeyDown
