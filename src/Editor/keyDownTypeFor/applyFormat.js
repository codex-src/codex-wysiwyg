import testKeyDown from "lib/Client/testKeyDown"

export const plaintext = e => testKeyDown(e)
	.forShift()
	.forCtrlOrMeta()
	.forKeyCode("P")
	.check()

export const em = e => testKeyDown(e)
	.forCtrlOrMeta()
	.forKeyCode("I")
	.check()

export const strong = e => testKeyDown(e)
	.forCtrlOrMeta()
	.forKeyCode("B")
	.check()

export const code = e => testKeyDown(e)
	.forShift()
	.forCtrlOrMeta()
	.forKeyCode("C")
	.check()

export const strike = e => testKeyDown(e)
	.forShift()
	.forCtrlOrMeta()
	.forKeyCode("X")
	.check()

export const a = e => testKeyDown(e)
	.forCtrlOrMeta()
	.forKeyCode("K")
	.check()
