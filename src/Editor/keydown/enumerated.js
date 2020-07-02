import { Enum } from "lib/Enums"

const enumerated = new Enum(
	"applyFormatPlaintext",
	"applyFormatEm",
	"applyFormatStrong",
	"applyFormatCode",
	"applyFormatStrike",
	"applyFormatA",

	"insertTextTab",
	"insertTextEnter",
	"insertText",

	"backspaceRune",
	"backspaceWord",
	"backspaceLine",

	"deleteRune",
	"deleteWord",

	"undo",
	"redo",
)

export default enumerated
