from darkflow.net.build import TFNet
import cv2, json, asyncio, requests, pytesseract
import numpy as np

model_path = "cfg/yolo.cfg"
weights_path = "bin/yolo.weights"
webAddress = 'http://192.168.137.213:8000'
cap = cv2.VideoCapture(0)
options = {"model": model_path, "load": weights_path, "threshold": 0.5, "gpu": 1.0}
tfnet = TFNet(options)
config = ('--psm 10 --oem 3 -c tessedit_char_whitelist=0123456789')


isDrawing = False
def main():    
    # Check if camera opened successfully
    if (cap.isOpened()== False): 
        print("Error opening video stream or file")
    
    # Read until video is completed
    while(cap.isOpened()):
        if not isDrawing:
            loop = asyncio.get_event_loop()
            loop.run_until_complete(frameLoop())
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break

    # When everything done, release the video capture object
    cap.release()
    
    # Closes all the frames
    cv2.destroyAllWindows()

async def frameLoop():
    isDrawing = True
    # Capture frame-by-frame
    ret, frame = cap.read()
    if ret == True:
        ret, frame = cap.read()
        result = tfnet.return_predict(frame)
        labels  = []
        for obj in result:
            topleftTuple = obj.get("topleft")
            bottomrightTuple = obj.get("bottomright")
            date = pytesseract.image_to_string(frame[topleftTuple.get("y"):bottomrightTuple.get("y"), topleftTuple.get("x"):bottomrightTuple.get("x")], config=config)
            labels.append(obj.get("label")+"-"+date)
            cv2.putText(frame, obj.get("label"), (topleftTuple.get("x"),topleftTuple.get("y")), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0))
            cv2.rectangle(frame, (topleftTuple.get("x"), topleftTuple.get("y")), (bottomrightTuple.get("x"), bottomrightTuple.get("y")), (0,255,0), 1)
        cv2.imshow('Frame',cv2.resize(frame,None,fx=2,fy=2))
        data = {'foods' : labels}
        print(data)
        r = requests.post(webAddress+"/addedFood", data = data)
    isDrawing = False
   

if __name__ == '__main__':
    main()