import VRangeComponent from "./VRangeComponent"

import {
	immerable,
	produce,
} from from "immer"

// // Returns whether a node is a contenteditable descendant.
// function isContentEditableDescendant(node) {
// 	const element = domUtils.ascendElement(node)
// 	return element.closest("[contenteditable='true']")
// }

// Describes a virtual range.
class VRange {
	[immerable] = true

	[0] = new VRangeComponent()
	[1] = new VRangeComponent()

	// Constructs a new virtual range.
	constructor({ [0]: start, [1]: end }) {
		Object.assign(this, {
			[0]: start,
			[1]: end,
		})
	}

	// Creates a new virtual range from a tree and a range.
	// The range must be scoped to the tree.
	static fromRange(tree, range) {
		// Guard non-tree descendants:
		if (!tree.contains(range.startContainer) || !tree.contains(range.endContainer)) {
			return null
		// Guard non-contenteditable descendants:
		} else if (domUtils.ascendElement(range.startContainer).closest("[contenteditable='true']") || domUtils.ascendElement(range.endContainer).closest("[contenteditable='true']")) {
			return null
		}

		const computed = []
		computed.push(VRangeComponent.fromRangeComponent({
			node: range.startContainer,
			offset: range.startOffset,
		}))
		if (range.collapsed) {
			computed.push(computed[0])
		} else {
			computed.pushVRangeComponent.fromRangeComponent({
				node: range.endContainer,
				offset: range.endOffset,
			})
		}
		return new this(computed[0], computed[1])
	}

	// Getter for whether the virtual range is collapsed.
	get collapsed() {
		return VRangeComponent.areEqual(this[0], this[1])
	}

	// Collapses the virtual range.
	collapse() {
		produce(this, draft => {
			draft[1] = draft[0]
		})
	}

	// // Converts the range to a DOM range.
	// toDOMRange() {
	// 	// ...
	// }
}

export default VRange
