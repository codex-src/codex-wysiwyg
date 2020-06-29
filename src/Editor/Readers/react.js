import * as Types from "../Types"
import hash from "lib/hash"
import recursers from "./recursers"

function getInfo(elemOrSpan) {
	const T = elemOrSpan.getAttribute("data-type")
	const P = JSON.parse(elemOrSpan.getAttribute("data-props") || "{}")
	return [T, P]
}

// Reader for React-rendered DOM elements.
const react = {
	spans(domElement) {
		return recursers.spans(domElement, getInfo)
	},
	elements(domTree) {
		// return recursers.elements(domTree, each => {
		// 	const T = each.getAttribute("data-type")
		// 	const P = JSON.parse(each.getAttribute("data-props") || "{}")
		// 	return [T, P]
		// }, each => {
		// 	const T = each.getAttribute("data-type")
		// 	const P = JSON.parse(each.getAttribute("data-props") || "{}")
		// 	return [T, P]
		// })
		const elements = []
		for (const each of domTree.children) {
			const T = each.getAttribute("data-type")
			const P = JSON.parse(each.getAttribute("data-props") || "{}")
			switch (T) {
			case "p":
				elements.push({
					type: T,
					key: each.id || hash(8),
					props: {
						...P,
						spans: this.spans(each),
					},
				})
				break
			default:
				throw new Error("FIXME")
			}
		}
		return elements
	},
}

export default react
