import InlineElement from "../Editor/InlineElement"
import React from "react"
import RenderedScanner from "./RenderedScanner"
import renderTree from "lib/renderTree"

test("", () => {
	const tree = renderTree((
		<div>
			Hello,{" "}
			<span data-type="code">
				<span data-type="a" data-props={JSON.stringify({ href: "https://google.com" })}>
					<span data-type="strike">
						<span data-type="strong">
							<span data-type="em">
								world
							</span>
						</span>
					</span>
				</span>
			</span>
			!
		</div>
	))
	const scanner = new RenderedScanner(tree)
	const children = scanner.scanChildren(tree)
	expect(children).toEqual([
		new InlineElement({ value: "Hello," }),
		new InlineElement({ value: " " }),
		new InlineElement({ types: ["code", "a", "strike", "strong", "em"], props: { a: { href: "https://google.com" } }, value: "world" }),
		new InlineElement({ value: "!" }),
	])
})
