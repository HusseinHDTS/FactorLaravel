/**
 * App User View - Account (jquery)
 */

$(function () {
  'use strict';

  // Variable declaration for table
  var dt_project_table = $('.datatable-project'),
    dt_invoice_table = $('.datatable-invoice');

  // Project datatable
  // --------------------------------------------------------------------
  if (dt_project_table.length) {
    var dt_project = dt_project_table.DataTable({
      // ajax: assetsPath + 'json/projects-list.json', // JSON file to add data
      ajax: {
        url: '/api/invoice-lists/user/' + window.adminId,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + window.apiToken); // Replace 'token' with your actual token variable
        }
      },
      columns: [
        // columns according to JSON
        { data: 'id' },
        { data: 'id' },
        { data: 'id' },
        { data: 'id' },
        { data: 'id' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },

        {
          // User full name and email
          targets: 1,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            var $name = full['product_details'].length + ' محصول',
              $framework = full['framework'],
              $image = full['project_image'];
            if ($image) {
              // For Avatar image
              var $output =
                '<img src="' +
                assetsPath +
                'img/icons/brands/' +
                $image +
                '" alt="Project Image" class="rounded-circle">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6) + 1;
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['full_name'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
            }
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar avatar-sm me-3">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<span class="text-truncate fw-medium">' +
              $name +
              '</span>' +
              '<small class="text-muted">' +
              $framework +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          targets: 2,
          orderable: false
        },
        {
          // Label
          targets: 3,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            var $progress = full['progress'] + '%',
              $color;
            switch (true) {
              case full['progress'] < 25:
                $color = 'bg-danger';
                break;
              case full['progress'] < 50:
                $color = 'bg-warning';
                break;
              case full['progress'] < 75:
                $color = 'bg-info';
                break;
              case full['progress'] <= 100:
                $color = 'bg-success';
                break;
            }
            return (
              '<div class="d-flex flex-column"><small class="mb-1">' +
              $progress +
              '</small>' +
              '<div class="progress w-100 me-3" style="height: 6px;">' +
              '<div class="progress-bar ' +
              $color +
              '" style="width: ' +
              $progress +
              '" aria-valuenow="' +
              $progress +
              '" aria-valuemin="0" aria-valuemax="100"></div>' +
              '</div>' +
              '</div>'
            );
          }
        },
        {
          targets: 4,
          orderable: false
        }
      ],
      order: [[1, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center flex-column flex-sm-row mx-4 row"' +
        '<"col-sm-4 col-12 d-flex align-items-center justify-content-sm-start justify-content-center"l>' +
        '<"col-sm-8 col-12 d-flex align-items-center justify-content-sm-end justify-content-center"f>' +
        '>t' +
        '<"d-flex justify-content-between mx-4 row"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      language: {
        url: assetsPath + 'json/i18n/datatables-bs5/fa.json',
        sLengthMenu: 'نمایش _MENU_',
        searchPlaceholder: 'جستجوی پروژه'
      },
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'جزئیات ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      }
    });
  }

  // Invoice datatable
  // --------------------------------------------------------------------
  if (dt_invoice_table.length) {
    var dt_invoice = dt_invoice_table.DataTable({
      // ajax: assetsPath + 'json/invoice-list.json', // JSON file to add data
      ajax: {
        url: '/api/invoice-lists/user/' + window.adminId,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + window.apiToken); // Replace 'token' with your actual token variable
        }
      },
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'id' },
        { data: 'id' },
        { data: 'id' },
        { data: 'created_at' },
        { data: 'id' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // Invoice ID
          targets: 1,
          render: function (data, type, full, meta) {
            var $invoice_id = full['id'];
            // Creates full output for row
            var $row_output =
              '<a href="' + baseUrl + 'app/invoice/preview/' + $invoice_id + '"><span>#' + $invoice_id + '</span></a>';
            return $row_output;
          }
        },
        {
          // Invoice status
          targets: 2,
          render: function (data, type, full, meta) {
            var $invoice_status = 'Paid',
              $due_date = full['created_at'],
              $balance = full['full_price'];
            var roleBadgeObj = {
              Sent: '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30"><i class="ti ti-circle-check ti-sm"></i></span>',
              Draft:
                '<span class="badge badge-center rounded-pill bg-label-primary w-px-30 h-px-30"><i class="ti ti-device-floppy ti-sm"></i></span>',
              'Past Due':
                '<span class="badge badge-center rounded-pill bg-label-danger w-px-30 h-px-30"><i class="ti ti-info-circle ti-sm"></i></span>',
              'Partial Payment':
                '<span class="badge badge-center rounded-pill bg-label-success w-px-30 h-px-30"><i class="ti ti-circle-half-2 ti-sm"></i></span>',
              Paid: '<span class="badge badge-center rounded-pill bg-label-warning w-px-30 h-px-30"><i class="ti ti-chart-pie ti-sm"></i></span>',
              Downloaded:
                '<span class="badge badge-center rounded-pill bg-label-info w-px-30 h-px-30"><i class="ti ti-arrow-down-circle ti-sm"></i></span>'
            };
            return (
              "<span data-bs-toggle='tooltip' data-bs-html='true' title='<span>" +
              'پرداخت شد' +
              '<br> <span class="fw-medium">موجودی:</span> ' +
              $balance +
              '<br> <span class="fw-medium">تاریخ:</span> ' +
              $due_date +
              "</span>'>" +
              roleBadgeObj[$invoice_status] +
              '</span>'
            );
          }
        },
        {
          // Total Invoice Amount
          targets: 3,
          render: function (data, type, full, meta) {
            var $total = full['full_price'];
            return $total + 'تومان';
          }
        },
        {
          // Actions
          targets: -1,
          title: 'عملیات',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-flex align-items-center">' +
              '<a href="javascript:;" class="text-body delete-record" data-bs-toggle="tooltip" title="حذف"><i class="ti ti-trash me-2 ti-sm"></i></a>' +
              '<a href="' +
              baseUrl +
              `app/invoice/preview/${full['id']}" class="text-body" data-bs-toggle="tooltip" title="نمایش"><i class="ti ti-eye mx-2 ti-sm"></i></a>` +
              '</div>'
            );
          }
        }
      ],
      order: [[1, 'desc']],
      dom:
        '<"row mx-4"' +
        '<"col-sm-6 col-12 d-flex align-items-center justify-content-center justify-content-sm-start mb-3 mb-md-0"l>' +
        '<"col-sm-6 col-12 d-flex align-items-center justify-content-center justify-content-sm-end"B>' +
        '>t' +
        '<"row mx-4"' +
        '<"col-md-12 col-lg-6 text-center text-lg-start pb-md-2 pb-lg-0"i>' +
        '<"col-md-12 col-lg-6 d-flex justify-content-center justify-content-lg-end"p>' +
        '>',
      language: {
        url: assetsPath + 'json/i18n/datatables-bs5/fa.json',
        sLengthMenu: 'نمایش _MENU_',
        search: '',
        searchPlaceholder: 'جستجوی پروژه'
      },
      // Buttons with Dropdown
      buttons: [],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'جزئیات ' + data['product_details'].length + ' محصول';
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      }
    });
  }
  // On each datatable draw, initialize tooltip
  dt_invoice_table.on('draw.dt', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        boundary: document.body
      });
    });
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
