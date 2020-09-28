$.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  }
});

$.post({
  method: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  data: '{}',
  contentType: 'application/json',
  // dataType: 'json',
  success: function (data, textStatus, jqXHR) {
    for (let i = 0; i < data.length; i++) {
      const place = data[i];
      const pluralGuest = place.max_guest > 1 ? 's' : '';
      const pluralBed = place.number_rooms > 1 ? 's' : '';
      const pluralBath = place.number_bathrooms > 1 ? 's' : '';
      $('SECTION.places').append(`
      <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">
          $${place.price_by_night}
          </div>
        </div>
        <div class="information">
          <div class="max_guest">
            ${place.max_guest} Guest${pluralGuest}
          </div>
          <div class="number_rooms">
            ${place.number_rooms} Bedroom${pluralBed}
          </div>
          <div class="number_bathrooms">
            ${place.number_bathrooms} Bathroom${pluralBath}
          </div>
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>`);
    }
  }
});

$().ready(function () {
  let amenities = {};
  $('INPUT').click(function () {
    amenities = {};
    let checked = $('INPUT:checked');
    let i;
    let names = '';
    let key;

    for (i = checked.length; i; i--) {
      key = checked.attr('data-id');
      amenities[key] = checked.attr('data-name');
      checked = checked.slice(1);
      if (names) {
        names = names + ', ';
      }
      names = names + amenities[key];
    }

    $('DIV.amenities H4').text(names);
  });

  $('BUTTON').click(function () {
    $('SECTION.places').html('');
    $.post({
      method: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      contentType: 'application/json',
      // dataType: 'json',
      success: function (data, textStatus, jqXHR) {
        for (let i = 0; i < data.length; i++) {
          const place = data[i];
          const pluralGuest = place.max_guest > 1 ? 's' : '';
          const pluralBed = place.number_rooms > 1 ? 's' : '';
          const pluralBath = place.number_bathrooms > 1 ? 's' : '';
          $('SECTION.places').append(`
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">
              $${place.price_by_night}
              </div>
            </div>
            <div class="information">
              <div class="max_guest">
                ${place.max_guest} Guest${pluralGuest}
              </div>
              <div class="number_rooms">
                ${place.number_rooms} Bedroom${pluralBed}
              </div>
              <div class="number_bathrooms">
                ${place.number_bathrooms} Bathroom${pluralBath}
              </div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`);
        }
      }
    });
  });
});
