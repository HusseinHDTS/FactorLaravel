@extends('layouts/layoutMaster')

@section('title', 'داشبورد - تجارت الکترونیک')

@section('vendor-style')
    @vite(['resources/assets/vendor/libs/apex-charts/apex-charts.scss', 'resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.scss'])
@endsection

@section('vendor-script')
    @vite(['resources/assets/vendor/libs/apex-charts/apexcharts.js', 'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js'])
@endsection

@section('page-script')
    @vite('resources/assets/js/app-invoice-list.js')
@endsection

@section('content')
    <div class="row">
        <!-- View sales -->
        <div class="col-xl-12 mb-4 col-lg-12 col-12">
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
        </div>
        <!-- /Invoice table -->
    </div>
@endsection
