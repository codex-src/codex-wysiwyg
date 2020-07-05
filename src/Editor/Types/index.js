import Enum from "lib/enums/Enum"
import iota from "lib/iota"

// NOTE: Imports are intentionally unsorted.
import {
	P,
} from "../components/components"

import {
	Em,
	Strong,
	Strike,
	Code,
	A,
} from "../components/components-text"

// Enumerates types.
export const enumerated = new Enum(
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

// TODO: Use NumberEnum
const i = iota()

// Maps types to sort orders for text components; render
// precedence for components/components-text.
const sortOrder = {
	[enumerated.code]:   i(),
	[enumerated.a]:      i(),
	[enumerated.strike]: i(),
	[enumerated.strong]: i(),
	[enumerated.em]:     i(),
}

// Sorts span.types based on render precedence.
export function sort(span) {
	span.types.sort((T1, T2) => sortOrder[T1] - sortOrder[T2])
}

// Re-exports as enumerated as enum for Types.enum.
export { enumerated as enum }
