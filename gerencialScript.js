 
// function doFunction(text){
//     $.ajax({
//         url: 'http://iot.intelirede.com.br:1026/v2/entities',
//         headers: {
//             'fiware-service': 'openiot',
//             'fiware-servicepath': '/'
//         },
//         type: "GET",
//         dataType: "json",
//         data: {
//         },
//         success: function (result) {
//             console.log(result);
//         },
//         error: function(XMLHttpRequest, textStatus, errorThrown) {
//             console.log(textStatus);
//             console.log(errorThrown);
//          }
//     });
// }
var resp = {};
const registrationFields = ["Nome", "Ação"];

function updateDeviceList() { //TODO: CHAMAR CURL E ATRIBUIR JSON DE RETORNO À VARIÁVEL
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


// ---------------------- CREATE ALL ACTION FUNCTIONS ----------------------------------------------------------
function deleteDevice(id) { // TODO: CHAMAR CURL E DELETAR OBJETO
    console.log("excluindo " + id);
    initListOfTasks();
    return;
}

function createDevice(data) { // TODO: CHAMAR CURL E CADASTRAR OBJETO
    console.log(data);
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
    var inputList = [];
    registrationFields.forEach((entry) => {
        let inputEntry  = document.createElement('div');
        inputEntry.className = "d-flex";
        let inputEntryLabel  = document.createElement('div');
        inputEntryLabel.innerHTML = "<b>" + entry + ":</b>";
        inputEntryLabel.style = "width: 20%";
        inputEntry.appendChild(inputEntryLabel);
        var input = document.createElement("input");
        input.setAttribute('type', 'text');
        input.style = "margin-left: 10px";
        input.id = entry;
        inputList.push(input);
        inputEntry.appendChild(input);
        body.appendChild(inputEntry);
    });
    document.getElementById("modalBody").appendChild(body);

    document.getElementById("modalButtonHolder").innerHTML = "";
    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Cadastrar";
    deleteButton.className = 'btn btn-success';
    deleteButton.onclick = function(){
        createActionModal.hide();
        let data = [];
        inputList.forEach((entry) => {
            data.push([entry.id, entry.value])
        });
        createDevice(data);
    };
    document.getElementById("modalButtonHolder").appendChild(deleteButton);
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
    updateDeviceList();
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

    Object.entries(resp.devices).forEach((entry) => {
        createDeviceCard(entry[1]);
    });
    console.log("Atualizando tela");
};

initListOfTasks();
