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
		const start = Position.fromUserLiteral([
			range.startContainer,
			range.startOffset,
		])
		let end = start
		if (!range.collapsed) {
			end = Position.fromUserLiteral([
				range.endContainer,
				range.endOffset,
			])
		}
		return new this({ start, end })
	}

	// Computes whether the positions are collapsed.
	get collapsed() {
		return this.start.isEqualTo(this.end)
	}

	// Collapses end-to-start.
	collapse() {
		return produce(this, draft => {
			draft.end = draft.start
		})
	}

	// Resolves to a user literal.
	toUserLiteral() {
		const p1 = this.start.toUserLiteral()
		let p2 = p1
		if (!this.collapsed) {
			p2 = this.end.toUserLiteral()
		}
		const range = document.createRange()
		range.setStart(...p1)
		range.setEnd(...p2)
		return range
	}
}

export default Range
