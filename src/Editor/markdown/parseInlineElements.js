function parseInlineElements(chunk) {
	if (!chunk) {
		return null
	}

	const els = []

	let ch = ""
	for (let x1 = 0; x1 < chunk.length; x1++) {
		ch = chunk[x1]

		switch (ch) {
		case "*":
			const offset = chunk.slice(x1 + 1).indexOf("*")
			if (offset >= 0) {
				els.push({
					type: "em",
					props: {
						syntax: ch,
						children: chunk.slice(x1 + 1, x1 + 1 + offset),
					},
				})
				x1 = x1 + 1 + offset
				continue
			}
			break
		default:
			// No-op
			break
		}

		// TOOD: This can probably be heavily optimized.
		if (!els.length || (els.length && typeof els[els.length - 1] !== "string")) {
			els.push(ch)
			continue
		}
		els[els.length - 1] += ch
	}

	return els
}

export default parseInlineElements
