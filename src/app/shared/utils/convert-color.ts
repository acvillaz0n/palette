import { Color } from '@model/color';

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const rgbaToHex = (color: Color): string => {
  return `#${decimalColorToHex(color.r)}${decimalColorToHex(
    color.g
  )}${decimalColorToHex(color.b)}`;
};

export const decimalColorToHex = (color: number): string => {
  return color.toString(16).padStart(2, '0');
};

export const rgbToHsl = ({ r, g, b }: Color) => {
  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let s,
    l = (max + min) / 2;
  let h = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6; // Ajustar el matiz
  }

  return [h * 360, s, l];
};

export const hslToHex = (h: number, s: number, l: number) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = function (p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h / 360 + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, h / 360 - 1 / 3);
  }

  return `#${Math.round(r * 255)
    .toString(16)
    .padStart(2, '0')}${Math.round(g * 255)
    .toString(16)
    .padStart(2, '0')}${Math.round(b * 255)
    .toString(16)
    .padStart(2, '0')}`;
};
