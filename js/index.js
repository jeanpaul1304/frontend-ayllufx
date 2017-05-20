$(document).ready(function(){
   

console.log('is ready')
function checkboxChange(){
 $('.js-btn-radios').on('click',function(e){
     $this = $(this)
     $this.parent().find('.active').removeClass('active')
     $this.addClass('active')
 })
}
checkboxChange()

$('#bankClientAccount').selectpicker('refresh');
$('#bankAylluAccount').selectpicker('refresh');

function cargarTablaMarcacionesAyer(){
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
	
	var data ={
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
		datatype: 'jsonp',
		contentType: "application/json; charset=utf -8",
		url: "http://192.168.65.25:8080/Ayllufx_rest/", 
		data: data,
		success: function(data) {
				var rpta=JSON.parse(data);
				if(rpta.statusCode==0)
					$("#msgUser").html(rpta.entity);
			},
	  	error: function (error) {
	  				  alert("Ocurrio un error");
	                  return -2;
	              }
            });
    }


});