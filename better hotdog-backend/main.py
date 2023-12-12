import tensorflow as tf
import uvicorn
import json 
import numpy as np
from fastapi import FastAPI, File, UploadFile
from io import BytesIO
import os


app = FastAPI()


def process_image(image):
    img = tf.keras.preprocessing.image.load_img(image, target_size=(300,300))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    return img_array

def predict(img):
    model = tf.keras.models.load_model("model_after.keras")
    predict = model.predict(img)
    return predict


@app.post("/")
def create_upload_file(file: UploadFile):
    img = process_image(BytesIO(file.file.read()))
    predictions = 1 - predict(img/255)
    precentage = predictions[0][0].item()
    return {"prediction" : precentage}

@app.get("/")
def welcome():
    return("Welcome to not hotdog")

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))