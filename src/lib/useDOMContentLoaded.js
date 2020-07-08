import React from "react"

// Returns a useState dependency for DOMContentLoaded.
//
// const DOMContentLoaded = useDOMContentLoaded
// React.useEffect(() => {
//   // ...
// }, [DOMContentLoaded])
//
function useDOMContentLoaded() {
	const [dep, setDep] = React.useState(false)
	React.useLayoutEffect(() => {
		const handler = () => {
			setDep(true)
		}
		document.addEventListener("DOMContentLoaded", handler)
		return () => {
			document.removeEventListener("DOMContentLoaded", handler)
		}
	}, [])
	return dep
}

export default useDOMContentLoaded
