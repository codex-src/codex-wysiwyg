import insertText from "./insertText"
import keyCodeFor from "lib/Client/keyCodeFor"

// test("insertText(...)", () => {
// 	expect(insertText.insertText({
// 		shiftKey: false,
// 		ctrlKey: false,
// 		altKey: false,
// 		metaKey: false,
// 		key: "a",
// 	})).toBeTruthy()
// 	expect(insertText.insertText({
// 		shiftKey: true,
// 		ctrlKey: false,
// 		altKey: false,
// 		metaKey: false,
// 		key: "A",
// 	})).toBeTruthy()
// 	expect(insertText.insertText({
// 		shiftKey: false,
// 		ctrlKey: true,
// 		altKey: true,
// 		metaKey: true,
// 		key: "foo",
// 	})).not.toBeTruthy()
// })
//
// test("insertTab(...)", () => {
// 	expect(insertText.insertTab({
// 		shiftKey: false,
// 		ctrlKey: false,
// 		altKey: false,
// 		metaKey: false,
// 		keyCode: keyCodeFor("Tab"),
// 	})).toBeTruthy()
// 	expect(insertText.insertTab({
// 		shiftKey: true,
// 		ctrlKey: false,
// 		altKey: false,
// 		metaKey: false,
// 		keyCode: keyCodeFor("Tab"),
// 	})).toBeTruthy()
// 	expect(insertText.insertTab({
// 		shiftKey: false,
// 		ctrlKey: true,
// 		altKey: true,
// 		metaKey: true,
// 		keyCode: keyCodeFor("Tab"),
// 	})).not.toBeTruthy()
// })
//
// test("insertSoftParagraph(...)", () => {
// 	expect(insertText.insertSoftParagraph({
// 		shiftKey: false,
// 		ctrlKey: false,
// 		altKey: false,
// 		metaKey: false,
// 		keyCode: keyCodeFor("Enter"),
// 	})).not.toBeTruthy()
// 	expect(insertText.insertSoftParagraph({
// 		shiftKey: true,
// 		ctrlKey: false,
// 		altKey: false,
// 		metaKey: false,
// 		keyCode: keyCodeFor("Enter"),
// 	})).toBeTruthy()
// 	expect(insertText.insertSoftParagraph({
// 		shiftKey: false,
// 		ctrlKey: true,
// 		altKey: true,
// 		metaKey: true,
// 		keyCode: keyCodeFor("Enter"),
// 	})).not.toBeTruthy()
// })

test("insertHardParagraph(...)", () => {
	expect(insertText.insertHardParagraph({
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: keyCodeFor("Enter"),
	})).toBeTruthy()
	// expect(insertText.insertHardParagraph({
	// 	shiftKey: true,
	// 	ctrlKey: false,
	// 	altKey: false,
	// 	metaKey: false,
	// 	keyCode: keyCodeFor("Enter"),
	// })).not.toBeTruthy()
	// expect(insertText.insertHardParagraph({
	// 	shiftKey: false,
	// 	ctrlKey: true,
	// 	altKey: true,
	// 	metaKey: true,
	// 	keyCode: keyCodeFor("Enter"),
	// })).not.toBeTruthy()
})
