import testKeyDown from "lib/Client/testKeyDown"

export const em = e => testKeyDown(e)
	.forShift()
	.forKey("_")
	.check()

export const strong = e => testKeyDown(e)
	.forShift()
	.forKey("*")
	.check()

export const code = e => testKeyDown(e)
	.forKey("`")
	.check()

export const strike = e => testKeyDown(e)
	.forShift()
	.forKey("~")
	.check()

export const a = e => testKeyDown(e)
	.forKey("[")
	.check() || testKeyDown(e)
	.forKey("]")
	.check()
