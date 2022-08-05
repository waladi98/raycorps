import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { LegendItem, ChartType } from '../md/md-chart/md-chart.component';
import swal from 'sweetalert2';
// import PerfectScrollbar from 'perfect-scrollbar';
import * as Chartist from 'chartist';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }
  public tableData1: TableData;
  public tableData: TableData;
  


  startAnimationForLineChart(chart: any) {
    let seq: number, delays: number, durations: number;
    seq = 0;
    delays = 80;
    durations = 500;
    chart.on('draw', function (data: any) {

      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart: any) {
    let seq2: number, delays2: number, durations2: number;
    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data: any) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }
  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {

    const $calendar = $('#fullCalendar');

    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();

    $calendar.fullCalendar({
      viewRender: function (view: any, element: any) {
        // We make sure that we activate the perfect scrollbar when the view isn't on Month
        if (view.name != 'month') {
          // var elem = $(element).find('.fc-scroller')[0];
          // let ps = new PerfectScrollbar(elem);
        }
      },
      header: {
        left: 'title',
        center: 'month, agendaWeek, agendaDay',
        right: 'prev, next, today'
      },
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      views: {
        month: { // name of view
          titleFormat: 'MMMM YYYY'
          // other view-specific options here
        },
        week: {
          titleFormat: ' MMMM D YYYY'
        },
        day: {
          titleFormat: 'D MMM, YYYY'
        }
      },

      select: function (start: any, end: any) {

        // on select we show the Sweet Alert modal with an input
        swal.fire({
          title: 'Create an Event',
          html: '<div class="form-group">' +
            '<input class="form-control" placeholder="Event Title" id="input-field">' +
            '</div>',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false
        }).then(function (result: any) {

          let eventData;
          const event_title = $('#input-field').val();

          if (event_title) {
            eventData = {
              title: event_title,
              start: start,
              end: end
            };
            $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
          }

          $calendar.fullCalendar('unselect');

        });
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events


      // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events: [
        {
          title: 'All Day Event',
          start: new Date(y, m, 1),
          className: 'event-default'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d - 4, 6, 0),
          allDay: false,
          className: 'event-rose'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d + 3, 6, 0),
          allDay: false,
          className: 'event-rose'
        },
        {
          title: 'Meeting',
          start: new Date(y, m, d - 1, 10, 30),
          allDay: false,
          className: 'event-green'
        },
        {
          title: 'Lunch',
          start: new Date(y, m, d + 7, 12, 0),
          end: new Date(y, m, d + 7, 14, 0),
          allDay: false,
          className: 'event-red'
        },
        {
          title: 'Md-pro Launch',
          start: new Date(y, m, d - 2, 12, 0),
          allDay: true,
          className: 'event-azure'
        },
        {
          title: 'Birthday Party',
          start: new Date(y, m, d + 1, 19, 0),
          end: new Date(y, m, d + 1, 22, 30),
          allDay: false,
          className: 'event-azure'
        },
        {
          title: 'Click for KPM Tim',
          start: new Date(y, m, 21),
          end: new Date(y, m, 22),
          url: '#/',
          className: 'event-orange'
        },
        {
          title: 'Click for Google',
          start: new Date(y, m, 21),
          end: new Date(y, m, 22),
          url: '#/',
          className: 'event-orange'
        }
      ]
    });

    this.tableData = {
      headerRow: ['NPM', 'Nama', 'Prodi', 'IPK', 'Angkatan'],
      dataRows: [
          ['111', 'Dakota Rice', 'Teknik Pangan', '4.00', '2017'],
          ['222', 'Minerva Hooper', 'Teknik Informatika', '3.99', '2017'],
          ['333', 'Sage Rodriguez', 'Teknik Mesin', '3.88', '2017'],
          ['444', 'Philip Chaney', 'Teknik Industri', '3.77', '2017']
      ]
   };

    this.tableData1 = {
      headerRow: ['Name', 'Prodi', 'Rata2 Lama Study', 'Rata2 Lama TA', 'Tgl Lulus'],
      dataRows: [
        ['Waladi', 'Teknik Mesin', '4 Tahun', '6 Bulan', '20/20/20'],
        ['Waladi', 'Teknik Mesin', '4 Tahun', '6 Bulan', '20/20/20'],
        ['Waladi', 'Teknik Mesin', '4 Tahun', '6 Bulan', '20/20/20'],
        ['Waladi', 'Teknik Mesin', '4 Tahun', '6 Bulan', '20/20/20'],
        ['Waladi', 'Teknik Mesin', '4 Tahun', '6 Bulan', '20/20/20'],
        ['Waladi', 'Teknik Mesin', '4 Tahun', '6 Bulan', '20/20/20']
      ]
    };
    /* ----------==========    Rounded Line Chart initialization    ==========---------- */

    const dataRoundedLineChart = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
          [12, 17, 7, 17, 23, 18, 38]
      ]
  };

  const optionsRoundedLineChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 10
      }),
      axisX: {
          showGrid: false,
      },
      low: 0,
      high: 50, // KPM Tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      showPoint: false,
      showLine: true
  };

  const RoundedLineChart = new Chartist.Line('#roundedLineChart', dataRoundedLineChart, optionsRoundedLineChart);

  this.startAnimationForLineChart(RoundedLineChart);


  /*  **************** Straight Lines Chart - single line with points ******************** */

  const dataStraightLinesChart = {
    labels: ['\'07', '\'08', '\'09', '\'10', '\'11', '\'12', '\'13', '\'14', '\'15'],
    series: [
      [10, 16, 8, 13, 20, 15, 20, 34, 30]
    ]
  };

  const optionsStraightLinesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: 50, // KPM Tim: we recommend you to set the high sa the biggest value +
      // something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      classNames: {
          point: 'ct-point ct-white',
          line: 'ct-line ct-white'
      }
  };

  const straightLinesChart = new Chartist.Line('#straightLinesChart', dataStraightLinesChart,
   optionsStraightLinesChart);

  this.startAnimationForLineChart(straightLinesChart);

    /*  **************** Public Preferences - Pie Chart ******************** */

    const dataPreferences = {
      labels: ['62%', '32%', '6%'],
      series: [62, 32, 6]
    };

    const optionsPreferences = {
      height: '230px'
    };

    new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

    /*  **************** Coloured Rounded Line Chart - Line Chart ******************** */


    const dataColouredBarsChart = {
      labels: ['\'Teknik Industri', '\'Teknik Pangan', '\'Teknik Mesin', '\'Teknik Informatika', '\'Teknik Lingkungan', '\'Teknik PWK'],
      series: [
        [287, 385, 490, 554, 586, 698],
        [67, 152, 143, 287, 335, 435],
        [23, 113, 67, 190, 239, 307]
      ]
    };

    const optionsColouredBarsChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 10
      }),
      axisY: {
        showGrid: true,
        offset: 40
      },
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      showPoint: true,
      height: '300px'
    };


    const colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart,
      optionsColouredBarsChart);

    this.startAnimationForLineChart(colouredBarsChart);

     /*  **************** Simple Bar Chart - barchart ******************** */

     const dataSimpleBarChart = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
      ]
    };

    const optionsSimpleBarChart = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      }
    };

    const responsiveOptionsSimpleBarChart: any = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];

    const simpleBarChart = new Chartist.Bar('#simpleBarChart', dataSimpleBarChart, optionsSimpleBarChart,
     responsiveOptionsSimpleBarChart);

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(simpleBarChart);


    const dataMultipleBarsChart = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
        [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
      ]
    };

    const optionsMultipleBarsChart = {
        seriesBarDistance: 10,
        axisX: {
            showGrid: false
        },
        height: '300px'
    };

    const responsiveOptionsMultipleBarsChart: any = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];

    const multipleBarsChart = new Chartist.Bar('#multipleBarsChart', dataMultipleBarsChart,
     optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(multipleBarsChart);

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    const dataWebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    const optionsWebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    const responsiveOptions: any = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

    this.startAnimationForBarChart(websiteViewsChart);

    $('#worldMap').vectorMap({
      map: 'world_en',
      backgroundColor: 'transparent',
      borderColor: '#818181',
      borderOpacity: 0.25,
      borderWidth: 1,
      color: '#b3b3b3',
      enableZoom: true,
      hoverColor: '#eee',
      hoverOpacity: null,
      normalizeFunction: 'linear',
      scaleColors: ['#b6d6ff', '#005ace'],
      selectedColor: '#c9dfaf',
      selectedRegions: null,
      showTooltip: true,
      onRegionClick: function (element, code, region) {
        var message = 'You clicked "'
          + region
          + '" which has the code: '
          + code.toUpperCase();

        alert(message);
      }
    });
  }
  ngAfterViewInit() {
    const breakCards = true;
    if (breakCards === true) {
      // We break the cards headers if there is too much stress on them :-)
      $('[data-header-animation="true"]').each(function () {
        const $fix_button = $(this);
        const $card = $(this).parent('.card');
        $card.find('.fix-broken-card').click(function () {
          const $header = $(this).parent().parent().siblings('.card-header, .card-image');
          $header.removeClass('hinge').addClass('fadeInDown');

          $card.attr('data-count', 0);

          setTimeout(function () {
            $header.removeClass('fadeInDown animate');
          }, 480);
        });

        $card.mouseenter(function () {
          const $this = $(this);
          const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
          $this.attr('data-count', hover_count);
          if (hover_count >= 20) {
            $(this).children('.card-header, .card-image').addClass('hinge animated');
          }
        });
      });
    }
  }
}
