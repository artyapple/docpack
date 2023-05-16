import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {DocSet} from "../../../models/docset";
import {Subscription} from "rxjs";
import {DocPackServiceService} from "../../../service/doc-pack-service.service";

@Component({
  selector: 'app-sidebar-docs',
  templateUrl: './sidebar-docs.component.html',
  styleUrls: ['./sidebar-docs.component.scss']
})
export class SidebarDocsComponent implements OnDestroy {
  @Output() currentChatIdChange = new EventEmitter<string | null>();
  @Input() currentChatId: string | null = null;
  docSetMaps = new Map<string, DocSet>();
  sideBarToogle: boolean;
  addButtonToogle: boolean;
  docSetName: string  = '';

  chatSubscription: Subscription = new Subscription;

  constructor(private chatService: DocPackServiceService) {
    this.subscribeToChat()
    this.sideBarToogle = true;
    this.addButtonToogle = true
  }

  subscribeToChat() {
    this.chatSubscription = this.chatService.getDocSets().subscribe(docSets => {
      this.docSetMaps = docSets
    })
  }

  ngOnDestroy() {
    this.chatSubscription.unsubscribe()
  }

  // needed so that keyvalue function in the dom keeps the order of the map
  asItsOrder(a: any, b: any) {
    return 1
  }

  // the following functions always emit null to go back to the default/new chat

  sideBarOpenClose(){
    this.sideBarToogle = !this.sideBarToogle
  }

  changeAddButtonToogle(){
    this.addButtonToogle = !this.addButtonToogle
  }

  test() {
    console.log("button")
  }

  getDocs(){
    let id = localStorage.getItem("current_chat_id");

    console.log(id)
    if(id!=null){
      let docSet = this.docSetMaps.has(id) ? this.docSetMaps.get(id) : null;
      console.log(docSet)
      if(docSet!=null){
        return docSet.docs
      }
    }
    return []
  }
}
