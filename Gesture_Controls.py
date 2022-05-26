# Import the necessary libraries
import cv2
import cvzone
from cvzone.HandTrackingModule import HandDetector
from pynput.keyboard import Controller

# Capture the video and set assign values to properties of VideoCapture
cap = cv2.VideoCapture(0)
cap.set(3, 400)
cap.set(4, 400)


detector = HandDetector(detectionCon=1)
keyboard = Controller()

# Repeat the process in the loop as long as the camera is on
while True:
    success, img = cap.read()
    
# findHands takes an RGB image as input and detects the hands and the points on it in the frame
    img = detector.findHands(img)
    
# findPosition returns the position of the hand along with the id
    lmList, bboxInfo = detector.findPosition(img)
    if lmList:
        
# Calculate the distance between the thumb(4) and index finger(8)
        l, _, _ = detector.findDistance(4,8, img, draw=False)
        

# If the distance is less than 35, then release "D" and press "A"
        if l < 30:
            keyboard.release("D")
            keyboard.press("A")
            print("A")
            
# If the distance is greater than or equal to 35, then release "A" and press "D"       
        elif l >= 30:
            keyboard.release("A")
            keyboard.press("D")
            print("D ")
        


        
    cv2.imshow("output", img)
    cv2.waitKey(1)
