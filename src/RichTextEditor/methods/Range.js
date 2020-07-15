import * as Position from "./Position"
import JSONEqual from "lib/json/JSONEqual"

// Gets the current range. Range must be scoped to a tree.
export function getCurrent(tree) {
	const selection = document.getSelection()
	if (!selection.rangeCount) {
		return null
	}
	const range = selection.getRangeAt(0)
	if (!tree.contains(range.startContainer) || !tree.contains(range.endContainer)) {
		return null
	}
	const start = Position.fromUserLiteral({
		node: range.startContainer,
		offset: range.startOffset,
	})
	let end = start
	if (!range.collapsed) {
		end = Position.fromUserLiteral({
			node: range.endContainer,
			offset: range.endOffset,
		})
	}
	const computed = {
		start,
		end,
		get collapsed() {
			return JSONEqual(start, end)
		},
	}
	return computed
}

// Collapses end-to-start.
export const collapseStart = r => () => {
	r.end = r.start
}

// Collapses start-to-end.
export const collapseEnd = r => () => {
	r.start = r.end
}

// Converts a user literal to an array.
function conv({ node, offset }) {
	return [node, offset]
}

// Resolves to a user literal.
export const toUserLiteral = r => () => {
	const pos1 = conv(r.start.toUserLiteral())
	let pos2 = pos1
	if (!r.collapsed) {
		pos2 = conv(r.end.toUserLiteral())
	}
	const range = document.createRange()
	range.setStart(...pos1)
	range.setEnd(...pos2)
	return range
}
