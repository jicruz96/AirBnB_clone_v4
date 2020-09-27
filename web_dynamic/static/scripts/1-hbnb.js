$().ready(function () {
  $('INPUT').click(function () {
    const amenities = {};
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
});
