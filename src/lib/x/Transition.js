import React from "react"

// TODO: https://developer.mozilla.org/en-US/docs/Web/API/Document/transitionend_event
const Transition = ({
	on,        // boolean
	className, // string e.g. "transition duration-150 ease-in-out"
	from,      // string e.g. "transform rotate-0"
	to,        // string e.g. "transform rotate-90"
	children,  // etc.
}) => {
	const ref = React.useRef()

	const classes = (className || "").split(/\s+/g).filter(Boolean)
	const fromClasses = (from || "").split(/\s+/g).filter(Boolean)
	const toClasses = (to || "").split(/\s+/g).filter(Boolean)

	const mounted = React.useRef()
	React.useLayoutEffect(() => {
		const actualRef = children.ref || ref
		if (!mounted.current) {
			// if (classes.length) {
			actualRef.current.classList.add(...classes)
			// }
		}
		if (!on) {
			// if (toClasses.length) {
			actualRef.current.classList.remove(...toClasses)
			// }
			// if (fromClasses.length) {
			actualRef.current.classList.add(...fromClasses)
			// }
		} else {
			// if (fromClasses.length) {
			actualRef.current.classList.remove(...fromClasses)
			// }
			// if (toClasses.length) {
			actualRef.current.classList.add(...toClasses)
			// }
		}
	}, [
		on,
		children.ref,
		ref,
		classes,
		fromClasses,
		toClasses,
	])

	return !children.ref ? React.cloneElement(children, { ref }) : children
}

export default Transition
