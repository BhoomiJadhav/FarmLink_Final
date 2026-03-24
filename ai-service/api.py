from fastapi import FastAPI, UploadFile, File
import tensorflow as tf
from PIL import Image
import numpy as np
import io
from tensorflow.keras import layers, models, Input
from tensorflow.keras.applications import EfficientNetB4

app = FastAPI()

# Exact Model Rebuild from your app.py
IMG_SIZE = 224
CLASS_NAMES = ['Chalky', 'Discolored', 'Premium']

def load_balanced_model():
    base = EfficientNetB4(weights=None, include_top=False, input_shape=(IMG_SIZE, IMG_SIZE, 3))
    inputs = Input(shape=(IMG_SIZE, IMG_SIZE, 3))
    x = base(inputs, training=False) 
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.BatchNormalization()(x)
    x = layers.Dense(256, activation="relu")(x)
    x = layers.Dropout(0.4)(x)
    outputs = layers.Dense(3, activation="softmax")(x) 
    full_model = models.Model(inputs, outputs)
    full_model.load_weights("farmlink_perfect_balance.weights.h5")
    return full_model

model = load_balanced_model()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read the uploaded image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert('RGB')
    
    # Preprocessing (Exact same as your Streamlit app)
    img = image.resize((224, 224))
    img_array = np.array(img).astype('float32')
    img_array = tf.keras.applications.efficientnet.preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)
    
    # Prediction
    preds = model.predict(img_array)
    idx = np.argmax(preds[0])
    
    return {
        "label": CLASS_NAMES[idx],
        "confidence": float(preds[0][idx] * 100),
        "breakdown": {name: float(preds[0][i] * 100) for i, name in enumerate(CLASS_NAMES)}
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)