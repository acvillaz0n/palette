import {
  hslToHex,
  rgbaToHex,
  rgbToHex,
  rgbToHsl,
} from '@shared/utils/convert-color';
import { Color } from './color';

export enum PaletteDefinitions{
    ANALOG='analogColors',
    MONOCHROMATIC='monochromaticColors',
    COMPLENTARY='complementaryColors',
    TRIAD='triadColors',
    TETRADIAD='tetradicColors',
}

export class PaletteBuilder {
  analogColors(colorRGB: Color, steps = 5) {
    const hslColor = rgbToHsl(colorRGB);

    const hexColor = rgbToHex(colorRGB.r, colorRGB.g, colorRGB.b);
    const analogColors = [hexColor];
    for (let index = 1; index <= steps; index++) {
      analogColors.push(
        hslToHex(hslColor[0] + 30 * index, hslColor[1], hslColor[2])
      );
    }
    return analogColors;
  }

  monochromaticColors(colorRGB: Color, steps = 5) {
    let palette = [];

    for (let i = 0; i < steps; i++) {
      // Ajustar el brillo (puedes ajustar la lógica según lo que necesites)
      let factor = i / (steps - 1);
      let r = Math.round(colorRGB.r * factor);
      let g = Math.round(colorRGB.g * factor);
      let b = Math.round(colorRGB.b * factor);

      // Convertir de nuevo a hexadecimal
      palette.push(rgbaToHex({ r, g, b, a: 100 }));
    }

    palette.pop();

    for (let i = 0; i < steps; i++) {
      const r = Math.round(colorRGB.r + ((255 - colorRGB.r) / (steps - 1)) * i);
      const g = Math.round(colorRGB.g + ((255 - colorRGB.g) / (steps - 1)) * i);
      const b = Math.round(colorRGB.b + ((255 - colorRGB.b) / (steps - 1)) * i);

      palette.push(rgbaToHex({ r, g, b, a: 100 }));
    }

    return palette;
  }

  complementaryColors(colorRGB: Color) {
    const hslColor = rgbToHsl(colorRGB);

    let h2 = (hslColor[0] + 180) % 360;

    let palette = [rgbaToHex(colorRGB), hslToHex(h2, hslColor[1], hslColor[2])];

    return palette;
  }

  triadColors(colorRGB: Color) {
    const hslColor = rgbToHsl(colorRGB);

    let h2 = (hslColor[0] + 120) % 360;
    let h3 = (hslColor[0] + 240) % 360;

    let palette = [
      rgbaToHex(colorRGB),
      hslToHex(h2, hslColor[1], hslColor[2]),
      hslToHex(h3, hslColor[1], hslColor[2]),
    ];

    return palette;
  }

  tetradiadColors(colorRGB: Color) {
    const hslColor = rgbToHsl(colorRGB);

    let h2 = (hslColor[0] + 90) % 360;
    let h3 = (hslColor[0] + 180) % 360;
    let h4 = (hslColor[0] + 270) % 360;

    let palette = [
      rgbaToHex(colorRGB),
      hslToHex(h2, hslColor[1], hslColor[2]),
      hslToHex(h3, hslColor[1], hslColor[2]),
      hslToHex(h4, hslColor[1], hslColor[2]),
    ];

    return palette;
  }

  adjustBrightness(r: number, g: number, b: number, factor: number): Color {
    // Ajustar el brillo multiplicando por el factor
    r = Math.round(r * factor);
    g = Math.round(g * factor);
    b = Math.round(b * factor);
    // Asegurar que los valores estén en el rango [0, 255]
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return { r, g, b, a: 100 };
  }
}
