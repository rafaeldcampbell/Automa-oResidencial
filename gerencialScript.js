const registrationFields = ["Nome", "Ação"];

function updateDeviceList() {

    // curl -X GET \
    // 'http://iot.intelirede.com.br:4041/iot/devices' \
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
