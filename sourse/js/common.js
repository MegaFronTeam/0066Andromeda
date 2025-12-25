"use strict";

// import Swiper from '../libs/swiper/swiper-bundle.min.mjs';
// import JSCCommon from "./JSCCommon.js";

function eventHandler() {
	// const $ = jQuery;
	JSCCommon.init();

	function whenResize() {
		JSCCommon.setFixedNav();
	}

	// Парсинг img с SVG и вставка inline SVG
	function inlineSvg() {
		document.querySelectorAll(".img-to-svg-js").forEach(img => {
			const imgURL = img.src;
			const imgClass = img.className;
			const imgID = img.id;

			fetch(imgURL)
				.then(response => response.text())
				.then(data => {
					const parser = new DOMParser();
					const svg = parser
						.parseFromString(data, "image/svg+xml")
						.querySelector("svg");

					if (svg) {
						if (imgID) svg.id = imgID;
						if (imgClass) svg.classList.add(...imgClass.split(" "));

						img.parentNode.replaceChild(svg, img);
					}
				})
				.catch(error => console.log("Error loading SVG:", error));
		});
	}

	inlineSvg();

	window.addEventListener(
		"scroll",
		() => {
			JSCCommon.setFixedNav();
		},
		{passive: true}
	);
	window.addEventListener("resize", whenResize, {passive: true});

	whenResize();

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: " .swiper-pagination",
			type: "bullets",
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	};

	new Swiper(".breadcrumb-slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
	});
	new Swiper(".sPrices__slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
	});

	const swiper4 = new Swiper(".sLogos__slider--js", {
		// slidesPerView: 5,
		slidesPerView: "auto",
		spaceBetween: 30,
		// loop: true,
	});
}
if (document.readyState !== "loading") {
	eventHandler();
} else {
	document.addEventListener("DOMContentLoaded", eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
