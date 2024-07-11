@extends('layouts/layoutMaster')

@section('title', 'لیست کاربران')

@section('vendor-style')
    @vite(['resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss', 'resources/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.scss', 'resources/assets/vendor/libs/select2/select2.scss', 'resources/assets/vendor/libs/@form-validation/form-validation.scss'])
@endsection

@section('vendor-script')
    @vite(['resources/assets/vendor/libs/moment/moment.js', 'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js', 'resources/assets/vendor/libs/select2/select2.js', 'resources/assets/vendor/libs/@form-validation/popular.js', 'resources/assets/vendor/libs/@form-validation/bootstrap5.js', 'resources/assets/vendor/libs/@form-validation/auto-focus.js', 'resources/assets/vendor/libs/cleavejs/cleave.js', 'resources/assets/vendor/libs/cleavejs/cleave-phone.js'])
@endsection

@section('page-script')
    @vite('resources/assets/js/app-user-list.js')
@endsection

@section('content')

    <div class="card">
        <div class="card-datatable table-responsive">
            <table class="datatables-users table">
                <thead class="border-top">
                    <tr>
                        <th></th>
                        <th>کاربر</th>
                        <th>نقش</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
            </table>
        </div>
        <!-- Offcanvas to add new user -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
            <div class="offcanvas-header">
                <h5 id="offcanvasAddUserLabel" class="offcanvas-title">افزودن کاربر</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="بستن"></button>
            </div>
            <div class="offcanvas-body mx-0 flex-grow-0 pt-0 h-100">
                <form class="add-new-user pt-0" id="addNewUserForm" action="{{ route('create-user.post') }}" method="POST">
                    @csrf
                    <div class="mb-3">
                        <label class="form-label" for="add-user-fullname">نام و نام خانوادگی</label>
                        <input type="text" class="form-control" id="add-user-fullname" placeholder="نـوید" name="name"
                            aria-label="نـوید" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="add-user-email">ایمیل</label>
                        <input type="text" id="add-user-email" class="form-control" placeholder="email@example.com"
                            aria-label="email@example.com" name="email" />
                    </div>
                    <div class="mb-3 form-password-toggle">
                        <label class="form-label" for="userPassword">کلمه عبور</label>
                        <div class="input-group input-group-merge">
                            <input type="password" id="userPassword" name="password" class="form-control"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                autocomplete="new-password" />
                            <span class="input-group-text cursor-pointer" id="userPassword2"><i
                                    class="ti ti-eye-off"></i></span>
                        </div>
                    </div>
                    <div class="mb-3 form-password-toggle">
                        <label class="form-label" for="userRePassword">تایید کلمه عبور</label>
                        <div class="input-group input-group-merge">
                            <input type="password" id="userRePassword" name="rePassword" class="form-control"
                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" />
                            <span class="input-group-text cursor-pointer" id="userRePassword2"><i
                                    class="ti ti-eye-off"></i></span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="user-role">نقش کاربر</label>
                        <select id="user-role" class="form-select" name="role">
                            <option value="user">فروشنده</option>
                            <option value="admin">مدیر</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">ارسال</button>
                    <button type="reset" class="btn btn-label-secondary" data-bs-dismiss="offcanvas">لغو</button>
                </form>
            </div>
        </div>
    </div>

@endsection
