# Gamers-Paradise

## 🗒️About

• Making a Gesture-controlled 2D Car Racing game using phaser.js

• Implementing stearing control using hand gestures with help of OpenCv library of Python


## 👨‍💻 Tech-Stack

<p>
<image src="assets_Readme/html-1.svg" width=30 title="Html">
<image src="assets_Readme/css-3.svg" width=30 title="CSS">
<image src="assets_Readme/javascript-1.svg" width=30 title="Javascript">
<image src="assets_Readme/phaser.png" width=42 title="Phaser">
<image src="assets_Readme/python-5.svg" width=35 title="python">
<image src="assets_Readme/opencv.png" width=28 title="opencv">
</p>


## 🏅 Team Members

- Parth Shirole
- Aryaman Shardul
- Rishabh Bali
- Kunal Agarwal
 
  
  
  ## Demo of the game



https://user-images.githubusercontent.com/81592570/146214263-dfd22969-75af-4e91-a78e-102664125066.mp4




## Controlling the game using hand detection 
  
  
  

https://user-images.githubusercontent.com/81592570/146202672-1971c43b-1c81-4498-a553-87b6c22c8a72.mp4

We have mapped the controls of the car to the W,A,S,D keys on the keyboard so by using these virtual keys we can control the car .
  We are using Mediapipe hand detection model under hood for hand detection . 
  
  
  ![hand_landmarks](https://user-images.githubusercontent.com/81592570/146204032-e8524d4c-97db-461f-9d6e-6018c3275de2.png)

  ### Prerequisites to run the opencv code
  Mediapipe and Opencv Must be installed 
  The commands for installation are pip install cv2
                                    pip install mediapipe
  In the code there is a part to capture the live stream Videocapture(n) here the index n is by default 0 for most machines but if the webcam doesn't work with 0 you can try 1,-1,0 and so on . 

  
  
  
