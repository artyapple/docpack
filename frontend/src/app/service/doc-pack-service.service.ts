import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable} from "rxjs";
import {Doc, DocSet} from "../models/docset";
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {
  CreateNewDocFolder,
  DeleteFolder,
  GetCurrentFolderId,
  GetFolders, RenameFolder,
  SetCurrentFolderId
} from "../../../wailsjs/go/main/App";

@Injectable({
  providedIn: 'root'
})
export class DocPackServiceService {
  private foldersSubject$ = new BehaviorSubject<Map<string, DocSet>>(new Map<string, DocSet>())
  private docsSubject$ = new BehaviorSubject<Doc[]>(new Array())
  constructor() {
    this.loadFolders()
  }

  getDocSets(): Observable<Map<string, DocSet>> {
    return from(this.foldersSubject$)
  }

  getDocs(): Observable<Doc[]> {
    return from(this.docsSubject$)
  }

  deleteFolderById(docSetId: string) {
    DeleteFolder(docSetId).then(()=>{
      let _docSets = this.foldersSubject$.getValue()
      _docSets.delete(docSetId)
      this.foldersSubject$.next(_docSets)
    })
  }

  createDocSet(setName: string) {
    // if chatId is null create a new one (will create a new chat)
    return CreateNewDocFolder(setName).then((res)=> {
      let _docSets = this.foldersSubject$.getValue()
      let f= new Array() as Array<Doc>;
      res.files.forEach(file =>{
        f.push({
          content: file.name
        })
      })

      let docset : DocSet = {
        packName: res.name,
        docs: f
      }
      _docSets.set(res.folderId, docset)
      this.foldersSubject$.next(_docSets)
      return res.folderId
    })
  }

  setCurrentFolder(folderId: string){
    SetCurrentFolderId(folderId).then((id)=>{
      GetCurrentFolderId().then((id)=>{
        // @ts-ignore
        let docs = this.foldersSubject$.getValue().get(id).docs;
        this.docsSubject$.next(docs)
      })
    })
  }

  renameFolder(){
    RenameFolder("","")
  }

  getCurrentFolderId(){
    return GetCurrentFolderId()
  }

  private loadFolders(){
    let docSetMap = new Map<string, DocSet>()
    GetFolders().then((folders)=>{
      folders.forEach(folder => {
        console.log(folder.name)
        let f= new Array() as Array<Doc>;
        folder.files.forEach(file =>{
          f.push({
            content: file.name
          })
        })
        console.log("load: "+f)
        docSetMap.set(folder.folderId, {
          packName: folder.name,
          docs: f
        })
      })
    })
    this.foldersSubject$.next(docSetMap)
  }
}
