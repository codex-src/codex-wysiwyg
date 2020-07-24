import { // Unsorted
	getPositionFromUserLiteral,
	convPositionToUserLiteral,
} from "./Position"

// Gets the current range scoped to a tree.
export function getCurrentRange(tree) {
	const selection = document.getSelection()
	if (!selection.rangeCount) {
		return null
	}
	const range = selection.getRangeAt(0)
	if (!tree.contains(range.startContainer) || !tree.contains(range.endContainer)) {
		return null
	}
	const start = getPositionFromUserLiteral({
		node: range.startContainer,
		offset: range.startOffset,
	})
	let end = start
	if (!range.collapsed) {
		end = getPositionFromUserLiteral({
			node: range.endContainer,
			offset: range.endOffset,
		})
	}
	return { start, end }
}

// Compares whether a range is collapsed; compares
// references then deeply compares.
export function rangeIsCollapsed(range) {
	const ok = (
		range.start === range.end || // Compares references
		(range.start.key === range.end.key && range.start.offset === range.end.offset)
	)
	return ok
}

function convArray({ node, offset }) {
	return [node, offset]
}

// Converts a range to a user literal.
export function convRangeToUserLiteral(range) {
	const pos1 = convArray(convPositionToUserLiteral(range.start))
	let pos2 = pos1
	if (!rangeIsCollapsed(range)) {
		pos2 = convArray(convPositionToUserLiteral(range.end))
	}
	const urange = document.createRange()
	urange.setStart(...pos1)
	urange.setEnd(...pos2)
	return urange
}
