#!/usr/bin/env python3
"""
ZMK Agency logo pipeline.
Source PNGs (white/blue mark on pure black) come from ~/Downloads/ZMK.
"Screen over black" unblend: alpha = max(R,G,B), color = color/alpha.
Produces transparent logos, favicons, manifest icons and the OG image.
"""
import os
from PIL import Image

SRC = os.path.expanduser("~/Downloads/ZMK")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "src", "assets")
PUBLIC = os.path.join(ROOT, "public")

HORIZONTAL = os.path.join(SRC, "ChatGPT Image 2 Haz 2026 10_46_22.png")
STACKED = os.path.join(SRC, "ChatGPT Image 2 Haz 2026 10_44_19.png")
CIRCLE = os.path.join(SRC, "ChatGPT Image 2 Haz 2026 11_03_21.png")


NOISE_FLOOR = 16  # AI-generated blacks carry sensor-like noise; crush it to true transparent


def unblend_from_black(img):
    """Reconstruct alpha for artwork composited on pure black."""
    img = img.convert("RGB")
    px = img.load()
    out = Image.new("RGBA", img.size)
    po = out.load()
    w, h = img.size
    scale = 255 / (255 - NOISE_FLOOR)
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            a = max(r, g, b)
            if a <= NOISE_FLOOR:
                po[x, y] = (0, 0, 0, 0)
            else:
                a = min(255, round((a - NOISE_FLOOR) * scale))
                po[x, y] = (
                    min(255, r * 255 // max(a, 1)),
                    min(255, g * 255 // max(a, 1)),
                    min(255, b * 255 // max(a, 1)),
                    a,
                )
    return out


def trim(img, threshold=10, pad_ratio=0.04):
    """Crop to alpha bounding box with proportional padding."""
    alpha = img.getchannel("A").point(lambda a: 255 if a > threshold else 0)
    bbox = alpha.getbbox()
    if not bbox:
        return img
    pad = int(max(bbox[2] - bbox[0], bbox[3] - bbox[1]) * pad_ratio)
    l = max(0, bbox[0] - pad)
    t = max(0, bbox[1] - pad)
    r = min(img.width, bbox[2] + pad)
    b = min(img.height, bbox[3] + pad)
    return img.crop((l, t, r, b))


def resize_w(img, width):
    h = round(img.height * width / img.width)
    return img.resize((width, h), Image.LANCZOS)


def on_black(img, size, scale=0.86):
    """Center artwork on a solid black square canvas."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 255))
    target = int(size * scale)
    ratio = min(target / img.width, target / img.height)
    art = img.resize((max(1, int(img.width * ratio)), max(1, int(img.height * ratio))), Image.LANCZOS)
    canvas.alpha_composite(art, ((size - art.width) // 2, (size - art.height) // 2))
    return canvas


horizontal = trim(unblend_from_black(Image.open(HORIZONTAL)))
stacked = trim(unblend_from_black(Image.open(STACKED)))
circle = trim(unblend_from_black(Image.open(CIRCLE)), pad_ratio=0.02)

# — App assets (transparent) —
resize_w(horizontal, 920).save(os.path.join(ASSETS, "zmk-logo-horizontal.png"), optimize=True)
resize_w(stacked, 800).save(os.path.join(ASSETS, "zmk-logo-stacked.png"), optimize=True)

# — public/logo.png — schema.org logo, stacked mark on black —
on_black(stacked, 1024, scale=0.8).convert("RGB").save(os.path.join(PUBLIC, "logo.png"), optimize=True)

# — OG image 1200x630, stacked logo centered on black —
og = Image.new("RGB", (1200, 630), (0, 0, 0))
ratio = min(900 / stacked.width, 470 / stacked.height)
art = stacked.resize((int(stacked.width * ratio), int(stacked.height * ratio)), Image.LANCZOS)
og.paste(art, ((1200 - art.width) // 2, (630 - art.height) // 2), art)
og.save(os.path.join(PUBLIC, "og-image.jpg"), quality=92, optimize=True)

# — Favicons from gradient-ring icon —
sq = Image.new("RGBA", (max(circle.size),) * 2, (0, 0, 0, 0))
sq.alpha_composite(circle, ((sq.width - circle.width) // 2, (sq.height - circle.height) // 2))

sq.resize((96, 96), Image.LANCZOS).save(os.path.join(PUBLIC, "favicon-96x96.png"), optimize=True)
sq.resize((64, 64), Image.LANCZOS).save(os.path.join(PUBLIC, "favicon.png"), optimize=True)
sq.resize((48, 48), Image.LANCZOS).save(
    os.path.join(PUBLIC, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)]
)
on_black(sq, 180, scale=0.92).convert("RGB").save(os.path.join(PUBLIC, "apple-touch-icon.png"), optimize=True)
on_black(sq, 192, scale=0.88).save(os.path.join(PUBLIC, "web-app-manifest-192x192.png"), optimize=True)
on_black(sq, 512, scale=0.88).save(os.path.join(PUBLIC, "web-app-manifest-512x512.png"), optimize=True)

# — SVG favicon wrapping the PNG (keeps index.html <link> working) —
import base64
with open(os.path.join(PUBLIC, "favicon.png"), "rb") as f:
    b64 = base64.b64encode(f.read()).decode()
svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">'
    f'<image href="data:image/png;base64,{b64}" width="64" height="64"/></svg>'
)
with open(os.path.join(PUBLIC, "favicon.svg"), "w") as f:
    f.write(svg)

for name in ["zmk-logo-horizontal.png", "zmk-logo-stacked.png"]:
    p = os.path.join(ASSETS, name)
    print(f"{name}: {Image.open(p).size}, {os.path.getsize(p)//1024} KB")
print("public assets written: logo.png, og-image.jpg, favicons, manifest icons")
