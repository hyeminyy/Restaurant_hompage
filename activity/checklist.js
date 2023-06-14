
        function generateReceipt() {
          var receipt = "Receipt:\n\n";
          var totalPrice = 0;

          var selectedStakem = document.querySelector('input[name="stakem"]:checked');
          if (selectedStakem) {
            var price = parseFloat(selectedStakem.dataset.price);
            receipt += "Stake: " + selectedStakem.value +": " + price +"원"+ "\n";
            totalPrice +=  price;


          }

          var selectedStake = document.querySelector('input[name="stake"]:checked');
          if (selectedStake) {
            
            receipt += "(Stake Grill: " + selectedStake.value +")" +"\n\n";
            


          }
          
          var selectedPastas = document.querySelectorAll('input[name="pasta"]:checked');
          if (selectedPastas.length > 0) {
            receipt += "Pasta:\n";
            selectedPastas.forEach(function(pasta) {
              var price = parseFloat(pasta.dataset.price);
              receipt += "- " + pasta.value  +": "+ price + "원"+"\n\n";
              totalPrice += price;
            });
          }
          
          var selectedPizzas = document.querySelectorAll('input[name="pizza"]:checked');
          if (selectedPizzas.length > 0) {
            receipt += "Pizza:\n";
            selectedPizzas.forEach(function(pizza) {
              var price = parseFloat(pizza.dataset.price);
              receipt += "- " + pizza.value  +": "+ price +"원"+"\n\n";
              totalPrice += price;
            });
          }

          var selectedSides = document.querySelectorAll('input[name="side"]:checked');
          if (selectedSides.length > 0) {
            receipt += "Side:\n";
            selectedSides.forEach(function(side) {
              var price = parseFloat(side.dataset.price);
              receipt += "- " + side.value  +": "+ price + "원"+"\n\n";
              totalPrice += price;
            });
          }

          var selectedDesserts = document.querySelectorAll('input[name="dessert"]:checked');
          if (selectedDesserts.length > 0) {
            receipt += "Dessert:\n";
            selectedDesserts.forEach(function(dessert) {
              var price = parseFloat(dessert.dataset.price);
              receipt += "- " + dessert.value  +": "+ price + "원"+"\n\n";
              totalPrice += price;
            });
          }
          

          var selectedDrinks = document.querySelectorAll('input[name="drink"]:checked');
          if (selectedDrinks.length > 0) {
            receipt += "Drink:\n";
            selectedDrinks.forEach(function(drink) {
              var price = parseFloat(drink.dataset.price);
              receipt += "- " + drink.value  +": "+ price + "원"+"\n\n";
              totalPrice += price;
            });
          }
          
          
          receipt += "\n➜ Total Price:" + totalPrice+" 원";
          document.getElementById("receipt").innerText = receipt;

        }


        var d = new Date();
var currentDate = d.getFullYear() + "-" + ( d.getMonth() + 1 ) + "-" + d.getDate();
var currentTime = d.getHours() + ":" + d.getMinutes(); 
var result = document.getElementById('now_date');
result.innerHTML = currentDate +" "+ currentTime ; 
