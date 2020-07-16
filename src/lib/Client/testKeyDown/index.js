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
		// /*
		//  * Computed
		//  */
		get shiftKey() {
			const ok = (
				flags.shiftKey === undefined ||
				e.shiftKey === flags.shiftKey
			)
			return ok
		},
		get ctrlKey() {
			const ok = (
				flags.ctrlKey === undefined ||
				e.ctrlKey === flags.ctrlKey
			)
			return ok
		},
		get altKey() {
			const ok = (
				flags.altKey === undefined ||
				e.altKey === flags.altKey
			)
			return ok
		},
		get metaKey() {
			const ok = (
				flags.metaKey === undefined ||
				e.metaKey === flags.metaKey
			)
			return ok
		},
		get keyCode() {
			return e.keyCode === flags.keyCode
		},
		get key() {
			return e.key === flags.key
		},
		// /*
		//  * check(...)
		//  */
		check() {
			// console.log({
			// 	shiftKey: this.shiftKey,
			// 	ctrlKey: this.ctrlKey,
			// 	altKey: this.altKey,
			// 	metaKey: this.metaKey,
			// 	keyCode: this.keyCode,
			// 	key: this.key,
			// })
			const ok = (
				this.shiftKey &&
				this.ctrlKey &&
				this.altKey &&
				this.metaKey &&
				this.keyCode &&
				this.key
			)
			return ok
		},
	}
	return state
}

// get metaKey() {
// 	const ok = (
// 		flags.ctrlOrMetaKey === undefined ||
// 		flags.metaKey === undefined ||
// 		e.metaKey === flags.metaKey
// 	)
// 	return ok
// },

export default testKeyDown
