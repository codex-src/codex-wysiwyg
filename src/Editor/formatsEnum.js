import { NumberEnum } from "lib/Enums"

// NOTE: Formats are ordered by render precedence
const formatsEnum = new NumberEnum(
	"anchor",
	"code",
	"strikethrough",
	"strong",
	"emphasis",
)

export default formatsEnum
