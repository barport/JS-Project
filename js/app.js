
// Setting variables

var $searchField = document.getElementById('search-name'),
  $filterCatBtn = document.getElementsByClassName('filter-by-category'),
  $sortSelector = document.getElementById('sort'),
  $boxersc = document.getElementById('boxers-container'),
  $preLoader = document.getElementById('pre-loader'),
  totalDisplayed = 0,
  allDone = false,
  inCanvas = [];

displayImages(boxers, 9, true);

// Lazy loading function - window scroll down loading 

document.onscroll = function () {
  var sc = Math.ceil(window.scrollY) // how much scrolled
  var wh = window.innerHeight; // window height
  var dh = document.documentElement.scrollHeight // doc height

  if (sc + wh == dh) {
    if (boxers.length > totalDisplayed + 9) {
      totalDisplayed += 9;
    } else if (boxers.length == totalDisplayed) {
      allDone = true;
    } else {
      totalDisplayed += boxers.length - totalDisplayed;
    }
    if (!allDone) {
      $preLoader.style.display = "block";
      setTimeout(function () {
        displayImages(boxers, totalDisplayed, true);
        $preLoader.style.display = "none";
      }, 800)
    }
  }
};


// Sorting A-Z / Z-A

$sortSelector.addEventListener('change', function (e) {
  var clientPick = e.target.value;
  allDone = true;
  if (clientPick.length == '')
    displayImages(boxers, totalDisplayed);
  else {
    var boxersCache = Object.assign([], boxers);
    boxersCache.sort(compare);
    if (clientPick == 'desc') boxersCache.reverse(compare);
    displayImages(boxersCache, boxersCache.length);
  }
});

// Filtering - Weight categorizing.

function compare(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};
for (var x = 0; x < $filterCatBtn.length; x++) {
  $filterCatBtn[x].addEventListener('click', function (e) {
    e.preventDefault();
    var cat = e.target.text.toLowerCase();
    if (cat == 'all') {
      displayImages(boxers, boxers.length);
    } else {
      var filterBoxers = boxers.filter(function (boxers) {
        return boxers.category === cat;
      });
      displayImages(filterBoxers, filterBoxers.length);
    }
  });
}
// SEARCH BAR

$searchField.addEventListener('keyup', function (e) {
  var clientSearch = e.target.value.trim();
  if (clientSearch.length > 0) {
    var filterBoxers = boxers.filter(function (ob) {
      return ob.name.toLowerCase().indexOf(clientSearch.toLowerCase()) === 0;
    });
    displayImages(filterBoxers, filterBoxers.length);
  }
  else {
    displayImages(boxers, totalDisplayed);
  }
});

// Output and image display function.

function displayImages(imgArray, len, remember) {

  $boxersc.innerHTML = '';
  var output = '';
  if (typeof remember == 'boolean') totalDisplayed = len;

  for (var x = 0; x < len; x++) {

    var boxer = imgArray[x];

    output +=
      '<div class="col-md-4 mt-5 ">' +
      '<div class="card">' +
      '<img class="card-img-top" src="images/' + boxer.image + '"alt="' + boxer.name + ' image">' +
      '<div class="card-body text-center">' +
      '<h5 class="card-title">' + boxer.name + '</h5>' +
      '<p class="card-text"><b>' + boxer.category + '</b></p>' +
      '<p class="card-text"><b>' + boxer.record + '</b></p>' +
      '</div></div></div>';
  }
  $boxersc.innerHTML = output;
};

// :D
