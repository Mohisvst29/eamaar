import os
import shutil
import glob

brain_dir = r'C:\Users\mohma\.gemini\antigravity-ide\brain\385e7720-2ad7-4879-ac3f-59e8decc6561'
public_img_dir = r'c:\Users\mohma\OneDrive\Desktop\stitch_lamsat_emaar_renovation_decor\public\images'

os.makedirs(public_img_dir, exist_ok=True)

for jpg in glob.glob(os.path.join(brain_dir, '*.jpg')):
    filename = os.path.basename(jpg)
    dest = os.path.join(public_img_dir, filename)
    shutil.copy(jpg, dest)
    print(f"Copied {filename} to public/images/")

print("Finished copying images.")
