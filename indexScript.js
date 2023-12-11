var resp = {};
var requestLog = [];
const updateInterval = 10000;

function updateDeviceList() { //TODO: CHAMAR CURL E ATRIBUIR JSON DE RETORNO À VARIÁVEL
    updateRequestLog("Requisição", "CURL update device list");
    updateRequestLog("Retorno", "Device List");
    resp = {
        "count": 9,
        "devices": [
        {
            "device_id": "sensorpressao001",
            "service": "openiot",
            "service_path": "/",
            "entity_name": "urn:ngsi-ld:Sensorpressao:001",
            "entity_type": "Sensorpressao",
            "endpoint": "http://iot-sensors:3001/iot/sensorpressao001",
            "polling": false,
            "transport": "HTTP",
            "attributes": [
            {
                "object_id": "s",
                "name": "state",
                "type": "Text"
            }
            ],
            "lazy": [],
            "commands": [],
            "static_attributes": [
            {
                "name": "refCasa",
                "type": "Relationship",
                "value": "urn:ngsi-ld:Casa:001"
            }
            ],
            "protocol": "PDI-IoTA-UltraLight",
            "explicitAttrs": false
        },
        {
            "device_id": "cafeteira001",
            "service": "openiot",
            "service_path": "/",
            "entity_name": "urn:ngsi-ld:Cafeteira:001",
            "entity_type": "Cafeteira",
            "endpoint": "http://iot-sensors:3001/iot/cafeteira001",
            "polling": false,
            "transport": "HTTP",
            "attributes": [
            {
                "object_id": "s",
                "name": "state",
                "type": "Text"
            }
            ],
            "lazy": [],
            "commands": [
            {
                "object_id": "longo",
                "name": "longo",
                "type": "command"
            },
            {
                "object_id": "curto",
                "name": "curto",
                "type": "command"
            },
            {
                "object_id": "standby",
                "name": "standby",
                "type": "command"
            }
            ],
            "static_attributes": [
            {
                "name": "refStore",
                "type": "Relationship",
                "value": "urn:ngsi-ld:Store:001"
            }
            ],
            "protocol": "PDI-IoTA-UltraLight",
            "explicitAttrs": false
        },
        {
            "device_id": "sensorpressao002",
            "service": "openiot",
            "service_path": "/",
            "entity_name": "Thing:sensorpressao002",
            "entity_type": "Thing",
            "transport": "HTTP",
            "attributes": [],
            "lazy": [],
            "commands": [],
            "static_attributes": []
        },
        {
            "device_id": "sensorpressao003",
            "service": "openiot",
            "service_path": "/",
            "entity_name": "Thing:sensorpressao003",
            "entity_type": "Thing",
            "transport": "HTTP",
            "attributes": [],
            "lazy": [],
            "commands": [],
            "static_attributes": []
        },
        {
            "device_id": "sensorpressao004",
            "service": "openiot",
            "service_path": "/",
            "entity_name": "Thing:sensorpressao004",
            "entity_type": "Thing",
            "transport": "HTTP",
            "attributes": [],
            "lazy": [],
            "commands": [],
            "static_attributes": []
        },
        {
            "device_id": "sensorpresenca001",
            "service": "openiot",
            "service_path": "/",
            "entity_name": "Thing:sensorpresenca001",
            "entity_type": "Thing",
            "transport": "HTTP",
            "attributes": [],
            "lazy": [],
            "commands": [],
            "static_attributes": []
        },
        {
            "device_id": "sensorpresenca002",
            "service": "openiot",
            "service_path": "/",
            "entity_name": "Thing:sensorpresenca002",
            "entity_type": "Thing",
            "transport": "HTTP",
            "attributes": [],
            "lazy": [],
            "commands": [],
            "static_attributes": []
        },
        {
            "device_id": "sensorpresenca003",
            "service": "openiot",
            "service_path": "/",
            "entity_name": "Thing:sensorpresenca003",
            "entity_type": "Thing",
            "transport": "HTTP",
            "attributes": [],
            "lazy": [],
            "commands": [],
            "static_attributes": []
        },
        {
            "device_id": "sensorpresenca004",
            "service": "openiot",
            "service_path": "/",
            "entity_name": "Thing:sensorpresenca004",
            "entity_type": "Thing",
            "transport": "HTTP",
            "attributes": [],
            "lazy": [],
            "commands": [],
            "static_attributes": []
        }
        ]
    };
};


// --------------------- CREATE HUB FUNCTIONS ------------------------------------------------------------------
// --------------------- UPDATES THE SCREEN AND TEST IF SENSORS ARE SENDING STATUS -----------------------------

function main() {
    console.log("Atualizando tela");
    document.getElementById("lastUpdate").innerHTML = "Última atualização: " + new Date().toLocaleTimeString('pt-BR');
    initListOfTasks();
}





// ---------------------- CREATE ALL ACTION FUNCTIONS ----------------------------------------------------------
function updateRequestLog(type, text) {
    requestLog.push([type, text]);
    var requestLogHTML = "";
    requestLog.forEach((entry) => {
        requestLogHTML = requestLogHTML + "<p><b>" + entry[0] + "</b>: " + entry[1] + "</p>"
    });
    document.getElementById("requestLogText").innerHTML = requestLogHTML;
};

