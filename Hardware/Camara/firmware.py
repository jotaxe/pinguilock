import paho.mqtt.client as mqtt
import time

import cv2
import sys

import pyzbar.pyzbar as pyzbar
import numpy as np
import requests
from ConfigParser import SafeConfigParser

device_topic = "0"
broker_adress = "0"
rbpi_api_url = "0"
pinguilock_api_url = "0"
cam_topic = "0"

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


def checkUserAWS(user, frame):
    #refImage = getRefImageAPI(user)
    #return RekognitionAPI(refImage, frame) #bool si esta refImage en frame es true, si no, false 
    refUser = "test"
    if refUser == user:
        return True
    else:
        return False
    
    return False
    

def decode(im):
    decodedObjects = pyzbar.decode(im)

    return decodedObjects

def check_QR(client, QRCode, lockTopic):
    videoCapture = cv2.VideoCapture(0)
    time.sleep(3)
    timeout = time.time() + 10
    while True:
        ret, frame = videoCapture.read()
        decodedObjects = decode(frame)
        
        print(len(decodedObjects))
        if time.time() > timeout:
            break
        if len(decodedObjects) > 0:
            if decodedObjects[0].data == QRCode:
                cv2.imwrite("./images/detectedQR-.jpg", frame)
                client.publish(lockTopic, "1")
                break
        


def on_message(client, userdata, message):
    rawMessage = str(message.payload.decode("utf-8"))
    print("message: " + rawMessage);
    messageArray = rawMessage.split(":")
    userOrQR = messageArray[0]
    authMethod = messageArray[1]
    lockTopic = messageArray[2]
    print("userOrQR: " + userOrQR)
    print("authMethod:" + authMethod)
    print("lockTopic:" + lockTopic)

    if authMethod == "FaceAuth":
        user = userOrQR
        check_face(client, user, lockTopic)
    else:
        if authMethod == "QRAuth":
            QRCode = userOrQR
            check_QR(client, QRCode, lockTopic)

def check_face(client, user, lockTopic):
    cascPath = "haarcascade_frontalface_alt2.xml"
    faceCascade = cv2.CascadeClassifier(cascPath)
    videoCapture = cv2.VideoCapture(0)
    time.sleep(3)
    timeout = time.time() + 10
    while True:
    
        ret, frame = videoCapture.read()
        
        faces = faceCascade.detectMultiScale(
            frame,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30),
            flags=cv2.CASCADE_SCALE_IMAGE
        )

        print(len(faces))

        if time.time() > timeout:
            break
        if len(faces) > 0:
            cv2.imwrite("./images/detectedFace-.jpg", frame )
            '''
            isUserInFrame = checkUserAWS(user, frame)
            if isUserInFrame:
            '''
            isUserInFrame = checkUserAWS(user, frame)
            print(isUserInFrame)
            if isUserInFrame == True:
                client.publish(lockTopic, "1")
            else:
                client.publish(lockTopic, "0")
            print(lockTopic)
            '''
            else:
                client.publish(lockTopic, "0")
                print(lockTopic)
            '''
            break


def main():
    setup()
    client = mqtt.Client("cam0")
    cam_topic = getDeviceTopic() + "/cam0"
    client.on_message = on_message
    client.connect(broker_adress)
    client.subscribe(cam_topic)
    client.loop_start()
    
    print("subscribed to: " + cam_topic)
    print("CAM0 Ready")
    time.sleep(5)
    while 1:
        continue


main()

    

