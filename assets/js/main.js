$(document).ready(function() {
    //table
    $('#table-1, #table-2, #table-3, #table-4, #table-5, #table-6').DataTable({
        "pageLength": 100,
        "lengthMenu": [50, 100, 200],
        "aaSorting": [
                [0, "desc"]
            ]
            // 	"dom": '<"top">rt<"bottom"pli><"clear">'
    });

    $('#table-user').DataTable({
        "pageLength": 50,
        "lengthMenu": [50, 100, 200],
        //"dom": '<"top"f>rt <"row" <"col-sm-4"l><"col-sm-4 text-center-pagination"p><"col-sm-4 showing-data-table"i>>'
    });

    $('#table-hotel').DataTable({
        "pageLength": 50,
        "lengthMenu": [50, 100, 200],
        "dom": 'rt <"row" <"col-sm-4"l><"col-sm-4 text-center-pagination"p><"col-sm-4 showing-data-table"i>>'
    });
    $('#table-loading').DataTable({
        "pageLength": 50,
        "lengthMenu": [50, 100, 200],
        "dom": 'rt <"row" <"col-sm-4"l><"col-sm-4 text-center-pagination"p><"col-sm-4 showing-data-table"i>>'
    });

    //daterangepicker
    $('input[name="create_from_mct_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '00:00:00'
        $('input[name="create_from_mct_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_from_mct"]').val(value);
    });
    $('input[name="create_to_mct_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '23:59:59'
        $('input[name="create_to_mct_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_to_mct"]').val(value);
    });

    $('input[name="create_from_mat_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '00:00:00'
        $('input[name="create_from_mat_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_from_mat"]').val(value);
    });
    $('input[name="create_to_mat_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '23:59:59'
        $('input[name="create_to_mat_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_to_mat"]').val(value);
    });

    $('input[name="create_from_n_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '00:00:00'
        $('input[name="create_from_n_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_from_n"]').val(value);
    });
    $('input[name="create_to_n_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '23:59:59'
        $('input[name="create_to_n_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_to_n"]').val(value);
    });

    $('input[name="create_from_ip_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '00:00:00'
        $('input[name="create_from_ip_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_from_ip"]').val(value);
    });
    $('input[name="create_to_ip_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '23:59:59'
        $('input[name="create_to_ip_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_to_ip"]').val(value);
    });

    $('input[name="create_from_ov_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '00:00:00'
        $('input[name="create_from_ov_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_from_ov"]').val(value);
    });
    $('input[name="create_to_ov_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '23:59:59'
        $('input[name="create_to_ov_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_to_ov"]').val(value);
    });

    $('input[name="create_from_cls_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
        locale: {
            format: 'DD MMM YY'
        }
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '00:00:00'
        $('input[name="create_from_cls_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_from_cls"]').val(value);
    });
    $('input[name="create_to_cls_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
        locale: {
            format: 'DD MMM YY'
        }
    }, function(chosen_date) {
        let value = chosen_date.format('YYYY-MM-DD') + ' ' + '23:59:59'
        $('input[name="create_to_cls_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="create_to_cls"]').val(value);
    });

    //validity field filter
    $('input[name="validity_mct_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
    }, function(chosen_date) {
        $('input[name="validity_mct_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="validity_mct"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    $('input[name="validity_mat_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
    }, function(chosen_date) {
        $('input[name="validity_mat_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="validity_mat"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    $('input[name="validity_n_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
    }, function(chosen_date) {
        $('input[name="validity_n_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="validity_n"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    $('input[name="validity_ip_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
    }, function(chosen_date) {
        $('input[name="validity_ip_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="validity_ip"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    $('input[name="validity_ov_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
    }, function(chosen_date) {
        $('input[name="validity_ov_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="validity_ov"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    $('input[name="validity_cls_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
    }, function(chosen_date) {
        $('input[name="validity_cls_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="validity_cls"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    //booking field filter
    $('input[name="booking_mct_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: false,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        locale: {
            format: 'DD MMM YY'
        }
    }, function(chosen_date) {
        $('input[name="booking_mct_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="booking_mct"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    $('input[name="booking_mat_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
    }, function(chosen_date) {
        $('input[name="booking_mat_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="booking_mat"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    $('input[name="booking_n_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
    }, function(chosen_date) {
        $('input[name="booking_n_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="booking_n"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    $('input[name="booking_ip_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
    }, function(chosen_date) {
        $('input[name="booking_ip_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="booking_ip"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    $('input[name="booking_ov_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
        locale: {
            format: 'DD MMM YY'
        }
    }, function(chosen_date) {
        $('input[name="booking_ov_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="booking_ov"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    $('input[name="booking_cls_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
    }, function(chosen_date) {
        $('input[name="booking_cls_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="booking_cls"]').val(chosen_date.format('YYYY-MM-DD'));
    });
    //tyny
    // tinymce.init({ selector:'textarea' });
    $(function() {
        $("table").stickyTableHeaders();
    });

    //back to top
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    //sticky header
    $(".ticket-status").stick_in_parent({
        offset_top: 0
    });

    $( "#ticketNumber" ).focus();

});