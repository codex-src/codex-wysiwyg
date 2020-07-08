import domUtils from "lib/domUtils"
import SyntheticRangePosition from "./SyntheticRangePosition"

import {
	immerable,
	produce,
} from "immer"

// Returns whether a node is contenteditable-disabled.
function isContentEditableDisabled(node) {
	return domUtils.ascendElement(node).closest("[contenteditable='false']")
}

// Describes a synthetic range.
class SyntheticRange {
	[immerable] = true

	start = new SyntheticRangePosition()
	end = new SyntheticRangePosition()

	// Gets the current synthetic range. The current range
	// must be scoped to the tree.
	static getCurrent(tree) {
		// Compute the current range:
		const selection = document.getSelection()
		if (!selection.rangeCount) {
			return null
		}
		const range = selection.getRangeAt(0)

		// Guard non-tree descendants:
		if (!tree.contains(range.startContainer) || !tree.contains(range.endContainer)) {
			return null
		// Guard non-contenteditable descendants:
		} else if (isContentEditableDisabled(range.startContainer) || isContentEditableDisabled(range.endContainer)) {
			return null
		}

		// Compute start and end:
		const start = SyntheticRangePosition.fromRangePositionLiteral({
			node: range.startContainer,
			offset: range.startOffset,
		})
		let end = start
		if (!range.collapsed) {
			end = SyntheticRangePosition.fromRangePositionLiteral({
				node: range.endContainer,
				offset: range.endOffset,
			})
		}

		// Done:
		const created = new this()
		Object.assign(created, {
			start,
			end,
		})
		return created
	}

	// Returns whether the synthetic range is collapsed.
	get collapsed() {
		return SyntheticRangePosition.areEqual(this.start, this.end)
	}

	// Collapses the synthetic range to the start synthetic
	// range position.
	collapseToStart() {
		return produce(this, draft => {
			draft.end = draft.start
		})
	}

	// Collapses the synthetic range to the end synthetic
	// range position.
	collapseToEnd() {
		return produce(this, draft => {
			draft.start = draft.end
		})
	}

	// Converts the synthetic range to a range.
	toRange() {
		const pos1 = this.start.toRangePositionLiteral().toArray()
		let pos2 = pos1
		if (!this.collapsed) {
			pos2 = this.end.toRangePositionLiteral().toArray()
		}
		const range = document.createRange()
		range.setStart(...pos1)
		range.setEnd(...pos2)
		return range
	}
}

export default SyntheticRange
