#include <Keypad.h>  // Keypad.h 라이브러리를 호출합니다.
#include <Servo.h>


#include <SoftwareSerial.h>
SoftwareSerial mySerial(9,10); //RX, TX 
 

String ssid = "BaeWha_WiFi"; 
String PASSWORD = "baewha2018"; 
String host = "172.16.120.18"; 

String pass;
int cot=0;

char temp[5]={0,};
char secretCode[5] = "1234"; // 비밀번호를 설정(여기선 1234)
char inputCode[5] = "0000";

int position = 0; 
int wrong = 0;
// 비밀번호 비교시 쓸 변수 선언(맞는 경우와 틀린경우 2가지)

const byte rows = 4;
const byte cols = 4;
// 키패드의 행, 열의 갯수

char keys[rows][cols] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};
// 키패드 버튼 위치 설정

byte rowPins[rows] = {8, 7, 6, 5};
byte colPins[cols] = {4, 3, 2, 1};
// 키패드에 연결된 핀번호 설정(데이터 시트 참고)

Servo myservo; //모터 오브젝트 생성
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, rows, cols);
// 키패드 오브젝트 생성

int redPin = 13;
int greenPin = 12;
int sensor = 11;
// LED 2개의 핀번호 설정
bool longPress=false;
bool doorOpen=false;

void setup(){
  Serial.begin(9600);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(sensor,OUTPUT);
  setLocked(true);
  keypad.addEventListener(keypadEvent);
  keypad.setHoldTime(2000);
  mySerial.begin(9600); 
  connectWifi(); 
  delay(500);
}
// 2개의 LED를 세팅해주고, 잠금상태를 기본으로 세팅해 줍니다.


void loop(){
      if(mySerial.available()) { 
      Serial.write(mySerial.read()); 
      } 
   if(Serial.available()) { 
        mySerial.write(Serial.read()); 
       }
  char key = keypad.getKey();

  if (longPress) {  // password 설정
    if (key) {
      if (key != '*' && key != '#' && position < 4) { // 숫자이면, 4자리 이상 무시
        Serial.print("pass set key: "); 
        Serial.println(key); 
        temp[position] = key;
        position++;
      }

      else if(key == '#') { // password 저장
        for (int i = 0; i < 4; i++) secretCode[i] = temp[i];
        longPress = false;
        key = '\0'; // 입력된 '#' 삭제 - 오류방지
        position = 0;     
          
        pass=secretCode;
        pass.remove(4);
        Serial.println(pass);
        lckPassword();
        
        lckClose();
        setLocked(true);
        doorOpen=false;// 자동으로 잠기는 문 표시
        Serial.println("set new password");
      }

      else if (key == '*') {  // 입력값 초기화
        for (int i = 0; i < 4; i++) temp[i] = '0'; 
        key = '\0'; // 입력된 '#' 삭제 - 오류방지
        position = 0;
        Serial.println("reset"); 
      }
    }
  } else {
    if (key) {
      if (key != '*' && key != '#') { // 숫자만 입력
        Serial.print("key: "); Serial.println(key);
        inputCode[position] = key;
        position++;
        if (position == 4) {
          if (strncmp(secretCode, inputCode, 4) == 0){
            lckOpen();
            Serial.println("door open");
            setLocked(false);
            doorOpen=true;
            position = 0;
            if(cot!=0&&cot){
              cot=0;
              notreset();
            }
          }
          
          else {
            Serial.println("wrong number");
            setLocked(true);
            blink();
            position = 0;
            cot++;
            if(cot==2){
              userAlert();
            }else if(cot>2){
                adimAlert();
                }
          }
          for (int i = 0; i < 4; i++) inputCode[i] = '0';
        }
      }
      else if (key == '*') {  // 입력값 초기화
        lckClose();
        setLocked(true);
        doorOpen=false;
        Serial.println("close");
        for (int i = 0; i < 4; i++) inputCode[i] = '0'; 
        key = '\0'; // 입력된 '#' 삭제 - 오류방지
        position = 0;
      }
      else if(doorOpen==false&&key=='#'){
        
        cgPassword();
        if(mySerial.find(":")){
          String str= mySerial.readStringUntil('\n');
          str.remove(4);
          str.toCharArray(secretCode ,str.length()+1);
          Serial.println(secretCode);
          blink();
        }
        autoOpen();
        if(mySerial.find(":")){
          String str= mySerial.readStringUntil('\n');
          str.remove(1);
          Serial.println(str);
          blink();
          if(str.equals("0")){
            setLocked(false);
          }
        }
      }
    }
  }
}


