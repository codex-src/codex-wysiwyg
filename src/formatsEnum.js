import { NumberEnum } from "lib/Enums"

// NOTE: Ordered by render precedence
export const formatsEnum = new NumberEnum(
	"anchor",
	"code",
	"strikethrough",
	"strong",
	"emphasis",
)

// Maps strings to formatsEnum (zero-based numbers).
export const formatsEnumMap = {
	anchor: formatsEnum.anchor,
	code: formatsEnum.code,
	strikethrough: formatsEnum.strikethrough,
	strong: formatsEnum.strong,
	emphasis: formatsEnum.emphasis,
}
