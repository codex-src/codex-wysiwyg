import { Position } from "./model"
import { produce } from "immer"

// Constructs from the current range, scoped to a tree and
// [contenteditable="true"] descendants.
export function fromCurrent(tree) {
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
	return new this({ start, end })
}

// Collapses to the start position.
export function collapse() {
	return produce(this, draft => {
		draft.end = draft.start
	})
}

// Resolves to a user literal.
export function toUserLiteral() {
	// Converts a user literal to an array.
	const convArray = ({ node, offset }) => [node, offset]
	const p1 = convArray(this.start.toUserLiteral())
	let p2 = p1
	if (!this.collapsed) {
		p2 = convArray(this.end.toUserLiteral())
	}
	const range = document.createRange()
	range.setStart(...p1)
	range.setEnd(...p2)
	return range
}
