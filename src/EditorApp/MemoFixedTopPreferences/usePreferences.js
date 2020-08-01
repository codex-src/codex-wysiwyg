import { useImmerReducer } from "use-immer"

import { // Unsorted
	toGFM,
	toHTML,
} from "./cmap"

const init = elements => ({
	show: false,
	desc: "",
	rendered: {
		gfm: toGFM(elements),
		html: toHTML(elements),
	},
})

const actions = state => ({
	// Toggles releases.
	toggleReleases() {
		state.show = !state.show || state.desc !== "releases"
		state.desc = "releases"
	},
	// Toggles rendering GitHub Flavored Markdown.
	toggleMarkdown() {
		state.show = !state.show || state.desc !== "gfm"
		state.desc = "gfm"
	},
	// Toggles rendering HyperText Markup Language..
	toggleMarkup() {
		state.show = !state.show || state.desc !== "html"
		state.desc = "html"
	},
	// Updates the rendered GitHub Flavored Markdown.
	updateGFM(elements) {
		state.rendered.gfm = toGFM(elements)
	},
	// Updates the rendered HyperText Markup Language.
	updateHTML(elements) {
		state.rendered.html = toHTML(elements)
	},
	// Closes all.
	closeAll() {
		state.show = false
	},
})

function PreferencesReducer(state, action) {
	switch (action.type) {
	case "TOGGLE_RELEASES":
		actions(state).toggleReleases()
		return
	case "TOGGLE_GFM":
		actions(state).toggleMarkdown()
		return
	case "TOGGLE_HTML":
		actions(state).toggleMarkup()
		return
	case "UPDATE_GFM":
		actions(state).updateGFM(action.elements)
		return
	case "UPDATE_HTML":
		actions(state).updateHTML(action.elements)
		return
	case "CLOSE_ALL":
		actions(state).closeAll()
		return
	default:
		throw new Error(`PreferencesReducer: type mismatch; action.type=${action.type}`)
	}
}

function usePreferences(elements) {
	return useImmerReducer(PreferencesReducer, {}, () => init(elements))
}

export default usePreferences
