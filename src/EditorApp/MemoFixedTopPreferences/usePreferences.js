import { useImmerReducer } from "use-immer"

import { // Unsorted
	toGFM,
	toHTML,
} from "./cmap"

const init = elements => console.log("hello") ||  ({
	show: false,
	desc: "",
	rendered: {
		gfm: toGFM(elements),
		html: toHTML(elements),
	},
})

// Toggles releases.
function toggleReleases(p) {
	// p.show = (
	// 	!p.show ||
	// 	p.desc === "releases"
	// )
	p.show = !p.show
	p.desc = "releases"
}

// Toggles rendering GitHub Flavored Markdown.
function toggleGFM(p, elements) {
	// p.show = (
	// 	!p.show ||
	// 	p.desc === "gfm"
	// )
	// p.desc = "gfm"
}

// Toggles rendering HTML.
function toggleHTML(p, elements) {
	// p.show = (
	// 	!p.show ||
	// 	p.desc === "html"
	// )
	// p.desc = "html"
}

// Hides all.
function hideAll(p) {
	// p.show = false
}

function PreferencesReducer(p, action) {
	switch (action.type) {
	case "TOGGLE_RELEASES":
		toggleReleases(p)
		return
	case "TOGGLE_GFM":
		toggleGFM(p)
		return
	case "TOGGLE_HTML":
		toggleHTML(p)
		return
	case "HIDE_ALL":
		hideAll(p)
		return
	default:
		throw new Error(`PreferencesReducer: type mismatch; action.type=${action.type}`)
	}
}

function usePreferences(elements) {
	return useImmerReducer(PreferencesReducer, {}, () => init(elements))
}

export default usePreferences
