/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, {
	Autoplay,
	EffectFade,
	Navigation,
	Lazy,
	Pagination,
	Zoom,
	Thumbs,
} from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import '../../scss/base/swiper.scss';
// Полный набор стилей из scss/libs/swiper.scss
// import '../../scss/libs/swiper.scss';
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	if (document.querySelector('.home__slider')) {
		new Swiper('.home__slider', {
			modules: [Autoplay, EffectFade, Lazy, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,
			lazy: true,
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.home__slider-pagination',
				clickable: true,
			},
		});
	}
	if (document.querySelector('.recommended__slider')) {
		new Swiper('.recommended__slider', {
			modules: [Autoplay, Navigation, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 48,
			speed: 800,
			// loop: true,
			lazy: true,
			// autoplay: {
			// 	delay: 3000,
			// 	disableOnInteraction: false,
			// },
			navigation: {
				prevEl: '.recommended__prev',
				nextEl: '.recommended__next',
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 48,
				},
			},
		});
	}

	if (document.querySelector('.single-product__gallery-list')) {
		var galleryDesktopThumbnails = new Swiper('.single-product__gallery-list', {
			slidesPerView: 4,
			direction: 'vertical',
			spaceBetween: 10
		});
	}

	if (document.querySelector('.single-product__gallery-show')) {
		var gallerySwiperDesktop = new Swiper('.single-product__gallery-show', {
			// Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Lazy, Thumbs, Zoom],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			speed: 800,

			slideToClickedSlide: true,
			thumbs: {
				swiper: galleryDesktopThumbnails,
			},

			navigation: {
				prevEl: '.single-product__gallery-desktop-main-prev',
				nextEl: '.single-product__gallery-desktop-main-next',
			},

			// Брейкпоинты

			// События
			on: {},
		});
	}


	if (gallerySwiperDesktop) {
		gallerySwiperDesktop.on('slideChangeTransitionStart', function () {
			galleryDesktopThumbnails.slideTo(gallerySwiperDesktop.activeIndex);
		});

		galleryDesktopThumbnails.on('transitionStart', function () {
			gallerySwiperDesktop.slideTo(galleryDesktopThumbnails.activeIndex);
		});
	}

	if (document.querySelector('.single-product__gallery-show-mobile')) {
		let sliderImages = document.querySelectorAll(
			'.single-product__gallery-show-mobile .swiper-slide'
		);

		let sliderThumbnails = [];

		sliderImages.forEach(sliderImage => {
			sliderThumbnails.push(sliderImage.innerHTML);
		});

		let gallerySwiperMobile = new Swiper(
			'.single-product__gallery-show-mobile',
			{
				modules: [
					Autoplay,
					Navigation,
					Lazy,
					Pagination,
					Zoom,
					EffectFade,
					Thumbs,
				],
				observer: true,
				observeParents: true,
				centeredSlides: false,
				slidesPerView: 1,
				// spaceBetween: 20,
				// loop: true,
				// autoHeight: true,
				speed: 800,
				// Эффекты
				// effect: 'fade',
				// thumbs: {
				// 	swiper: {
				// 		el: '.single-product__gallery-list-mobile',
				// 		slidesPerView: 4,
				// 	},
				// },
				slideToClickedSlide: true,
				// Пагинация

				pagination: {
					el: '.single-product__gallery-mobile-pagination',
					clickable: true,
				},
				// breakpoints: {
				// 	0: {
				// 		spaceBetween: 5,
				// 	},
				// 	768: {
				// 		spaceBetween: 20,
				// 	},
				// },

				// События
				on: {},
			}
		);
	}
}

// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar =
				sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false,
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener('DOMContentLoaded', function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});