function triggerAction (id, command) {
    console.log("trigger em " + id + " para " + command); // TODO: CHAMAR CURL E DISPARAR AÇÃO
    updateRequestLog("Requisição", "CURL trigger action. Trigger em " + id + " para " + command);
    initListOfTasks();
};

function updateSensor (id, value) {
    console.log("update em " + id + " para " + value); // TODO: CHAMAR CURL E DISPARAR UPDATE
    updateRequestLog("Requisição", "CURL update sensor. Update em " + id + " para " + value);
    initListOfTasks();
};

function doButtonTrigger(id, name, commands) { // opens the modal to trigger an action
    var confirmingActionModal = new bootstrap.Modal(document.getElementById("actionModal"), {});
    document.getElementById("modalTitle").innerHTML = "Confirmação";
    document.getElementById("modalBody").innerHTML = "<p>Você deseja iniciar uma ação em "+ name + "?</p>";

    document.getElementById("modalButtonHolder").innerHTML = "";
    commands.filter(function(command) { return command != "standby"; }).forEach((entry) => {
        let button = document.createElement('button');
        button.innerText = entry;
        button.className = 'btn btn-secondary';
        button.onclick = function(){
            confirmingActionModal.hide();
            triggerAction(id, entry);
        };
        document.getElementById("modalButtonHolder").appendChild(button);
    });
    confirmingActionModal.show();
};

function doButtonEdit(id, name) { // opens the modal to update a sensor's data
    var editActionModal = new bootstrap.Modal(document.getElementById("actionModal"), {});
    document.getElementById("modalTitle").innerHTML = "Atualizar sensor";

    document.getElementById("modalBody").innerHTML = "";
    let body  = document.createElement('div');
    let bodyText = document.createElement('div');
    bodyText.innerHTML = "<p>Você deseja atualizar o sensor "+ name + "?</p>";
    body.appendChild(bodyText);
    var input = document.createElement("input");
    input.setAttribute('type', 'text');
    body.appendChild(input);
    document.getElementById("modalBody").appendChild(body);

    document.getElementById("modalButtonHolder").innerHTML = "";
    let button = document.createElement('button');
    button.innerText = "Atualizar";
    button.className = 'btn btn-success';
    button.onclick = function(){
        editActionModal.hide();
        updateSensor(id, input.value);
    };
    document.getElementById("modalButtonHolder").appendChild(button);
    editActionModal.show();
};

function getDeviceStatus(id) { // TODO: CHAMAR CURL E RETORNAR STATUS
    // curl -G -X GET \  'http://iot.intelirede.com.br:1026/v2/entities/urn:ngsi-ld:Cafeteira:001' \
    // -d 'type=Cafeteira' \  -H 'fiware-service: openiot' \
    // -H 'fiware-servicepath: /'
    // updateRequestLog("Requisição", "CURL Request status. Status de " + id);
    // updateRequestLog("Retorno", "CURL Status. Standby");
    return "StandBy";
}





  
//  ---------------------- CREATE ALL CARDS ---------------------------------------------------------------------
let cardContainer;
let createDeviceCard = (device) => {
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    var commandList = [];
    if(device.commands.length != 0) {
        Object.entries(device.commands).forEach((entry) => {
            commandList.push(entry[1].name);
        });
    }

    const deviceIdText = String(device.device_id);
    const deviceEntityNameText = String(device.entity_name);
    const deviceTypeText = String(device.entity_type);
    const deviceStatusText = String(getDeviceStatus(deviceEntityNameText));

    let deviceId = document.createElement('h5'); 
    deviceId.innerText = "Nome: " + deviceIdText;
    deviceId.className = 'card-title';
    cardBody.appendChild(deviceId);

    let deviceStatus = document.createElement('h6');
    deviceStatus.innerText = "Status: " + deviceStatusText;
    cardBody.appendChild(deviceStatus);

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
    

    let buttonHolder = document.createElement('div');
    if(deviceTypeText.includes("sensor") || deviceTypeText.includes("Sensor")) { // add update button
        let buttonEdit = document.createElement('button');
        buttonEdit.innerText = "Editar";
        buttonEdit.className = 'btn btn-secondary';
        buttonEdit.onclick = function(){
            doButtonEdit(deviceEntityNameText, deviceIdText);
        };
        buttonHolder.appendChild(buttonEdit);
    } else { // add trigger button
        let buttonTrigger = document.createElement('button');
        buttonTrigger.innerText = "Acionar";
        buttonTrigger.className = 'btn btn-success';
        buttonTrigger.onclick = function(){
            doButtonTrigger(deviceEntityNameText, deviceIdText, commandList);
        };
        buttonHolder.appendChild(buttonTrigger);
    }

    cardBody.appendChild(buttonHolder);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
}

let initListOfTasks = () => {
    updateDeviceList();
    if (cardContainer) {
        cardContainer.innerHTML = '';
    }
    cardContainer = document.getElementById('card-container');
    Object.entries(resp.devices).forEach((entry) => {
        createDeviceCard(entry[1]);
    });
    console.log("Atualizando tela");
};

main();
setInterval(main, updateInterval);
