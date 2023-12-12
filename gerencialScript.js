const registrationFields = [["Device Id", "device_id", "cafeteira001"], 
                            ["Entity Name", "entity_name", "Cafeteira:001"], 
                            ["Entity Type", "entity_type", "Thing or Sensor"], 
                            ["Comandos", "commands", "cafelongo, cafecurto, cafestandby"]];
const deviceList = ["Cafeteira", "Cortina", "Robo Aspirador", "Maquina de Lavar", "Sensor de pressão", "Sensor de presença"]

function getDeviceRegistrationData(device, id) {
    if (device == "Cafeteira") {
        return '{ \
            "devices": [ \
              { \
                "device_id": "cafeteira' + id + '", \
                "entity_name": "urn:ngsi-ld:Cafeteira:' + id + '", \
                "entity_type": "Cafeteira", \
                "protocol": "PDI-IoTA-UltraLight", \
                "transport": "HTTP", \
                "endpoint": "http://iot-sensors:3001/iot/cafeteira' + id + '", \
                "commands": [ \
                  {"name": "cafelongo","type": "command"}, \
                  {"name": "cafecurto","type": "command"}, \
                  {"name": "cafestandby","type": "command"} \
                 ], \
                 "attributes": [ \
                  {"object_id": "s", "name": "state", "type":"Text"} \
                 ], \
                 "static_attributes": [ \
                   {"name": "refCasa", "type": "Relationship","value": "urn:ngsi-ld:Casa:001"} \
                 ] \
              } \
            ] \
          }'
    } else if (device == "Cortina") {
        return '{ \
            "devices": [ \
              { \
                "device_id": "cortina' + id + '", \
                "entity_name": "urn:ngsi-ld:Cortina:' + id + '", \
                "entity_type": "Cortina", \
                "protocol": "PDI-IoTA-UltraLight", \
                "transport": "HTTP", \
                "endpoint": "http://iot-sensors:3001/iot/cortina' + id + '", \
                "commands": [ \
                  {"name": "cortinaabrir","type": "command"}, \
                  {"name": "cortinafechar","type": "command"}, \
                  {"name": "cortinastandby","type": "command"} \
                 ], \
                 "attributes": [ \
                  {"object_id": "s", "name": "state", "type":"Text"} \
                 ], \
                 "static_attributes": [ \
                   {"name": "refCasa", "type": "Relationship","value": "urn:ngsi-ld:Casa:001"} \
                 ] \
              } \
            ] \
          }'
    } else if (device == "Robo Aspirador") {
        return '{ \
            "devices": [ \
              { \
                "device_id": "roboaspirador' + id + '", \
                "entity_name": "urn:ngsi-ld:Roboaspirador:' + id + '", \
                "entity_type": "Roboaspirador", \
                "protocol": "PDI-IoTA-UltraLight", \
                "transport": "HTTP", \
                "endpoint": "http://iot-sensors:3001/iot/roboaspirador' + id + '", \
                "commands": [ \
                  {"name": "roborapida","type": "command"}, \
                  {"name": "robodetalhada","type": "command"}, \
                  {"name": "robostandby","type": "command"} \
                 ], \
                 "attributes": [ \
                  {"object_id": "s", "name": "state", "type":"Text"} \
                 ], \
                 "static_attributes": [ \
                   {"name": "refCasa", "type": "Relationship","value": "urn:ngsi-ld:Casa:001"} \
                 ] \
              } \
            ] \
          }'
    } else if (device == "Maquina de Lavar") {
        return '{ \
            "devices": [ \
              { \
                "device_id": "maqdelavar' + id + '", \
                "entity_name": "urn:ngsi-ld:Maqdelavar:' + id + '", \
                "entity_type": "Maqdelavar", \
                "protocol": "PDI-IoTA-UltraLight", \
                "transport": "HTTP", \
                "endpoint": "http://iot-sensors:3001/iot/maqdelavar' + id + '", \
                "commands": [ \
                  {"name": "maqlavcurto","type": "command"}, \
                  {"name": "maqlavlongo","type": "command"}, \
                  {"name": "maqlavstandby","type": "command"} \
                 ], \
                 "attributes": [ \
                  {"object_id": "s", "name": "state", "type":"Text"} \
                 ], \
                 "static_attributes": [ \
                   {"name": "refCasa", "type": "Relationship","value": "urn:ngsi-ld:Casa:001"} \
                 ] \
              } \
            ] \
          }'
    } else if (device == "Sensor de pressão") {
        return '{ \
            "devices": [ \
            { \
                "device_id": "Sensorpressao' + id + '", \
                "entity_name": "urn:ngsi-ld:Sensorpressao:' + id + '", \
                "entity_type": "Sensorpressao", \
                "protocol": "PDI-IoTA-UltraLight", \
                "transport": "HTTP", \
                "endpoint": "http://iot-sensors:3001/iot/sensorpressao' + id + '", \
                "attributes": [ \
                {"object_id": "s", "name": "state", "type":"Text"} \
                ], \
                "static_attributes": [ \
                {"name": "refCasa", "type": "Relationship","value": "urn:ngsi-ld:Casa:001"} \
                ] \
            } \
            ] \
        }'
    } else if (device == "Sensor de presença") {
        return '{ \
            "devices": [ \
            { \
                "device_id": "sensorpresenca' + id + '", \
                "entity_name": "urn:ngsi-ld:Sensorpresenca:' + id + '", \
                "entity_type": "Sensorpresenca", \
                "protocol": "PDI-IoTA-UltraLight", \
                "transport": "HTTP", \
                "endpoint": "http://iot-sensors:3001/iot/sensorpresenca' + id + '", \
                "attributes": [ \
                {"object_id": "s", "name": "state", "type":"Text"} \
                ], \
                "static_attributes": [ \
                {"name": "refCasa", "type": "Relationship","value": "urn:ngsi-ld:Casa:001"} \
                ] \
            } \
            ] \
        }'
    } else { return ''}
}

