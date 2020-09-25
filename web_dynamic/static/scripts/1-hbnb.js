$().ready(function () {
  let checked = [];

  $("INPUT").click(function () {
    let check = $("INPUT:checked");
    let temp = $("INPUT:checked");

    for (let i = 0; i < check.length; i++) {
      if (i < checked.length) {
        checked[i] = temp.prop("data-id");
      } else {
        checked.push(temp.prop("data-id"));
      }
      temp.shift();
    }

    checked = checked.splice(0, i);

    $("DIV.amenities H4").text(checked.toString());
  });
});
