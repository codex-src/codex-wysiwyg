import InlineElement from "../Editor/InlineElement"
import React from "react"
import renderTree from "lib/renderTree"
import SemanticScanner from "./SemanticScanner"

test("Hello, <a href='foo'>world</a>!", () => {
	const tree = renderTree((
		<div>
			Hello,{" "}
			<code>
				<a href="foo">
					<strike>
						<strong>
							<em>
								world
							</em>
						</strong>
					</strike>
				</a>
			</code>
			!
		</div>
	))
	const scanner = new SemanticScanner()
	const children = scanner.scanChildren(tree)
	expect(children).toEqual([
		new InlineElement({ value: "Hello," }),
		new InlineElement({ value: " " }),
		new InlineElement({ types: ["code", "a", "strike", "strong", "em"], props: { a: { href: "foo" } }, value: "world" }),
		new InlineElement({ value: "!" }),
	])
})
