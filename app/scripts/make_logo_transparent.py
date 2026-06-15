"""Make the ELEV8 logo's black background transparent.

The artwork is light (white/silver) line-art on a solid black background, so we
derive an alpha channel from per-pixel luminance: pure black -> fully
transparent, bright artwork -> fully opaque. A small black floor and contrast
curve keep faint compression noise in the background from showing up as a haze.
"""
from PIL import Image

SRC = "src/Logo/ELEV_MEDIA.png"
DST = "src/Logo/ELEV_MEDIA.png"

# Pixels at or below this luminance become fully transparent; the alpha then
# ramps up to fully opaque at FULL. This crushes background noise while keeping
# the silver gradients on the artwork intact.
FLOOR = 18
FULL = 90

img = Image.open(SRC).convert("RGBA")
px = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
        if lum <= FLOOR:
            a = 0
        elif lum >= FULL:
            a = 255
        else:
            a = round((lum - FLOOR) / (FULL - FLOOR) * 255)
        px[x, y] = (r, g, b, a)

img.save(DST)
print(f"Saved transparent logo: {w}x{h}")
