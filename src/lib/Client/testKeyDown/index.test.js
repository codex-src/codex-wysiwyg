import testKeyDown from "./index"
import keyCodeFor from "lib/Client/keyCodeFor"

test("testKeyDown(...)", () => {
	const e = {
		shiftKey: false,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: 0,
		key: "",
	}
	expect(testKeyDown(e).check()).toBeTruthy()
})

test(".shiftKey(...)", () => {
	const e = {
		shiftKey: true,
		ctrlKey: false,
		altKey: false,
		metaKey: false,
		keyCode: 0,
		key: "",
	}
	expect(testKeyDown(e).check()).not.toBeTruthy()
	expect(testKeyDown(e).forShift({ passthrough: true }).check()).toBeTruthy()
	expect(testKeyDown(e).forShift().check()).toBeTruthy()
})

test(".ctrlKey(...)", () => {
	const e = {
		shiftKey: true,
		ctrlKey: true,
		altKey: false,
		metaKey: false,
		keyCode: 0,
		key: "",
	}
	expect(testKeyDown(e).check()).not.toBeTruthy()
	expect(testKeyDown(e).forShift().forCtrl({ passthrough: true }).check()).toBeTruthy()
	expect(testKeyDown(e).forShift().forCtrl().check()).toBeTruthy()
})

test(".altKey(...)", () => {
	const e = {
		shiftKey: true,
		ctrlKey: true,
		altKey: true,
		metaKey: false,
		keyCode: 0,
		key: "",
	}
	expect(testKeyDown(e).check()).not.toBeTruthy()
	expect(testKeyDown(e).forShift().forCtrl().forAlt({ passthrough: true }).check()).toBeTruthy()
	expect(testKeyDown(e).forShift().forCtrl().forAlt().check()).toBeTruthy()
})

test(".metaKey(...)", () => {
	const e = {
		shiftKey: true,
		ctrlKey: true,
		altKey: true,
		metaKey: true,
		keyCode: 0,
		key: "",
	}
	expect(testKeyDown(e).check()).not.toBeTruthy()
	expect(testKeyDown(e).forShift().forCtrl().forAlt().forMeta({ passthrough: true }).check()).toBeTruthy()
	expect(testKeyDown(e).forShift().forCtrl().forAlt().forMeta().check()).toBeTruthy()
})

test(".keyCode(...)", () => {
	const e = {
		shiftKey: true,
		ctrlKey: true,
		altKey: true,
		metaKey: true,
		keyCode: keyCodeFor("A"),
		key: "",
	}
	expect(testKeyDown(e).check()).not.toBeTruthy()
	expect(testKeyDown(e).forShift().forCtrl().forAlt().forMeta().forKeyCode(keyCodeFor("A")).check()).toBeTruthy()
})

test(".key(...)", () => {
	const e = {
		shiftKey: true,
		ctrlKey: true,
		altKey: true,
		metaKey: true,
		keyCode: 0,
		key: "A",
	}
	expect(testKeyDown(e).check()).not.toBeTruthy()
	expect(testKeyDown(e).forShift().forCtrl().forAlt().forMeta().forKey("A").check()).toBeTruthy()
})

test(".keyCode(...).key(...)", () => {
	const e = {
		shiftKey: true,
		ctrlKey: true,
		altKey: true,
		metaKey: true,
		keyCode: keyCodeFor("A"),
		key: "A",
	}
	expect(testKeyDown(e).check()).not.toBeTruthy()
	expect(() => (
		testKeyDown(e).forShift().forCtrl().forAlt().forMeta().forKeyCode(keyCodeFor("A")).forKey("A").check()
	)).toThrow()
})
