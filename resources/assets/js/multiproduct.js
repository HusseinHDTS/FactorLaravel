'use strict';
import axios from 'axios';

$(document).ready(function () {
  var productInfoList = {};

  $('#customer_name').on('input', function () {
    $('#final-customer-name').text($(this).val());
  });
  $('#customer_phone').on('input', function () {
    $('#final-customer-mobile').text($(this).val());
  });
  $('#customer_postcode').on('input', function () {
    $('#final-customer-postcode').text($(this).val());
  });
  $('#customer_address').on('input', function () {
    $('#final-customer-address').text($(this).val());
  });
  $('#way_to_know').on('change', function () {
    var selectedText = $(this).find('option:selected').text();
    $('#final-customer-way-to-know').text(selectedText);
  });
  $('#order_type').on('change', function () {
    var selectedText = $(this).find('option:selected').text();
    $('#final-customer-order-type').text(selectedText);
  });
  const Roofarshi = `
            <hr class="my-3" />

            <div class="row mb-3">
              <p class="mb-2">تعداد :</p>
              <div class="">
                <input class="form-control count-input info-input" id="product_count"
                    name="productCount" placeholder="تعداد ..."
                    type="number" value="1"/>
              </div>
            </div>
            <p class="mb-2">ابعاد سفارش:</p>
            <select id="productSizeSelect" class="mb-4 form-control size-picker info-picker" name="productSize">
                <option value="" selected>انتخاب کنید ...</option>
                <option value="Standard">استاندارد</option>
                <option value="NotStandard">غیر استاندارد</option>
                <option value="Unknown">نامشخص</option>
            </select>
            <div class="productSizeContainer"></div>
            <p class="mb-2">مدل دوخت:</p>
            <select class="mb-4 form-control design-picker info-picker" name="productDesign" >
                <option value="" selected>انتخاب کنید ...</option>
                <option value="Keshdar">کشدار</option>
                <option value="Chasbi">چسبی</option>
                <option value="Packet">پاکتی</option>
            </select>
            `;
  const Farshine = `
            <hr class="my-3" />
            <div class="row mb-3">
              <p class="mb-2">تعداد :</p>
              <div class="">
                <input class="form-control count-input info-input" id="product_count"
                    name="productCount" placeholder="تعداد ..."
                    type="number" value="1"/>
              </div>
            </div>
            <p class="mb-2">انتخاب طرح:</p>
            <select class="mb-4 form-control design-picker info-picker" name="productDesign" >
                <option value="" selected>انتخاب کنید ...</option>
                <option value="Keshdar">کشدار</option>
                <option value="Chasbi">چسبی</option>
                <option value="Packet">پاکتی</option>
            </select>
            <div class="row g-3">
              <div class="align-items-center mb-3 col-6">
              <p class="mb-2">طول:</p>
                <input class="form-control info-input productWidth" name="productWidth" value="1" placeholder="طول فرشینه ..."
                    type="number" />
              </div>
              <div class="align-items-center mb-3 col-6">
                <p class="mb-2">عرض:</p>
                <input class="form-control info-input productHeight" name="productHeight" value="1" placeholder="عرض فرشینه ..."
                    type="number" />
              </div>
            </div>
            <p class="mb-0">قیمت:</p>
            <div id="productPrice"></div>
            `;
  const Padari = `
            <hr class="my-3" />
            <div class="row mb-3">
              <p class="mb-2">تعداد :</p>
              <div class="">
                <input class="form-control count-input info-input" id="product_count"
                    name="productCount" placeholder="تعداد ..."
                    type="number" value="1"/>
              </div>
            </div>
            <p class="mb-2">انتخاب طرح:</p>
            <select class="mb-4 form-control design-picker info-picker" name="productDesign" >
                <option value="" selected>انتخاب کنید ...</option>
                <option value="Keshdar">کشدار</option>
                <option value="Chasbi">چسبی</option>
                <option value="Packet">پاکتی</option>
            </select>
            <p class="mb-2">انتخاب سایز:</p>
            <select class="mb-4 form-control size-picker info-picker" name="productSize">
                <option value="" selected>انتخاب کنید ...</option>
                <option value="50x70">50x70</option>
                <option value="50x80">50x80</option>
            </select>
            `;
  const Koosan = `
            <hr class="my-3" />
            <div class="row mb-3">
              <p class="mb-2">تعداد :</p>
              <div class="">
                <input class="form-control count-input info-input" id="product_count"
                    name="productCount" placeholder="تعداد ..."
                    type="number" value="1"/>
              </div>
            </div>
            <p class="mb-2">انتخاب طرح:</p>
            <select class="mb-4 form-control design-picker info-picker" name="productDesign">
                <option value="" selected>انتخاب کنید ...</option>
                <option value="Keshdar">کشدار</option>
                <option value="Chasbi">چسبی</option>
                <option value="Packet">پاکتی</option>
            </select>
            `;
  const CoverToshak = `
            <hr class="my-3" />
            <div class="row mb-3">
              <p class="mb-2">تعداد :</p>
              <div class="">
                <input class="form-control count-input info-input" id="product_count"
                    name="productCount" placeholder="تعداد ..."
                    type="number" value="1"/>
              </div>
            </div>
            <p class="mb-2">انتخاب طرح:</p>
            <select class="mb-4 form-control design-picker info-picker" name="productDesign">
                <option value="" selected>انتخاب کنید ...</option>
                <option value="Keshdar">کشدار</option>
                <option value="Chasbi">چسبی</option>
                <option value="Packet">پاکتی</option>
            </select>
            <p class="mb-2">انتخاب سایز:</p>
            <select class="mb-4 form-control size-picker info-picker" name="productSize">
                <option value="" selected>انتخاب کنید ...</option>
                <option value="50x70">50x70</option>
                <option value="50x80">50x80</option>
            </select>
            `;
  const CoverZedAb = `
            <hr class="my-3" />
            <div class="row mb-3">
              <p class="mb-2">تعداد :</p>
              <div class="">
                <input class="form-control count-input info-input" id="product_count"
                    name="productCount" placeholder="تعداد ..."
                    type="number" value="1"/>
              </div>
            </div>
            <p class="mb-2">انتخاب سایز:</p>
            <select class="mb-4 form-control size-picker info-picker" name="productSize">
                <option value="" selected>انتخاب کنید ...</option>
                <option value="50x70">50x70</option>
                <option value="50x80">50x80</option>
            </select>
            `;
  const ZirSofre = `
            <hr class="my-3" />
            <div class="row mb-3">
              <p class="mb-2">تعداد :</p>
              <div class="">
                <input class="form-control count-input info-input" id="product_count"
                    name="productCount" placeholder="تعداد ..."
                    type="number" value="1" />
              </div>
            </div>
            <p class="mb-2">انتخاب طرح:</p>
            <select class="mb-4 form-control design-picker info-picker" name="productDesign">
                <option value="" selected>انتخاب کنید ...</option>
                <option value="Keshdar">کشدار</option>
                <option value="Chasbi">چسبی</option>
                <option value="Packet">پاکتی</option>
            </select>
            `;
  const RooTakhti = `
            <hr class="my-3" />
            <div class="row mb-3">
              <p class="mb-2">تعداد :</p>
              <div class="">
                <input class="form-control count-input info-input" id="product_count"
                    name="productCount" placeholder="تعداد ..."
                    type="number" value="1"/>
              </div>
            </div>
            <p class="mb-2">انتخاب طرح:</p>
            <select class="mb-4 form-control design-picker info-picker" name="productDesign">
                <option value="" selected>انتخاب کنید ...</option>
                <option value="Keshdar">کشدار</option>
                <option value="Chasbi">چسبی</option>
                <option value="Packet">پاکتی</option>
            </select>
            <p class="mb-2">انتخاب سایز:</p>
            <select class="mb-4 form-control size-picker info-picker" name="productSize">
                <option value="" selected>انتخاب کنید ...</option>
                <option value="50x70">50x70</option>
                <option value="50x80">50x80</option>
            </select>
            `;
  const ZirPayeMobli = `
          <hr class="my-3" />
          <div class="row mb-3">
            <p class="mb-2">تعداد :</p>
            <div class="">
              <input class="form-control count-input info-input" id="product_count"
                  name="productCount" placeholder="تعداد ..."
                  type="number" value="1"/>
            </div>
          </div>
            `;
  const ChasbRisheFarsh = `
          <hr class="my-3" />
          <div class="row mb-3">
            <p class="mb-2">تعداد :</p>
            <div class="">
              <input class="form-control count-input info-input" id="product_count"
                  name="productCount" placeholder="تعداد ..."
                  type="number" value="1" />
            </div>
          </div>
            `;
  var contentMap = {
    Roofarshi: Roofarshi,
    Farshine: Farshine,
    Padari: Padari,
    Koosan: Koosan,
    CoverToshak: CoverToshak,
    CoverZedAb: CoverZedAb,
    ZirSofre: ZirSofre,
    RooTakhti: RooTakhti,
    ZirPayeMobli: ZirPayeMobli,
    ChasbRisheFarsh: ChasbRisheFarsh
  };
  function defineDefaultProducts(invoice) {
    $('#customer_name').val(invoice.customer_name);
    $('#customer_phone').val(invoice.customer_phone);
    $('#customer_postcode').val(invoice.customer_postcode);
    $('#customer_address').val(invoice.customer_address);
    $('#way_to_know').val(invoice.way_to_know).change();
    $('#order_type').val(invoice.order_type).change();
    $('#way_to_send').val(invoice.way_to_send).change();
    $('#payment_type').val(invoice.payment_type).change();
    $('.payment-bank-name').val(invoice.payment_bank_name).change();
    $('#full_price').val(invoice.full_price).change();
    $('#full_price_off').val(invoice.price_off).change();
    $('#full_price_paying').val(invoice.price_paying).change();
    $('#full_price_remaining').val(invoice.price_remaining).change();
    if (invoice.payment_date) {
      $('.payment-year').val(new Date(invoice.payment_date).getFullYear()).change();
      $('.payment-month').val(new Date(invoice.payment_date).getMonth()).change();
      $('.payment-day').val(new Date(invoice.payment_date).getDate()).change();
      $('.payment-hour').val(new Date(invoice.payment_date).getHours()).change();
      $('.payment-minute').val(new Date(invoice.payment_date).getMinutes()).change();
    }
    invoice.product_details.forEach(item => {
      var newProductSelection = $('.product-selection:first').clone();
      newProductSelection.find('.product-details-container').html('');
      $('#productSelectionContainer').append(newProductSelection);
      addProductSelectionHandlers(newProductSelection);
      newProductSelection.find('.product-type-select').val(item.productType).change();
      newProductSelection.find('.count-input').val(item.productCount).change();
      newProductSelection.find('.design-picker').val(item.productDesign).change();
      newProductSelection.find('.size-picker').val(item.productSize).change();
      if (item.productSize == 'NotStandard') {
        if (newProductSelection.find('.productCustomSize')) {
          newProductSelection.find('.productCustomSize').val(item.productCustomSize);
        } else if (newProductSelection.find('.productHeight')) {
          newProductSelection.find('.productWidth').val(item.productCustomSize.split('x')[0]).change();
          newProductSelection.find('.productHeight').val(item.productCustomSize.split('x')[1]).change();
        }
      }
      updateRemoveButtonVisibility();
      updateJSONData();
    });
    $('.product-selection:first').remove();
  }
  function addProductSelectionHandlers(container) {
    container.find('.product-type-select').on('change', function () {
      var selectedValue = this.value;
      var detailsContainer = $(this).siblings('.product-details-container');
      detailsContainer.html(contentMap[selectedValue] || '<div></div>');
      if (selectedValue == 'Roofarshi') {
        $('.size-picker').on('change', function () {
          var selectedSizeValue = this.value;
          var productSizeContainer = detailsContainer.find('.productSizeContainer');
          if (selectedSizeValue == 'NotStandard') {
            productSizeContainer.html(`
              <div class="mb-3 mx-4">
                <p class="mb-2">ابعاد درخواستی :</p>
                <input class="form-control info-input productCustomSize" name="productCustomSize" placeholder="ابعاد درخواستی ..." type="text" />
              </div>
            `);
          } else {
            productSizeContainer.html('');
          }
        });
      } else if (selectedValue == 'Farshine') {
        var width = 1;
        var height = 1;
        calculatePrice(width, height);
      }
      updateJSONData();
    });
    container.find('.remove-product-button').on('click', function () {
      $(this).closest('.product-selection').remove();
      updateRemoveButtonVisibility();
    });
  }
  function calculatePrice(width = 1, height = 1) {
    var productPrice = $('#productPrice');
    productPrice.html((100000 + 650000 * (width * height)).toLocaleString('en') + ' تومان ');
  }
  function initListener() {
    $('#payment_type').on('change', function () {
      const selectedValue = $(this).val();
      var html = '';
      if (selectedValue == 'CardByCard') {
        var jDate = new Date();
        var date = new Date();
        jDate = jDate.toLocaleDateString('fa-IR-u-nu-latn');
        html +=
          `
          <div class="mb-3 mx-2 border border-2 p-3" style="border-radius:8px;">
            <div class="mb-4">
              <p class="mb-0">نام بانک:</p>
              <input type="text" class="form-control info-input payment-bank-name" placeholder="پاسارگاد">
            </div>
            <p class="mb-0">تاریخ و ساعت واریز:</p>
            <div class="row mx-2">
              <div class="col-md-2">
                <p class="mb-0">سال:</p>
                <input type="number" class="form-control info-input payment-year" value="` +
          jDate.split('/')[0] +
          `" placeholder="1403">
              </div>
              <div class="col-md-2">
                <p class="mb-0">ماه:</p>
                <input type="number" class="form-control info-input payment-month" value="` +
          jDate.split('/')[1] +
          `" placeholder="01">
              </div>
              <div class="col-md-2">
                <p class="mb-0">روز:</p>
                <input type="number" class="form-control info-input payment-day" value="` +
          jDate.split('/')[2] +
          `" placeholder="11">
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-5 d-flex">
                <div class="mx-2">
                  <p class="mb-0">ساعت:</p>
                  <input type="number" class="form-control info-input payment-hour" value="` +
          date.getHours() +
          `" placeholder="11">
                </div>
                <div class="mx-2">
                  <p class="mb-0">دقیقه:</p>
                  <input type="number" class="form-control info-input payment-minute" value="` +
          date.getMinutes() +
          `" placeholder="11">
                </div>
              </div>
            </div>
            <div class="mb-2"></div>
          </div>
        `;
      }
      $('#CardByCardContent').html(html);
    });
    $('#addProductButton').on('click', function () {
      var newProductSelection = $('.product-selection:first').clone();
      newProductSelection.find('select').val('');
      newProductSelection.find('.product-details-container').html('');
      $('#productSelectionContainer').append(newProductSelection);
      addProductSelectionHandlers(newProductSelection);
      updateRemoveButtonVisibility();
    });
  }
  function initializePage() {
    var productSelections = $('.product-selection');
    if (productSelections.length === 1) {
      productSelections.first().find('.remove-product-button').hide();
    } else {
      productSelections.find('.remove-product-button').show();
    }
    listenOnInfoChange();
  }
  function listenOnInfoChange() {
    $(document).on('input', '.info-picker', function () {
      updateJSONData();
    });
    $(document).on('input', '.info-input', function () {
      updateJSONData();
    });
    var width = 1;
    var height = 1;
    $(document).on('input', '.productHeight', function () {
      var selectedSizeValue = this.value;
      height = parseInt(selectedSizeValue) || 0;
      calculatePrice(width, height);
      updateJSONData();
    });
    $(document).on('input', '.productWidth', function () {
      var selectedSizeValue = this.value;
      width = parseInt(selectedSizeValue) || 0;
      calculatePrice(width, height);
      updateJSONData();
    });
  }
  function updateRemoveButtonVisibility() {
    var productSelections = $('.product-selection');
    productSelections.each(function (index) {
      var removeButton = $(this).find('.remove-product-button');
      // Hide the remove button for the first item if there is only one item
      if (index === 0 && productSelections.length === 1) {
        removeButton.hide();
      } else {
        removeButton.show();
      }
    });
    updateJSONData();
  }
  function updateJSONData() {
    var productSelections = $('.product-selection');
    var data = [];
    var wayToSend = $('#way_to_send'); //select
    var customerName = $('#customer_name'); //select
    var customerPhone = $('#customer_phone'); //select
    var customerPostalCode = $('#customer_postcode'); //select
    var customerAddress = $('#customer_address'); //select
    var wayToKnow = $('#way_to_know'); //select
    var orderType = $('#order_type'); //select
    var ownerId = $('#onwer_id'); //select
    var paymentType = $('#payment_type'); //select
    var paymentBankName = $('.payment-bank-name'); //input
    var paymentYear = $('.payment-year'); //input
    var paymentMonth = $('.payment-month'); //input
    var paymentDay = $('.payment-day'); //input
    var paymentHour = $('.payment-hour'); //input
    var paymentMinute = $('.payment-minute'); //input

    var fullPrice = $('#full_price'); //input
    var priceOff = $('#full_price_off'); //input
    var pricePaying = $('#full_price_paying'); //input
    var priceRemaining = $('#full_price_remaining'); //input

    productSelections.each(function () {
      var productType = $(this).find('.product-type-select'); //select

      var designPicker = $(this).find('.design-picker'); //select

      var countInput = $(this).find('.count-input'); //input

      var sizePicker = $(this).find('.size-picker'); //select
      var customSizeInput = $(this).find('.productCustomSize'); // select
      var customSize = customSizeInput.val(); //var
      var customSizeWidthInput = $(this).find('.productWidth'); //input
      var customSizeHeightInput = $(this).find('.productHeight'); //input

      if (!customSizeInput) {
        customSize = `${customSizeWidthInput.val()}x${customSizeHeightInput.val()}`;
      }
      data.push({
        productType: productType.val() || '',
        productName: productType.find('option:selected').text() || '',
        productDesign: designPicker.val() || '',
        productDesignName: designPicker.find('option:selected').text() || '',
        productSize: sizePicker.val(),
        productSizeName: sizePicker.find('option:selected').text() || '',
        productCustomSize: customSize || '',
        productCount: countInput.val() || ''
      });
    });
    var paymentDate;
    if (paymentYear) {
      paymentDate =
        new Date(
          `${paymentYear.val() || ''}-${paymentMonth.val() || ''}-${paymentDay.val() || ''} ${paymentHour.val() || ''}:${paymentMinute.val() || ''}`
        ) || new Date();
    }
    productInfoList = {
      owner_id: ownerId.val(),
      customer_name: customerName.val(),
      customer_phone: customerPhone.val(),
      customer_postcode: customerPostalCode.val(),
      customer_address: customerAddress.val(),
      way_to_know: wayToKnow.val(),
      way_to_know_name: wayToKnow.find('option:selected').text() || '',
      order_type: orderType.val(),
      order_type_name: orderType.find('option:selected').text() || '',
      way_to_send: wayToSend.val() || '',
      way_to_send_name: wayToSend.find('option:selected').text() || '',
      payment_type: paymentType.val(),
      payment_type_name: paymentType.find('option:selected').text() || '',
      payment_bank_name: paymentBankName.val() || '',
      full_price: fullPrice.val().replaceAll(',', ''),
      price_off: priceOff.val(),
      price_paying: pricePaying.val().replaceAll(',', ''),
      price_remaining: priceRemaining.val().replaceAll(',', ''),
      payment_date: paymentDate,
      product_details: data
    };
    updateInfoList();
  }

  function isCurrentPageFilled(currentPage) {
    if (currentPage == 0) return checkPersonalInfo();
    if (currentPage == 1) return checkProductInfo();
    if (currentPage == 2) return checkPaymentInfo();
    return true;
  }

  function checkPersonalInfo() {
    const userName = $('#customer_name'); // input
    const userPhone = $('#customer_phone'); // input
    const userPostCode = $('#customer_postcode'); // input
    const userWayToKnow = $('#way_to_know'); // select
    const userOrderType = $('#order_type'); // select

    var result = true;
    if (userName.val().length < 3) {
      toastr.error('نام مشتری باید بیشتر از 3 حرف باشد');
      result = false;
    }
    if (userPhone.val().length != 11) {
      toastr.error('شماره تلفن باید 11 رقم باشد');
      result = false;
    }
    if (userPostCode.val().length < 4) {
      toastr.error('کد پستی صحیح نمی‌باشد');
      result = false;
    }
    if (userWayToKnow.val() == '') {
      toastr.error('نحوه اشنایی باید انتخاب شود');
      result = false;
    }
    if (userOrderType.val() == '') {
      toastr.error('نحوه ثبت سفارش باید انتخاب شود');
      result = false;
    }
    return result;
  }

  function checkProductInfo() {
    var isAtleastOneDataSelected = false;
    var productSelections = $('.product-selection');

    productSelections.each(function () {
      var productType = $(this).find('.product-type-select'); //select
      const designPicker = $(this).find('.design-picker'); //select
      const sizePicker = $(this).find('.size-picker'); //select
      const productCustomSize = $(this).find('.productCustomSize'); //select
      const productWidth = $(this).find('.productWidth'); //input
      const productHeight = $(this).find('.productHeight'); //input
      if (productType.val() != '') {
        isAtleastOneDataSelected = true;
      }
      if (!isAtleastOneDataSelected) {
        toastr.error('لطفا اطلاعات محصول خود را وارد کنید');
        return isAtleastOneDataSelected;
      }
      if (designPicker) {
        if (designPicker.val() == '') {
          toastr.error('لطفا طرح محصول را انتخاب کنید');
          isAtleastOneDataSelected = false;
        }
      }
      if (sizePicker.length) {
        if (sizePicker.val() == '') {
          toastr.error('لطفا ابعاد محصول را انتخاب کنید');
          isAtleastOneDataSelected = false;
        }
      }
      if (productCustomSize.length) {
        if (productCustomSize.val() == '') {
          toastr.error('لطفا ابعاد درخواستی محصول را انتخاب کنید');
          isAtleastOneDataSelected = false;
        }
      }
      if (productWidth.length) {
        if (productWidth.val().length == 0) {
          toastr.error('طول محصول را وارد کنید');
          isAtleastOneDataSelected = false;
        }
      }
      if (productHeight.length) {
        if (productHeight.val().length == 0) {
          toastr.error('عرض محصول را وارد کنید');
          isAtleastOneDataSelected = false;
        }
      }
    });
    return isAtleastOneDataSelected;
  }

  function checkPaymentInfo() {
    var isAvailable = true;
    const wayToSend = $('#way_to_send'); //select
    const paymentType = $('#payment_type'); //select
    const fullPrice = $('#full_price'); // input
    const fullPriceOff = $('#full_price_off'); // input
    const fullPricePaying = $('#full_price_paying'); // input
    const fullPriceRemaining = $('#full_price_remaining'); // input
    if (wayToSend.val() == '') {
      toastr.error('لطفا نحوه تحویل را انتخاب کنید');
      isAvailable = false;
    }
    if (paymentType.val() == '') {
      toastr.error('لطفا نحوه پرداخت را انتخاب کنید');
      isAvailable = false;
    }
    if (fullPrice.val().length == 0) {
      toastr.error('لطفا کل مبلغ فاکتور را وارد کنید');
      isAvailable = false;
    }
    if (fullPricePaying.val().length == 0) {
      toastr.error('لطفا مبلغ پرداختی فاکتور را وارد کنید');
      isAvailable = false;
    }
    if (fullPriceRemaining.val().length == 0) {
      toastr.error('لطفا الباقی فاکتور را وارد کنید');
      isAvailable = false;
    }
    return isAvailable;
  }
  function initWizard() {
    const $wizardIcons = $('.wizard-icons-invoice');
    const $wizardIconsBtnNextList = $wizardIcons.find('.btn-next');
    const $wizardIconsBtnPrevList = $wizardIcons.find('.btn-prev');
    const $wizardIconsBtnSubmit = $wizardIcons.find('.btn-submit');
    const iconsStepper = new Stepper($wizardIcons[0], {
      linear: false
    });

    $wizardIconsBtnNextList.on('click', function (event) {
      const currentStepIndex = iconsStepper._currentIndex;
      if (isCurrentPageFilled(currentStepIndex)) {
        iconsStepper.next();
        $wizardIcons
          .find('.step')
          .eq(currentStepIndex + 1)
          .find('.step-trigger')
          .prop('disabled', false)
          .removeClass('disabled');
      }
    });

    $wizardIconsBtnPrevList.on('click', function (event) {
      iconsStepper.previous();
    });
    $('.btn-submit-edit').on('click', function () {
      $.blockUI({
        message:
          '<div class="d-flex justify-content-center"><p class="mb-0 mx-2">منتظر بمانید...</p> <div class="sk-wave m-0"><div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div></div> </div>',
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.8
        }
      });
      axios
        .patch('/api/invoice-lists/' + window.savedInvoice.id, productInfoList, {
          headers: {
            Authorization: `Bearer ${window.apiToken}`,
            'Content-Type': 'application/json'
          }
        })
        .then(data => {
          $.unblockUI();
          $.blockUI({
            message: '<p class="mb-0">عملیات موفق</p>',
            timeout: 3000,
            css: {
              backgroundColor: 'transparent',
              color: '#fff',
              border: '0'
            },
            overlayCSS: {
              opacity: 0.6
            }
          });
          window.location.href = '/app/invoice/list';
        })
        .catch(error => {
          $.unblockUI();
          $('.wizard-icons-invoice').unblock();
          $.blockUI({
            message: '<p class="mb-0">عملیات نا موفق</p><div></div>',
            timeout: 3000,
            css: {
              backgroundColor: 'transparent',
              color: '#fff',
              border: '0'
            },
            overlayCSS: {
              opacity: 0.25
            }
          });
        });
    });
    $wizardIconsBtnSubmit.on('click', function (event) {
      $.blockUI({
        message:
          '<div class="d-flex justify-content-center"><p class="mb-0 mx-2">منتظر بمانید...</p> <div class="sk-wave m-0"><div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div> <div class="sk-rect sk-wave-rect"></div></div> </div>',
        css: {
          backgroundColor: 'transparent',
          color: '#fff',
          border: '0'
        },
        overlayCSS: {
          opacity: 0.8
        }
      });
      axios
        .post('/api/invoice-lists', productInfoList, {
          headers: {
            Authorization: `Bearer ${window.apiToken}`,
            'Content-Type': 'application/json'
          }
        })
        .then(data => {
          $.unblockUI();
          $.blockUI({
            message: '<p class="mb-0">عملیات موفق</p>',
            timeout: 3000,
            css: {
              backgroundColor: 'transparent',
              color: '#fff',
              border: '0'
            },
            overlayCSS: {
              opacity: 0.6
            }
          });
          window.location.href = '/app/invoice/list';
        })
        .catch(error => {
          $.unblockUI();
          $.blockUI({
            message: '<p class="mb-0">عملیات نا موفق</p><div>' + JSON.stringify(error) + '</div>',
            timeout: 3000,
            css: {
              backgroundColor: 'transparent',
              color: '#fff',
              border: '0'
            },
            overlayCSS: {
              opacity: 0.25
            }
          });
        });
    });
  }
  function updateInfoList() {
    var html = '';
    for (var i = 0; i < productInfoList.product_details.length; i++) {
      const item = productInfoList.product_details[i];
      var divider = '';
      if (i != productInfoList.product_details.length - 1) {
        divider = `<hr class="my-3">`;
      }
      html += `
        <div class="m-4">
          <h3>${i + 1}.</h3>
          <ul class="list-unstyled fw-normal">
              <li>نام محصول : ${item.productName}</li>
              <li>طرح محصول : ${item.productDesignName}</li>
              <li>اندازه محصول : ${item.productSizeName}</li>
              <li>تعداد محصول : ${item.productCount}</li>
          </ul>
        </div>
        ${divider}
      `;
    }
    $('.productListInfo').html(html);

    $('#final-way-to-send').html(productInfoList.way_to_send_name);
    $('#final-payment-type').html(productInfoList.payment_type_name);
    $('#final-bank-name').html(productInfoList.payment_bank_name);
    $('#final-payment-date').html(
      productInfoList.payment_date.toLocaleDateString('fa-IR-u-nu-latn') +
        ` ${productInfoList.payment_date.getHours()}:${productInfoList.payment_date.getMinutes()}`
    );

    $('#final-full-price').html(productInfoList.full_price + ' تومان ');
    $('#final-price-paying').html(productInfoList.price_paying + ' تومان ');
    $('#final-price-off').html(productInfoList.price_off + ' % ');
    $('#final-price-remaining').html(productInfoList.price_remaining + ' تومان ');
  }
  initWizard();
  updateJSONData();
  initListener();
  initializePage();
  addProductSelectionHandlers($('.product-selection'));
  if (window.savedInvoice) {
    defineDefaultProducts(window.savedInvoice);
  }
});
