package com.cms.dashboard.controller;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;


@RestController
public class PersonalAndEstablishmentController {
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@GetMapping(value = "/erc/present-day-count")
	public List<Map<String,Object>> getPresentDayCount()  {
		
		LocalDate today = LocalDate.parse("2021-02-17");
			return jdbcTemplate.queryForList(
					"select COUNT(ed.is_Present) AS is_Present_Count \r\n" 
						    + "from person p , employment e, Empl_Daily_Attendance_Detail ed \r\n" 
						    + "where p.party_id=e.party_id_to and p.party_id=ed.party_id AND \r\n"
						    + "ed.DATE = '"+today+"'  AND \r\n"
							+ "e.from_date <='"+today+"' and (e.thru_date is null or e.thru_date >='"+today+"') AND \r\n"
							+ "(ed.is_present='Y' or ed.is_Ood='Y' or ed.is_Permision='Y')"
					);
	}
	
	
	
	
	@GetMapping(value = "/erc/last-ten-day-count")
		public List<Map<String,Object>> getLastTenDayCount()  {
		LocalDate today = LocalDate.parse("2021-02-17");
		LocalDate newDate = today.minusDays(10);  
		 

			return jdbcTemplate.queryForList(
					"select COUNT(ed.is_Present) AS is_Present_Count\r\n" 
				    + "from person p , employment e, Empl_Daily_Attendance_Detail ed \r\n" 
				    + "where p.party_id=e.party_id_to and p.party_id=ed.party_id AND \r\n"
				    + "ed.DATE >= '"+ newDate +"' AND ed.DATE <= '"+today+"' AND \r\n"
					+ "e.from_date <='"+ newDate +"' and (e.thru_date is null or e.thru_date >='"+today+"') AND \r\n"
					+ "(ed.is_present='Y' or ed.is_Ood='Y' or ed.is_Permision='Y')"
					);
	}
	
	@GetMapping(value = "/erc/last-hundred-day-count")
	public List<Map<String,Object>> getLastHundredDayCount()  {
		
		LocalDate today = LocalDate.parse("2021-02-17");
	
	LocalDate newDate = today.minusDays(100);  
	

		return jdbcTemplate.queryForList(
				"select COUNT(ed.is_Present) AS is_Present_Count\r\n" 
			    + "from person p , employment e, Empl_Daily_Attendance_Detail ed \r\n" 
			    + "where p.party_id=e.party_id_to and p.party_id=ed.party_id AND \r\n"
			    + "ed.DATE >= '"+ newDate +"' AND ed.DATE <= '"+today+"' AND \r\n"
				+ "e.from_date <='"+ newDate +"' and (e.thru_date is null or e.thru_date >='"+today+"') AND \r\n"
				+ "(ed.is_present='Y' or ed.is_Ood='Y' or ed.is_Permision='Y')"
				);
}
	@GetMapping(value = "/erc/last-seven-day-count")
	public List<Map<String,Object>> getLastSevenDayCount()  {
		LocalDate today = LocalDate.parse("2021-02-17");
		/* LocalDate today = LocalDate.now(); */
		LocalDate newDate = today.minusDays(6);  
	

		return jdbcTemplate.queryForList(
				"select  COUNT(ed.is_Present) AS is_Present_Count \r\n"  
			    +"from  person p , employment e, Empl_Daily_Attendance_Detail ed \r\n" 
			    +"where p.party_id=e.party_id_to and p.party_id=ed.party_id AND \r\n" 
			    +"ed.DATE >= '"+newDate+"' AND ed.DATE <= '"+today+"' AND \r\n"
				+"e.from_date <='"+newDate+"' and (e.thru_date is null or e.thru_date >='"+today+"') AND \r\n"
				+"(ed.is_present='Y' or ed.is_Ood='Y' or ed.is_Permision='Y') group by ed.DATE \r\n"
				);
}
	
