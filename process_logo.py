import os
from PIL import Image

src_path = r'c:\Users\mohma\OneDrive\Desktop\stitch_lamsat_emaar_renovation_decor\_8\screen.png'
public_dir = r'c:\Users\mohma\OneDrive\Desktop\stitch_lamsat_emaar_renovation_decor\public'
os.makedirs(public_dir, exist_ok=True)

img = Image.open(src_path).convert('RGBA')
width, height = img.size
pixels = img.load()

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # Check if the pixel is part of gray-white checkerboard grid
        diff = max(abs(r - g), abs(g - b), abs(r - b))
        brightness = (r + g + b) / 3.0
        
        # Transparent background for gray/white grid
        if diff < 20 and brightness > 140:
            pixels[x, y] = (0, 0, 0, 0)

# Find bounding box of remaining non-transparent pixels
bbox = img.getbbox()
if bbox:
    img_cropped = img.crop(bbox)
else:
    img_cropped = img

# Save clean logo PNG
out_path = os.path.join(public_dir, 'logo.png')
img_cropped.save(out_path, 'PNG')
print(f"Saved transparent logo to {out_path} with size {img_cropped.size}")
