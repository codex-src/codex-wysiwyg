import ctrlOrCmd from "lib/Client/ctrlOrCmd"
import React from "react"
import { ReadOnlyEditor } from "Editor"

const Release = ({ date, children }) => (
	<div className="px-6 py-4">
		<div className="pb-2 flex flex-row justify-end">
			<div className="px-2.5 py-0.5 bg-blue-100 rounded-full">
				<p className="font-medium text-xs leading-4 text-blue-800">
					{date}
				</p>
			</div>
		</div>
		<ReadOnlyEditor className="text-gray-800" style={{ fontSize: "0.9375rem" }}>
			{children}
		</ReadOnlyEditor>
	</div>
)

const Releases = () => (
	<React.Fragment>
		<Release date="July 26, 2020">
			<p>
				– Added basic support for <code>"insert-hard-paragraph"</code> operations.
			</p>
			<p>
				<br />
			</p>
			<p>
				– Added placeholder for the main editor (visible when empty).
			</p>
		</Release>
		<hr className="border-t border-gray-200 opacity-50" />
		<Release date="July 25, 2020">
			<p>
				– Added fallback sans-serif and monospace fonts, <code>Inter</code> and <code>IBM Plex Mono</code>.{" "}
				Note that on Apple devices, <code>San Francisco</code> and Menlo are preferred.
			</p>
			<p>
				<br />
			</p>
			<p>
				<strike>– Added status text to the bottom of the viewport, active when the editor is focused.{" "}
				The indicators render the current cursor position or selection and the word count and estimated duration.</strike>
			</p>
		</Release>
		<hr className="border-t border-gray-200 opacity-50" />
		<Release date="July 24, 2020">
			<p>
				– Added basic support for <code>"insert-text"</code> operations.
			</p>
			<p>
				<br />
			</p>
			<p>
				– Added accessible tooltips for the top-right buttons.{" "}
				These can be invoked from <code>focus</code> or <code>hover</code> events.
			</p>
		</Release>
		<hr className="border-t border-gray-200 opacity-50" />
		<Release date="July 22, 2020">
			<p>
				– Added a dedicated changelog and improved readability for GitHub Flavored Markdown and semantic HTML output.
			</p>
		</Release>
		<hr className="border-t border-gray-200 opacity-50" />
		<Release date="July 21, 2020">
			<p>
				– Added basic support for resolving to plaintext, GitHub-Flavored Markdown, and HTML.
			</p>
		</Release>
		<hr className="border-t border-gray-200 opacity-50" />
		<Release date="July 20, 2020">
			<p>
				– Added support for all backspace operations: <code>"backspace-rune"</code>, <code>"backspace-word"</code>, and <code>"backspace-line"</code>.
			</p>
			<p>
				<br />
			</p>
			<p>
				– Added basic support for <em>italics</em>, <strong>bold</strong>, <code>code</code>, <strike>strikethrough</strike>, and <a href="TODO">link</a> for elements.{" "}
				Of course, elements can be <em><strong>nested</strong></em>.
			</p>
			<p>
				<br />
			</p>
			<p>
				– Added basic support for shortcuts.{" "}
				You can use <code>{ctrlOrCmd}-i</code> for <em>italics</em>, <code>{ctrlOrCmd}-b</code> for <strong>bold</strong>, <code>shift-{ctrlOrCmd}-c</code> for <code>code</code>, <code>shift-{ctrlOrCmd}-x</code> for <strike>strikethrough</strike>, and <code>{ctrlOrCmd}-k</code> for <a href="TODO">links</a>.{" "}
				Finally, you can use <code>shift-{ctrlOrCmd}-p</code> to <em>remove</em> formatting from a selection.
			</p>
			<p>
				<br />
			</p>
			<p>
				*Note that formatting without a selection is not yet supported.
			</p>
		</Release>
	</React.Fragment>
)

export default Releases
