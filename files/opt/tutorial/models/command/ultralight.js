// Connect to an IoT Agent and use fallback values if necessary

/* global IOTA_CLIENT */
/* global MQTT_CLIENT */
/* global SOCKET_IO */

const IoTDevices = require('../devices');
const DEVICE_API_KEY = process.env.DUMMY_DEVICES_API_KEY || '1234';
const IOTA_CMD_EXE_TOPIC = (process.env.IOTA_MESSAGE_INDEX || 'fiware') + '/cmdexe';
const debug = require('debug')('tutorial:ultralight');
const async = require('async');
// A series of constants used by our set of devices
const OK = ' OK';
const NOT_OK = ' NOT OK';

// Queue used for command acknowledgements in the form of IOTA messages.
// An IOTA message is the encapsulating data structure that is being actually broadcasted
// across the network. It is an atomic unit that is accepted/rejected as a whole.
// Queuing ensures that responses are not lost.
//
// see https://wiki.iota.org/iota.rs/libraries/nodejs/examples#messages
const queue = async.queue((data, callback) => {
    IOTA_CLIENT.message()
        .index(IOTA_CMD_EXE_TOPIC)
        .data(data.responsePayload)
        .submit()
        .then((response) => {
            SOCKET_IO.emit('IOTA-tangle', '<b>' + response.messageId + '</b> ' + data.responsePayload);
            debug('command response sent to ' + IOTA_CMD_EXE_TOPIC);
            debug(response.messageId);
            setImmediate(() => {
                // In a real device actuation would be completed before the command acknowledgement is sent.
                // The simulator switches this round to ensure the commandExe is received
                // before any status update is sent.
                IoTDevices.actuateDevice(data.deviceId, data.command);
            });
            callback();
        })
        .catch((err) => {
            // If a failure occurs, re-queue the acknowledgement
            debug(err);
            setTimeout(() => {
                debug('resending command response to ' + IOTA_CMD_EXE_TOPIC);
                queue.push(data);
            }, 1000);
            callback(err);
        }, 8);
});

//
// Splits the deviceId from the command sent.
//
function getUltralightCommand(string) {
    const command = string.split('@');
    if (command.length === 1) {
        command.push('');
    }
    return command[1];
}

// This processor sends ultralight payload northbound to
// the southport of the IoT Agent and sends measures
// for the motion sensor, door and lamp.

// Ultralight 2.0 is a lightweight text based protocol aimed to constrained
// devices and communications
// where the bandwidth and device memory may be limited resources.
//
// A device can report new measures to the IoT Platform using an HTTP GET request to the /iot/d path with the following query parameters:
//
//  i (device ID): Device ID (unique for the API Key).
//  k (API Key): API Key for the service the device is registered on.
//  t (timestamp): Timestamp of the measure. Will override the automatic IoTAgent timestamp (optional).
//  d (Data): Ultralight 2.0 payload.
//
// At the moment the API key and timestamp are unused by the simulator.

class UltralightCommand {
    // The HTTP bell will respond to the "ring" command.
    // this will briefly set the bell to on.
    // The bell  is not a sensor - it will not report state northbound
    actuateBell(req, res) {
        const keyValuePairs = req.body.split('|') || [''];
        const command = getUltralightCommand(keyValuePairs[0]);
        const deviceId = 'bell' + req.params.id;
        const result = keyValuePairs[0] + '| ' + command;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(result + NOT_OK);
        } else if (IoTDevices.isUnknownCommand('bell', command)) {
            return res.status(422).send(result + NOT_OK);
        }

