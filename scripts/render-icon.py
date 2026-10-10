#!/usr/bin/env python3
"""Redraw the Puttriot app icon as a crisp SVG.

The supplied artwork is a flat illustration: a short white pole in a dark
hole, a waving US flag, and wavy putting-green contour bands. This script
reconstructs that mark so the site can use it as a logo and favicon.
"""

import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "icon.svg"
CONTOURS = ROOT / "assets" / "contours.svg"

# Palette lifted from the icon.
GRASS = "#B4D15E"
BAND = "#6F9A3C"
HOLE = "#10182E"
RED = "#E23D3A"
BLUE = "#1B3D86"
WHITE = "#FFFFFF"

SIZE = 1024


def catmull_closed(pts):
    n = len(pts)
    cmds = [f"M {pts[0][0]:.2f} {pts[0][1]:.2f}"]
    for i in range(n):
        p0 = pts[(i - 1) % n]
        p1 = pts[i]
        p2 = pts[(i + 1) % n]
        p3 = pts[(i + 2) % n]
        c1x = p1[0] + (p2[0] - p0[0]) / 6
        c1y = p1[1] + (p2[1] - p0[1]) / 6
        c2x = p2[0] - (p3[0] - p1[0]) / 6
        c2y = p2[1] - (p3[1] - p1[1]) / 6
        cmds.append(
            f"C {c1x:.2f} {c1y:.2f} {c2x:.2f} {c2y:.2f} {p2[0]:.2f} {p2[1]:.2f}"
        )
    cmds.append("Z")
    return " ".join(cmds)


def contour(cx, cy, rx, ry, wobble, phase, n=96):
    pts = []
    for i in range(n):
        t = 2 * math.pi * i / n
        w = 1 + wobble * (
            0.72 * math.sin(2 * t + phase)
            + 0.38 * math.sin(3 * t - phase * 1.4)
            + 0.16 * math.sin(5 * t + phase * 0.6)
        )
        pts.append((cx + math.cos(t) * rx * w, cy + math.sin(t) * ry * w))
    return catmull_closed(pts)


def wave(x, y, bounds):
    x0, x1, y0, y1 = bounds
    tx = (x - x0) / (x1 - x0)
    ty = (y - y0) / (y1 - y0)
    # Hoist stays put. The fly does the waving.
    env = tx ** 1.05
    dy = math.sin(tx * math.pi * 1.15 + 0.35) * 34 * env
    dy += math.sin(tx * math.pi * 2.15 + 0.4) * 7 * env
    dx = math.sin((ty - 0.08) * math.pi) * 26 * (tx ** 1.4)
    return x + dx, y + dy


def ribbon(x0, x1, y_a, y_b, bounds, samples=36):
    top = []
    bot = []
    for i in range(samples + 1):
        x = x0 + (x1 - x0) * i / samples
        top.append(wave(x, y_a, bounds))
        bot.append(wave(x, y_b, bounds))
    cmds = [f"M {top[0][0]:.2f} {top[0][1]:.2f}"]
    for px, py in top[1:]:
        cmds.append(f"L {px:.2f} {py:.2f}")
    for px, py in reversed(bot):
        cmds.append(f"L {px:.2f} {py:.2f}")
    cmds.append("Z")
    return " ".join(cmds)


def star(cx, cy, r, rot=-math.pi / 2):
    pts = []
    for i in range(10):
        ang = rot + i * math.pi / 5
        rad = r if i % 2 == 0 else r * 0.4
        pts.append((cx + rad * math.cos(ang), cy + rad * math.sin(ang)))
    cmds = [f"M {pts[0][0]:.2f} {pts[0][1]:.2f}"]
    for px, py in pts[1:]:
        cmds.append(f"L {px:.2f} {py:.2f}")
    cmds.append("Z")
    return " ".join(cmds)


