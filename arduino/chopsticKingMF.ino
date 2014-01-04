/*-------------------------------------------------------------

 This is for'chopsticking,' which is a physical computing game.
 _created by Christina Carter and Jess Jiyoung Jung, NYU ITP
 chopsticKing demo -> http://vimeo.com/55495229

---------------------------------------------------------------*/


#include <Adafruit_PN532.h>
#include <Servo.h> 


//RFID parts----------------------------------------------------

#define SCK  (2)
#define MOSI (4)
#define SS   (5)
#define MISO (3)
#define SS2 (6)

Adafruit_PN532 reader1(SCK, MISO, MOSI, SS); //breakout board
Adafruit_PN532 reader2(SCK, MISO, MOSI, SS2); //shield


unsigned long longuid1;
unsigned long longuid2;
const int switchPin = 7;
int gameStart = 0;

//servo parts----------------------------------------------------

Servo servoMotor;       // creates an instance of the servo object to control a servo
int servoPin = A0;       // Control pin for servo motorv


//chopstick parts--------------------------------------------------

//Statistic myStats1; 
//Statistic myStats2;
//Statistic myStats3; 
//Statistic myStats4;

int analogPin1 = 2;
int analogPin2 = 3;
int analogPin3 = 4;
int analogPin4 = 5;

int analogValue1 = 0;
int analogValue2 = 0;
int analogValue3 = 0;
int analogValue4 = 0;

int p1CScore = 0;
int p2CScore = 0;


void setup(void) {

  pinMode(9, OUTPUT);   // set the reader1 LED pin to be an output
  pinMode(10, OUTPUT);   // set the reader2 LED pin to be an output
  pinMode(switchPin, INPUT);
  pinMode(A0, OUTPUT);

  Serial.begin(9600);

  //servo parts----------------------------------------------------

  servoMotor.attach(servoPin);

  //RFID parts----------------------------------------------------

  reader1.begin();
  reader2.begin();

  uint32_t versiondata1 = reader1.getFirmwareVersion();

  if (! versiondata1) {
    Serial.print("Didn't find reader1");
    while (1); // halt
  }

  reader1.SAMConfig();

  uint32_t versiondata2 = reader2.getFirmwareVersion();

  if (! versiondata2) {
    Serial.print("Didn't find reader2");
    while (1); // halt
  }

  reader2.SAMConfig();

}

void loop(void) {

  int switchStatus = digitalRead(switchPin);


  if(switchStatus ==HIGH){
    //gameStart = 1;
    Serial.println("GO");
    //switchStatus = LOW;
  }


  if(gameStart ==1){

    //RFID & servo parts----------------------------------------------------
    servoMotor.write(102);

    uint8_t success1;
    uint8_t success2;
    uint8_t uid1[] = { 
      0, 0, 0, 0, 0, 0, 0                             };  // Buffer to store the returned UID
    uint8_t uidLength1;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)

    uint8_t uid2[] = { 
      0, 0, 0, 0, 0, 0, 0                             };  // Buffer to store the returned UID
    uint8_t uidLength2;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
    // Wait for an ISO14443A type cards (Mifare, etc.).  When one is found
    // 'uid' will be populated with the UID, and uidLength will indicate
    // if the uid is 4 bytes (Mifare Classic) or 7 bytes (Mifare Ultralight)

    success1 = reader1.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid1, &uidLength1);
    success2 = reader2.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid2, &uidLength2);

    if(success1){
      digitalWrite(9,HIGH);
      delay(50);
      digitalWrite(9,LOW);

      if (uidLength1 == 4){
        longuid1 = uid1[3] + (uid1[2]<<8) + ((long)uid1[1]<<16) +((long)uid1[0]<<24);

      }
    }
    else{
      digitalWrite(9,LOW);
      longuid1 = 0;
    }


    if(success2){
      digitalWrite(10,HIGH);
      delay(50);
      digitalWrite(10,LOW);

      if (uidLength2 == 4){
        longuid2 = uid2[3] + (uid2[2]<<8) + ((long)uid2[1]<<16) +((long)uid2[0]<<24);
      }
    }
    else{
      digitalWrite(10,LOW);
      longuid2 = 0;
    }


    //chopstick parts-----------------------------------------------------

    analogValue1 = analogRead(analogPin1);
    analogValue2 = analogRead(analogPin2);
    analogValue3 = analogRead(analogPin3);
    analogValue4 = analogRead(analogPin4);

    int output1 = analogValue1;
    int output2 = analogValue2;
    int output3 = analogValue3;
    int output4 = analogValue4;

    if(output1 < 300 && output2 < 300){
      p1CScore = p1CScore;
    } 
    else if(output1 >= 300 && output2 < 300){
      p1CScore = p1CScore+1;
    } 
    else if(output1 < 300 && output2 >= 300){
      p1CScore = p1CScore+1;
    } 
    else {
      p1CScore = p1CScore+2;  
    }


    if(output3 < 200 && output4 < 200){
      p2CScore = p2CScore;
    } 
    else if(output3 >= 200 && output4 < 200){
      p2CScore = p2CScore + 1;
    } 
    else if(output3 < 200 && output4 >= 200){
      p2CScore = p2CScore + 1;
    } 
    else {
      p2CScore = p2CScore + 2;  
    }  

  }

}

void serialEvent(){

  while(Serial.available()) {
    char inputMsg = 0; 
    inputMsg = Serial.read();

    switch(inputMsg){
    case 's':
      gameStart = 1; 
      Serial.print("I got S!");
      servoMotor.attach(servoPin);
      break;
    case 'x':
      Serial.print("I got x!");
      gameStart = 0;
      servoMotor.detach();
      break;
    case 'u':
      Serial.print("T");
      Serial.print(longuid1,HEX);
      Serial.print(",");
      Serial.print("T");
      Serial.print(longuid2,HEX);
      Serial.print(",");
      Serial.print("P");
      Serial.print(p1CScore);
      Serial.print(",");
      Serial.print("P");
      Serial.println(p2CScore);
 
      break;

    }

  }

}








