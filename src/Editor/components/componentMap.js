import { // Unsorted
	Em,
	Strong,
	Code,
	Strike,
	A,
} from "./components-text"

import { // Unsorted
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	P,
} from "./components"

// Maps types to components.
const componentMap = {
	"em":     Em,
	"strong": Strong,
	"code":   Code,
	"strike": Strike,
	"a":      A,

	"h1": H1,
	"h2": H2,
	"h3": H3,
	"h4": H4,
	"h5": H5,
	"h6": H6,
	"p":  P,
}

export default componentMap
