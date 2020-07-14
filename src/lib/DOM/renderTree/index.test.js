import React from "react"
import renderTree from "./index"

test("renderTree(...)", () => {
	const tree = renderTree((
		<h1>
			Hello,{" "}
			<code>
				world
			</code>
			!
		</h1>
	))
	expect(tree.outerHTML).toBe("<h1>Hello, <code>world</code>!</h1>")
})