	@GetMapping(value = "/payroll/current-month-payroll-count")
	public List<Map<String,Object>> getCurrentMonthPayRollCount()  {
		
		/*
		 * LocalDate today = LocalDate.now();
		 * 
		 * LocalDate firstDayOfMonth = today.withDayOfMonth(1); LocalDate earlier =
		 * firstDayOfMonth.minusMonths(1);
		 */
	    LocalDate today1 = LocalDate.parse("2021-02-28");
	    LocalDate hardCodeValue = today1.withDayOfMonth(1);
	   
			return jdbcTemplate.queryForList(
					"select  a.total_count From Period_Billing a, Custom_Time_Period b \r\n"
				    +"where a.custom_Time_Period_Id=b.custom_Time_Period_Id AND \r\n" 
				    +"a.total_Count>0 AND \r\n"
				    +"a.created_Date >= '"+hardCodeValue+"' AND a.created_Date <= '"+today1+"' AND \r\n" 
					+"(a.status_Id='GENERATED' or a.status_Id='APPROVED') AND \r\n"
					+"(a.billing_Type_Id='CASUAL_PAYROLL' or a.billing_Type_Id='PAYROLL_BILL' or a.billing_Type_Id='CONTRACT_PAYROLL')"
					);
	}
	
	
	@GetMapping(value = "/payroll/one-month-payroll-count")
	public List<Map<String,Object>> getOneMonthPayRollCount()  {
		
		
		/*
		 * LocalDate firstDayOfMonth = LocalDate.now().withDayOfMonth(1); LocalDate
		 * earlier = firstDayOfMonth.minusMonths(1);
		 */
	    
	    
	    LocalDate today1 = LocalDate.parse("2021-02-28");
	    LocalDate hardCodeValue = today1.withDayOfMonth(1);
	    LocalDate finalValue=hardCodeValue.minusMonths(1);
	    
			return jdbcTemplate.queryForList(
					"select a.total_count From Period_Billing a,Custom_Time_Period b \r\n" 
				    +"where a.custom_Time_Period_Id=b.custom_Time_Period_Id AND \r\n" 
				    +"a.total_Count>0 AND \r\n"
				    +"a.created_Date >= '"+finalValue+"' AND a.created_Date <= '"+today1+"' AND \r\n" 
					+"(a.status_Id='GENERATED' or a.status_Id='APPROVED') AND \r\n"
					+"(a.billing_Type_Id='CASUAL_PAYROLL' or a.billing_Type_Id='PAYROLL_BILL' or a.billing_Type_Id='CONTRACT_PAYROLL')"
					);
	}
	
