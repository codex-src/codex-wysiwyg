import * as Position from "./Position"

// Gets the current range. Range must be scoped to a tree.
export function getCurrent(tree) {
	const selection = document.getSelection()
	if (!selection.rangeCount) {
		return null
	}
	const range = selection.getRangeAt(0)
	if (!tree.contains(range.startContainer) || !tree.contains(range.endContainer)) {
		return null
	}
	const start = Position.fromUserLiteral({
		node: range.startContainer,
		offset: range.startOffset,
	})
	let end = start
	if (!range.collapsed) {
		end = Position.fromUserLiteral({
			node: range.endContainer,
			offset: range.endOffset,
		})
	}
	const computed = {
		start,
		end,
		collapsed() {
			const ok = (
				this.start === this.end ||
				(this.start.key === this.end.key && this.start.offset === this.end.offset)
			)
			return ok
		},
	}
	return computed
}

// Converts a user literal to an array.
function conv({ node, offset }) {
	return [node, offset]
}

// Resolves to a user literal.
export const toUserLiteral = r => () => {
	const pos1 = conv(Position.toUserLiteral(r.start)())
	let pos2 = pos1
	if (!r.collapsed()) {
		pos2 = conv(Position.toUserLiteral(r.end)())
	}
	const range = document.createRange()
	range.setStart(...pos1)
	range.setEnd(...pos2)
	return range
}
