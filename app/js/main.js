let popupOpeners = $('.popup-open');
let popupClosers = $('.popup-close');
let dropdowns = $('.dropdown');
let products = $('.products__list .product');

for (let i = 0; i < popupOpeners.length; i++) {
  $(popupOpeners[i]).on('click', (e) => {
    $('#popup').addClass('show');
    $('body').addClass('lock');

    setTimeout(() => {
      $('#popup .popup__content').addClass('show');
    }, 20);
  })
}

for (let i = 0; i < popupClosers.length; i++) {
  $(popupClosers[i]).on('click', (e) => {
    $('#popup .popup__content').removeClass('show');

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
let currentFilters = `${currentLevelFilter}-${currentTypeFilter}`;

function filterProductsList() {
  for (let i = 0; i < products.length; i++) {
    $(products[i]).hide();

    if (currentLevelFilter === 'all' && currentTypeFilter === 'all') {
      $(products[i]).show();
    }

    if (currentTypeFilter === 'all' && $(products[i]).data('filter').split('-')[0] === currentLevelFilter) {
      $(products[i]).show();
    }

    if (currentLevelFilter === 'all' && $(products[i]).data('filter').split('-')[1] === currentTypeFilter) {
      $(products[i]).show();
    }

    if ($(products[i]).data('filter') === currentFilters) {
      $(products[i]).show();
    }
  }
}

$('#filterLevel .dropdown__option').on('click', function () {
  currentLevelFilter = $(this).data('level');
  currentFilters = `${currentLevelFilter}-${currentTypeFilter}`;

  filterProductsList();
})

$('#filterType .dropdown__option').on('click', function () {
  currentTypeFilter = $(this).data('type');
  currentFilters = `${currentLevelFilter}-${currentTypeFilter}`;

  filterProductsList();
})
