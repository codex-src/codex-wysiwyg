import testKeyDown from "lib/Client/testKeyDown"

export const insertText = e => testKeyDown(e)
	.forShift({ passthrough: true })
	.forAlt({ passthrough: true })
	.forKey(!e.key ? "" : [...e.key][0]) // FIXME?
	.check()

export const insertComposedTextUnidentified = e => (
	e.keyCode === 229 &&
	e.key === "Dead"
)

export const insertComposedTextIdentified = e => (
	e.keyCode === 229 &&
	e.key !== "Dead"
)

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
