import isCtrlOrMetaKey from "lib/Client/isCtrlOrMetaKey"
import userAgent from "lib/Client/userAgent"

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
			if (passthrough) {
				flags.shiftKey = undefined
				return this
			}
			flags.shiftKey = true
			return this
		},
		forCtrl({ passthrough } = {}) {
			if (passthrough) {
				flags.ctrlKey = undefined
				return this
			}
			flags.ctrlKey = true
			return this
		},
		forAlt({ passthrough } = {}) {
			if (passthrough) {
				flags.altKey = undefined
				return this
			}
			flags.altKey = true
			return this
		},
		forMeta({ passthrough } = {}) {
			if (passthrough) {
				flags.metaKey = undefined
				return this
			}
			flags.metaKey = true
			return this
		},
		forMeta({ passthrough } = {}) {
			if (passthrough) {
				flags.metaKey = undefined
				return this
			}
			flags.metaKey = true
			return this
		},
		forCtrlOrMeta({ passthrough } = {}) {
			let key = "ctrlKey"
			if (userAgent.isAAPL) {
				key = "metaKey"
			}
			if (passthrough) {
				flags[key] = undefined
				return this
			}
			flags[key] = true
			return this
		},
		forKeyCode(keyCode) {
			if (flags.key) {
				throw new Error("testKeyDown: must use keyCode or key")
			}
			flags.keyCode = keyCode
			return this
		},
		forKey(key) {
			if (flags.keyCode) {
				throw new Error("testKeyDown: must use keyCode or key")
			}
			flags.key = key
			return this
		},
		check() {
			for (const each of ["shiftKey", "ctrlKey", "altKey", "metaKey"]) {
				if (flags[each] !== undefined) {
					if (e[each] !== flags[each]) {
						return false
					}
				}
			}
			const ok = (
				e.keyCode === flags.keyCode ||
				e.key === flags.key
			)
			return ok
		},
	}
	return state
}

export default testKeyDown
