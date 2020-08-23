import keyCodeFor from "lib/Client/keyCodeFor"
import userAgent from "lib/Client/userAgent"

// Tests a keydown event for a combination of modifier keys
// and a key code OR or a key. Note that
// testKeyDown.forKeyCode(...) may use a string instead of a
// number (uses forKeyCode(...) internally).
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
			const mods = ["shiftKey", "ctrlKey", "altKey", "metaKey"]
			for (const each of mods) {
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
