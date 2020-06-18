import {
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	P,
	HR,
	Em,
	Strong,
	Code,
	Strike,
	A,
} from "./components"

// Maps types to React components.
const typeMap = {
	"h1": H1,
	"h2": H2,
	"h3": H3,
	"h4": H4,
	"h5": H5,
	"h6": H6,
	"p":  P,
	"hr": HR,

	"em":     Em,
	"strong": Strong,
	"code":   Code,
	"strike": Strike,
	"a":      A,
}

export default typeMap
