import { ChangeDetectionStrategy, Component, computed, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from '@core/components/header/header.component';
import { Color } from '@model/color';
import { ChromaticCircleComponent } from '@shared-components/chromatic-circle/chromatic-circle.component';
import { hslToHex, rgbaToHex, rgbToHex, rgbToHsl } from '@shared/utils/convert-color';
import { PaletteSerieComponent } from "../../shared/components/palette-serie/palette-serie.component";

@Component({
  selector: 'app-pallete',
  imports: [ChromaticCircleComponent, HeaderComponent, PaletteSerieComponent],
  templateUrl: './pallete.component.html',
  styleUrl: './pallete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PalleteComponent {
  public colorSelected: WritableSignal<Color> = signal({} as Color);
  public historicColors: WritableSignal<Color[]> = signal([]);

  public analogPalette$ = computed(() => this.buildAnalogColors(this.colorSelected() as Color,5))
  public monochromaticPalette$ = computed(() => this.buildMonochromaticColors(this.colorSelected() as Color,5))
  public complementaryPalette$ = computed(() => this.buildComplementaryColors(this.colorSelected() as Color))
  public TriadPalette$ = computed(() => this.buildTriadColors(this.colorSelected() as Color))
  public TetradiedPalette$ = computed(() => this.buildTetradicColors(this.colorSelected() as Color))

  catchColor(color: Color): void {
    this.colorSelected.set(color);
  }

  lastColor(): Color {
    return this.historicColors().at(-1) as Color;
  }

  buildStyleRGBA(color: Color) : string {
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
  }

  buildAnalogColors(color:Color, amount: number = 5): string[] {
    if(!color.r) return [];
    const hslColor = rgbToHsl(color);
    
    const hexColor = rgbToHex(color.r, color.g, color.b);
    const analogColors = [hexColor];
    for (let index = 1; index <= amount; index++) {
      analogColors.push(
        hslToHex(hslColor[0] + 30 * index, hslColor[1], hslColor[2])
      );
    }
    return analogColors;
  }

  buildMonochromaticColors(color:Color, steps = 5): string[] {
    if(!color.r) return [];
    let palette = [];

    for (let i = 0; i < steps; i++) {
      // Ajustar el brillo (puedes ajustar la lógica según lo que necesites)
      let factor = i / (steps - 1);
      let r = Math.round(color.r * factor);
      let g = Math.round(color.g * factor);
      let b = Math.round(color.b * factor);

      // Convertir de nuevo a hexadecimal
      palette.push(rgbaToHex({ r, g, b, a: 100 }));
    }

    palette.pop();

    for (let i = 0; i < steps; i++) {
      const r = Math.round(color.r + ((255 - color.r) / (steps - 1)) * i);
      const g = Math.round(color.g + ((255 - color.g) / (steps - 1)) * i);
      const b = Math.round(color.b + ((255 - color.b) / (steps - 1)) * i);

      palette.push(rgbaToHex({ r, g, b, a: 100 }));
    }

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

  buildComplementaryColors(color:Color): string[]{
    if(!color.r) return [];
    const hslColor = rgbToHsl(color);

    let h2 = (hslColor[0] + 180) % 360;

    let palette = [
      rgbaToHex(color),
      hslToHex(h2,hslColor[1],hslColor[2]),
    ]

    return palette;
  }

  buildTriadColors(color:Color){
    if(!color.r) return [];
    const hslColor = rgbToHsl(color);

    let h2 = (hslColor[0] + 120) % 360;
    let h3 = (hslColor[0] + 240) % 360;

    let palette = [
      rgbaToHex(color),
      hslToHex(h2,hslColor[1],hslColor[2]),
      hslToHex(h3,hslColor[1],hslColor[2])
    ]

    return palette;
  }
  
  buildTetradicColors(color:Color){
    if(!color.r) return [];
    const hslColor = rgbToHsl(color);

    let h2 = (hslColor[0] + 90) % 360;
    let h3 = (hslColor[0] + 180) % 360;
    let h4 = (hslColor[0] + 270) % 360;

    let palette = [
      rgbaToHex(color),
      hslToHex(h2,hslColor[1],hslColor[2]),
      hslToHex(h3,hslColor[1],hslColor[2]),
      hslToHex(h4,hslColor[1],hslColor[2])
    ]

    return palette;
  }
}
