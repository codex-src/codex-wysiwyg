import domUtils from "lib/domUtils"
import VirtualRangePosition from "./VirtualRangePosition"

import {
	immerable,
	produce,
} from "immer"

// Describes a virtual range.
class VirtualRange {
	[immerable] = true

	start = new VirtualRangePosition()
	end = new VirtualRangePosition()

	// Computes the current virtual range, scoped to a tree.
	static computeCurrent(tree) {
		// Compute the current range:
		const selection = document.getSelection()
		if (!selection.rangeCount) {
			return null
		}
		// Guard non-tree descendants:
		const range = selection.getRangeAt(0)
		if (!tree.contains(range.startContainer) || !tree.contains(range.endContainer)) {
			return null
		// Guard non-contenteditable descendants:
		} else if (domUtils.ascendElement(range.startContainer).closest("[contenteditable='false']") || domUtils.ascendElement(range.endContainer).closest("[contenteditable='false']")) {
			return null
		}
		// Compute the start and end virtual range positions:
		const start = VirtualRangePosition.fromRangePosition({
			node: range.startContainer,
			offset: range.startOffset,
		})
		let end = start
		if (!range.collapsed) {
			end = VirtualRangePosition.fromRangePosition({
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

	// Getter for whether the virtual range is collapsed.
	get collapsed() {
		return VirtualRangePosition.areEqual(this.start, this.end)
	}

	// Collapses the virtual range to the start virtual range
	// position.
	collapseToStart() {
		return produce(this, draft => {
			draft.end = draft.start
		})
	}

	// Collapses the virtual range to the end virtual range
	// position.
	collapseToEnd() {
		return produce(this, draft => {
			draft.start = draft.end
		})
	}

	// Converts a virtual range to a range.
	toRange() {
		const range = document.createRange()
		range.setStart(...toArray(this.start.toRangePosition()))
		if (this.collapsed) {
			range.collapse()
		} else {
			range.setEnd(...toArray(this.end.toRangePosition()))
		}
		return range
	}
}

// Converts a range position to an array.
function toArray({ node, offset }) {
	return [node, offset]
}

export default VirtualRange
