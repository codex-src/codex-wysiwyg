import * as Position from "../Position"

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

// // Collapses end-to-start.
// export const collapseStart = r => () => ({
// 	...r,
// 	end: r.start,
// })
//
// // Collapses start-to-end.
// export const collapseEnd = r => () => ({
// 	...r,
// 	start: r.end,
// })
//
// // Extends by a boundary.
// const extend = r => (link, dir, boundary) => {
// 	// Extends right-to-left:
// 	if (dir === "rtl") {
// 		const substr = textContent(k.current.props.children).slice(0, r.start.offset)
// 		if (!substr && k.prev) {
// 			Object.assign(r.start, {
// 				key: k.prev.current.key,
// 				offset: textContent(k.prev.current.props.children).length,
// 			})
// 		} else {
// 			const itd = iterate.rtl[boundary](substr)
// 			r.start.offset -= itd.length
// 		}
// 	}
// 	// Extends left-to-right:
// 	if (dir === "ltr") {
// 		const substr = textContent(k.current.props.children).slice(r.end.offset)
// 		if (!substr && k.next) {
// 			Object.assign(r.end, {
// 				key: k.next.current.key,
// 				offset: 0,
// 			})
// 		} else {
// 			const itd = iterate.ltr[boundary](substr)
// 			r.end.offset += itd.length
// 		}
// 	}
// }

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
