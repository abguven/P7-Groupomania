import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";


/**
 * Sets a default image when image loading fails
 * @Input defaultSrc : default image to set as src to image element
 */
@Directive({
    selector: "[error-image]"
})
export class ErrorImageDirective implements AfterViewInit{
    @Input() defaultSrc! :string;
    defaultImageSet = false; // helps preventing an infinite loop if an invalid image source is given

    constructor(private el: ElementRef,
        private renderer: Renderer2){}

    ngAfterViewInit(): void {
    
    }

    @HostListener("error") onError(){
        if (!this.defaultImageSet){
            this.renderer.setProperty(this.el.nativeElement,"src",this.defaultSrc);
            this.defaultImageSet = true;
        }
    }
}

