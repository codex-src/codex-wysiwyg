import { useImmerReducer } from "use-immer"

import {
	toMarkdown,
	toMarkup,
} from "./resolvers"

const init = elements => ({
	readOnlyMode: false,
	show: false,
	desc: "releases",
	resolved: {
		markdown: "",
		markup: "",
	},
})

const actions = state => ({
	mountElements(elements) {
		state.resolved.markdown = toMarkdown(elements)
		state.resolved.markup = toMarkup(elements)
	},
	toggleReadOnlyMode() {
		state.readOnlyMode = !state.readOnlyMode
	},
	toggleReleases() {
		state.show = (
			!state.show ||
			state.desc !== "releases"
		)
		state.desc = "releases"
	},
	toggleMarkdown() {
		state.show = (
			!state.show ||
			state.desc !== "markdown"
		)
		state.desc = "markdown"
	},
	toggleMarkup() {
		state.show = (
			!state.show ||
			state.desc !== "markup"
		)
		state.desc = "markup"
	},
	updateMarkdown(elements) {
		state.resolved.markdown = toMarkdown(elements)
	},
	updateMarkup(elements) {
		state.resolved.markup = toMarkup(elements)
	},
	hideAll() {
		state.show = false
	},
})

function PreferencesReducer(state, action) {
	switch (action.type) {
	case "MOUNT_ELEMENTS":
		actions(state).mountElements(action.elements)
		return
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
