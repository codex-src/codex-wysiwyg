import testKeyDown from "lib/Client/testKeyDown"

export const insertText = e => testKeyDown(e)
	.forShift({ passthrough: true })
	.forAlt({ passthrough: true })
	.forKey([...e.key][0])
	.check()

export const insertTab = e => testKeyDown(e)
	.forShift({ passthrough: true })
	.forKeyCode("Tab")
	.check()

export const insertSoftParagraph = e => testKeyDown(e)
	.forShift()
	.forKeyCode("Enter")
	.check()

export const insertHardParagraph = e => testKeyDown(e)
	.forKeyCode("Enter")
	.check()

export const insertHorizontalRule = e => testKeyDown(e)
	.forCtrlOrMeta()
	.forKeyCode("Enter")
	.check()
