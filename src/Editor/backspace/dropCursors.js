import * as Cursors from "../Cursors"
import * as Spans from "../Spans"
import must from "lib/must"

// Drops up to n-bytes from an array of spans at an offset.
// Returns the number of bytes dropped.
function dropBytes({ spans, offset, nbytes }) {
	// Compute the span and character offsets (offset):
	let x = 0
	for (; x < spans.length; x++) {
		if (offset - spans[x].props.children.length <= 0) {
			// No-op
			break
		}
		offset -= spans[x].props.children.length
	}
	// Drop up to n-bytes:
	nbytes = Math.min(nbytes, offset)
	spans[x].props.children = (
		spans[x].props.children.slice(0, offset - nbytes) +
		spans[x].props.children.slice(offset)
	)
	if (!spans[x].props.children) {
		spans.splice(x, 1)
	}
	Spans.defer(spans)
	return nbytes
}

// Drops bytes between cursors.
function dropCursors(elements, cursors) {
	let y = must(elements.findIndex(each => each.key === cursors[1].key))
	while (!Cursors.areEqual(cursors[0], cursors[1])) {
		let nbytes = cursors[1].offset - (cursors[0].key === cursors[1].key && cursors[0].offset)
		if (!nbytes && y) {
			// Read the current span (for cursors[1].offset):
			const textContent = Spans.textContent(elements[y - 1].props.children)
			// Push and defer spans:
			elements[y - 1].props.children.push(...elements[y].props.children)
			elements.splice(y, 1)
			Spans.defer(elements[y - 1].props.children)
			// Reset cursor[1]:
			Object.assign(cursors[1], {
				key: elements[y - 1].key,
				offset: textContent.length,
			})
			y--
			continue
		}
		const ref = { spans: elements[y].props.children, offset: cursors[1].offset, nbytes }
		nbytes = dropBytes(ref)
		cursors[1].offset -= nbytes
	}
}

export default dropCursors
