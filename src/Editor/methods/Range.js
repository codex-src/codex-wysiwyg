import * as Position from "./Position"
import collapsed from "../utils/collapsed"

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
	return { start, end }
}

function convArray({ node, offset }) {
	return [node, offset]
}

// Resolves to a user literal.
export const toUserLiteral = r => () => {
	const pos1 = convArray(Position.toUserLiteral(r.start)())
	let pos2 = pos1
	if (!collapsed(r)) {
		pos2 = convArray(Position.toUserLiteral(r.end)())
	}
	const range = document.createRange()
	range.setStart(...pos1)
	range.setEnd(...pos2)
	return range
}
