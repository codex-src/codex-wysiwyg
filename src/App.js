import Editor from "./Editor/Editor"
import React from "react"

const markup = `
<p>
	<code>Lorem ipsum dolor sit amet</code>, <strong>consectetur adipiscing elit</strong>. Duis aliquam quam ac justo aliquet vestibulum nec a eros. <em>Nullam malesuada eros eros</em>, a fringilla orci tincidunt vehicula. <strike>Etiam sed tristique ipsum,</strike> quis egestas turpis. Sed placerat nunc sit amet sagittis ullamcorper. <a href="https://google.com">Nam urna nisl, laoreet vitae lectus nec, convallis ultricies tellus.</a> Nullam ante nibh, dictum at dui at, sodales pellentesque neque. Nunc nec convallis massa, vitae volutpat mauris. Vestibulum euismod ligula et felis sodales, ac vestibulum est tincidunt. Nulla id ex sodales sem posuere ultricies. Vestibulum quis nunc nulla. Cras scelerisque elit sed tortor pellentesque sollicitudin.
</p>
<p>
	<br>
</p>
<p>
	<code>Lorem ipsum dolor sit amet</code>, <strong>consectetur adipiscing elit</strong>. Duis aliquam quam ac justo aliquet vestibulum nec a eros. <em>Nullam malesuada eros eros</em>, a fringilla orci tincidunt vehicula. <strike>Etiam sed tristique ipsum,</strike> quis egestas turpis. Sed placerat nunc sit amet sagittis ullamcorper. <a href="https://google.com">Nam urna nisl, laoreet vitae lectus nec, convallis ultricies tellus.</a> Nullam ante nibh, dictum at dui at, sodales pellentesque neque. Nunc nec convallis massa, vitae volutpat mauris. Vestibulum euismod ligula et felis sodales, ac vestibulum est tincidunt. Nulla id ex sodales sem posuere ultricies. Vestibulum quis nunc nulla. Cras scelerisque elit sed tortor pellentesque sollicitudin.
</p>
`

// <p>
// 	Hello, <code><strong><em>world</em></strong></code>!
// </p>
// <p>
// 	Hello, <strong><em>world</em></strong>!
// </p>
// <p>
// 	Hello, <em>world</em>!
// </p>
// <p>
// 	Hello, world!
// </p>
// <p>
// 	<br>
// </p>
// <p>
// 	Hello, <a href="a"><code><strong><em>worldx</em></strong></code></a><a href="b"><code><strong><em>worldy</em></strong></code></a>!
// </p>
// `

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">
			<Editor markup={markup}>
				{/* <p> */}
				{/* 	Hello, <a href="https://google.com"><code><strong><em>world</em></strong></code></a>! */}
				{/* </p> */}
				{/* <p> */}
				{/* 	Hello, <code><strong><em>world</em></strong></code>! */}
				{/* </p> */}
				{/* <p> */}
				{/* 	Hello, <strong><em>world</em></strong>! */}
				{/* </p> */}
				{/* <p> */}
				{/* 	Hello, <em>world</em>! */}
				{/* </p> */}
				{/* <p> */}
				{/* 	Hello, world! */}
				{/* </p> */}
				{/* <p> */}
				{/* 	<br /> */}
				{/* </p> */}
				{/* <p> */}
				{/* 	Hello, <a href="a"><code><strong><em>worldx</em></strong></code></a><a href="b"><code><strong><em>worldy</em></strong></code></a>! */}
				{/* </p> */}
			</Editor>
		</div>
	</div>
)

export default App
