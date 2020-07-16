// Tests a keydown event.
function testKeyDown(e) {
	const flags = {
		shiftKey: false,
		ctrlKey:  false,
		altKey:   false,
		metaKey:  false,
		keyCode:  0,
		key:      "",
	}
	const testers = {
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
			/* eslint-disable no-multi-spaces */
			const ok = (
				(flags.shiftKey  === undefined || e.shiftKey === flags.shiftKey) &&
				(flags.ctrlKey   === undefined || e.ctrlKey  === flags.ctrlKey)  &&
				(flags.altKey    === undefined || e.altKey   === flags.altKey)   &&
				(flags.metaKey   === undefined || e.metaKey  === flags.metaKey)  && (
					(flags.keyCode === undefined || e.keyCode  === flags.keyCode)  ||
					(flags.key     === undefined || e.key      === flags.key)
				)
			)
			return ok
			/* eslint-enable no-multi-spaces */
		},
	}
	return testers
}

export default testKeyDown
