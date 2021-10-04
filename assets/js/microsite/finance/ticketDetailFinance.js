$(document).ready(function () {
    var id = $('#category').val();
    let id_div_sub = $('#div_sub_id').val();
    var selected = $('#selected_pic').val();
    let compareId = ''

    $('#TICKET-STATUS').addClass('active')

    $('#collabField').typeahead({
        name: 'collabField',
        remote: '/users/collaborator/autocomplete?key=%QUERY',
        limit: 5
    })
    $('.twitter-typeahead').css('display', '')
    $('.tt-query').css('background-color', '')

    $.ajax({
        type: "POST",
        url: "/users/ajax/get-pic",
        data: { id: id },
        async: false,
        success: function (data) {
            //show content
            var pic = JSON.parse(data);
            var html = '';
            for (var i = 0; i < pic.length; i++) {
                if (pic[i].user_id == selected) {
                    html += i + 1 + '. ' + '<option value=' + pic[i].user_id + ' selected>' + pic[i].fullname + '</option>';
                } else {
                    html += i + 1 + '. ' + '<option value=' + pic[i].user_id + '>' + pic[i].fullname + '</option>';
                }
            }
            $('#reassign').append(html);
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })

    let category_microsite = $('#t_mic').val()

    $.ajax({
        type: "POST",
        url: "/users/get_sub_division_users",
        data: { id: id_div_sub, microsite: category_microsite },
        success: function (data) {
            //show content
            var pic = JSON.parse(data);
            var html = `<optgroup label="All Member" id="user_subdiv">`;
            for (var i = 0; i < pic.length; i++) {
                if (pic[i].id == selected) {
                    html += `<option value='${pic[i].id}' selected>${pic[i].fullname}</option>`;
                } else {
                    html += `<option value='${pic[i].id}' >${pic[i].fullname}</option>`;
                }
            }
            html += `</optgroup>`
            $('#reassign').append(html);
            if (pic.length == 0) {
                $('#user_subdiv').remove();
            }
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    });

    $('#category').on('change', function () {
        getPic();
        if (compareId == 2) {
            getSubDivUser()
        }
    });

    function getPic() {
        var id = $('#category').val();
        $.ajax({
            type: "POST",
            url: "/users/ajax/get-pic",
            data: { id: id },
            async: false,
            success: function (data) {
                //show content
                var pic = JSON.parse(data);
                var html = '';
                var div_id = ''
                for (var i = 0; i < pic.length; i++) {
                    html += i + 1 + '. ' + '<option value=' + pic[i].user_id + '>' + pic[i].fullname + '</option>';
                    div_id = pic[i].division_id
                }
                $('#reassign').html(html);
                compareId = div_id
            },
            error: function (jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        })
    }

    function getSubDivUser() {
        $.ajax({
            type: "POST",
            url: "/users/get_sub_division_users",
            data: { id: id_div_sub },
            success: function (data) {
                //show content
                var pic = JSON.parse(data);
                var html = `<optgroup label="Sub Division Team" id="user_subdiv">`;
                for (var i = 0; i < pic.length; i++) {
                    html += `<option value='${pic[i].id}' >${pic[i].fullname}</option>`;
                }
                html += `</optgroup>`
                $('#reassign').append(html);
            },
            error: function (jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        });
    }

    //onfocusout
    $('#collabField').on('focusout', function () {
        let data = $(this).val()
        $.ajax({
            type: "POST",
            url: "/users/ajax/get-detail-by-name",
            data: { fullname: data },
            async: false,
            success: function (data) {
                //show content
                var detail = JSON.parse(data);
                var id = '';
                var name = '';
                var email = '';
                for (var i = 0; i < detail.length; i++) {
                    id = detail[i].id
                    name = detail[i].fullname
                    email = detail[i].email
                }
                $('#modalColId').val(id);
                $('#modalColName').val(name);
                $('#modalColEmail').val(email);
            },
            error: function (jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        })
    })

    //add collab
    $('#btn_addcollab').on('click', function () {
        let id = $('#modalColId').val()
        let name = $('#modalColName').val()
        let email = $('#modalColEmail').val()

        if (id == '' || name == '' || email == '') {
            alert('Please fill the name correctly!')
        } else {
            let html = `<span class='list-collab'>
                        <p>
                            ${name} <<i>${email}</i>> 
                            <small style='cursor: hand; color: blue;' class='remove-collab'>(remove)</small>
                        </p>
                        <input type="hidden" name="collabId[]" value="${id}">
                        <input type="hidden" name="collabName[]" value="${name}">
                        <input type="hidden" name="collabEmail[]" value="${email}">
                    </span>`
            $(html).insertBefore('#containerAddCollab')
            //clearance
            $('#modalColId').val('')
            $('#modalColName').val('')
            $('#modalColEmail').val('')
            $('#collabField').val('')
            $('#addCollab').modal('hide')
        }
    })
    //remove collab
    $(document).on('click', '.remove-collab', function () {
        $(this).parent().parent().remove()
    })

    //remove collaborator from db
    $('.remove-collab-exists').on('click', function () {
        let ticketId = $(this).find('small').text()
        let userId = $(this).find('span').text()
        if (confirm(`are you sure want delete this collaborator?`)) {
            $.ajax({
                type: "POST",
                url: "/users/collaborator/remove-collaborator",
                data: { ticket_id: ticketId, user_id: userId },
                async: false,
                success: function (data) {
                    //show content
                    alert('successed deleting')
                    location.reload()
                },
                error: function (jqXHR, textStatus, err) {
                    //show error message
                    alert('error');
                }
            })
        }
    })

    //subprocess button
    let $btnMetis = ($('#btn_metis')) ? $('#btn_metis') : ''
    let $btnReject = ($('#btn_reject')) ? $('#btn_reject') : ''
    let $btnNext = ($('#btn_next')) ? $('#btn_next') : ''
    let $btnCancel = ($('#btn_cancel')) ? $('#btn_cancel') : ''

    //reservation optional
    // let $btnSurcharge = ($('#btn_surcharge')) ? $('#btn_surcharge') : ''
    // let $btnErrorMappingPay = ($('#btn_mapping_error_pay')) ? $('#btn_mapping_error_pay') : ''
    // let $btnErrorMappingVoid = ($('#btn_mapping_error_void')) ? $('#btn_mapping_error_void') : ''
    // let $btnErrorSystem = ($('#btn_system_error')) ? $('#btn_system_error') : ''
    // let $btnErrorSupplier = ($('#btn_supplier_error')) ? $('#btn_supplier_error') : ''
    // let $btnRateDifference = ($('#btn_rate_difference')) ? $('#btn_rate_difference') : ''

    // let $btnNotFoundInSystem = ($('#btn_not_found_in_system')) ? $('#btn_not_found_in_system') : ''
    // let $btnEntertainmentExpense = ($('#btn_entertainment_expense')) ? $('#btn_entertainment_expense') : ''
    // let $btnBusinessTrip = ($('#btn_business_trip')) ? $('#btn_business_trip') : ''
    // let $btnHotelier = ($('#btn_hotelier')) ? $('#btn_hotelier') : ''

    // let $btnCreateCnDn = ($('#btn_create_cn_dn')) ? $('#btn_create_cn_dn') : ''
    // let $btnChaseToAgent = ($('#btn_chase_to_agent')) ? $('#btn_chase_to_agent') : ''
    // let $btnNo = ($('#btn_no')) ? $('#btn_no') : ''
    // let $btnBill = ($('#btn_bill')) ? $('#btn_bill') : ''
    // let $btnDeductInvoice = ($('#btn_deduct_invoice')) ? $('#btn_deduct_invoice') : ''
    // let $btnNotConfirm = ($('#btn_not_confirm')) ? $('#btn_not_confirm') : ''


    //loading optional
    // let $btn_processing_error_system = ($('#btn_processing_error_system')) ? $('#btn_processing_error_system') : ''
    // let $btn_check_with_cm = ($('#btn_check_with_cm')) ? $('#btn_check_with_cm') : ''
    // let $btn_my_team_mistake = ($('#btn_my_team_mistake')) ? $('#btn_my_team_mistake') : ''
    // let $btn_bill_to_agent = ($('#btn_bill_to_agent')) ? $('#btn_bill_to_agent') : ''
    // // ------> wrong rate
    // let $btn_wrong_input = ($('#btn_wrong_input')) ? $('#btn_wrong_input') : ''
    // let $btn_wrong_cm_template = ($('#btn_wrong_cm_template')) ? $('#btn_wrong_cm_template') : ''
    // let $btn_check_it_error = ($('#btn_check_it_error')) ? $('#btn_check_it_error') : ''


    //approval optional
    // let $btnScForm = ($('#btn_sc_form')) ? $('#btn_sc_form') : ''
    // let $btnChargeToAgent = ($('#btn_charge_to_agent')) ? $('#btn_charge_to_agent') : ''
    // let $btnNotPay = ($('#btn_not_pay')) ? $('#btn_not_pay') : ''


    $btnMetis.on('click', function () {
        let ticketId = $('#ticket_id').val()
        let next_step = $('#next_metis').val()
        let status = $('#status_metis').val()
        let type = $('#type_metis').val()
        let current_step = $('#current_step').val()

        if (confirm(`reassign ticket to metis?`)) {
            $.ajax({
                type: "POST",
                url: "/ticket/subprocess/optional-need-metis",
                data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
                async: false,
                success: function (data) {
                    //show content
                    console.log(data)
                    $('#fromWhere').val('0')
                    $('#detailForm').submit()
                },
                error: function (jqXHR, textStatus, err) {
                    //show error message
                    console.log(jqXHR)
                    console.log(textStatus)
                    alert(err);
                }
            })
        }
    })

    $btnReject.on('click', function () {
        let ticketId = $('#ticket_id').val()
        let next_step = $('#next_reject').val()
        let status = $('#status_reject').val()
        let type = $('#type_reject').val()
        let current_step = $('#current_step').val()

        if (confirm(`are you sure want reject this ticket?`)) {
            $.ajax({
                type: "POST",
                url: "/ticket/subprocess/optional-reject",
                data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
                async: false,
                success: function (data) {
                    //show content
                    console.log(data)
                    $('#fromWhere').val('0')
                    $('#detailForm').submit()
                },
                error: function (jqXHR, textStatus, err) {
                    //show error message
                    console.log(jqXHR)
                    console.log(textStatus)
                    alert(err);
                }
            })
        }
    })

    $btnNext.on('click', function () {
        let next_step = $('#next').val()
        let ticketId = $('#ticket_id').val()
        let status = $('#status').val()
        let current_step = $('#current_step').val()
        if (confirm('are you sure want to the next step?')) {
            $.ajax({
                type: "POST",
                url: "/ticket/subprocess/next",
                data: { ticket_id: ticketId, next_step: next_step, status, current_step: current_step },
                async: false,
                success: function (data) {
                    //show content
                    console.log('success: ', data)
                    location.reload()
                    $('#fromWhere').val('0')
                    $('#detailForm').submit()
                },
                error: function (jqXHR, textStatus, err) {
                    //show error message
                    alert('error');
                }
            })
        }
    })

    $btnCancel.on('click', function () {
        let ticketId = $('#ticket_id').val()
        let next_step = $('#next_cancel').val()
        let status = $('#status_cancel').val()
        let type = $('#type_cancel').val()
        let current_step = $('#current_step').val()

        if (confirm(`are you sure want cancel this ticket?`)) {
            $.ajax({
                type: "POST",
                url: "/ticket/subprocess/optional-cancel",
                data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
                async: false,
                success: function (data) {
                    //show contentbtnSurcharge
                    console.log(data)
                    $('#fromWhere').val('0')
                    $('#detailForm').submit()
                },
                error: function (jqXHR, textStatus, err) {
                    //show error message
                    console.log(jqXHR)
                    console.log(textStatus)
                    alert(err);
                }
            })
        }
    })

    //reservation button
    // $btnSurcharge.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_surcharge').val()
    //     let status = $('#status_surcharge').val()
    //     let type = $('#type_surcharge').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`surcharge?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btnErrorMappingPay.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_mapping_error_pay').val()
    //     let status = $('#status_mapping_error_pay').val()
    //     let type = $('#type_mapping_error_pay').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`error mapping pay?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btnErrorMappingVoid.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_mapping_error_void').val()
    //     let status = $('#status_mapping_error_void').val()
    //     let type = $('#type_mapping_error_void').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`error mapping void?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btnErrorSystem.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_system_error').val()
    //     let status = $('#status_system_error').val()
    //     let type = $('#type_system_error').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`error system?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btnErrorSupplier.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_supplier_error').val()
    //     let status = $('#status_supplier_error').val()
    //     let type = $('#type_supplier_error').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`error supplier?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btnRateDifference.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_rate_difference').val()
    //     let status = $('#status_rate_difference').val()
    //     let type = $('#type_rate_difference').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`rate difference?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btnNotFoundInSystem.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_not_found_in_system').val()
    //     let status = $('#status_not_found_in_system').val()
    //     let type = $('#type_not_found_in_system').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`not found in system?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btnEntertainmentExpense.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_entertainment_expense').val()
    //     let status = $('#status_entertainment_expense').val()
    //     let type = $('#type_entertainment_expense').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`entertainment expense?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btnBusinessTrip.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_business_trip').val()
    //     let status = $('#status_business_trip').val()
    //     let type = $('#type_business_trip').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`business trip?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btnHotelier.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_hotelier').val()
    //     let status = $('#status_hotelier').val()
    //     let type = $('#type_hotelier').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`hotelier?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btnCreateCnDn.on('click', function () {
    //     let next_step = $('#next_create_cn_dn').val()
    //     let ticketId = $('#ticket_id').val()
    //     let status = $('#status_create_cn_dn').val()
    //     let current_step = $('#current_step').val()
    //     if (confirm('create CN DN?')) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/next",
    //             data: { ticket_id: ticketId, next_step: next_step, status, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log('success: ', data)
    //                 location.reload()
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 alert('error');
    //             }
    //         })
    //     }
    // })
    // $btnChaseToAgent.on('click', function () {
    //     let next_step = $('#next_chase_to_agent').val()
    //     let ticketId = $('#ticket_id').val()
    //     let status = $('#status_chase_to_agent').val()
    //     let current_step = $('#current_step').val()
    //     if (confirm('chase to agent?')) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/next",
    //             data: { ticket_id: ticketId, next_step: next_step, status, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log('success: ', data)
    //                 location.reload()
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 alert('error');
    //             }
    //         })
    //     }
    // })
    // $btnNo.on('click', function () {
    //     let next_step = $('#next_no').val()
    //     let ticketId = $('#ticket_id').val()
    //     let status = $('#status_no').val()
    //     let current_step = $('#current_step').val()
    //     if (confirm('no?')) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/next",
    //             data: { ticket_id: ticketId, next_step: next_step, status, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log('success: ', data)
    //                 location.reload()
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 alert('error');
    //             }
    //         })
    //     }
    // })
    // $btnBill.on('click', function () {
    //     let next_step = $('#next_bill').val()
    //     let ticketId = $('#ticket_id').val()
    //     let status = $('#status_bill').val()
    //     let current_step = $('#current_step').val()
    //     if (confirm('bill?')) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/next",
    //             data: { ticket_id: ticketId, next_step: next_step, status, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log('success: ', data)
    //                 location.reload()
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 alert('error');
    //             }
    //         })
    //     }
    // })
    // $btnDeductInvoice.on('click', function () {
    //     let next_step = $('#next_deduct_invoice').val()
    //     let ticketId = $('#ticket_id').val()
    //     let status = $('#status_deduct_invoice').val()
    //     let current_step = $('#current_step').val()
    //     if (confirm('deducted invoice?')) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/next",
    //             data: { ticket_id: ticketId, next_step: next_step, status, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log('success: ', data)
    //                 location.reload()
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 alert('error');
    //             }
    //         })
    //     }
    // })
    // $btnNotConfirm.on('click', function () {
    //     let next_step = $('#next_not_confirm').val()
    //     let ticketId = $('#ticket_id').val()
    //     let status = $('#status_not_confirm').val()
    //     let current_step = $('#current_step').val()
    //     if (confirm('not confirm?')) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/next",
    //             data: { ticket_id: ticketId, next_step: next_step, status, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log('success: ', data)
    //                 location.reload()
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 alert('error');
    //             }
    //         })
    //     }
    // })
    //**** end */


    // loading team button
    // $btn_processing_error_system.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_processing_error_system').val()
    //     let status = $('#status_processing_error_system').val()
    //     let type = $('#type_processing_error_system').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`processing error system?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btn_check_with_cm.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_check_with_cm').val()
    //     let status = $('#status_check_with_cm').val()
    //     let type = $('#type_check_with_cm').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`check with cm?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btn_my_team_mistake.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_my_team_mistake').val()
    //     let status = $('#status_my_team_mistake').val()
    //     let type = $('#type_my_team_mistake').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`loading team mistake?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btn_bill_to_agent.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_bill_to_agent').val()
    //     let status = $('#status_bill_to_agent').val()
    //     let type = $('#type_bill_to_agent').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`bill to agent?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })

    // $btn_wrong_input.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_wrong_input').val()
    //     let status = $('#status_wrong_input').val()
    //     let type = $('#type_wrong_input').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`wrong input?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btn_wrong_cm_template.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_wrong_cm_template').val()
    //     let status = $('#status_wrong_cm_template').val()
    //     let type = $('#type_wrong_cm_template').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`wrong cm template?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    // $btn_check_it_error.on('click', function () {
    //     let ticketId = $('#ticket_id').val()
    //     let next_step = $('#next_check_it_error').val()
    //     let status = $('#status_check_it_error').val()
    //     let type = $('#type_check_it_error').val()
    //     let current_step = $('#current_step').val()

    //     if (confirm(`check it error?`)) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/optional-update-and-next",
    //             data: { ticket_id: ticketId, next_step: next_step, status: status, type: type, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log(data)
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 console.log(jqXHR)
    //                 console.log(textStatus)
    //                 alert(err);
    //             }
    //         })
    //     }
    // })
    //***** end */


    //APROVAL OPTIONAL
    // $btnScForm.on('click', function () {
    //     let next_step = $('#next_sc_form').val()
    //     let ticketId = $('#ticket_id').val()
    //     let status = $('#status_sc_form').val()
    //     let current_step = $('#current_step').val()
    //     if (confirm('submit short collect form?')) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/next",
    //             data: { ticket_id: ticketId, next_step: next_step, status, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log('success: ', data)
    //                 location.reload()
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 alert('error');
    //             }
    //         })
    //     }
    // })
    // $btnChargeToAgent.on('click', function () {
    //     let next_step = $('#next_charge_to_agent').val()
    //     let ticketId = $('#ticket_id').val()
    //     let status = $('#status_charge_to_agent').val()
    //     let current_step = $('#current_step').val()
    //     if (confirm('charge to agent')) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/next",
    //             data: { ticket_id: ticketId, next_step: next_step, status, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log('success: ', data)
    //                 location.reload()
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 alert('error');
    //             }
    //         })
    //     }
    // })
    // $btnNotPay.on('click', function () {
    //     let next_step = $('#next_not_pay').val()
    //     let ticketId = $('#ticket_id').val()
    //     let status = $('#status_not_pay').val()
    //     let current_step = $('#current_step').val()
    //     if (confirm('will not pay to hotel?')) {
    //         $.ajax({
    //             type: "POST",
    //             url: "/ticket/subprocess/next",
    //             data: { ticket_id: ticketId, next_step: next_step, status, current_step: current_step },
    //             async: false,
    //             success: function (data) {
    //                 //show content
    //                 console.log('success: ', data)
    //                 location.reload()
    //                 $('#fromWhere').val('0')
    //                 $('#detailForm').submit()
    //             },
    //             error: function (jqXHR, textStatus, err) {
    //                 //show error message
    //                 alert('error');
    //             }
    //         })
    //     }
    // })
    /*** END */

    $('#more_files').on('click', function () {

        let l = $('input[type=file][style]').length
        let arr_idx = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

        $("#attachment_reply" + arr_idx[l - 1])
            .removeAttr('style')
    });


    $('#reassign').select2()
    $('span .select2-dropdown').css({ 'position': 'unset', 'color': 'red' })

    $(".btn-optional").on('click', function () {
        let ticketId = $('#ticket_id').val()
        let current_step = $('#current_step').val()
        let option = JSON.parse($(this).attr('data-option'))

        if (confirm(`are you sure?`)) {
            $.ajax({
                type: "POST",
                url: "/ticket/subprocess/optional-update-and-next",
                data: { ticket_id: ticketId, next_step: option.next, status: option.status, type: option.type, current_step: current_step },
                async: false,
                success: function (data) {
                    //show content
                    console.log(data)
                    $('#fromWhere').val('0')
                    $('#detailForm').submit()
                },
                error: function (jqXHR, textStatus, err) {
                    //show error message
                    console.log(jqXHR)
                    console.log(textStatus)
                    alert(err);
                }
            })
        }
    })
})

