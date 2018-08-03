      $.getJSON('/client_account/contacts.json', function(contacts) {
        var discount_arr = {};
        discount_arr['amount'] = ['0', '30000', '70000', '10000'];
        discount_arr['percent'] = ['0.0', '5.0', '7.0', '10.0'];
        var turnover = {{ client.turnover }}; // Сума выполеных заказов
        var progressive_discount = contacts.client.progressive_discount; // Текущая скидка в процентах   
        var current_index;
        var html;
        $.each(discount_arr['percent'], function(index, value) {
          if(progressive_discount == value){
          	current_index = index;
          }
        });
        var its_left = Number(discount_arr['amount'][current_index+1]) - Number(turnover); // Осталось до следующей скидки
      	var its_left_percent = 100 - (its_left * 100 / (discount_arr['amount'][current_index+1] - discount_arr['amount'][current_index])); // Осталось до следующей скидки в относительных процентах
      
      	html = '<div class="discount_block">';
      	html += '	<div class="discount_title">Вы купили на '+ InSales.formatMoney(turnover) +'</div>';
        html += '	<div class="discount_line_block">';
        html += '		<div class="discount_progressive_discount">'+ progressive_discount +'%</div>';
      	html += '		<div class="discount_line">';
        html += '			<div class="discount_line_active" style="width: '+ its_left_percent +'%"></div>';
        html += '		</div>';
        html += '		<div class="discount_next_discount">'+ discount_arr['percent'][current_index+1] +'%</div>';
     	html += '	</div>';
      	html += '	<div class="discount_footer">До следующей скидки: '+ InSales.formatMoney(its_left) +'</div>';
      	html += '</div>';
      
      	$('.account-orders').find('.page-box__header-title-h1').after(html);
      });