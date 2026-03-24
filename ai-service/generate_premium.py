import cv2
import numpy as np
import os
import random
from PIL import Image, ImageEnhance, ImageFilter

# Configuration
INPUT_FOLDER = "input_grains"
OUTPUT_FOLDER = "output_premium"
NUM_OUTPUT_IMAGES = 30 # Generate 30 dense synthetic images per variety
CANVAS_SIZE = (224, 224)

def extract_grain(image_path):
    """Isolates the rice grain from the black background."""
    img = cv2.imread(image_path)
    if img is None: return None
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 30, 255, cv2.THRESH_BINARY)
    
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours: return None
    
    largest_contour = max(contours, key=cv2.contourArea)
    x, y, w, h = cv2.boundingRect(largest_contour)
    
    grain_crop = img[y:y+h, x:x+w]
    mask = thresh[y:y+h, x:x+w]
    
    b, g, r = cv2.split(grain_crop)
    rgba = [b, g, r, mask]
    grain_transparent = cv2.merge(rgba, 4)
    
    grain_pil = Image.fromarray(cv2.cvtColor(grain_transparent, cv2.COLOR_BGRA2RGBA))
    return grain_pil

def create_synthetic_pile(grains_pool, output_path):
    """Creates a dense, realistic pile of overlapping grains."""
    # Create the blank blue canvas
    canvas = Image.new('RGB', CANVAS_SIZE, color=(95, 160, 215))
    
    # 🚨 MASSIVE DENSITY INCREASE: 150 to 250 grains per image!
    num_grains = random.randint(150, 250)
    
    for _ in range(num_grains):
        grain = random.choice(grains_pool)
        
        # 1. Random Rotation
        angle = random.randint(0, 360)
        rotated_grain = grain.rotate(angle, expand=True)
        
        # 2. Lighting & Depth (Makes bottom grains look darker, top grains brighter)
        enhancer = ImageEnhance.Brightness(rotated_grain)
        brightness_factor = random.uniform(0.75, 1.15)
        rotated_grain = enhancer.enhance(brightness_factor)
        
        # 3. Scale and Size
        scale = random.uniform(0.25, 0.45) 
        new_w = int(rotated_grain.width * scale)
        new_h = int(rotated_grain.height * scale)
        resized_grain = rotated_grain.resize((new_w, new_h))
        
        # 4. Dense Placement (Allowing them to spill off the edges)
        paste_x = random.randint(-new_w, CANVAS_SIZE[0])
        paste_y = random.randint(-new_h, CANVAS_SIZE[1])
        
        # Paste overlapping the previous grains
        canvas.paste(resized_grain, (paste_x, paste_y), resized_grain)
        
    # 5. Camera Lens Realism (Slight blur to blend the sharp edges together)
    canvas = canvas.filter(ImageFilter.GaussianBlur(radius=0.4))
    
    canvas.save(output_path)

def main():
    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)
        
    print("Extracting grains from input images...")
    extracted_grains = []
    for filename in os.listdir(INPUT_FOLDER):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(INPUT_FOLDER, filename)
            grain = extract_grain(filepath)
            if grain:
                extracted_grains.append(grain)
                
    if not extracted_grains:
        print("No valid grains extracted. Check your input folder.")
        return

    print(f"Generating {NUM_OUTPUT_IMAGES} highly dense synthetic piles...")
    for i in range(NUM_OUTPUT_IMAGES):
        output_filename = f"karacadag_dense_synth_{i:03d}.jpg"
        output_path = os.path.join(OUTPUT_FOLDER, output_filename)
        create_synthetic_pile(extracted_grains, output_path)
        
    print(f"Done! Check the '{OUTPUT_FOLDER}' directory for the new realistic piles.")

if __name__ == "__main__":
    main()