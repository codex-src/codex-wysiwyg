import * as LinkedElementList from "./index"
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
	const ll = LinkedElementList.fromElements(elements)
	expect(ll.prev).toBe(null)
	expect(ll.current).toBe(elements[0])
	expect(ll.next.prev).toBe(ll)
	expect(ll.next.current).toBe(elements[1])
	expect(ll.next.next.prev).toBe(ll.next)
	expect(ll.next.next.current).toBe(elements[2])
	expect(ll.next.next.next.prev).toBe(ll.next.next)
	expect(ll.next.next.next.current).toBe(elements[3])
	expect(ll.next.next.next.next).toBe(null)
	// expect(ll.next.next.next.next.prev).toBe(ll.next.next.next)
	// expect(ll.next.next.next.next.current).toBe(null)
	// expect(ll.next.next.next.next.next).toBe(null)
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
// 	const ll = LinkedElementList.fromElements(elements)
// 	expect(ll.prev).toBe(null)
// 	expect(ll.current).toBe(elements[0].props.elements[0])
// 	expect(ll.next.prev).toBe(ll)
// 	expect(ll.next.current).toBe(elements[0].props.elements[1])
// 	expect(ll.next.next.prev).toBe(ll.next)
// 	expect(ll.next.next.current).toBe(elements[1].props.elements[0])
// 	expect(ll.next.next.next.prev).toBe(ll.next.next)
// 	expect(ll.next.next.next.current).toBe(elements[1].props.elements[1])
// 	expect(ll.next.next.next.next.prev).toBe(ll.next.next.next)
// 	expect(ll.next.next.next.next.current).toBe(null)
// 	expect(ll.next.next.next.next.next).toBe(null)
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
	const ll = LinkedElementList.fromElements(elements)
	expect(LinkedElementList.find(ll)(each => each.key === "")).toBe(null)
	expect(LinkedElementList.find(ll)(each => each.key === elements[0].key).current).toBe(elements[0])
	expect(LinkedElementList.find(ll)(each => each.key === elements[1].key).current).toBe(elements[1])
	expect(LinkedElementList.find(ll)(each => each.key === elements[2].key).current).toBe(elements[2])
	expect(LinkedElementList.find(ll)(each => each.key === elements[3].key).current).toBe(elements[3])
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
// 	const ll = LinkedElementList.fromElements(elements)
// 	expect(LinkedElementList.find(ll)(each => each.key === "")).toBe(null)
// 	expect(LinkedElementList.find(ll)(each => each.key === elements[0].props.elements[0].key).current).toBe(elements[0].props.elements[0])
// 	expect(LinkedElementList.find(ll)(each => each.key === elements[0].props.elements[1].key).current).toBe(elements[0].props.elements[1])
// 	expect(LinkedElementList.find(ll)(each => each.key === elements[1].props.elements[0].key).current).toBe(elements[1].props.elements[0])
// 	expect(LinkedElementList.find(ll)(each => each.key === elements[1].props.elements[1].key).current).toBe(elements[1].props.elements[1])
// })
