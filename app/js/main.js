let popupOpeners = $('.popup-open');
let popupClosers = $('.popup-close');
let dropdowns = $('.dropdown');
let products = $('.products__list .product');
let productTitlesList = $('.products__list .product .product__title');
let courseImgSrc;
let courseImgName;
let courseOverviewSrc;

$('main').css('min-height', `calc(100vh - ${$('footer').outerHeight()}px)`);

for (let i = 0; i < popupOpeners.length; i++) {
  $(popupOpeners[i]).on('click', function() {
    courseImgSrc = $(this).parent().parent().parent().find('.product__image img').attr('src').split('/');
    courseImgName = courseImgSrc[courseImgSrc.length - 1].split('.')[0];
    courseOverviewSrc = `dist/img/${courseImgName}-overview.jpg`;

    $('#popup').addClass('show');
    $('body').addClass('lock');
    $(this).parent().parent().parent().find('.popup__text').clone().appendTo('#popup .popup__info');
    $('#popup .popup__image img').attr('src', courseOverviewSrc);

    setTimeout(() => {
      $('#popup .popup__content').addClass('show');
    }, 20);
  })
}

for (let i = 0; i < popupClosers.length; i++) {
  $(popupClosers[i]).on('click', function() {
    $('#popup .popup__content').removeClass('show');
    $('#popup .popup__text').remove();

    setTimeout(() => {
      $('#popup').removeClass('show');
      $('body').removeClass('lock');
    }, 150);
  })
}

function dropdownOpen(item) {
  $(item).addClass('open');
  $(item).focus();

  setTimeout(() => {
    $(item).addClass('animate');
  }, 20);
}

function dropdownClose(item) {
  $(item).removeClass('animate');

  setTimeout(() => {
    $(item).removeClass('open');
  }, 200);
}

for (let i = 0; i < dropdowns.length; i++) {
  $(dropdowns[i]).on('click', function () {
    if (this.classList.contains('open')) {
      dropdownClose(this);

      return;
    }

    dropdownOpen(this);
  })

  $(dropdowns[i]).on('blur', function () {
    dropdownClose(this);
  })
}

$('.dropdown__option').on('click', function () {
  $(this).parent().parent().find('.dropdown__head .label').html($(this).html());
})

let currentLevelFilter = 'all';
let currentTypeFilter = 'all';

function filterProductsList() {
  for (let i = 0; i < products.length; i++) {
    $(products[i]).hide();

    if (currentLevelFilter === 'all' && currentTypeFilter === 'all' && $(products[i]).find('.product__title').html().toLowerCase().includes($('#searchFilter').val().toLowerCase())) {
      $(products[i]).show();
    }

    if (currentTypeFilter === 'all' && $(products[i]).data('levels').split(', ').includes(currentLevelFilter) && $(products[i]).find('.product__title').html().toLowerCase().includes($('#searchFilter').val().toLowerCase())) {
      $(products[i]).show();
    }

    if (currentLevelFilter === 'all' &&  $(products[i]).data('types').split(', ').includes(currentTypeFilter) && $(products[i]).find('.product__title').html().toLowerCase().includes($('#searchFilter').val().toLowerCase())) {
      $(products[i]).show();
    }

    if ($(products[i]).data('levels').split(', ').includes(currentLevelFilter) && $(products[i]).data('types').split(', ').includes(currentTypeFilter) && $(products[i]).find('.product__title').html().toLowerCase().includes($('#searchFilter').val().toLowerCase())) {
      $(products[i]).show();
    }
  }
}

$('#filterLevel .dropdown__option').on('click', function () {
  currentLevelFilter = $(this).data('level');

  filterProductsList();
})

$('#filterType .dropdown__option').on('click', function () {
  currentTypeFilter = $(this).data('type');

  filterProductsList();
})

$('#searchIcon').on('click', function() {
  filterProductsList();
})

$('#clearIcon').on('click', function() {
  $('#searchFilter').val('');

  filterProductsList();
})

$('#searchFilter').on('keypress', function(e) {
  if (e.key === 'Enter') {
    filterProductsList();
  }
})

$('#navToggle').on('click', () => {
  $('#navOpen').toggleClass('hide');
  $('#navClose').toggleClass('hide');
  $('#nav').toggleClass('slide');
})

$('#nav').on('blur', function () {
  $('#navOpen').removeClass('hide');
  $('#navClose').addClass('hide');
  $('#nav').removeClass('slide');
})