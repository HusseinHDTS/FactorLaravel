@extends('layouts/layoutMaster')

@section('title', 'محصولات - لیست')

@section('vendor-style')
    @vite(['resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.scss'])
@endsection

@section('vendor-script')
    @vite(['resources/assets/vendor/libs/moment/moment.js', 'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js'])
@endsection

@section('page-script')
    @vite('resources/assets/js/app-product-list.js')
@endsection

@section('content')
    <h4 class="py-3 mb-4">
        <span class="text-muted fw-light">محصولات /</span>
        لیست محصولات
    </h4>
    <!-- Invoice List Widget -->
    <div class="card">
        <div class="card-datatable table-responsive">
            <table class="product-list-table table border-top">
                <thead>
                    <tr>
                        <th></th>
                        <th>#شناسه</th>
                        <th>
                            <i class="ti ti-trending-up text-secondary"></i>
                        </th>
                        <th>نام محصول</th>
                        <th>کد طرح</th>
                        <th class="text-truncate">تاریخ</th>
                        <th>تعداد طرح‌ها</th>
                        <th class="cell-fit">عملیات</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
@endsection
