import Element from "../Editor/Element"
import hash from "lib/hash"
import InlineElement from "../Editor/InlineElement"
import React from "react"
import RenderedScanner from "./RenderedScanner"
import renderTree from "lib/renderTree"

test("<p><br></p>", () => {
	const id = hash()
	const tree = renderTree((
		<article>
			<div id={id} data-type="p">
				<br />
			</div>
		</article>
	))
	const scanner = new RenderedScanner()
	const elements = scanner.scanElements(tree)
	expect(elements).toEqual([
		new Element({
			type: "p",
			key: id,
			props: {
				children: [],
			},
		}),
	])
})

test("<p>Hello, <a href='foo'>world</a>!</p>", () => {
	const id = hash()
	const tree = renderTree((
		<article>
			<div id={id} data-type="p">
				Hello,{" "}
				<span data-type="code">
					<span data-type="a" data-props={JSON.stringify({ href: "foo" })}>
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
		</article>
	))
	const scanner = new RenderedScanner()
	const elements = scanner.scanElements(tree)
	expect(elements).toEqual([
		new Element({
			type: "p",
			key: id,
			props: {
				children: [
					new InlineElement({ value: "Hello," }),
					new InlineElement({ value: " " }),
					new InlineElement({ types: ["code", "a", "strike", "strong", "em"], props: { a: { href: "foo" } }, value: "world" }),
					new InlineElement({ value: "!" }),
				],
			},
		}),
	])
})
