import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import * as dayjs from 'dayjs';
import 'dayjs/locale/sk';

@Component({
  selector: 'edusys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dateAdapter: DateAdapter<dayjs.Dayjs>) {
    this.setLocale('sk');
  }
  setLocale(locale: string) {
    dayjs.locale(locale);
    this.dateAdapter.setLocale(locale);
  }
}
