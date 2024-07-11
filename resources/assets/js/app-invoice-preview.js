$(document).ready(function () {
  $('.btn-label-print').on('click', function () {
    Swal.fire({
      text: 'فاکتور تسویه نشده است',
      icon: 'error',
      confirmButtonText: 'متوجه شدم',
      customClass: {
        confirmButton: 'btn btn-primary me-2 waves-effect waves-light'
      }
    });
  });
});
