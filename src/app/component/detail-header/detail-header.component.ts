import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit {

  @Input()
  subTitle = '';

  constructor() { }

  ngOnInit() {
  }

}
