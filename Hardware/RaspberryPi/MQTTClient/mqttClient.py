import paho.mqtt.client as mqtt
import time
import sys
import requests, json
from ConfigParser import SafeConfigParser

device_topic = "0"
broker_adress = "0"
rbpi_api_url = "0"
pinguilock_api_url = "0"


def setup():
    parser = SafeConfigParser()
    parser.read("config.ini")
    global broker_adress
    global rbpi_api_url
    global pinguilock_api_url
    
    if sys.argv[1] == "-development":
        
        broker_adress = parser.get("development", "broker_adress")
        rbpi_api_url = parser.get("development", "rbpi_api_url")
        pinguilock_api_url = parser.get("development", "pinguilock_api_url")
    elif sys.argv[1] == "-production":
        broker_adress = parser.get("production", "broker_adress")
        rbpi_api_url = parser.get("production", "rbpi_api_url")
        pinguilock_api_url = parser.get("production", "pinguilock_api_url")
    



def getDeviceTopic():
    response = requests.get(rbpi_api_url + "/mqtt-info/1")
    data = response.json()
    return data["device_name"]





def getCam(lockName):
    response = requests.get(rbpi_api_url + "/cam-lock-pair/?lock_name=" + lockName)
    data = response.json()
    return data["data"][0]["cam_name"]


def on_message(client, userdata, message):
    rawMessage = str(message.payload.decode("utf-8"))
    print("Message: " + rawMessage)
    messageArray = rawMessage.split(":")
    
    userOrQR = messageArray[0]
    print("userOrQR:" + userOrQR)
    authMethod = messageArray[1]
    print("authMethod:" + authMethod)
    lockTopic = device_topic + "/" + messageArray[2]
    print("lockTopic:" + lockTopic)
    camTopic = device_topic + "/" + getCam(messageArray[2])
    print("camTopic:" + camTopic)

    client.publish(camTopic, userOrQR + ":" + authMethod + ":" + lockTopic)



def main():

    setup()
    print("setup ready!")
    client = mqtt.Client("rPi")
    global device_topic
    device_topic = getDeviceTopic()
    client.on_message = on_message
    print("Connecting to broker_adress: " + broker_adress + "\n")
    print("Subscribing to device_topic: " + device_topic + "\n")
    client.connect(broker_adress)
    client.subscribe(device_topic)
    client.loop_start()
    print("RBPI MQQTT Client Ready")
    time.sleep(5)
    while 1:
        continue

    

main()
    

