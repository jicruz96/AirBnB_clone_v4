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
