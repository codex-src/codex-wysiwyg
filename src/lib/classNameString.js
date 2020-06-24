// Removes extraneous spaces, "undefined", and "false".
function classNameString(str) {
	const className = str.split(/\s+/).filter(each => (
		each !== "" &&
		each !== "undefined" &&
		each !== "false"
	)).join(" ")
	return className
}

export default classNameString
