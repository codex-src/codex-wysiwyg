import Editor from "./Editor/Editor"
import React from "react"

const markup = `
<p>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam quam ac justo aliquet vestibulum nec a eros. Nullam malesuada eros eros, a fringilla orci tincidunt vehicula. Etiam sed tristique ipsum, quis egestas turpis. Sed placerat nunc sit amet sagittis ullamcorper. Nam urna nisl, laoreet vitae lectus nec, convallis ultricies tellus. Nullam ante nibh, dictum at dui at, sodales pellentesque neque. Nunc nec convallis massa, vitae volutpat mauris. Vestibulum euismod ligula et felis sodales, ac vestibulum est tincidunt. Nulla id ex sodales sem posuere ultricies. Vestibulum quis nunc nulla. Cras scelerisque elit sed tortor pellentesque sollicitudin.
</p>
<p>
	<br>
</p>
<p>
	Nullam vel viverra tortor, in varius ex. Donec scelerisque auctor leo, id iaculis dui dapibus ut. Quisque vitae leo turpis. Nunc eu urna imperdiet, tincidunt nunc vel, fringilla lacus. Sed a velit non lacus hendrerit commodo. Nam auctor odio ac porttitor tristique. Aenean hendrerit scelerisque enim vitae consectetur. Donec pharetra aliquam dui, rutrum venenatis lacus tincidunt ac. Donec eget tristique odio.
</p>
<p>
	<br>
</p>
<p>
	Proin mattis convallis interdum. Ut egestas odio in sem sagittis, a viverra ligula egestas. Mauris porttitor libero ac blandit ultricies. Nullam quis velit leo. Aliquam non magna sit amet nulla elementum tempus non eget orci. Vivamus ut sodales purus. Morbi imperdiet mi eget turpis vehicula porta. Suspendisse at lectus non diam eleifend blandit. Sed odio massa, pharetra non sollicitudin id, dapibus vitae lacus. Duis dignissim porttitor enim vel malesuada. Mauris magna lectus, tristique a luctus ut, varius vitae ex. Morbi a mattis lorem.
</p>
<p>
	<br>
</p>
<p>
	In hac habitasse platea dictumst. Nullam feugiat semper egestas. Morbi suscipit neque nec volutpat tempus. Fusce sit amet sollicitudin lorem. Sed mattis, arcu sed mattis molestie, urna orci laoreet est, et egestas tellus diam luctus ligula. Curabitur molestie urna commodo nulla sodales egestas vitae sed enim. Donec ipsum dui, accumsan ut consectetur non, commodo vitae nulla. Donec at dui erat. Vivamus commodo diam vulputate, dapibus ligula vel, dapibus orci. Mauris quis fermentum ex.
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