        // Update device state and respond to the HTTP command
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(result + OK);
    }

    // The HTTP door responds to "open", "close", "lock" and "unlock" commands
    // Each command alters the state of the door. When the door is unlocked
    // it can be opened and shut by external events.
    actuateDoor(req, res) {
        const keyValuePairs = req.body.split('|') || [''];
        const command = getUltralightCommand(keyValuePairs[0]);
        const deviceId = 'door' + req.params.id;
        const result = keyValuePairs[0] + '| ' + command;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(result + NOT_OK);
        } else if (IoTDevices.isUnknownCommand('door', command)) {
            return res.status(422).send(result + NOT_OK);
        }

        // Update device state and respond to the HTTP command
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(result + OK);
    }

    // Cafeteira
    actuateCafeteira(req, res) {
        const keyValuePairs = req.body.split('|') || [''];
        const command = getUltralightCommand(keyValuePairs[0]);
        const deviceId = 'cafeteira' + req.params.id;
        const result = keyValuePairs[0] + '| ' + command;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(result + NOT_OK);
        } else if (IoTDevices.isUnknownCommand('cafeteira', command)) {
            return res.status(422).send(result + NOT_OK);
        }

        // Update device state and respond to the HTTP command
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(result + OK);
    }

    // Cortina
    actuateCortina(req, res) {
        const keyValuePairs = req.body.split('|') || [''];
        const command = getUltralightCommand(keyValuePairs[0]);
        const deviceId = 'cortina' + req.params.id;
        const result = keyValuePairs[0] + '| ' + command;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(result + NOT_OK);
        } else if (IoTDevices.isUnknownCommand('cortina', command)) {
            return res.status(422).send(result + NOT_OK);
        }

        // Update device state and respond to the HTTP command
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(result + OK);
    }

    // Robo aspirador
    actuateRoboaspirador(req, res) {
        const keyValuePairs = req.body.split('|') || [''];
        const command = getUltralightCommand(keyValuePairs[0]);
        const deviceId = 'roboaspirador' + req.params.id;
        const result = keyValuePairs[0] + '| ' + command;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(result + NOT_OK);
        } else if (IoTDevices.isUnknownCommand('roboaspirador', command)) {
            return res.status(422).send(result + NOT_OK);
        }

        // Update device state and respond to the HTTP command
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(result + OK);
    }

    // Maquina de lavar
    actuateMaqdelavar(req, res) {
        const keyValuePairs = req.body.split('|') || [''];
        const command = getUltralightCommand(keyValuePairs[0]);
        const deviceId = 'maqdelavar' + req.params.id;
        const result = keyValuePairs[0] + '| ' + command;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(result + NOT_OK);
        } else if (IoTDevices.isUnknownCommand('maqdelavar', command)) {
            return res.status(422).send(result + NOT_OK);
        }

        // Update device state and respond to the HTTP command
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(result + OK);
    }

    // Sensor de pressao
    actuateSensorpressao(req, res) {
        const keyValuePairs = req.body.split('|') || [''];
        const command = getUltralightCommand(keyValuePairs[0]);
        const deviceId = 'sensorpressao' + req.params.id;
        const result = keyValuePairs[0] + '| ' + command;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(result + NOT_OK);
        } else if (IoTDevices.isUnknownCommand('sensorpressao', command)) {
            return res.status(422).send(result + NOT_OK);
        }

        // Update device state and respond to the HTTP command
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(result + OK);
    }

    // Sensor de presenca
    actuateSensorpresenca(req, res) {
        const keyValuePairs = req.body.split('|') || [''];
        const command = getUltralightCommand(keyValuePairs[0]);
        const deviceId = 'sensorpresenca' + req.params.id;
        const result = keyValuePairs[0] + '| ' + command;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(result + NOT_OK);
        } else if (IoTDevices.isUnknownCommand('sensorpresenca', command)) {
            return res.status(422).send(result + NOT_OK);
        }

        // Update device state and respond to the HTTP command
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(result + OK);
    }

    // The HTTP lamp can be "on" or "off" - it also registers luminosity.
    // It will slowly dim as time passes (provided no movement is detected)
    actuateLamp(req, res) {
        const keyValuePairs = req.body.split('|') || [''];
        const command = getUltralightCommand(keyValuePairs[0]);
        const deviceId = 'lamp' + req.params.id;
        const result = keyValuePairs[0] + '| ' + command;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(result + NOT_OK);
        } else if (IoTDevices.isUnknownCommand('lamp', command)) {
            return res.status(422).send(result + NOT_OK);
        }

        // Update device state and respond to the HTTP command
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(result + OK);
    }

    // The HTTP robot can be directed to move from A to B.
    // The box can also  be unlocked on command.
    actuateRobot(req, res) {
        const keyValuePairs = req.body.split('|') || [''];
        const command = getUltralightCommand(keyValuePairs[0]);
        const deviceId = 'robot' + req.params.id;
        const result = keyValuePairs[0] + '| ' + command;
        let param1;
        let param2;

        if (keyValuePairs.length > 1) {
            param1 = keyValuePairs[1];
        }
        if (keyValuePairs.length > 2) {
            param2 = keyValuePairs[2];
        }

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(result + NOT_OK);
        } else if (IoTDevices.isUnknownCommand('robot', command)) {
            return res.status(422).send(result + NOT_OK);
        }
        // Update device state and respond to the HTTP command
        const success = IoTDevices.addRobotGoal(deviceId, command, param1, param2);
        return res.status(200).send(result + (success ? OK : NOT_OK));
    }

    // For the MQTT transport, cmd topics are consumed by the actuators (bell, lamp and door)
    processMqttMessage(topic, message) {
        const path = topic.split('/');
        if (path.pop() === 'cmd') {
            const keyValuePairs = message.split('|') || [''];
            const command = getUltralightCommand(keyValuePairs[0]);
            const deviceId = path.pop();
            const result = keyValuePairs[0] + '| ' + command;

            if (!IoTDevices.notFound(deviceId)) {
                // Respond to the MQTT command with an acknowledgement. In a real device
                // this asynchronous response would be the callback after the actuation has completed
                const topic = '/' + DEVICE_API_KEY + '/' + deviceId + '/cmdexe';
                MQTT_CLIENT.publish(topic, result + OK);
                IoTDevices.actuateDevice(deviceId, command);
            }
        }
    }

    // For the IOTA Tangle transport, cmd topics are consumed by the actuators (bell, lamp and door)
    processIOTAMessage(apiKey, deviceId, message) {
        const keyValuePairs = message.split('|') || [''];
        const command = getUltralightCommand(keyValuePairs[0]);
        const result = keyValuePairs[0] + '| ' + command;

        if (!IoTDevices.notFound(deviceId)) {
            // Respond to the IOTA Tangle command with an acknowledgement. In a real device
            // this asynchronous response would be the callback after the actuation has completed
            const responsePayload = 'i=' + deviceId + '&k=' + apiKey + '&d=' + result + OK;
            process.nextTick(() => {
                debug('sending command response to ' + IOTA_CMD_EXE_TOPIC);
                queue.push({ responsePayload, deviceId, command });
            });
        }
    }
}

module.exports = UltralightCommand;
