@extends('layouts/layoutMaster')

@section('title', 'محصولات - افزودن')

@section('vendor-style')
    @vite(['resources/assets/vendor/libs/quill/typography.scss', 'resources/assets/vendor/libs/quill/katex.scss', 'resources/assets/vendor/libs/quill/editor.scss', 'resources/assets/vendor/libs/select2/select2.scss', 'resources/assets/vendor/libs/dropzone/dropzone.scss', 'resources/assets/vendor/libs/flatpickr/flatpickr.scss', 'resources/assets/vendor/libs/tagify/tagify.scss'])
@endsection

@section('vendor-script')
    @vite(['resources/assets/vendor/libs/quill/katex.js', 'resources/assets/vendor/libs/quill/quill.js', 'resources/assets/vendor/libs/select2/select2.js', 'resources/assets/vendor/libs/dropzone/dropzone.js', 'resources/assets/vendor/libs/jquery-repeater/jquery-repeater.js', 'resources/assets/vendor/libs/jdate/jdate.min.js', 'resources/assets/vendor/libs/flatpickr/flatpickr-jdate.js', 'resources/assets/vendor/libs/flatpickr-jalali/dist/l10n/fa.js', 'resources/assets/vendor/libs/tagify/tagify.js'])
@endsection

@section('page-script')
    @vite(['resources/assets/js/app-product-add.js'])
@endsection

@section('content')

    <h4 class="py-3 mb-0">
        <span class="text-muted fw-light">محصولات /</span>
        افزودن محصول
    </h4>
    <div class="app-ecommerce">
    <!-- Add Product Form -->
    <form action="{{ route('app-product-add.post') }}" method="POST" id="productForm">
        @csrf
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
            <div class="d-flex flex-column justify-content-center">
                <h4 class="mb-1 mt-3">یک طرح جدید اضافه کنید</h4>
                <p class="text-muted">طرح‌هایی که ساخته میشود در قسمت ایجاد فاکتور قابل انتخاب و نمایش هستند</p>
            </div>
            <div class="d-flex align-content-center flex-wrap gap-3">
                <div class="d-flex gap-3">
                </div>
                <button class="btn btn-primary" type="submit">انتشار طرح</button>
            </div>
        </div>
        <div class="row">
            <!-- First column-->
            <div class="col-12 col-lg-8">
                <!-- Product Information -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-tile mb-0">اطلاعات طرح</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label" for="ecommerce-product-name">نام</label>
                            <input aria-label="عنوان طرح" class="form-control" id="ecommerce-product-name"
                                name="name" placeholder="عنوان طرح" type="text" required />
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <label class="form-label" for="ecommerce-product-sku">کد طرح</label>
                                <input aria-label="طرح SKU" class="form-control" id="ecommerce-product-sku"
                                    name="sku" placeholder="SKU" type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Product Information -->
            </div>
            <!-- /First column -->

            <!-- Second column -->
            <div class="col-12 col-lg-4">
                <!-- Pricing Card -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0">اندازه ها</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-repeater">
                            <div data-repeater-list="items">
                                <div data-repeater-item>
                                    <div class="row">
                                        <div class="col-12 text-end mt-3 remove-product-button"
                                            data-repeater-delete>
                                            <i class="ti ti-x cursor-pointer"></i>
                                        </div>
                                        <div class="mb-3 col-4">
                                            <input class="form-control" id="form-repeater-1-2" placeholder="اندازه"
                                                type="text" name="sizes" />
                                        </div>
                                        <div class="mb-3 col-8">
                                            <input class="form-control price-input" id="form-repeater-1-1"
                                                placeholder="قیمت" type="tel" dir="rtl" name="prices" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-primary" type="button" data-repeater-create>افزودن اندازه</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Pricing Card -->
                <!-- Organize Card -->
                <!-- /Organize Card -->
            </div>
            <div class="col-12">
              <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">جزئیات</h5>
                </div>
                <div class="card-body">
                    <!-- Vendor -->
                    <div class="mb-3 col ecommerce-select2-dropdown">
                        <label class="form-label mb-1" for="vendor">محصول</label>
                        <select class="select2 form-select" data-placeholder="انتخاب محصول" name="category" required>
                            <option value="">محصول را انتخاب کنید</option>
                            <option value="Roofarshi">روفرشی</option>
                            <option value="Farshine">فرشینه</option>
                            <option value="Padari">پادری</option>
                            <option value="Koosan">کوسن</option>
                            <option value="CoverToshak">کاور تشک</option>
                            <option value="CoverZedAb">کاور ضدآب</option>
                            <option value="ZirSofre">زیر سفره</option>
                            <option value="Rootakhti">روتختی</option>
                            <option value="ZirPayeMobli">زیر پایه مبلی</option>
                            <option value="ChasbRisheFarsh">چسب ریشه فرش</option>
                        </select>
                    </div>
                </div>
            </div>
            </div>
            <!-- /Second column -->
        </div>
    </form>

    <!-- Dropzone for Media -->
    {{-- <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0 card-title">رسانه ها</h5>
        </div>
        <div class="card-body">
            <form action="{{ route('file.upload') }}" id="dropzone-basic" class="dropzone">
                @csrf
                <div class="dz-message needsclick">
                    <p class="fs-4 note needsclick pt-3 mb-1">کشیدن و رهاکردن</p>
                    <p class="text-muted d-block fw-normal mb-2">یا</p>
                    <span class="note needsclick btn bg-label-primary d-inline" id="btnBrowse">انتخاب از
                        فایل
                        ها</span>
                </div>
                <div class="fallback">
                    <input name="file" type="file" />
                </div>
            </form>
        </div>
    </div> --}}
    <!-- /Dropzone for Media -->
</div>

@endsection
