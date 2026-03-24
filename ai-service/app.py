# import streamlit as st
# import tensorflow as tf
# from PIL import Image
# import numpy as np
# from tensorflow.keras import layers, models, Input
# from tensorflow.keras.applications import EfficientNetB4

# st.set_page_config(page_title="Farmlink 3-Class AI", layout="centered")

# @st.cache_resource
# def load_balanced_model():
#     IMG_SIZE = 224
#     try:
#         # Rebuild the 3-Class Skeleton
#         base = EfficientNetB4(weights=None, include_top=False, input_shape=(IMG_SIZE, IMG_SIZE, 3))
#         inputs = Input(shape=(IMG_SIZE, IMG_SIZE, 3))
#         x = base(inputs, training=False) 
#         x = layers.GlobalAveragePooling2D()(x)
#         x = layers.BatchNormalization()(x)
#         x = layers.Dense(256, activation="relu")(x)
#         x = layers.Dropout(0.4)(x)
#         # 3 Output nodes for our perfectly balanced classes
#         outputs = layers.Dense(3, activation="softmax")(x) 
        
#         full_model = models.Model(inputs, outputs)
        
#         # Load the perfectly balanced weights!
#         full_model.load_weights("farmlink_perfect_balance.weights.h5")
#         return full_model
#     except Exception as e:
#         st.error(f"❌ Loading Error: {e}")
#         return None

# model = load_balanced_model()
# CLASS_NAMES = ['Chalky', 'Discolored', 'Premium']

# st.title("🌾 Farmlink Quality Analyzer (Perfect Balance)")

# uploaded_file = st.sidebar.file_uploader("Upload Rice Image", type=["jpg", "png", "jpeg"])

# if uploaded_file:
#     image = Image.open(uploaded_file).convert('RGB')
#     st.image(image, width=700)
    
#     if model:
#         with st.spinner("Classifying..."):
#             img = image.resize((224, 224))
#             img_array = np.array(img).astype('float32')
            
#             # EfficientNet preprocessing
#             img_array = tf.keras.applications.efficientnet.preprocess_input(img_array)
#             img_array = np.expand_dims(img_array, axis=0)
            
#             preds = model.predict(img_array)
#             idx = np.argmax(preds[0])
#             label = CLASS_NAMES[idx]
#             conf = preds[0][idx] * 100

#         st.divider()
#         st.subheader(f"Result: {label}")
#         st.write(f"**Confidence Score:** {conf:.2f}%")

#         with st.expander("View Probability Breakdown"):
#             for i, name in enumerate(CLASS_NAMES):
#                 st.write(f"{name}: {preds[0][i]*100:.1f}%")

from fastapi import FastAPI, UploadFile, File
import tensorflow as tf
from PIL import Image
import numpy as np
import io
from tensorflow.keras import layers, models, Input
from tensorflow.keras.applications import EfficientNetB4

app = FastAPI()

# --- REUSE YOUR EXACT MODEL LOGIC ---
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
    
    # Preprocessing (Identical to your app.py)
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