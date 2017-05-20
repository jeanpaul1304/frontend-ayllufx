var urlServicios="http://192.168.65.25:8080";

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
  var idUser = $("#idUser").val();
  
	var exchangeRate=$("#exchangeRate").val();
	var clientAccount=$("#clientAccount").val();
	var bankClientAccount=$("#bankClientAccount").val();
	var amount=$("#myMoney").val();
	var toCurrencyValue=""
	var toCurrencyRadio = $(".js-btn-radios.active");
	if(toCurrencyRadio.length>0)
		toCurrencyValue=toCurrencyRadio.attr("data-value");
  var bankToPay=$("#bankToPay").val();
	var operationNumber=$("#operationNumber").val();

	var mail=$("#mail").val();
	var data="?idCliente="+idUser+
  "&nombreCliente="+user+
	"&tipoCambio="+exchangeRate+
	"&cuentaBancoDestino="+
	"&bancoDestino="+
	"&montoEntregado="+amount+
	"&bancoOperacion="+bankToPay+
	"&numeroOperacion="+operationNumber+
	"&monedaOrigen="+toCurrencyValue+
	"&monedaDestino="+(toCurrencyValue=="soles"?"dolar":"soles")+
	"&mail="+mail;

	var data1 ={
		idCliente:user,
        tipoCambio:exchangeRate,
        cuentaBancoDestino:clientAccount,
        bancoDestino:bankClientAccount,
        montoEntregado:amount,
        bancoOperacion:bankToPay,
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
    async: false,
		//datatype: 'json',
		//contentType: false,
		url: urlServicios+"/Ayllufx_rest/restDummy/solicitud/registro"+data, 
		
		success: function(data) {
				
				if(data.errorCode==0)
					$("#idSolicitud").val(data.entity);
					

        $("#paso1").hide();
        $("#paso2").show();
			},
	  	error: function (error) {
	  				//  alert("Ocurrio un error");
	                  
	              }
            }
      );

    }

    function actualizarSolicitud(){
	var idSolicitud = $("#idSolicitud").val();
    var user = $("#user").val();
	var exchangeRate=$("#exchangeRate").val();
	var clientAccount=$("#clientAccount").val();
	var bankClientAccount=$("#bankClientAccount").val();
	var myMoney=$("#myMoney").val();
	var toCurrencyValue=""
	var toCurrencyRadio = $(".js-btn-radios.active");
	if(toCurrencyRadio.length>0)
		toCurrencyValue=toCurrencyRadio.attr("data-value");
	var bankToPay=$("#bankToPay").val();
	var operationNumber=$("#operationNumber").val();
	
	var mail=$("#mail").val();
	var data="?idSolicitud="+idSolicitud+
	"idCliente="+user+
	"&tipoCambio="+exchangeRate+
	"&cuentaBancoDestino="+clientAccount+
	"&bancoDestino="+bankClientAccount+
	"&montoEntregado="+myMoney+
	"&bancoOperacion="+bankToPay+
  "&estadoSolicitud="+"En Proceso"+
	"&numeroOperacion="+operationNumber+
	"&monedaOrigen="+toCurrencyValue+
	"&monedaDestino="+(toCurrencyValue=="soles"?"dolar":"soles")+
	"&mail="+mail;

/*
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

	
	"{statusCode:0,
entity: ""Solicitud Registrada, se atenderá en 2 días máximo""
}"*/

	 $.ajax({
		type: "POST",
		//datatype: 'json',
		//contentType: false,
		url: urlServicios+"/Ayllufx_rest/restDummy/solicitud/actualizar"+data, 
		
		success: function(data) {
				
				if(data.errorCode==0)
					$("#msgUser").html(data.entity);
			},
	  	error: function (error) {
	  				 // alert("Ocurrio un error");
	                  
	              }
            });


    }

    /*
     <th>Fecha Hora</th>
        <th>Estado</th>
        <th>Cliente</th>
        <th>Cuenta Banco Ayllu</th>
        <th>Nro Operacion</th>
        <th>Monto Depositado</th>
        <th>Cuenta Banco Cliente</th>
        <th>Monto Solicitado</th>
        <th>Acciones</th>

         [ {
    "idSolicitud": 1,
    "idCliente": 1,
    "idTipoCambio": "3.25",
    "idCuentaBancoDestino": "1921982782782",
    "idCuentaRecibeAyllu": "xxxxx",
    "idCuentaEntregaAyllu": "yyyyyy",
    "numeroMontoEntregado": 1000,
    "numeroMontoComisionado": 5,
    "numeroMontoBruto": 9095,
    "estadoSolicitud": "Registrado",
    "email": "Registrado",
    "monedaOrigen": "soles",
    "monedaDestino": "dolar",
    "nombreCliente": "HANZ",
    "numeroOperacion": "123456",
    "bancoAyllu": "BCP",
    "bancoCliente": "BCP",
    "fechaUsuarioCrea": "2017-05-20"
  },]
    */

    function buildHtmlTable(myList,selector) {

  for (var i = 0; i < myList.length; i++) {
    var row$ = $('<tr/>');
      row$.append($('<td/>').html(myList[i].fechaUsuarioCrea));
      row$.append($('<td/>').html(myList[i].estadoSolicitud));
      row$.append($('<td/>').html(myList[i].nombreCliente));
      row$.append($('<td/>').html(myList[i].bancoAyllu+" "+myList[i].idCuentaRecibeAyllu));
      row$.append($('<td/>').html(myList[i].numeroOperacion));
      row$.append($('<td/>').html(myList[i].numeroMontoBruto));
        var acciones$ = $('<td/>');

      row$.append($('<td/>').html(myList[i].bancoCliente+" "+myList[i].idCuentaBancoDestino));
      if(myList[i].estadoSolicitud=="Registrado"){
      	
      	acciones$.append("<a onclick='aprobar("+myList[i].idSolicitud+");'>Aprobar</a> &nbsp/&nbsp");
      	acciones$.append("<a onclick='rechazar("+myList[i].idSolicitud+");'>Rechazar</a>")
      	
      }
      	else 
      	{
      		if(myList[i].estadoSolicitud=="En Proceso"){
				acciones$.append("<a onclick='aprobar("+myList[i].idSolicitud+");'>Confirmar</a> &nbsp/&nbsp");
      			acciones$.append("<a onclick='anular("+myList[i].idSolicitud+");'>Anular</a>")
      	
      		}
      		else
      		{
      			
      		}

      	}


      
/*
       <td><a onclick="aprobar(1);">Aprobar</a>&nbsp;/&nbsp;
        <a onclick="rechazar(1);">Rechazar</a>
    </td>
    */
      var montoSolicitado=0;
      if(myList[i].monedaOrigen=="soles" && myList[i].monedaDestino=="dolar")
      	montoSolicitado=Math.round((myList[i].numeroMontoEntregado/myList[i].idTipoCambio)*100)/100;
      else
      	montoSolicitado=Math.round((myList[i].numeroMontoEntregado*myList[i].idTipoCambio)*100)/100;

      row$.append($('<td/>').html(montoSolicitado));
      	row$.append(acciones$);
   
    $(selector).append(row$);
  }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(myList, selector) {
  var columnSet = [];
  var headerTr$ = $('<tr/>');

  for (var i = 0; i < myList.length; i++) {
    var rowHash = myList[i];
    for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
      }
    }
  }
  $(selector).append(headerTr$);

  return columnSet;
}
function consultarSolicitudesAdmin(){
	
	 $.ajax({
		type: "GET",
	    url: urlServicios+"/Ayllufx_rest/restDummy/consulta-solicitudes", 
		
		success: function(data) {
			
			buildHtmlTable(data,"#idTBody");
			/*	
				if(data.errorCode==0)
					$("#msgUser").html(data.entity);

				  {
                "idSolicitud": 1,
                "idCliente": 1,
                "idTipoCambio": "3.25",
                "idCuentaBancoDestino": "1921982782782",
                "idCuentaRecibeAyllu": "xxxxx",
                "idCuentaEntregaAyllu": "yyyyyy",
                "numeroMontoEntregado": 1000.0000,
                "numeroMontoComisionado": 5.0000,
                "numeroMontoBruto": 9095.0000,
                "estadoSolicitud": "01",
                "email": "01",
                "monedaOrigen": "soles",
                "monedaDestino": "dolar"
        		},*/
			},
	  	error: function (error) {
	  				  //alert("Ocurrio un error");
	                  
	              }
            });

    	
    }
    function consultarSolicitudClientes(idCliente){
    	
    }
function consultarSolicitudUnitaria(idSolicitud){
    	
    }
