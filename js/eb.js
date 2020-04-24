(function($) {
    "use strict";
    $(document).ready(function() {
        $("#submit_booking_form").on('click', function(event) {
            var eb_form_name = jQuery("#eagle_booking_name");
            var eb_form_surname = jQuery("#eagle_booking_surname");
            var eb_form_email = jQuery("#eagle_booking_email");
            var eb_form_phone = jQuery("#eagle_booking_phone");
            var eb_form_terms = jQuery("#eagle_booking_terms");
            var eb_booking_form_error = 0;
            if (eb_form_name.val() === '') { eb_form_name.addClass("empty"); var eb_booking_form_error = 1 }
            if (eb_form_surname.val() === '') { eb_form_surname.addClass("empty"); var eb_booking_form_error = 1 }
            if (eb_form_email.val() === '') { eb_form_email.addClass("empty"); var eb_booking_form_error = 1 }
            if (eb_form_phone.val() === '') { eb_form_phone.addClass("empty"); var eb_booking_form_error = 1 }
            if (!eb_form_terms.is(':checked') && eb_js_settings.eb_terms_conditions == !0) { eb_form_terms.addClass("empty"); var eb_booking_form_error = 1 }
            $('#booking-form .form-control, #eagle_booking_terms').on("focus", function() { $(this).removeClass("empty") })
            if (eb_booking_form_error === 0) { var eb_booking_form_button = $("#submit_booking_form");
                eb_booking_form_button.find('.checkout-button').addClass('hidden');
                eb_booking_form_button.find('.loader').removeClass('hidden');
                $('#booking-form').submit() } else { event.preventDefault() }
        })
        var checkout_tabs = $(".checkout-payment-tabs");
        if (checkout_tabs.length) { checkout_tabs.tabs() }
        var adminbar = $('#wpadminbar');
        var header = $('header');
        var stickysidebar = $('.sticky-sidebar');
        if (adminbar.length && adminbar.is(':visible')) { var adminsidebarfixed = adminbar.height() } else { var adminsidebarfixed = 0 }
        if (header.hasClass("fixed")) { var headersidebarfixed = header.height() } else { var headersidebarfixed = 10 }
        var sidebarfixed = adminsidebarfixed + headersidebarfixed;
        if (stickysidebar.length) { var sidebar = new StickySidebar('.sticky-sidebar', { topSpacing: sidebarfixed + 20, bottomSpacing: 0, containerSelector: '.row', minWidth: 991 }) }
        $(".room-item .room-image").on({ mouseenter: function() { $(this).parent().find('.room-services').addClass('active') }, });
        $(".room-item").on({ mouseleave: function() { $(this).parent().find('.room-services').removeClass('active') } });
        var sync1 = $("#slider-larg"),
            sync2 = $("#thumbs"),
            duration = 300;
        if (eb_js_settings.eb_room_slider_nav == !0) { var eb_room_slider_nav = !0 } else { var eb_room_slider_nav = !1 }
        sync1.owlCarousel({ items: 1, dots: !1, autoplay: !0, nav: eb_room_slider_nav, navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'], }).on('changed.owl.carousel', function(e) { var syncedPosition = syncPosition(e.item.index); if (syncedPosition != "stayStill") { $sync2.trigger('to.owl.carousel', [syncedPosition, duration, !0]) } });
        sync2
            .on('initialized.owl.carousel', function() { addClassCurrent(0) }).owlCarousel({ dots: !1, margin: 5, responsive: { 0: { items: 4 }, 600: { items: 4 }, 960: { items: 5 }, 1200: { items: 6 } } }).on('click', '.owl-item', function() { sync1.trigger('to.owl.carousel', [$(this).index(), duration, !0]) });

        function addClassCurrent(index) {
            sync2
                .find(".owl-item").removeClass("active-item").eq(index).addClass("active-item")
        }

        function syncPosition(index) {
            addClassCurrent(index);
            var itemsNo = sync2.find(".owl-item").length;
            var visibleItemsNo = sync2.find(".owl-item.active").length;
            if (itemsNo === visibleItemsNo) { return "stayStill" }
            var visibleCurrentIndex = sync2.find(".owl-item.active").index(sync2.find(".owl-item.active-item"));
            if (visibleCurrentIndex == 0 && index != 0) { return index - 1 }
            if (visibleCurrentIndex == (visibleItemsNo - 1) && index != (itemsNo - 1)) { return index - visibleItemsNo + 2 }
            return "stayStill"
        }
        $("#room-booking-form, #search-form").on('submit', function(e) {
            var eagle_booking_dates = $("#eagle_booking_datepicker");
            if (eagle_booking_dates.val() === '') { e.preventDefault();
                eagle_booking_dates.click() } else {
                var eb_booking_type = eb_js_settings.eb_booking_type;
                var eb_custom_date_format = eb_js_settings.eb_custom_date_format;
                var eb_date_format = eb_js_settings.eagle_booking_date_format.toUpperCase();
                var eb_output_checkin = $('#eagle_booking_checkin').val();
                var eb_output_checkout = $('#eagle_booking_checkout').val();
                if (eb_booking_type === 'builtin') { if ($('form').hasClass('room-booking-form')) { var eb_output_format = 'MM/DD/YYYY' } else { var eb_output_format = 'MM-DD-YYYY' } } else if (eb_booking_type === 'booking') { var eb_output_format = 'YYYY-MM-DD' } else if (eb_booking_type === 'airbnb') { var eb_output_format = 'MM-DD-YYYY' } else if (eb_booking_type === 'tripadvisor') { var eb_output_format = 'MM-DD-YYYY' } else if (eb_booking_type === 'custom') { var eb_output_format = eb_custom_date_format }
                var eb_output_checkin_formated = moment(eb_output_checkin, eb_date_format).format(eb_output_format);
                var eb_output_checkout_formated = moment(eb_output_checkout, eb_date_format).format(eb_output_format);
                $('#eagle_booking_checkin').val(eb_output_checkin_formated);
                $('#eagle_booking_checkout').val(eb_output_checkout_formated)
            }
        })
        var eb_calendar_min_date = new Date();
        var eb_calendar_max_date = moment(eb_calendar_min_date).add(eb_js_settings.eb_calendar_availability_period, 'M').endOf('month');
        var eagle_booking_date_format = eb_js_settings.eagle_booking_date_format.toUpperCase();
        var eagle_booking_datepicker = $("#eagle_booking_datepicker");
        $(eagle_booking_datepicker).each(function() {
            $(eagle_booking_datepicker).daterangepicker({ autoUpdateInput: !1, autoApply: !0, alwaysShowCalendars: !0, linkedCalendars: !0, minDate: eb_calendar_min_date, maxDate: eb_calendar_max_date, locale: { format: eagle_booking_date_format, separator: " → ", "daysOfWeek": [eb_js_settings.eb_calendar_sunday, eb_js_settings.eb_calendar_monday, eb_js_settings.eb_calendar_tuesday, eb_js_settings.eb_calendar_wednesday, eb_js_settings.eb_calendar_thursday, eb_js_settings.eb_calendar_friday, eb_js_settings.eb_calendar_saturday, ], "monthNames": [eb_js_settings.eb_calendar_january, eb_js_settings.eb_calendar_february, eb_js_settings.eb_calendar_march, eb_js_settings.eb_calendar_april, eb_js_settings.eb_calendar_may, eb_js_settings.eb_calendar_june, eb_js_settings.eb_calendar_july, eb_js_settings.eb_calendar_august, eb_js_settings.eb_calendar_september, eb_js_settings.eb_calendar_october, eb_js_settings.eb_calendar_november, eb_js_settings.eb_calendar_december, ], "firstDay": 1 } }), $(eagle_booking_datepicker).on("apply.daterangepicker", function() {
                var checkin = $(eagle_booking_datepicker).data('daterangepicker').startDate.format(eagle_booking_date_format);
                var checkout = $(eagle_booking_datepicker).data('daterangepicker').endDate.format(eagle_booking_date_format);
                $(this).val(checkin + " " + " " + " → " + " " + " " + checkout);
                $('#eagle_booking_checkin').val(checkin);
                $('#eagle_booking_checkout').val(checkout);
                if ($("div").hasClass("search-filters")) { eagle_booking_filters() }
                if ($("div").hasClass("search-filters") || $("div").hasClass("calendar")) { eagle_booking_get_nights() }
            }), $(eagle_booking_datepicker).on("show.daterangepicker", function() {
                var live_checkin = $('#eagle_booking_checkin').val();
                var live_checkout = $('#eagle_booking_checkout').val();
                if (live_checkin != '' && live_checkout != '') { var eagle_booking_nights_div = $('<div class="booking-nights">' + live_checkin + '&nbsp;' + ' → ' + '&nbsp' + live_checkout + ' (' + eagle_booking_get_nights() + ' ' + eb_js_settings.eb_booking_nights + ')</div>');
                    $(".booking-nights").remove();
                    $(".daterangepicker").append(eagle_booking_nights_div) }
                $(document).on('mouseenter', '.start-date', function() { live_checkin = $(this).attr('data-date');
                    live_checkin = moment(live_checkin, 'MM/DD/YYYY').format(eb_js_settings.eagle_booking_date_format.toUpperCase());
                    $('#eagle_booking_checkin').val(live_checkin) })
                $(document).on('mouseenter', '.in-range', function() { live_checkout = $(this).attr('data-date');
                    live_checkout = moment(live_checkout, 'MM/DD/YYYY').format(eb_js_settings.eagle_booking_date_format.toUpperCase());
                    $('#eagle_booking_checkout').val(live_checkout) })
                $(document).on('mouseenter', '.start-date, .in-range', function() { var eagle_booking_nights_div = $('<div class="booking-nights">' + live_checkin + '&nbsp;' + ' → ' + '&nbsp' + live_checkout + ' (' + eagle_booking_get_nights() + ' ' + eb_js_settings.eb_booking_nights + ')</div>');
                    $(".booking-nights").remove();
                    $(".daterangepicker").append(eagle_booking_nights_div) })
            })
        })

        function eagle_booking_get_nights() {
            var eagle_booking_checkin = $('#eagle_booking_checkin').val();
            var eagle_booking_checkout = $('#eagle_booking_checkout').val();
            var eagle_booking_start_date = moment(eagle_booking_checkin, eb_js_settings.eagle_booking_date_format.toUpperCase()).format('YYYY-MM-DD');
            var eagle_booking_end_date = moment(eagle_booking_checkout, eb_js_settings.eagle_booking_date_format.toUpperCase()).format('YYYY-MM-DD');
            var booking_nights = (new Date(eagle_booking_end_date)) - (new Date(eagle_booking_start_date));
            var eagle_booking_nights_number = booking_nights / (1000 * 60 * 60 * 24);
            if (eagle_booking_nights_number < 0) { var eagle_booking_nights_number = '0' }
            return eagle_booking_nights_number
        }
        $('.eb-guestspicker .guestspicker').on('click', function(event) { $('.eb-guestspicker').toggleClass('active');
            event.preventDefault() });
        $(window).click(function() { $('.eb-guestspicker').removeClass('active') });
        $('.eb-guestspicker').on('click', function(event) { event.stopPropagation() });

        function guestsSum() {
            var guests_button = $('.guests-button');
            var arr = $('.booking-guests');
            var guests = 0;
            for (var i = 0; i < arr.length; i++) {
                if (parseInt(arr[i].value, 10))
                    guests += parseInt(arr[i].value, 10)
            }
            if (guests > 0) { var cardQty = document.querySelector(".gueststotal");
                cardQty.innerHTML = guests }
            $("#eagle_booking_guests").val(guests)
        }
        guestsSum();

        function guestsPicker() {
            $(".plus, .minus").on("click", function() {
                var button = $(this);
                var oldValue = button.parent().find("input").val();
                var max_value = parseFloat(button.parent().find("input").attr('max'));
                var min_value = parseFloat(button.parent().find("input").attr("min"));
                if (button.hasClass('plus') && max_value > 0) { if (oldValue < max_value) { var newVal = parseFloat(oldValue) + 1 } else { newVal = oldValue } } else { if (oldValue > min_value) { var newVal = parseFloat(oldValue) - 1 } else { newVal = min_value } }
                button.parent().find("input").val(newVal);
                guestsSum();
                if ($('form').hasClass('booking-search-form')) { eagle_booking_filters() }
            })
        }
        guestsPicker();
        var eagle_booking_price_range = $("#eagle_booking_slider_range");
        eagle_booking_price_range.ionRangeSlider({ type: "double", skin: "round", grid: !0, min: eb_js_settings.eagle_booking_price_range_min, max: eb_js_settings.eagle_booking_price_range_max, from: eb_js_settings.eagle_booking_price_range_default_min, to: eb_js_settings.eagle_booking_price_range_default_max, prefix: eb_js_settings.eb_price_range_currency, onFinish: function(data) { $('#eagle_booking_min_price').val(data.from);
                $('#eagle_booking_max_price').val(data.to);
                eagle_booking_filters() }, onUpdate: function(data) { disable: !0 } });
        var eb_ajax_final_price = null;

        function eagle_booking_final_price() {
            if (eb_ajax_final_price != null) { eb_ajax_final_price.abort();
                eb_ajax_final_price = null }
            var eagle_booking_checkbox_services = $("#eagle_booking_checkbox_services").val();
            var eagle_booking_form_final_price = $("#eagle_booking_form_trip_price").val();
            var eb_booking_form_button = $("#submit_booking_form");
            eb_booking_form_button.find('.checkout-button').addClass('hidden');
            eb_booking_form_button.find('.loader').removeClass('hidden');
            eb_booking_form_button.css('pointer-events', 'none');
            eb_ajax_final_price = $.ajax({ url: eagle_booking_my_vars_final_price.eagle_booking_ajaxurl_final_price, method: 'GET', data: { action: 'eagle_booking_final_price_php', eagle_booking_checkbox_services: eagle_booking_checkbox_services, eagle_booking_form_final_price: eagle_booking_form_final_price }, success: function(eagle_booking_result) { var eb_decimal_numbers = eb_js_settings.eb_decimal_numbers; var eagle_booking_result = parseFloat(eagle_booking_result).toFixed(eb_decimal_numbers);
                    $("#eb_booking_final_trip_price").empty();
                    $("#eb_booking_final_trip_price").text(eagle_booking_result);
                    $("#eagle_booking_form_final_price").val(eagle_booking_result);
                    eb_booking_form_button.css('pointer-events', '') }, complete: function() { $('#submit_booking_form .checkout-button').removeClass('hidden');
                    $('#submit_booking_form .loader').addClass('hidden') } })
        }
        $('.additional-service-item').on('click', function(event) {
            if (!$(event.target).is('.toggle-service-full-details')) {
                $(this).toggleClass('selected');
                var checkbox = $(this).children('input[type="checkbox"]');
                checkbox.prop('checked', !checkbox.prop('checked'));
                var eb_service_value = checkbox.val();
                if (checkbox.is(":checked")) { var eb_service_previous_value = $("#eagle_booking_checkbox_services").val();
                    $("#eagle_booking_checkbox_services").val(eb_service_value + eb_service_previous_value); var eb_service_id = checkbox.attr("data-id"); var eb_service_previous_value_id = $("#eagle_booking_checkbox_services_id").val();
                    $("#eagle_booking_checkbox_services_id").val(eb_service_id + eb_service_previous_value_id) } else { var eb_service_previous_value = $("#eagle_booking_checkbox_services").val(); var eb_checkbox_services = eb_service_previous_value.replace(eb_service_value, "");
                    $("#eagle_booking_checkbox_services").val(eb_checkbox_services); var eb_service_id = checkbox.attr("data-id"); var eb_service_previous_value_id = $("#eagle_booking_checkbox_services_id").val(); var eb_checkbox_services_id = eb_service_previous_value_id.replace(eb_service_id, "");
                    $("#eagle_booking_checkbox_services_id").val(eb_checkbox_services_id) }
                eagle_booking_final_price()
            }
        });
        $('.toggle-service-full-details').on('click', function() { $(this).parent().parent().parent().toggleClass('open') });
        $(".eb_normal_service").change(function() { if ($(this).is(":checked")) { var eb_normal_service_value = $(this).val(); var eb_normal_service_previous_value = $("#eb_normal_services").val();
                $("#eb_normal_services").val(eb_normal_service_value + eb_normal_service_previous_value);
                eagle_booking_filters() } else { var eb_normal_service_value = $(this).val(); var eb_normal_service_previous_value = $("#eb_normal_services").val(); var eb_normal_services = eb_normal_service_previous_value.replace(eb_normal_service_value, "");
                $("#eb_normal_services").val(eb_normal_services);
                eagle_booking_filters() } });
        $(".eb_checkbox_additional_service").change(function() { if ($(this).is(":checked")) { var eb_additional_service_value = $(this).val(); var eb_additional_service_previous_value = $("#eb_additional_services").val();
                $("#eb_additional_services").val(eb_additional_service_value + eb_additional_service_previous_value);
                eagle_booking_filters() } else { var eb_additional_service_value = $(this).val(); var eb_additional_service_previous_value = $("#eb_additional_services").val(); var eb_additional_services = eb_additional_service_previous_value.replace(eb_additional_service_value, "");
                $("#eb_additional_services").val(eb_additional_services);
                eagle_booking_filters() } });
        $("#eagle_booking_search_sorting li").on("click", function() { $('#eagle_booking_search_sorting li').removeClass("selected");
            $(this).addClass("selected");
            $('#eagle_booking_active_sorting').text($(this).text());
            eagle_booking_filters() });
        var eb_ajax_filters_xhr = null;

        function eagle_booking_filters(paged) {
            if (eb_ajax_filters_xhr != null) { eb_ajax_filters_xhr.abort();
                eb_ajax_filters_xhr = null }
            var eagle_booking_checkin = $(eagle_booking_datepicker).data('daterangepicker').startDate.format(eagle_booking_date_format);
            var eagle_booking_checkout = $(eagle_booking_datepicker).data('daterangepicker').endDate.format(eagle_booking_date_format);
            var eb_search_results_alert = $('#eb-no-search-results');
            var eb_search_rooms_rooms_list = $("#eagle_booking_rooms_list");
            if (eagle_booking_checkin && eagle_booking_checkout) {
                $("#eagle_booking_search_results").remove();
                eb_search_results_alert.remove();
                var eagle_booking_search_loader = $('<div class="eagle_booking_search_loader"><div class="wrapper-cell"><div class="image-line"></div><div class="text-cell"><div class="text-line title-line"></div><div class="text-line"></div><div class="text-line"></div><div class="text-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div></div><div class="price-cell"><div class="price-line"></div><div class="night-line"></div><div class="button-line"></div></div></div><div class="wrapper-cell"><div class="image-line"></div><div class="text-cell"><div class="text-line title-line"></div><div class="text-line"></div><div class="text-line"></div><div class="text-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div></div><div class="price-cell"><div class="price-line"></div><div class="night-line"></div><div class="button-line"></div></div></div><div class="wrapper-cell"><div class="image-line"></div><div class="text-cell"><div class="text-line title-line"></div><div class="text-line"></div><div class="text-line"></div><div class="text-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div></div><div class="price-cell"><div class="price-line"></div><div class="night-line"></div><div class="button-line"></div></div></div><div class="wrapper-cell"><div class="image-line"></div><div class="text-cell"><div class="text-line title-line"></div><div class="text-line"></div><div class="text-line"></div><div class="text-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div></div><div class="price-cell"><div class="price-line"></div><div class="night-line"></div><div class="button-line"></div></div></div><div class="wrapper-cell"><div class="image-line"></div><div class="text-cell"><div class="text-line title-line"></div><div class="text-line"></div><div class="text-line"></div><div class="text-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div><div class="service-line"></div></div><div class="price-cell"><div class="price-line"></div><div class="night-line"></div><div class="button-line"></div></div></div></div>');
                if (!$('.eagle_booking_search_loader').length) { eb_search_rooms_rooms_list.append(eagle_booking_search_loader) }
                var eagle_booking_guests = $("#eagle_booking_guests").val();
                var eagle_booking_adults = $("#eagle_booking_adults").val();
                var eagle_booking_children = $("#eagle_booking_children").val();
                var eagle_booking_min_price = $("#eagle_booking_min_price").val();
                var eagle_booking_max_price = $("#eagle_booking_max_price").val();
                var eb_normal_services = $("#eb_normal_services").val();
                var eb_additional_services = $("#eb_additional_services").val();
                var eagle_booking_search_sorting_filter_meta_key = $("#eagle_booking_search_sorting .selected a").attr('data-meta-key');
                var eagle_booking_search_sorting_filter_order = $("#eagle_booking_search_sorting .selected a").attr('data-order');
                var eagle_booking_paged = paged;
                if (stickysidebar.length) { sidebar.updateSticky() }
                eb_ajax_filters_xhr = $.ajax({
                    url: eagle_booking_my_vars_sorting.eagle_booking_ajaxurl_sorting,
                    method: 'GET',
                    data: { action: 'eagle_booking_filters', eagle_booking_paged: eagle_booking_paged, eagle_booking_checkin: eagle_booking_checkin, eagle_booking_checkout: eagle_booking_checkout, eagle_booking_guests: eagle_booking_guests, eagle_booking_adults: eagle_booking_adults, eagle_booking_children: eagle_booking_children, eagle_booking_min_price: eagle_booking_min_price, eagle_booking_max_price: eagle_booking_max_price, eb_normal_services: eb_normal_services, eb_additional_services: eb_additional_services, eagle_booking_search_sorting_filter_meta_key: eagle_booking_search_sorting_filter_meta_key, eagle_booking_search_sorting_filter_order: eagle_booking_search_sorting_filter_order, },
                    success: function(eagle_booking_filters_result) {
                        eb_search_results_alert.remove();
                        $("#eagle_booking_rooms_list").append(eagle_booking_filters_result);
                        $('[data-toggle="popover"]').popover({ html: !0, offset: '0 10px' });
                        if (stickysidebar.length) { sidebar.updateSticky() }
                        $('.eagle_booking_search_loader').remove();
                        console.log("Successful")
                    },
                    error: function(eb_ajax_filters_xhr, textStatus, errorThrown) { console.log(errorThrown) },
                    complete: function() { var eagle_booking_results_qnt = $('#eagle_booking_results_qnt').val();
                        $("#results-number").text(eagle_booking_results_qnt) }
                })
            } else {}
        }
        $(document).on('click', '#select-booking-dates', function() { $('#eagle_booking_datepicker').click() })
        $(document).on('click', '.toggle-room-breakpoint', function() { $(this).closest('.room-list-item').find('.room-quick-details').toggleClass('open', 200);
            $(this).toggleClass('open');
            $(this).find('i').toggleClass('fa-angle-down fa-angle-up') });
        $(document).on('click', '.more-normal-services', function() { $(this).closest('.room-list-item').find('.room-quick-details').toggleClass('open', 200);
            $(this).closest('.room-list-item').find('.toggle-room-breakpoint').toggleClass('open');
            $(this).closest('.room-list-item').find('.toggle-room-breakpoint i').toggleClass('fa-angle-down fa-angle-up') })
    });
    var pluginName = "simpleCalendar",
        defaults = { days: [eb_js_settings.eb_calendar_sunday, eb_js_settings.eb_calendar_monday, eb_js_settings.eb_calendar_tuesday, eb_js_settings.eb_calendar_wednesday, eb_js_settings.eb_calendar_thursday, eb_js_settings.eb_calendar_friday, eb_js_settings.eb_calendar_saturday, ], months: [eb_js_settings.eb_calendar_january, eb_js_settings.eb_calendar_february, eb_js_settings.eb_calendar_march, eb_js_settings.eb_calendar_april, eb_js_settings.eb_calendar_may, eb_js_settings.eb_calendar_june, eb_js_settings.eb_calendar_july, eb_js_settings.eb_calendar_august, eb_js_settings.eb_calendar_september, eb_js_settings.eb_calendar_october, eb_js_settings.eb_calendar_november, eb_js_settings.eb_calendar_december, ], minDate: "YYYY/MM/DD", maxDate: "YYYY/MM/DD", insertEvent: !0, displayEvent: !0, fixedStartDay: !0, events: [], insertCallback: function() {} };

    function Plugin(element, options) { this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.currentDate = new Date();
        this.events = options.events;
        this.init() }
    $.extend(Plugin.prototype, {
        init: function() { var container = $(this.element); var todayDate = this.currentDate; var events = this.events; var calendar = $('<div class="availability-calendar"></div>'); var header = $('<div class="availability-calendar-header">' + '<span class="btn-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>' + '<span class="month"></span>' + '<span class="btn-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>' + '</div class="availability-calendar-header">');
            this.updateHeader(todayDate, header);
            calendar.append(header);
            this.buildCalendar(todayDate, calendar);
            container.append(calendar);
            this.bindEvents() },
        updateHeader: function(date, header) { header.find('.month').html(this.settings.months[date.getMonth()] + ' ' + date.getFullYear()) },
        buildCalendar: function(fromDate, calendar) {
            var plugin = this;
            calendar.find('table').remove();
            var body = $('<table class="calendar"></table>');
            var thead = $('<thead></thead>');
            var tbody = $('<tbody></tbody>');
            for (var i = 1; i <= this.settings.days.length; i++) { thead.append($('<td class="day-name">' + this.settings.days[i % 7].substring(0, 3) + '</td>')) }
            var y = fromDate.getFullYear(),
                m = fromDate.getMonth();
            var firstDay = new Date(y, m, 1);
            while (firstDay.getDay() != 1) { firstDay.setDate(firstDay.getDate() - 1) }
            var lastDay = new Date(y, m + 1, 0);
            while (lastDay.getDay() != 0) { lastDay.setDate(lastDay.getDate() + 1) }
            for (var day = firstDay; day <= lastDay; day.setDate(day.getDate())) {
                var tr = $('<tr></tr>');
                for (var i = 0; i < 7; i++) {
                    var td = $('<td><span class="day">' + day.getDate() + '</span></td>');
                    var ymd = day.getFullYear() + '-' + day.getMonth() + '-' + day.getDay();
                    var ymd = this.formatToYYYYMMDD(day);
                    if ($.inArray(this.formatToYYYYMMDD(day), plugin.events) !== -1) { td.find(".day").addClass("event") }
                    if (day < (new Date())) { td.find(".day").addClass("wrong-day") }
                    if (day.toDateString() === (new Date).toDateString()) { td.find(".day").addClass("today");
                        td.find(".day").removeClass("wrong-day") }
                    if (day.getMonth() != fromDate.getMonth()) { td.find(".day").addClass("wrong-month") }
                    td.on('click', function(e) {});
                    tr.append(td);
                    day.setDate(day.getDate() + 1)
                }
                tbody.append(tr)
            }
            body.append(thead);
            body.append(tbody);
            var eventContainer = $('<div class="event-container"></div>');
            calendar.append(body);
            calendar.append(eventContainer)
        },
        bindEvents: function() { var eb_end_period = eb_js_settings.eb_calendar_availability_period; var plugin = this; var container = $(this.element); var counter = ''; var startMoth = plugin.currentDate.getMonth(); var endMonth = startMoth + (eb_end_period - 0); var currentMonth = startMoth;
            container.find('.btn-prev').on('click', function() { if (currentMonth > startMoth) { plugin.currentDate.setMonth(plugin.currentDate.getMonth() - 1);
                    plugin.buildCalendar(plugin.currentDate, container.find('.availability-calendar'));
                    plugin.updateHeader(plugin.currentDate, container.find('.availability-calendar .availability-calendar-header'));
                    currentMonth-- } });
            container.find('.btn-next').on('click', function() { if (currentMonth < endMonth) { plugin.currentDate.setMonth(plugin.currentDate.getMonth() + 1);
                    plugin.buildCalendar(plugin.currentDate, container.find('.availability-calendar'));
                    plugin.updateHeader(plugin.currentDate, container.find('.availability-calendar .availability-calendar-header'));
                    currentMonth++ } }) },
        formatToYYYYMMDD: function(date) { var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear(); if (month.length < 2) month = '0' + month; if (day.length < 2) day = '0' + day; return [year, month, day].join('/') }
    });
    $.fn[pluginName] = function(options) { return this.each(function() { if (!$.data(this, "plugin_" + pluginName)) { $.data(this, "plugin_" + pluginName, new Plugin(this, options)) } }) }
})(jQuery)