	@GetMapping(value = "/payroll/two-month-payroll-count")
	public List<Map<String,Object>> getTwoMonthPayRollCount()  {
		
		
		/*
		 * LocalDate firstDayOfMonth = LocalDate.now().withDayOfMonth(1); LocalDate
		 * earlier = firstDayOfMonth.minusMonths(2);
		 */
	  
	    LocalDate today1 = LocalDate.parse("2021-02-28");
	    LocalDate hardCodeValue = today1.withDayOfMonth(1);
	    LocalDate finalValue=hardCodeValue.minusMonths(2);
	    
	   
			return jdbcTemplate.queryForList(
					"select a.total_count From Period_Billing a,Custom_Time_Period b \r\n" 
				    +"where a.custom_Time_Period_Id=b.custom_Time_Period_Id AND \r\n" 
			        +"a.total_Count>0 AND \r\n"
				    +"a.created_Date >= '"+finalValue+"' AND a.created_Date <= '"+today1+"' AND \r\n" 
					+"(a.status_Id='GENERATED' or a.status_Id='APPROVED') AND \r\n"
					+"(a.billing_Type_Id='CASUAL_PAYROLL' or a.billing_Type_Id='PAYROLL_BILL' or a.billing_Type_Id='CONTRACT_PAYROLL')"
					);
	}
	
	
	@GetMapping(value = "/ir/current-day-ir-count")
	public List<Map<String,Object>> getIrPresentDayCount()  {
		
		
		
		 LocalDate today= LocalDate.parse("2021-02-28");
		 LocalDate hardCodeValue = today.withDayOfMonth(1);
	    
	    
	   
			return jdbcTemplate.queryForList(
					"SELECT COUNT (INDUSTRAIL_ID) FROM INDUSTRIAL_RELATIONS WHERE \r\n"
					+"CREATED_BY_USER_LOGIN IN \r\n"
					+"(SELECT USER_LOGIN_ID FROM USER_LOGIN WHERE  \r\n"
					+"CREATED_STAMP>='"+hardCodeValue+"' AND CREATED_STAMP<='"+today+"')"
					);
	}
	@GetMapping(value = "/ir/ten-days-ir-count")
	public List<Map<String,Object>> getIrTenDaysCount()  {
		
		
		
		LocalDate today = LocalDate.parse("2021-02-28");
	    LocalDate hardCodeValue = today.withDayOfMonth(1);
	    LocalDate finalValue=hardCodeValue.minusMonths(1);
	    
	   
			return jdbcTemplate.queryForList(
					"SELECT COUNT (INDUSTRAIL_ID) FROM INDUSTRIAL_RELATIONS WHERE \r\n"
					+"CREATED_BY_USER_LOGIN IN \r\n"
					+"(SELECT USER_LOGIN_ID FROM USER_LOGIN WHERE \r\n "
					+"CREATED_STAMP>='"+finalValue+"' AND CREATED_STAMP<='"+today+"')"
					);
	}
	@GetMapping(value = "/ir/hundred-days-ir-count")
	public List<Map<String,Object>> getIrHundredDaysCount()  {
		
		
		
	  
		LocalDate today = LocalDate.parse("2021-02-28");
	    LocalDate hardCodeValue = today.withDayOfMonth(1);
	    LocalDate finalValue=hardCodeValue.minusMonths(2);
	    
	   
			return jdbcTemplate.queryForList(
					"SELECT COUNT (INDUSTRAIL_ID) FROM INDUSTRIAL_RELATIONS WHERE \r\n"
					+"CREATED_BY_USER_LOGIN IN \r\n"
					+"(SELECT USER_LOGIN_ID FROM USER_LOGIN WHERE \r\n" 
					+"CREATED_STAMP>='"+finalValue+"' AND CREATED_STAMP<='"+today+"')"
					);
	}
	
