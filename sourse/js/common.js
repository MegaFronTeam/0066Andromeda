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
		navigation: {
			nextEl: ".sPrices .swiper-button-next",
			prevEl: ".sPrices .swiper-button-prev",
		},
	});

	const swiper4 = new Swiper(".sLogos__slider--js", {
		slidesPerView: "auto",
		spaceBetween: 30,
		loop: true,
		speed: 4000,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		freeMode: {
			enabled: true,
			momentum: false,
		},
		grabCursor: false,
		allowTouchMove: false,
	});

	$(".headerBlock li a, .sub-menu a").on("click", function (e) {
		e.preventDefault();
		const target = $(this).attr("href");
		const $target = $(target);

		if ($target.length) {
			// Скролл до блока (плавность из CSS)
			window.scrollTo({
				top: $target.offset().top - 100,
				behavior: "smooth",
			});

			// Делаем клик на dd-group__head после небольшой задержки
			setTimeout(() => {
				const $ddHead = $(target + " .dd-group__head");
				if ($ddHead.length) {
					$ddHead.trigger("click");
				}
			}, 100);
		}
	});

	// Отслеживание видимости headerBlock__btn
	const headerBtn = document.querySelector(".headerBlock__btn");
	const hheaderBtnFixed = document.querySelector(".headerBlock__btn--fixed");
	let headerBtnObserver = null;

	function initHeaderBtnObserver() {
		if (!headerBtn) return;

		// Отключаем предыдущий observer, если есть
		if (headerBtnObserver) {
			headerBtnObserver.disconnect();
		}

		headerBtnObserver = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						// Кнопка видна - убираем fixed класс
						hheaderBtnFixed.classList.remove("active");
					} else {
						// Кнопка скрылась - добавляем fixed класс
						hheaderBtnFixed.classList.add("active");
					}
				});
			},
			{
				threshold: 0,
				rootMargin: "0px",
			}
		);

		headerBtnObserver.observe(headerBtn);
	}

	initHeaderBtnObserver();

	// Пересоздаём observer при resize
	window.addEventListener(
		"resize",
		() => {
			initHeaderBtnObserver();
		},
		{passive: true}
	);
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
