import domUtils from "lib/domUtils"
import JSONClone from "lib/JSONClone"
import VirtualElement from "../Editor/VirtualElement"
import VirtualInlineElement from "../Editor/VirtualInlineElement"

// Describes an abstract scanner; a scanner implements scan
// to scan virtual elements and children.
class AbstractScanner {
	// Scans types and props.
	scanner = null

	// Scans virtual children from an element.
	scanChildren(element) {
		const children = []
		const recurse = (on, types = [], props = {}) => {
			if (domUtils.isTextNode(on)) {
				const value = on.nodeValue
				children.push(new VirtualInlineElement({ types, props, value }))
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

	// Scans virtual elements from a tree.
	scan(tree) {
		const elements = []
		for (const each of tree.children) {
			const [T, P] = this.scanner(each)
			switch (T) {
			case "p":
				elements.push(new VirtualElement({
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
