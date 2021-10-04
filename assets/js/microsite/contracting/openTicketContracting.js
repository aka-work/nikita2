$(document).ready(function() {
    $('#OPEN-TICKET').addClass('active')

    var ctgId = $('#category').val()
    var subDivId = $('#division_sub').val()
    let keep_pic = $('#hidden_pic').val()
    
    //variable for automatic pic
    var PIC = []
    var divId = $('#divId').val()
    
    //variable for automatic priority
    let hotel_percent = 0;
    let topic_percent = 0;
    let market_percent = 0;
    let validity_percent = 0;
    let booking_percent = 0;
    let hotel_contract_percent = 0;

    let priority_weight = $('#priority_weight').val() == '' ? 0 : parseInt($('#priority_weight').val())
    let topic_result = $('#topic_result').val() == '' ? 0 : parseInt($('#topic_result').val());
    let hotel_result = $('#hotel_result').val() == '' ? 0 : parseInt($('#hotel_result').val());
    let market_result = $('#market_result').val() == '' ? 0 : parseInt($('#market_result').val());
    let validity_result = $('#validfrom_result').val() == '' ? 0 : parseInt($('#validfrom_result').val());
    let booking_result = $('#booking_result').val() == '' ? 0 : parseInt($('#booking_result').val());
    let hotel_contract_result = $('#hotel_contract_result').val() == '' ? 0 : parseInt($('#hotel_contract_result').val());
    
    //variable for get weight hotel
    let hotelWeightCities = ''
    let hotelWeightContract = ''


    //get percentage weight from db
    getPercentageWeight()

    let str ={
        topic_result: `${topic_result}`,
        hotel_result: `${hotel_result}`,
        market_result: `${market_result}`,
        validity_result: `${validity_result}`,
        booking_result: `${booking_result}`,
        hotel_contract_result: `${hotel_contract_result}`
    }
    console.log(str)

    //set automatic prior on load
    priority_weight = priorityWeight(topic_result, hotel_result, market_result, validity_result, booking_result, hotel_contract_result)
    automaticPriority(priority_weight)
    $('#ticket-weight').html(priority_weight)

    console.log('priority_weight',priority_weight)

    // setTimeout(() => {
    //     getSubDivUser()
    // }, 200)

    // set division sub name
    // getDivSubById()
    // getUserById()

    enableOthersMarket()

    //get hotel weight
    getHotelWeightCities()
    getHotelWeightContract()

    console.log('divid', divId)
    console.log('ctgid', ctgId)

    //for revenue division topic Comparison
    if (ctgId == 39 || ctgId == 69 || ctgId == 70 || ctgId == 71) {
        $('#due_date_show').parent().css('display', '')
        $('#lblDueDate').css('color', 'black')
        $('#due_date_show').prop('disabled', false)
        $('#due_date').prop('disabled', false)
    } else {
        $('#due_date_show').parent().css('display', 'none')
        $('#lblDueDate').css('color', '#eff3f8')
        $('#due_date_show').prop('disabled', true)
        $('#due_date').prop('disabled', true)
    }

    //for channel manager topic
    if (ctgId == 53 || ctgId == 68 || ctgId == 77 || ctgId == 78 || ctgId == 79 || ctgId == 80 || ctgId == 98) {
        if (ctgId == 98){
            $('#cm_company').parent().css('display', 'none')
            $('#cm_company').prop('selectedIndex', 0)
            $('#cm_company').prop('disabled', true)
        } else {
            $('#cm_company').parent().css('display', '')
            $('#cm_company').prop('disabled', false)
        }
        if (ctgId == 79) {
            $('#commision_level').parent().css('display', 'none')
            $('#commision_level').prop('selectedIndex', 0)
            $('#commision_level').prop('disabled', true)

        } else {
            $('#commision_level').parent().css('display', '')
            $('#commision_level').prop('disabled', false)
        }
    } else {
        $('#cm_company').parent().css('display', 'none')
        $('#cm_company').prop('selectedIndex', 0)
        $('#cm_company').prop('disabled', true)
        $('#commision_level').parent().css('display', 'none')
        $('#commision_level').prop('selectedIndex', 0)
        $('#commision_level').prop('disabled', true)
    }

    if ($('#divId').val() == 2 || $('#category').val() == 39 || $('#category').val() == 52 || $('#category').val() == 53 || $('#category').val() == 68 || $('#category').val() == 69 || $('#category').val() == 70 || $('#category').val() == 71 || $('#category').val() == 72 || $('#category').val() == 73 || $('#category').val() == 53 || $('#category').val() == 68 || $('#category').val() == 74 || $('#category').val() == 76 || $('#category').val() == 77 || $('#category').val() == 78 || $('#category').val() == 79 || $('#category').val() == 81 || $('#category').val() == 96 || $('#category').val() == 98 ) {
        disabledFieldContracting()
    } else {
        enabledFieldContracting()
    }

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
        //param to get weight
        let id = $('#category').val();
        let category = JSON.parse($('option:selected', this).attr('data-ctg'));
        console.log(category);

        topic_result = (topic_percent / 100) * category.weight;
        $('#topic_desc').html(category.description);
        $('#divId').val(category.division_id);

        if (id != '') {

            if (id == 39 || id == 69 || id == 70 || id == 71) {
                $('#due_date_show').parent().css('display', '')
                $('#lblDueDate').css('color', 'black')
                $('#due_date_show').prop('disabled', false)
                $('#due_date').prop('disabled', false)
            } else {
                $('#due_date_show').parent().css('display', 'none')
                $('#lblDueDate').css('color', '#eff3f8')
                $('#due_date_show').prop('disabled', true)
                $('#due_date').prop('disabled', true)
            }


            //channel manager field enable disable
            if (id == 53 || id == 68 || id == 77 || id == 78 || id == 79 || id == 80 || id == 98) {
                if (id == 98){
                    $('#cm_company').parent().css('display', 'none')
                    $('#cm_company').prop('selectedIndex', 0)
                    $('#cm_company').prop('disabled', true)
                } else {
                    $('#cm_company').parent().css('display', '')
                    $('#cm_company').prop('disabled', false)
                }
                if (id == 79) {
                    $('#commision_level').parent().css('display', 'none')
                    $('#commision_level').prop('selectedIndex', 0)
                    $('#commision_level').prop('disabled', true)

                } else {
                    $('#commision_level').parent().css('display', '')
                    $('#commision_level').prop('disabled', false)
                }
            } else {
                $('#cm_company').parent().css('display', 'none')
                $('#cm_company').prop('selectedIndex', 0)
                $('#cm_company').prop('disabled', true)
                $('#commision_level').parent().css('display', 'none')
                $('#commision_level').prop('selectedIndex', 0)
                $('#commision_level').prop('disabled', true)
            }

            if ($('#divId').val() == 2 || $('#category').val() == 39 || $('#category').val() == 52 || $('#category').val() == 53 || $('#category').val() == 68 || $('#category').val() == 69 || $('#category').val() == 70 || $('#category').val() == 71 || $('#category').val() == 72 || $('#category').val() == 73 || $('#category').val() == 53 || $('#category').val() == 68 || $('#category').val() == 74 || $('#category').val() == 76 || $('#category').val() == 77 || $('#category').val() == 78 || $('#category').val() == 79 || $('#category').val() == 81 || $('#category').val() == 96 || $('#category').val() == 98 ) {
                disabledFieldContracting()
            } else {
                enabledFieldContracting()
            }

        } else {
            topic_weight = 0;
            topic_result = (topic_percent / 100) * topic_weight;

            $('#division_sub_lbl').html('Not Set')
            $('#division_sub').val('')
            $('#topic_desc').html('')
            $('#divId').val('')
            
            //pic
            $('#ticketPic_lbl').html('Not Set')
            $('#ticketPic').val('')

            //reset disabled field 
            enabledFieldContracting()
                
            //disabled due date
            $('#due_date_show').parent().css('display', 'none')
            $('#lblDueDate').css('color', '#eff3f8')
            $('#due_date_show').prop('disabled', true)
            $('#due_date').prop('disabled', true)
                
            //channel manager disabled
            $('#cm_company').parent().css('display', 'none')
            $('#cm_company').prop('selectedIndex', 0)
            $('#commision_level').parent().css('display', 'none')
            $('#commision_level').prop('selectedIndex', 0)
        }

        priority_weight = priorityWeight(topic_result, hotel_result, market_result, validity_result, booking_result, hotel_contract_result);
        console.log('topic result weight: ', priority_weight)
        automaticPriority(priority_weight)
        $('#priority_weight').val(priority_weight)
        $('#ticket-weight').html(priority_weight)
        $('#topic_result').val(topic_result)

        //let hotelName = ($('#hotel').val() ? $('#hotel').val() : '')
        let divId = ($('#divId').val() ? $('#divId').val() : '')
        setPicAutomatically(divId)

    });

    function disabledFieldContracting() {
        $('#validity_from_show').attr('disabled', true)
        $('#validity_to_show').attr('disabled', true)
        $('#start_booking_show').attr('disabled', true)
        $('#booking_to_show').attr('disabled', true)
        $('#market').prop('selectedIndex', 2)
        $('#market').attr('readonly', true)
        $("#market").css("pointer-events", "none");
        $('#validity_from').attr('disabled', true);
        $('#validity_to').attr('disabled', true);
        $('#start_booking').attr('disabled', true);
        $('#booking_to').attr('disabled', true);
    }

    function enabledFieldContracting() {
        $('#validity_from_show').attr('disabled', false)
        $('#validity_to_show').attr('disabled', false)
        $('#start_booking_show').attr('disabled', false)
        $('#booking_to_show').attr('disabled', false)
            //$('#market').prop('selectedIndex', 0)
        $('#market').attr('readonly', false)
        $("#market").css("pointer-events", "");
        $('#validity_from').attr('disabled', false);
        $('#validity_to').attr('disabled', false);
        $('#start_booking').attr('disabled', false);
        $('#booking_to').attr('disabled', false);
    }

    $('#hotel').on('blur', function() {
        let hotel = $(this).val();
        let hotel_weight = 0;
        let hotel_contract_weight = 0;

        if (hotel != '') {
            $.ajax({
                type: "POST",
                url: "/hotel/ajax/get-city-by-hotel",
                data: { hotel: hotel },
                async: false,
                global: false,
                success: function(data) {
                    /*show content*/
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
                    //to get contract type
                    contract_data.topup_incentive = city[0].topup_incentive
                    contract_data.top250 = city[0].top250
                    contract_data.indonesia_chain = city[0].indonesia_chain
                    contract_data.other_chain = city[0].other_chain

                    if (city.length == 0) {
                        hotel_weight = 0;
                        hotel_result = (hotel_percent / 100) * hotel_weight
                        
                        //to get result contract weight
                        hotel_contract_weight = 0
                        hotel_contract_result = (hotel_contract_percent / 100) * hotel_contract_weight
                    }

                    //hotel weight
                    hotel_weight = generateHotelWeightCities(country, html_city)
                    hotel_result = (hotel_percent / 100) * hotel_weight

                    //hotel_contract_weight
                    hotel_contract_weight = generateHotelWeightContract(contract_data)
                    hotel_contract_result = (hotel_contract_percent / 100) * hotel_contract_weight

                    $('#city').html(html_city);
                    $('#codeHotel').val(html_code);
                    $('#cityHotel').val(html_city);
                },
                error: function(jqXHR, textStatus, err) {
                    //show error message
                    alert('error');
                }
            });

            console.log('hotel result: ', hotel_result)
            console.log(' hotel contract result: ', hotel_contract_result)
                //set priority automatically
            priority_weight = priorityWeight(topic_result, hotel_result, market_result, validity_result, booking_result, hotel_contract_result)
            console.log('in hotel weight result: ', priority_weight)
            automaticPriority(priority_weight)
            $('#priority_weight').val(priority_weight)
            $('#ticket-weight').html(priority_weight)
            $('#hotel_result').val(hotel_result)
            $('#hotel_contract_result').val(hotel_contract_result)

            //set pic automatically
            divId = $('#divId').val()
            setPicAutomatically(divId)

        } else {

            //to get result weight
            hotel_weight = 0;
            hotel_result = (hotel_percent / 100) * hotel_weight

            //to get result contract weight
            hotel_contract_weight = 0
            hotel_contract_result = (hotel_contract_percent / 100) * hotel_contract_weight
            priority_weight = priorityWeight(topic_result, hotel_result, market_result, validity_result, booking_result, hotel_contract_result)
            console.log('in hotel weight result: ', priority_weight)
            automaticPriority(priority_weight)
            $('#priority_weight').val(priority_weight)
            $('#ticket-weight').html(priority_weight)
            $('#hotel_result').val(hotel_result)
            $('#hotel_contract_result').val(hotel_contract_result)


            //disabled division field if active
            $('#division_sub_lbl').html(`Not Set`)
            $('#division_sub').val('')
                //$('#division_sub').parent().css('display', 'none')

            //disabled pic field
            $('#ticketPic').val('')
            $('#ticketPic_lbl').html('Not Set')
            $('#buddyUser_id').val('')
            $('#buddyUser_name').val('')
            $('#buddyUser_email').val('')

            //
            $('#city').html('');
            $('#codeHotel').val('');
            $('#cityHotel').val('');
        }
    })

    function setPicAutomatically(divId) {

        console.log(PIC);

        //set pic automatically
        let pic_fix = null

        if (PIC.length > 0){
            switch (divId){
                case '2':
                    pic_fix = (PIC[0].contracting) ? PIC[0].contracting : null 
                    break;
                case '15':
                    pic_fix = (PIC[0].data_entry) ? PIC[0].data_entry : null
                    break;
                case '18':
                    pic_fix = (PIC[0].data_entry) ? PIC[0].data_entry : null
                    break;
                case '14':
                    pic_fix = (PIC[0].revenue) ? PIC[0].revenue : null
            }
        }
        
        console.log(pic_fix);
        var sub_div = ''
        if (pic_fix != 'NONE' && pic_fix != null) {
            $.ajax({
                type: "POST",
                url: "/users/ajax/get-user-by-email",
                data: { email: pic_fix },
                async: false,
                global: false,
                success: function(data) {
                    console.log(data)
                    let user = JSON.parse(data.result)
                    let buddy = JSON.parse(data.buddyUser)

                    sub_div = user[0].division_sub_id
                    console.log("sub_div",sub_div)
                    $('#ticketPic_lbl').html(`${user[0].fullname}`)
                    $('#ticketPic').val(`${user[0].id}`)
                    
                    if (buddy != null) {
                        $('#ticketPic_lbl').html(`${buddy[0].fullname}`)
                        $('#ticketPic').val(`${buddy[0].id}`)
                        $('#buddyUser_id').val(`${user[0].id}`)
                        $('#buddyUser_name').val(`${user[0].fullname}`)
                        $('#buddyUser_email').val(`${user[0].email}`)
                    }
                    
                }
            })

            if (sub_div != '' && sub_div != null){
                $.ajax({
                    type: "POST",
                    url: "/division/ajax/get-subdiv-by-id",
                    data: { id: sub_div },
                    async: false,
                    global: false,
                    success: function(data) {
                        let subdiv = JSON.parse(data)
    
                        $('#division_sub_lbl').html(`${subdiv[0].name}`)
                        $('#division_sub').val(`${subdiv[0].id}`)
                    }
                })
            }
            
        }
    }

    // $('#division_sub').on('change', function() {
    //     console.log('ganti sub')
    //     $('#user_subdiv').remove();
    //     getSubDivUser()
    // })

    function getSubDivUser() {
        subDivId = $('#division_sub').val();
        $.ajax({
            type: "POST",
            url: "/users/get_sub_division_users",
            data: { id: subDivId },
            success: function(data) {
                //show content
                var pic = JSON.parse(data);
                var html = `<optgroup label="Contracting Team" id="user_subdiv">`;
                for (var i = 0; i < pic.length; i++) {
                    if (keep_pic != '') {
                        if (pic[i].id == keep_pic) {
                            html = `<option value=${pic[i].id} selected>${pic[i].fullname}</option>`;
                        }
                    } else {
                        html += `<option value=${pic[i].id}>${pic[i].fullname}</option>`;
                    }
                }
                html += `</optgroup>`
                $('#ticketPic').append(html);
                if (keep_pic != '') {
                    $('#ticketPic').html(html);
                }
                if (pic.length == 0) {
                    $('#user_subdiv').remove();
                }
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        });
    }

    //add new hotel ajax
    $('#popupAddHotel').on('click', function() {

        $.ajax({
            type: "GET",
            url: "/hotel/ajax/open-popup-hotel",
            async: false,
            success: function(data) {
                //show content
                let country = JSON.parse(data.country)
                let html = '<option value="">Select Country</option>'
                for (let i = 0; i < country.length; i++) {
                    if (country[i].country != null && country[i].country != '') {
                        html += `<option value="${country[i].country}">${country[i].country}</option>`
                    }
                }

                $('#newHotelCountry').html(html)
                $('#myModal').modal()
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        });

        let html1 = `<option value="">Select City</option>`
        $('#newHotelCity').html(html1)
        $('#newHotelCity').removeAttr('disabled')

        let country = $('#newHotelCountry').val();

        $.ajax({
            type: "GET",
            url: "/hotel/ajax/popup-get-pic",
            async: false,
            success: function(data) {
                //show content
                let piclist = JSON.parse(data.piclist)
                let html_c = ''
                let html_r = ''
                let html_de = ''
                for (let i = 0; i < piclist.length; i++) {
                    //pic contracting
                    if (piclist[i].divisi_id == 2) {
                        // if(piclist[i].division_sub_id != 12){
                        html_c += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                            // }
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

    $('#newHotelName').on('blur', function() {
        if ($('#newHotelCode').val() == '') {
            $('#newHotelCode').val($(this).val())
        }
    })

    $('#newHotelCountry').on('change', function() {
        let country = $(this).val()
        if (country !== '') {
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
                            // if(piclist[i].division_sub_id != 12){
                            html_c += `<option value="${piclist[i].email}">${piclist[i].fullname}</option>`
                                // }
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
        } else {
            let html1 = `<option value="">Select City</option>`
            $('#newHotelCity').html(html1)
            $('#newHotelCity').removeAttr('disabled')
            $('#popup_contracting').html(`<option value="">select pic contracting</option>`)
            $('#popup_revenue').html(`<option value="">select pic revenue</option>`)
            $('#popup_dataentry').html(`<option value="">select pic data entry</option>`)
        }
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

        if (hotelCode != '' && hotelName != '' && hotelCountry != '' && hotelCity != '' && hotelContracting != '' && hotelRevenue != '' && hotelDataentry != '' && hotelContract != '') {

            $.ajax({
                type: "POST",
                url: "/hotel/ajax/popup-add-hotel",
                data: { hotelName, hotelCode, jarvisCode, hotelCountry, hotelCity, hotelContracting, hotelRevenue, hotelDataentry, hotelContract },
                success: function(data) {
                    //show content
                    if (!data.existing) {
                        alert(data.messages)
                        $('#newHotelName').val('')
                        $('#newHotelCode').val('')
                        $('#newJarvisCode').val('')
                        $('#newHotelCountry').val($("#newHotelCountry option:first").val())
                        $('#newHotelCity').val($("#newHotelCity option:first").val())
                        $('#popup_contracting').html(`<option value="">select pic contracting</option>`)
                        $('#popup_revenue').html(`<option value="">select pic revenue</option>`)
                        $('#popup_dataentry').html(`<option value="">select pic data entry`)
                        $('#popup_contract_type').val($("#popup_contract_type option:first").val())
                    } else {
                        alert(data.messages)
                    }
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

    function enableOthersMarket() {
        let market = $('#market').val()
        if (market === 'Others') {
            $('#othersMarket').parent().css('display', '')
            $('#othersMarket').prop('disabled', false)
        } else {

            $('#othersMarket').parent().css('display', 'none')
            $('#othersMarket').prop('disabled', true)
        }
    }

    $('#market').on('change', function() {
        enableOthersMarket()
        let marketName = $('#market').val()
        let market_weight = 0;
        if (marketName != '') {
            $.ajax({
                type: "POST",
                url: "/ticket/weight/get-market-weight",
                data: { name: marketName },
                async: false,
                global: false,
                success: function(data) {
                    /*show content*/
                    var weight = JSON.parse(data);
                    market_weight = weight[0].weight;
                    market_result = Math.round((market_percent / 100) * market_weight);
                },
                error: function(jqXHR, textStatus, err) {
                    //show error message
                    alert('error ', err);
                }
            });
        } else {
            market_weight = 0;
            market_result = (market_percent / 100) * market_weight;
        }

        priority_weight = priorityWeight(topic_result, hotel_result, market_result, validity_result, booking_result, hotel_contract_result)
        console.log('this is weight from market: ', priority_weight)
        automaticPriority(priority_weight)
        $('#priority_weight').val(priority_weight)
        $('#ticket-weight').html(priority_weight)
        console.log(market_result)
        $('#market_result').val(market_result)
    })

    function getPercentageWeight() {
        $.ajax({
            type: "GET",
            url: "/ticket/weight/get-percentage",
            async: false,
            global: false,
            success: function(data) {
                /*show content*/
                var percentage_weight = JSON.parse(data);
                for (var i = 0; i < percentage_weight.length; i++) {
                    if (percentage_weight[i].name == 'hotel') {
                        hotel_percent = percentage_weight[i].weight;
                    }
                    if (percentage_weight[i].name == 'topic') {
                        topic_percent = percentage_weight[i].weight;
                    }
                    if (percentage_weight[i].name == 'market') {
                        market_percent = percentage_weight[i].weight;
                    }
                    if (percentage_weight[i].name == 'validity') {
                        validity_percent = percentage_weight[i].weight;
                    }
                    if (percentage_weight[i].name == 'booking-window') {
                        booking_percent = percentage_weight[i].weight;
                    }
                    if (percentage_weight[i].name == 'hotel-contract') {
                        hotel_contract_percent = percentage_weight[i].weight;
                    }
                }
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error ', err);
            }
        });
    }

    function automaticPriority(priority_weight) {
        console.log('priority weight to set: ', priority_weight)
        $.ajax({
            type: "GET",
            url: "/ticket/get-priority",
            async: false,
            global: false,
            success: function(data) {
                /*show content*/
                var priority = JSON.parse(data);
                var html = ''
                for (let i = 0; i < priority.length; i++) {
                    if (i === 0) {
                        if (priority_weight >= priority[i].min_weight) {
                            //html += `<input value=${priority[0].id}>${priority[0].name} - ${priority[0].due_time} hours</option>`
                            $("#ticketPrior").val(`${priority[i].id}`)
                            $("#ticketPrior_lbl").html(`${priority[i].name} - ${priority[i].due_time} hours (${priority[i].due_time / 24} day(s))`)
                        }
                    } else {
                        if (priority_weight >= priority[i].min_weight && priority_weight < priority[i - 1].min_weight) {
                            //html += `<input value=${priority[0].id}>${priority[0].name} - ${priority[0].due_time} hours</option>`
                            $("#ticketPrior").val(`${priority[i].id}`)
                            $("#ticketPrior_lbl").html(`${priority[i].name} - ${priority[i].due_time} hours (${priority[i].due_time / 24} day(s))`)
                        }
                    }

                }
                //$('#ticketPrior').html(html)
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error ', err);
            }
        });
    }

    function priorityWeight(topic, hotel, market, validity, booking, hotel_contract) {
        let priority_weight = topic + hotel + market + validity + booking + hotel_contract
        return priority_weight
    }

    function autoPicAlternative() {
        const pic_alt = 'ineke.jie@mgholidaygroup.com'
        var sub_div = ''
        $.ajax({
            type: "POST",
            url: "/users/ajax/get-user-by-email",
            data: { email: pic_alt },
            async: false,
            global: false,
            success: function(data) {
                let buddy = JSON.parse(data.buddyUser)
                let pic = JSON.parse(data.result)
                    //let html =  `<option value=${pic[0].id} selected>${pic[0].fullname}</option>`;

                sub_div = pic[0].division_sub_id

                $('#ticketPic_lbl').html(`${pic[0].fullname}`)
                $('#ticketPic').val(`${pic[0].id}`)

                if (buddy != null) {
                    $('#ticketPic_lbl').html(`${buddy[0].fullname}`)
                    $('#ticketPic').val(`${buddy[0].id}`)
                    $('#buddyUser_id').val(`${pic[0].id}`)
                    $('#buddyUser_name').val(`${pic[0].fullname}`)
                    $('#buddyUser_email').val(`${pic[0].email}`)
                }
            }
        })

        $.ajax({
            type: "POST",
            url: "/division/ajax/get-subdiv-by-id",
            data: { id: sub_div },
            async: false,
            global: false,
            success: function(data) {
                let subdiv = JSON.parse(data)
                let html = `<option value=${subdiv[0].id} selected>${subdiv[0].name}</option>`;

                $('#division_sub_lbl').html(`${subdiv[0].name}`)
                $('#division_sub').val(`${subdiv[0].id}`)
            }
        })
    }

    function getDivSubById() {
        let id = $('#division_sub').val()
        if (id != '') {
            $.ajax({
                type: "POST",
                url: "/division/ajax/get-subdiv-by-id",
                data: { id: id },
                async: false,
                global: false,
                success: function(data) {
                    let divsub = JSON.parse(data)
                    console.log('hy', data)
                    $('#division_sub_lbl').html(`${divsub[0].name}`)
                },
                error: function(jqXHR, textStatus, err) {
                    //show error message
                    alert('error ', err);
                }
            })
        }
    }

    function getUserById() {
        let id = $('#ticketPic').val()
        if (id != '') {
            $.ajax({
                type: "POST",
                url: "/users/ajax/get-user-by-id",
                data: { id: id },
                async: false,
                global: false,
                success: function(data) {
                    let pic = JSON.parse(data)
                    $('#ticketPic_lbl').html(`${pic[0].fullname}`)
                },
                error: function(jqXHR, textStatus, err) {
                    //show error message
                    alert('error ', err);
                }
            })
        }
    }

    function roundToHalf(value) {
        var converted = parseFloat(value); // Make sure we have a number 
        var decimal = (converted - parseInt(converted, 10));
        decimal = Math.round(decimal * 10);
        if (decimal == 5) { return (parseInt(converted, 10) + 0.5); }
        if ((decimal < 3) || (decimal > 7)) {
            return Math.round(converted);
        } else {
            return (parseInt(converted, 10) + 0.5);
        }
    }

    function getHotelWeightCities() {
        $.ajax({
            type: "GET",
            url: "/hotel/ajax/get-hotel-weight-city",
            async: false,
            global: false,
            success: function(data) {
                hotelWeightCities = JSON.parse(data)
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error ', err);
            }
        })
    }

    function getHotelWeightContract() {
        $.ajax({
            type: "GET",
            url: "/hotel/ajax/get-hotel-weight-contract",
            async: false,
            global: false,
            success: function(data) {
                hotelWeightContract = JSON.parse(data)
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error ', err);
            }
        })
    }

    function generateHotelWeightCities(country, city) {
        let arr_topID = hotelWeightCities[0].param.split(';')
        let arr_2ndID = hotelWeightCities[1].param.split(';')
        let arr_topAsia = hotelWeightCities[3].param.split(';')
        let arr_2ndAsia = hotelWeightCities[4].param.split(';')

        if (country == 'Indonesia') { //for check top id
            if (arr_topID.indexOf(city) != -1) {
                return hotelWeightCities[0].weight;
            } else if (arr_2ndID.indexOf(city) != -1) {
                return hotelWeightCities[1].weight;
            } else {
                return hotelWeightCities[2].weight;
            }
        } else {
            if (arr_topAsia.indexOf(city) != -1) {
                return hotelWeightCities[3].weight;
            } else if (arr_2ndAsia.indexOf(city) != -1) {
                return hotelWeightCities[4].weight;
            } else {
                return hotelWeightCities[5].weight;
            }
        }
    }

    function generateHotelWeightContract(data) {
        let topup_incentive = data.topup_incentive
        let top250 = data.top250
        let indonesia_chain = data.indonesia_chain
        let other_chain = data.other_chain

        if (topup_incentive == 1) {
            return hotelWeightContract[0].weight
        } else if (top250 == 1) {
            return hotelWeightContract[1].weight
        } else if (indonesia_chain == 1) {
            return hotelWeightContract[2].weight
        } else if (other_chain == 1) {
            return hotelWeightContract[3].weight
        } else {
            return hotelWeightContract[4].weight
        }
    }

    //set default date
    let todayView = moment().format('DD MMM YY');
    let todayToSave = moment().format('YYYY-MM-DD');

    $('#validity_from_show').val() == '' ? $('#validity_from_show').val(todayView) : $('#validity_from_show').val()
    $('#validity_from').val() == '' ? $('#validity_from').val(todayToSave) : $('#validity_from').val()
    $('#validity_to_show').val() == '' ? $('#validity_to_show').val(todayView) : $('#validity_to_show').val()
    $('#validity_to').val() == '' ? $('#validity_to').val(todayToSave) : $('#validity_to').val()
    $('#start_booking_show').val() == '' ? $('#start_booking_show').val(todayView) : $('#start_booking_show').val()
    $('#start_booking').val() == '' ? $('#start_booking').val(todayToSave) : $('#start_booking').val()
    $('#booking_to_show').val() == '' ? $('#booking_to_show').val(todayView) : $('#booking_to_show').val()
    $('#booking_to').val() == '' ? $('#booking_to').val(todayToSave) : $('#booking_to').val()

    //direct set weight validity and booking 
    getValidityWeight($('#validity_from').val())
    getBookingWeight($('#start_booking').val())


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
        let validity_date = $('#validity_from').val()
        if (validity_date != '') {
            getValidityWeight(validity_date)
            $('#validity_to_show').focus()

        }
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
    });

    //validate validity field
    $('#validity_from_show').on('blur', function() {
        if ($(this).val() !== '') {
            if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
                $(this).val(moment('2019-01-01').format('DD MMM YY'))
                $('#validity_from').val('2019-01-01')
                let validity_date = $('#validity_from').val();
                getValidityWeight(validity_date)

            } else {
                $('#validity_from').val(moment($(this).val()).format('YYYY-MM-DD'))
                let validity_date = $('#validity_from').val()
                getValidityWeight(validity_date)

            }
        } else {
            $('#validity_from').val('')
            validity_weight = 0;
            validity_result = (validity_percent / 100) * validity_weight;

            priority_weight = priorityWeight(topic_result, hotel_result, market_result, validity_result, booking_result, hotel_contract_result)
            console.log('weight result from validity: ', priority_weight)
            automaticPriority(priority_weight)
            $('#priority_weight').val(priority_weight)
            $('#ticket-weight').html(priority_weight)
            $('#validfrom_result').val(validity_result)
        }
    })

    function getValidityWeight(vDate) {
        let validity = vDate
        let nowDate = moment().format('YYYY-MM-DD')
        let ms = moment(validity, "YYYY-MM-DD").diff(moment(nowDate, "YYYY-MM-DD"));
        let d = moment.duration(ms).asMonths()
        let validity_weight = 0;
        console.log('Validity: ', validity)
        console.log('Current date: ', nowDate)
        console.log('different day: ', d)
        $.ajax({
            type: "GET",
            url: "/ticket/weight/get-validity-weight",
            async: false,
            global: false,
            success: function(data) {
                /*show content*/
                var weight = JSON.parse(data);
                /*for(let i=0; i<weight.length; i++){
                    if(d <= weight[i].days){
                        validity_weight = weight[i].weight;
                        validity_result = (validity_percent/100) * validity_weight;
                    }
                }*/

                if (d <= weight[0].months) {
                    validity_weight = weight[0].weight;
                    validity_result = (validity_percent / 100) * validity_weight;
                } else if (d > weight[0].months && d <= weight[1].months) {
                    validity_weight = weight[1].weight;
                    validity_result = (validity_percent / 100) * validity_weight;
                } else if (d > weight[1].months && d <= weight[2].months) {
                    validity_weight = weight[2].weight;
                    validity_result = (validity_percent / 100) * validity_weight;
                } else if (d > weight[2].months && d <= weight[3].months) {
                    validity_weight = weight[3].weight;
                    validity_result = (validity_percent / 100) * validity_weight;
                }
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error ', err);
            }
        });

        priority_weight = priorityWeight(topic_result, hotel_result, market_result, validity_result, booking_result, hotel_contract_result)
        console.log('weight result from validity: ', priority_weight)
        automaticPriority(priority_weight)
        $('#priority_weight').val(priority_weight)
        $('#ticket-weight').html(priority_weight)
        $('#validfrom_result').val(validity_result)
    }

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

    $('input[name="start_booking_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
        locale: {
            format: 'DD MMM YY'
        }
    }, function(chosen_date) {
        $('input[name="start_booking_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="start_booking"]').val(chosen_date.format('YYYY-MM-DD'));
        //to set autopriority
        let start_booking = $('#start_booking').val()
        let nowDate = moment().format('YYYY-MM-DD')
        if (start_booking != '') {
            getBookingWeight(start_booking)
            $('#booking_to_show').focus()
        }
    });

    $('input[name="booking_to_show"]').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
        locale: {
            format: 'DD MMM YY'
        }
    }, function(chosen_date) {
        $('input[name="booking_to_show"]').val(chosen_date.format('DD MMM YY'));
        $('input[name="booking_to"]').val(chosen_date.format('YYYY-MM-DD'));
        $('#validity_from_show').focus()
    });

    $('#start_booking_show').on('blur', function() {
        if ($(this).val() !== '') {
            if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
                $(this).val(moment('2019-01-01').format('DD MMM YY'))
                $('#start_booking').val('2019-01-01')
                getBookingWeight($('#start_booking').val())

            } else {
                $('#start_booking').val(moment($(this).val()).format('YYYY-MM-DD'))

                let start_booking = $('#start_booking').val()
                getBookingWeight(start_booking)
            }
        } else {
            $('#start_booking').val('')
            booking_weight = 0
            booking_result = (booking_percent / 100) * booking_weight;

            priority_weight = priorityWeight(topic_result, hotel_result, market_result, validity_result, booking_result, hotel_contract_result)
            console.log('weight result from booking: ', priority_weight)
            automaticPriority(priority_weight)
            $('#priority_weight').val(priority_weight)
            $('#ticket-weight').html(priority_weight)
            $('#booking_result').val(booking_result)
        }
    })

    function getBookingWeight(bDate) {
        let start_booking = bDate
        let nowDate = moment().format('YYYY-MM-DD')
        let ms = moment(start_booking, "YYYY-MM-DD").diff(moment(nowDate, "YYYY-MM-DD"));
        let d = moment.duration(ms).asWeeks()
        let booking_weight = 0;
        console.log('start booking: ', start_booking)
        console.log('Current date: ', nowDate)
        console.log('different week: ', d)
        $.ajax({
            type: "GET",
            url: "/ticket/weight/get-booking-weight",
            async: false,
            global: false,
            success: function(data) {
                //*show content/
                var weight = JSON.parse(data);
                /*for(let i=0; i<weight.length; i++){
                    if(d <= weight[i].days){
                        validity_weight = weight[i].weight;
                        validity_result = (validity_percent/100) * validity_weight;
                    }
                }*/

                console.log('weight: ', weight)
                if (d <= weight[0].weeks) {
                    booking_weight = weight[0].weight;
                    booking_result = (booking_percent / 100) * booking_weight;
                } else if (d > weight[0].weeks && d <= weight[1].weeks) {
                    booking_weight = weight[1].weight;
                    booking_result = (booking_percent / 100) * booking_weight;
                } else if (d > weight[1].weeks && d <= weight[2].weeks) {
                    booking_weight = weight[2].weight;
                    booking_result = (booking_percent / 100) * booking_weight;
                }
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error ', err);
            }
        });

        priority_weight = priorityWeight(topic_result, hotel_result, market_result, validity_result, booking_result, hotel_contract_result)
        console.log('weight result from booking: ', booking_result)
        automaticPriority(priority_weight)
        $('#priority_weight').val(priority_weight)
        $('#ticket-weight').html(priority_weight)
        $('#booking_result').val(booking_result)
    }

    $('#booking_to_show').on('blur', function() {
        if ($(this).val() !== '') {
            if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
                $(this).val(moment('2019-12-31').format('DD MMM YY'))
                $('#booking_to').val('2019-12-31')
            }
        } else {
            $('#booking_to').val('')
        }
    })

    $('#more_files').on('click', function() {

        let l = $('input[type=file][style]').length
        let arr_idx = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

        $("#files" + arr_idx[l - 1])
            .removeAttr('style')
    });


    $('#newHotelName').on('keyup', function() {
        let hotelName = $(this).val()
        $.ajax({
            type: "POST",
            url: "/hotel/ajax/popup-check-hotel",
            data: { hotelName },
            success: function(data) {
                //show content
                if (data.exists) {
                    $('#hotel-name-exist').css('display', '')
                    $('#hotel-name-exist').html(data.messages)
                    $('#btn_addhotel').prop('disabled', true);
                } else {
                    $('#hotel-name-exist').css('display', 'none')
                    $('#btn_addhotel').prop('disabled', false);
                }
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        });
    })

    if ($('#due_date').val()) {
        $('#due_date').val()
        $('#due_date_show').val(moment($('#due_date').val()).format('DD MMM YY HH:mm:ss'))
    } else {
        $('#due_date').val(moment().format('YYYY-MM-DD HH:mm') + ':00')
        $('#due_date_show').val(moment($('#due_date').val()).format('DD MMM YY HH:mm:ss'))
    }

    $('input[name="due_date_show"]').daterangepicker({
        singleDatePicker: true,
        timePicker: true,
        showDropdowns: true,
        minYear: 2018,
        maxYear: parseInt(moment().add(20, 'years').format('YYYY')),
        autoUpdateInput: false,
        startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        locale: {
            format: 'YYYY-MM-DD HH:mm:ss'
        }
    }, function(chosen_date) {

        $('#due_date_show').val(moment(chosen_date).format('DD MMM YY HH:mm:ss'));
        $('input[name="due_date"]').val(chosen_date.format('YYYY-MM-DD HH:mm:ss'));
        // $('input[name="booking_to"]').val(chosen_date.format('YYYY-MM-DD'));
    });

    //<input type="file" name="attachment_ticket" id="attachment_ticket0" class="form-control" multiple>
});