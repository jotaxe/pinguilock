import paho.mqtt.client as mqtt
import time

import cv2
import sys

import pyzbar.pyzbar as pyzbar
import numpy as np

def getDev():
    # device_topic = fetchDeviceDataLocalserverAPI()
     device_topic = "local_server0"
     return device_topic

def checkUserAWS(user, frame):
    #refImage = getRefImageAPI(user)
    #return RekognitionAPI(refImage, frame) #bool si esta refImage en frame es true, si no, false 
    refUser = "test"
    return user == refUser ? True : False

cam_topic = "cam0"

broker_adress = "192.168.0.23" # Cambiar por la ip de AWS
client = mqtt.Client("cam0")


def decode(im):
    decodedObjects = pyzbar.decode(im)

    for obj in decodedObjects:
        print("Type: ", obj.type)
        print("Data: ", obj.data, '\n')
    
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
            cv2.imwrite("./images/detectedQR-.jpg", frame)
            if decodedObjects[0] == QRCode:
                client.publish(lockTopic, "1")
                break


def on_message(client, userdata, message):
    rawMessage = str(message.payload.decode("utf-8"))
    print("message received " + rawMessage);
    messageArray = rawMessage.split(":")
    userOrQR = messageArray[0]
    authMethod = messageArray[1]
    lockTopic = messageArray[1]
    print(messageArray)
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
            
            if checkUserAWS(user, frame):
                client.publish(lockTopic, "1")
                print(lockTopic)
                break
            else:
                client.publish(lockTopic, "0")
                print(lockTopic)
                break



client.on_message = on_message
client.connect(broker_adress)
client.loop_start()
client.subscribe(device_topic)
print("waiting for messages")
time.sleep(5)
while 1:
    continue

    

