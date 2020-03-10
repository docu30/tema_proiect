var DeliveryService = (function() {
  const deliveryData = [];
  return {
    addOrder: function(order) {
      deliveryData.push(order);
    },
    removeOrder: function(index) {
      deliveryData.slice(i, 0);
    },
    save: function() {
      localStorage.setItem("orders", JSON.stringify(deliveryData));
    },
    get: function() {
      deliveryData = JSON.parse(localStorage.getItem("orders"));
      //console.log(deliveryData);
    }
  };
})();
