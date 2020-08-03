import ContextDispatch from "./ContextDispatch"
import ContextPrefsDispatch from "./ContextPrefsDispatch"
import ctrlOrCmd from "lib/Client/ctrlOrCmd"
import keyCodeFor from "lib/Client/keyCodeFor"
import MemoFixedBottomWYSIWYGMenu from "./MemoFixedBottomWYSIWYGMenu"
import MemoFixedTopPreferences from "./MemoFixedTopPreferences"
import React from "react"
import useKeydown from "lib/x/handlers/useKeydown"
import usePreferences from "./usePreferences"

import {
	Editor,
	useEditor,
} from "Editor"

import "./data-feature.css"

const App = () => {
	const [state, dispatch] = useEditor()
	const [prefs, prefsDispatch] = usePreferences(() => state.elements)

	const [debouncedElements, setDebouncedElements] = React.useState(() => state.elements)

	// Debounces elements by one 60 FPS frame.
	React.useEffect(() => {
		// Do not prevent the unmounted render:
		if (!state.mounted) {
			if (!prefs.show || (prefs.show && prefs.desc === "releases")) {
				// No-op
				return
			}
		}
		const id = setTimeout(() => {
			setDebouncedElements(state.elements)
		}, 16.67)
		return () => {
			clearTimeout(id)
		}
	}, [
		state.mounted,
		state.elements,
		prefs.show,
		prefs.desc,
	])

	// NOTE: prefs.readOnlyMode is a synthetic property of an
	// editor. Read-only mode can be enabled and disabled by
	// toggling contenteditable on the editor element.
	React.useEffect(() => {
		const article = document.getElementById("main-editor")
		article.contentEditable = !prefs.readOnlyMode
	}, [prefs.readOnlyMode])

	React.useLayoutEffect(() => {
		if (prefs.show && prefs.desc === "markdown") {
			prefsDispatch({
				type: "UPDATE_MARKDOWN",
				elements: debouncedElements,
			})
		}
	}, [
		debouncedElements,
		prefs.show,
		prefs.desc,
		prefsDispatch,
	])

	React.useLayoutEffect(() => {
		if (prefs.show && prefs.desc === "markup") {
			prefsDispatch({
				type: "UPDATE_MARKUP",
				elements: debouncedElements,
			})
		}
	}, [
		debouncedElements,
		prefs.show,
		prefs.desc,
		prefsDispatch,
	])

	// Manages [data-feature-focus-line].
	React.useEffect(() => {
		if (!state.range.start.key) {
			// No-op
			return
		} else if (state.range.start !== state.range.end) {
			// No-op
			return
		}
		const el = document.getElementById(state.range.start.key)
		if (el) {
			el.setAttribute("data-feature-focus-line", true)
		}
		return () => {
			if (el) {
				el.removeAttribute("data-feature-focus-line")
			}
		}
	}, [state.range])

	// Binds the next keydown event to hide output.
	useKeydown(e => {
		if (e.keyCode === keyCodeFor("Escape")) {
			prefsDispatch({
				type: "HIDE_ALL",
			})
		}
	})

	return (
		<ContextDispatch.Provider value={dispatch}>
			<ContextPrefsDispatch.Provider value={prefsDispatch}>

				<div className="px-6 py-32 flex flex-row justify-center h-full">
					<div className="w-full max-w-2xl h-full">

						<MemoFixedTopPreferences prefs={prefs} />

						<div className="relative h-full">
							{(state.elements.length === 1 && !state.elements[0].props.children.length) && (
								<div className="absolute pointer-events-none">
									<p className="text-lg text-gray-800" style={{ opacity: !state.focused ? 0.25 : 0.375 }}>
										A long time ago in a galaxy far, far away…
									</p>
								</div>
							)}
							<Editor
								id="main-editor"
								className="min-h-full text-lg text-gray-800"
								state={state}
								dispatch={dispatch}
							>
								<p>
									This prototype currently supports <em>italics</em>, <strong>bold</strong>, <code>code</code>, <strike>strikethrough</strike>, and <a href="TODO">link</a> for inline elements.{" "}
									Of course, elements can be <strong><em>nested</em></strong> if that’s your thing.
								</p>
								<p>
									<br />
								</p>
								<p>
									Shortcuts are supported!{" "}
									You can use <code>{ctrlOrCmd}-i</code> for <em>italics</em>, <code>{ctrlOrCmd}-b</code> for <strong>bold</strong>, <code>shift-{ctrlOrCmd}-c</code> for <code>code</code>, <code>shift-{ctrlOrCmd}-x</code> for <strike>strikethrough</strike>, and <code>{ctrlOrCmd}-k</code> for <a href="TODO">links</a>.{" "}
									Finally, you can use <code>shift-{ctrlOrCmd}-p</code> to <em>remove</em> formatting from a selection.
								</p>
								<p>
									<br />
								</p>
								<p>
									<strong>Please note that many basic features are not yet implemented!</strong> 😎
								</p>
							</Editor>
						</div>

						<MemoFixedBottomWYSIWYGMenu
							readOnlyMode={prefs.readOnlyMode}
							focused={state.focused}
							rangeTypes={state.rangeTypes}
						/>

					</div>
				</div>

			</ContextPrefsDispatch.Provider>
		</ContextDispatch.Provider>
	)
}

export default App
