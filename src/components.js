import React from "react"

export const P = React.memo(({ type, id, spans }) => {
	return (
		<div ref={ref} id={id}>
			{toReact(children) || (
				<br />
			)}
		</div>
	)
})
