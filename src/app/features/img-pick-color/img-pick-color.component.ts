import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, Renderer2, viewChild } from '@angular/core';
import { PaletteSerieComponent } from "../../shared/components/palette-serie/palette-serie.component";
import { rgbaToHex } from '@shared/utils/convert-color';

@Component({
  selector: 'app-img-pick-color',
  imports: [NgClass, PaletteSerieComponent],
  templateUrl: './img-pick-color.component.html',
  styleUrl: './img-pick-color.component.scss',
})
export class ImgPickColorComponent {
  public imgURL!: string;
  public pickedColor!: string;

  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('imgCanvas');
  private ctx!: CanvasRenderingContext2D;
  
  ngAfterViewInit(): void {
    this.canvas()?.nativeElement.setAttribute('width', window.innerWidth+'');    
  }

  openExplorerFolder(file: HTMLInputElement): void {
    if (file.files?.length) this.imgURL = URL.createObjectURL(file.files[0]);
    const img = new Image();

    img.onload = () => {
      // Calcular la proporción
      const canvasWidth = this.canvas()?.nativeElement.width ?? 0;
      const canvasHeight = this.canvas()?.nativeElement.height ?? 0;

      const imgWidth = img.width;
      const imgHeight = img.height;

      // Calcular la escala
      const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * scale;
      const newHeight = imgHeight * scale; 
      
      this.canvas()?.nativeElement.setAttribute('width', newWidth+'');    
      this.canvas()?.nativeElement.setAttribute('height', newHeight+'');  

      this.ctx =
        this.canvas()?.nativeElement.getContext('2d') ||
        ({} as CanvasRenderingContext2D);
      this.ctx.drawImage(img, 0, 0, newWidth, newHeight);
      URL.revokeObjectURL(this.imgURL);
    };

    img.src = this.imgURL;
  }

  selectColorFromCanvas(axis:any) {
    const pixel = this.ctx.getImageData(axis.offsetX, axis.offsetY, 1, 1).data;
    // this.renderer2.setStyle(
    //   this.colorBox()?.nativeElement,
    //   'backgroundColor',
    //   `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]})`
    // );

    this.pickedColor = rgbaToHex({
      r:pixel[0],
      g:pixel[1],
      b:pixel[2],
      a:pixel[3],
    })
  }
}
