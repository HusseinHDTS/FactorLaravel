@extends('layouts/layoutMaster')

@section('title', 'فاکتور (نسخه چاپی)')

@section('page-style')
    @vite('resources/assets/vendor/scss/pages/app-invoice-print.scss')
@endsection

@section('page-script')
    @vite('resources/assets/js/app-invoice-print.js')
@endsection

@section('content')
    <style>
        @media print {

            header,
            footer {
                display: none !important;
            }

            @page {
                size: 324mm 150mm;
                margin: 0;
                orientation: portrait;
            }
        }
    </style>
    <div class="invoice-print p-5">
        <div class="row d-flex justify-content-between mb-4">
            <h6>پرداخت کننده:</h6>
            <div class="col-sm-4">
                <p class="mb-1">نام : {{ $invoice->customer_name }}</p>
            </div>
            <div class="col-sm-4">
                <p class="mb-1">تماس : {{ $invoice->customer_phone }}</p>
            </div>
            <div class="col-sm-4">
                <p class="mb-1">کد پستی: {{ $invoice->customer_postcode }}</p>
            </div>
            <div class="col-sm-4 mt-4">
                <p class="mb-1">آدرس: {{ $invoice->customer_address }}</p>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table m-0">
                <thead class="table-light">
                    <tr>
                        <th>مورد</th>
                        <th>شرح</th>
                        <th>تعداد</th>
                        <th>سایز غیر استاندارد</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($invoice->productDetails as $productDetail)
                        <tr>
                            <td class="text-nowrap">
                                {{ $productDetail->productName }} {{ $productDetail->productDesignName }} </td>
                            <td class="text-nowrap">
                                سایز
                                {{ $productDetail->productSizeName ?? 'غیر استاندارد' }}
                            </td>
                            <td>{{ $productDetail->productCount }} عدد</td>
                            <td>{{ $productDetail->productCustomSize ?? 'خیر' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

    </div>
@endsection
