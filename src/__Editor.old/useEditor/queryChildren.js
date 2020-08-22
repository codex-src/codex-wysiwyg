import getIndex from "./getIndex"
import getMutableIndex from "./getMutableIndex"

// Queries children from an array of elements and a range.
// Note that this function is idempotent.
export function queryChildren(elements, range) {
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

// Queries children from an array of elements and a range.
// Note that this function is non-idempotent.
export function queryMutableChildren(elements, range) {
	const ch = []
	for (const each of elements) {
		const { key, props: { children } } = each
		if (!children.length) {
			// No-op
			continue
		}
		let x1 = 0
		if (key === range.start.key) {
			x1 = getMutableIndex(children, range.start.offset)
		}
		let x2 = children.length
		if (key === range.end.key) {
			x2 = getMutableIndex(children, range.end.offset)
		}
		ch.push(...children.slice(x1, x2))
	}
	return ch
}
