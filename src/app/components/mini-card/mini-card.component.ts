import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.scss']
})
export class MiniCardComponent implements OnInit {

  @Input() popular!: any;
  @Input() index!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
