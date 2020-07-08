import domUtils from "lib/domUtils"
import JSONClone from "lib/JSONClone"
import VRangeComponent from "./VRangeComponent"

import {
	immerable,
	produce,
} from "immer"

// Describes a virtual range.
class VRange extends Array {
	[immerable] = true

	// Constructs a new virtual range.
	constructor(...arr) {
		super(...arr)
	}

	// Creates a new virtual range from a tree and a range.
	// The range must be scoped to the tree.
	static fromRange(tree, range) {
		// Guard non-tree descendants:
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
	collapse() {
		return produce(this, draft => {
			draft[1] = draft[0]
		})
	}

	// // Converts the range to a DOM range.
	// toDOMRange() {
	// 	// ...
	// }
}

export default VRange
