import * as Cursors from "../Cursors"
import * as Spans from "../Spans"
import JSONClone from "lib/JSONClone"
import must from "lib/must"

// Returns the span and character offsets for an array of
// spans at an offset.
function Span_offsets(spans, offset) { // TODO
	let x = 0
	for (; x < spans.length; x++) {
		const children = spans[x].props.children
		if (offset - children.length <= 0) {
			return [x, offset]
		}
		offset -= children.length
	}
	return null
}

// Drops a number of characters from an array of spans at an
// offset. Returns the number of characters dropped.
function dropChars(spans, offset, nchars) {
	const offsets = must(Span_offsets(spans, offset))
	if (nchars > offsets[1]) {
		nchars = offsets[1]
	}
	spans[offsets[0]].props.children = (
		spans[offsets[0]].props.children.slice(0, offsets[1] - nchars) +
		spans[offsets[0]].props.children.slice(offsets[1])
	)
	if (!spans[offsets[0]].props.children) {
		spans.splice(offsets[0], 1)
	}
	Spans.defer(spans)
	return nchars
}

// Counts the number of characters between the offsets of a
// set of cursors.
function nchars(cursors) {
	let nchars = 0
	if (cursors[0].key === cursors[1].key) {
		// Hello, [world]!
		nchars = cursors[1].offset - cursors[0].offset
	} else {
		//  Hello, world!
		// [Hello, world]!
		nchars = cursors[1].offset
	}
	return nchars
}

// Drops the characters between a set of cursors.
function dropCursors(elements, cursors) {
	cursors = JSONClone(cursors) // Do not mutate references

	let y = must(elements.findIndex(each => each.key === cursors[1].key))
	while (!Cursors.areEqual(cursors[0], cursors[1])) {
		if (!cursors[1].offset && y) {
			// const offset = Spans.textContent(elements[y - 1].props.children).length // Precompute
			// elements[y - 1].props.children.push(...elements.splice(y, 1)[0].props.children)
			// Spans.defer(elements[y - 1].props.children)
			const offset = Spans.textContent(elements[y - 1].props.children).length
			elements.splice(y - 1, 2, {
				...elements[y - 1],
				props: {
					...elements[y - 1].props,
					children: [
						...elements[y - 1].props.children,
						...elements[y].props.children,
					],
				},
			})
			Spans.defer(elements[y - 1].props.children)
			Object.assign(cursors[1], {
				key: elements[y - 1].key,
				offset,
			})
			y--
			continue
		}
		const dropped = dropChars(elements[y].props.children, cursors[1].offset, nchars(cursors))
		cursors[1].offset -= dropped
	}
}

export default dropCursors
