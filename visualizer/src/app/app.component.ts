import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxChartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'visualizer';

  annualWageSalary = [
    {
      name: "Battery Reading",
      series: [
        {
          value: 4095,
          name: "0",
        },
        {
          value: 3800,
          name: "120",
        },
        {
          value: 3700,
          name: "240",
        },
        {
          value: 3000,
          name: "360",
        },
        {
          value: 2700,
          name: "480",
        },
      ],
    },
  ];

  dataLC = this.annualWageSalary;
  viewLC: [number, number] = [700, 500];
  animationsLC = true;
  showGridLinesLC = false;
  legendLC = false;
  legendTitleLC = "Countries";
  roundDomainsLC = true;
  xAxisLC = true;
  yAxisLC = true;

  batteryLevelFormatter(batteryLevel: any): string {
    const currencyFormat = new Intl.NumberFormat("en-US", {
      style: "decimal",
      currency: "USD",
    });
    return currencyFormat.format(batteryLevel);
  }

  dateFormatterLC(seconds: string): string {
    const totalSeconds = +seconds;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

}
