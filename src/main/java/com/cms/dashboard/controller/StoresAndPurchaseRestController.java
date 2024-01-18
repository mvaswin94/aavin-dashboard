package com.cms.dashboard.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoresAndPurchaseRestController {

	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@GetMapping(value = "/s&p/snr-store")
	public List<Map<String,Object>> getSholinganallurStoreValue()  {
		
		return jdbcTemplate.queryForList("select round( sum(A.UNIT_COST * A.QUANTITY_ON_HAND_TOTAL),2) AS COUNT FROM INVENTORY_ITEM A, FACILITY F \r\n"
				+ "WHERE A.ORG_ID in ('III_DAIRY') AND  A.QUANTITY_ON_HAND_TOTAL>0  AND A.FACILITY_ID=F.FACILITY_ID AND \r\n"
				+ "F.FACILITY_TYPE_ID='PUR_STORES'");
	}
	
	@GetMapping(value = "/s&p/cd-store")
	public List<Map<String,Object>> getCentralDairyStoreValue()  {
		
		return jdbcTemplate.queryForList("select round( sum(A.UNIT_COST * A.QUANTITY_ON_HAND_TOTAL),2) AS COUNT FROM INVENTORY_ITEM A, FACILITY F \r\n"
				+ "WHERE A.ORG_ID in ('CENTRAL_D') AND  A.QUANTITY_ON_HAND_TOTAL>0  AND A.FACILITY_ID=F.FACILITY_ID AND \r\n"
				+ "F.FACILITY_TYPE_ID='PUR_STORES'");
		
	}
	
	@GetMapping(value = "/s&p/pur-product-store")
	public List<Map<String,Object>> getPurchaseAndProductsStoreValue()  {
		
		return jdbcTemplate.queryForList("select round( sum(A.UNIT_COST * A.QUANTITY_ON_HAND_TOTAL),2) AS COUNT FROM INVENTORY_ITEM A, FACILITY F \r\n"
				+ "WHERE A.ORG_ID in ('GM_OFFICE') AND  A.QUANTITY_ON_HAND_TOTAL>0  AND A.FACILITY_ID=F.FACILITY_ID AND \r\n"
				+ "F.FACILITY_TYPE_ID='PUR_STORES'");
	}
	
	@GetMapping(value = "/s&p/facility-based")
	public List<Map<String,Object>> getFacilityBasedValue()  {
		
		/*
		 * List<Map<String, Object>> a = jdbcTemplate.
		 * queryForList("select  A.facility_id, round( sum(A.UNIT_COST * A.QUANTITY_ON_HAND_TOTAL),2) FROM INVENTORY_ITEM A, FACILITY F \r\n"
		 * +
		 * "WHERE A.ORG_ID in ('III_DAIRY', 'GM_OFFICE','CENTRAL_D') AND  A.QUANTITY_ON_HAND_TOTAL>0  AND A.FACILITY_ID=F.FACILITY_ID AND \r\n"
		 * + "F.FACILITY_TYPE_ID='PUR_STORES'\r\n" + "GROUP BY A.facility_id");
		 */
		 
		 //System.out.println("---a---:"+a);
		
		return jdbcTemplate.queryForList("select  A.facility_id, round( sum(A.UNIT_COST * A.QUANTITY_ON_HAND_TOTAL),2) FROM INVENTORY_ITEM A, FACILITY F \r\n"
				+ "WHERE A.ORG_ID in ('III_DAIRY', 'GM_OFFICE','CENTRAL_D') AND  A.QUANTITY_ON_HAND_TOTAL>0  AND A.FACILITY_ID=F.FACILITY_ID AND \r\n"
				+ "F.FACILITY_TYPE_ID='PUR_STORES'\r\n"
				+ "GROUP BY A.facility_id");
	}
	
	@GetMapping(value = "/s&p/po-issued-and-count/{fromDate}/{toDate}")
	public List<Map<String,Object>> getPOIssueAndCountValue(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate ) {
			
		 return jdbcTemplate.queryForList("select To_CHAR(order_date,'dd Mon yyyy') as date, count(order_id) as count ,sum(grand_total) as total\r\n"
		 		+ "from order_header where org_id in ('GM_OFFICE','CENTRAL_D','III_DAIRY') and order_date between '"+fromDate+"' \r\n"
		 		+ "and '"+toDate+"' and order_type_id='PURCHASE_ORDER' and status_id='ORDER_COMPLETED' GROUP BY date");
	}
	
	@GetMapping(value = "/s&p/top-issued-product-and-count/{fromDate}/{toDate}")
	public List<Map<String,Object>> getTopIssuedProductAndCountValue(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate ) {
		
		String query = "select ii.product_id, SUM(ii.quantity) as issued_quantity from cust_request  a, item_issuance ii \r\n"
				+ "where a.org_id in ('III_DAIRY', 'GM_OFFICE','CENTRAL_D') and a.facility_id in \r\n"
				+ "('PUR_STORE','PRODUCT_STORE','CD_STORE','SNR_STORE') AND a.cust_request_type_id in \r\n"
				+ "('INTERNAL_INDENT','INTUNIT_INDENT','PRODUCT_REQUIREMENT','IUT_TRANSFER') and a.cust_request_date \r\n"
				+ "between '"+fromDate+"' and '"+toDate+"' and a.cust_Request_id=ii.cust_request_id group by product_id \r\n"
				+ "order by issued_quantity desc limit 10";
		//System.out.println("Query:"+query);
		
		List<Map<String, Object>> result = jdbcTemplate.queryForList(query); 
		//System.out.println("---getTopIssuedProductAndCountValue---:"+result);
			 
		return result;
	}
	
	@GetMapping(value = "/s&p/low-issued-product-and-count/{fromDate}/{toDate}")
	public List<Map<String,Object>> getLowIssuedProductAndCountValue(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate ) {
		
		String query = "select ii.product_id, sum(ii.quantity) as issued_quantity from cust_request  a, item_issuance ii\r\n"
				+ "where a.org_id in ('III_DAIRY', 'GM_OFFICE','CENTRAL_D') and a.facility_id in \r\n"
				+ "('PUR_STORE','PRODUCT_STORE','CD_STORE','SNR_STORE') and a.cust_request_type_id in\r\n"
				+ "('INTERNAL_INDENT','INTUNIT_INDENT','PRODUCT_REQUIREMENT','IUT_TRANSFER') and a.cust_request_date between\r\n"
				+ "'"+fromDate+"' and '"+toDate+"' and a.cust_Request_id=ii.cust_request_id group by product_id \r\n"
				+ "order by issued_quantity asc limit 10";
		//System.out.println("Query:"+query);
		
		List<Map<String, Object>> result = jdbcTemplate.queryForList(query); 
		//System.out.println("---getLowIssuedProductAndCountValue---:"+result);
			 
		return result;
	}
	
	@GetMapping(value = "/s&p/stocks-in-below-re-order-level")
	public List<Map<String,Object>> getStocksInBelowReOrderLevelCountValue()  {
		
		return jdbcTemplate.queryForList("select count(*) from (\r\n"
				+ "select product_facility.product_id, product_facility.maximum_stock, product_facility.reorder_quantity,\r\n"
				+ "sum(inventory_item.quantity_on_hand_total) from product_facility product_facility, inventory_item inventory_item \r\n"
				+ "where product_facility.facility_id in ('CD_STORE', 'PRODUCT_STORE', 'PUR_STORE', 'SMD_STORE', 'SNR_STORE') and \r\n"
				+ "product_facility.product_id=inventory_item.product_id and product_facility.facility_id=inventory_item.facility_id and \r\n"
				+ "inventory_item.quantity_on_hand_total>=0 group by product_facility.reorder_quantity, product_facility.maximum_stock, \r\n"
				+ "product_facility.reorder_quantity ,product_facility.product_id having sum(inventory_item.quantity_on_hand_total)<product_facility.reorder_quantity) c");
	}
	
	@GetMapping(value = "/s&p/stocks-in-over-sufficient-level")
	public List<Map<String,Object>> getStocksInOverSufficientLevelCountValue()  {
		
		return jdbcTemplate.queryForList("select count(*) from (\r\n"
				+ "select product_facility.product_id, product_facility.maximum_stock, product_facility.reorder_quantity,\r\n"
				+ "sum(inventory_item.quantity_on_hand_total) from product_facility product_facility, inventory_item inventory_item \r\n"
				+ "where product_facility.facility_id in ('CD_STORE', 'PRODUCT_STORE', 'PUR_STORE', 'SMD_STORE', 'SNR_STORE') \r\n"
				+ "and product_facility.product_id=inventory_item.product_id and product_facility.facility_id=inventory_item.facility_id \r\n"
				+ "and inventory_item.quantity_on_hand_total>=0 group by product_facility.maximum_stock, product_facility.reorder_quantity, \r\n"
				+ "product_facility.product_id having sum(inventory_item.quantity_on_hand_total)>product_facility.maximum_stock) c");
	}
	
	@GetMapping(value = "/s&p/stocks-in-sufficient-level")
	public List<Map<String,Object>> getStocksInSufficientLevelCountValue()  {
		
		return jdbcTemplate.queryForList("select count(*) from (\r\n"
				+ "select product_facility.product_id, product_facility.maximum_stock, product_facility.reorder_quantity,\r\n"
				+ "sum(inventory_item.quantity_on_hand_total) from product_facility product_facility,inventory_item inventory_item \r\n"
				+ "where product_facility.facility_id in ('CD_STORE', 'PRODUCT_STORE', 'PUR_STORE', 'SMD_STORE', 'SNR_STORE') and \r\n"
				+ "product_facility.product_id=inventory_item.product_id and product_facility.facility_id=inventory_item.facility_id and \r\n"
				+ "inventory_item.quantity_on_hand_total>=0 group by product_facility.maximum_stock, product_facility.reorder_quantity,\r\n"
				+ "product_facility.product_id having sum(inventory_item.quantity_on_hand_total)< product_facility.maximum_stock and \r\n"
				+ "sum(inventory_item.quantity_on_hand_total)>=product_facility.reorder_quantity) c	");
	}
	
	@GetMapping(value = "/s&p/indent-details/{fromDate}/{toDate}")
	public List<Map<String,Object>> getNoOfIndentDetails(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate ) {
		
		String query = "select To_CHAR(cr.cust_request_date,'dd Mon yyyy') as date, count(cri.cust_request_id) as count \r\n"
				+ "from Cust_request cr, cust_request_item cri where cr.cust_request_type_id in \r\n"
				+ "('INTERNAL_INDENT','INTUNIT_INDENT','PRODUCT_REQUIREMENT','IUT_TRANSFER') \r\n"
				+ "and cr.org_id in ('GM_OFFICE','CENTRAL_D','III_DAIRY') and cr.cust_request_date \r\n"
				+ "Between '"+fromDate+"' AND '"+toDate+"' and cr.cust_request_id=cri.cust_request_id \r\n"
				+ "group by cr.cust_request_date";
		//System.out.println("Query:"+query);
		
		List<Map<String, Object>> result = jdbcTemplate.queryForList(query); 
		//System.out.println("---getNoOfIndentDetails---:"+result);
			 
		return result;
	}
	
	@GetMapping(value = "/s&p/issuance/{fromDate}/{toDate}")
	public List<Map<String,Object>> getNoOfIssuance(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate ) {
		
		String query = "select To_CHAR(cust_request_date,'dd Mon yyyy') as date, count(cust_request_id) as count from(\r\n"
				+ "select cri.cust_request_id, cust_request_date from Cust_request cr, cust_request_item cri, item_issuance it \r\n"
				+ "where cust_request_type_id in ('INTERNAL_INDENT','INTUNIT_INDENT','PRODUCT_REQUIREMENT','IUT_TRANSFER') \r\n"
				+ "and org_id in ('GM_OFFICE','CENTRAL_D','III_DAIRY') AND cust_request_date Between '"+fromDate+"' AND '"+toDate+"' \r\n"
				+ "and cr.cust_request_id=cri.cust_request_id and it.cust_Request_id=cr.cust_request_id and \r\n"
				+ "it.cust_request_item_seq_id=cri.cust_request_item_seq_id group by cri.cust_request_id,cri.cust_request_item_seq_id,\r\n"
				+ "it.product_id, cust_request_date) c group by date order by date";
		//System.out.println("Query:"+query);
		
		List<Map<String, Object>> result = jdbcTemplate.queryForList(query); 
		//System.out.println("---getNoOfIndentDetails---:"+result);
			 
		return result;
	}
	
	@GetMapping(value = "/s&p/product-comparison/{fromDate}/{toDate}")
	public List<Map<String,Object>> getProductComparison(@PathVariable("fromDate") String fromDate, @PathVariable("toDate") String toDate ) {
		
		String query = "select TO_CHAR(datetime_received, 'dd/mm/yyyy') as date_received ,sum(quantity_accepted) \r\n"
				+ "from shipment_receipt WHERE status_id in ('SR_ACCEPTED', 'SR_RECEIVED') and facility_id='PUR_STORE'and\r\n"
				+ "datetime_received between '2023-12-01 00:00:00.000' and '2023-12-31 23:59:59.000' or  \r\n"
				+ "datetime_received between '2022-12-01 00:00:00.000' and '2022-12-31 23:59:59.000'and product_id='1241001'\r\n"
				+ "group by date_received";
		//System.out.println("Query:"+query);
		
		List<Map<String, Object>> result = jdbcTemplate.queryForList(query); 
		//System.out.println("---getNoOfIndentDetails---:"+result);
			 
		return result;
	}
}
