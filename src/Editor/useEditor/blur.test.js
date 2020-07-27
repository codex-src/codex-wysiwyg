import { blur } from "./actions"

test("focused=false", () => {
	const state = {
		focused: false,
	}
	blur(state)
	expect(state.focused).not.toBeTruthy()
})

test("focused=true", () => {
	const state = {
		focused: true,
	}
	blur(state)
	expect(state.focused).not.toBeTruthy()
})
