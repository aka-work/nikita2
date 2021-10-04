$(document).ready(function() {
    $('#OPEN-TICKET').addClass('active')

    var ctgId = $('#category').val()
    var subDivId = $('#division_sub').val();
    let keep_pic = $('#hidden_pic').val()
        //variable for automatic pic
    var PIC = []

    //autocomplete hotel field
    $('#hotel').typeahead({
        name: 'hotel',
        remote: '/hotel/ajax/autocomplete?key=%QUERY',
        limit: Infinity,
        minLength: 3
    })

    $('.twitter-typeahead').css('display', '')
    $('.tt-query').css('background-color', '')

    //event topic on change
    $('#category').on('change', function() {
        let id = $('#category').val();
        if (id != '') {
            $.ajax({
                type: "POST",
                url: "/ticket/weight/get-topic-weight",
                data: { id: id },
                async: false,
                global: false,
                success: function(data) {
                    /*show content*/
                    var weight = JSON.parse(data);
                    $('#topic_desc').html(weight[0].description)
                },
                error: function(jqXHR, textStatus, err) {
                    alert('error ', err);
                }
            });
        } else {
            $('#topic_desc').html('')
                //$('#division_sub').parent().css('display', 'none')
        }
    });

    $('#hotel').on('blur', function() {
        let hotel = $(this).val();

        if (hotel != '') {
            $.ajax({
                type: "POST",
                url: "/hotel/ajax/get-city-by-hotel",
                data: { hotel: hotel },
                async: false,
                global: false,
                success: function(data) {
                    /*show content*/
                    console.log('data hotel', data)
                    var city = JSON.parse(data);
                    var html_city = '';
                    var html_code = '';
                    var country = '';
                    let contract_data = {}
                    PIC = []
                    for (var i = 0; i < city.length; i++) {
                        PIC = []
                        if (city.length > 1) {
                            country = city[0].country
                            html_city = `${city[0].city}`;
                            html_code = `${city[0].key}`;
                            //to get pic
                            PIC.push({
                                contracting: city[0].contracting,
                                revenue: city[0].revenue,
                                data_entry: city[0].data_entry,
                            })

                        } else {
                            country = city[i].country
                            html_city = `${city[i].city}`;
                            html_code = `${city[i].key}`;
                            //to get pic
                            PIC.push({
                                contracting: city[i].contracting,
                                revenue: city[i].revenue,
                                data_entry: city[i].data_entry,
                            })
                        }
                    }

                    $('#city').html(html_city);
                    $('#codeHotel').val(html_code);
                    $('#cityHotel').val(html_city);
                },
                error: function(jqXHR, textStatus, err) {
                    //show error message
                    alert('error');
                }
            });

        }
    })

    //add new hotel ajax
    $('#popupAddHotel').on('click', function() {

        $.ajax({
            type: "GET",
            url: "/hotel/ajax/open-popup-hotel",
            async: false,
            success: function(data) {
                //show content
                let country = JSON.parse(data.country)
                let html = ''
                for (let i = 0; i < country.length; i++) {
                    html += `<option value="${country[i].country}">${country[i].country}</option>`
                }

                $('#newHotelCountry').html(html)
                $('#myModal').modal()
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        });

        let country = $('#newHotelCountry').val()
        $.ajax({
            type: "POST",
            url: "/hotel/ajax/popup-get-city",
            data: { country },
            async: false,
            success: function(data) {
                //show content
                let city = JSON.parse(data)
                let html = ''
                for (let i = 0; i < city.length; i++) {
                    html += `<option value="${city[i].city}">${city[i].city}</option>`
                }
                $('#newHotelCity').html(html)
                $('#newHotelCity').removeAttr('disabled')
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        });

        $.ajax({
            type: "GET",
            url: "/hotel/ajax/popup-get-pic",
            async: false,
            success: function(data) {
                //show content
                let piclist = JSON.parse(data.piclist)
                console.log(piclist)
                let html_c = ''
                let html_r = ''
                let html_de = ''
                for (let i = 0; i < piclist.length; i++) {
                    //pic contracting
                    if (piclist[i].divisi_id == 2) {
                        if (piclist[i].division_sub_id != 12) {
                            html_c += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                        }
                    }
                    //pic revenue
                    if (piclist[i].divisi_id == 14) {
                        if (country == 'Indonesia') {
                            if (piclist[i].id == 99) {
                                html_r += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                            }
                        } else {
                            if (piclist[i].id == 100) {
                                html_r += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                            }
                        }
                    }

                    if (piclist[i].divisi_id == 15) {
                        if (country == 'Indonesia') {
                            if (piclist[i].id == 103) {
                                html_de += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                            }
                        } else {
                            if (piclist[i].id == 102) {
                                html_de += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                            }
                        }
                    }
                }

                $('#popup_contracting').html(html_c)
                $('#popup_revenue').html(html_r)
                $('#popup_dataentry').html(html_de)
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        });
    })

    $('#newHotelCountry').on('change', function() {
        let country = $(this).val()
        $.ajax({
            type: "POST",
            url: "/hotel/ajax/popup-get-city",
            data: { country },
            success: function(data) {
                //show content
                let city = JSON.parse(data)
                let html = ''
                for (let i = 0; i < city.length; i++) {
                    html += `<option value="${city[i].city}">${city[i].city}</option>`
                }
                $('#newHotelCity').html(html)
                $('#newHotelCity').removeAttr('disabled')
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        });

        $.ajax({
            type: "GET",
            url: "/hotel/ajax/popup-get-pic",
            async: false,
            success: function(data) {
                //show content
                let piclist = JSON.parse(data.piclist)
                console.log(piclist)
                let html_c = ''
                let html_r = ''
                let html_de = ''
                for (let i = 0; i < piclist.length; i++) {
                    //pic contracting
                    if (piclist[i].divisi_id == 2) {
                        if (piclist[i].division_sub_id != 12) {
                            html_c += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                        }
                    }
                    //pic revenue
                    if (piclist[i].divisi_id == 14) {
                        if (country == 'Indonesia') {
                            if (piclist[i].id == 99) {
                                html_r += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                            }
                        } else {
                            if (piclist[i].id == 100) {
                                html_r += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                            }
                        }
                    }

                    if (piclist[i].divisi_id == 15) {
                        if (country == 'Indonesia') {
                            if (piclist[i].id == 103) {
                                html_de += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                            }
                        } else {
                            if (piclist[i].id == 102) {
                                html_de += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                            }
                        }
                    }
                }

                $('#popup_contracting').html(html_c)
                $('#popup_revenue').html(html_r)
                $('#popup_dataentry').html(html_de)
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        });
    })

    $('#btn_addhotel').on('click', function() {
        let hotelName = $('#newHotelName').val()
        let hotelCode = $('#newHotelCode').val()
        let jarvisCode = $('#newJarvisCode').val()
        let hotelCountry = $('#newHotelCountry').val()
        let hotelCity = $('#newHotelCity').val()
        let hotelContracting = $('#popup_contracting').val()
        let hotelRevenue = $('#popup_revenue').val()
        let hotelDataentry = $('#popup_dataentry').val()
        let hotelContract = $('#popup_contract_type').val()

        if (hotelName != '' && hotelCode != '' && hotelCountry != '' && hotelCity != '' && hotelContracting != '' && hotelRevenue != '' && hotelDataentry != '' && hotelContract != '') {

            $.ajax({
                type: "POST",
                url: "/hotel/ajax/popup-add-hotel",
                data: { hotelName, hotelCode, jarvisCode, hotelCountry, hotelCity, hotelContracting, hotelRevenue, hotelDataentry, hotelContract },
                success: function(data) {
                    //show content
                    alert('Success Add New Hotel')
                    $('#newHotelName').val('')
                    $('#newHotelCode').val('')
                    $('#newJarvisCode').val('')
                    $('#newHotelCountry').val($("#newHotelCountry option:first").val())
                    $('#newHotelCity').val($("#newHotelCity option:first").val())
                    $('#popup_contracting').val('')
                    $('#popup_revenue').val('')
                    $('#popup_dataentry').val('')
                    $('#popup_contract_type').val($("#popup_contract_type option:first").val())
                },
                error: function(jqXHR, textStatus, err) {
                    //show error message
                    alert('error');
                }
            });

        } else {
            alert('Please fill the data correctly!')
        }
    })

    //set daterange picker 
    $('input[name="validity_from_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
        locale: {
            format: 'DD MMM YY'
        }
    }, function(chosen_date) {
        $('input[name="validity_from_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="validity_from"]').val(chosen_date.format('YYYY-MM-DD'));
        //to set autopriority
    });

    $('input[name="validity_to_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
        locale: {
            format: 'DD MMM YY'
        }
    }, function(chosen_date) {
        $('input[name="validity_to_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="validity_to"]').val(chosen_date.format('YYYY-MM-DD'));
        $('#start_booking_show').focus()
    });

    //validate validity field
    $('#validity_from_show').on('blur', function() {
        if ($(this).val() !== '') {
            if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
                $(this).val(moment('2019-01-01').format('DD MMM YY'))
                $('#validity_from').val('2019-01-01')
            }
        } else {
            $('#validity_from').val('')
        }
    })

    $('#validity_to_show').on('blur', function() {
        if ($(this).val() !== '') {
            if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
                $(this).val(moment('2019-12-31').format('DD MMM YY'))
                $('#validity_to').val('2019-12-31')
            }
        } else {
            $('#validity_to').val('')
        }
    })

    $('#more_files').on('click', function() {

        let l = $('input[type=file][style]').length
        let arr_idx = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

        $("#files" + arr_idx[l - 1])
            .removeAttr('style')
    });

    $("#potential_cost").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 46 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        } else {
            $('#potential_cost').keyup(function () {
                var number = $(this).val();
                number += '';
                number = number.replace(",","");
                x = number.split('.');
                x1 = x[0];
                x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                $(this).val(x1 + x2);


            });
        }
    });
});