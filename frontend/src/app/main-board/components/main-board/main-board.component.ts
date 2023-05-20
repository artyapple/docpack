import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Doc, DocSet} from "../../../models/docset";
import {NgIf} from "@angular/common";
import {DocPackServiceService} from "../../../service/doc-pack-service.service";
import {Subscription} from "rxjs";
import {GetCurrentFolderId} from "../../../../../wailsjs/go/main/App";

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent {
  docSetName: string  = '';

}

