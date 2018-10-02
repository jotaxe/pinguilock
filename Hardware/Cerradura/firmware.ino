
/*
 firmware 0.0.1 

*/

#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

// Update these with values suitable for your network.

const int redLed = 16;
const int greenLed = 5;
const int relayPin = 4;

const char* ssid = "PI-nguilock";
const char* password = "jota123456";
const char* mqtt_server = "pinguilock.local";

String request_topic = "local_server0";
String device_topic = "lock0";

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

void setup() {
  Serial.begin(9600);
  pinMode(redLed, OUTPUT);
  pinMode(greenLed, OUTPUT); 
  pinMode(relayPin, OUTPUT);

  setup_wifi();
  delay(2000);
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    digitalWrite(redLed, HIGH);
    delay(500);
    digitalWrite(redLed, LOW);
  }
  digitalWrite(redLed, LOW);
  digitalWrite(greenLed, HIGH);
  HTTPClient http;
  http.begin("http://pinguilock.local:3030/mqtt-info/1");
  int httpCode = http.GET();
  if(httpCode > 0){
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(http.getString());
    const char * temp = root["device_topic"];
    request_topic = String(temp); 
    Serial.print("Resultado root: ");
    Serial.println(request_topic);
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {

  if ((char)payload[0] == '1') {
    digitalWrite(relayPin, HIGH);
    digitalWrite(redLed, HIGH);
    delay(8000);
    digitalWrite(relayPin, LOW);
    digitalWrite(redLed, LOW);
  } else {
    digitalWrite(redLed, HIGH);
    delay(100);
    digitalWrite(redLed, LOW);
    delay(100);
    digitalWrite(redLed, HIGH);
    delay(100);
    digitalWrite(redLed, LOW);
    delay(100);
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP8266Client")) {
     
      String s_topic = request_topic + "/" + device_topic;
      Serial.println("connected to " + s_topic);
      const char* final_topic = s_topic.c_str();
      Serial.print(final_topic);
      client.subscribe(final_topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
} 