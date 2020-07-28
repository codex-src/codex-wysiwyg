import testForSelection from "../useEditor/testForSelection"

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

function convArray({ node, offset }) {
	return [node, offset]
}

// Converts a range to a user literal.
export function convRangeToUserLiteral(range) {
	const pos1 = convArray(convPositionToUserLiteral(range.start))
	let pos2 = pos1
	if (testForSelection({ range })) { // Mocks state.range
		pos2 = convArray(convPositionToUserLiteral(range.end))
	}
	const userRange = document.createRange()
	userRange.setStart(...pos1)
	userRange.setEnd(...pos2)
	return userRange
}