function updateDeviceList() {

    // curl -G -X GET \
    // 'http://iot.intelirede.com.br:1026/v2/entities' \
    // -H 'fiware-service: openiot' \
    // -H 'fiware-servicepath: /'

    return $.ajax({
        url: 'http://iot.intelirede.com.br:4041/iot/devices',
        headers: {
            'fiware-service': 'openiot',
            'fiware-servicepath': '/'
        },
        type: "GET",
        dataType: "json",
        async: false,
        data: {
        },
        success: function (result) {
            return result;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
            return {};
         }
    });

};


// ---------------------- CREATE ALL ACTION FUNCTIONS ----------------------------------------------------------
function deleteDevice(id) { // TODO: CHAMAR CURL E DELETAR OBJETO
    console.log("excluindo " + id);
    initListOfTasks();
    return;
}

function createDevice(device, id) {

    // curl -iX POST \
    // 'http://iot.intelirede.com.br:4041/iot/devices' \
    // -H 'Content-Type: application/json' \
    // -H 'fiware-service: openiot' \
    // -H 'fiware-servicepath: /' \
    // -d '{
    // "devices": [
    //     {
    //     "device_id": "cafeteira001",
    //     "entity_name": "urn:ngsi-ld:Cafeteira:001",
    //     "entity_type": "Cafeteira",
    //     "protocol": "PDI-IoTA-UltraLight",
    //     "transport": "HTTP",
    //     "endpoint": "http://iot-sensors:3001/iot/cafeteira001",
    //     "commands": [
    //         {"name": "cafelongo","type": "command"},
    //         {"name": "cafecurto","type": "command"},
    //         {"name": "cafestandby","type": "command"}
    //     ],
    //     "attributes": [
    //         {"object_id": "s", "name": "state", "type":"Text"}
    //     ],
    //     "static_attributes": [
    //         {"name": "refCasa", "type": "Relationship","value": "urn:ngsi-ld:Casa:001"}
    //     ]
    //     }
    // ]
    // }'

    let vData = getDeviceRegistrationData(device, id);

    $.ajax({
        url: 'http://iot.intelirede.com.br:4041/iot/devices',
        headers: {
            'Content-Type': 'application/json',
            'fiware-service': 'openiot',
            'fiware-servicepath': '/'
        },
        type: "POST",
        dataType: "json",
        async: false,
        data: vData,
        success: function (result) {
            console.log(result);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
         }
    });

    initListOfTasks();
    return;
}