def build():
    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" role="img">',
        "<title>Puttriot</title>",
        f'<rect width="{SIZE}" height="{SIZE}" fill="{GRASS}"/>',
        f'<g fill="none" stroke="{BAND}" stroke-linecap="round" stroke-linejoin="round">',
    ]

    # Contours radiate from the cup and bleed off the canvas, like the icon.
    hole = (512, 608)
    rings = [
        (150, 108, 0, 4, 48, 0.05, 0.5),
        (268, 190, 14, -8, 62, 0.046, 1.35),
        (400, 286, -18, 14, 74, 0.04, 2.15),
        (548, 392, 20, -4, 86, 0.034, 0.2),
        (720, 516, -6, 18, 98, 0.028, 1.55),
        (920, 660, 12, 6, 110, 0.024, 2.6),
    ]
    for rx, ry, dx, dy, sw, wob, phase in rings:
        d = contour(hole[0] + dx, hole[1] + dy, rx, ry, wob, phase)
        parts.append(f'<path d="{d}" stroke-width="{sw}"/>')
    parts.append("</g>")

    # Short white pole. The cup is drawn later so the pole reads as planted.
    pole_w = 16
    pole_x = hole[0]
    flag_w = 292
    flag_h = 162
    flag_left = pole_x + pole_w / 2 - 1
    flag_top = 268
    flag_right = flag_left + flag_w
    flag_bot = flag_top + flag_h
    bounds = (flag_left, flag_right, flag_top, flag_bot)

    # Tuck the pole under the hoist so the stick meets the cloth.
    pole_top = flag_bot - 28
    parts.append(
        f'<rect x="{pole_x - pole_w / 2:.1f}" y="{pole_top}" width="{pole_w}" '
        f'height="{hole[1] - pole_top}" fill="{WHITE}"/>'
    )

    stripes = 5
    canton_stripes = 2
    for i in range(stripes):
        y0 = flag_top + flag_h * i / stripes
        y1 = flag_top + flag_h * (i + 1) / stripes
        color = RED if i % 2 == 0 else WHITE
        d = ribbon(flag_left, flag_right, y0, y1, bounds)
        parts.append(f'<path d="{d}" fill="{color}"/>')

    canton_h = flag_h * canton_stripes / stripes
    canton_w = flag_w * 0.46
    d = ribbon(flag_left, flag_left + canton_w, flag_top, flag_top + canton_h, bounds)
    parts.append(f'<path d="{d}" fill="{BLUE}"/>')

    # 13 stars, 4 / 5 / 4, the original colonies, sitting in the canton.
    rows = (4, 5, 4)
    pad_x = canton_w * 0.12
    pad_y = canton_h * 0.14
    inner_w = canton_w - pad_x * 2
    inner_h = canton_h - pad_y * 2
    star_r = 11.5
    for r, count in enumerate(rows):
        cy = flag_top + pad_y + inner_h * (r + 0.5) / len(rows)
        for c in range(count):
            cx = flag_left + pad_x + inner_w * (c + 0.5) / count
            sx, sy = wave(cx, cy, bounds)
            nx, ny = wave(cx + 8, cy, bounds)
            rot = math.atan2(ny - sy, nx - sx)
            parts.append(f'<path d="{star(sx, sy, star_r, rot - math.pi / 2)}" fill="{WHITE}"/>')

    parts.append(
        f'<ellipse cx="{hole[0]}" cy="{hole[1]}" rx="50" ry="46" fill="{HOLE}"/>'
    )
    parts.append("</svg>")
    return "\n".join(parts) + "\n"


def build_contours():
    """Transparent contour field for the hero, same language as the icon."""
    rings = [
        (150, 110, 0.05, 0.4, 34),
        (250, 180, 0.045, 1.2, 46),
        (370, 260, 0.038, 2.1, 58),
        (510, 360, 0.032, 0.3, 70),
        (670, 470, 0.026, 1.5, 82),
    ]
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" fill="none">',
        f'<g stroke="{BAND}" stroke-linecap="round" stroke-linejoin="round" fill="none">',
    ]
    for rx, ry, wob, phase, sw in rings:
        d = contour(430, 480, rx, ry, wob, phase, n=80)
        parts.append(f'<path d="{d}" stroke-width="{sw}"/>')
    parts.append("</g></svg>")
    return "\n".join(parts) + "\n"


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(build())
    CONTOURS.write_text(build_contours())
    print(OUT)
    print(CONTOURS)


if __name__ == "__main__":
    main()
