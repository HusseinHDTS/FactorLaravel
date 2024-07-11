'use strict';
$(function () {
  var dt_invoice_table = $('.invoice-log-table');

  // Invoice datatable
  if (dt_invoice_table.length) {
    var dt_invoice = dt_invoice_table.DataTable({
      // ajax: assetsPath + 'json/invoice-list.json', // JSON file to add data
      // ajax: '/api/invoice-lists', // JSON file to add data
      ajax: {
        url: '/api/invoice-logs/' + window.logId,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + window.apiToken); // Replace 'token' with your actual token variable
          // You can set additional headers here if needed
        }
      },
      columns: [{ data: '' }, { data: 'id' }, { data: 'id' }, { data: 'id' }, { data: 'id' }, { data: 'id' }],
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
          targets: 2,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $service = full['action_owner']['email'],
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
                $name = full['action_owner']['name'] || 'No Name';
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
          targets: 3,
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
          // Due Date
          targets: 4,
          render: function (data, type, full, meta) {
            var date = new Date(full['created_at']);
            // Creates full output for row
            var $row_output = date.toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' });
            return $row_output + ' ' + date.getFullYear();
          }
        },
        {
          // Client Balance/Status
          targets: 5,
          orderable: false,
          render: function (data, type, full, meta) {
            var $event = full['event'];
            if ($event === 'created') {
              var $badge_class = 'bg-label-success';
              return '<span class="badge ' + $badge_class + '" > ایجاد شده </span>';
            } else if ($event === 'updated') {
              var $badge_class = 'bg-label-warning';
              return '<span class="badge ' + $badge_class + '" > ویرایش شده </span>';
            } else if ($event === 'deleted') {
              var $badge_class = 'bg-label-danger';
              return '<span class="badge ' + $badge_class + '" > حذف شده </span>';
            } else {
              return '<span class="d-none">' + $balance + '</span><bdi>' + $balance + '</bdi>';
            }
          }
        }
      ],
      order: [[1, 'desc']],
      language: {
        url: assetsPath + 'json/i18n/datatables-bs5/fa.json',
        sLengthMenu: '_MENU_',
        search: '',
        searchPlaceholder: 'جستجو..'
      },
      // Buttons with Dropdown
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'جزئیات تغییرات';
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
});
