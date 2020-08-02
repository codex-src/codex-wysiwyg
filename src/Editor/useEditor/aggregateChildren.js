import createIndex from "./createIndex"
import getIndex from "./getIndex"

// Gets children from the current range.
export function getChildren(elements, range) {
	const ch = []
	for (const each of elements) {
		const { key, props: { children } } = each
		if (!children.length) {
			// No-op
			continue
		}
		let x1 = 0
		if (key === range.start.key) {
			x1 = getIndex(children, range.start.offset + 1)
		}
		let x2 = children.length
		if (key === range.end.key) {
			x2 = getIndex(children, range.end.offset)
			if (range.start.key === range.end.key) {
				x2++
			}
		}
		ch.push(...children.slice(x1, x2))
	}
	return ch
}

// Creates children from the current range.
export function createChildren(elements, range) {
	const ch = []
	for (const each of elements) {
		const { key, props: { children } } = each
		if (!children.length) {
			// No-op
			continue
		}
		let x1 = 0
		if (key === range.start.key) {
			x1 = createIndex(children, range.start.offset)
		}
		let x2 = children.length
		if (key === range.end.key) {
			x2 = createIndex(children, range.end.offset)
		}
		ch.push(...children.slice(x1, x2))
	}
	return ch
}
