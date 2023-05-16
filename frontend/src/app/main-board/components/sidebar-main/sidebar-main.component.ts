import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {DocSet} from "../../../models/docset";
import {Subscription} from "rxjs";
import {DocPackServiceService} from "../../../service/doc-pack-service.service";

@Component({
  selector: 'app-sidebar-main',
  templateUrl: './sidebar-main.component.html',
  styleUrls: ['./sidebar-main.component.scss']
})
export class SidebarMainComponent implements OnDestroy {
  currentFolderId: string | null = null;
  docSetMaps = new Map<string, DocSet>();
  sideBarToogle: boolean;
  addButtonToogle: boolean;
  docSetName: string  = '';

  chatSubscription: Subscription = new Subscription;

  constructor(private fileService: DocPackServiceService) {
    this.subscribeToChat()
    this.sideBarToogle = true;
    this.addButtonToogle = true
  }

  subscribeToChat() {
    this.chatSubscription = this.fileService.getDocSets().subscribe(docSets => {
      this.docSetMaps = docSets
    })
    console.log("docsSetMap: "+this.docSetMaps)
  }

  ngOnDestroy() {
    this.chatSubscription.unsubscribe()
  }

  changeCurrentFolderId(folderId: string) {
    this.fileService.setCurrentFolder(folderId)
    this.currentFolderId = folderId
  }

  // needed so that keyvalue function in the dom keeps the order of the map
  asItsOrder(a: any, b: any) {
    return 1
  }

  deleteFolder(id: string){
    this.fileService.deleteFolderById(id)
    this.changeCurrentFolderId("")
    console.log("delete: "+id)
  }

  renameFolder(id: string) {
    console.log("rename")
  }

  sideBarOpenClose(){
    this.sideBarToogle = !this.sideBarToogle
  }

  changeAddButtonToogle(){
    this.addButtonToogle = !this.addButtonToogle
  }

  newDocSet() {
    console.log("NEW DOC SET!")
    if(this.docSetName!=''){
      this.fileService.createDocSet(this.docSetName).then((docsetId)=>{
        this.docSetName = ''
        this.changeCurrentFolderId(docsetId)
      })
    }
    this.changeAddButtonToogle()
  }
}
