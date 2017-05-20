
function crearSolicitud(){
	var user = $("#user").val();
	var exchangeRate=$("#exchangeRate").val();
	var clientAccount=$("#clientAccount").val();
	var bankClientAccount=$("#bankClientAccount").val();
	var amount=$("#amount").val();
	var toCurrencyValue=""
	var toCurrencyRadio = $("#toCurrency input[type='radio']:checked");
	if(toCurrencyRadio.length>0)
		toCurrencyValue=toCurrencyRadio.val();
	var bankAylluAccount=$("#bankAylluAccount").val();
	var operationNumber=$("#operationNumber").val();
	
	var mail=$("#mail").val();
	var data="?idCliente="+user+
	"&tipoCambio="+exchangeRate+
	"&cuentaBancoDestino="+clientAccount+
	"&bancoDestino="+bankClientAccount+
	"&montoEntregado="+amount+
	"&bancoOperacion="+bankAylluAccount+
	"&numeroOperacion="+operationNumber+
	"&monedaOrigen="+toCurrencyValue+
	"&monedaDestino="+(toCurrencyValue=="PEN"?"PEN":"USD")+
	"&mail="+mail;

	var data1 ={
		idCliente:user,
 tipoCambio:exchangeRate,
 cuentaBancoDestino:clientAccount,
 bancoDestino:bankClientAccount,
 montoEntregado:amount,
 bancoOperacion:bankAylluAccount,
 numeroOperacion:operationNumber,
 monedaOrigen:toCurrencyValue,
 monedaDestino:(toCurrencyValue=="PEN"?"PEN":"USD"),
 mail:mail

	}; 

	/*
	"{statusCode:0,
entity: ""Solicitud Registrada, se atenderá en 2 días máximo""
}"*/

	 $.ajax({
		type: "POST",
		//datatype: 'json',
		//contentType: false,
		url: "http://192.168.65.25:8080/Ayllufx_rest/restDummy/solicitud/registro?"+data, 
		
		success: function(data) {
				
				if(data.errorCode==0)
					$("#msgUser").html(data.entity);
			},
	  	error: function (error) {
	  				  alert("Ocurrio un error");
	                  
	              }
		});
}


