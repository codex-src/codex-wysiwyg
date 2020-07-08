import Enum from "lib/enums/Enum"
import iota from "lib/iota"

import { // Unsorted
	P,
} from "./components/components"

import { // Unsorted
	Em,
	Strong,
	Strike,
	Code,
	A,
} from "./components/components-text"

// Enumerates types.
const enumerated = new Enum(
	"p",

	"em",
	"strong",
	"strike",
	"code",
	"a",
)

// Maps types to components.
export const components = {
	[enumerated.p]: P,

	[enumerated.em]:     Em,
	[enumerated.strong]: Strong,
	[enumerated.strike]: Strike,
	[enumerated.code]:   Code,
	[enumerated.a]:      A,
}

const i = iota()

// Maps types to sort orders for text components; render
// precedence for components/components-text.
const ordered = {
	[enumerated.code]:   i(),
	[enumerated.a]:      i(),
	[enumerated.strike]: i(),
	[enumerated.strong]: i(),
	[enumerated.em]:     i(),
}

// Sorts span.types based on render precedence.
export function sort(span) {
	span.types.sort((T1, T2) => ordered[T1] - ordered[T2])
}

// Exports enumerated as enum.
export { enumerated as enum }
