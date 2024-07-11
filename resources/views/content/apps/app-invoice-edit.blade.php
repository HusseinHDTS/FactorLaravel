@extends('layouts/layoutMaster')

@section('title', 'صورتحساب - ویرایش')

@section('vendor-style')
    @vite('resources/assets/vendor/libs/flatpickr/flatpickr.scss')
    @vite('resources/assets/vendor/libs/spinkit/spinkit.scss')
    @vite(['resources/assets/vendor/libs/bs-stepper/bs-stepper.scss', 'resources/assets/vendor/libs/bootstrap-select/bootstrap-select.scss', 'resources/assets/vendor/libs/select2/select2.scss'])
@endsection

@section('page-style')
    @vite('resources/assets/vendor/scss/pages/app-invoice.scss')
    @vite('resources/assets/vendor/scss/pages/multiproduct.scss')
@endsection

@section('vendor-script')
    @vite(['resources/assets/vendor/libs/jdate/jdate.min.js', 'resources/assets/vendor/libs/flatpickr/flatpickr-jdate.js', 'resources/assets/vendor/libs/cleavejs/cleave.js', 'resources/assets/vendor/libs/cleavejs/cleave-phone.js', 'resources/assets/vendor/libs/jquery-repeater/jquery-repeater.js'])
    @vite(['resources/assets/vendor/libs/bs-stepper/bs-stepper.js', 'resources/assets/vendor/libs/bootstrap-select/bootstrap-select.js', 'resources/assets/vendor/libs/select2/select2.js', 'resources/assets/vendor/libs/block-ui/block-ui.js'])
@endsection

@section('page-script')
    @vite(['resources/assets/js/app-invoice-edit.js'])
    @vite(['resources/assets/js/multiproduct.js'])
@endsection

