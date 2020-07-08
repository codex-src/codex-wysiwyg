import domUtils from "lib/domUtils"
import VRangeComponent from "./VRangeComponent"

import {
	immerable,
	produce,
} from "immer"

// Describes a virtual range.
class VRange {
	[immerable] = true

	start = new VRangeComponent()
	end = new VRangeComponent()

	// Gets the current virtual range, scoped to a tree.
	static getCurrent(tree) {
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
		const start = VRangeComponent.fromRangeComponent({
			node: range.startContainer,
			offset: range.startOffset,
		})
		let end = start
		if (!range.collapsed) {
			end = VRangeComponent.fromRangeComponent({
				node: range.endContainer,
				offset: range.endOffset,
			})
		}
		const created = new this()
		Object.assign(created, {
			start,
			end
		})
		return created
	}

	// Getter for whether the virtual range is collapsed.
	get collapsed() {
		return VRangeComponent.areEqual(this.start, this.end)
	}

	// Collapses the virtual range to the start virtual range
	// component.
	collapseToStart() {
		return produce(this, draft => {
			draft.end = draft.start
		})
	}

	// Collapses the virtual range to the end virtual range
	// component.
	collapseToEnd() {
		return produce(this, draft => {
			draft.start = draft.end
		})
	}

	// Converts a virtual range to a range.
	toRange() {
		const range = document.createRange()
		range.setStart(...toArray(this.start.toRangeComponent()))
		if (this.collapsed) {
			range.collapse()
		} else {
			range.setEnd(...toArray(this.end.toRangeComponent()))
		}
		return range
	}
}

// Converts a range component to an array.
function toArray({ node, offset }) {
	return [node, offset]
}

export default VRange
