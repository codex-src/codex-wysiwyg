import Enum from "lib/Enum"

// Enumerates keydown types.
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

	"deleteRTLRune",
	"deleteRTLWord",
	"deleteRTLLine",
	"deleteLTRRune",
	"deleteLTRWord",

	"undo",
	"redo",
)

export default enumerated
