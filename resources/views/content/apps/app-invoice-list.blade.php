@extends('layouts/layoutMaster')

@section('title', 'صورتحساب - لیست')

@section('vendor-style')
    @vite(['resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.scss'])
@endsection

@section('vendor-script')
    @vite(['resources/assets/vendor/libs/moment/moment.js', 'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js'])
@endsection

@section('page-script')
    @vite('resources/assets/js/app-invoice-list.js')
@endsection

@section('content')
    <h4 class="py-3 mb-4">
        <span class="text-muted fw-light">صورتحساب /</span>
        لیست فاکتورها
    </h4>
    <!-- Invoice List Widget -->
    <div class="card">
        <div class="card-datatable table-responsive">
            <table class="invoice-list-table table border-top">
                <thead>
                    <tr>
                        <th></th>
                        <th>#شناسه</th>
                        <th>
                            <i class="ti ti-trending-up text-secondary"></i>
                        </th>
                        <th>ثبت کننده</th>
                        <th>مبلغ</th>
                        <th class="text-truncate">تاریخ</th>
                        <th>نحوه ثبت سفارش</th>
                        <th>وضعیت</th>
                        <th>وضعیت فاکتور</th>
                        <th class="cell-fit">عملیات</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
@endsection
