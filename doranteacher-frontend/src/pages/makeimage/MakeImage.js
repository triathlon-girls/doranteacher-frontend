import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import ReloadJson from './ReloadJson';

function MakeImage() {
	const [canvas, setCanvas] = useState('');
	const [imgURL, setImgURL] = useState('');

	useEffect(() => {
		setCanvas(initCanvas());
	}, []);
	const initCanvas = () =>
		new fabric.Canvas('canvas', {
			height: 600,
			width: 600,
			backgroundColor: 'pink',
		});

	const addImg = (e, url, canvi) => {
		e.preventDefault();
		new fabric.Image.fromURL(url, (img) => {
			img.scale(0.75);
			canvi.add(img);
			canvi.renderAll();
			setImgURL('');
		});
	};
	return (
		<div>
			<h1>Fabric.js on React - fabric.Canvas('...')</h1>

			<form onSubmit={(e) => addImg(e, imgURL, canvas)}>
				<div>
					<input type="text" value={imgURL} onChange={(e) => setImgURL(e.target.value)} />
					<button type="submit">Add Image</button>
				</div>
			</form>
			<button
				onClick={(e) => {
					e.preventDefault();
					let jsonData = canvas.toJSON();
					console.log(JSON.stringify(jsonData));
				}}
			>
				To JSON
			</button>
			<button onClick={(e) => canvas.clear(e)}>Clear Canvas</button>
			<canvas id="canvas" />

			<br />
			<ReloadJson />
		</div>
	);
}

export default MakeImage;
