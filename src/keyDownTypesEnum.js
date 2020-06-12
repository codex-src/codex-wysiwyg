import { StringEnum } from "lib/Enums"

const keyDownTypesEnum = new StringEnum(
	"tab",
	"enter",

	"formatEm",
	"formatStrong",
	// TODO

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
