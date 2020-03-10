function Application(config) {
  $.extend(this, config);
  console.log(this);
}
$.extend(Application.prototype, {
  init: function() {
    this.addEventListeners();
    this.getData();
  },
  addEventListeners: function() {
    //event delegation
    $("#buttons").on("click", ".moveRows", $.proxy(this.addToDelivery, this));
	  $("#btnDelivery").on("click", ".putBack", $.proxy(this.putOrdersBack, this));
    $("#btnDelivery").on("click", ".addMarker", $.proxy(this.startDelivery, this));
    $("#btnDelivery").on("click", ".makeRoute", $.proxy(this.calculateAndDisplayRoute, this));
  },
  getData: function() {
    $.getJSON("orders.json", response => {
      this.render(response);
    });
  },
  render: function(orders) {
    let count = 0;
    orders.forEach(order => {
      let tableRow = `
                    <tr class="timeline-box right custom-box-shadow-2 row">
                        <td class="col"><input type="checkbox" name="check-tab1" class="prepare" disabled>
                            <div class="myProgress"><div class="myBar"></div></div>
                        </td>
                        <td class="col">${order.customer_name}</td>
                        <td class="col">${order.customer_adress}</td>
                        <td class="col">${order.neighborhood}</td>
                        <td class="col">${order.pizza_name}</td>
                        <td class="col">${order.lat}</td>
                        <td class="col">${order.lng}</td>
                        <td class="col">${order.order_amount}</td>
                    </tr>
            `;
      count++;
      setTimeout(function() {
        $("#tableOrders tbody").append(tableRow);
        // display a cooking progress bar 
        $('.myBar').each(function(){
          var width = 1;
          //var self = $(this);
          var id = setInterval(frame, 50);
          function frame(id) {
            if (width >= 100) {
              clearInterval(id);
              $('.prepare').each(function(){
                var self = $(this);
                self.prop('disabled', false);
              });
            } else {
              width++; 
              $('.myBar').css('width', width + '%');
            }
          }
      }); 

      }, count * 1500);
    });
  },

  addToDelivery: function() {
    let ordersTable = document.getElementById("tableOrders"),
		//tbody = document.getElementById('tbody')
      deliveryTable = document.getElementById("tableDelivery"),
      checkboxes = document.getElementsByName("check-tab1");
	  //deliveryTable = deliveryTable.classList.add("myClass");
    for (let i = 0; i < checkboxes.length; i++)
      if (checkboxes[i].checked) {
        // create new row and cells
        let newRow = deliveryTable.insertRow(deliveryTable.length),
          cell1 = newRow.insertCell(0),
          cell2 = newRow.insertCell(1),
          cell3 = newRow.insertCell(2),
          cell4 = newRow.insertCell(3),
          cell5 = newRow.insertCell(4),
          cell6 = newRow.insertCell(5),
          cell7 = newRow.insertCell(6);
          cell8 = newRow.insertCell(7);
		newRow.className = "timeline-box right custom-box-shadow-2 row";
        // add values to the cells
        cell1.innerHTML = '<input type="checkbox" name="check-tab2">';

        const customer_name = ordersTable.rows[i + 1].cells[1].innerHTML;
        cell2.innerHTML = customer_name;
		cell2.classList = 'col';

        const customer_adress = ordersTable.rows[i + 1].cells[2].innerHTML;
        cell3.innerHTML = customer_adress;
		cell3.classList = 'col';

        const neighborhood = ordersTable.rows[i + 1].cells[3].innerHTML;
        cell4.innerHTML = neighborhood;
    cell4.classList = 'col';

        const pizza_name = ordersTable.rows[i + 1].cells[4].innerHTML;
        cell5.innerHTML = pizza_name;
		cell5.classList = 'col';
		  
        const lat = +ordersTable.rows[i + 1].cells[5].innerHTML;
        cell6.innerHTML = lat;
		cell6.classList = 'col';

        const lng = +ordersTable.rows[i + 1].cells[6].innerHTML;
        cell7.innerHTML = lng;
		cell7.classList = 'col';

        const order_amount = ordersTable.rows[i + 1].cells[7].innerHTML;
        cell8.innerHTML = order_amount;
		cell8.classList = 'col';

        const row = {
          customer_name,
          customer_adress,
          neighborhood,
          pizza_name,
          lat,
          lng,
          order_amount
        };

        DeliveryService.addOrder(row);
        DeliveryService.save();
        // remove the transfered rows from the first table [ordersTable]
        let index = ordersTable.rows[i + 1].rowIndex;
        ordersTable.deleteRow(index);
        // we have deleted some rows so the checkboxes.length have changed
        // so we have to decrement the value of i
        i--;
        //console.log(checkboxes.length);
      }
  },
	
  putOrdersBack:function()
	{
		let ordersTable = document.getElementById("tableOrders"),
      	deliveryTable = document.getElementById("tableDelivery"),
			  checkboxes = document.getElementsByName("check-tab2");
	//console.log("Val1 = " + checkboxes.length);
		 for(let i = 0; i < checkboxes.length; i++)
			 if(checkboxes[i].checked)
				{
					// create new row and cells
					let newRow = ordersTable.insertRow(ordersTable.length),
						cell1 = newRow.insertCell(0),
						cell2 = newRow.insertCell(1),
						cell3 = newRow.insertCell(2),
						cell4 = newRow.insertCell(3),
						cell5 = newRow.insertCell(4),
						cell6 = newRow.insertCell(5),
						cell7 = newRow.insertCell(6);
            cell8 = newRow.insertCell(7);
					newRow.className = "timeline-box right custom-box-shadow-2 row";
					// add values to the cells
					cell1.innerHTML = '<input type="checkbox" name="check-tab1">';
					//cell1.classList = 'col';
					cell2.innerHTML = deliveryTable.rows[i+1].cells[1].innerHTML;
					cell2.classList = 'col';
					cell3.innerHTML = deliveryTable.rows[i+1].cells[2].innerHTML;
					cell3.classList = 'col';
					cell4.innerHTML = deliveryTable.rows[i+1].cells[3].innerHTML;
					cell4.classList = 'col';
					cell5.innerHTML = deliveryTable.rows[i+1].cells[4].innerHTML;
					cell5.classList = 'col';
					cell6.innerHTML = deliveryTable.rows[i+1].cells[5].innerHTML;
					cell6.classList = 'col';
					cell7.innerHTML = deliveryTable.rows[i+1].cells[6].innerHTML;
					cell7.classList = 'col';
          cell8.innerHTML = deliveryTable.rows[i+1].cells[7].innerHTML;
          cell8.classList = 'col';

					
					// remove the transfered rows from the second table [table2]
					let index = deliveryTable.rows[i+1].rowIndex;
					deliveryTable.deleteRow(index);
          //DeliveryService.removeOrder(index);
          localStorage.removeItem(index);
          DeliveryService.save();
					// we have deleted some rows so the checkboxes.length have changed
					// so we have to decrement the value of i
					i--;
				   console.log(checkboxes.length);
				}
	},

  startDelivery: function() {
    const deliveries = JSON.parse(localStorage.getItem("orders") || "{}");
    console.log(deliveries);
    deliveries.forEach(delivery => {
      const {
        customer_name,
        customer_adress,
        neighborhood,
        pizza_name,
        lat,
        lng,
        order_amount
      } = delivery;
      var marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: "Pizza Delivery"
      });
		//console.log(marker.position);
	  //var wPoints = 
      marker.addListener("click", function() {
        var infowindow = new google.maps.InfoWindow({
          content: `Customer: ${customer_name} <br> Address: ${customer_adress} <br> Neighborhood: ${neighborhood} <br> Order: Pizza: ${pizza_name} <br> Amount: ${order_amount} `
        });
        infowindow.open(map, marker);
      });
    });
  },

  calculateAndDisplayRoute: function(directionsService, directionsRenderer) {
      const deliveries = JSON.parse(localStorage.getItem("orders") || "{}");
      
        var waypts = [];
      
        for (var {lat: n, lng: p} of deliveries) {
          waypts.push({
            location: n+','+p,
            stopover: true
          });
          
        }

      var directionsService = new google.maps.DirectionsService;
      var directionsRenderer = new google.maps.DirectionsRenderer;
      directionsRenderer.setMap(map);
      directionsService.route({
        origin: document.getElementById('origin').value,
        destination: document.getElementById('origin').value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
        directionsRenderer.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
            '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        }
        } else {
        window.alert('Directions request failed due to ' + status);
        }
      });
    }




});


$(document).ready(function(){
	$('#tableOrders th').each(function (col) {
        $(this).hover(
                function () {
                    $(this).addClass('focus');
                },
                function () {
                    $(this).removeClass('focus');
                }
        );
        $(this).click(function () {
            if ($(this).is('.asc')) {
                $(this).removeClass('asc');
                $(this).addClass('desc selected');
                sortOrder = -1;
            } else {
                $(this).addClass('asc selected');
                $(this).removeClass('desc');
                sortOrder = 1;
            }
            $(this).siblings().removeClass('asc selected');
            $(this).siblings().removeClass('desc selected');
            var arrData = $('table').find('tbody >tr:has(td)').get();
            arrData.sort(function (a, b) {
                var val1 = $(a).children('td').eq(col).text().toUpperCase();
                var val2 = $(b).children('td').eq(col).text().toUpperCase();
                if ($.isNumeric(val1) && $.isNumeric(val2))
                    return sortOrder == 1 ? val1 - val2 : val2 - val1;
                else
                    return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
            });
            $.each(arrData, function (index, row) {
                $('#tableOrders tbody').append(row);
            });
        });
    });
});
