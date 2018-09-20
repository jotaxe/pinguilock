import paho.mqtt.client as mqtt
import time

import cv2
import sys





def on_message(client, userdata, message):
    textMessage = str(message.payload.decode("utf-8"))
    print("message received " + textMessage);
    if textMessage == "FaceAuth":
        check_face(client)
    else:
        if textMessage == "QRAuth":
            client.publish("access0", "1")

def check_face(client):
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
            cv2.imwrite("detectedFace-.jpg", frame )
            client.publish("access0", "1")
            break


broker_adress = "192.168.0.23" # Cambiar por la ip de AWS
client = mqtt.Client("rPi")
client.on_message = on_message
client.connect(broker_adress)
client.loop_start()
client.subscribe("request0")
time.sleep(15)
while 1:
    continue

    

