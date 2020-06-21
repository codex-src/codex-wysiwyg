import Editor from "Editor/Editor"
import React from "react"

const App = () => (
	<div className="px-6 py-24 flex flex-row justify-center">
		<div className="w-full max-w-3xl">

			<div>
				{/* ... */}
			</div>

			<article className="focus:outline-none" contentEditable suppressContentEditableWarning>
				<div className="group">
					<svg
						className="-ml-6 mr-2 mt-1 float-left w-4 h-4 text-transparent group-hover:text-blue-500 transition duration-300 ease-in-out"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" />
					</svg>
					<p>
						Ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum
					</p>
				</div>
				<div className="group">
					<svg
						className="-ml-6 mr-2 mt-1 float-left w-4 h-4 text-transparent group-hover:text-blue-500 transition duration-300 ease-in-out"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" />
					</svg>
					<p>
						Ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum
					</p>
				</div>
				<div className="group">
					<svg
						className="-ml-6 mr-2 mt-1 float-left w-4 h-4 text-transparent group-hover:text-blue-500 transition duration-300 ease-in-out"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						{/* <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" /> */}
					</svg>
					<p>
						<br />
					</p>
				</div>
				<div className="group">
					<svg
						className="-ml-6 mr-2 mt-1 float-left w-4 h-4 text-transparent group-hover:text-blue-500 transition duration-300 ease-in-out"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" />
					</svg>
					<p>
						Ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum lorem dolor sit amet ipsum
					</p>
				</div>
			</article>

			<br />

			{/* eslint-disable jsx-a11y/anchor-is-valid */}
			<Editor>
				<h1>
					Hello, world!
				</h1>
				<p>
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
					</code>
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
				{/* <hr /> */}
				<p>
					Hello, world!
				</p>
				{/* <p> */}
				{/* </p> */}
				{/* <p> */}
				{/* 	<br /> */}
				{/* </p> */}
			</Editor>
			{/* eslint-enable jsx-a11y/anchor-is-valid */}

		</div>
	</div>
)

export default App
