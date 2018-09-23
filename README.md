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
	- config
		- default.json
		- production.json
	- public
		- favicon.ico
		- index.html
	- src
		- hooks
			- log.js
		- middleware
			- index.js
		- models
			- acceess_device.model.js
			- otp_access_request.model.js
			- otp_user.model.js
			- otp.model.js
			- user_access_request.model.js
			- user_face.model.js
			- user_key.model.js
			- user.model.js
		- services
			- access_device
				- access_device.hooks.js
				- access_device.service.js
			- otp
				- otp.hooks.js
				- otp.service.js
			- otp_access_request
				-	otp_access_request.hooks.js
				-	otp_access_request.service.js
			- otp_user
				- otp_user.hooks.js
				- otp_user.service.js
			- user
				- user.hooks.js
				- user.service.js
			- user_access_request
				- user_access_request.hooks.js
				- user_access_request.service.js
			- user_face
				- user_face.hooks.js
				- user_face.service.js
			- user_key
				- user_key.hooks.js
				- user_key.service.js
			- index.js
		- app.js
		- app.hooks.js
		- channels.js
	- test
		- services
			- access_device.test.js
			- otp_access_request.test.js
			- otp_user.test.js
			- otp.test.js
			- user_access_request.test.js
			- user_face.test.js
			- user_key.test.js
			- user.test.js
		- app.test.js
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
		- [X] crear modelos
		- [X] crear servicios
		- [ ] definir relaciones modelos
		- [ ] aprovacion tipos de variables
