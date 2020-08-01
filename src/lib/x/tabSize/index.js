// Generates an inline style object for tab-size.
function tabSize(size) {
	const style = {
		MozTabSize: size,
		tabSize: size,
	}
	return style
}

export default tabSize
