import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Renderer2,
  Signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { Color } from '@model/color';

@Component({
  selector: 'app-chromatic-circle',
  templateUrl: './chromatic-circle.component.html',
  styleUrl: './chromatic-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChromaticCircleComponent {
  public canvasWidth: InputSignal<Number> = input.required<Number>();
  public canvasHeight: InputSignal<Number> = input.required<Number>();
  public selectColor: OutputEmitterRef<Color> = output<Color>();
  public widthColorBox: Signal<number> = computed(
    () => this.canvasWidth().valueOf() / 2
  );
  public isPressed: boolean = false;

  // @ViewChild('chromaticolorbox') public colorBox!: ElementRef;
  public colorBox = viewChild<ElementRef>('chromaticolorbox');
  @ViewChild('chromatic') private canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private centerX = 0;
  private centerY = 0;
  private radius = 0;
  private currentPixel: any;

  constructor(private renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    this.ctx =
      this.canvas.nativeElement.getContext('2d') ||
      ({} as CanvasRenderingContext2D);
    this.radius = this.canvas.nativeElement.width / 2;
    this.centerX = this.canvas.nativeElement.width / 2;
    this.centerY = this.canvas.nativeElement.height / 2;

    this.drawWheel();
  }

  getAxis(axis: any) {
    var touch = axis.touches[0];
    // Crear un nuevo MouseEvent
    var mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
      bubbles: true, // Permite que el evento burbujee
      cancelable: true, // Permite que el evento sea cancelable
    });

    this.canvas.nativeElement.dispatchEvent(mouseEvent);
    const pixel = this.ctx.getImageData(
      mouseEvent.offsetX,
      mouseEvent.offsetY,
      1,
      1
    ).data;
    this.currentPixel = pixel;
    this.renderer2.setStyle(
      this.colorBox()?.nativeElement,
      'backgroundColor',
      `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]})`
    );
  }

  getAxisx(axis: any) {
    if (this.isPressed || axis.type === 'click') {
      const pixel = this.ctx.getImageData(
        axis.offsetX,
        axis.offsetY,
        1,
        1
      ).data;
      this.currentPixel = pixel;
      this.renderer2.setStyle(
        this.colorBox()?.nativeElement,
        'backgroundColor',
        `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]})`
      );
    }
  }

  copyColor() {
    if (this.currentPixel) {
      this.isPressed = false;
      this.selectColor.emit({
        r: this.currentPixel[0],
        g: this.currentPixel[1],
        b: this.currentPixel[2],
        a: this.currentPixel[3],
      });
    }
  }

  drawWheel(turns: number = 10) {
    for (let circle = 0; circle < turns; circle++) {
      const radiusSections = this.radius / turns;
      const light = (100 - 50) / turns;

      for (let i = 0; i < 360; i++) {
        // Convertir grados a radianes
        const startAngle = i * (Math.PI / 180);
        const endAngle = (i + 1) * (Math.PI / 180);

        // Establecer el color usando HSL
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY); // Mover al centro
        this.ctx.arc(
          this.centerX,
          this.centerY,
          radiusSections * (turns - circle),
          startAngle,
          endAngle
        ); // Dibujar el arco
        this.ctx.closePath();
        this.ctx.fillStyle = `hsl(${i}, 100%, ${50 + light * circle}%)`; // Color en HSL
        this.ctx.fill(); // Rellenar el arco
      }
    }
  }
}