//=============================================================================

void keypadEvent(KeypadEvent key){ // 키패드 이벤트 함수
 if(doorOpen==true) {   // 문 열린 상태에서 키패드 이벤트 진입
  switch (keypad.getState()){
    case RELEASED:
      switch (key){
        case '*': longPress = false;  // 비밀번호 변경코드 빠져나감
                  key = '\0'; // 입력된 '*' 삭제 - 오류방지
                  position = 0;
                  Serial.println("set pass out");
        break;
      }
    break;  // HOLD 종료
  }
    switch (keypad.getState()){
      case RELEASED:
        switch (key){
          case '#': longPress = true;  // 비밀번호 변경코드 진입
                    key = '\0'; // 입력된 '#' 삭제 - 오류방지
                    position = 0;
                    Serial.println("set pass in");
          break;
        }
      break;  // HOLD 종료
    }
  }
}

//=============================================================================

boolean setLocked(int locked){ // 잠금시와 해제시에 맞는 LED를 세팅해 주는 함수
  if(locked) { // 잠금시 Red LED를 켜주고, Green LED를 꺼준다.
  digitalWrite(redPin, HIGH);
  digitalWrite(greenPin, LOW);
    digitalWrite(sensor,LOW);
  }

  else{ // 해제시 Red LED를 꺼주고, Green LED를 켜준다.
    digitalWrite(redPin, LOW);
    digitalWrite(greenPin, HIGH);
    digitalWrite(sensor,HIGH);
  } 
}

void blink(){ // 비밀번호 4번 오류시 Red LED를 깜빡여 주는 함수.
  for(int i = 0; i < 8; i++){ // 딜레이 만큼 Red LED를 껐다 켰다 해준다. 총 8회
    digitalWrite(redPin, LOW);
    delay(100);
    digitalWrite(redPin, HIGH);
    delay(100);
  }
}

//=============================================================================

boolean connectWifi(){
   String cmd="AT+CWJAP=\"";  
   cmd+=ssid;  
   cmd+="\",\"";  
   cmd+=PASSWORD;  
   cmd+="\"";  
   mySerial.println(cmd);  
   Serial.println(cmd);  
   delay(5000);  
  if(mySerial.find("OK")) { 
    Serial.print("WIFI connect\n"); 
    blink();
    }
  else { 
    Serial.println("connect timeout\n"); 
    mySerial.println(cmd);
    Serial.println(cmd);
    delay(5000);
      if(mySerial.find("OK")) { 
        Serial.print("WIFI connect\n"); 
        blink();
        } else { 
           Serial.println("connect timeout\n"); 
        }
    } 
   delay(1000); 
 }

//=============================================================================
void lckOpen(){  
  Serial.println("connect TCP..."); 
     String cmd = "AT+CIPSTART=\"TCP\",\"";  
     cmd += host;  
     cmd += "\",80";  
     Serial.println(cmd);  
     mySerial.println(cmd);  
     if(mySerial.find("Error"))  
    {  
      Serial.println( "TCP connect error" );  
      return;  
    }  
   
  Serial.println("Send data..."); 
  cmd="GET /audOpen.php?\r\n"; 
  mySerial.print("AT+CIPSEND="); 
  mySerial.println(cmd.length());

  Serial.println(cmd); 
   
  if(mySerial.find(">")) { 
    Serial.print(">"); 
    }else { 
      mySerial.println("AT+CIPCLOSE"); 
      Serial.println("connect timeout"); 
      delay(1000); 
      return; 
      } 
       mySerial.print(cmd);  
       delay(2000);    
       Serial.println("====");
       delay(1000);
}

