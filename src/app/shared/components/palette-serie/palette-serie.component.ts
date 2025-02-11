import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, InputSignal, Signal } from '@angular/core';

@Component({
  selector: 'app-palette-serie',
  imports: [UpperCasePipe],
  templateUrl: './palette-serie.component.html',
  styleUrl: './palette-serie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaletteSerieComponent {
  public titlePalette:InputSignal<string> = input.required();
  public paletteSerie:InputSignal<string[]> = input.required();
}
