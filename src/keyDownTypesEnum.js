import { StringEnum } from "lib/Enums"

const keyDownTypesEnum = new StringEnum(
	"formatEmphasis",
	"formatStrong",
	// TODO

	"tab",
	"enter",

	"backspaceParagraph",
	"backspaceWord",
	"backspaceRune",
	"forwardBackspaceWord",
	"forwardBackspaceRune",

	"undo",
	"redo",

	"characterData",
)

export default keyDownTypesEnum
