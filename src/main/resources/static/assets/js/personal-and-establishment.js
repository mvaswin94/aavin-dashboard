(function() {
	$("#personalAndEstablishmentMain").hide();

})();


$("#personalAndEstablishmentDashboard").click(function() {

	$("#moduleBasedCard").hide();
	$("#locationBasedCard").hide();
	$("#personalAndEstablishmentMain").show();
	$("#employeeRollCardDetails").show();
	$("#employeeAttendenceDetails").hide();
    $("#payRollDetails").hide();
    $("#supplementaryDetails").hide();
    $("#IrEntries").hide();
    $("#tapalEntries").hide();
    
	$.ajax({
		type: 'GET',
		url: '/erc/present-day-count',
		success: function(response) {
			var tempJson = response;
			for (var i = 0; i < tempJson.length; i++) {
				var presentCount = tempJson[i]['is_present_count'];
				$('#employeePresentValue').text(presentCount);
				
				
			}
		}, error: function(ts) { alert(ts) }
	});

	$.ajax({
		type: 'GET',
		url: '/payroll/current-month-payroll-count',
		success: function(response){
			var tempJson = response;
			var finalValue=0;
			for (var i = 0; i < tempJson.length; i++) {
				var Count = tempJson[i]['total_count'];
				finalValue+=Count
				}
				
				$('#payRollCount').text(finalValue);
				
			
		},error:function(ts){
			
			alert(ts);
			
		}
	});
	$.ajax({
		type:'GET',
		url:'/supplementary/current-month-supplementary-payroll',
		success:function(response){
			var tempJson = response;
			for(var i=0;i<tempJson.length;i++)
			{
				var count=tempJson[i]['totalpayrolls'];
				$('#supplementaryCount').text(count);
				
				
			}
		},error:function(ts){
			alert(ts);
		}
		
	});
	$.ajax({
		type:'GET',
		url:'/tapal/today-tapal-count',
		success:function(response){
			var tempJson = response;
			for(var i=0;i<tempJson.length;i++)
			{
				var count=tempJson[i]['count'];
				$('#tapalEntriesValue').text(count);
				
				
			}
		},error:function(ts){
			alert(ts);
		}
		
	});
	$.ajax({
		type:'GET',
		url:'/ir/current-day-ir-count',
		success:function(response){
			var tempJson = response;
			for(var i=0;i<tempJson.length;i++)
			{
				var count=tempJson[i]['count'];
				$('#irValue').text(count);
				
				
			}
		},error:function(ts){
			alert(ts);
		}
		
	});



});

