import testForSelection from "../useEditor/testForSelection"

import {
	computeEditorPositionFromDOMPosition,
	convertEditorPositionToDOMPosition,
} from "./Position"

export function computeEditorRangeFromCurrentDOMRange(tree) {
	const selection = document.getSelection()
	if (!selection.rangeCount) {
		return null
	}
	const range = selection.getRangeAt(0)
	if (!tree.contains(range.startContainer) || !tree.contains(range.endContainer)) {
		return null
	}
	const start = computeEditorPositionFromDOMPosition({
		node: range.startContainer,
		offset: range.startOffset,
	})
	let end = start
	if (!range.collapsed) {
		end = computeEditorPositionFromDOMPosition({
			node: range.endContainer,
			offset: range.endOffset,
		})
	}
	return { start, end }
}

function conv({ node, offset }) {
	return [node, offset]
}

export function convertEditorRangeToDOMRange(range) {
	const pos1 = conv(convertEditorPositionToDOMPosition(range.start))
	let pos2 = pos1
	if (testForSelection({ range })) { // Mocks state.range
		pos2 = conv(convertEditorPositionToDOMPosition(range.end))
	}
	const domRange = document.createRange()
	domRange.setStart(...pos1)
	domRange.setEnd(...pos2)
	return domRange
}
