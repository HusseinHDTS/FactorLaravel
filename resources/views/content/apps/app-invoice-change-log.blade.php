@extends('layouts/layoutMaster')

@section('title', 'صورتحساب - تغییرات')

@section('vendor-style')
    @vite(['resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.scss'])
@endsection

@section('vendor-script')
    @vite(['resources/assets/vendor/libs/moment/moment.js', 'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js'])
@endsection

@section('page-script')
    @vite('resources/assets/js/app-invoice-change-log.js')
@endsection

@section('content')
    <script>
        window.logId = "{{ $logs[0]->model_id }}";
    </script>
    <h4 class="py-3 mb-4">
        <span class="text-muted fw-light">صورتحساب /</span>
        تغییرات
    </h4>
    <!-- Invoice List Table -->
    <div class="card">
        <div class="card-datatable table-responsive">
            <table class="invoice-log-table table border-top">
                <thead>
                    <tr>
                        <th></th>
                        <th>#شناسه</th>
                        <th>ثبت کننده تغییرات</th>
                        <th>سازنده فاکتور</th>
                        <th class="text-truncate">تاریخ</th>
                        <th>جزئیات</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
@endsection
