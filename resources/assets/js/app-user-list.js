/**
 * Page User List
 */

'use strict';

// Datatable (jquery)
$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_user_table = $('.datatables-users'),
    select2 = $('.select2'),
    userView = baseUrl + 'app/user/view/account',
    statusObj = {
      1: { title: 'درانتظار', class: 'bg-label-warning' },
      2: { title: 'فعال', class: 'bg-label-success' },
      3: { title: 'غیرفعال', class: 'bg-label-secondary' }
    };

  if (select2.length) {
    var $this = select2;
    $this.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'انتخاب کشور',
      dropdownParent: $this.parent()
    });
  }

  // Users datatable
  if (dt_user_table.length) {
    var dt_user = dt_user_table.DataTable({
      // processing: true,
      // serverSide: true,
      ajax: {
        url: '/api/admins',
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
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $name = full['name'],
              $email = full['email'],
              $image = full['avatar'];
            if ($image) {
              // For Avatar image
              var $output =
                '<img src="' + assetsPath + 'img/avatars/' + $image + '" alt="Avatar" class="rounded-circle">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6);
              var states = ['success', 'danger', 'warning', 'info', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['name'] || 'No Name';
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
              '<div class="d-flex justify-content-start align-items-center user-name">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar me-3">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<a href="' +
              userView +
              `/${full['id']}` +
              '" class="text-body text-truncate"><span class="fw-medium">' +
              $name +
              '</span></a>' +
              '<small class="text-muted">' +
              $email +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // User Role
          targets: 2,
          render: function (data, type, full, meta) {
            var $role = full['roles'][full['roles'].length - 1]['name'];
            var roleBadgeObj = {
              user: '<span class="badge badge-center rounded-pill bg-label-warning me-3 w-px-30 h-px-30"><i class="ti ti-user ti-sm"></i></span> فروشنده',
              admin:
                '<span class="badge badge-center rounded-pill bg-label-secondary me-3 w-px-30 h-px-30"><i class="ti ti-device-laptop ti-sm"></i></span> ادمین'
            };
            return "<span class='text-truncate d-flex align-items-center'>" + roleBadgeObj[$role] + '</span>';
          }
        },
        {
          // User Status
          targets: 3,
          render: function (data, type, full, meta) {
            var $status = 2;

            return (
              '<span class="badge ' +
              statusObj[$status].class +
              '" text-capitalized>' +
              statusObj[$status].title +
              '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'عملیات',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            var userView = baseUrl + 'app/user/view/account';

            return (
              '<div class="d-flex align-items-center">' +
              `<a href="${userView}/${full['id']}" class="text-body"><i class="ti ti-edit ti-sm me-2"></i></a>` +
              // '<a href="javascript:;" class="text-body delete-record"><i class="ti ti-trash ti-sm mx-2"></i></a>' +
              // '<a href="javascript:;" class="text-body dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-sm mx-1"></i></a>' +
              // '<div class="dropdown-menu dropdown-menu-end m-0">' +
              // // '<a href="' +
              // // userView +
              // // '" class="dropdown-item">نمایش</a>' +
              // // '<a href="javascript:;" class="dropdown-item">مسدودسازی</a>' +
              // '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[1, 'desc']],
      dom:
        '<"row me-2"' +
        '<"col-md-2"<"me-3"l>>' +
        '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
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
          text: '<i class="ti ti-plus me-0 me-sm-1 ti-xs"></i><span class="d-none d-sm-inline-block">افزودن کاربر</span>',
          className: 'add-new btn btn-primary waves-effect waves-light mx-3',
          attr: {
            'data-bs-toggle': 'offcanvas',
            'data-bs-target': '#offcanvasAddUser'
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'جزئیات ' + data['name'];
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

  // Delete Record
  $('.datatables-users tbody').on('click', '.delete-record', function () {
    dt_user.row($(this).parents('tr')).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});

// Validation & Phone mask
(function () {
  const phoneMaskList = document.querySelectorAll('.phone-mask'),
    addNewUserForm = document.getElementById('addNewUserForm');

  // Phone Number
  if (phoneMaskList) {
    phoneMaskList.forEach(function (phoneMask) {
      new Cleave(phoneMask, {
        phone: true
      });
    });
  }
  // Add New User Form Validation
  const fv = FormValidation.formValidation(addNewUserForm, {
    fields: {
      name: {
        validators: {
          notEmpty: {
            message: 'نام کامل را وارد کنید'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: 'رمز عبور را وارد کنید'
          },
          stringLength: {
            min: 8,
            message: 'رمز عبور باید حداقل 8 کاراکتر باشد'
          },
          regexp: {
            regexp: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])/,
            message: 'رمز عبور باید شامل حرف بزرگ، حرف کوچک، عدد و کاراکتر ویژه باشد'
          }
        }
      },
      repassword: {
        validators: {
          notEmpty: {
            message: 'تایید رمز عبور را وارد کنید'
          },
          identical: {
            compare: function () {
              return addNewUserForm.querySelector('[name="password"]').value;
            },
            message: 'رمز عبور و تایید آن یکسان نیستند'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: 'ایمیل خود را وارد کنید'
          },
          emailAddress: {
            message: 'فرمت ایمیل صحیح نیست'
          }
        }
      },
      // mobile: {
      //   validators: {
      //     notEmpty: {
      //       message: 'شماره موبایل خود را وارد کنید'
      //     },
      //     regexp: {
      //       regexp: /^0921\d{7}$/,
      //       message: 'شماره موبایل باید با 0921 شروع شده و 11 رقم باشد'
      //     }
      //   }
      // },
      email: {
        validators: {
          notEmpty: {
            message: 'ایمیل خود را وارد کنید'
          },
          emailAddress: {
            message: 'فرمت ایمیل صحیح نیست'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        // Use this for enabling/changing valid/invalid class
        eleValidClass: '',
        rowSelector: function (field, ele) {
          // field is the field name & ele is the field element
          return '.mb-3';
        }
      }),
      // submitButton: new FormValidation.plugins.SubmitButton(),
      // Submit the form when all fields are valid
      // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  });
})();
