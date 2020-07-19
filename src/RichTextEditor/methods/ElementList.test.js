import * as ElementList from "./ElementList"
import hash from "lib/x/hash"

test("fromElements(...); non-multiline", () => {
	const elements = [
		{
			type: "p",
			key: hash(),
			props: { children: [] },
		},
		{
			type: "p",
			key: hash(),
			props: { children: [] },
		},
		{
			type: "p",
			key: hash(),
			props: { children: [] },
		},
		{
			type: "p",
			key: hash(),
			props: { children: [] },
		},
	]
	const list = ElementList.fromElements(elements)
	expect(list.prev).toBe(null)
	expect(list.current).toBe(elements[0])
	expect(list.next.prev).toBe(list)
	expect(list.next.current).toBe(elements[1])
	expect(list.next.next.prev).toBe(list.next)
	expect(list.next.next.current).toBe(elements[2])
	expect(list.next.next.next.prev).toBe(list.next.next)
	expect(list.next.next.next.current).toBe(elements[3])
	expect(list.next.next.next.next).toBe(null)
	// expect(list.next.next.next.next.prev).toBe(list.next.next.next)
	// expect(list.next.next.next.next.current).toBe(null)
	// expect(list.next.next.next.next.next).toBe(null)
})

// test("fromElements(...); multiline", () => {
// 	const elements = [
// 		{
// 			type: "ul",
// 			key: hash(),
// 			props: {
// 				elements: [
// 					{
// 						type: "li",
// 						key: hash(),
// 						props: { children: [] },
// 					},
// 					{
// 						type: "li",
// 						key: hash(),
// 						props: { children: [] },
// 					},
// 				],
// 			},
// 		},
// 		{
// 			type: "ul",
// 			key: hash(),
// 			props: {
// 				elements: [
// 					{
// 						type: "li",
// 						key: hash(),
// 						props: { children: [] },
// 					},
// 					{
// 						type: "li",
// 						key: hash(),
// 						props: { children: [] },
// 					},
// 				],
// 			},
// 		},
// 	]
// 	const list = ElementList.fromElements(elements)
// 	expect(list.prev).toBe(null)
// 	expect(list.current).toBe(elements[0].props.elements[0])
// 	expect(list.next.prev).toBe(list)
// 	expect(list.next.current).toBe(elements[0].props.elements[1])
// 	expect(list.next.next.prev).toBe(list.next)
// 	expect(list.next.next.current).toBe(elements[1].props.elements[0])
// 	expect(list.next.next.next.prev).toBe(list.next.next)
// 	expect(list.next.next.next.current).toBe(elements[1].props.elements[1])
// 	expect(list.next.next.next.next.prev).toBe(list.next.next.next)
// 	expect(list.next.next.next.next.current).toBe(null)
// 	expect(list.next.next.next.next.next).toBe(null)
// })

test("find(...); non-multiline", () => {
	const elements = [
		{
			type: "p",
			key: hash(),
			props: { children: [] },
		},
		{
			type: "p",
			key: hash(),
			props: { children: [] },
		},
		{
			type: "p",
			key: hash(),
			props: { children: [] },
		},
		{
			type: "p",
			key: hash(),
			props: { children: [] },
		},
	]
	const list = ElementList.fromElements(elements)
	expect(ElementList.find(list)(each => each.key === "")).toBe(null)
	expect(ElementList.find(list)(each => each.key === elements[0].key).current).toBe(elements[0])
	expect(ElementList.find(list)(each => each.key === elements[1].key).current).toBe(elements[1])
	expect(ElementList.find(list)(each => each.key === elements[2].key).current).toBe(elements[2])
	expect(ElementList.find(list)(each => each.key === elements[3].key).current).toBe(elements[3])
})

// test("find(...); multiline", () => {
// 	const elements = [
// 		{
// 			type: "ul",
// 			key: hash(),
// 			props: {
// 				elements: [
// 					{
// 						type: "li",
// 						key: hash(),
// 						props: { children: [] },
// 					},
// 					{
// 						type: "li",
// 						key: hash(),
// 						props: { children: [] },
// 					},
// 				],
// 			},
// 		},
// 		{
// 			type: "ul",
// 			key: hash(),
// 			props: {
// 				elements: [
// 					{
// 						type: "li",
// 						key: hash(),
// 						props: { children: [] },
// 					},
// 					{
// 						type: "li",
// 						key: hash(),
// 						props: { children: [] },
// 					},
// 				],
// 			},
// 		},
// 	]
// 	const list = ElementList.fromElements(elements)
// 	expect(ElementList.find(list)(each => each.key === "")).toBe(null)
// 	expect(ElementList.find(list)(each => each.key === elements[0].props.elements[0].key).current).toBe(elements[0].props.elements[0])
// 	expect(ElementList.find(list)(each => each.key === elements[0].props.elements[1].key).current).toBe(elements[0].props.elements[1])
// 	expect(ElementList.find(list)(each => each.key === elements[1].props.elements[0].key).current).toBe(elements[1].props.elements[0])
// 	expect(ElementList.find(list)(each => each.key === elements[1].props.elements[1].key).current).toBe(elements[1].props.elements[1])
// })
