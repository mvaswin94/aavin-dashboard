(function() {

	/*Hiding the Stores And Purchase card*/
	$('#storesAndPurchaseCard').hide();
	$('#storeAndPurchaseStoreWiseGraph').hide();

})();

/*OnClick to show the Stores And Purchase card*/
$("#storesAndPurchaseDashboard").click(function() {
	$('#moduleBasedCard').hide();
	$('#locationBasedCard').hide();

	/*Getting Stores and Purchase Card Value*/
	$.ajax({
		type: 'GET',
		url: 's&p/facility-based',
		success: function(response) {
			var tempJson = response;

			var cd_store = "";
			var product_store = "";
			var pur_store = "";
			var smd_store = "";
			var snr_store = "";

			for (var i = 0; i < tempJson.length; i++) {
				var facilityId = tempJson[i]['facility_id'];
				if (facilityId == 'CD_STORE') {
					cd_store = tempJson[i]['round'];
					//alert("cd_store:" + cd_store);
					cdStoreFormatted = tempJson[i]['round'];
					if (cdStoreFormatted >= 10000000) cdStoreFormatted = (cdStoreFormatted / 10000000).toFixed(2) + ' Cr';
					else if (cdStoreFormatted >= 100000) cdStoreFormatted = (cdStoreFormatted / 100000).toFixed(2) + ' Lac';
					else if (cdStoreFormatted >= 1000) cdStoreFormatted = (cdStoreFormatted / 1000).toFixed(2) + ' K';
					$('#cdStoreValueLoadingSpinner').hide();
					$('#cdStoreCardValue').text(cdStoreFormatted);
				}
				else if (facilityId == 'PRODUCT_STORE') {
					product_store = tempJson[i]['round'];
					//alert("product_store:" + product_store);
					productStoreFormatted = tempJson[i]['round'];
					if (productStoreFormatted >= 10000000) productStoreFormatted = (productStoreFormatted / 10000000).toFixed(2) + ' Cr';
					else if (productStoreFormatted >= 100000) productStoreFormatted = (productStoreFormatted / 100000).toFixed(2) + ' Lac';
					else if (productStoreFormatted >= 1000) productStoreFormatted = (productStoreFormatted / 1000).toFixed(2) + ' K';
					$('#productStoreValueLoadingSpinner').hide();
					$('#productStoreCardValue').text(productStoreFormatted);
				}
				else if (facilityId == 'PUR_STORE') {
					pur_store = tempJson[i]['round'];
					//alert("pur_store:" + pur_store);
					purStoreFormatted = tempJson[i]['round'];
					if (purStoreFormatted >= 10000000) purStoreFormatted = (purStoreFormatted / 10000000).toFixed(2) + ' Cr';
					else if (purStoreFormatted >= 100000) purStoreFormatted = (purStoreFormatted / 100000).toFixed(2) + ' Lac';
					else if (purStoreFormatted >= 1000) purStoreFormatted = (purStoreFormatted / 1000).toFixed(2) + ' K';
					$('#purchaseStoreValueLoadingSpinner').hide();
					$('#purStoreCardValue').text(purStoreFormatted);
				}
				else if (facilityId == 'SMD_STORE') {
					smd_store = tempJson[i]['round'];
					//alert("cd_store:" + cd_store);
					smdStoreFormatted = tempJson[i]['round'];
					if (smdStoreFormatted >= 10000000) smdStoreFormatted = (smdStoreFormatted / 10000000).toFixed(2) + ' Cr';
					else if (smdStoreFormatted >= 100000) smdStoreFormatted = (smdStoreFormatted / 100000).toFixed(2) + ' Lac';
					else if (smdStoreFormatted >= 1000) smdStoreFormatted = (smdStoreFormatted / 1000).toFixed(2) + ' K';
					$('#smdStoreValueLoadingSpinner').hide();
					$('#smdStoreCardValue').text(smdStoreFormatted);
				}
				else if (facilityId == 'SNR_STORE') {
					snr_store = tempJson[i]['round'];
					//alert("snr_store:" + snr_store);
					snrStoreFormatted = tempJson[i]['round'];
					if (snrStoreFormatted >= 10000000) snrStoreFormatted = (snrStoreFormatted / 10000000).toFixed(2) + ' Cr';
					else if (snrStoreFormatted >= 100000) snrStoreFormatted = (snrStoreFormatted / 100000).toFixed(2) + ' Lac';
					else if (snrStoreFormatted >= 1000) snrStoreFormatted = (snrStoreFormatted / 1000).toFixed(2) + ' K';
					$('#snrStoreValueLoadingSpinner').hide();
					$('#snrStoreCardValue').text(snrStoreFormatted);
				}
			}

			/*Stock In Stores - Pie Chart (Start)*/
			document.querySelector("#stockInStoresDiv").innerHTML = '<div id="stockInStores"></div>';
			new ApexCharts(document.querySelector("#stockInStoresDiv"), {
				series: [cd_store, product_store, pur_store, smd_store, snr_store],
				chart: {
					height: 350,
					type: 'pie',
					toolbar: {
						show: true
					}
				},
				labels: ['CD Store', 'Product Store', 'Purchase Store', 'SMD Store', 'SNR Store']
			}).render();
			/*Stock In Stores - Pie Chart (End)*/


			/*Getting currnet today and last week dates (Start)*/
			const currentDate = new Date();
			const previousDate = new Date();
			previousDate.setUTCDate(currentDate.getUTCDate() - 7);

			const formattedCurrentDate = `${currentDate.getUTCFullYear()}-${(currentDate.getUTCMonth() + 1).toString().
				padStart(2, '0')}-${currentDate.getUTCDate().toString().padStart(2, '0')}`;

			const formattedPreviousDate = `${previousDate.getUTCFullYear()}-${(previousDate.getUTCMonth() + 1).toString().
				padStart(2, '0')}-${previousDate.getUTCDate().toString().padStart(2, '0')}`;

			/*Getting currnet/today and last week dates (End)*/

			/*No.of. PO Issued and Count - Column  Area Chart (Start)*/
			$('#fromDatePOIssuedCount').val(formattedPreviousDate);
			$('#toDatePOIssuedCount').val(formattedCurrentDate);

			var fromDate = $('#fromDatePOIssuedCount').val();
			var toDate = $('#toDatePOIssuedCount').val();
			$.ajax({
				type: 'GET',
				url: 's&p/po-issued-and-count/' + fromDate + '/' + toDate + '',
				success: function(response) {
					let tempJson = response;
					let countList = [];
					let dateList = [];
					for (let i = 0; i < tempJson.length; i++) {
						let count = tempJson[i]['count'];
						countList.push(count);

						let date = tempJson[i]['date'];
						dateList.push(date);
					}

					document.querySelector("#poIssuedAndCountDiv").innerHTML = '<div id="poIssuedAndCount"></div>';
					new ApexCharts(document.querySelector("#poIssuedAndCount"), {
						series: [{
							name: "PO Count",
							data: countList
						}],
						chart: {
							type: 'area',
							height: 350,
							zoom: {
								enabled: false
							}
						},
						dataLabels: {
							enabled: false
						},
						stroke: {
							curve: 'straight'
						},
						subtitle: {
							text: 'PO Issued and Count ',
							align: 'center'
						},
						labels: dateList,
						xaxis: {
							type: 'datetime',
						},
						yaxis: {
							opposite: false
						},
						legend: {
							horizontalAlign: 'left'
						}
					}).render();
				}, error: function(ts) { alert(ts) }
			});
			/*No.of. PO Issued and Count - Column Area (End)*/

			/*No.of. Stocks in Below re-order Level (Start)*/
			$.ajax({
				type: 'GET',
				url: '/s&p/stocks-in-below-re-order-level',
				success: function(response) {
					let tempJson = response;
					for (let i = 0; i < tempJson.length; i++) {
						let count = tempJson[i]['count'];
						$('#storesAndPurchaseReOrderLevelValue').text(count);
					}
				}, error: function(ts) { alert(ts) }
			});
			/*No.of. Stocks in Below re-order Level (Start)*/

			/*No.of.Stocks in Over Sufficient Level (Start)*/
			$.ajax({
				type: 'GET',
				url: '/s&p/stocks-in-over-sufficient-level',
				success: function(response) {
					let tempJson = response;
					for (let i = 0; i < tempJson.length; i++) {
						let count = tempJson[i]['count'];
						$('#storesAndPurchaseOverSufficientLevelValue').text(count);
					}
				}, error: function(ts) { alert(ts) }
			});
			/*No.of.Stocks in Over Sufficient Level (End)*/

			/*No.of.Stocks in Sufficient Level (Start)*/
			$.ajax({
				type: 'GET',
				url: '/s&p/stocks-in-sufficient-level',
				success: function(response) {
					let tempJson = response;
					for (let i = 0; i < tempJson.length; i++) {
						let count = tempJson[i]['count'];
						$('#storesAndPurchaseSufficientLevelValue').text(count);
					}
				}, error: function(ts) { alert(ts) }
			});
			/*No.of.Stocks in Sufficient Level (End)*/

			/*Top Issued Product ID and Count (Start)*/
			$('#fromDateTopIssuedProductCount').val(formattedPreviousDate);
			$('#toDateTopIssuedProductCount').val(formattedCurrentDate);

			var fromDate = $('#fromDateTopIssuedProductCount').val();
			var toDate = $('#toDateTopIssuedProductCount').val();
			$.ajax({
				type: 'GET',
				url: 's&p/top-issued-product-and-count/' + fromDate + '/' + toDate + '',
				success: function(response) {
					let tempJson = response;
					let productList = [];
					let quantityList = [];
					for (let i = 0; i < tempJson.length; i++) {
						let productId = tempJson[i]['product_id'];
						productList.push(productId);

						let quantity = tempJson[i]['issued_quantity'];
						quantityList.push(quantity);
					}
					//console.log(productList);
					//console.log(quantityList);
					document.querySelector("#storesAndPurchaseTopIssuedProductIdAndCountDiv").innerHTML = '<canvas id="storesAndPurchaseTopIssuedProductIdAndCountCanvas"></canvas>';

					new Chart(document.querySelector('#storesAndPurchaseTopIssuedProductIdAndCountCanvas'), {
						type: 'line',
						data: {
							labels: productList,
							datasets: [{
								label: 'Quantity',
								data: quantityList,
								fill: false,
								borderColor: 'rgb(75, 192, 192)',
								tension: 0.1
							}]
						},
						options: {
							scales: {
								y: {
									beginAtZero: true
								}
							}
						}
					});
				}, error: function(ts) { alert(ts) }
			});
			/*Top Issued Product ID and Count (End)*/

			/*Low Issued Product ID and Count (Start)*/
			$('#fromDateLowIssuedProductCount').val(formattedPreviousDate);
			$('#toDateLowIssuedProductCount').val(formattedCurrentDate);

			var fromDate = $('#fromDateLowIssuedProductCount').val();
			var toDate = $('#toDateLowIssuedProductCount').val();
			$.ajax({
				type: 'GET',
				url: 's&p/low-issued-product-and-count/' + fromDate + '/' + toDate + '',
				success: function(response) {
					let tempJson = response;
					let productList = [];
					let quantityList = [];
					for (let i = 0; i < tempJson.length; i++) {
						let productId = tempJson[i]['product_id'];
						productList.push(productId);

						let quantity = tempJson[i]['issued_quantity'];
						quantityList.push(quantity);
					}

					//console.log(productList);
					//console.log(quantityList);
					document.querySelector("#storesAndPurchaseLowIssuedProductIdAndCountDiv").innerHTML = '<canvas id="storesAndPurchaseLowIssuedProductIdAndCountCanvas"></canvas>';
					new Chart(document.querySelector('#storesAndPurchaseLowIssuedProductIdAndCountCanvas'), {
						type: 'line',
						data: {
							labels: productList,
							datasets: [{
								label: 'Quantity',
								data: quantityList,
								fill: false,
								borderColor: 'rgb(75, 192, 192)',
								tension: 0.1
							}]
						},
						options: {
							scales: {
								y: {
									beginAtZero: true
								}
							}
						}
					});

				}, error: function(ts) { alert(ts) }
			});
			/*Low Issued Product ID and Count (End)*/

			/* No.of Indent details (Start)*/
			$('#fromDateIndentDetails').val(formattedPreviousDate);
			$('#toDateIndentDetails').val(formattedCurrentDate);

			var fromDate = $('#fromDateIndentDetails').val();
			var toDate = $('#toDateIndentDetails').val();
			$.ajax({
				type: 'GET',
				url: 's&p/indent-details/' + fromDate + '/' + toDate + '',
				success: function(response) {
					let tempJson = response;
					let dateList = [];
					let countList = [];
					for (let i = 0; i < tempJson.length; i++) {
						let date = tempJson[i]['date'];
						dateList.push(date);

						let count = tempJson[i]['count'];
						countList.push(count);
					}
					//console.log(dateList);
					//console.log(countList);
					document.querySelector("#indentDetailsDiv").innerHTML = '<canvas id="indentDetailsCanvas"></canvas>';
					new Chart(document.querySelector('#indentDetailsCanvas'), {
						type: 'bar',
						data: {
							labels: dateList,
							datasets: [{
								label: 'Indent Details',
								data: countList,
								backgroundColor: [
									'rgba(255, 99, 132, 0.2)',
									'rgba(255, 159, 64, 0.2)',
									'rgba(255, 205, 86, 0.2)',
									'rgba(75, 192, 192, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(153, 102, 255, 0.2)',
									'rgba(201, 203, 207, 0.2)'
								],
								borderColor: [
									'rgb(255, 99, 132)',
									'rgb(255, 159, 64)',
									'rgb(255, 205, 86)',
									'rgb(75, 192, 192)',
									'rgb(54, 162, 235)',
									'rgb(153, 102, 255)',
									'rgb(201, 203, 207)'
								],
								borderWidth: 1
							}]
						},
						options: {
							scales: {
								y: {
									beginAtZero: true
								}
							}
						}
					});

				}, error: function(ts) { alert(ts) }
			});
			/* No.of Indent details (End)*/

			/*No.of Issuance - Column  Area Chart (Start)*/
			$('#fromDateIssuance').val(formattedPreviousDate);
			$('#toDateIssuance ').val(formattedCurrentDate);

			var fromDate = $('#fromDateIssuance').val();
			var toDate = $('#toDateIssuance').val();
			$.ajax({
				type: 'GET',
				url: 's&p/issuance/' + fromDate + '/' + toDate + '',
				success: function(response) {
					let tempJson = response;
					let countList = [];
					let dateList = [];
					for (let i = 0; i < tempJson.length; i++) {
						let count = tempJson[i]['count'];
						countList.push(count);

						let date = tempJson[i]['date'];
						dateList.push(date);
					}

					document.querySelector("#issuanceDiv").innerHTML = '<div id="issuance"></div>';
					new ApexCharts(document.querySelector("#issuance"), {
						series: [{
							name: "Issuance",
							data: countList
						}],
						chart: {
							type: 'area',
							height: 350,
							zoom: {
								enabled: false
							}
						},
						dataLabels: {
							enabled: false
						},
						stroke: {
							curve: 'straight'
						},
						subtitle: {
							text: 'Issuance Count',
							align: 'center'
						},
						labels: dateList,
						xaxis: {
							type: 'datetime',
						},
						yaxis: {
							opposite: false
						},
						legend: {
							horizontalAlign: 'left'
						}
					}).render();
				}, error: function(ts) { alert(ts) }
			});
			/*No.of Issuance - Column Area Chart (End)*/

			/*Product Comparison - Line Chart (Start)*/
			$('#fromDateProductComparison').val(formattedPreviousDate);
			$('#toDateProductComparison').val(formattedCurrentDate);

			var fromDate = $('#fromDateIssuance').val();
			var toDate = $('#toDateIssuance').val();
			$.ajax({
				type: 'GET',
				url: 's&p/product-comparison/' + fromDate + '/' + toDate + '',
				success: function(response) {
					let dateList = ['01 Dec 2022', '02 Dec 2022', '03 Dec 2022', '05 Dec 2022', '06 Dec 2022', '07 Dec 2022', '10 Dec 2022', '13 Dec 2022', '15 Dec 2022'];
					/*let tempJson = response;
					let countList = [];
					let dateList = [];
					for (let i = 0; i < tempJson.length; i++) {
						let count = tempJson[i]['count'];
						countList.push(count);

						let date = tempJson[i]['date'];
						dateList.push(date);
					}*/

					document.querySelector("#productComparisonDiv").innerHTML = '<div id="productComparison"></div>';
					new ApexCharts(document.querySelector("#productComparison"), {
						series: [
							{
								name: "2022",
								data: [21000, 52500, 21000, 31500, 10500, 42000, 21000, 31500]
							},
							{
								name: "2023",
								data: [10000, 90, 10000, 21000, 31500, 10500, 10850, 14500]
							}
						],
						chart: {
							height: 350,
							type: 'line',
							dropShadow: {
								enabled: true,
								color: '#000',
								top: 18,
								left: 7,
								blur: 10,
								opacity: 0.2
							},
							toolbar: {
								show: false
							}
						},
						colors: ['#77B6EA', '#545454'],
						dataLabels: {
							enabled: true,
						},
						stroke: {
							curve: 'smooth'
						},
						title: {
							text: 'Product Comparison',
							align: 'left'
						},
						grid: {
							borderColor: '#e7e7e7',
							row: {
								colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
								opacity: 0.5
							},
						},
						markers: {
							size: 1
						},
						labels: dateList,
						xaxis: {
							type: 'datetime',
						},
						yaxis: {
							opposite: false
						},
						legend: {
							position: 'top',
							horizontalAlign: 'right',
							floating: true,
							offsetY: -25,
							offsetX: -5
						}
					}).render();
				}, error: function(ts) { alert(ts) }
			});
			/*Product Comparison - Line Chart (End)*/

		}, error: function(ts) { alert(ts) }
	});
	$('#storesAndPurchaseCard').show();
	$('#storeAndPurchaseStoreWiseGraph').show();

});

