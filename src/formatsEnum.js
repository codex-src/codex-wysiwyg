import { NumberEnum } from "lib/Enums"

// // NOTE: Unexported
// const formatTypes = [ // Ordered by render precedence
// 	"anchor",
// 	"code",
// 	"strikethrough",
// 	"strong",
// 	"emphasis",
// ]
//
// export const formatsEnum = new StringEnum(...formatTypes)

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

// // Sorts an array of formats based on render precedence;
// // formatTypes.
// export function sortFormats(formatA, formatB) {
// 	let x1 = -1
// 	let x2 = -1
// 	for (let x = 0; x < formatTypes.length; x++) {
// 		if (formatA === formatTypes[x]) {
// 			x1 = x
// 		}
// 		if (formatB === formatTypes[x]) {
// 			x2 = x
// 		}
// 		if (x1 !== -1 && x2 !== -1) {
// 			// No-op
// 			break
// 		}
// 	}
// 	if (x1 === -1 || x2 === -1) {
// 		throw new Error("sortFormats: no such format")
// 	}
// 	return x1 - x2
// }
