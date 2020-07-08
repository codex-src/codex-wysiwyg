import domUtils from "lib/domUtils"
import VirtualRangePosition from "./VirtualRangePosition"

import {
	immerable,
	produce,
} from "immer"

// Returns whether a node is contenteditable-disabled.
function isContentEditableDisabled(node) {
	return domUtils.ascendElement(node).closest("[contenteditable='false']")
}

// Describes a virtual range.
class VirtualRange {
	[immerable] = true

	pos1 = new VirtualRangePosition()
	pos2 = new VirtualRangePosition()

	// Gets the current virtual range. The current range must
	// be scoped to the tree.
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

		// Compute pos1 and pos2:
		const pos1 = VirtualRangePosition.fromRangePositionLiteral({
			node: range.startContainer,
			offset: range.startOffset,
		})
		let pos2 = pos1
		if (!range.collapsed) {
			pos2 = VirtualRangePosition.fromRangePositionLiteral({
				node: range.endContainer,
				offset: range.endOffset,
			})
		}

		// Done:
		const created = new this()
		Object.assign(created, {
			pos1,
			pos2,
		})
		return created
	}

	// Returns whether the virtual range is collapsed.
	get collapsed() {
		return VirtualRangePosition.areEqual(this.pos1, this.pos2)
	}

	// Collapses the virtual range to the start virtual range
	// position (pos1).
	collapseToStart() {
		return produce(this, draft => {
			draft.pos2 = draft.pos1
		})
	}

	// Collapses the virtual range to the end virtual range
	// position (pos2).
	collapseToEnd() {
		return produce(this, draft => {
			draft.pos1 = draft.pos2
		})
	}

	// Converts the virtual range to a range.
	toRange() {
		const rp1 = this.pos1.toRangePositionLiteral().toArray()
		let rp2 = rp1
		if (!this.collapsed) {
			rp2 = this.pos2.toRangePositionLiteral().toArray()
		}
		const range = document.createRange()
		range.setStart(...rp1)
		range.setEnd(...rp2)
		return range
	}
}

export default VirtualRange
