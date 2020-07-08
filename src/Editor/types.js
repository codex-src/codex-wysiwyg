import Enum from "lib/enums/Enum"

import { // Unsorted
	Em,
	Strong,
	Strike,
	Code,
	A,

	P,
} from "./components"

// Enumerates types.
const enumerated = new Enum(
	"em",
	"strong",
	"strike",
	"code",
	"a",

	"p",
)

// Maps types to components.
const components = {
	[enumerated.em]:     Em,
	[enumerated.strong]: Strong,
	[enumerated.strike]: Strike,
	[enumerated.code]:   Code,
	[enumerated.a]:      A,

	[enumerated.p]: P,
}

const types = {
	enum: enumerated,
	components,

	// Sorts span.types based on render precedence.
	//
	// TODO: Deprecate
	sort(span) {
		// span.types.sort((T1, T2) => ordered[T1] - ordered[T2])
	},
}

// // TODO: Deprecate
// const i = iota()
//
// // Maps types to sort orders for text components; render
// // precedence for components/components-text.
// //
// // TODO: Deprecate
// const ordered = {
// 	[types.enum.code]:   i(),
// 	[types.enum.a]:      i(),
// 	[types.enum.strike]: i(),
// 	[types.enum.strong]: i(),
// 	[types.enum.em]:     i(),
// }

export default types
