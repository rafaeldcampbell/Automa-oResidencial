 
 function doFunction(text){
    $.ajax({
        url: 'http://iot.intelirede.com.br:4041/iot/devices/cafeteira001',
        headers: {
            'fiware-service': 'openiot',
            'fiware-servicepath': '/'
        },
        type: "GET",
        dataType: "json",
        data: {
        },
        success: function (result) {
            console.log(result);
        },
        error: function () {
            console.log("error");
        }
    });
}


/* curl -X GET \
  'http://iot.intelirede.com.br:4041/iot/devices/cafeteira001' \
  -H 'fiware-service: openiot' \
  -H 'fiware-servicepath: /' */