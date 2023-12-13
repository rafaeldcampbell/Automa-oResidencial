// Connect to an IoT Agent and use fallback values if necessary

const IoTDevices = require('../devices');
const DEVICE_API_KEY = process.env.DUMMY_DEVICES_API_KEY || '1234';
const xmlParser = require('xml-parser');
const debug = require('debug')('tutorial:xml');

// A series of constants used by our set of devices
const OK = 'success';
const NOT_OK = 'error';

/* global MQTT_CLIENT */

//
// Splits the deviceId from the command sent.
//
function getResult(status, command, id, info) {
    if (info) {
        return '<' + status + ' command="' + command + '" device="' + id + '">' + info + '</' + status + '/>';
    }
    return '<' + status + ' command="' + command + '" device="' + id + '"/>';
}

// This processor sends XML payload northbound to
// the southport of the IoT Agent and sends measures
// for the motion sensor, door and lamp.

class XMLCommand {
    // The bell will respond to the "ring" command.
    // this will briefly set the bell to on.
    // The bell  is not a sensor - it will not report state northbound
    actuateBell(req, res) {
        const data = xmlParser(req.body);
        const deviceId = data.root.attributes.device;
        const command = data.root.name;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(getResult(NOT_OK, command, deviceId, 'not found'));
        } else if (IoTDevices.isUnknownCommand('bell', command)) {
            return res.status(422).send(getResult(NOT_OK, command, deviceId, 'unknown command'));
        }

        // Update device state
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(getResult(OK, command, deviceId));
    }

    // The door responds to "open", "close", "lock" and "unlock" commands
    // Each command alters the state of the door. When the door is unlocked
    // it can be opened and shut by external events.
    actuateDoor(req, res) {
        const data = xmlParser(req.body);
        const deviceId = data.root.attributes.device;
        const command = data.root.name;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(getResult(NOT_OK, command, deviceId, 'not found'));
        } else if (IoTDevices.isUnknownCommand('door', command)) {
            return res.status(422).send(getResult(NOT_OK, command, deviceId, 'unknown command'));
        }

        // Update device state
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(getResult(OK, command, deviceId));
    }

    // Cafeteira
    actuateCafeteira(req, res) {
        const data = xmlParser(req.body);
        const deviceId = data.root.attributes.device;
        const command = data.root.name;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(getResult(NOT_OK, command, deviceId, 'not found'));
        } else if (IoTDevices.isUnknownCommand('cafeteira', command)) {
            return res.status(422).send(getResult(NOT_OK, command, deviceId, 'unknown command'));
        }

        // Update device state
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(getResult(OK, command, deviceId));
    }

    // Cortina
    actuateCortina(req, res) {
        const data = xmlParser(req.body);
        const deviceId = data.root.attributes.device;
        const command = data.root.name;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(getResult(NOT_OK, command, deviceId, 'not found'));
        } else if (IoTDevices.isUnknownCommand('cortina', command)) {
            return res.status(422).send(getResult(NOT_OK, command, deviceId, 'unknown command'));
        }

        // Update device state
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(getResult(OK, command, deviceId));
    }

    // Robo aspirador
    actuateRoboaspirador(req, res) {
        const data = xmlParser(req.body);
        const deviceId = data.root.attributes.device;
        const command = data.root.name;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(getResult(NOT_OK, command, deviceId, 'not found'));
        } else if (IoTDevices.isUnknownCommand('roboaspirador', command)) {
            return res.status(422).send(getResult(NOT_OK, command, deviceId, 'unknown command'));
        }

        // Update device state
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(getResult(OK, command, deviceId));
    }

    // Maquina de lavar
    actuateMaqdelavar(req, res) {
        const data = xmlParser(req.body);
        const deviceId = data.root.attributes.device;
        const command = data.root.name;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(getResult(NOT_OK, command, deviceId, 'not found'));
        } else if (IoTDevices.isUnknownCommand('maqdelavar', command)) {
            return res.status(422).send(getResult(NOT_OK, command, deviceId, 'unknown command'));
        }

        // Update device state
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(getResult(OK, command, deviceId));
    }

    // Sensor de pressao
    actuateSensorpressao(req, res) {
        const data = xmlParser(req.body);
        const deviceId = data.root.attributes.device;
        const command = data.root.name;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(getResult(NOT_OK, command, deviceId, 'not found'));
        } else if (IoTDevices.isUnknownCommand('sensorpressao', command)) {
            return res.status(422).send(getResult(NOT_OK, command, deviceId, 'unknown command'));
        }

        // Update device state
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(getResult(OK, command, deviceId));
    }

    // Sensor de presenca
    actuateSensorpresenca(req, res) {
        const data = xmlParser(req.body);
        const deviceId = data.root.attributes.device;
        const command = data.root.name;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(getResult(NOT_OK, command, deviceId, 'not found'));
        } else if (IoTDevices.isUnknownCommand('sensorpresenca', command)) {
            return res.status(422).send(getResult(NOT_OK, command, deviceId, 'unknown command'));
        }

        // Update device state
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(getResult(OK, command, deviceId));
    }

    // The lamp can be "on" or "off" - it also registers luminosity.
    // It will slowly dim as time passes (provided no movement is detected)
    actuateLamp(req, res) {
        const data = xmlParser(req.body);
        const deviceId = data.root.attributes.device;
        const command = data.root.name;

        if (IoTDevices.notFound(deviceId)) {
            return res.status(404).send(getResult(NOT_OK, command, deviceId, 'not found'));
        } else if (IoTDevices.isUnknownCommand('lamp', command)) {
            return res.status(422).send(getResult(NOT_OK, command, deviceId, 'unknown command'));
        }

        // Update device state
        IoTDevices.actuateDevice(deviceId, command);
        return res.status(200).send(getResult(OK, command, deviceId));
    }

    // The robot can be directed to move from A to B.
    // The box can also  be unlocked on command.
    actuateRobot(req, res) {
        const data = xmlParser(req.body);
        const deviceId = data.root.attributes.device;
        const command = data.root.name;
        return res.status(200).send(getResult(OK, command, deviceId));
    }

    // cmd topics are consumed by the actuators (bell, lamp and door)
    processMqttMessage(topic, message) {
        const path = topic.split('/');
        if (path.pop() === 'cmd') {
            const data = xmlParser(message);
            const deviceId = data.root.attributes.device;
            const command = data.root.name;

            if (!IoTDevices.notFound(deviceId)) {
                IoTDevices.actuateDevice(deviceId, command);
                const topic = '/' + DEVICE_API_KEY + '/' + deviceId + '/cmdexe';
                MQTT_CLIENT.publish(topic, getResult(OK, command, deviceId));
            }
        }
    }

    /* eslint-disable-next-line  no-unused-vars */
    processIOTAMessage(apiKey, deviceId, message) {
        debug('not implemented');
    }
}

module.exports = XMLCommand;
