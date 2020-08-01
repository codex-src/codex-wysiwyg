import { useImmerReducer } from "use-immer"

import { // Unsorted
	toGFM as toMarkdown, // TODO
	toHTML as toMarkup,  // TODO
} from "./resolvers"

const init = elements => ({
	readOnlyMode: false,
	show: false,
	desc: "releases",
	resolved: {
		markdown: toMarkdown(elements),
		markup: toMarkup(elements),
	},
})

const actions = state => ({
	// Toggles read-only mode.
	toggleReadOnlyMode() {
		state.readOnlyMode = !state.readOnlyMode
	},
	// Toggles releases.
	toggleReleases() {
		state.show = (
			!state.show ||
			state.desc !== "releases"
		)
		state.desc = "releases"
	},
	// Toggles rendering markdown.
	toggleMarkdown() {
		state.show = (
			!state.show ||
			state.desc !== "markdown"
		)
		state.desc = "markdown"
	},
	// Toggles rendering markup.
	toggleMarkup() {
		state.show = (
			!state.show ||
			state.desc !== "markup"
		)
		state.desc = "markup"
	},
	// Updates the resolved markdown.
	updateMarkdown(elements) {
		state.resolved.markdown = toMarkdown(elements)
	},
	// Updates the resolved markup.
	updateMarkup(elements) {
		state.resolved.markup = toMarkup(elements)
	},
	// Closes the current renderer.
	hideAll() {
		state.show = false
	},
})

function PreferencesReducer(state, action) {
	switch (action.type) {
	case "TOGGLE_READ_ONLY_MODE":
		actions(state).toggleReadOnlyMode()
		return
	case "TOGGLE_RELEASES":
		actions(state).toggleReleases()
		return
	case "TOGGLE_MARKDOWN":
		actions(state).toggleMarkdown()
		return
	case "TOGGLE_MARKUP":
		actions(state).toggleMarkup()
		return
	case "UPDATE_MARKDOWN":
		actions(state).updateMarkdown(action.elements)
		return
	case "UPDATE_MARKUP":
		actions(state).updateMarkup(action.elements)
		return
	case "HIDE_ALL":
		actions(state).hideAll()
		return
	default:
		throw new Error(`usePreferences.PreferencesReducer: type mismatch; action.type=${action.type}`)
	}
}

function usePreferences(once) {
	return useImmerReducer(PreferencesReducer, {}, () => init(once()))
}

export default usePreferences
