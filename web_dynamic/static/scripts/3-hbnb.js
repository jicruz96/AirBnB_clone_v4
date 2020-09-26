jQuery.getJSON('http://192.168.33.10:5001/api/v1/status/', function (data, textStatus) {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  }
});

$.post({method: 'POST', url: 'http://192.168.33.10:5001/api/v1/places_search/', data: '{}', contentType: 'application/json', dataType: 'json', success: function (data, textStatus, jqXHR) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    place = data[i];
    $('SECTION.places').append('<article><div class=""><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + ((place.max_guest != 1) ? 's' : '') + '</div><div class="number_rooms">' + place.number_rooms + 'Bedroom' +  ((place.number_rooms != 1) ? 's' : '') + '</div><div class="number_bathrooms">' + place.number_bathrooms + 'Bathroom' + ((place.number_bathrooms != 1) ? 's' : '') + '</div></div><div class="description">' + place.description + '</div></article>');
  }
}});

$().ready(function () {
  $('INPUT').click(function () {
    const checked = {};
    const check = $('INPUT:checked');
    let temp = $('INPUT:checked');
    let i = 0;

    for (; i < check.length; i++) {
      checked[temp.attr('data-id')] = temp.attr('data-name');
      temp = temp.slice(1);
    }

    let names = '';
    for (const key in checked) {
      if (names === '') {
        names = names + checked[key];
      } else {
        names = names + ', ' + checked[key];
      }
    }

    $('DIV.amenities H4').text(names);
  });
});
