// Returns a className string.
function classNameString(str) {
	const className = str.split(/\s+/).filter(each => (
		each !== "" &&
		each !== "undefined" &&
		each !== "false"
	)).join(" ")
	return className
}

export default classNameString