/*Get PO Issued and Count based on From and To Date (Start)*/
$("#poIssuedCountRefresh").click(function() {

	let fromDate = $('#fromDatePOIssuedCount').val();
	let toDate = $('#toDatePOIssuedCount').val();

	/*No.of. PO Issued and Count - Column  Area Chart (Start)*/
	$.ajax({
		type: 'GET',
		url: 's&p/po-issued-and-count/' + fromDate + '/' + toDate + '',
		success: function(response) {
			var tempJson = response;
			var countList = [];
			var dateList = [];
			for (var i = 0; i < tempJson.length; i++) {
				var count = tempJson[i]['count'];
				countList.push(count);

				var date = tempJson[i]['date'];
				dateList.push(date);
			}

			document.querySelector("#poIssuedAndCountDiv").innerHTML = '<div id="poIssuedAndCount"></div>';
			new ApexCharts(document.querySelector("#poIssuedAndCount"), {
				series: [{
					name: "PO Count",
					data: countList
				}],
				chart: {
					type: 'area',
					height: 350,
					zoom: {
						enabled: false
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: 'straight'
				},
				subtitle: {
					text: 'PO Issued and Count ',
					align: 'center'
				},
				labels: dateList,
				xaxis: {
					type: 'datetime',
				},
				yaxis: {
					opposite: false
				},
				legend: {
					horizontalAlign: 'left'
				}
			}).render();
		}, error: function(ts) { alert(ts) }
	});
	/*No.of. PO Issued and Count - Column Area (End)*/

});
/*Get PO Issued and Count based on From and To Date (End)*/

/*Get Top Issued Product ID and Count (Start)*/
$("#topIssuedProductCountRefresh").click(function() {
	var fromDate = $('#fromDateTopIssuedProductCount').val();
	var toDate = $('#toDateTopIssuedProductCount').val();

	/*Get Top Issued Product ID and Count based on From and To Date (Start)*/
	$.ajax({
		type: 'GET',
		url: 's&p/top-issued-product-and-count/' + fromDate + '/' + toDate + '',
		success: function(response) {
			let tempJson = response;
			let productList = [];
			let quantityList = [];
			for (let i = 0; i < tempJson.length; i++) {
				let productId = tempJson[i]['product_id'];
				productList.push(productId);

				let quantity = tempJson[i]['issued_quantity'];
				quantityList.push(quantity);
			}

			document.querySelector("#storesAndPurchaseTopIssuedProductIdAndCountDiv").innerHTML = '<canvas id="storesAndPurchaseTopIssuedProductIdAndCountCanvas"></canvas>';
			new Chart(document.querySelector('#storesAndPurchaseTopIssuedProductIdAndCountCanvas'), {
				type: 'line',
				data: {
					labels: productList,
					datasets: [{
						label: 'Quantity',
						data: quantityList,
						fill: false,
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1
					}]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});

		}, error: function(ts) { alert(ts) }
	});
	/*Get Top Issued Product ID and Count based on From and To Date (Start)*/
});
/*Get Top Issued Product ID and Count (End)*/

/*Get Low Issued Product ID and Count (Start)*/
$("#lowIssuedProductCountRefresh").click(function() {
	var fromDate = $('#fromDateLowIssuedProductCount').val();
	var toDate = $('#toDateLowIssuedProductCount').val();

	/*Get Low Issued Product ID and Count based on From and To Date (Start)*/
	$.ajax({
		type: 'GET',
		url: 's&p/low-issued-product-and-count/' + fromDate + '/' + toDate + '',
		success: function(response) {
			let tempJson = response;
			let productList = [];
			let quantityList = [];
			for (let i = 0; i < tempJson.length; i++) {
				let productId = tempJson[i]['product_id'];
				productList.push(productId);

				let quantity = tempJson[i]['issued_quantity'];
				quantityList.push(quantity);
			}

			document.querySelector("#storesAndPurchaseLowIssuedProductIdAndCountDiv").innerHTML = '<canvas id="storesAndPurchaseLowTenIssuedProductIdAndCount"></canvas>';
			new Chart(document.querySelector('#storesAndPurchaseLowTenIssuedProductIdAndCount'), {
				type: 'line',
				data: {
					labels: productList,
					datasets: [{
						label: 'Quantity',
						data: quantityList,
						fill: false,
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1
					}]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});

		}, error: function(ts) { alert(ts) }
	});
	/*Get Low Issued Product ID and Count based on From and To Date (End)*/
});
/*Get Low Issued Product ID and Count (End)*/

/*Get No.of Indent details (Start)*/
$("#indentDetailsRefresh").click(function() {
	var fromDate = $('#fromDateIndentDetails').val();
	var toDate = $('#toDateIndentDetails').val();

	/*Get No.of Indent details based on From and To Date (Start)*/
	$.ajax({
		type: 'GET',
		url: 's&p/indent-details/' + fromDate + '/' + toDate + '',
		success: function(response) {
			let tempJson = response;
			let dateList = [];
			let countList = [];
			for (let i = 0; i < tempJson.length; i++) {
				let date = tempJson[i]['date'];
				dateList.push(date);

				let count = tempJson[i]['count'];
				countList.push(count);
			}
			//console.log(dateList);
			//console.log(countList);
			document.querySelector("#indentDetailsDiv").innerHTML = '<canvas id="indentDetailsCanvas"></canvas>';
			new Chart(document.querySelector('#indentDetailsCanvas'), {
				type: 'bar',
				data: {
					labels: dateList,
					datasets: [{
						label: 'Indent Details',
						data: countList,
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(255, 205, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(201, 203, 207, 0.2)'
						],
						borderColor: [
							'rgb(255, 99, 132)',
							'rgb(255, 159, 64)',
							'rgb(255, 205, 86)',
							'rgb(75, 192, 192)',
							'rgb(54, 162, 235)',
							'rgb(153, 102, 255)',
							'rgb(201, 203, 207)'
						],
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						y: {
							beginAtZero: true
						}
					}
				}
			});

		}, error: function(ts) { alert(ts) }
	});
	/*Get No.of Indent details based on From and To Date (End)*/
});
/*Get No.of Indent details (End)*/

/*Get No. of Issuance based on From and To Date (Start)*/
$("#issuanceRefresh").click(function() {

	let fromDate = $('#fromDateIssuance').val();
	let toDate = $('#toDateIssuance').val();

	/*No. of Issuance - Column  Area Chart (Start)*/
	$.ajax({
		type: 'GET',
		url: 's&p/issuance/' + fromDate + '/' + toDate + '',
		success: function(response) {
			let tempJson = response;
			let countList = [];
			let dateList = [];
			for (let i = 0; i < tempJson.length; i++) {
				let count = tempJson[i]['count'];
				countList.push(count);

				let date = tempJson[i]['date'];
				dateList.push(date);
			}

			document.querySelector("#issuanceDiv").innerHTML = '<div id="issuance"></div>';
			new ApexCharts(document.querySelector("#issuance"), {
				series: [{
					name: "Issuance",
					data: countList
				}],
				chart: {
					type: 'area',
					height: 350,
					zoom: {
						enabled: false
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: 'straight'
				},
				subtitle: {
					text: 'Issuance Count',
					align: 'center'
				},
				labels: dateList,
				xaxis: {
					type: 'datetime',
				},
				yaxis: {
					opposite: false
				},
				legend: {
					horizontalAlign: 'left'
				}
			}).render();
		}, error: function(ts) { alert(ts) }
	});
	/*No. of Issuance - Column Area (End)*/

});
/*Get No. of Issuance based on From and To Date (End)*/


/*OnClick to show the Ambattur Based Value*/
$("#ambatturCard").click(function() {
	/*Getting Ambattur Based Value*/
	var count = 0;
	$.ajax({
		type: 'GET',
		url: '/s&p/pur-product-store',
		success: function(response) {
			var tempJson = response;
			for (var i = 0; i < tempJson.length; i++) {
				count = tempJson[i]['count'];

				if (count >= 10000000) count = (count / 10000000).toFixed(2) + ' Cr';
				else if (count >= 100000) count = (count / 100000).toFixed(2) + ' Lac';
				else if (count >= 1000) count = (count / 1000).toFixed(2) + ' K';

				//$('#storesAndPurchaseLocationBasedValueLoadingSpinner').hide();
				$('#storesAndPurchaseLocationName').val('ambattur');
				$('#storesAndPurchaseLocationBasedValue').text(count);
			}
		}, error: function(ts) { alert(ts) }
	});
});

/*OnClick to show the Madhavaram Based Value*/
$("#madhavaramCard").click(function() {
	/*Getting Madhavaram Based Value*/
	var count = 0;
	$.ajax({
		type: 'GET',
		url: '/s&p/cd-store',
		success: function(response) {
			var tempJson = response;
			for (var i = 0; i < tempJson.length; i++) {
				count = tempJson[i]['count'];

				if (count >= 10000000) count = (count / 10000000).toFixed(2) + ' Cr';
				else if (count >= 100000) count = (count / 100000).toFixed(2) + ' Lac';
				else if (count >= 1000) count = (count / 1000).toFixed(2) + ' K';

				//$('#storesAndPurchaseLocationBasedValueLoadingSpinner').hide();
				$('#storesAndPurchaseLocationName').val('madhavaram');
				$('#storesAndPurchaseLocationBasedValue').text(count);
			}
		}, error: function(ts) { alert(ts) }
	});
});

/*OnClick to show the Sholinganallur Based Value*/
$("#sholinganallurCard").click(function() {
	/*Getting Sholinganallur Based Value*/
	var count = 0;
	$.ajax({
		type: 'GET',
		url: '/s&p/snr-store',
		success: function(response) {
			var tempJson = response;
			for (var i = 0; i < tempJson.length; i++) {
				count = tempJson[i]['count'];

				if (count >= 10000000) count = (count / 10000000).toFixed(2) + ' Cr';
				else if (count >= 100000) count = (count / 100000).toFixed(2) + ' Lac';
				else if (count >= 1000) count = (count / 1000).toFixed(2) + ' K';


				//$('#storesAndPurchaseLocationBasedValueLoadingSpinner').hide();
				$('#storesAndPurchaseLocationName').val('sholinganallur');
				$('#storesAndPurchaseLocationBasedValue').text(count);
			}
		}, error: function(ts) { alert(ts) }
	});
});

/*OnClick to show the Tiruvannamalai Based Value*/
$("#tiruvannamalaiCard").click(function() {
	/*Getting Tiruvannamalai Based Value*/
	var count = 0;
	$('#storesAndPurchaseLocationName').val('tiruvannamalai');
	$('#storesAndPurchaseLocationBasedValue').text(count);
});