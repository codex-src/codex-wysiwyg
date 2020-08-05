import testKeyDown from "lib/Client/testKeyDown"

export const runeAny = e => testKeyDown(e)
	.forShift({ passthrough: true })
	.forKeyCode("Delete")
	.check()

export const runeMacOS = e => testKeyDown(e)
	.forCtrl()
	// .forKeyCode("D")
	.forKey("d") // Uses "d" for en-US keyboards
	.check()

export const wordNonMacOS = e => testKeyDown(e)
	.forShift({ passthrough: true })
	.forCtrl()
	.forKeyCode("Delete")
	.check()

export const wordMacOS = e => testKeyDown(e)
	.forShift({ passthrough: true })
	.forAlt()
	.forKeyCode("Delete")
	.check()
