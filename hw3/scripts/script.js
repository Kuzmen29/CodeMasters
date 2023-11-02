let headerMainNavBtnBlock = document.querySelector('.header-main__nav-btn');

headerMainNavBtnBlock.addEventListener('click', function (params) {
    let headerNavView = document.querySelector('.header-main__nav');

    headerNavView.classList.toggle('header-main__nav_flex');

    headerMainNavBtnBlock.children[0].classList.toggle('header-main__nav-btn_none');
    headerMainNavBtnBlock.children[1].classList.toggle('header-main__nav-btn_none');
    headerMainNavBtnBlock.children[1].classList.toggle('header-main__nav-btn_block');

})