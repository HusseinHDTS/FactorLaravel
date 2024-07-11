/**
 * App Invoice List (jquery)
 */

'use strict';

$(function () {
  // Variable declaration for table
  var dt_invoice_table = $('.invoice-list-table');

  // Invoice datatable
  if (dt_invoice_table.length) {
    var dt_invoice = dt_invoice_table.DataTable({
      // ajax: assetsPath + 'json/invoice-list.json', // JSON file to add data
      // ajax: '/api/invoice-lists', // JSON file to add data
      ajax: {
        url: '/api/invoice-lists',
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + window.apiToken); // Replace 'token' with your actual token variable
          // You can set additional headers here if needed
        }
      },
      columns: [
        { data: '' },
        { data: 'id' },
        { data: 'id' },
        { data: 'id' },
        { data: 'id' },
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
          responsivePriority: 2,
          searchable: false,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // Invoice ID
          targets: 1,
          render: function (data, type, full, meta) {
            var $id = full['id'];
            // Creates full output for row
            var $row_output = '<a href="' + baseUrl + 'app/invoice/preview/' + $id + '">#' + $id + '</a>';
            return $row_output;
          }
        },
        {
          // Invoice status
          targets: 2,
          render: function (data, type, full, meta) {
            var $invoice_status = full['price_remaining'] == '0' ? 'Paid' : 'Draft',
              $due_date = full['created_at'],
              $balance = full['price_paying'];
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
              'پرداخت شده' +
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
          // Client name and Service
          targets: 3,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $service = full['user']['email'],
              $image = ''; //;
            if ($image !== '') {
              // For Avatar image
              var $output =
                '<img src="' + assetsPath + 'img/avatars/' + $image + '" alt="Avatar" class="rounded-circle">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6),
                states = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'],
                $state = states[stateNum],
                $name = full['user']['name'] || 'No Name';
              let nameParts = $name.split(' ');
              let $initials;
              if (nameParts.length > 1) {
                $initials = nameParts[0].charAt(0) + '‌' + nameParts[nameParts.length - 1].charAt(0);
              } else {
                $initials = nameParts[0].charAt(0) + '‌' + nameParts[0].charAt(nameParts[0].length - 1);
              }
              $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
            }
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar me-2">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<a href="#" class="text-body text-truncate"><span class="fw-medium">' +
              $name +
              '</span></a>' +
              '<small class="text-truncate text-muted">' +
              $service +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // Total Invoice Amount
          targets: 4,
          render: function (data, type, full, meta) {
            var $total = full['full_price'];
            return '<span class="d-none">' + $total + '</span>' + $total + ' تومان';
          }
        },
        {
          // Due Date
          targets: 5,
          render: function (data, type, full, meta) {
            var date = new Date(full['created_at']);
            // Creates full output for row
            var $row_output = date.toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' });
            return $row_output + ' ' + date.getFullYear();
          }
        },
        {
          targets: 6,
          orderable: false,
          render: function (data, type, full, meta) {
            return full['order_type_name'];
          }
        },
        {
          // Client Balance/Status
          targets: 7,
          orderable: false,
          render: function (data, type, full, meta) {
            var $balance = full['price_remaining'];
            if ($balance === '0') {
              var $badge_class = 'bg-label-success';
              return '<span class="badge ' + $badge_class + '" > پرداخت شد </span>';
            } else {
              var $badge_class = 'bg-label-danger';
              return '<span class="badge ' + $badge_class + '" > الباقی دارد </span>';
            }
          }
        },
        {
          targets: 8,
          visible: false
        },
        {
          // Actions
          targets: -1,
          title: 'عملیات',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            var logInfo = '';
            if (window.loggedInRole == 'admin') {
              logInfo = `<a href="${baseUrl}app/invoice/changes/${full['id']}" data-bs-toggle="tooltip" class="text-body" data-bs-placement="top" title="تغییرات"><i class="ti ti-file mx-2 ti-sm"></i></a>`;
            }
            return (
              '<div class="d-flex align-items-center">' +
              `<a href="${baseUrl}app/invoice/preview/${full['id']}" data-bs-toggle="tooltip" class="text-body" data-bs-placement="top" title="نمایش فاکتور"><i class="ti ti-eye mx-2 ti-sm"></i></a>` +
              logInfo +
              '</div>'
            );
          }
        }
      ],
      order: [[1, 'desc']],
      dom:
        '<"row mx-1"' +
        '<"col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2"l<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start mt-md-0 mt-3"B>>' +
        '<"col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-3 gap-md-3"f<"invoice_status mb-3 mb-md-0">>' +
        '>t' +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        url: assetsPath + 'json/i18n/datatables-bs5/fa.json',
        sLengthMenu: '_MENU_',
        search: '',
        searchPlaceholder: 'جستجو..'
      },
      // Buttons with Dropdown
      buttons: [
        {
          text: '<i class="ti ti-plus me-md-1"></i><span class="d-md-inline-block d-none">ایجاد فاکتور</span>',
          className: 'btn btn-primary waves-effect waves-light',
          action: function (e, dt, button, config) {
            window.location = baseUrl + 'app/invoice/add';
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'جزئیات ' + data['user']['name'];
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

  // Delete Record
  $('.invoice-list-table tbody').on('click', '.delete-record', function () {
    dt_invoice.row($(this).parents('tr')).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
