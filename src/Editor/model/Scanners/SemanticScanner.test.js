import InlineElement from "../Editor/InlineElement"
import React from "react"
import renderTree from "lib/renderTree"
import SemanticScanner from "./SemanticScanner"

test("", () => {
	const tree = renderTree((
		<div>
			Hello,{" "}
			<code>
				<a href="https://google.com">
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
		new InlineElement({ types: ["code", "a", "strike", "strong", "em"], props: { a: { href: "https://google.com" } }, value: "world" }),
		new InlineElement({ value: "!" }),
	])
})
