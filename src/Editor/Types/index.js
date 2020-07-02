import Enum from "lib/Enum"
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

const i = iota()

// Maps types to sort orders for text components; render
// precedence for components/components-text.
export const sortOrder = {
	[enumerated.code]:   i(),
	[enumerated.a]:      i(),
	[enumerated.strike]: i(),
	[enumerated.strong]: i(),
	[enumerated.em]:     i(),
}

export { enumerated as enum }
