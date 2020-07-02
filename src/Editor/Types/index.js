import Enum from "lib/Enum"
import iota from "lib/iota"

import { // Do not sort
	P,
} from "../components/components"

import { // Do not sort
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

// Maps types to precomputed sort orders; render
// precedence for components/components-text.
export const sortOrder = {
	[enumerated.code]:   i(), // TODO
	[enumerated.a]:      i(), // TODO
	[enumerated.strike]: i(),
	[enumerated.strong]: i(),
	[enumerated.em]:     i(),
}

export { enumerated as enum }
