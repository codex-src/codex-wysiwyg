import React from "react"
import renderDOMTree from "lib/renderDOMTree"
import { deeplySyncDOMTrees } from "./sync"

// group 1
//
// - -
//
// - a
//
// a -
//
// a a
//
describe("group 1", () => {
	test("", () => {
		const Component1 = props => (
			<div>
				{/* ... */}
			</div>
		)
		const Component2 = props => (
			<div>
				{/* ... */}
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				{/* ... */}
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
			</div>
		)
		const Component2 = props => (
			<div>
				{/* ... */}
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div />
			</div>
		)
		const Component2 = props => (
			<div>
				<div />
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
})

// group 2 (1 of 2)
//
// a b
// b c
// c
//
// a a
// b c
// c
//
// a b
// b c
// c
//
describe("group 2 (1 of 2)", () => {
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
})

// group 2 (2 of 2)
//
// b a
// c b
//   c
//
// a a
// c b
//   c
//
// b a
// c b
//   c
//
describe("group 2 (2 of 2)", () => {
	test("", () => {
		const Component1 = props => (
			<div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
})

// group 3 (1 of 2)
//
// a -
// b a
// c b
//   c
//
// a a
// b -
// c b
//   c
//
// a a
// b b
// c -
//   c
//
// a a
// b b
// c c
//   -
//
describe("group 3 (1 of 2)", () => {
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>
					<br />
				</div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
				<div>
					<br />
				</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>
					<br />
				</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
				<div>
					<br />
				</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
})

// group 3 (2 of 2)
//
// - a
// a b
// b c
// c
//
// a a
// - b
// b c
// c
//
// a a
// b b
// - c
// c
//
// a a
// b b
// c c
// -
//
describe("group 3 (2 of 2)", () => {
	test("", () => {
		const Component1 = props => (
			<div>
				<div>
					<br />
				</div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
				<div>
					<br />
				</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>
					<br />
				</div>
				<div>C</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
	test("", () => {
		const Component1 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
				<div>
					<br />
				</div>
			</div>
		)
		const Component2 = props => (
			<div>
				<div>A</div>
				<div>B</div>
				<div>C</div>
			</div>
		)
		const dom1 = renderDOMTree(<Component1 />)
		const dom2 = renderDOMTree(<Component2 />)
		deeplySyncDOMTrees(dom1, dom2)
		expect(dom1.isEqualNode(dom2)).toBeTruthy()
	})
})
