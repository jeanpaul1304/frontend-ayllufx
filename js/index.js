
function cargarTablaMarcacionesAyer(){
	var local=$("#local").val();
	var currentdate = new Date(); 
	var fecha =
				 ("0" + (currentdate.getDate()-1) ).slice(-2) + "-"   
				 + ("0" + (currentdate.getMonth()+1) ).slice(-2) 
				+ "-"  + (currentdate.getFullYear()); 
	if (local==undefined)
		local="";
	 $.ajax({
		type: "POST",
		async:false, 
		datatype: 'json',
		contentType: "application/json; charset=utf -8",
		url: "http://192.168.65.25:8080/Ayllufx_rest/"+local+"&fecha="+fecha, 
		success: function(data) {
			$("#tablaProfes").html(data);
				
			},
	  	error: function (error) {
	  				  alert("Ocurrio un error, marcar manualmente");
	                  return -2;
	              }
		});
}