//-------------------------------------------------------------------------------

void lckClose(){  
  Serial.println("connect TCP..."); 
     String cmd = "AT+CIPSTART=\"TCP\",\"";  
     cmd += host;  
     cmd += "\",80";  
     Serial.println(cmd);  
     mySerial.println(cmd);  
     if(mySerial.find("Error"))  
    {  
      Serial.println( "TCP connect error" );  
      return;  
    }  
   
  Serial.println("Send data..."); 
  cmd="GET /audClose.php?\r\n"; 
  mySerial.print("AT+CIPSEND="); 
  mySerial.println(cmd.length());

  Serial.println(cmd); 
   
  if(mySerial.find(">")) { 
    Serial.print(">"); 
    }else { 
      mySerial.println("AT+CIPCLOSE"); 
      Serial.println("connect timeout"); 
      delay(1000); 
      return; 
      } 
       mySerial.print(cmd);  
       delay(2000);    
       while (Serial.available())  
       {  
         char c = Serial.read();  
         mySerial.write(c);  
         if(c=='\r') mySerial.print('\n');  
       }  
       Serial.println("====");  
       delay(1000);  
}    

//=============================================================================

void lckPassword(){ 
  Serial.println("connect TCP..."); 
     String cmd = "AT+CIPSTART=\"TCP\",\"";  
     cmd += host;  
     cmd += "\",80";  
     Serial.println(cmd);  
     mySerial.println(cmd);  
     if(mySerial.find("Error"))  
    {  
      Serial.println( "TCP connect error" );  
      return;  
    }  
   
  Serial.println("Send data..."); 
  cmd="GET /audPassword.php?pass="+pass+"\r\n"; 
  mySerial.print("AT+CIPSEND="); 
  mySerial.println(cmd.length());

  Serial.println(cmd); 
   
  if(mySerial.find(">")) { 
    Serial.print(">"); 
    }else { 
      mySerial.println("AT+CIPCLOSE"); 
      Serial.println("connect timeout"); 
      delay(1000); 
      return; 
      } 
       mySerial.print(cmd);  
       delay(2000);    
       while (Serial.available())  
       {  
         char c = Serial.read();  
         mySerial.write(c);  
         if(c=='\r') mySerial.print('\n');  
       }  
       Serial.println("====");  
       delay(1000);  
}

//----------------------------------------------------

void cgPassword(){
  Serial.println("connect TCP..."); 
     String cmd = "AT+CIPSTART=\"TCP\",\"";  
     cmd += host;  
     cmd += "\",80";  
     Serial.println(cmd);  
     mySerial.println(cmd);  
     if(mySerial.find("Error"))  
    {  
      Serial.println( "TCP connect error" );  
      return;  
    }  
   
  Serial.println("Send data..."); 
  cmd="GET /audCgPass.php?qwe=0202323\r\n"; 
  mySerial.print("AT+CIPSEND="); 
  mySerial.println(cmd.length());

  Serial.println(cmd); 
   
  if(mySerial.find(">")) { 
    Serial.print(">"); 
    }else { 
      mySerial.println("AT+CIPCLOSE"); 
      Serial.println("connect timeout"); 
      delay(1000); 
      return; 
      } 
       mySerial.print(cmd);  
       delay(2000);    
       while (Serial.available())  
       { 
         char c = Serial.read();  
         mySerial.write(c);  
         if(c=='\r') mySerial.print('\n');  
       }  
       Serial.println("====");
       delay(1000);
}

//----------------------------------------------------

void autoOpen(){
  Serial.println("connect TCP..."); 
     String cmd = "AT+CIPSTART=\"TCP\",\"";  
     cmd += host;  
     cmd += "\",80";  
     Serial.println(cmd);  
     mySerial.println(cmd);  
     if(mySerial.find("Error"))  
    {  
      Serial.println( "TCP connect error" );  
      return;  
    }  
   
  Serial.println("Send data..."); 
  cmd="GET /audAutoOpen.php?qwe=0202323\r\n"; 
  mySerial.print("AT+CIPSEND="); 
  mySerial.println(cmd.length());

  Serial.println(cmd); 
   
  if(mySerial.find(">")) { 
    Serial.print(">"); 
    }else { 
      mySerial.println("AT+CIPCLOSE"); 
      Serial.println("connect timeout"); 
      delay(1000); 
      return; 
      } 
       mySerial.print(cmd);  
       delay(2000);    
       while (Serial.available())  
       { 
         char c = Serial.read();  
         mySerial.write(c);  
         if(c=='\r') mySerial.print('\n');  
       }  
       Serial.println("====");
       delay(1000);

}

