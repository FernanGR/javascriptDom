$(function() {

  var izk = $("<button id=izk> izquierda </button>");
  izk.insertBefore("#cabeceraFactura");
  //  $("#cabeceraFactura").append(izk);
  var der = $("<button id=der> derecha </button>");
  der.insertBefore("#cabeceraFactura");
  //$("#cabeceraFactura").append(der);
  var pagina = 0;

  function cargarAjax() { //esto pide todo a jqwery
    $.ajax({
      url: "datos1.json",
      success: function(result) {
        localStorage.setItem("datosJquery", JSON.stringify(result)); //guarda la info solicitada en localStorage
      }
    });
  };

  cargarAjax();

  var datosjson = JSON.parse(localStorage.getItem("datosJquery"));
  //  console.log(datosjson);

  //  console.log(datosjson.listaFacturas[0]);
  //console.log(datosjson.listaFacturas[0].lineaProductos[0]);


  var numfactura = $("#txtnumfactura");
  var nombre = $("#txtnombre");
  var dni = $("#txtdni");
  var fecha = $("#txtFecha");

  numfactura.val(datosjson.listaFacturas[0].numero);
  nombre.val(datosjson.listaFacturas[0].nombre);
  dni.val(datosjson.listaFacturas[0].dni);
  fecha.val(datosjson.listaFacturas[0].fecha);


  var tabla = $("#detalle");

  for (let i = 0; i < datosjson.listaFacturas[0].lineaProductos.length; i++) {
    let tr = $("<tr>" +
      "<td>" + datosjson.listaFacturas[0].lineaProductos[i].codigo + "</td>" +
      "<td>" + datosjson.listaFacturas[0].lineaProductos[i].descripcion + "</td>" +
      "<td><input class= cant value = " + datosjson.listaFacturas[0].lineaProductos[i].cantidad + "></input></td>" +
      "<td><input  class = valor value= " + datosjson.listaFacturas[0].lineaProductos[i].valorUnitario + "></input></td>" +
      "<td class = total >" + parseInt(datosjson.listaFacturas[0].lineaProductos[i].cantidad) * parseInt(datosjson.listaFacturas[0].lineaProductos[i].valorUnitario) +
      "</td></tr>"


    ); // fin tr
    tabla.append(tr)




  } // fin for

  // cantidad chage
  for (let i = 0; i < $(".cant").length; i++) {
    $(".cant").change(function() {
      let val = parseInt($(this).parent().parent().children().eq(3).children().val());

      let pre = parseInt($(this).val());
      // console.log(pre);
      $(this).parent().parent().children().eq(4).text(val * pre);

      /// datos totales finales
      tot = 0;
      for (let i = 0; i < $(".total").length; i++) {
        tot += parseInt($(".total").eq(i).text());
      }
      $("#txtSubTotal").val(tot);
      $("#txtIva").val(tot * 0.21);
      $("#txtTotal").val(tot * 1.21);
      ///
    })

  } // fin for cantidad

  // valor
  for (let i = 0; i < $(".valor").length; i++) {
    $(".valor").change(function() {
      let pre = parseInt($(this).parent().parent().children().eq(2).children().val());
      let val = parseInt($(this).val());
      // console.log(pre);
      $(this).parent().parent().children().eq(4).text(val * pre);
      /// datos totales finales
      tot = 0;
      for (let i = 0; i < $(".total").length; i++) {
         tot += parseInt($(".total").eq(i).text());
      }

      $("#txtSubTotal").val(tot);
      $("#txtIva").val(tot * 0.21);
      $("#txtTotal").val(tot * 1.21);
      ///

    })

  } // fin for

  /// datos totales finales
  var tot = 0;
  for (let i = 0; i < $(".total").length; i++) {
    tot += parseInt($(".total").eq(i).text());
  }
  $("#txtSubTotal").val(tot);
  $("#txtIva").val(tot * 0.21);
  $("#txtTotal").val(tot * 1.21);
  ///



  /// derecha  boton

  $("#der").click(function() {
    if (pagina < 2) { // maximo 3 paginas
      pagina++;

      numfactura.val(datosjson.listaFacturas[pagina].numero);
      nombre.val(datosjson.listaFacturas[pagina].nombre);
      dni.val(datosjson.listaFacturas[pagina].dni);
      fecha.val(datosjson.listaFacturas[pagina].fecha);


      tabla = $("#detalle");
      tabla.children().eq(1).empty();
      for (let i = 0; i < datosjson.listaFacturas[pagina].lineaProductos.length; i++) {
        let tr = $("<tr>" +
          "<td>" + datosjson.listaFacturas[pagina].lineaProductos[i].codigo + "</td>" +
          "<td>" + datosjson.listaFacturas[pagina].lineaProductos[i].descripcion + "</td>" +
          "<td><input class= cant value = " + datosjson.listaFacturas[pagina].lineaProductos[i].cantidad + "></input></td>" +
          "<td><input  class = valor value= " + datosjson.listaFacturas[pagina].lineaProductos[i].valorUnitario + "></input></td>" +
          "<td class = total >" + parseInt(datosjson.listaFacturas[pagina].lineaProductos[i].cantidad) * parseInt(datosjson.listaFacturas[pagina].lineaProductos[i].valorUnitario) +
          "</td></tr>"


        ); // fin tr
        tabla.append(tr)




      } // fin for

      // cantidad chage
      for (let i = 0; i < $(".cant").length; i++) {
        $(".cant").change(function() {
          let val = parseInt($(this).parent().parent().children().eq(3).children().val());
           let pre = parseInt($(this).val());
          // console.log(pre);
          $(this).parent().parent().children().eq(4).text(val * pre);

          /// datos totales finales
          tot = 0;
          for (let i = 0; i < $(".total").length; i++) {
            tot += parseInt($(".total").eq(i).text());
          }
          $("#txtSubTotal").val(tot);
          $("#txtIva").val(tot * 0.21);
          $("#txtTotal").val(tot * 1.21);
          ///
        })

      } // fin for cantidad

      // valor
      for (let i = 0; i < $(".valor").length; i++) {
        $(".valor").change(function() {
          let pre = parseInt($(this).parent().parent().children().eq(2).children().val());
          let val = parseInt($(this).val());
          // console.log(pre);
          $(this).parent().parent().children().eq(4).text(val * pre);
          /// datos totales finales
          tot = 0;
          for (let i = 0; i < $(".total").length; i++) {
             tot += parseInt($(".total").eq(i).text());
          }

          $("#txtSubTotal").val(tot);
          $("#txtIva").val(tot * 0.21);
          $("#txtTotal").val(tot * 1.21);
          ///

        })

      } // fin for

      /// datos totales finales
      var tot = 0;
      for (let i = 0; i < $(".total").length; i++) {
        tot += parseInt($(".total").eq(i).text());
      }
      $("#txtSubTotal").val(tot);
      $("#txtIva").val(tot * 0.21);
      $("#txtTotal").val(tot * 1.21);
      ///


    } // fin if


  }) // fin click der



  // izkierda boton

  $("#izk").click(function() {
    if (pagina > 0) {
      pagina--;

      numfactura.val(datosjson.listaFacturas[pagina].numero);
      nombre.val(datosjson.listaFacturas[pagina].nombre);
      dni.val(datosjson.listaFacturas[pagina].dni);
      fecha.val(datosjson.listaFacturas[pagina].fecha);


      tabla = $("#detalle");
      tabla.children().eq(1).empty();

      for (let i = 0; i < datosjson.listaFacturas[pagina].lineaProductos.length; i++) {
        let tr = $("<tr>" +
          "<td>" + datosjson.listaFacturas[pagina].lineaProductos[i].codigo + "</td>" +
          "<td>" + datosjson.listaFacturas[pagina].lineaProductos[i].descripcion + "</td>" +
          "<td><input class= cant value = " + datosjson.listaFacturas[pagina].lineaProductos[i].cantidad + "></input></td>" +
          "<td><input  class = valor value= " + datosjson.listaFacturas[pagina].lineaProductos[i].valorUnitario + "></input></td>" +
          "<td class = total >" + parseInt(datosjson.listaFacturas[pagina].lineaProductos[i].cantidad) * parseInt(datosjson.listaFacturas[pagina].lineaProductos[i].valorUnitario) +
          "</td></tr>"


        ); // fin tr
        tabla.append(tr)




      } // fin for

      // cantidad chage
      for (let i = 0; i < $(".cant").length; i++) {
        $(".cant").change(function() {
          let val = parseInt($(this).parent().parent().children().eq(3).children().val());
          console.log(val);
          let pre = parseInt($(this).val());
          // console.log(pre);
          $(this).parent().parent().children().eq(4).text(val * pre);

          /// datos totales finales
          tot = 0;
          for (let i = 0; i < $(".total").length; i++) {
            tot += parseInt($(".total").eq(i).text());
          }
          $("#txtSubTotal").val(tot);
          $("#txtIva").val(tot * 0.21);
          $("#txtTotal").val(tot * 1.21);
          ///
        })

      } // fin for cantidad

      // valor
      for (let i = 0; i < $(".valor").length; i++) {
        $(".valor").change(function() {
          let pre = parseInt($(this).parent().parent().children().eq(2).children().val());
          let val = parseInt($(this).val());
          // console.log(pre);
          $(this).parent().parent().children().eq(4).text(val * pre);
          /// datos totales finales
          tot = 0;
          for (let i = 0; i < $(".total").length; i++) {
            console.log($(".total").eq(i).text());
            tot += parseInt($(".total").eq(i).text());
          }

          $("#txtSubTotal").val(tot);
          $("#txtIva").val(tot * 0.21);
          $("#txtTotal").val(tot * 1.21);
          ///

        })

      } // fin for

      /// datos totales finales
      var tot = 0;
      for (let i = 0; i < $(".total").length; i++) {
        tot += parseInt($(".total").eq(i).text());
      }
      $("#txtSubTotal").val(tot);
      $("#txtIva").val(tot * 0.21);
      $("#txtTotal").val(tot * 1.21);
      ///


    } // fin if

  }) // fin click izk



  /////////////////////CORONOA VIRUSS ////////////////



  //    https://raw.githubusercontent.com/globalcitizen/2019-wuhan-coronavirus-data/master/greater-china-region-names.csv


  function cargarAjax2() { //esto pide todo a jqwery
    $.ajax({
      url: "https://raw.githubusercontent.com/globalcitizen/2019-wuhan-coronavirus-data/master/greater-china-region-names.csv",
      success: function(result) {
        localStorage.setItem("corona", (result)); //guarda la info solicitada en localStorage
      }
    });
  };

  cargarAjax2();

  var corona = (localStorage.getItem("corona"));


  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  //$("footer").children().eq(1).text(corona[3]);
     var cfinal = corona.split("\n");

    console.log(cfinal);
    $("footer").children().eq(1).text(cfinal[3]);

    setInterval(function() {
    valor = getRandomArbitrary(0, cfinal.length-1);
   //  console.log(Math.round(valor));
    valor = Math.round(valor);
    console.log(cfinal[valor]);

      $("footer").children().eq(1).text(cfinal[valor]);

      //  $("footer").children().eq(1).empty();

  }, 5000);







}); // fin js
