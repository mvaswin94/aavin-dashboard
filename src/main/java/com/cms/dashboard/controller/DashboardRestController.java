package com.cms.dashboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardRestController {

	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@GetMapping(value = "/storesAndPurchase")
	public List<Map<String,Object>> getStoreValue()  {
		
//		 List<Map<String, Object>> a = jdbcTemplate.queryForList("select round( sum(A.UNIT_COST * A.QUANTITY_ON_HAND_TOTAL),2) AS COUNT FROM INVENTORY_ITEM A, FACILITY F \r\n"
//		  +"WHERE A.ORG_ID in ('III_DAIRY', 'GM_OFFICE','CENTRAL_D') AND  A.QUANTITY_ON_HAND_TOTAL>0  AND A.FACILITY_ID=F.FACILITY_ID AND \r\n"
//		  +"F.FACILITY_TYPE_ID='PUR_STORES'"); 
//		 
//		 System.out.println("---a---:"+a);
		 

			return jdbcTemplate.queryForList("select round( sum(A.UNIT_COST * A.QUANTITY_ON_HAND_TOTAL),2) AS COUNT FROM INVENTORY_ITEM A, FACILITY F \r\n"
					+ "WHERE A.ORG_ID in ('III_DAIRY', 'GM_OFFICE','CENTRAL_D') AND  A.QUANTITY_ON_HAND_TOTAL>0  AND A.FACILITY_ID=F.FACILITY_ID AND \r\n"
					+ "F.FACILITY_TYPE_ID='PUR_STORES'");
	}
}