//----------------------------------------------------
  
void userAlert(){
  Serial.println("connect TCP..."); 
     String cmd = "AT+CIPSTART=\"TCP\",\"";  
     cmd += host;  
     cmd += "\",80";  
     Serial.println(cmd);  
     mySerial.println(cmd);  
     if(mySerial.find("Error"))  
    {  
      Serial.println( "TCP connect error" );  
      return;  
    }  
   
  Serial.println("Send data..."); 
  cmd="GET /audnotice.php?qwe=0202323&zxc=1\r\n"; 
  mySerial.print("AT+CIPSEND="); 
  mySerial.println(cmd.length());

  Serial.println(cmd); 
   
  if(mySerial.find(">")) { 
    Serial.print(">"); 
    }else { 
      mySerial.println("AT+CIPCLOSE"); 
      Serial.println("connect timeout"); 
      delay(1000); 
      return; 
      } 
       mySerial.print(cmd);  
       delay(2000);    
       while (Serial.available())  
       { 
         char c = Serial.read();  
         mySerial.write(c);  
         if(c=='\r') mySerial.print('\n');  
       }  
       Serial.println("====");
       delay(1000);
  
}

//----------------------------------------------------
  
void adimAlert(){
  Serial.println("connect TCP..."); 
     String cmd = "AT+CIPSTART=\"TCP\",\"";  
     cmd += host;  
     cmd += "\",80";  
     Serial.println(cmd);  
     mySerial.println(cmd);  
     if(mySerial.find("Error"))  
    {  
      Serial.println( "TCP connect error" );  
      return;  
    }  
   
  Serial.println("Send data..."); 
  cmd="GET /audnotice.php?qwe=0202323&zxc=2\r\n"; 
  mySerial.print("AT+CIPSEND="); 
  mySerial.println(cmd.length());

  Serial.println(cmd); 
   
  if(mySerial.find(">")) { 
    Serial.print(">"); 
    }else { 
      mySerial.println("AT+CIPCLOSE"); 
      Serial.println("connect timeout"); 
      delay(1000); 
      return; 
      } 
       mySerial.print(cmd);  
       delay(2000);    
       while (Serial.available())  
       { 
         char c = Serial.read();  
         mySerial.write(c);  
         if(c=='\r') mySerial.print('\n');  
       }  
       Serial.println("====");
       delay(1000);
  
}

//----------------------------------------------------

void notreset(){
  Serial.println("connect TCP..."); 
     String cmd = "AT+CIPSTART=\"TCP\",\"";  
     cmd += host;  
     cmd += "\",80";  
     Serial.println(cmd);  
     mySerial.println(cmd);  
     if(mySerial.find("Error"))  
    {  
      Serial.println( "TCP connect error" );  
      return;  
    }  
   
  Serial.println("Send data..."); 
  cmd="GET /audnotice.php?qwe=0202323&zxc=0\r\n"; 
  mySerial.print("AT+CIPSEND="); 
  mySerial.println(cmd.length());

  Serial.println(cmd); 
   
  if(mySerial.find(">")) { 
    Serial.print(">"); 
    }else { 
      mySerial.println("AT+CIPCLOSE"); 
      Serial.println("connect timeout"); 
      delay(1000); 
      return; 
      } 
       mySerial.print(cmd);  
       delay(2000);    
       while (Serial.available())  
       { 
         char c = Serial.read();  
         mySerial.write(c);  
         if(c=='\r') mySerial.print('\n');  
       }  
       Serial.println("====");
       delay(1000);
  
}
      
