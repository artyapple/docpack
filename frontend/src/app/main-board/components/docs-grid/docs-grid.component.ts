import {Component, OnDestroy} from '@angular/core';
import {DocPackServiceService} from "../../../service/doc-pack-service.service";
import {Doc, DocSet} from "../../../models/docset";
import {Subscription} from "rxjs";
import {OpenFilesDialog} from "../../../../../wailsjs/go/main/App";

@Component({
  selector: 'app-docs-grid',
  templateUrl: './docs-grid.component.html',
  styleUrls: ['./docs-grid.component.scss']
})
export class DocsGridComponent implements OnDestroy{

  currentDocSubscription: Subscription = new Subscription;
  docsMap  = new Array<Doc>()

  constructor(private docPackService: DocPackServiceService) {
      this.subscribeToCurrentDocs()
  }

  subscribeToCurrentDocs() {
    this.currentDocSubscription = this.docPackService.getDocs().subscribe(doc => {
      this.docsMap = doc
    })
  }

  ngOnDestroy() {
    this.currentDocSubscription.unsubscribe()
  }

  getDocs(){
    return this.docsMap
  }

  openFilesDialog(){
    console.log("open files")
    OpenFilesDialog().then((result)=>{
      console.log("selected: "+result)
    })
  }
}
