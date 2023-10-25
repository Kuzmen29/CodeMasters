let header__nav_open = document.querySelector('.header__nav_open');

header__nav_open.addEventListener('click', function (params) {
    let header__nav_view = document.querySelector('.header__nav_view');

   header__nav_view.classList.toggle('header__nav_flex');

   header__nav_open.children[0].classList.toggle('display_none');
   header__nav_open.children[1].classList.toggle('display_block');

})