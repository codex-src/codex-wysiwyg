import { Enum } from "lib/Enums"

const enumerated = new Enum(
	"characterData",
	"characterDataDead",

	"tab",
	"enter",

	"formatEm",
	"formatStrong",
	"formatCode",
	"formatStrike",
	"formatA",

	"backspaceRTLRune",
	"backspaceRTLWord",
	"backspaceRTLLine",
	"backspaceLTRRune",
	"backspaceLTRWord",

	"undo",
	"redo",
)

export default enumerated
