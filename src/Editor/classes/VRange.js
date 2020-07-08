import domUtils from "lib/domUtils"
import VRangeComponent from "./VRangeComponent"

import {
	immerable,
	produce,
} from "immer"

// Describes a virtual range.
class VRange extends Array {
	[immerable] = true

	// // Constructs a new virtual range.
	// constructor(...arr) {
	// 	super(...arr)
	// }

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
		/* eslint-disable */
		const computed = []
		computed.push(
			VRangeComponent.fromRangeComponent({
				node: range.startContainer,
				offset: range.startOffset,
			}),
		)
		if (range.collapsed) {
			computed.push(computed[0])
		} else {
			computed.push(
				VRangeComponent.fromRangeComponent({
					node: range.endContainer,
					offset: range.endOffset,
				}),
			)
		}
		/* eslint-enable */
		return new this(...computed)
	}

	// Getter for whether the virtual range is collapsed.
	get collapsed() {
		return VRangeComponent.areEqual(this[0], this[1])
	}

	// Collapses the virtual range to the start virtual range
	// component.
	collapseToStart() {
		return produce(this, draft => {
			draft[1] = draft[0]
		})
	}

	// Collapses the virtual range to the end virtual range
	// component.
	collapseToEnd() {
		return produce(this, draft => {
			draft[0] = draft[1]
		})
	}

	// Converts a virtual range to a range.
	toRange() {
		const range = document.createRange()
		range.setStart(...toArray(this[0].toRangeComponent()))
		if (this.collapsed) {
			range.collapse()
		} else {
			range.setEnd(...toArray(this[1].toRangeComponent()))
		}
		return range
	}
}

// Converts a range component to an array.
function toArray({ node, offset }) {
	return [node, offset]
}

export default VRange
