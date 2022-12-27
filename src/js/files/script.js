// Подключение функционала "Чертогов Фрилансера"
import {
	isMobile,
	removeClasses,
	menuClose,
	bodyLockStatus,
	bodyLockToggle,
	bodyUnlock,
} from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';

//\\//\\/\// Menu //\\//\\/\//

// Скрыть меню при клике вне меню
let hamburger = document.querySelector('.icon-menu'),
	menu = document.querySelector('.menu__body');

document.addEventListener('click', e => {
	let target = e.target;
	let its_menu = target == menu || menu.contains(target);
	let its_hamburger = target == hamburger || hamburger.contains(target);
	let menu_is_active = document.documentElement.classList.contains('menu-open');

	if (!its_menu && !its_hamburger && menu_is_active) {
		menuClose();
	}
});

// Actions (делегирование события click)
function documentActions(e) {
	const targetElement = e.target;
	if (targetElement.classList.contains('menu__link')) {
		targetElement.closest('.menu__item').classList.toggle('_hover');
	}
	if (
		!targetElement.closest('.menu__item') &&
		document.querySelectorAll('.menu__item._hover').length > 0
	) {
		removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
	} else if (
		targetElement.closest('.menu__item') &&
		document.querySelectorAll('.menu__item._hover').length > 0
	) {
		removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
		targetElement.closest('.menu__item').classList.add('_hover');
	}
}

document.addEventListener('click', documentActions);

const menuItems = document.querySelectorAll('.menu__item'),
	menuCloseIcon = document.querySelector('.menu__close');

menuCloseIcon.addEventListener('click', () => {
	menuClose();
});

menuItems.forEach(item => {
	item.addEventListener('mouseover', e => {
		if (e.target) {
			item.classList.add('_hover');
		}
	});
	item.addEventListener('mouseout', e => {
		if (e.target) {
			item.classList.remove('_hover');
		}
	});
});

//\\//\\/\// Поиск //\\//\\/\//

function searchInit() {
	if (document.querySelector('.search__open')) {
		document.addEventListener('click', function (e) {
			if (bodyLockStatus && e.target.closest('.search__open')) {
				bodyLockToggle();
				document.documentElement.classList.toggle('search-open');
			}
		});
	}
}
function searchOpen() {
	bodyLock();
	document.documentElement.classList.add('search-open');
}
function searchClose() {
	bodyUnlock();
	document.documentElement.classList.remove('search-open');
}

searchInit();

const searchButton = document.querySelector('.search__open'),
	searchBody = document.querySelector('.search'),
	searchCloseButton = document.querySelector('.search__close');

searchCloseButton.addEventListener('click', searchClose);

document.addEventListener('click', e => {
	let target = e.target;
	let its_search = target == searchBody || searchBody.contains(target);
	let its_searchButton =
		target == searchButton || searchButton.contains(target);
	let search_is_active =
		document.documentElement.classList.contains('search-open');

	if (!its_search && !its_searchButton && search_is_active) {
		searchClose();
	}
});

// Sticky meny
let navbar = document.querySelector('.header'),
	sticky = navbar.offsetTop,
	nextBlock = document.querySelector('.page'),
	wrapper = document.querySelector('.wrapper'),
	nextBlockMarginTop = window.getComputedStyle(nextBlock).marginTop,
	navbarHeight = window.getComputedStyle(navbar).height;

function stickyMenu() {
	if (window.pageYOffset > sticky) {
		navbar.classList.add('sticky');
		if (!wrapper.classList.contains('home')) {
			nextBlock.style.marginTop =
				+nextBlockMarginTop.slice(0, nextBlockMarginTop.length - 2) +
				+navbarHeight.slice(0, navbarHeight.length - 2) +
				'px';
		}
	} else {
		navbar.classList.remove('sticky');
		if (!wrapper.classList.contains('home')) {
			nextBlock.style.marginTop = nextBlockMarginTop;
			navbarHeight = window.getComputedStyle(navbar).height;
		}
	}
}

