import keyCodeFor from "lib/Client/keyCodeFor"
import MemoPreferences from "./MemoPreferences"
import MemoWYSIWYGToolbar from "./MemoWYSIWYGToolbar"
import React from "react"
import useKeydown from "lib/x/handlers/useKeydown"
import usePreferences from "./usePreferences"
import userAgent from "lib/Client/userAgent"

import {
	Editor,
	useEditor,
} from "Editor"

const ctrlOrCmd = !userAgent.MacOSX ? "ctrl" : "cmd"

const EditorApp = () => {
	const [state, dispatch] = useEditor()
	const [prefs, dispatchPrefs] = usePreferences(() => state.elements)

	const [debouncedElements, setDebouncedElements] = React.useState(() => state.elements)

	// Mounts deferred elements to preferences (because of the
	// props.children pattern).
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

	// Manages debouncedElements.
	React.useEffect(() => {
		const id = setTimeout(() => {
			setDebouncedElements(state.elements)
		}, 16.67)
		return () => {
			clearTimeout(id)
		}
	}, [state.elements])

	// Manages read-only mode.
	React.useEffect(() => {
		const article = document.getElementById("main-editor")
		article.contentEditable = !prefs.readOnlyMode
	}, [prefs.readOnlyMode])

	// Manages rendered markdown.
	React.useEffect(
		React.useCallback(() => {
			if (prefs.show) {
				if (prefs.desc === "markdown") {
					const elements = debouncedElements
					dispatchPrefs({
						type: "UPDATE_MARKDOWN",
						elements,
					})
				}
			}
		}, [debouncedElements, prefs, dispatchPrefs]),
		[debouncedElements, prefs.show],
	)

	// Manages rendered markup.
	React.useEffect(
		React.useCallback(() => {
			if (prefs.show) {
				if (prefs.desc === "markup") {
					const elements = debouncedElements
					dispatchPrefs({
						type: "UPDATE_MARKUP",
						elements,
					})
				}
			}
		}, [debouncedElements, prefs, dispatchPrefs]),
		[debouncedElements, prefs.show],
	)

	useKeydown(e => {
		if (e.keyCode === keyCodeFor("Escape")) {
			dispatchPrefs({
				type: "HIDE_ALL",
			})
		}
	})

	return (
		<div className="px-6 py-32 flex flex-row justify-center h-full">
			<div className="w-full max-w-2xl h-full">

				<div className="px-3 pb-8 fixed inset-0 z-10 pointer-events-none">
					<MemoPreferences
						state={state}
						dispatch={dispatch}
						prefs={prefs}
						dispatchPrefs={dispatchPrefs}
					/>
				</div>

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

				{!prefs.readOnlyMode && (
					<aside className="px-3 py-8 fixed inset-x-0 bottom-0 pointer-events-none">
						<div className="flex flex-row justify-center">
							<MemoWYSIWYGToolbar
								state={state}
								dispatch={dispatch}
								prefs={prefs}
								dispatchPrefs={dispatchPrefs}
							/>
						</div>
					</aside>
				)}

			</div>
		</div>
	)
}

export default EditorApp
