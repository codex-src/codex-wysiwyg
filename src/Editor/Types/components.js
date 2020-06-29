import enumerated from "./enumerated"

import { // Do not sort
	Em,
	Strong,
	Strike,
	Code,
	A,
} from "../components/components-text"

import { // Do not sort
	P,
} from "../components/components"

const components = {
	[enumerated.em]:     Em,
	[enumerated.strong]: Strong,
	[enumerated.strike]: Strike,
	[enumerated.code]:   Code,
	[enumerated.a]:      A,

	[enumerated.p]: P,
}

export default components