window.addEventListener('resize', () => {
	navbar.classList.remove('sticky');
	nextBlock.style.marginTop = nextBlockMarginTop;
	navbarHeight = window.getComputedStyle(navbar).height;
	nextBlockMarginTop = window.getComputedStyle(nextBlock).marginTop;
});

if (window.innerWidth < 768) {
	window.addEventListener('scroll', stickyMenu, false);
}

window.addEventListener('resize', () => {
	if (window.innerWidth < 768) {
		window.addEventListener('scroll', stickyMenu, false);
	} else {
		window.removeEventListener('scroll', stickyMenu, false);
	}
});

//\\//\\/\// Фильтр //\\//\\/\//

const filterButton = document.querySelector('.catalog__filter-open'),
	filterBody = document.querySelector('.filter'),
	filterCloseButton = document.querySelector('.filter__close');

if (filterButton) {
	function filterInit() {
		if (document.querySelector('.catalog__filter-open')) {
			document.addEventListener('click', function (e) {
				if (bodyLockStatus && e.target.closest('.catalog__filter-open')) {
					bodyLockToggle();
					document.documentElement.classList.toggle('filter-open');
				}
			});
		}
	}
	function filterOpen() {
		bodyLock();
		document.documentElement.classList.add('filter-open');
	}
	function filterClose() {
		bodyUnlock();
		document.documentElement.classList.remove('filter-open');
	}

	filterInit();

	filterCloseButton.addEventListener('click', filterClose);

	document.addEventListener('click', e => {
		let target = e.target;
		let its_filter = target == filterBody || filterBody.contains(target);
		let its_filterButton =
			target == filterButton || filterButton.contains(target);
		let filter_is_active =
			document.documentElement.classList.contains('filter-open');

		if (!its_filter && !its_filterButton && filter_is_active) {
			filterClose();
		}
	});
}

//\\//\\/\// Scroll //\\//\\/\//

window.addEventListener('scroll', () => {
	if (window.pageYOffset >= 600) {
		document.querySelector('.pageup').style.visibility = 'visible';
	} else {
		document.querySelector('.pageup').style.visibility = '';
	}
});

//\\//\\/\// Прикрепление кнопок корзины //\\//\\/\//

// Создаем новый observer (наблюдатель)
let observer = new IntersectionObserver(function (entries) {
	entries.forEach(function (entry) {
		let box = entry.target.getBoundingClientRect();
		if (
			entry.isIntersecting === false &&
			document.documentElement.scrollTop > box.top + window.pageYOffset
		) {
			document.querySelector('.single-product__buttons-sticky').style.display =
				'flex';
		} else {
			document.querySelector('.single-product__buttons-sticky').style.display =
				'';
		}
	});
});

// Задаем элемент для наблюдения
let el = document.querySelector('.single-product__buttons');

// Прикрепляем его к «наблюдателю»
if (el) {
	document.querySelector('.pageup').style.bottom = '110px';
	observer.observe(el);
}


//\\//\\//\\\//\\ Перетаскивание вместо скролла //\\//\\//\\\//\\

const dragScroll = timeline => {
	// timeline - блок с горизонтальным скроллом
	timeline.onmousedown = () => {
		let pageX = 0;

		timeline.onmousemove = e => {
			if (pageX !== 0) {
				timeline.scrollLeft = timeline.scrollLeft + (pageX - e.pageX);
			}
			pageX = e.pageX;
		};

		// заканчиваем выполнение событий
		document.onmouseup = () => {
			timeline.onmousemove = null;
			timeline.onmouseup = null;
		};

		timeline.mouseout = () => {
			timeline.onmousemove = null;
			document.onmouseup = null;
		};

		// отменяем браузерный drag
		timeline.ondragstart = () => {
			return false;
		};
	};
};

const tabsList = document.querySelector('.single-product__tabs-wrapper');

if (tabsList) {
	dragScroll(tabsList);
}