	@GetMapping(value = "/supplementary/current-month-supplementary-payroll")
	public List<Map<String,Object>> getCurrenMonthSupplementaryPayRoll()  {
		
		
		
	  
		LocalDate today = LocalDate.parse("2021-02-28");
	    LocalDate hardCodeValue = today.withDayOfMonth(1);
	  
	    //System.out.println("today"+today);
	    //System.out.println("hardCodeValue"+hardCodeValue);
	   
			return jdbcTemplate.queryForList(
					 "SELECT  COUNT (DISTINCT PERIOD_BILLING_ID) AS TOTALPAYROLLS FROM PAYROLL_HEADER WHERE \r\n"
					 +"PERIOD_BILLING_ID IN (SELECT PERIOD_BILLING_ID  FROM PERIOD_BILLING WHERE \r\n"
					 +"CREATED_DATE >= '2021-02-01' AND CREATED_DATE <= '2021-02-28' AND \r\n" 
					 +"BILLING_TYPE_ID IN ('SP_NIGHTALLWNCE', 'SP_PLI', 'SP_DA_ARREARS', 'SP_BONUS', 'SP_LEAVE_ENCASH',\r\n"
					 +"'SP_INCARREARS', 'SP_OT', 'SP_DRIVERBETA', 'SP_NEWLEAVE_ENCASH', 'SP_WASHALLOWANCES', 'SP_CASHALLOWANCES',\r\n"
					 +"'SP_SUSPENSE', 'SP_PCARREARS', 'SP_SPLPAYALLOWANCES', 'SP_DOUBLEWAGES', 'SP_WITHHELD', 'SP_ESR_REFUND', 'SP_CONVYALLOWANCES')\r\n" 
					 +" AND STATUS_ID IN ('GENERATED', 'APPROVED'))"
					);
	}
	@GetMapping(value = "/supplementary/last-two-month-supplementary-payroll")
	public List<Map<String,Object>> getLastTwoMonthSupplementaryPayRoll()  {
		
		
		
	  
		LocalDate today = LocalDate.parse("2021-02-28");
	    LocalDate hardCodeValue = today.withDayOfMonth(1);
	    LocalDate finalValue=hardCodeValue.minusMonths(1);
	    
	   
			return jdbcTemplate.queryForList(
					"SELECT  COUNT (DISTINCT PERIOD_BILLING_ID) AS TOTALPAYROLLS FROM PAYROLL_HEADER WHERE \r\n"
					+"PERIOD_BILLING_ID IN \r\n"
					+"(SELECT PERIOD_BILLING_ID  FROM PERIOD_BILLING WHERE \r\n" 
					+"CREATED_DATE >= '"+finalValue+"' AND CREATED_DATE <= '"+today+"' AND \r\n"
					+"BILLING_TYPE_ID IN ('SP_NIGHTALLWNCE', 'SP_PLI', 'SP_DA_ARREARS', 'SP_BONUS', 'SP_LEAVE_ENCASH', \r\n"
					+"'SP_INCARREARS', 'SP_OT', 'SP_DRIVERBETA', 'SP_NEWLEAVE_ENCASH', 'SP_WASHALLOWANCES', 'SP_CASHALLOWANCES', \r\n" 
					+"'SP_SUSPENSE', 'SP_PCARREARS', 'SP_SPLPAYALLOWANCES', 'SP_DOUBLEWAGES', 'SP_WITHHELD', 'SP_ESR_REFUND', 'SP_CONVYALLOWANCES') \r\n" 
					+" AND STATUS_ID IN ('GENERATED', 'APPROVED')) "
					);
	}
	@GetMapping(value = "/supplementary/last-three-month-supplementary-payroll")
	public List<Map<String,Object>> getThreeMonthSupplementaryPayRoll()  {
		
		
		
	  
		LocalDate today = LocalDate.parse("2021-02-28");
	    LocalDate hardCodeValue = today.withDayOfMonth(1);
	    LocalDate finalValue=hardCodeValue.minusMonths(2);
	    
	   
			return jdbcTemplate.queryForList(
					"SELECT  COUNT (DISTINCT PERIOD_BILLING_ID) AS TOTALPAYROLLS FROM PAYROLL_HEADER WHERE \r\n"
					+"PERIOD_BILLING_ID IN \r\n"
					+"(SELECT PERIOD_BILLING_ID  FROM PERIOD_BILLING WHERE \r\n"
					+"CREATED_DATE >= '"+finalValue+"' AND CREATED_DATE <= '"+today+"' AND \r\n"
					+"BILLING_TYPE_ID IN ('SP_NIGHTALLWNCE', 'SP_PLI', 'SP_DA_ARREARS', 'SP_BONUS', 'SP_LEAVE_ENCASH', \r\n"
					+"'SP_INCARREARS', 'SP_OT', 'SP_DRIVERBETA', 'SP_NEWLEAVE_ENCASH', 'SP_WASHALLOWANCES', 'SP_CASHALLOWANCES', \r\n" 
					+"'SP_SUSPENSE', 'SP_PCARREARS', 'SP_SPLPAYALLOWANCES', 'SP_DOUBLEWAGES', 'SP_WITHHELD', 'SP_ESR_REFUND', 'SP_CONVYALLOWANCES') \r\n" 
					+"AND STATUS_ID IN ('GENERATED', 'APPROVED'))"
					);
	}
	
	
	 @GetMapping(value="/tapal/tapal-count")
	 public List<Map<String,Object>> getTapalCount(){
		 LocalDate today = LocalDate.parse("2021-02-01");
		 LocalDate tenDays = today.minusDays(10);
		 LocalDate hundredDays = today.minusDays(100);
		 Long todayFinalCount=0l;
		 Long tenDaysFinalCount=0l;
		 Long hundredDaysFinalCount=0l;
		 Map<String,Object> finalResult  = new HashMap<String, Object>();
		 List<Map<String, Object>>  finalList=new ArrayList<>();
		 String todayReceivingQuery = "SELECT COUNT (RECEIVING_TAPAL_ID) FROM RECEIVING_TAPAL WHERE \r\n"
			  		+ "	CREATED_BY_USER_LOGIN IN (SELECT USER_LOGIN_ID FROM USER_LOGIN WHERE \r\n"
			  		+ "TAPAL_DATE='"+today+"')";
		 String todayDispatchQuery="SELECT COUNT (DISPATCH_NUMBER) FROM TAPAL_OUT_GOING WHERE\r\n"
					+ "CREATED_BY_USER_LOGIN IN (SELECT USER_LOGIN_ID FROM USER_LOGIN WHERE DISPATCH_DATE ='"+today+"')";
		 
		 String tenDaysReceivingQuery ="SELECT COUNT (RECEIVING_TAPAL_ID) FROM RECEIVING_TAPAL WHERE \r\n"
                 +"CREATED_BY_USER_LOGIN IN (SELECT USER_LOGIN_ID FROM USER_LOGIN WHERE \r\n"
                 +"TAPAL_DATE>='"+tenDays+"' AND TAPAL_DATE<='"+today+"')";
		 
		 String tenDaysDispatchQuery="SELECT COUNT (DISPATCH_NUMBER) FROM TAPAL_OUT_GOING WHERE \r\n"
                 +"CREATED_BY_USER_LOGIN IN (SELECT USER_LOGIN_ID FROM USER_LOGIN WHERE \r\n"
                 + "DISPATCH_DATE>= '"+tenDays+"' AND DISPATCH_DATE<='"+today+"')";
		 
		 String hundredDaysReceivingQuery="SELECT COUNT (RECEIVING_TAPAL_ID) FROM RECEIVING_TAPAL WHERE \r\n"
		  			+"CREATED_BY_USER_LOGIN IN (SELECT USER_LOGIN_ID FROM USER_LOGIN WHERE \r\n"
		  			+"TAPAL_DATE>='"+hundredDays+"' AND TAPAL_DATE<='"+today+"')";
		 
		 String hundredDaysDispatchQuery="SELECT COUNT (DISPATCH_NUMBER) FROM TAPAL_OUT_GOING WHERE \r\n"
	   				+"CREATED_BY_USER_LOGIN IN (SELECT USER_LOGIN_ID FROM USER_LOGIN \r\n"
	   				+"WHERE DISPATCH_DATE>='"+hundredDays+"'AND DISPATCH_DATE<='"+today+"')";
		 
		 List<Map<String, Object>> resultOfTodayReceivingQuery = jdbcTemplate.queryForList(todayReceivingQuery); 
		 List<Map<String, Object>> resultOfTodayDispatchQuery = jdbcTemplate.queryForList(todayDispatchQuery); 
		 List<Map<String, Object>> resultOfTenDaysReceivingQuery = jdbcTemplate.queryForList(tenDaysReceivingQuery); 
		 List<Map<String, Object>> resultOfTenDaysDispatchQuery = jdbcTemplate.queryForList(tenDaysDispatchQuery); 
		 List<Map<String, Object>> resultOfhundredDaysReceivingQuery = jdbcTemplate.queryForList(hundredDaysReceivingQuery); 
		 List<Map<String, Object>> resultOfhundredDaysDispatchQuery = jdbcTemplate.queryForList(hundredDaysDispatchQuery); 
		 
		 for(Map<String, Object> receivingTapalCount:resultOfTodayReceivingQuery) {
				for(Map.Entry<String, Object> tapalCount:receivingTapalCount.entrySet()) {
					Long count = (Long)tapalCount.getValue() ;
					todayFinalCount+=count;
					}
				}
		 for(Map<String, Object> dispatchTapalCount:resultOfTodayDispatchQuery) {
				for(Map.Entry<String, Object> tapalCount:dispatchTapalCount.entrySet()) {
					Long count = (Long) tapalCount.getValue();
					todayFinalCount+=count;
					}
				}
		 for(Map<String,Object> receivingTapalCount:resultOfTenDaysReceivingQuery) {
	    	  for(Map.Entry<String,Object> tapalCount:receivingTapalCount.entrySet()) {
	    		  Long count=(Long) tapalCount.getValue();
	    		  tenDaysFinalCount+=count; 
	    		  } 
	    	  }
		 for(Map<String,Object> dispatchTapalCount:resultOfTenDaysDispatchQuery) {
	    	  for(Map.Entry<String,Object> tapalCount:dispatchTapalCount.entrySet()) { 
	    		  Long count=(Long) tapalCount.getValue(); 
	    		  tenDaysFinalCount+=count;
	    		  } 
	    	  } 
		 for(Map<String,Object> receivingTapalCount:resultOfhundredDaysReceivingQuery ) {
			   for(Map.Entry<String, Object> tapalCount:receivingTapalCount.entrySet()) {
				   Long count=(Long)tapalCount.getValue(); 
				   hundredDaysFinalCount+=count; 
				   }
			   }
		 for(Map<String,Object> dispatchTapalCount:resultOfhundredDaysDispatchQuery) {
			  for(Map.Entry<String, Object> tapalCount:dispatchTapalCount.entrySet()) {
				  	Long count=(Long) tapalCount.getValue(); 
				  	hundredDaysFinalCount+=count;
				  	} 
			  }
		 finalResult.put("todayCount",todayFinalCount);
		 finalResult.put("tenDaysCount",tenDaysFinalCount);
		 finalResult.put("hundredDaysCount",hundredDaysFinalCount);
		 finalList.add(finalResult);
		 //System.out.println("===finalList===:"+finalList);
		  return finalList;
	 }
	 @GetMapping(value = "/tapal/today-tapal-count")
	  public List<Map<String,Object>> getCurrentDateTapalCount() {
		 LocalDate today = LocalDate.parse("2021-02-01"); 
		 Long finalCount=0l;
		 List<Map<String, Object>> finalList=new ArrayList<>();
		 
		  String receivingQuery = "SELECT COUNT (RECEIVING_TAPAL_ID) FROM RECEIVING_TAPAL WHERE \r\n"
		  		+ "	CREATED_BY_USER_LOGIN IN (SELECT USER_LOGIN_ID FROM USER_LOGIN WHERE \r\n"
		  		+ "TAPAL_DATE='"+today+"')";
		  
		 String dispatchQuery="SELECT COUNT (DISPATCH_NUMBER) FROM TAPAL_OUT_GOING WHERE\r\n"
					+ "CREATED_BY_USER_LOGIN IN (SELECT USER_LOGIN_ID FROM USER_LOGIN WHERE DISPATCH_DATE ='"+today+"')";
					
			List<Map<String, Object>> resultOfReceivingQuery = jdbcTemplate.queryForList(receivingQuery); 
			List<Map<String, Object>> resultOfDispatchQuery = jdbcTemplate.queryForList(dispatchQuery); 
			
			for(Map<String, Object> receivingTapalCount:resultOfReceivingQuery) {
				for(Map.Entry<String, Object> tapalCount:receivingTapalCount.entrySet()) {
					Long count = (Long)tapalCount.getValue() ;
					finalCount+=count;
					}
				}
			for(Map<String, Object> dispatchTapalCount:resultOfDispatchQuery) {
				for(Map.Entry<String, Object> tapalCount:dispatchTapalCount.entrySet()) {
					Long count = (Long) tapalCount.getValue();
					finalCount+=count;
					}
				}
			 Map<String,Object> finalResult  = new HashMap<String, Object>(); 
			 finalResult.put("count",finalCount);
			 finalList.add(finalResult);
			 //System.out.println("finalList"+finalList);
			 return finalList;
	  }
}