function deleteDeviceButton(id, name) {
    var deleteActionModal = new bootstrap.Modal(document.getElementById("actionModal"), {});
    document.getElementById("modalTitle").innerHTML = "Confirmação";
    document.getElementById("modalBody").innerHTML = "<p>Deseja realmente excluir o dispositivo "+ name + "?</p>";

    document.getElementById("modalButtonHolder").innerHTML = "";
    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Excluir";
    deleteButton.className = 'btn btn-danger';
    deleteButton.onclick = function(){
        deleteActionModal.hide();
        deleteDevice(id);
    };
    document.getElementById("modalButtonHolder").appendChild(deleteButton);
    let cancelButton = document.createElement('button');
    cancelButton.innerText = "Cancelar";
    cancelButton.className = 'btn btn-success';
    cancelButton.onclick = function(){
        deleteActionModal.hide();
    };
    document.getElementById("modalButtonHolder").appendChild(cancelButton);
    deleteActionModal.show();
}

function createDeviceButton() {
    var createActionModal = new bootstrap.Modal(document.getElementById("actionModal"), {});
    document.getElementById("modalTitle").innerHTML = "Cadastrar novo dispositivo";

    document.getElementById("modalBody").innerHTML = "";
    let body  = document.createElement('div');
    let dropdownMenu = document.createElement('select')
    dropdownMenu.className = "custom-select";
    dropdownMenu.id = "dropdownMenu";
    var innerHTML = "";
    deviceList.forEach((entry) => {innerHTML = innerHTML + '<option selected>' + entry + '</option>'});
    dropdownMenu.innerHTML = innerHTML;
    body.appendChild(dropdownMenu);
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.style = "margin-left: 10px";
    input.placeholder = "Código (ex.: 001)";
    body.appendChild(input);
    document.getElementById("modalBody").appendChild(body);

    document.getElementById("modalButtonHolder").innerHTML = "";
    let createButton = document.createElement('button');
    createButton.innerText = "Cadastrar";
    createButton.className = 'btn btn-success';
    createButton.onclick = function(){
        createActionModal.hide();
        createDevice(dropdownMenu.value, input.value);
    };
    document.getElementById("modalButtonHolder").appendChild(createButton);
    let cancelButton = document.createElement('button');
    cancelButton.innerText = "Cancelar";
    cancelButton.className = 'btn btn-secondary';
    cancelButton.onclick = function(){
        createActionModal.hide();
    };
    document.getElementById("modalButtonHolder").appendChild(cancelButton);
    createActionModal.show();
}





  
//  ---------------------- CREATE ALL CARDS ---------------------------------------------------------------------
let cardContainer;
let createDeviceCard = (device) => {
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';
    let insideContainer = document.createElement('container');
    insideContainer.className = 'card-body';
    insideContainer.style = "display: flex";
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body col';
    cardBody.style = "width: 80%";

    var commandList = [];
    if(device.commands.length != 0) {
        Object.entries(device.commands).forEach((entry) => {
            commandList.push(entry[1].name);
        });
    }

    const deviceIdText = String(device.device_id);
    const deviceEntityNameText = String(device.entity_name);
    const deviceTypeText = String(device.entity_type);

    
    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Excluir";
    deleteButton.className = 'btn btn-danger';
    deleteButton.style = 'margin-top: 40px; margin-bottom: 40px';
    deleteButton.onclick = function(){
        deleteDeviceButton(deviceEntityNameText, deviceIdText);
    };

    let deviceId = document.createElement('h5'); 
    deviceId.innerText = "Nome: " + deviceIdText;
    deviceId.className = 'card-title';
    cardBody.appendChild(deviceId);

    let deviceType = document.createElement('h6');
    deviceType.innerText = "Tipo: " + deviceTypeText;
    cardBody.appendChild(deviceType);

    let deviceCommands = document.createElement('h6');
    if (commandList.length != 0) {
        deviceCommands.innerText = "Comandos: " + commandList.join(", ");
    }else{
        deviceCommands.innerText = "Comandos: N/A";
    }
    cardBody.appendChild(deviceCommands);
    
    insideContainer.appendChild(cardBody);
    insideContainer.appendChild(deleteButton);
    card.appendChild(insideContainer);
    cardContainer.appendChild(card);
}

let initListOfTasks = () => {
    var resp = updateDeviceList();
    if (cardContainer) {
        cardContainer.innerHTML = '';
    }
    cardContainer = document.getElementById('card-container');

    let insertButton = document.createElement('button');
    insertButton.innerText = "Criar novo dispositivo";
    insertButton.className = 'btn btn-success align-items-center';
    insertButton.style = 'margin-bottom: 10px';
    insertButton.onclick = function(){
        createDeviceButton();
    };
    cardContainer.appendChild(insertButton);

    resp.responseJSON.devices.forEach((entry) => {
        createDeviceCard(entry);
    });
    console.log("Atualizando tela");
};

initListOfTasks();
