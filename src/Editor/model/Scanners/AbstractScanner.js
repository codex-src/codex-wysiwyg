import domUtils from "lib/domUtils"
import Element from "../Editor/Element"
import InlineElement from "../Editor/InlineElement"
import JSONClone from "lib/json/JSONClone"

// Describes an abstract scanner.
class AbstractScanner {
	// Scanner; scans the current type and props.
	scanner = null

	// Scans children.
	scanChildren(element) {
		const children = []
		const recurse = (on, types = [], props = {}) => {
			if (domUtils.isTextNode(on)) {
				const value = on.nodeValue
				children.push(new InlineElement({ types, props, value }))
				return
			}
			for (const each of on.childNodes) {
				const types2 = [...types]
				const props2 = JSONClone(props)
				if (domUtils.isElement(each) && !domUtils.isBrElement(each)) {
					const [T, P] = this.scanner(each)
					types2.push(T)
					if (Object.keys(P).length) {
						props2[T] = P
					}
				}
				// NOTE: Passes types2 and props2.
				recurse(each, types2, props2)
			}
		}
		recurse(element)
		return children
	}

	// Scans elements.
	scanElements(tree) {
		const elements = []
		for (const each of tree.children) {
			const [T, P] = this.scanner(each)
			switch (T) {
			case "p":
				elements.push(new Element({
					type: T,
					key: each.id,
					props: {
						...P,
						children: this.scanChildren(each),
					},
				}))
				break
			default:
				throw new Error(`AbstractScanner.scan: FIXME; T=${T}`)
			}
		}
		return elements
	}
}

export default AbstractScanner
