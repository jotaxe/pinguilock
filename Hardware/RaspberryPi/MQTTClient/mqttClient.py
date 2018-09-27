import paho.mqtt.client as mqtt
import time

import cv2
import sys

import pyzbar.pyzbar as pyzbar
import numpy as np

import urllib, json

device_topic = "local_server0"
broker_adress = "192.168.0.23" # Cambiar por la ip de AWS
client = mqtt.Client("rPi")

def fetchCamFromLocalserverAPI(lockTopic):
    response = urllib.open("http://pinguilock.local:3030/devices/?lock=" + lockTopic)
    data = json.loads(response.read())
    return data["camera"]

def getCam(lockTopic):
    #camTopic = fetchCamFromLocalserverAPI(lockTopic)
    camTopic = "cam0"
    return camTopic

def on_message(client, userdata, message):
    rawMessage = str(message.payload.decode("utf-8"))
    print("message received " + rawMessage);
    messageArray = rawMessage.split(":")
    userOrQR = messageArray[0]
    authMethod = messageArray[1]
    lockTopic = device_topic + "/" + messageArray[2]
    camTopic = device_topic + "/" + getCam(lockTopic)
    client.publish(camTopic, userOrQR + ":" + authMethod + ":" + lockTopic)

client.on_message = on_message
client.connect(broker_adress)
client.loop_start()
client.subscribe(device_topic)
print("RBPI MQQTT Client Ready")
time.sleep(5)
while 1:
    continue

    

