// CREDITS : https://www.cssscript.com/image-zoom-pan-hover-detail-view/
let addZoom = () => {
	// (A) GET CONTAINER + IMAGE SOURCE
	let containers = document.querySelectorAll('.zoom');

	containers.forEach(container => {
		let imgsrc =
			container.currentStyle || window.getComputedStyle(container, false);
		imgsrc = imgsrc.backgroundImage.slice(4, -1).replace(/"/g, '');

		// (B) LOAD IMAGE + ATTACH ZOOM
		let img = new Image();
		img.src = imgsrc;
		img.onload = () => {
			// (B1) CALCULATE ZOOM RATIO
			let ratio = img.naturalHeight / img.naturalWidth,
				percentage = ratio * 100 + '%';

			// (B2) ATTACH ZOOM ON MOUSE MOVE
			container.onmousemove = e => {
				let rect = e.target.getBoundingClientRect(),
					xPos = e.clientX - rect.left,
					yPos = e.clientY - rect.top,
					xPercent = xPos / (container.clientWidth / 100) + '%',
					yPercent = yPos / ((container.clientWidth * ratio) / 100) + '%';

				Object.assign(container.style, {
					backgroundPosition: xPercent + ' ' + yPercent,
					backgroundSize: img.naturalWidth + 'px',
				});
			};

			// (B3) RESET ZOOM ON MOUSE LEAVE
			container.onmouseleave = e => {
				Object.assign(container.style, {
					backgroundPosition: 'center',
					backgroundSize: 'cover',
				});
			};
		};
	});
};

// (C) ATTACH FOLLOW ZOOM
window.addEventListener('load', addZoom)


//   // (A) GET LIGHTBOX & ALL .ZOOMD IMAGES
//   let all = document.querySelectorAll(".zoom img"),
//       lightbox = document.getElementById("lightbox");

// window.onload = () => {

 
//   // (B) CLICK TO SHOW IMAGE IN LIGHTBOX
//   // * SIMPLY CLONE INTO LIGHTBOX & SHOW
//   if (all.length>0) { for (let i of all) {
//     i.onclick = () => {
//       let clone = i.cloneNode();
//       clone.className = "";
//       lightbox.innerHTML = "";
//       lightbox.appendChild(clone);
//       lightbox.className = "show";
//     };
//   }}
 
//   // (C) CLICK TO CLOSE LIGHTBOX
//   lightbox.onclick = () => {
//     lightbox.className = "";
//   };
// };