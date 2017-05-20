$(document).ready(function(){
   

checkboxChange();

$('#bankClientAccount').selectpicker('refresh');
$('#bankAylluAccount').selectpicker('refresh');
$('#bankToPay').selectpicker('refresh');

changeAllToPen()

function bindCalculator(){
    $('.js-btn-radios').on('click',function(){
        let $this = $(this)
        cleanAll()
        if($this.data('currency') == 'PEN'){
            changeAllToPen()
        }else{
            changeAlltoDollar()
        }
    })
    $('#bankToPay').on('change',function(){
        let $this = $(this)
        let valor = $this.find('option:selected').attr('data-value')
        $('.js-aylluaccount').text(valor)
        $('.js-aylluaccountCCI').text('234-'+valor+'23')
    })
}

function changeAllToPen(){
    $('.js-platformCurrecy').text('$')
    $('.js-myCurrency').text('S/')
    $('#myMoney').unbind('keyup')
    $('#myMoney').keyup(calculatePen)
}
function changeAlltoDollar(){
    $('.js-platformCurrecy').text('S/')
    $('.js-myCurrency').text('$')
    $('#myMoney').unbind('keyup')
    $('#myMoney').keyup(calculateDollar)
}

function calculatePen(){
    let tc = 3.25
    let amount = $('.js-myMoneyFirst').val()
    let newAmount = (amount/3.25).toFixed(3)
    let comision = (newAmount*0.01).toFixed(2)
    $('.js-finalChange').text(' $'+newAmount)
    $('.js-finalComision').text(' $'+comision)
    $('.js-finalCash').text(' $'+(newAmount-comision).toFixed(3))
    $('.js-myMoney').val(amount)
    $('.js-txt-changeAmount').val(newAmount-comision)
    $('.js-initialCash').text(' S/'+(amount))
}
function calculateDollar(){
    let tc = 3.25
    let amount = $('.js-myMoneyFirst').val()
    let newAmount = (amount*3.25).toFixed(3)
    let comision = (amount*0.01).toFixed(2)
    $('.js-finalChange').text(' S/'+newAmount)
    $('.js-finalComision').text(' S/'+comision)
    $('.js-finalCash').text(' S/'+(newAmount-comision).toFixed(3))
    $('.js-myMoney').val(amount)
    $('.js-txt-changeAmount').val(newAmount-comision)
    $('.js-initialCash').text(' $'+(amount))
}

function cleanAll(){
    $('input[type="text"]').val('')
}
bindCalculator()
});
function checkboxChange(){
 $('.js-btn-radios').on('click',function(e){
     let $this
     $this = $(this)
     $this.parent().find('.active').removeClass('active')
     $this.addClass('active')
 });
}

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
		url: "http://192.168.65.25:8080/Ayllufx_rest/restDummy/solicitud/registro"+data, 
		
		success: function(data) {
				
				if(data.errorCode==0)
					$("#msgUser").html(data.entity);
			},
	  	error: function (error) {
	  				  alert("Ocurrio un error");
	                  
	              }
            });
    }


