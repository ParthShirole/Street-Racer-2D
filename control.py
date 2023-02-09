import cv2
import cvzone
from cvzone.HandTrackingModule import HandDetector
from time import sleep
import numpy as np
from pynput.keyboard import Controller

cap = cv2.VideoCapture(0)
cap.set(3, 400)
cap.set(4, 400)


detector = HandDetector(detectionCon=1)
keyboard = Controller()

while True:
    success, img = cap.read()
    img = detector.findHands(img)
    lmList, bboxInfo = detector.findPosition(img)
    
    if lmList:
        l, _, _ = detector.findDistance(4,8, img, draw=False)
        
        
        if l < 25:
            keyboard.release("D")
            keyboard.press("A")
           
            print("A")
        
        elif l >= 25:
            keyboard.release("A")
            keyboard.press("D")
            print("D")
        
        

    # cv2.rectangle(img, (25,350), (700, 450),
    #               (255, 255, 255), cv2.FILLED)
    #cv2.putText(img, final_text, (60, 425),
               # cv2.FONT_HERSHEY_PLAIN, 4, (0, 0, 0), 4)

    cv2.imshow("output", img)
    cv2.waitKey(1)