import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vertical-card',
  templateUrl: './vertical-card.component.html',
  styleUrls: ['./vertical-card.component.scss']
})
export class VerticalCardComponent implements OnInit {

  @Input() movie!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
