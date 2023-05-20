import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {DocSet} from "../../../models/docset";
import {Subscription} from "rxjs";
import {DocPackServiceService} from "../../../service/doc-pack-service.service";
import {ModalService} from "../../../service/modal.service";

@Component({
  selector: 'app-sidebar-main',
  templateUrl: './sidebar-main.component.html',
  styleUrls: ['./sidebar-main.component.scss']
})
export class SidebarMainComponent implements OnDestroy {
  isHidden = false
  @Output() onPlusClick = new EventEmitter<boolean>();
  currentFolderId: string | null = null;
  docSetMaps = new Map<string, DocSet>();
  editFolderNameActive = false;
  addButtonToogle: boolean = false;
  @Output()
  docSetName: string  = '';

  chatSubscription: Subscription = new Subscription;

  constructor(private fileService: DocPackServiceService, private modalService: ModalService) {
    this.subscribeToChat()
    this.editFolderNameActive = false;
    this.addButtonToogle = false
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
    // @ts-ignore
    this.docSetName = this.docSetMaps.get(id).packName
    this.modalService.open('edit-folder-modal')
    console.log("rename")
    //this.onPlusClick.emit(true);
  }

  toggleEditFolderNameActive(){
    this.editFolderNameActive = !this.editFolderNameActive
  }

  changeAddButtonToogle(){
    this.addButtonToogle = !this.addButtonToogle
  }

  openCreateNewFolderDialog(){
    this.modalService.open('create-folder-modal')
  }

  newDocSet(newName: string) {
    console.log("NEW DOC SET! newName: "+newName)
    console.log("NEW DOC SET! newName: "+this.docSetName)
    if(newName!=''){
      this.fileService.createDocSet(newName).then((docsetId)=>{
        this.docSetName = ''
        this.changeCurrentFolderId(docsetId)
      })
    }
    this.changeAddButtonToogle()
  }

  isCurrentFolder(id: string){
    return id == this.currentFolderId
  }

  isCurrentFolderInEdit(id: string){
    if(this.isCurrentFolder(id)){
      return this.editFolderNameActive
    }
    return false
  }

  changeDocSetName() {
    console.log("EDIT DOC SET!")
    if(this.docSetName!=''){
      // this.fileService.createDocSet(this.docSetName).then((docsetId)=>{
      //   this.docSetName = ''
      //   this.changeCurrentFolderId(docsetId)
      // })
      console.log("new name:"+this.docSetName)
      this.docSetName = ''
    }
    this.toggleEditFolderNameActive()
  }

  onResult(result: string) {
    this.newDocSet(result)
  }
}