/*Onclick function Employee Roll Card Entries*/
$("#employeePresentCount").click(function() {
	let attendenceList = [];
	let presentList = [];
	$.ajax({
		type: 'GET',
		url: '/erc/present-day-count',
		success: function(response) {
			var tempJson = response;
			for (var i = 0; i < tempJson.length; i++) {
				var presentCount = tempJson[i]['is_present_count'];
				$('#employeePresentValue').text(presentCount);
				$('#employeeDailyCount').text(presentCount);
				attendenceList.push(presentCount);
			}
		}, error: function(ts) { alert(ts) }
	});

	
	$.ajax({
		type: 'GET',
		url: '/erc/last-ten-day-count',
		success: function(response) {
			var tempJson = response;
			for (var i = 0; i < tempJson.length; i++) {
				var presentCount = tempJson[i]['is_present_count'];

				$('#tenDaysEmployeeCount').text(presentCount);
				attendenceList.push(presentCount);
			}
		}, error: function(ts) {
			alert(ts)
		}
	});

	$.ajax({
		type: 'GET',
		url: '/erc/last-hundred-day-count',
		success: function(response) {
			var tempJson = response;

			for (var i = 0; i < tempJson.length; i++) {
				var presentCount = tempJson[i]['is_present_count'];

				$('#hundredDaysEmployeeCount').text(presentCount);
				attendenceList.push(presentCount);
				document.querySelector("#attendenceChartDiv").innerHTML = '<canvas id="attendenceChart" style="max-height: 312px;"></canvas>';
	new Chart(document.querySelector('#attendenceChart'), {
		type: 'bar',
		data: {
			labels: ['Today', 'TenDaysBefore', 'HundredDaysBefore'],
			datasets: [{
				label: 'Attendence Details',
				data: attendenceList,
				backgroundColor: [
					'rgba(255, 0, 43, 0.2)',
					'rgba(0, 12, 225, 0.2)',
					'rgba(0, 224, 138, 0.2)',

				],
				borderColor: [
					'rgb(255, 0, 43)',
					'rgb(0, 12, 225)',
					'rgb(0, 224, 138 )',

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

	
	
			}
		}, error: function(ts) {
			alert(ts)
		}
	});



	$.ajax({
		type: 'GET',
		url: '/erc/last-seven-day-count',
		success: function(response) {
			var tempJson = response;

			for (var i = 0; i < tempJson.length; i++) {
				presentList.push(tempJson[i]['is_present_count']);

			}
			presentList.reverse();
			document.querySelector("#lastSevenDaysChart").innerHTML = '<canvas id="lastSevenDays" style="max-height: 312px;"></canvas>';
	new Chart(document.querySelector('#lastSevenDays'), {
		type: 'pie',
		data: {
			labels: ['Today','Yesterday', 'OneDayBefore', 'TwoDaysBefore', 'ThreeDaysBefore', 'FourDaysBefore', 'FiveDaysBefore'],
			datasets: [{
				label: 'Present',
				data: presentList,
				backgroundColor: [
					'rgb(255,128,128)',
					'rgb(0,139,139)',
					'rgb(0,224,138 )',
					'rgb(255,99,71)',
					'rgb(70,130,180)',
					'rgb(205,92,92)',
					'rgb(219,112,147)'
				],
				hoverOffset: 5
			}]
		}
	});
	
		}, error: function(ts) {
			alert(ts)
		}
	});
	

	
	

	
	$("#moduleBasedCard").hide();
	$("#locationBasedCard").hide()
	$("#personalAndEstablishmentMain").show();
	$("#employeeRollCardDetails").hide();
	$("#employeeAttendenceDetails").show();
    $("#payRollDetails").hide();
    $("#supplementaryDetails").hide();
    $("#IrEntries").hide();
    $("#tapalEntries").hide();
});


/*Onclick function Pay Roll Entries*/
$("#payRoll").click(function(){
	let payRollList=[];
	$.ajax({
		type: 'GET',
		url: '/payroll/current-month-payroll-count',
		success: function(response){
			var tempJson = response;
			var finalValue=0;
			for (var i = 0; i < tempJson.length; i++) {
				var Count = tempJson[i]['total_count'];
				finalValue+=Count
				
				}
				$('#payRollCount').text(finalValue);
				$('#currentMonthPayRollCount').text(finalValue);
				payRollList.push(finalValue);
			
		},error:function(ts){
			
			alert(ts);
			
		}
	});

	
	
	$.ajax({
		type: 'GET',
		url: '/payroll/one-month-payroll-count',
		
		success: function(response){
			var tempJson = response;
			var finalValue=0;
			for (var i = 0; i < tempJson.length; i++) {
				var Count = tempJson[i]['total_count'];
				finalValue+=Count
			}
			$('#OneMonthBeforePayRollCount').text(finalValue);
			payRollList.push(finalValue);
		},error:function(ts){
			alert(ts);
			
		}
	});
	$.ajax({
		type: 'GET',
		url: '/payroll/two-month-payroll-count',
		
		success: function(response){
			var tempJson = response;
			var finalValue=0;
			for (var i = 0; i < tempJson.length; i++) {
				var Count = tempJson[i]['total_count'];
				finalValue+=Count
			}
			 $('#twoMonthsBeforePayRollCount').text(finalValue);
			 payRollList.push(finalValue);
			 echarts.init(document.querySelector("#payRollChart")).setOption({
                    tooltip: {
                      trigger: 'item'
                    },
                    legend: {
                      top: '5%',
                      left: 'center'
                    },
                    series: [{
                      name: 'Access From',
                      type: 'pie',
                      radius: ['40%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        show: false,
                        position: 'center'
                      },
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '18',
                          fontWeight: 'bold'
                        }
                      },
                      labelLine: {
                        show: false
                      },
                      data: [{
                          value:payRollList[0],
                          name: 'Current Month'
                        },
                        {
                          value:payRollList[1],
                          name: 'One Month Before'
                        },
                        {
                          value:payRollList[2] ,
                          name: 'Two Months Before'
                        }
                      ]
                    }]
                  });
                  
		},error:function(ts){
			alert(ts);
			
		}
	});
	
	
	
	
                  
    $("#moduleBasedCard").hide();
	$("#locationBasedCard").hide();
	$("#personalAndEstablishmentMain").show();
	$("#employeeRollCardDetails").hide();
	$("#employeeAttendenceDetails").hide();
	$("#payRollDetails").show();
	$("#supplementaryDetails").hide();
	$("#IrEntries").hide();
	$("#tapalEntries").hide();
	
	
	
});

/*Onclick function Supplementary Pay Roll Entries*/

$("#supplementary").click(function(){
	$.ajax({
		type:'GET',
		url:'/supplementary/current-month-supplementary-payroll',
		success:function(response){
			var tempJson = response;
			for(var i=0;i<tempJson.length;i++)
			{
				var count=tempJson[i]['totalpayrolls'];
				$('#supplementaryCurrentMonth').text(count);
				
				
			}
			
		},error:function(ts){
			alert(ts);
		}
		
	});
	$.ajax({
		type:'GET',
		url:'/supplementary/last-two-month-supplementary-payroll',
		success:function(response){
			var tempJson=response;
			for(var i=0;i<tempJson.length;i++){
				var count=tempJson[i]['totalpayrolls'];
				$('#SupplementaryFirstMonth').text(count);
			}
			
		},error:function(ts){
			alert(ts);
		}
	});
	
	$.ajax({
		type:'GET',
		url:'/supplementary/last-three-month-supplementary-payroll',
		success:function(response){
			var tempJson=response;
			for(var i=0;i<tempJson.length;i++){
				var count=tempJson[i]['totalpayrolls'];
				$('#SupplementarySecondMonth').text(count);
			}
		},error:function(ts){
			alert(ts);
		}
	});
	$("#moduleBasedCard").hide();
	$("#locationBasedCard").hide();
	$("#personalAndEstablishmentMain").show();
	$("#employeeRollCardDetails").hide();
	$("#employeeAttendenceDetails").hide();
	$("#payRollDetails").hide();
	$("#supplementaryDetails").show();
	$("#IrEntries").hide();
	$("#tapalEntries").hide();
	
});

/*Onclick function tapal Entries*/

$("#tapal").click(function(){
	const tapalList=[];
	$.ajax({
		type:'GET',
		url:'/tapal/tapal-count',
		success:function(response){
			var tempJson=response;
			for(var i=0;i<tempJson.length;i++){
				var todayCount=tempJson[i]['todayCount'];
				var tenDaysCount=tempJson[i]['tenDaysCount'];
				var hundredDaysCount=tempJson[i]['hundredDaysCount'];
				tapalList.push(todayCount);
				tapalList.push(tenDaysCount);
				tapalList.push(hundredDaysCount);
				$('#todayTapalEntries').text(todayCount);
				$('#tenDaysTapalEntries').text(tenDaysCount);
				$('#hundredDaysTapalEntries').text(hundredDaysCount)
				
			}
			document.querySelector("#tapalChartDiv").innerHTML = '<canvas id="tapalChart" style="max-height: 312px;"></canvas>';
	new Chart(document.querySelector('#tapalChart'), {
                    type: 'bar',
                    data: {
                      labels: ['Today', 'Ten Days Before', 'Hundred Days Before'],
                      datasets: [{
                        label: 'Tapal',
                        data:tapalList,
                        backgroundColor: [
                          'rgba(8,81,103, 0.2)',
                          'rgba(217,3,76, 0.2)',
                          'rgba(7,2,124,0.2)',
                          
                        ],
                        borderColor: [
                          'rgb(8,81,103)',
                          'rgb(217,3,76)',
                          'rgb(7,2,124)',
                          
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
			
			 
		},error:function(ts){
			alert(ts);
		}
	});
	$("#moduleBasedCard").hide();
	$("#locationBasedCard").hide();
	$("#personalAndEstablishmentMain").show();
	$("#employeeRollCardDetails").hide();
	$("#employeeAttendenceDetails").hide();
	$("#payRollDetails").hide();
	$("#supplementaryDetails").hide();
	$("#IrEntries").hide();
	$("#tapalEntries").show();
	
	
});

/*Onclick function IR Entries*/

$("#entries").click(function(){
	
	
	$.ajax({
		type:'GET',
		url:'/ir/current-day-ir-count',
		success:function(response){
			var tempJson=response;
			for(var i=0;i<tempJson.length;i++){
				var count=tempJson[i]['count'];
				$('#todayIrCount').text(count);
			}
			
		},error:function(ts){
			alert(ts);
		}
	});
	$.ajax({
		type:'GET',
		url:'/ir/ten-days-ir-count',
		success:function(response){
			var tempJson=response;
			for(var i=0;i<tempJson.length;i++){
				var count=tempJson[i]['count'];
				$('#TenDaysIrCount').text(count);
			}
			
		},error:function(ts){
			alert(ts);
		}
	});
	$.ajax({
		type:'GET',
		url:'/ir/hundred-days-ir-count',
		success:function(response){
			var tempJson=response;
			for(var i=0;i<tempJson.length;i++){
				var count=tempJson[i]['count'];
				$('#hundredDaysIrCount').text(count);
			}
			
		},error:function(ts){
			alert(ts);
		}
	});
	
	$("#moduleBasedCard").hide();
	$("#locationBasedCard").hide();
	$("#personalAndEstablishmentMain").show();
	$("#employeeRollCardDetails").hide();
	$("#employeeAttendenceDetails").hide();
	$("#payRollDetails").hide();
	$("#supplementaryDetails").hide();
	$("#IrEntries").show();
	$("#tapalEntries").hide();
});