@section('content')
    <script>
        window.savedInvoice = @json($invoice);
    </script>
    <div class="row invoice-edit">
        <!-- Invoice Edit-->
        <div class="col-lg-12 col-12 mb-lg-0 mb-4">
            <div class="card invoice-preview-card">
                <div class="card-body">
                    <div class="row m-sm-4 m-0">
                        <div class="col-md-7 mb-md-0 mb-4 ps-0">
                            <div class="d-flex svg-illustration mb-4 gap-2 align-items-center">
                                <div class="app-brand-logo demo">@include('_partials.macros', ['height' => 22, 'withbg' => ''])</div>
                                <span class="app-brand-text fw-bold fs-4">
                                    {{ config('variables.templateName') }}
                                </span>
                            </div>
                            <p class="mb-1">
                                <span class="ms-3 fw-medium">فروشنده:</span>
                                <span>{{ $invoice->user->name }}</span>
                            </p>
                            <span class="ms-3">با تشکر از کسب و کار شما</span>
                        </div>
                        <div class="col-md-5">
                            <dl class="row mb-2">
                                <dt class="col-sm-6 mb-2 mb-sm-0 text-md-end ps-0">
                                    <span class="h4 text-capitalize mb-0 text-nowrap">صورتحساب</span>
                                </dt>
                                <dd class="col-sm-6 d-flex justify-content-md-end pe-0 ps-0 ps-sm-2">
                                    <div class="input-group input-group-merge disabled w-px-150">
                                        <span class="input-group-text">#</span>
                                        <input class="form-control text-center" id="invoiceId" type="text"
                                            value="{{ $invoice->id }}" disabled />
                                    </div>
                                </dd>
                                <dt class="col-sm-6 mb-2 mb-sm-0 text-md-end ps-0 align-items-center">
                                    <span class="fw-normal d-inline-block mt-2">تـاریـخ صــدور:</span>
                                </dt>
                                <dd class="col-sm-6 d-flex justify-content-md-end pe-0 ps-0 ps-sm-2">
                                    <input class="form-control w-px-150" type="text" value="{{ $invoice->created_at }}"
                                        disabled />
                                </dd>
                                <dt class="col-sm-6 mb-2 mb-sm-0 text-md-end ps-0 align-items-center">
                                    <span class="fw-normal d-inline-block mt-2">تاریخ ویرایش:</span>
                                </dt>
                                <dd class="col-sm-6 d-flex justify-content-md-end pe-0 ps-0 ps-sm-2">
                                    <input class="form-control w-px-150" type="text"
                                        value="{{ $invoice->payment_date ?? $invoice->updated_at }}" disabled />
                                </dd>
                            </dl>
                        </div>
                    </div>

                    <hr class="my-3 mx-n4" />

                    <div class="row p-0">
                        <div class="bs-stepper wizard-icons wizard-icons-invoice mt-2">
                            <div class="bs-stepper-header">
                                <div class="step" data-target="#account-details">
                                    <button class="step-trigger" type="button">
                                        <span class="bs-stepper-icon">
                                            <svg viewBox="0 0 54 54">
                                                <use
                                                    xlink:href="../../../assets/svg/icons/form-wizard-account.svg#wizardAccount">
                                                </use>
                                            </svg>
                                        </span>
                                        <span class="bs-stepper-label">اطلاعات مشتری</span>
                                    </button>
                                </div>
                                <div class="line">
                                    <i class="ti ti-chevron-right"></i>
                                </div>
                                <div class="step" data-target="#personal-info">
                                    <button class="step-trigger" type="button">
                                        <span class="bs-stepper-icon">
                                            <svg viewBox="0 0 58 54">
                                                <use
                                                    xlink:href="../../../assets/svg/icons/form-wizard-personal.svg#wizardPersonal">
                                                </use>
                                            </svg>
                                        </span>
                                        <span class="bs-stepper-label">اطلاعات محصول</span>
                                    </button>
                                </div>
                                <div class="line">
                                    <i class="ti ti-chevron-right"></i>
                                </div>
                                <div class="step" data-target="#payment-info">
                                    <button class="step-trigger" type="button">
                                        <span class="bs-stepper-icon">
                                            <svg viewBox="0 0 58 54">
                                                <use
                                                    xlink:href="../../../assets/svg/icons/wizard-checkout-payment.svg#wizardPayment">
                                                </use>
                                            </svg>
                                        </span>
                                        <span class="bs-stepper-label">اطلاعات ارسال</span>
                                    </button>
                                </div>
                                <div class="line">
                                    <i class="ti ti-chevron-right"></i>
                                </div>
                                <div class="step" data-target="#review-submit">
                                    <button class="step-trigger" type="button">
                                        <span class="bs-stepper-icon">
                                            <svg viewBox="0 0 54 54">
                                                <use
                                                    xlink:href="../../../assets/svg/icons/form-wizard-submit.svg#wizardSubmit">
                                                </use>
                                            </svg>
                                        </span>
                                        <span class="bs-stepper-label">بررسی و ثبت</span>
                                    </button>
                                </div>
                            </div>
                            <div class="bs-stepper-content">
                                <form onSubmit="return false">
                                    <!-- Account Details -->
                                    <div class="content" id="account-details">
                                        <div class="content-header mb-3">
                                            <h6 class="mb-0">اطلاعات مشتری</h6>
                                        </div>
                                        <div class="row">
                                            <input id="onwer_id" type="text" value="{{ $invoice->owner_id }}" hidden>
                                            <div class="col-md-12 mb-md-0 mb-3">
                                                <div class="row g-3 mb-3">
                                                    <p class="mb-0">نام مشتری :</p>
                                                    <div class="col-12 mt-0">
                                                        <input class="form-control" id="customer_name" name="customer_name"
                                                            placeholder="نام مشتری ..." type="text" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mb-3">
                                                    <p class="mb-1">تلفن مشتری :</p>
                                                    <div class="col-12 mt-0">
                                                        <input class="form-control" id="customer_phone"
                                                            name="customer_phone" placeholder="شماره تلفن ..."
                                                            type="tel" dir="rtl" />
                                                    </div>
                                                </div>
                                                <div class="row g-3 mb-3">
                                                    <p class="mb-1">کد پستی مشتری :</p>
                                                    <div class="col-12 mt-0">
                                                        <input class="form-control" id="customer_postcode"
                                                            name="customer_postcode" placeholder="کد پستی ..."
                                                            type="mobile" />
                                                    </div>
                                                </div>
                                                <p class="mb-2">نحوه آشنایی با ما :</p>
                                                <select id="way_to_know" class="mb-4 form-control">
                                                    <option value="" selected>انتخاب کنید ...</option>
                                                    <option value="Instagram">اینستاگرام</option>
                                                    <option value="Divar">دیوار</option>
                                                    <option value="Site">سایت</option>
                                                    <option value="Relations">آشنایان</option>
                                                    <option value="Old Purchase">خرید قبلی</option>
                                                    <option value="Other">سایر</option>
                                                </select>
                                                <p class="mb-2">ثبت سفارش از طریق :</p>
                                                <select id="order_type" class="mb-4 form-control">
                                                    <option value="" selected>انتخاب کنید ...</option>
                                                    <option value="InPerson">حضوری</option>
                                                    <option value="Instagram">اینستاگرام</option>
                                                    <option value="Site">سایت</option>
                                                    <option value="Phone">تلفنی</option>
                                                    <option value="Whatsapp">واتسپ</option>
                                                    <option value="Telegram">تلگرام</option>
                                                </select>
                                            </div>
                                            <hr class="my-3" />
                                            <div class="col-12 d-flex justify-content-between">
                                                <button class="btn btn-prev" disabled>
                                                    <i class="ti ti-arrow-left me-sm-1"></i>
                                                    <span class="align-middle d-sm-inline-block d-none">قبلی</span>
                                                </button>
                                                <button class="btn btn-primary btn-next">
                                                    <span class="align-middle d-sm-inline-block d-none me-sm-1">بعدی</span>
                                                    <i class="ti ti-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Personal Info -->
                                    <div class="content" id="personal-info">
                                        <div class="content-header mb-3">
                                            <h6 class="mb-0">اطلاعات محصول</h6>
                                        </div>
                                        <div id="productSelectionContainer">
                                            <div class="row product-selection p-1 mb-4 border border-2">
                                                <div class="col-12 text-end mt-3 remove-product-button">
                                                    <i class="ti ti-x cursor-pointer "></i>
                                                </div>
                                                <p class="mb-2">انتخاب محصول :</p>
                                                <div class="col-12 px-4">
                                                    <select class="mb-4 form-control product-type-select">
                                                        <option value="" selected>انتخاب کنید ...</option>
                                                        <option value="Roofarshi">روفرشی</option>
                                                        <option value="Farshine">فرشینه</option>
                                                        <option value="Padari">پادری</option>
                                                        <option value="Koosan">کوسن</option>
                                                        <option value="CoverToshak">کاور تشک</option>
                                                        <option value="CoverZedAb">کاور ضد آب</option>
                                                        <option value="ZirSofre">زیر سفره</option>
                                                        <option value="RooTakhti">رو تختی</option>
                                                        <option value="ZirPayeMobli">زیر پایه مبلی</option>
                                                        <option value="ChasbRisheFarsh">چسب ریشه فرش</option>
                                                    </select>
                                                    <div class="product-details-container"></div>
                                                </div>

                                            </div>
                                        </div>
                                        <button id="addProductButton" class="btn btn-primary mb-4">افزودن محصول
                                            دیگر</button>
                                        <div class="col-12 d-flex justify-content-between">
                                            <button class="btn btn-label-secondary btn-prev">
                                                <i class="ti ti-arrow-left me-sm-1"></i>
                                                <span class="align-middle d-sm-inline-block d-none">قبلی</span>
                                            </button>
                                            <button class="btn btn-primary btn-next">
                                                <span class="align-middle d-sm-inline-block d-none me-sm-1">بعدی</span>
                                                <i class="ti ti-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <!-- Personal Info -->
                                    <div class="content" id="payment-info">
                                        <div class="content-header mb-3">
                                            <h6 class="mb-0">اطلاعات تحویل و پرداخت</h6>
                                        </div>
                                        <div class="col-md-12 mb-md-0 mb-3">
                                            <p class="mb-2">نحوه تحویل :</p>
                                            <select id="way_to_send" name="way_to_send"
                                                class="mb-4 form-control info-picker">
                                                <option value="" selected>انتخاب کنید ...</option>
                                                <option value="InShop">در فروشگاه تحویل مشتری داده شد</option>
                                                <option value="WithPost">با پست ارسال شود</option>
                                                <option value="WithTPax">با تی‌پاکس ارسال شود</option>
                                                <option value="Courier">پیک شود</option>
                                                <option value="Coordinate">پس از آماده سازی برای ارسال هماهنگ شود</option>
                                            </select>
                                            <p class="mb-2">نحوه پرداخت :</p>
                                            <select id="payment_type" name="payment_type"
                                                class="mb-4 form-control info-picker">
                                                <option value="" selected>انتخاب کنید ...</option>
                                                <option value="CardReader">کارتخوان فروشگاه</option>
                                                <option value="InCash">نقدی</option>
                                                <option value="CardByCard">کارت به کارت</option>
                                                <option value="Site">پرداخت از طریق سایت</option>
                                            </select>
                                            <div id="CardByCardContent"></div>
                                            <div class="row g-3 mb-3">
                                                <p class="mb-0">مبلغ کل فاکتور :</p>
                                                <div class="d-flex mt-0">
                                                    <input class="form-control price-input info-input" id="full_price"
                                                        name="full_price" placeholder="مبلغ کل فاکتور ..." type="tel"
                                                        dir="rtl" />
                                                    <span
                                                        class="ms-2 px-3 border border-1 text-center align-content-center fw-bold"
                                                        style="border-radius: 8px">تومان</span>
                                                </div>
                                            </div>
                                            <div class="row g-3 mb-3">
                                                <p class="mb-0">تخفیف :</p>
                                                <div class="d-flex mt-0">
                                                    <input class="form-control info-input" id="full_price_off"
                                                        name="full_price_off" placeholder="تخفیف به درصد ..."
                                                        type="number" value="0" dir="rtl" />
                                                    <span
                                                        class="ms-2 px-3 border border-1 text-center align-content-center fw-bold"
                                                        style="border-radius: 8px">%</span>
                                                </div>
                                            </div>
                                            <div class="row g-3 mb-3">
                                                <p class="mb-0">پرداختی :</p>
                                                <div class="d-flex mt-0">
                                                    <input class="form-control price-input info-input"
                                                        id="full_price_paying" name="full_price_paying"
                                                        placeholder="مبلغ پرداختی ..." type="tel" dir="rtl" />
                                                    <span
                                                        class="ms-2 px-3 border border-1 text-center align-content-center fw-bold"
                                                        style="border-radius: 8px">تومان</span>
                                                </div>
                                            </div>
                                            <div class="row g-3 mb-3">
                                                <p class="mb-0">الباقی :</p>
                                                <div class="d-flex mt-0">
                                                    <input class="form-control price-input info-input"
                                                        id="full_price_remaining" name="full_price_remaining"
                                                        placeholder="الباقی ..." type="tel" dir="rtl" />
                                                    <span
                                                        class="ms-2 px-3 border border-1 text-center align-content-center fw-bold"
                                                        style="border-radius: 8px">تومان</span>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-12 d-flex justify-content-between">
                                            <button class="btn btn-label-secondary btn-prev">
                                                <i class="ti ti-arrow-left me-sm-1"></i>
                                                <span class="align-middle d-sm-inline-block d-none">قبلی</span>
                                            </button>
                                            <button class="btn btn-primary btn-next">
                                                <span class="align-middle d-sm-inline-block d-none me-sm-1">بعدی</span>
                                                <i class="ti ti-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <!-- Review -->
                                    <div class="content" id="review-submit">
                                        <p class="fw-bolder mb-2">حساب</p>
                                        <ul class="list-unstyled fw-normal">
                                            <p class="fw-bold mb-0">نام مشتری:</p>
                                            <li id="final-customer-name" class="mb-2"></li>

                                            <p class="fw-bold mb-0">شماره تلفن مشتری:</p>
                                            <li id="final-customer-mobile" class="mb-2"></li>

                                            <p class="fw-bold mb-0">کد پستی مشتری:</p>
                                            <li id="final-customer-postcode" class="mb-2"></li>

                                            <p class="fw-bold mb-0">نحوه آشنایی :</p>
                                            <li id="final-customer-way-to-know" class="mb-2"></li>

                                            <p class="fw-bold mb-0">ثبت سفارش از طریق :</p>
                                            <li id="final-customer-order-type" class="mb-2"></li>
                                        </ul>
                                        <hr />
                                        <div class="border border-2" style="border-radius:8px">
                                            <div class="productListInfo"></div>
                                        </div>
                                        <hr />
                                        <p class="fw-bolder mb-2">جزئیات ارسال</p>
                                        <ul class="list-unstyled fw-normal">
                                            <p class="fw-bold mb-0">نحوه تحویل:</p>
                                            <li id="final-way-to-send" class="mb-2"></li>

                                            <p class="fw-bold mb-0">نحوه پرداخت:</p>
                                            <li id="final-payment-type" class="mb-2"></li>

                                            <p class="fw-bold mb-0">نام بانک:</p>
                                            <li id="final-bank-name" class="mb-2"></li>

                                            <p class="fw-bold mb-0">تاریخ و ساعت واریز :</p>
                                            <li id="final-payment-date" class="mb-2"></li>

                                        </ul>
                                        <hr />
                                        <div class="col-12 d-flex justify-content-between">
                                            <button class="btn btn-label-secondary btn-prev">
                                                <i class="ti ti-arrow-left me-sm-1"></i>
                                                <span class="align-middle d-sm-inline-block d-none">قبلی</span>
                                            </button>
                                            <button type="button" class="btn btn-success btn-submit-edit">ذخیره</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <hr class="my-3 mx-n4" />
                    <div class="col-md-12 d-flex justify-content-end">
                        <div class="invoice-calculations">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="w-px-150">مبلغ کل فاکتور:</span>
                                <span class="fw-medium" id="final-full-price">00.00 تومان</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="w-px-100">تخفیف:</span>
                                <span class="fw-medium" id="final-price-off">0 %</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span class="w-px-100">الباقی:</span>
                                <span class="fw-medium" id="final-price-remaining">00.00 تومان</span>
                            </div>
                            <hr />
                            <div class="d-flex justify-content-between">
                                <span class="w-px-100">پرداختی:</span>
                                <span class="fw-medium" id="final-price-paying">00.00 تومان</span>
                            </div>
                        </div>
                    </div>
                    {{-- <hr class="my-3 mx-n4" />
                    <div class="d-flex my-2">
                        <a href="{{ url('app/invoice/delete/' . $invoice->id) }}"
                            class="btn btn-label-danger w-100 me-2">حذف</a>
                    </div> --}}
                </div>
            </div>
        </div>
        <!-- /Invoice Edit-->

    </div>

@endsection
