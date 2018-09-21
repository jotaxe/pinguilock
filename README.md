# Pingüilock - Face Recognition Access Control System

## Folder Structure:
- Hardware
	- Cerradura
		- firmware.ino
	- MQTT_Client_RBPi
		- *.jpg
		- haarcascade_fronfalface_atl2.xml
		- mqtt_info.html
		- mqttClient.py
- Backend
	- Empty
- Frontend
	- Empty
- AndroidApp
	- Empty

## Used Frameworks:
- Cerradura
	- Arduino IDE
- Servidor Local
	- python SimpleHTTP
	- OpenCV 3.4
	- zBar

## To-Do List:
- Hardware:
	- [X] Cerradura:
		- [X] Conectar a AP
		- [X] Conectar a servidor MQTT
		- [X] Controlar relé segun mensaje en topico
		- [X] Intercambiar información con servidor local
	- [ ] Camara:
		- [X] Detectar caras
		- [X] Detectar QR
		- [ ] Conectar Rekognition
	- [ ] Cliente MQTT (Raspberry Pi):
		- [X] Estructura de mensaje
		- [X] Solicitud de lector QR
		- [X] Solicitud de reconocimiento facial
		- [ ] Verificación de identidad facial
		- [ ] Verificación de datos QR
		- [ ] Conexión API pinguilock (HTTP)

- Backend:
	- [ ] Base de datos:
		- [ ] crear modelos
		- [ ] crear servicios
