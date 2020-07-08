import domUtils from "lib/domUtils"
import VirtualRangePosition from "./VirtualRangePosition"

import {
	immerable,
	produce,
} from "immer"

// Describes a virtual range.
class VirtualRange {
	[immerable] = true

	pos1 = new VirtualRangePosition()
	pos2 = new VirtualRangePosition()

	// Computes the current virtual range, scoped to a tree.
	static computeCurrent(tree) {
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
		} else if (domUtils.ascendElement(range.startContainer).closest("[contenteditable='false']") || domUtils.ascendElement(range.endContainer).closest("[contenteditable='false']")) {
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

	// Collapses the virtual range.
	collapse() {
		return produce(this, draft => {
			draft.pos2 = draft.pos1
		})
	}

	// Converts the virtual range to a range.
	toRange() {
		const r1 = this.pos1.toRangePositionLiteral().toArray()
		let r2 = r1
		if (!this.collapsed) {
			r2 = this.pos2.toRangePositionLiteral().toArray()
		}
		const range = document.createRange()
		range.setStart(...r1)
		range.setEnd(...r2)
		return range
	}
}

export default VirtualRange
