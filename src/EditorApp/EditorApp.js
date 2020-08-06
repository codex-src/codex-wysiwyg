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

function useLayoutFocusLines(state) {
	React.useLayoutEffect(
		React.useCallback(() => {
			const keys = []
			originalFor:
			for (let x = 0; x < state.elements.length; x++) {
				if (state.elements[x].key === state.range.start.key) {
					for (; x < state.elements.length; x++) {
						keys.push(state.elements[x].key)
						if (state.elements[x].key === state.range.end.key) {
							// No-op
							break originalFor
						}
					}
				}
			}
			const els = []
			for (let x = 0; x < keys.length; x++) {
				const el = document.getElementById(keys[x])
				if (!el) {
					// No-op
					continue
				}
				const fn = !state.focused ? attr => el.removeAttribute(attr)
					: attr => el.setAttribute(attr, true)
				if (!x && keys.length === 1) {
					fn("data-feature-focus-line")
				} else if (!x) {
					fn("data-feature-focus-line-start")
				} else if (x && x + 1 < keys.length) {
					fn("data-feature-focus-line-center")
				} else {
					fn("data-feature-focus-line-end")
				}
				els.push(el)
			}
			return () => {
				for (const each of els) {
					each.removeAttribute("data-feature-focus-line")
					each.removeAttribute("data-feature-focus-line-start")
					each.removeAttribute("data-feature-focus-line-center")
					each.removeAttribute("data-feature-focus-line-end")
				}
			}
		}, [state]),
		[state.focused, state.range],
	)
}

const App = () => {
	const [state, dispatch] = useEditor()
	const [prefs, dispatchPrefs] = usePreferences(() => state.elements)

	const [debouncedElements, setDebouncedElements] = React.useState(() => state.elements)

	// Mounts elements from state.elements (because of
	// props.children).
	React.useEffect(
		React.useCallback(() => {
			if (state.mounted) {
				const elements = state.elements
				dispatchPrefs({
					type: "MOUNT_ELEMENTS",
					elements,
				})
			}
		}, [state, dispatchPrefs]),
		[state.mounted],
	)

	// Effect for debouncedElements (debounced once per 60 FPS).
	React.useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedElements(state.elements)
		}, 16.67)
		return () => {
			clearTimeout(id)
		}
	}, [state.elements])

	// Effect for read-only mode.
	React.useEffect(() => {
		const article = document.getElementById("main-editor")
		article.contentEditable = !prefs.readOnlyMode
	}, [prefs.readOnlyMode])

	// Effect for markdown.
	React.useEffect(
		React.useCallback(() => {
			if (prefs.show && prefs.desc === "markdown") {
				const elements = debouncedElements
				dispatchPrefs({
					type: "UPDATE_MARKDOWN",
					elements,
				})
			}
		}, [debouncedElements, prefs, dispatchPrefs]),
		[debouncedElements],
	)

	// Effect for markup.
	React.useEffect(
		React.useCallback(() => {
			if (prefs.show && prefs.desc === "markup") {
				const elements = debouncedElements
				dispatchPrefs({
					type: "UPDATE_MARKUP",
					elements,
				})
			}
		}, [debouncedElements, prefs, dispatchPrefs]),
		[debouncedElements],
	)

	// Effect for the focused line/s.
	useLayoutFocusLines(state)

	useKeydown(e => {
		if (e.keyCode === keyCodeFor("Escape")) {
			dispatchPrefs({
				type: "HIDE_ALL",
			})
		}
	})

	return (
		<ContextDispatch.Provider value={dispatch}>
			<ContextPrefsDispatch.Provider value={dispatchPrefs}>

				<div className="px-6 py-32 flex flex-row justify-center h-full">
					<div className="w-full max-w-2xl h-full">

						<MemoFixedTopPreferences prefs={prefs} />

						<div className="relative h-full">
							{(state.elements.length === 1 && !state.elements[0].props.children.length) && (
								<div className="absolute pointer-events-none">
									<div id="main-editor-placeholder">
										<p className="text-lg text-gray-800" style={{ opacity: !state.focused ? 0.25 : 0.375 }}>
											A long time ago in a galaxy far, far away…
										</p>
									</div>
								</div>
							)}
							<Editor
								id="main-editor"
								className="pb-32 min-h-full text-lg text-gray-800"
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
