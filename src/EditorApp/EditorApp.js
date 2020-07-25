import ctrlOrCmd from "lib/Client/ctrlOrCmd"
import DocumentTitle from "lib/x/DocumentTitle"
import FixedPreferences from "./FixedPreferences"
import FixedStatusBars from "./FixedStatusBars"
import React from "react"

import { // Unsorted
	FocusedContext,
	ElementsContext,
	RangeContext,
} from "./contexts"

import { // Unsorted
	Editor,
	useEditor,
} from "Editor"

const App = () => {
	const [state, dispatch] = useEditor()

	return (
		<FocusedContext.Provider value={state.focused}>
			<ElementsContext.Provider value={state.elements}>
				<RangeContext.Provider value={state.range}>
					<DocumentTitle title="Codex (0.4)">
						<div className="px-6 py-32 flex flex-row justify-center">
							<div className="w-full max-w-2xl">

								<FixedPreferences />

								<Editor className="text-lg text-gray-800" state={state} dispatch={dispatch}>
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

								<FixedStatusBars />

							</div>
						</div>
					</DocumentTitle>
				</RangeContext.Provider>
			</ElementsContext.Provider>
		</FocusedContext.Provider>
	)
}

export default App
