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

  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var item = $(this).children('[name=item]').val();
    var price = $(this).children('[name=price]').val();
    
    $('tbody').append('<tr>' +
      '<td class="item">' + item + '</td>' +
      '<td class="price">' + price + '</td>' +
      '<td class="quant"><input type="number" value="0" /></td>' +
      '<td class="total"></td>' +
      '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
    '</tr>');

    finalTotal();
    $(this).children('[name=item]').val('');
    $(this).children('[name=price]').val('');
  });
});