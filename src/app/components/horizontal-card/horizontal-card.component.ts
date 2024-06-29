import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-card',
  templateUrl: './horizontal-card.component.html',
  styleUrls: ['./horizontal-card.component.scss']
})
export class HorizontalCardComponent implements OnInit {

  @Input() media: any;

  constructor() { }

  ngOnInit(): void {
  }

}
