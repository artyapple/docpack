import {Component, EventEmitter, Output, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, HostListener} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {GetFolders} from "../../../../../wailsjs/go/main/App";
import {DocPackServiceService} from "../../../service/doc-pack-service.service";
import {ModalService} from "../../../service/modal.service";

@Component({
  selector: 'app-name-edit-window',
  templateUrl: './name-edit-window.component.html',
  styleUrls: ['./name-edit-window.component.scss'],
  animations: [
    trigger('opacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({  opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('opacityTranslateY', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(1rem)' }),
        animate('300ms ease-out', style({  opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(1rem)' }))
      ])
    ])
  ]
})
export class NameEditWindowComponent implements OnInit, OnDestroy {

  @Input() id?: string;
  isOpen = false;
  private element: any;

  @Input() masterTitle = '';
  @Input() placeHolder = '';
  private cnt: number = 0;
  @Input()
  get name(): string { return this._name; }
  set name(name: string) {
    this._name = name;
    this.check()
  }
  private _name = '';
  invalid: boolean = false;

  @Output() result = new EventEmitter<string>();

  constructor(private fileService: DocPackServiceService, private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    // add self (this modal instance) to the modal service so it can be opened from any component
    this.modalService.add(this);

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.classes === 'jw-modal') {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    // remove self from modal service
    this.modalService.remove(this);

    // remove modal element from html
    this.element.remove();
  }

  open() {
    //this.element.style.display = 'block';
    document.body.setAttribute("overflow","hidden")
    this.isOpen = true;
  }

  close() {
    //this.element.style.display = 'none';
    //document.body.classList.remove('jw-modal-open');
    this.isOpen = false;
  }





  saveName(){
    this.result.emit(this._name)
  }

  check() {
    if(this.cnt>0){
      this.fileService.getFolderNames().then((names)=>{
        this.invalid = names.includes(this._name)
      })
    }
    this.cnt++
  }
  isInvalid(){
    return this.invalid
  }

  closeDialog(){
    this.modalService.close()
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(this.el.nativeElement.contains(event.target)) {
     console.log("clicked inside")
    } else {
      console.log("clicked outside")
    }
  }

}

