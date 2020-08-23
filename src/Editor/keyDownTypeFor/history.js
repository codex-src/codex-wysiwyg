import testKeyDown from "lib/Client/testKeyDown"

export const undo = e => testKeyDown(e)
	.forCtrlOrMeta()
	.forKeyCode("Z")
	.check()

export const redoNonMacOS = e => testKeyDown(e)
	.forCtrl()
	.forKeyCode("Y")
	.check()

export const redoMacOS = e => testKeyDown(e)
	.forShift()
	.forMeta()
	.forKeyCode("Z")
	.check()
