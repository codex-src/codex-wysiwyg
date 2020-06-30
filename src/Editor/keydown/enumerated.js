import { Enum } from "lib/Enums"

const enumerated = new Enum(
	"formatEm",
	"formatStrong",
	"formatCode",
	"formatStrike",
	"formatA",

	"tab",
	"enter",
	"characterData",
	"characterDataDead",

	"backspaceRTLRune",
	"backspaceRTLWord",
	"backspaceRTLLine",
	"backspaceLTRRune",
	"backspaceLTRWord",

	"undo",
	"redo",
)

export default enumerated
