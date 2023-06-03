var updateTotal = function (ele) {
  var quant = parseFloat($(ele).find('.quant input').val());
  var price = parseFloat($(ele).children('.price').text());

  var total = price * quant;
  $(ele).children('.total').html(total);

  return total;
}

var sum = function (acc, x) { return acc + x; };

var finalTotal = function () {
  var subTotal = [];

  $('tbody tr').each(function (i, ele) {
    var newTotal = updateTotal(ele);
    subTotal.push(newTotal);
  });

  var grandTotal = subTotal.reduce(sum);

  $('#grandTotal').html(grandTotal);
}

$(document).ready(function () {
  finalTotal();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    finalTotal();
  });

  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      finalTotal();
    }, 500);
  });
});