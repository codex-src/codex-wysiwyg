import { focus } from "./actions"

test("focused=false", () => {
	const state = {
		focused: false,
	}
	focus(state)
	expect(state.focused).toBeTruthy()
})

test("focused=true", () => {
	const state = {
		focused: true,
	}
	focus(state)
	expect(state.focused).toBeTruthy()
})
