import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { SingleDataSet, Label } from 'ng2-charts';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.page.html',
  styleUrls: ['./earnings.page.scss'],
})
export class EarningsPage implements OnInit {
  // common
  public earningCategories: string[];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public allTimeData;
  today = new Date();
  public colors = [
    {
      backgroundColor: ['rgb(255, 20, 100)',
        'rgb(55, 152, 205)',
        'rgb(255, 200, 90)'],
    },
  ];

  // category
  public fromDateForCategoryGraph: Date;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public grandTotalCategory = 0;

  // history
  public fromDateForHistoryBarChart: Date;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public monthsListForBarChart = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];

  constructor(private storageService: StorageService) {
  }

  async ngOnInit() {
    this.earningCategories = this.storageService.getEarningCategories();
    this.allTimeData = await this.storageService.getEntries();
    await this.changeCatergoryTimePeriod(null);
    await this.changeHistoryTimePeriod(null);
  }

  changeCatergoryTimePeriod(event) {
    const categoryTimePeriodInMonth = event ? event.detail.value : 1;
    this.fromDateForCategoryGraph = new Date(this.today.getFullYear(), this.today.getMonth() - categoryTimePeriodInMonth + 1, 1);
    this.configureCategoryGraph();
  }

  changeHistoryTimePeriod(event) {
    const historyTimePeriodInMonth = event ? event.detail.value : 3;
    this.barChartLabels = [];
    this.monthsListForBarChart = [];
    this.fromDateForHistoryBarChart = new Date(this.today.getFullYear(), this.today.getMonth() - historyTimePeriodInMonth + 1, 1);
    for (let i = historyTimePeriodInMonth; i > 0; i -= 1) {
      const fullDate = new Date(this.today.getFullYear(), this.today.getMonth() - i + 1, 1);
      const month = this.monthNames[fullDate.getMonth()];
      this.barChartLabels.push(month);
      this.monthsListForBarChart.push(month);
    }
    this.configureHistoryGraph();
  }

  async configureCategoryGraph() {
    this.grandTotalCategory = 0;
    this.pieChartLabels = [...this.earningCategories];
    this.pieChartData = [];
    this.earningCategories.forEach(category => {
      const total = this.allTimeData.filter(item =>
        item.category === category &&
        item.type === 'earning' &&
        new Date(item.date) >= this.fromDateForCategoryGraph
      ).reduce((previousValue, item) => previousValue + item.amount, 0);
      this.pieChartData.push(total);
      this.grandTotalCategory += total;
    });
  }


  async configureHistoryGraph() {
    this.barChartData = [];
    // Filter data from last selected month
    const filteredByDateData = this.allTimeData.filter(item => new Date(item.date) >= this.fromDateForHistoryBarChart);

    // map over categories & construct the inner data of dataset object per catagory
    this.earningCategories.map((category, categoryIndex) => {
      const innerDataSetObj = { label: category,
                                stack: 'single',
                                data: [],
                                backgroundColor: this.colors[0].backgroundColor[categoryIndex] };
      const data = {};
      filteredByDateData.forEach(item => {
        const itemMonth = this.monthNames[new Date(item.date).getMonth()];
        if (item.category === category) {
          if (data[itemMonth]) {
            data[itemMonth] += item.amount;
          } else {
            data[itemMonth] = item.amount;
          }
        }
      });
      const values = [];
      // loop over the monthsList for the graph, if no value exists for that month, assign 0 else the value
      this.monthsListForBarChart.map(monthName => {
        if (data[monthName]) {
          values.push(data[monthName]);
        } else {
          values.push(0);
        }
      });
      innerDataSetObj.data = values;
      this.barChartData.push(innerDataSetObj);
    });
  }
}
