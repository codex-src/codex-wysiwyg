import testKeyDown from "lib/Client/testKeyDown"

export const runeAny = e => testKeyDown(e)
	.forShift({ passthrough: true })
	.forKeyCode("Backspace")
	.check()

export const runeMacOS = e => testKeyDown(e)
	.forShift({ passthrough: true })
	.forCtrl({ passthrough: true })
	.forKeyCode("Backspace")
	.check()

export const wordNonMacOS = e => testKeyDown(e)
	.forShift({ passthrough: true })
	.forCtrl()
	.forKeyCode("Backspace")
	.check()

export const wordMacOS = e => testKeyDown(e)
	.forShift({ passthrough: true })
	.forCtrl({ passthrough: true }) // Edge case
	.forAlt()
	.forKeyCode("Backspace")
	.check()

export const lineMacOS = e => testKeyDown(e)
	.forShift({ passthrough: true })
	.forMeta()
	.forKeyCode("Backspace")
	.check()
