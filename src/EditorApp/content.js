import ctrlOrCmd from "lib/Client/ctrlOrCmd"
import React from "react"

const content = <React.Fragment>
	<p>
		This prototype currently supports <em>italics</em>, <strong>bold</strong>, <code>code</code>, <strike>strikethrough</strike>, and <a href="TODO">link</a> for inline elements. Of course, elements can be <strong><em>nested</em></strong> if that’s your thing.
	</p>
	<p>
		<br />
	</p>
	<p>
		Shortcuts are supported! You can use <code>{ctrlOrCmd}-i</code> for <em>italics</em>, <code>{ctrlOrCmd}-b</code> for <strong>bold</strong>, <code>shift-{ctrlOrCmd}-c</code> for <code>code</code>, <code>shift-{ctrlOrCmd}-x</code> for <strike>strikethrough</strike>, and <code>{ctrlOrCmd}-k</code> for <a href="TODO">links</a>. Finally, you can use <code>shift-{ctrlOrCmd}-p</code> to <em>remove</em> formatting from a selection.
	</p>
	<p>
		<br />
	</p>
	<p>
		<strong>Please note that many basic features are not yet implemented!</strong> 😎
	</p>
</React.Fragment>

export default content.props.children
