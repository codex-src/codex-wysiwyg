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
		<ReadOnlyEditor>
			{children}
		</ReadOnlyEditor>
	</div>
)

const Releases = () => (
	<React.Fragment>

		<Release date="August 6, 2020">
			<p>
				– Added basic support for compositional text input.
			</p>
		</Release>

		<hr className="border-t border-gray-200 opacity-50" />
		<Release date="August 4, 2020">
			<p>
				– Added an experimental feature ‘Focus Line’.{" "}
				The currently focused element renders a light blue background.{" "}
				This makes it easier to discern elements from one another.
			</p>
			<p>
				<br />
			</p>
			<p>
				<strike>
					– Added an experimental feature ‘Underscore Rich Text’.{" "}
					Some rich text elements render a soft <code>box-shadow</code> in read-write mode.{" "}
					This makes it easier to discern inline elements from one another.
				</strike>
			</p>
		</Release>

		<hr className="border-t border-gray-200 opacity-50" />
		<Release date="August 2, 2020">
			<p>
				– Dramatically improved performance by removing useless renders.{" "}
				Use of <code>React.createContext</code>, <code>React.useContext</code> and <code>React.memo</code> have been measured and optimized for performance.
			</p>
		</Release>

		<hr className="border-t border-gray-200 opacity-50" />
		<Release date="July 29, 2020">
			<p>
				– The WYSIWYG menu is now interactive.{" "}
				You can use the WYSIWYG buttons to apply formatting to a selection.
			</p>
			<p>
				<br />
			</p>
			<p>
				– Added support for read-only mode (see button at the top-left corner).{" "}
				Read-only mode hides the WYSIWYG menu and prevents future edits.
			</p>
			<p>
				<br />
			</p>
			<p>
				*Note that formatting without a selection is not yet supported.
			</p>
		</Release>

		<hr className="border-t border-gray-200 opacity-50" />
		<Release date="July 28, 2020">
			<p>
				– The WYSIWYG menu is now partially functional.{" "}
				The buttons themselves do not yet work but they do respond to the currently formatted selection.
			</p>
		</Release>

		<hr className="border-t border-gray-200 opacity-50" />
		<Release date="July 27, 2020">
			<p>
				– Protoyped the WYSIWYG menu UI and accessible tooltips.{" "}
				Note that the UI is not functional yet.
			</p>
			<p>
				<br />
			</p>
			<p>
				– Changed GitHub Flavored Markdown-rendered output to render as sans-serif.{" "}
				Colors for both GFM and HTML have been revamped as well.
			</p>
		</Release>

		<hr className="border-t border-gray-200 opacity-50" />
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
				– Added fallback sans-serif and monospace fonts <code>Inter</code> and <strike><code>IBM Plex Mono</code></strike> <code>Fira Code</code>.{" "}
				Note that on Apple devices, <code>San Francisco</code> and <code>Menlo</code> are preferred.
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
				– Added basic support for resolving to plaintext, GitHub Flavored Markdown, and HTML.
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
