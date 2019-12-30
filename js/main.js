(function($) {
	$(".btn-plus, .btn-minus").on("click", function(event) {

		var isMore = event.target.value === "more"
		var inputName = event.target.name
		var input = $(`input[name=${inputName}]`)
		var inputValue = input.val()

		if (inputValue.trim() === "") return
		inputValue = parseInt(inputValue)
		if (isNaN(inputValue)) return

		switch (inputName) {
			case "price": 
				inputValue += isMore ? 50000 : -50000
				break
			case "initial-payment":
				inputValue += isMore ? 10000 : -10000
				break
			default: 
				inputValue += isMore ? 1 : -1
				break
		}

		if(inputValue < 0) 
			inputValue = 0
		
		input.val(inputValue)

		calculator()
	})

	
	$("input").on("keyup", function(event) {
		calculator()
	})

	
	function calculator() {
		var price = $("input[name=price]").val()
		var initialPayment = $("input[name=initial-payment]").val()
		var duration = $("input[name=duration]").val()

		if (price.trim() === "") return
		if (initialPayment.trim() === "") return
		if (duration === "") return

		price = parseInt(price)
		initialPayment = parseInt(initialPayment)
		duration = parseInt(duration)

		if (isNaN(price)) return
		if (isNaN(initialPayment)) return
		if (isNaN(duration)) return


		var procentPerMonth = 10.8 / 100 / 12
		var tmp = Math.pow(1 + procentPerMonth, duration * 12)
		var paymentPerMonth = Math.round((price - initialPayment) * procentPerMonth * tmp / (tmp - 1))

		$("#total").html(`${price - initialPayment} ₽`)
		$("#payment").html(`${paymentPerMonth} ₽`)
	}

	calculator()
})(jQuery)