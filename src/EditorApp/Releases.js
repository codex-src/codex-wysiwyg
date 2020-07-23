import ctrlOrCmd from "lib/Client/ctrlOrCmd"
import React from "react"
import { ReadOnlyEditor } from "Editor"

const ReleaseItem = ({ date, release, children }) => (
	<div className="px-6 py-4">
		<div className="pb-2 flex flex-row justify-end">
			<div className="px-2.5 py-0.5 bg-green-100 rounded-full">
				<p className="font-medium text-xs leading-4 text-green-800">
					{date} &nbsp;– &nbsp;v{release}
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
		<ReleaseItem date="July 22, 2020" release="0.3">
			<p>
				– Added a dedicated changelog and improved readability for markdown and HTML-rendered output.
			</p>
		</ReleaseItem>
		<hr className="border-t border-gray-200" />
		<ReleaseItem date="July 21, 2020" release="0.2">
			<p>
				– Added basic support for resolving to plaintext, GitHub-Flavored Markdown, and HTML.
			</p>
		</ReleaseItem>
		<hr className="border-t border-gray-200" />
		<ReleaseItem date="July 20, 2020" release="0.1">
			<p>
				– Added complete support for all backspace operations, such as <code>"backspace-rune"</code>, <code>"backspace-word"</code>, and <code>"backspace-line"</code>.
			</p>
			<p>
				<br />
			</p>
			<p>
				– Added basic support for <em>italics</em>, <strong>bold</strong>, <code>code</code>, <strike>strikethrough</strike>, and <a href="TODO">link</a> for inline elements.{" "}
				Of course, elements can be <em><strong>nested</strong></em> if that’s your thing.
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
		</ReleaseItem>
	</React.Fragment>
)

export default Releases
