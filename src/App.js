import Editor from "Editor/Editor"
import React from "react"

// ;(() => {
// 	document.body.classList.add("debug-css")
// })()

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">

			{/* eslint-disable jsx-a11y/anchor-is-valid */}
			<Editor>
				<p>
					a
					<code>
						<strong>
							<em>
								d
							</em>
						</strong>
					</code>
					g
					<code>
						{/* h */}
						<strong>
							i
							<em>
								j
							</em>
							k
						</strong>
						{/* l */}
					</code>
				</p>

				<h1>
					Hello, <code>world</code>!
				</h1>
				<h2>
					Hello, world!
				</h2>
				<h3>
					Hello, world!
				</h3>
				<h4>
					<strong>
						Hello, world!
					</strong>
				</h4>
				<h5>
					Hello, world!
				</h5>
				<h6>
					Hello, world!
				</h6>
				<p>
					hello{" "}
					<code>
						hello{" "}
						<strong>
							hello
							<em>
								hello
							</em>
							hello
						</strong>
						hello
					</code>
					hello
					<code>
						hello
						<strong>
							hello
							<em>
								hello
							</em>
							hello
						</strong>
						hello
					</code>{" "}
					How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today? How are you doing today?
				</p>
				<p>
					<code>
						hello
						<strong>
							world
						</strong>
						hello
					</code>
				</p>
				<p>
					Hello,{" "}
					<a href="/#">
						<em>
							worldx
						</em>
					</a>
					<a href="abc">
						<em>
							<strong>
								worldy
							</strong>
						</em>
					</a>
					{" "}
					<a href="yolo">
						<code>
							fmt.Println("Hello, world!")
						</code>
					</a>
					<a href="dyolo">
						<code>
							fmt.Println("Hello, world!")
						</code>
					</a>
				</p>
				<p>
					<br />
				</p>
				<p>
					Hello,{" "}
					<a href="/#">
						<em>
							worldx
						</em>
					</a>
					<a href="abc">
						<em>
							<strong>
								worldy
							</strong>
						</em>
					</a>
					{" "}
					<a href="yolo">
						<code>
							fmt.Println("Hello, world!")
						</code>
					</a>
					<a href="dyolo">
						<code>
							fmt.Println("Hello, world!")
						</code>
					</a>
				</p>
			</Editor>
			{/* eslint-enable jsx-a11y/anchor-is-valid */}

		</div>
	</div>
)

export default App
