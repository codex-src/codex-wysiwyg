import domUtils from "lib/domUtils"
import Position from "./Position"

import {
	immerable,
	produce,
} from "immer"

// Describes a range. A range corresponds to a user
// insertion point or selection.
class Range {
	[immerable] = true

	start = new Position()
	end = new Position()

	constructor({ start, end } = {}) {
		Object.assign(this, {
			start: start || new Position(),
			end: end || new Position(),
		})
	}

	// Constructs from the current range, scoped to a tree and
	// [contenteditable="true"] descendants.
	static getCurrent(tree) {
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

	// Computes whether the positions are collapsed.
	get collapsed() {
		return this.start.isEqualTo(this.end)
	}

	// // Collapses end-to-start.
	// collapseToStart() {
	// 	return produce(this, draft => {
	// 		draft.end = draft.start
	// 	})
	// }
	//
	// // Collapses start-to-end.
	// collapseToEnd() {
	// 	return produce(this, draft => {
	// 		draft.start = draft.end
	// 	})
	// }

	// Collapses end-to-start.
	collapse() {
		return produce(this, draft => {
			draft.end = draft.start
		})
	}

	// Resolves to a user literal.
	toUserLiteral() {
		// ...
	}
}

export default Range
