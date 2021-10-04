$('#TICKET-STATUS').addClass('active')

//library multiselect
$('#status_mct').multiselect({
    texts: {
        placeholder: 'Select Status',
    }
});
$('#status_mat').multiselect({
    texts: {
        placeholder: 'Select Status',
    }
});
$('#status_n').multiselect({
    texts: {
        placeholder: 'Select Status',
    }
});
$('#status_ip').multiselect({
    texts: {
        placeholder: 'Select Status',
    }
});
$('#status_ov').multiselect({
    texts: {
        placeholder: 'Select Status',
    }
});

$('#topic_mct').multiselect({
    texts: {
        placeholder: 'Topic',
    }
});
$('#topic_mat').multiselect({
    texts: {
        placeholder: 'Topic',
    }
});
$('#topic_n').multiselect({
    texts: {
        placeholder: 'Topic',
    }
});
$('#topic_ip').multiselect({
    texts: {
        placeholder: 'Topic',
    }
});
$('#topic_ov').multiselect({
    texts: {
        placeholder: 'Topic',
    }
});

//manipulate style library
$('div.ms-options-wrap').children('button').css({ 'padding-left': '14px', 'color': '#5e5e5e' })
$('.for-topic').next().children('div.ms-options').css({ 'width': '300px', 'max-height': '300px' })
$('input[type=text]').addClass('placeholder-color')

//library autocomplete hotel
$('#hotel_mct').typeahead({
    name: 'hotel_mct',
    remote: '/hotel/ajax/autocomplete?key=%QUERY',
    limit: Infinity,
    minLength: 3
})
$('#hotel_mat').typeahead({
    name: 'hotel_mat',
    remote: '/hotel/ajax/autocomplete?key=%QUERY',
    limit: Infinity,
    minLength: 3
})
$('#hotel_n').typeahead({
    name: 'hotel_n',
    remote: '/hotel/ajax/autocomplete?key=%QUERY',
    limit: Infinity,
    minLength: 3
})
$('#hotel_ip').typeahead({
    name: 'hotel_ip',
    remote: '/hotel/ajax/autocomplete?key=%QUERY',
    limit: Infinity,
    minLength: 3
})
$('#hotel_ov').typeahead({
    name: 'hotel_ov',
    remote: '/hotel/ajax/autocomplete?key=%QUERY',
    limit: Infinity,
    minLength: 3
})
$('#hotel_cls').typeahead({
    name: 'hotel_cls',
    remote: '/hotel/ajax/autocomplete?key=%QUERY',
    limit: Infinity,
    minLength: 3
})

//autocomplete created_by
$('#created_by_mct').typeahead({
    name: 'created_by_mct',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})
$('#created_by_mat').typeahead({
    name: 'created_by_mat',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})
$('#created_by_n').typeahead({
    name: 'created_by_n',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})
$('#created_by_ip').typeahead({
    name: 'created_by_ip',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})
$('#created_by_ov').typeahead({
    name: 'created_by_ov',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})
$('#created_by_cls').typeahead({
    name: 'created_by_cls',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})

//autocomplete pic
$('#pic_mct_show').typeahead({
    name: 'pic_mct_show',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})
$('#pic_mat_show').typeahead({
    name: 'pic_mat_show',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})
$('#pic_n_show').typeahead({
    name: 'pic_n_show',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})
$('#pic_ip_show').typeahead({
    name: 'pic_ip_show',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})
$('#pic_ov_show').typeahead({
    name: 'pic_ov_show',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})
$('#pic_cls_show').typeahead({
    name: 'pic_cls_show',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})

//to get email from pic filter
$('#pic_mct_show').on('focusout', function() {
    let data = $(this).val()
    $.ajax({
        type: "POST",
        url: "/users/ajax/get-detail-by-name",
        data: { fullname: data },
        async: false,
        success: function(data) {
            //show content
            var detail = JSON.parse(data);
            var email = '';
            for (var i = 0; i < detail.length; i++) {
                email = detail[i].email
            }
            $('#pic_mct').val(email);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#pic_mat_show').on('focusout', function() {
    let data = $(this).val()
    $.ajax({
        type: "POST",
        url: "/users/ajax/get-detail-by-name",
        data: { fullname: data },
        async: false,
        success: function(data) {
            //show content
            var detail = JSON.parse(data);
            var email = '';
            for (var i = 0; i < detail.length; i++) {
                email = detail[i].email
            }
            $('#pic_mat').val(email);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#pic_n_show').on('focusout', function() {
    let data = $(this).val()
    $.ajax({
        type: "POST",
        url: "/users/ajax/get-detail-by-name",
        data: { fullname: data },
        async: false,
        success: function(data) {
            //show content
            var detail = JSON.parse(data);
            var email = '';
            for (var i = 0; i < detail.length; i++) {
                email = detail[i].email
            }
            $('#pic_n').val(email);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#pic_ip_show').on('focusout', function() {
    let data = $(this).val()
    $.ajax({
        type: "POST",
        url: "/users/ajax/get-detail-by-name",
        data: { fullname: data },
        async: false,
        success: function(data) {
            //show content
            var detail = JSON.parse(data);
            var email = '';
            for (var i = 0; i < detail.length; i++) {
                email = detail[i].email
            }
            $('#pic_ip').val(email);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#pic_ov_show').on('focusout', function() {
    let data = $(this).val()
    $.ajax({
        type: "POST",
        url: "/users/ajax/get-detail-by-name",
        data: { fullname: data },
        async: false,
        success: function(data) {
            //show content
            var detail = JSON.parse(data);
            var email = '';
            for (var i = 0; i < detail.length; i++) {
                email = detail[i].email
            }
            $('#pic_ov').val(email);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#pic_cls_show').on('focusout', function() {
    let data = $(this).val()
    $.ajax({
        type: "POST",
        url: "/users/ajax/get-detail-by-name",
        data: { fullname: data },
        async: false,
        success: function(data) {
            //show content
            var detail = JSON.parse(data);
            var email = '';
            for (var i = 0; i < detail.length; i++) {
                email = detail[i].email
            }
            $('#pic_cls').val(email);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})

//custom typeahed field
$('.twitter-typeahead').css('display', '')
$('.tt-query').css('background-color', '')
$('.tt-hint').css('top', '')
$('.tt-dropdown-menu').css('top', '')


$('[href="#mycreatedticket"]').on('click', function() {
    $('h2').text("My Created Ticket");
})
$('[href="#myassignedticket"]').on('click', function() {
    $('h2').text("My Assigned Ticket");
})
$('[href="#new"]').on('click', function() {
    $('h2').text("Ticket Status 'New'");
})
$('[href="#inprogress"]').on('click', function() {
    $('h2').text("Ticket Status 'Inprogress'");
})
$('[href="#overdue"]').on('click', function() {
    $('h2').text("Ticket Status 'Overdue'");
})
$('[href="#closed"]').on('click', function() {
    $('h2').text("Ticket Status 'Closed'");
})

$('#myTab a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
});

// store the currently selected tab in the hash value
$("ul.nav-tabs > li > a").on("shown.bs.tab", function(e) {
    var id = $(e.target).attr("href").substr(1);
    window.location.hash = id;
});

// on load of the page: switch to the currently selected tab
var hash = window.location.hash;
$('#myTab a[href="' + hash + '"]').tab('show');

//subdivision
$('#division_mct').on('change', function() {
    let division = $(this).val()
    $.ajax({
        type: "POST",
        url: "/division/ajax/get-subdiv-by-divid",
        data: { id: division },
        async: false,
        success: function(data) {
            //show content
            var subdiv = JSON.parse(data);
            var html = '<option value="">PIC (SUBDIV)</option>';
            for (var i = 0; i < subdiv.length; i++) {
                html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
            }
            $('#subdivision_mct').html(html);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#cb_division_mct').on('change', function() {
    let division = $(this).val()
    $.ajax({
        type: "POST",
        url: "/division/ajax/get-subdiv-by-divid",
        data: { id: division },
        async: false,
        success: function(data) {
            //show content
            var subdiv = JSON.parse(data);
            var html = '<option value="">Created By (SUBDIV)</option>';
            for (var i = 0; i < subdiv.length; i++) {
                html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
            }
            $('#cb_subdivision_mct').html(html);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#division_mat').on('change', function() {
    let division = $(this).val()
    $.ajax({
        type: "POST",
        url: "/division/ajax/get-subdiv-by-divid",
        data: { id: division },
        async: false,
        success: function(data) {
            //show content
            var subdiv = JSON.parse(data);
            var html = '<option value="">PIC (SUBDIV)</option>';
            for (var i = 0; i < subdiv.length; i++) {
                html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
            }
            $('#subdivision_mat').html(html);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#cb_division_mat').on('change', function() {
    let division = $(this).val()
    $.ajax({
        type: "POST",
        url: "/division/ajax/get-subdiv-by-divid",
        data: { id: division },
        async: false,
        success: function(data) {
            //show content
            var subdiv = JSON.parse(data);
            var html = '<option value="">Created By (SUBDIV)</option>';
            for (var i = 0; i < subdiv.length; i++) {
                html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
            }
            $('#cb_subdivision_mat').html(html);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#division_n').on('change', function() {
    let division = $(this).val()
    $.ajax({
        type: "POST",
        url: "/division/ajax/get-subdiv-by-divid",
        data: { id: division },
        async: false,
        success: function(data) {
            //show content
            var subdiv = JSON.parse(data);
            var html = '<option value="">PIC (SUBDIV)</option>';
            for (var i = 0; i < subdiv.length; i++) {
                html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
            }
            $('#subdivision_n').html(html);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#cb_division_n').on('change', function() {
    let division = $(this).val()
    $.ajax({
        type: "POST",
        url: "/division/ajax/get-subdiv-by-divid",
        data: { id: division },
        async: false,
        success: function(data) {
            //show content
            var subdiv = JSON.parse(data);
            var html = '<option value="">Created By (SUBDIV)</option>';
            for (var i = 0; i < subdiv.length; i++) {
                html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
            }
            $('#cb_subdivision_n').html(html);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#division_ip').on('change', function() {
    let division = $(this).val()
    $.ajax({
        type: "POST",
        url: "/division/ajax/get-subdiv-by-divid",
        data: { id: division },
        async: false,
        success: function(data) {
            //show content
            var subdiv = JSON.parse(data);
            var html = '<option value="">PIC (SUBDIV)</option>';
            for (var i = 0; i < subdiv.length; i++) {
                html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
            }
            $('#subdivision_ip').html(html);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#cb_division_ip').on('change', function() {
    let division = $(this).val()
    $.ajax({
        type: "POST",
        url: "/division/ajax/get-subdiv-by-divid",
        data: { id: division },
        async: false,
        success: function(data) {
            //show content
            var subdiv = JSON.parse(data);
            var html = '<option value="">Created By (SUBDIV)</option>';
            for (var i = 0; i < subdiv.length; i++) {
                html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
            }
            $('#cb_subdivision_ip').html(html);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#division_ov').on('change', function() {
    let division = $(this).val()
    $.ajax({
        type: "POST",
        url: "/division/ajax/get-subdiv-by-divid",
        data: { id: division },
        async: false,
        success: function(data) {
            //show content
            var subdiv = JSON.parse(data);
            var html = '<option value="">PIC (SUBDIV)</option>';
            for (var i = 0; i < subdiv.length; i++) {
                html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
            }
            $('#subdivision_ov').html(html);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#cb_division_ov').on('change', function() {
    let division = $(this).val()
    $.ajax({
        type: "POST",
        url: "/division/ajax/get-subdiv-by-divid",
        data: { id: division },
        async: false,
        success: function(data) {
            //show content
            var subdiv = JSON.parse(data);
            var html = '<option value="">Created By (SUBDIV)</option>';
            for (var i = 0; i < subdiv.length; i++) {
                html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
            }
            $('#cb_subdivision_ov').html(html);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#division_cls').on('change', function() {
    let division = $(this).val()
    $.ajax({
        type: "POST",
        url: "/division/ajax/get-subdiv-by-divid",
        data: { id: division },
        async: false,
        success: function(data) {
            //show content
            var subdiv = JSON.parse(data);
            var html = '<option value="">PIC (SUBDIV)</option>';
            for (var i = 0; i < subdiv.length; i++) {
                html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
            }
            $('#subdivision_cls').html(html);
        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    })
})
$('#cb_division_cls').on('change', function() {
        let division = $(this).val()
        $.ajax({
            type: "POST",
            url: "/division/ajax/get-subdiv-by-divid",
            data: { id: division },
            async: false,
            success: function(data) {
                //show content
                var subdiv = JSON.parse(data);
                var html = '<option value="">Sub Division</option>';
                for (var i = 0; i < subdiv.length; i++) {
                    html += `<option value="${subdiv[i].id}">${subdiv[i].name}</option>`
                }
                $('#cb_subdivision_cls').html(html);
            },
            error: function(jqXHR, textStatus, err) {
                //show error message
                alert('error');
            }
        })
    })
    //filter myassignedticker table
$('#btnFilter_mct').on('click', function() {
            let hotel = $('#hotel_mct').val()
            let city = $('#city_mct').val()
            let priority = $('#priority_mct').val()
            let division = $('#division_mct').val()
            let create_from = $('#create_from_mct').val()
            let create_to = $('#create_to_mct').val()
            let created_by = $('#created_by_mct').val()
            let pic = $('#pic_mct').val()
            let status = $('#status_mct').val()
            let topic = $('#topic_mct').val()
            let validity = $('#validity_mct').val()
            let operator = $('#operator_mct').val()
            let booking = $('#booking_mct').val()
            let operator1 = $('#operator1_mct').val()
            let subdivision = $('#subdivision_mct').val()
            let country = $('#country_mct').val()
            let shownotif = ($('#shownotif_mct:checkbox:checked').length > 0) ? $('#shownotif_mct').val() : ''
            let market = $('#market_mct').val()
            let chain = $('#chain_mct').val()
            let brand = $('#brand_mct').val()
            let cb_division = $('#cb_division_mct').val()
            let cb_subdiv = $('#cb_subdivision_mct').val()
            let jarvis_id = $('#jarvis_id_mct').val()

            $.ajax({
                        type: "POST",
                        url: "/ticket/ticket-status/filter-myticket",
                        data: { hotel, city, priority, division, create_from, create_to, created_by, pic, status: status.length > 0 ? JSON.stringify(status) : '', topic: topic.length > 0 ? JSON.stringify(topic) : '', validity, operator, booking, operator1, subdivision, country, shownotif, market, chain, brand, cb_division, cb_subdiv, jarvis_id },
                        beforeSend: function() {
                            let html = `<tr>
                            <td colspan='14' align='center'>
                                <img src='/assets/images/loading.gif' width='30' />
                            </td>
                        </tr>`
                            $('#tbody_mct').html(html);
                        },
                        success: function(data) {
                                //* show content
                                var filter = JSON.parse(data.ticket);
                                let pic = JSON.parse(data.pic_subprocess)
                                var html = '';
                                let no = 1
                                for (var i = 0; i < filter.length; i++) {
                                    let current_date = moment().format('YYYY-MM-DD')
                                    let compare_date = moment(current_date).add(7, 'days').format('YYYY-MM-DD'); //moment(filter[i].utc_create, 'YYYY-MM-DD HH:mm:ss').add(time, 'days'); 
                                    //let due_date = due.format('YYYY-MM-DD HH:mm:ss')
                                    let pic_dyn = ''
                                    let step = ''
                                    // for (let j = 0; j < pic.length; j++) {
                                    //     if (filter[i].id == pic[j].ticket_id) {
                                    //         if (filter[i].status == 'CANCELLED') {
                                    //             if (pic[j].step == 0) {
                                    //                 pic_dyn += '- ' + pic[j].fullname + '<br>'
                                    //                 step += pic[j].process + ', '
                                    //             }
                                    //         } else {
                                    //             if (pic[j].step == 0) {
                                    //                 pic_dyn += '- ' + pic[j].fullname + '<br>'
                                    //                 step += pic[j].process + ', '
                                    //             } else {
                                    //                 if (pic[j].status == null) {
                                    //                     pic_dyn += '- ' + pic[j].fullname + '<br>'
                                    //                     step += pic[j].process + ', '
                                    //                 }
                                    //             }
                                    //         }
                                    //     }
                                    // }
                                    for (let j = 0; j < pic.length; j++) {
                                        if (filter[i].id == pic[j].ticket_id) {
                                            if (pic[j].status == null) {
                                                pic_dyn += '- ' + pic[j].fullname + '<br>'
                                                step += pic[j].step + ', '
                                            }
                                        }
                                    }
                                    //<td>${ no++ }</td>
                                    html += `<tr onclick="window.open('/ticket/detail-ticket/${filter[i].id}','_blank');">
                            
                            <td data-sort="${moment(filter[i].utc_create).format('YYYY-MM-DD HH:mm:ss')}">
                                ${moment(filter[i].utc_create).format('DD') + ' '} ${moment(filter[i].utc_create).format('MMM') + ' '} ${moment(filter[i].utc_create).format('YY')}
                                <span>${ moment(filter[i].utc_create).format('HH:mm')}</span>
                            </td>
                            <td>${ filter[i].fullname}</td>
                            ${ (filter[i].priorname == 'Top Up' || filter[i].validity_from < compare_date ? "<td align='center' style='color: red;'>" : "<td align='center'>")}
                                ${ filter[i].ticket_no} <br> 
                                ${ (filter[i].total_followup != 0 && filter[i].total_followup ? '<span class="text-notif">' + filter[i].total_followup + '</span>' : '')} 
                                ${ (filter[i].cc != 0 && filter[i].cc ? '<span class="text-notif-blue">CC</span>' : '')} 
                                ${ (filter[i].new_pic != 0 && filter[i].new_pic ? '<span class="text-notif-green">NEW</span>' : '')}
                                ${ (filter[i].unread_mention != 0 && filter[i].unread_mention ? '<span class="text-notif-orange">' + filter[i].unread_mention + '</span>' : '')}
                            </td>
                            <td>${ (filter[i].city != null ? filter[i].city : '')}</td>
                            <td>${filter[i].jarvis_code}</td>
                            <td>${ filter[i].hotel} </td>
                            <td>
                                ${ filter[i].department}
                                <span>- ${ filter[i].category_name}</span>
                            </td>
                            <td>${ filter[i].market}</td>
                            <td>
                                ${ (filter[i].validity_from) ? '<span style="display: none;">' + moment(filter[i].validity_from).format('MM') + '</span>' + moment(filter[i].validity_from).format('DD') + ' ' + moment(filter[i].validity_from).format('MMM') + ' ' + moment(filter[i].validity_from).format('YY') + '<span>- ' + moment(filter[i].validity_to).format('DD MMM YY') + '</span>' : '-'} 
                            </td>
                            <td>${ pic_dyn}</td>
                            <td>${ step}</td>
                            <td>
                                <div class="label-${ filter[i].label_name}" ${(filter[i].label_name == 'priority0') ? 'style="font-weight: bold; text-transform: uppercase;"' : ''}>${(filter[i].label_name == 'priority0') ? '<span style="font-size: 1px; color:red;">a</span>' : '<span style="font-size: 1px; color:red;">z</span>'} ${filter[i].priorname}</div>
                            </td>
                            <td>
                                <span style="display: none;">${moment(filter[i].due_date).format('MM')}</span> ${moment(filter[i].due_date).format('DD') + ' '} ${moment(filter[i].due_date).format('MMM') + ' '} ${moment(filter[i].due_date).format('YY')}
                                <span>${ moment(filter[i].due_date).format('HH:mm')}</span>
                            </td>
                            <td>${ filter[i].status}</td>
                            <td>${ filter[i].utc_close ? `<span style='display: none;'>${moment(filter[i].utc_close).format('MM')}</span> ${moment(filter[i].utc_close).format('DD') + ' '} ${moment(filter[i].utc_close).format('MMM') + ' '} ${moment(filter[i].utc_close).format('YY')}<span>${moment(filter[i].utc_close).format('HH:mm')}</span>` : '-'}</td>
                        </tr>`;
            }
            $('#table-1').DataTable().destroy();
            $('#tbody_mct').html(html);
            $('#kamar-lainnya4').removeClass('in');
            $('#table-1').DataTable({
                "pageLength": 50,
                "lengthMenu": [50, 100, 200],
                "aaSorting": [[0, "desc"]]
            })
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    });
})


//filter myassignedticker table
$('#btnFilter_mat').on('click', function () {
    let hotel = $('#hotel_mat').val()
    let city = $('#city_mat').val()
    let priority = $('#priority_mat').val()
    let division = $('#division_mat').val()
    let create_from = $('#create_from_mat').val()
    let create_to = $('#create_to_mat').val()
    let created_by = $('#created_by_mat').val()
    let pic = $('#pic_mat').val()
    let status = $('#status_mat').val()
    let topic = $('#topic_mat').val()
    let validity = $('#validity_mat').val()
    let operator = $('#operator_mat').val()
    let booking = $('#booking_mat').val()
    let operator1 = $('#operator1_mat').val()
    let subdivision = $('#subdivision_mat').val()
    let country = $('#country_mat').val()
    let shownotif = ($('#shownotif_mat:checkbox:checked').length > 0) ? $('#shownotif_mat').val() : ''
    let market = $('#market_mat').val()
    let chain = $('#chain_mat').val()
    let brand = $('#brand_mat').val()
    let cb_division = $('#cb_division_mat').val()
    let cb_subdiv = $('#cb_subdivision_mat').val()
    let jarvis_id = $('#jarvis_id_mat').val()

    $.ajax({
        type: "POST",
        url: "/ticket/ticket-status/filter-assigned",
        data: { hotel, city, priority, division, create_from, create_to, created_by, pic, status: status.length > 0 ? JSON.stringify(status) : '', topic: topic.length > 0 ? JSON.stringify(topic) : '', validity, operator, booking, operator1, subdivision, country, shownotif, market, chain, brand, cb_division, cb_subdiv, jarvis_id },
        beforeSend: function () {
            let html = `<tr>
                            <td colspan='14' align='center'>
                                <img src='/assets/images/loading.gif' width='30' />
                            </td>
                        </tr>`
            $('#tbody_mat').html(html);
        },
        success: function (data) {
            //* show content
            var filter = JSON.parse(data.ticket);
            let pic = JSON.parse(data.pic_subprocess)
            var html = '';
            let no = 1
            for (var i = 0; i < filter.length; i++) {
                let current_date = moment().format('YYYY-MM-DD')
                let compare_date = moment(current_date).add(7, 'days').format('YYYY-MM-DD');
                let pic_dyn = ''
                let step = ''
                for (let j = 0; j < pic.length; j++) {
                    if (filter[i].id == pic[j].ticket_id) {
                        if (pic[j].status == null) {
                            pic_dyn += '- ' + pic[j].fullname + '<br>'
                            step += pic[j].step + ', '
                        }
                    }
                }
                //<td>${ no++ }</td>
                html += `<tr onclick="window.open('/ticket/detail-ticket/${filter[i].id}','_blank');">
                            
                            <td data-sort="${moment(filter[i].utc_create).format('YYYY-MM-DD HH:mm:ss')}">
                                ${moment(filter[i].utc_create).format('DD') + ' '} ${moment(filter[i].utc_create).format('MMM') + ' '} ${moment(filter[i].utc_create).format('YY')}
                                <span>${ moment(filter[i].utc_create).format('HH:mm')}</span>
                            </td>
                            <td>${ filter[i].fullname}</td>
                            ${ (filter[i].priorname == 'Top Up' || filter[i].validity_from < compare_date ? "<td align='center' style='color: red;'>" : "<td align='center'>")}
                                ${ filter[i].ticket_no} <br> 
                                ${ (filter[i].total_followup != 0 && filter[i].total_followup ? '<span class="text-notif">' + filter[i].total_followup + '</span>' : '')} 
                                ${ (filter[i].cc != 0 && filter[i].cc ? '<span class="text-notif-blue">CC</span>' : '')} 
                                ${ (filter[i].new_pic != 0 && filter[i].new_pic ? '<span class="text-notif-green">NEW</span>' : '')}
                                ${ (filter[i].unread_mention != 0 && filter[i].unread_mention ? '<span class="text-notif-orange">' + filter[i].unread_mention + '</span>' : '')}
                            </td>
                            <td>${ (filter[i].city != null ? filter[i].city : '')}</td>
                            <td>${ filter[i].hotel} </td>
                            <td>
                                ${ filter[i].department}
                                <span>- ${ filter[i].category_name}</span>
                            </td>
                            <td>${ filter[i].market}</td>
                            <td>
                                ${ (filter[i].validity_from) ? '<span style="display: none;">' + moment(filter[i].validity_from).format('MM') + '</span>' + moment(filter[i].validity_from).format('DD') + ' ' + moment(filter[i].validity_from).format('MMM') + ' ' + moment(filter[i].validity_from).format('YY') + '<span>- ' + moment(filter[i].validity_to).format('DD MMM YY') + '</span>' : '-'} 
                            </td>
                            <td>${ pic_dyn}</td>
                            <td>${ step}</td>
                            <td>
                                <div class="label-${ filter[i].label_name}" ${(filter[i].label_name == 'priority0') ? 'style="font-weight: bold; text-transform: uppercase;"' : ''}>${(filter[i].label_name == 'priority0') ? '<span style="font-size: 1px; color:red;">a</span>' : '<span style="font-size: 1px; color:red;">z</span>'} ${filter[i].priorname}</div>
                            </td>
                            <td>
                                <span style="display: none;">${moment(filter[i].due_date).format('MM')}</span> ${moment(filter[i].due_date).format('DD') + ' '} ${moment(filter[i].due_date).format('MMM') + ' '} ${moment(filter[i].due_date).format('YY')}
                                <span>${ moment(filter[i].due_date).format('HH:mm')}</span>
                            </td>
                            <td>${ filter[i].status}</td>
                        </tr>`;
            }
            $("#table-6").DataTable().destroy()
            $('#tbody_mat').html(html);
            $('#kamar-lainnya3').removeClass('in');
            $('#table-6').DataTable({
                "pageLength": 50,
                "lengthMenu": [50, 100, 200],
                "aaSorting": [[0, "desc"]]
            })
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    });
})

//filter new table
$('#btnFilter_new').on('click', function () {
    let hotel = $('#hotel_n').val()
    let city = $('#city_n').val()
    let priority = $('#priority_n').val()
    let division = $('#division_n').val()
    let create_from = $('#create_from_n').val()
    let create_to = $('#create_to_n').val()
    let created_by = $('#created_by_n').val()
    let pic = $('#pic_n').val()
    let status = $('#status_n').val()
    let topic = $('#topic_n').val()
    let validity = $('#validity_n').val()
    let operator = $('#operator_n').val()
    let booking = $('#booking_n').val()
    let operator1 = $('#operator1_n').val()
    let subdivision = $('#subdivision_n').val()
    let country = $('#country_n').val()
    let shownotif = ($('#shownotif_n:checkbox:checked').length > 0) ? $('#shownotif_n').val() : ''
    let market = $('#market_n').val()
    let chain = $('#chain_n').val()
    let brand = $('#brand_n').val()
    let cb_division = $('#cb_division_n').val()
    let cb_subdiv = $('#cb_subdivision_n').val()
    let jarvis_id = $('#jarvis_id_n').val()

    $.ajax({
        type: "POST",
        url: "/ticket/ticket-status/filter-new",
        data: { hotel, city, priority, division, create_from, create_to, created_by, pic, status: status.length > 0 ? JSON.stringify(status) : '', topic: topic.length > 0 ? JSON.stringify(topic) : '', validity, operator, booking, operator1, subdivision, country, shownotif, market, chain, brand, cb_division, cb_subdiv, jarvis_id },
        beforeSend: function () {
            let html = `<tr>
                            <td colspan='14' align='center'>
                                <img src='/assets/images/loading.gif' width='30' />
                            </td>
                        </tr>`
            $('#tbody_new').html(html);
        },
        success: function (data) {
            //* show content
            var filter = JSON.parse(data.ticket);
            let pic = JSON.parse(data.pic_subprocess)
            var html = '';
            let no = 1
            for (var i = 0; i < filter.length; i++) {
                let time = filter[i].due_time
                let due_date = moment(filter[i].utc_create).add(time, 'hours').format('YYYY-MM-DD HH:mm:ss'); //moment(filter[i].utc_create, 'YYYY-MM-DD HH:mm:ss').add(time, 'days'); 
                //let due_date = due.format('YYYY-MM-DD HH:mm:ss')
                let current_date = moment().format('YYYY-MM-DD HH:mm:ss')
                let compare_date = moment(current_date).add(7, 'days').format('YYYY-MM-DD');
                if (current_date <= due_date) {
                    let pic_dyn = ''
                    let step = ''
                    for (let j = 0; j < pic.length; j++) {
                        if (filter[i].id == pic[j].ticket_id) {
                            if (pic[j].status == null) {
                                pic_dyn += '- ' + pic[j].fullname + '<br>'
                                step += pic[j].step + ', '
                            }
                        }
                    }
                    //<td>${ no++ }</td>
                    html += `<tr onclick="window.open('/ticket/detail-ticket/${filter[i].id}','_blank');">
                                
                                <td data-sort="${moment(filter[i].utc_create).format('YYYY-MM-DD HH:mm:ss')}">
                                    ${moment(filter[i].utc_create).format('DD') + ' '} ${moment(filter[i].utc_create).format('MMM') + ' '} ${moment(filter[i].utc_create).format('YY')}
                                    <span>${ moment(filter[i].utc_create).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].fullname}</td>
                                ${ (filter[i].priorname == 'Top Up' || filter[i].validity_from < compare_date ? "<td align='center' style='color: red;'>" : "<td align='center'>")}
                                    ${ filter[i].ticket_no} <br> 
                                    ${ (filter[i].total_followup != 0 && filter[i].total_followup ? '<span class="text-notif">' + filter[i].total_followup + '</span>' : '')} 
                                    ${ (filter[i].cc != 0 && filter[i].cc ? '<span class="text-notif-blue">CC</span>' : '')} 
                                    ${ (filter[i].new_pic != 0 && filter[i].new_pic ? '<span class="text-notif-green">NEW</span>' : '')}
                                    ${ (filter[i].unread_mention != 0 && filter[i].unread_mention ? '<span class="text-notif-orange">' + filter[i].unread_mention + '</span>' : '')}
                                </td>
                                <td>${ (filter[i].city != null ? filter[i].city : '')}</td>
                                <td>${filter[i].jarvis_code} </td>
                                <td>${ filter[i].hotel} </td>
                                <td>
                                    ${ filter[i].department}
                                    <span>- ${ filter[i].category_name}</span>
                                </td>
                                <td>${ filter[i].market}</td>
                                <td>
                                    ${ (filter[i].validity_from) ? '<span style="display: none;">' + moment(filter[i].validity_from).format('MM') + '</span>' + moment(filter[i].validity_from).format('DD') + ' ' + moment(filter[i].validity_from).format('MMM') + ' ' + moment(filter[i].validity_from).format('YY') + '<span>- ' + moment(filter[i].validity_to).format('DD MMM YY') + '</span>' : '-'} 
                                </td>
                                <td>${ pic_dyn}</td>
                                <td>${ step}</td>
                                <td>
                                    <div class="label-${ filter[i].label_name}" ${(filter[i].label_name == 'priority0') ? 'style="font-weight: bold; text-transform: uppercase;"' : ''}>${(filter[i].label_name == 'priority0') ? '<span style="font-size: 1px; color:red;">a</span>' : '<span style="font-size: 1px; color:red;">z</span>'} ${filter[i].priorname}</div>
                                </td>
                                <td>
                                    <span style="display: none;">${moment(filter[i].due_date).format('MM')}</span> ${moment(filter[i].due_date).format('DD') + ' '} ${moment(filter[i].due_date).format('MMM') + ' '} ${moment(filter[i].due_date).format('YY')}
                                    <span>${ moment(filter[i].due_date).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].status}</td>
                            </tr>`;
                }
            }
            $('#table-2').DataTable().destroy()
            $('#tbody_new').html(html);
            $('#kamar-lainnya2').removeClass('in');
            $('#table-2').DataTable({
                "pageLength": 50,
                "lengthMenu": [50, 100, 200],
                "aaSorting": [[0, "desc"]]
            })
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    });
})

//filter inprogress table
$('#btnFilter_ip').on('click', function () {
    let hotel = $('#hotel_ip').val()
    let city = $('#city_ip').val()
    let priority = $('#priority_ip').val()
    let division = $('#division_ip').val()
    let create_from = $('#create_from_ip').val()
    let create_to = $('#create_to_ip').val()
    let created_by = $('#created_by_ip').val()
    let pic = $('#pic_ip').val()
    let status = $('#status_ip').val()
    let topic = $('#topic_ip').val()
    let validity = $('#validity_ip').val()
    let operator = $('#operator_ip').val()
    let booking = $('#booking_ip').val()
    let operator1 = $('#operator1_ip').val()
    let subdivision = $('#subdivision_ip').val()
    let country = $('#country_ip').val()
    let shownotif = ($('#shownotif_ip:checkbox:checked').length > 0) ? $('#shownotif_ip').val() : ''
    let market = $('#market_ip').val()
    let chain = $('#chain_ip').val()
    let brand = $('#brand_ip').val()
    let cb_division = $('#cb_division_ip').val()
    let cb_subdiv = $('#cb_subdivision_ip').val()
    let jarvis_id = $('#jarvis_id_ip').val()

    $.ajax({
        type: "POST",
        url: "/ticket/ticket-status/filter",
        data: { hotel, city, priority, division, create_from, create_to, created_by, pic, status: status.length > 0 ? JSON.stringify(status) : '', topic: topic.length > 0 ? JSON.stringify(topic) : '', validity, operator, booking, operator1, subdivision, country, shownotif, market, chain, brand, cb_division, cb_subdiv, jarvis_id },
        beforeSend: function () {
            let html = `<tr>
                            <td colspan='14' align='center'>
                                <img src='/assets/images/loading.gif' width='30' />
                            </td>
                        </tr>`
            $('#tbody_inprogress').html(html);
        },
        success: function (data) {
            //* show content
            var filter = JSON.parse(data.ticket);
            let pic = JSON.parse(data.pic_subprocess)
            var html = '';
            let no = 1
            for (var i = 0; i < filter.length; i++) {
                let time = filter[i].due_time
                let due_date = moment(filter[i].utc_create).add(time, 'hours').format('YYYY-MM-DD HH:mm:ss'); //moment(filter[i].utc_create, 'YYYY-MM-DD HH:mm:ss').add(time, 'days'); 
                //let due_date = due.format('YYYY-MM-DD HH:mm:ss')
                let current_date = moment().format('YYYY-MM-DD HH:mm:ss')
                let compare_date = moment(current_date).add(7, 'days').format('YYYY-MM-DD');
                if (current_date <= due_date) {
                    let pic_dyn = ''
                    let step = ''
                    for (let j = 0; j < pic.length; j++) {
                        if (filter[i].id == pic[j].ticket_id) {
                            if (pic[j].step == 0) {
                                pic_dyn += '- ' + pic[j].fullname + '<br>'
                                step += pic[j].step + ', '
                            } else {
                                if (pic[j].status == null) {
                                    pic_dyn += '- ' + pic[j].fullname + '<br>'
                                    step += pic[j].step + ', '
                                }
                            }
                        }
                    }
                    //<td>${ no++ }</td>
                    no++;
                    html += `<tr onclick="window.open('/ticket/detail-ticket/${filter[i].id}','_blank');">
                                
                                <td data-sort="${moment(filter[i].utc_create).format('YYYY-MM-DD HH:mm:ss')}">
                                    ${moment(filter[i].utc_create).format('DD') + ' '} ${moment(filter[i].utc_create).format('MMM') + ' '} ${moment(filter[i].utc_create).format('YY')}
                                    <span>${ moment(filter[i].utc_create).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].fullname}</td>
                                ${ (filter[i].priorname == 'Top Up' || filter[i].validity_from < compare_date ? "<td align='center' style='color: red;'>" : "<td align='center'>")}
                                    ${ filter[i].ticket_no} <br> ${(filter[i].total_followup != 0 && filter[i].total_followup ? '<span class="text-notif">' + filter[i].total_followup + '</span>' : '')}
                                </td>
                                <td>${ (filter[i].city != null ? filter[i].city : '')}</td>
                                <td>${filter[i].jarvis_code}</td>
                                <td>${ filter[i].hotel} </td>
                                <td>
                                    ${ filter[i].department}
                                    <span>- ${ filter[i].category_name}</span>
                                </td>
                                <td>${ filter[i].market}</td>
                                <td>
                                    ${ (filter[i].validity_from) ? '<span style="display: none;">' + moment(filter[i].validity_from).format('MM') + '</span>' + moment(filter[i].validity_from).format('DD') + ' ' + moment(filter[i].validity_from).format('MMM') + ' ' + moment(filter[i].validity_from).format('YY') + '<span>- ' + moment(filter[i].validity_to).format('DD MMM YY') + '</span>' : '-'} 
                                </td>
                                <td>${ pic_dyn}</td>
                                <td>${ step}</td>
                                <td>
                                    <div class="label-${ filter[i].label_name}" ${(filter[i].label_name == 'priority0') ? 'style="font-weight: bold; text-transform: uppercase;"' : ''}>${(filter[i].label_name == 'priority0') ? '<span style="font-size: 1px; color:red;">a</span>' : '<span style="font-size: 1px; color:red;">z</span>'} ${filter[i].priorname}</div>
                                </td>
                                <td>
                                    <span style="display: none;">${moment(filter[i].due_date).format('MM')}</span> ${moment(filter[i].due_date).format('DD') + ' '} ${moment(filter[i].due_date).format('MMM') + ' '} ${moment(filter[i].due_date).format('YY')}
                                    <span>${ moment(filter[i].due_date).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].status}</td>
                            </tr>`;
                }
            }
            $('#table-3').DataTable().destroy()
            $('#tbody_inprogress').html(html);
            $('#kamar-lainnya1').removeClass('in');
            $('#table-3').DataTable({
                "pageLength": 100,
                "lengthMenu": [50, 100, 200],
                "aaSorting": [[0, "desc"]]
            })
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    });
})

//filter overdue table
$('#btnFilter_overdue').on('click', function () {
    let hotel = $('#hotel_ov').val()
    let city = $('#city_ov').val()
    let priority = $('#priority_ov').val()
    let division = $('#division_ov').val()
    let create_from = $('#create_from_ov').val()
    let create_to = $('#create_to_ov').val()
    let created_by = $('#created_by_ov').val()
    let pic = $('#pic_ov').val()
    let status = $('#status_ov').val()
    let topic = $('#topic_ov').val()
    let validity = $('#validity_ov').val()
    let operator = $('#operator_ov').val()
    let booking = $('#booking_ov').val()
    let operator1 = $('#operator1_ov').val()
    let subdivision = $('#subdivision_ov').val()
    let country = $('#country_ov').val()
    let shownotif = ($('#shownotif_ov:checkbox:checked').length > 0) ? $('#shownotif_ov').val() : ''
    let market = $('#market_ov').val()
    let chain = $('#chain_ov').val()
    let brand = $('#brand_ov').val()
    let cb_division = $('#cb_division_ov').val()
    let cb_subdiv = $('#cb_subdivision_ov').val()
    let jarvis_id = $('#jarvis_id_ov').val()

    $.ajax({
        type: "POST",
        url: "/ticket/ticket-status/filter-overdue",
        data: { hotel, city, priority, division, create_from, create_to, created_by, pic, status: status.length > 0 ? JSON.stringify(status) : '', topic: topic.length > 0 ? JSON.stringify(topic) : '', validity, operator, booking, operator1, subdivision, country, shownotif, market, chain, brand, cb_division, cb_subdiv, jarvis_id },
        beforeSend: function () {
            let html = `<tr>
                            <td colspan='14' align='center'>
                                <img src='/assets/images/loading.gif' width='30' />
                            </td>
                        </tr>`
            $('#tbody_overdue').html(html);
        },
        success: function (data) {
            /* show content */
            var filter = JSON.parse(data.ticket);
            var pic = JSON.parse(data.pic_subprocess);
            var html = '';
            let no = 1
            for (var i = 0; i < filter.length; i++) {
                let time = filter[i].due_time
                let due_date = moment(filter[i].utc_create).add(time, 'hours').format('YYYY-MM-DD HH:mm:ss'); //moment(filter[i].utc_create, 'YYYY-MM-DD HH:mm:ss').add(time, 'days'); 
                //let due_date = due.format('YYYY-MM-DD HH:mm:ss')
                let current_date = moment().format('YYYY-MM-DD HH:mm:ss')
                let compare_date = moment(current_date).add(7, 'days').format('YYYY-MM-DD');
                let pic_dyn = ''
                let step = ''
                if (current_date >= due_date) {
                    for (let j = 0; j < pic.length; j++) {
                        if (filter[i].id == pic[j].ticket_id) {
                            if (pic[j].status == null) {
                                pic_dyn += '- ' + pic[j].fullname + '<br>'
                                step += pic[j].step + ', '
                            }
                        }
                    }
                    //<td>${ no++ }</td>
                    html += `<tr onclick="window.open('/ticket/detail-ticket/${filter[i].id}','_blank');">
                                
                                <td data-sort="${moment(filter[i].utc_create).format('YYYY-MM-DD HH:mm:ss')}">
                                    ${moment(filter[i].utc_create).format('DD') + ' '} ${moment(filter[i].utc_create).format('MMM') + ' '} ${moment(filter[i].utc_create).format('YY')}
                                    <span>${ moment(filter[i].utc_create).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].fullname}</td>
                                ${ (filter[i].priorname == 'Top Up' || filter[i].validity_from < compare_date ? "<td align='center' style='color: red;'>" : "<td align='center'>")}
                                    ${ filter[i].ticket_no} <br> 
                                    ${ (filter[i].total_followup != 0 && filter[i].total_followup ? '<span class="text-notif">' + filter[i].total_followup + '</span>' : '')} 
                                    ${ (filter[i].cc != 0 && filter[i].cc ? '<span class="text-notif-blue">CC</span>' : '')} 
                                    ${ (filter[i].new_pic != 0 && filter[i].new_pic ? '<span class="text-notif-green">NEW</span>' : '')}
                                    ${ (filter[i].unread_mention != 0 && filter[i].unread_mention ? '<span class="text-notif-orange">' + filter[i].unread_mention + '</span>' : '')}
                                </td>
                                <td>${ (filter[i].city != null ? filter[i].city : '')}</td>
                                <td>${filter[i].jarvis_code}</td>
                                <td>${ filter[i].hotel} </td>
                                <td>
                                    ${ filter[i].department}
                                    <span>- ${ filter[i].category_name}</span>
                                </td>
                                <td>${ filter[i].market}</td>
                                <td>
                                    ${ (filter[i].validity_from) ? '<span style="display: none;">' + moment(filter[i].validity_from).format('MM') + '</span>' + moment(filter[i].validity_from).format('DD') + ' ' + moment(filter[i].validity_from).format('MMM') + ' ' + moment(filter[i].validity_from).format('YY') + '<span>- ' + moment(filter[i].validity_to).format('DD MMM YY') + '</span>' : '-'} 
                                </td>
                                <td>${ pic_dyn}</td>
                                <td>${ step}</td>
                                <td>
                                    <div class="label-${ filter[i].label_name}" ${(filter[i].label_name == 'priority0') ? 'style="font-weight: bold; text-transform: uppercase;"' : ''}>${(filter[i].label_name == 'priority0') ? '<span style="font-size: 1px; color:red;">a</span>' : '<span style="font-size: 1px; color:red;">z</span>'} ${filter[i].priorname}</div>
                                </td>
                                <td>
                                    <span style="display: none;">${moment(filter[i].due_date).format('MM')}</span> ${moment(filter[i].due_date).format('DD') + ' '} ${moment(filter[i].due_date).format('MMM') + ' '} ${moment(filter[i].due_date).format('YY')}
                                    <span>${ moment(filter[i].due_date).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].status}</td>
                            </tr>`;
                }
            }
            $('#table-4').DataTable().destroy();
            $('#tbody_overdue').html(html);
            $('#kamar-lainnya').removeClass('in');
            $('#table-4').DataTable({
                "pageLength": 50,
                "lengthMenu": [50, 100, 200],
                "aaSorting": [[0, "desc"]]
            });
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    });
})

//validate field create_from
const obj = {
    getCurrentDate: () => {
        let today = new Date()
        let yyyy = today.getFullYear()
        let mm = today.getMonth() + 1
        let dd = today.getDate()
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return today = `${yyyy}-${mm}-${dd} 23:59:59`
    },
    getCurrentDateNoTime: () => {
        let today = new Date()
        let yyyy = today.getFullYear()
        let mm = today.getMonth() + 1
        let dd = today.getDate()
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return today = `${yyyy}-${mm}-${dd}`
    },
}

//
$('#create_from_mct_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment('2018-06-01 00:00:00').format('DD MMM YY'))
            $('#create_from_mct').val('2018-06-01 00:00:00')
        }
    } else {
        $('#create_from_mct').val('')
    }
})
$('#create_to_mct_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDate()).format('DD MMM YY'))
            $('#create_to_mct').val(obj.getCurrentDate())
        }
    } else {
        $('#create_to_mct').val('')
    }
})

//
$('#create_from_mat_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment('2018-06-01 00:00:00').format('DD MMM YY'))
            $('#create_from_mat').val('2018-06-01 00:00:00')
        }
    } else {
        $('#create_from_mat').val('')
    }
})
$('#create_to_mat_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDate()).format('DD MMM YY'))
            $('#create_to_mat').val(obj.getCurrentDate())
        }
    } else {
        $('#create_to_mat').val('')
    }
})

//
$('#create_from_n_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment('2018-06-01 00:00:00').format('DD MMM YY'))
            $('#create_from_n').val('2018-06-01 00:00:00')
        }
    } else {
        $('#create_from_n').val('')
    }
})
$('#create_to_n_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDate()).format('DD MMM YY'))
            $('#create_to_n').val(obj.getCurrentDate())
        }
    } else {
        $('#create_to_n').val('')
    }
})

//
$('#create_from_ip_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment('2018-06-01 00:00:00').format('DD MMM YY'))
            $('#create_from_ip').val('2018-06-01 00:00:00')
        }
    } else {
        $('#create_from_ip').val('')
    }
})
$('#create_to_ip_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDate()).format('DD MMM YY'))
            $('#create_to_ip').val(obj.getCurrentDate())
        }
    } else {
        $('#create_to_ip').val('')
    }
})

//
$('#create_from_ov_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment('2018-06-01 00:00:00').format('DD MMM YY'))
            $('#create_from_ov').val('2018-06-01 00:00:00')
        }
    } else {
        $('#create_from_ov').val('')
    }
})
$('#create_to_ov_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDate()).format('DD MMM YY'))
            $('#create_to_ov').val(obj.getCurrentDate())
        }
    } else {
        $('#create_to_ov').val('')
    }
})

//
$('#create_from_cls_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment('2018-06-01 00:00:00').format('DD MMM YY'))
            $('#create_from_cls').val('2018-06-01 00:00:00')
        }
    } else {
        $('#create_from_cls').val('')
    }
})
$('#create_to_cls_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDate()).format('DD MMM YY'))
            $('#create_to_cls').val(obj.getCurrentDate())
        }
    } else {
        $('#create_to_cls').val('')
    }
})

//validity filter field 
$('#validity_mct_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#validity_mct').val(obj.getCurrentDateNoTime())
        }
    } else {
        $('#validity_mct').val('')
    }
})

$('#validity_mat_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#validity_mat').val(obj.getCurrentDateNoTime())
        }
    } else {
        $('#validity_mat').val('')
    }
})

$('#validity_n_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#validity_n').val(obj.getCurrentDateNoTime())
        }
    } else {
        $('#validity_n').val('')
    }
})

$('#validity_ip_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#validity_ip').val(obj.getCurrentDateNoTime())
        }
    } else {
        $('#validity_ip').val('')
    }
})

$('#validity_ov_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#validity_ov').val(obj.getCurrentDateNoTime())
        }
    } else {
        $('#validity_ov').val('')
    }
})

$('#validity_cls_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#validity_cls').val(obj.getCurrentDateNoTime())
        }
    } else {
        $('#validity_cls').val('')
    }
})

//booking filter field
$('#booking_mct_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#booking_mct').val(obj.getCurrentDateNoTime())
        } else {
            let nih = moment($(this).val()).format('YYYY-MM-DD')
            $('#booking_mct').val(nih)
        }
    } else {
        $('#booking_mct').val('')
    }
})
$('#booking_mat_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#booking_mat').val(obj.getCurrentDateNoTime())
        } else {
            let nih = moment($(this).val()).format('YYYY-MM-DD')
            $('#booking_mat').val(nih)
        }
    } else {
        $('#booking_mat').val('')
    }
})
$('#booking_n_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#booking_n').val(obj.getCurrentDateNoTime())
        } else {
            let nih = moment($(this).val()).format('YYYY-MM-DD')
            $('#booking_n').val(nih)
        }
    } else {
        $('#booking_n').val('')
    }
})
$('#booking_ip_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#booking_ip').val(obj.getCurrentDateNoTime())
        } else {
            let nih = moment($(this).val()).format('YYYY-MM-DD')
            $('#booking_ip').val(nih)
        }
    } else {
        $('#booking_ip').val('')
    }
})
$('#booking_ov_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#booking_ov').val(obj.getCurrentDateNoTime())
        } else {
            let nih = moment($(this).val()).format('YYYY-MM-DD')
            $('#booking_ov').val(nih)
        }
    } else {
        $('#booking_ov').val('')
    }
})
$('#booking_cls_show').on('blur', function () {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#booking_cls').val(obj.getCurrentDateNoTime())
        } else {
            let nih = moment($(this).val()).format('YYYY-MM-DD')
            $('#booking_cls').val(nih)
        }
    } else {
        $('#booking_cls').val('')
    }
})

//load tab my ticket list
$('#mytab').on('click', function () {
    $.ajax({
        type: "GET",
        url: "/ticket/tab/myticket",
        beforeSend: function () {
            let html = `<tr>
                            <td colspan='14' align='center'>
                                <img src='/assets/images/loading.gif' width='30' />
                            </td>
                        </tr>`
            $('#tbody_mct').html(html);
        },
        success: function (data) {
            //* show content
            var filter = JSON.parse(data.ticket);
            let pic = JSON.parse(data.pic_subprocess)
            var html = '';
            let no = 1
            for (var i = 0; i < filter.length; i++) {
                let current_date = moment().format('YYYY-MM-DD')
                let compare_date = moment(current_date).add(7, 'days').format('YYYY-MM-DD'); //moment(filter[i].utc_create, 'YYYY-MM-DD HH:mm:ss').add(time, 'days'); 
                //let due_date = due.format('YYYY-MM-DD HH:mm:ss')
                let pic_dyn = ''
                let step = ''
                for (let j = 0; j < pic.length; j++) {
                    if (filter[i].id == pic[j].ticket_id) {
                        if (filter[i].status == 'CANCELLED') {
                            if (pic[j].step == 0) {
                                pic_dyn += '- ' + pic[j].fullname + '<br>'
                                step += pic[j].process + ', '
                            }
                        } else {
                            if (pic[j].step == 0) {
                                pic_dyn += '- ' + pic[j].fullname + '<br>'
                                step += pic[j].process + ', '
                            } else {
                                if (pic[j].status == null) {
                                    pic_dyn += '- ' + pic[j].fullname + '<br>'
                                    step += pic[j].process + ', '
                                }
                            }
                        }
                    }
                }
                //<td>${ no++ }</td>
                no++;
                html += `<tr onclick="window.open('/ticket/detail-ticket/${filter[i].id}','_blank');">
                            <td data-sort="${moment(filter[i].utc_create).format('YYYY-MM-DD HH:mm:ss')}">
                                ${moment(filter[i].utc_create).format('DD') + ' '} ${moment(filter[i].utc_create).format('MMM') + ' '} ${moment(filter[i].utc_create).format('YY')}
                                <span>${ moment(filter[i].utc_create).format('HH:mm')}</span>
                            </td>
                            <td>${ filter[i].fullname}</td>
                            ${ (filter[i].priorname == 'Top Up' || filter[i].validity_from < compare_date ? "<td align='center' style='color: red;'>" : "<td align='center'>")}
                                ${ filter[i].ticket_no} <br> ${(filter[i].total_followup != 0 && filter[i].total_followup ? '<span class="text-notif">' + filter[i].total_followup + '</span>' : '')}
                            </td>
                            <td>${ (filter[i].city != null ? filter[i].city : '')}</td>
                            <td>${filter[i].jarvis_code} </td>
                            <td>${ filter[i].hotel} </td>
                            <td>
                                ${ filter[i].department}
                                <span>- ${ filter[i].category_name}</span>
                            </td>
                            <td>${ filter[i].market}</td>
                            <td>
                                ${ (filter[i].validity_from) ? '<span style="display: none;">' + moment(filter[i].validity_from).format('MM') + '</span>' + moment(filter[i].validity_from).format('DD') + ' ' + moment(filter[i].validity_from).format('MMM') + ' ' + moment(filter[i].validity_from).format('YY') + '<span>- ' + moment(filter[i].validity_to).format('DD MMM YY') + '</span>' : '-'} 
                            </td>
                            <td>${ pic_dyn}</td>
                            <td>${ step}</td>
                            <td>
                                <div class="label-${ filter[i].label_name}" ${(filter[i].label_name == 'priority0') ? 'style="font-weight: bold; text-transform: uppercase;"' : ''}>${(filter[i].label_name == 'priority0') ? '<span style="font-size: 1px; color:red;">a</span>' : '<span style="font-size: 1px; color:red;">z</span>'} ${filter[i].priorname}</div>
                            </td>
                            <td>
                                <span style="display: none;">${moment(filter[i].due_date).format('MM')}</span> ${moment(filter[i].due_date).format('DD') + ' '} ${moment(filter[i].due_date).format('MMM') + ' '} ${moment(filter[i].due_date).format('YY')}
                                <span>${ moment(filter[i].due_date).format('HH:mm')}</span>
                            </td>
                            <td>${ filter[i].status}</td>
                            <td>${ filter[i].utc_close ? `<span style='display: none;'>${moment(filter[i].utc_close).format('MM')}</span> ${moment(filter[i].utc_close).format('DD') + ' '} ${moment(filter[i].utc_close).format('MMM') + ' '} ${moment(filter[i].utc_close).format('YY')}<span>${moment(filter[i].utc_close).format('HH:mm')}</span>` : '-'}</td>
                        </tr>`;
            }

            $('#table-1').DataTable().destroy();
            $('#tbody_mct').html(html);
            $('#table-1').DataTable({
                "pageLength": 100,
                "lengthMenu": [50, 100, 200],
                "aaSorting": [[0, "desc"]]
            })
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    });
})

//load ticket new
$('#newtab').on('click', function () {
    $.ajax({
        type: "GET",
        url: "/ticket/tab/newticket",
        beforeSend: function () {
            let html = `<tr>
                            <td colspan='14' align='center'>
                                <img src='/assets/images/loading.gif' width='30' />
                            </td>
                        </tr>`
            $('#tbody_new').html(html);
        },
        success: function (data) {
            //* show content
            var filter = JSON.parse(data.ticket);
            let pic = JSON.parse(data.pic_subprocess)
            var html = '';
            let no = 1
            for (var i = 0; i < filter.length; i++) {
                let time = filter[i].due_time
                let due_date = moment(filter[i].utc_create).add(time, 'hours').format('YYYY-MM-DD HH:mm:ss'); //moment(filter[i].utc_create, 'YYYY-MM-DD HH:mm:ss').add(time, 'days'); 
                //let due_date = due.format('YYYY-MM-DD HH:mm:ss')
                let current_date = moment().format('YYYY-MM-DD HH:mm:ss')
                let compare_date = moment(current_date).add(7, 'days').format('YYYY-MM-DD');
                if (current_date <= due_date) {
                    let pic_dyn = ''
                    let step = ''
                    for (let j = 0; j < pic.length; j++) {
                        if (filter[i].id == pic[j].ticket_id) {
                            if (pic[j].step == 0) {
                                pic_dyn += '- ' + pic[j].fullname + '<br>'
                                step += pic[j].step + ', '
                            } else {
                                if (pic[j].status == null) {
                                    pic_dyn += '- ' + pic[j].fullname + '<br>'
                                    step += pic[j].step + ', '
                                }
                            }
                        }
                    }
                    //<td>${ no++ }</td>
                    no++;
                    html += `<tr onclick="window.open('/ticket/detail-ticket/${filter[i].id}','_blank');">
                                
                                <td data-sort="${moment(filter[i].utc_create).format('YYYY-MM-DD HH:mm:ss')}">
                                    ${moment(filter[i].utc_create).format('DD') + ' '} ${moment(filter[i].utc_create).format('MMM') + ' '} ${moment(filter[i].utc_create).format('YY')}
                                    <span>${ moment(filter[i].utc_create).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].fullname}</td>
                                ${ (filter[i].priorname == 'Top Up' || filter[i].validity_from < compare_date ? "<td align='center' style='color: red;'>" : "<td align='center'>")}
                                    ${ filter[i].ticket_no} <br> ${(filter[i].total_followup != 0 && filter[i].total_followup ? '<span class="text-notif">' + filter[i].total_followup + '</span>' : '')}
                                </td>
                                <td>${ (filter[i].city != null ? filter[i].city : '')}</td>
                                <td>${filter[i].jarvis_code} </td>
                                <td>${ filter[i].hotel} </td>
                                <td>
                                    ${ filter[i].department}
                                    <span>- ${ filter[i].category_name}</span>
                                </td>
                                <td>${ filter[i].market}</td>
                                <td>
                                    ${ (filter[i].validity_from) ? '<span style="display: none;">' + moment(filter[i].validity_from).format('MM') + '</span>' + moment(filter[i].validity_from).format('DD') + ' ' + moment(filter[i].validity_from).format('MMM') + ' ' + moment(filter[i].validity_from).format('YY') + '<span>- ' + moment(filter[i].validity_to).format('DD MMM YY') + '</span>' : '-'} 
                                </td>
                                <td>${ pic_dyn}</td>
                                <td>${ step}</td>
                                <td>
                                    <div class="label-${ filter[i].label_name}" ${(filter[i].label_name == 'priority0') ? 'style="font-weight: bold; text-transform: uppercase;"' : ''}>${(filter[i].label_name == 'priority0') ? '<span style="font-size: 1px; color:red;">a</span>' : '<span style="font-size: 1px; color:red;">z</span>'} ${filter[i].priorname}</div>
                                </td>
                                <td>
                                    <span style="display: none;">${moment(filter[i].due_date).format('MM')}</span> ${moment(filter[i].due_date).format('DD') + ' '} ${moment(filter[i].due_date).format('MMM') + ' '} ${moment(filter[i].due_date).format('YY')}
                                    <span>${ moment(filter[i].due_date).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].status}</td>
                            </tr>`;
                }
            }
            $('#table-2').DataTable().destroy()
            $('#tbody_new').html(html);
            $('#table-2').DataTable({
                "pageLength": 100,
                "lengthMenu": [50, 100, 200],
                "aaSorting": [[0, "desc"]]
            })
            $('#total-new').html(no - 1)
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    });
})

//load ticket progress
$('#progresstab').on('click', function () {
    $.ajax({
        type: "GET",
        url: "/ticket/tab/progressticket",
        beforeSend: function () {
            let html = `<tr>
                            <td colspan='14' align='center'>
                                <img src='/assets/images/loading.gif' width='30' />
                            </td>
                        </tr>`
            $('#tbody_inprogress').html(html);
        },
        success: function (data) {
            //* show content
            var filter = JSON.parse(data.ticket);
            let pic = JSON.parse(data.pic_subprocess)
            var html = '';
            let no = 1
            for (var i = 0; i < filter.length; i++) {
                let time = filter[i].due_time
                let due_date = moment(filter[i].utc_create).add(time, 'hours').format('YYYY-MM-DD HH:mm:ss'); //moment(filter[i].utc_create, 'YYYY-MM-DD HH:mm:ss').add(time, 'days'); 
                //let due_date = due.format('YYYY-MM-DD HH:mm:ss')
                let current_date = moment().format('YYYY-MM-DD HH:mm:ss')
                let compare_date = moment(current_date).add(7, 'days').format('YYYY-MM-DD');
                if (current_date <= due_date) {
                    let pic_dyn = ''
                    let step = ''
                    for (let j = 0; j < pic.length; j++) {
                        if (filter[i].id == pic[j].ticket_id) {
                            if (pic[j].step == 0) {
                                pic_dyn += '- ' + pic[j].fullname + '<br>'
                                step += pic[j].step + ', '
                            } else {
                                if (pic[j].status == null) {
                                    pic_dyn += '- ' + pic[j].fullname + '<br>'
                                    step += pic[j].step + ', '
                                }
                            }
                        }
                    }
                    //<td>${ no++ }</td>
                    no++;
                    html += `<tr onclick="window.open('/ticket/detail-ticket/${filter[i].id}','_blank');">
                                
                                <td data-sort="${moment(filter[i].utc_create).format('YYYY-MM-DD HH:mm:ss')}">
                                    ${moment(filter[i].utc_create).format('DD') + ' '} ${moment(filter[i].utc_create).format('MMM') + ' '} ${moment(filter[i].utc_create).format('YY')}
                                    <span>${ moment(filter[i].utc_create).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].fullname}</td>
                                ${ (filter[i].priorname == 'Top Up' || filter[i].validity_from < compare_date ? "<td align='center' style='color: red;'>" : "<td align='center'>")}
                                    ${ filter[i].ticket_no} <br> ${(filter[i].total_followup != 0 && filter[i].total_followup ? '<span class="text-notif">' + filter[i].total_followup + '</span>' : '')}
                                </td>
                                <td>${ (filter[i].city != null ? filter[i].city : '')}</td>
                                <td>${filter[i].jarvis_code}</td>
                                <td>${ filter[i].hotel} </td>
                                <td>
                                    ${ filter[i].department}
                                    <span>- ${ filter[i].category_name}</span>
                                </td>
                                <td>${ filter[i].market}</td>
                                <td>
                                    ${ (filter[i].validity_from) ? '<span style="display: none;">' + moment(filter[i].validity_from).format('MM') + '</span>' + moment(filter[i].validity_from).format('DD') + ' ' + moment(filter[i].validity_from).format('MMM') + ' ' + moment(filter[i].validity_from).format('YY') + '<span>- ' + moment(filter[i].validity_to).format('DD MMM YY') + '</span>' : '-'} 
                                </td>
                                <td>${ pic_dyn}</td>
                                <td>${ step}</td>
                                <td>
                                    <div class="label-${ filter[i].label_name}" ${(filter[i].label_name == 'priority0') ? 'style="font-weight: bold; text-transform: uppercase;"' : ''}>${(filter[i].label_name == 'priority0') ? '<span style="font-size: 1px; color:red;">a</span>' : '<span style="font-size: 1px; color:red;">z</span>'} ${filter[i].priorname}</div>
                                </td>
                                <td>
                                    <span style="display: none;">${moment(filter[i].due_date).format('MM')}</span> ${moment(filter[i].due_date).format('DD') + ' '} ${moment(filter[i].due_date).format('MMM') + ' '} ${moment(filter[i].due_date).format('YY')}
                                    <span>${ moment(filter[i].due_date).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].status}</td>
                            </tr>`;
                }
            }
            $('#table-3').DataTable().destroy()
            $('#tbody_inprogress').html(html);
            $('#table-3').DataTable({
                "pageLength": 100,
                "lengthMenu": [50, 100, 200],
                "aaSorting": [[0, "desc"]]
            })
            $('#total-progress').html(no - 1)
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    });
})

//load overdue
$('#overduetab').on('click', function () {
    $.ajax({
        type: "GET",
        url: "/ticket/tab/overdueticket",
        beforeSend: function () {
            let html = `<tr>
                            <td colspan='14' align='center'>
                                <img src='/assets/images/loading.gif' width='30' />
                            </td>
                        </tr>`
            $('#tbody_overdue').html(html);
        },
        success: function (data) {
            /* show content */
            var filter = JSON.parse(data.ticket);
            let pic = JSON.parse(data.pic_subprocess)
            var html = '';
            let no = 1
            for (var i = 0; i < filter.length; i++) {
                let time = filter[i].due_time
                let due_date = moment(filter[i].utc_create).add(time, 'hours').format('YYYY-MM-DD HH:mm:ss'); //moment(filter[i].utc_create, 'YYYY-MM-DD HH:mm:ss').add(time, 'days'); 
                //let due_date = due.format('YYYY-MM-DD HH:mm:ss')
                let current_date = moment().format('YYYY-MM-DD HH:mm:ss')
                let compare_date = moment(current_date).add(7, 'days').format('YYYY-MM-DD');
                if (current_date >= due_date) {
                    let pic_dyn = ''
                    let step = ''
                    for (let j = 0; j < pic.length; j++) {
                        if (filter[i].id == pic[j].ticket_id) {
                            if (pic[j].step == 0) {
                                pic_dyn += '- ' + pic[j].fullname + '<br>'
                                step += pic[j].step + ', '
                            } else {
                                if (pic[j].status == null) {
                                    pic_dyn += '- ' + pic[j].fullname + '<br>'
                                    step += pic[j].step + ', '
                                }
                            }
                        }
                    }
                    //<td>${ no++ }</td>
                    no++;
                    html += `<tr onclick="window.open('/ticket/detail-ticket/${filter[i].id}','_blank');">
                                
                                <td data-sort="${moment(filter[i].utc_create).format('YYYY-MM-DD HH:mm:ss')}">
                                    ${moment(filter[i].utc_create).format('DD') + ' '} ${moment(filter[i].utc_create).format('MMM') + ' '} ${moment(filter[i].utc_create).format('YY')}
                                    <span>${ moment(filter[i].utc_create).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].fullname}</td>
                                ${ (filter[i].priorname == 'Top Up' || filter[i].validity_from < compare_date ? "<td align='center' style='color: red;'>" : "<td align='center'>")}
                                    ${ filter[i].ticket_no} <br> ${(filter[i].total_followup != 0 && filter[i].total_followup ? '<span class="text-notif">' + filter[i].total_followup + '</span>' : '')}
                                </td>
                                <td>${ (filter[i].city != null ? filter[i].city : '')}</td>
                                <td>${filter[i].jarvis_code}</td>
                                <td>${ filter[i].hotel} </td>
                                <td>
                                    ${ filter[i].department}
                                    <span>- ${ filter[i].category_name}</span>
                                </td>
                                <td>${ filter[i].market}</td>
                                <td>
                                    ${ (filter[i].validity_from) ? '<span style="display: none;">' + moment(filter[i].validity_from).format('MM') + '</span>' + moment(filter[i].validity_from).format('DD') + ' ' + moment(filter[i].validity_from).format('MMM') + ' ' + moment(filter[i].validity_from).format('YY') + '<span>- ' + moment(filter[i].validity_to).format('DD MMM YY') + '</span>' : '-'} 
                                </td>
                                <td>${ pic_dyn}</td>
                                <td>${ step}</td>
                                <td>
                                    <div class="label-${ filter[i].label_name}" ${(filter[i].label_name == 'priority0') ? 'style="font-weight: bold; text-transform: uppercase;"' : ''}>${(filter[i].label_name == 'priority0') ? '<span style="font-size: 1px; color:red;">a</span>' : '<span style="font-size: 1px; color:red;">z</span>'} ${filter[i].priorname}</div>
                                </td>
                                <td>
                                    <span style="display: none;">${moment(filter[i].due_date).format('MM')}</span> ${moment(filter[i].due_date).format('DD') + ' '} ${moment(filter[i].due_date).format('MMM') + ' '} ${moment(filter[i].due_date).format('YY')}
                                    <span>${ moment(filter[i].due_date).format('HH:mm')}</span>
                                </td>
                                <td>${ filter[i].status}</td>
                            </tr>`;
                }
            }
            $('#table-4').DataTable().destroy();
            $('#tbody_overdue').html(html);
            $('#table-4').DataTable({
                "pageLength": 100,
                "lengthMenu": [50, 100, 200],
                "aaSorting": [[0, "desc"]]
            });
            $('#total-overdue').html(no - 1)
        },
        error: function (jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    });
})

/*$('#shownotif_mct').on('click', function(){
    if($('#shownotif_mct:checkbox:checked').length > 0){
        alert($(this).val())
    } else {
        alert($(this).val())
    }
})*/

/* to hide and show operator in field validity
$('#validity_mct').on('blur', function(){
    if($(this).val() !== ''){
        if(!moment($(this).val(), 'YYYY-MM-DD', true).isValid()){
            $(this).val(obj.getCurrentDateNoTime())
        }
    }

    if($(this).val() !== ''){
        $('#div_op_mct').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
        let html = `<div class="col-xs-5" id="div_op_mct">
                        <select class="form-control" name="operator_mct" id="operator_mct">
                            <option value="=">Exact</option>
                            <option value="<">Before</option>
                            <option value=">">After</option>
                        </select>
                    </div>`
        $(this).parent().removeClass('col-xs-12')
        $(this).parent().addClass('col-xs-7')
        $(html).insertBefore($(this).parent())
    } else {
        $('#div_op_mct').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
    }
})

$('#validity_mat').on('blur', function(){
    if($(this).val() !== ''){
        if(!moment($(this).val(), 'YYYY-MM-DD', true).isValid()){
            $(this).val(obj.getCurrentDateNoTime())
        }
    }

    if($(this).val() !== ''){
        $('#div_op_mat').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
        let html = `<div class="col-xs-5" id="div_op_mat">
                        <select class="form-control" name="operator_mat" id="operator_mat">
                            <option value="=">Exact</option>
                            <option value="<">Before</option>
                            <option value=">">After</option>
                        </select>
                    </div>`
        $(this).parent().removeClass('col-xs-12')
        $(this).parent().addClass('col-xs-7')
        $(html).insertBefore($(this).parent())
    } else {
        $('#div_op_mat').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
    }
})

$('#validity_n').on('blur', function(){
    if($(this).val() !== ''){
        if(!moment($(this).val(), 'YYYY-MM-DD', true).isValid()){
            $(this).val(obj.getCurrentDateNoTime())
        }
    }

    if($(this).val() !== ''){
        $('#div_op_n').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
        let html = `<div class="col-xs-5" id="div_op_n">
                        <select class="form-control" name="operator_n" id="operator_n">
                            <option value="=">Exact</option>
                            <option value="<">Before</option>
                            <option value=">">After</option>
                        </select>
                    </div>`
        $(this).parent().removeClass('col-xs-12')
        $(this).parent().addClass('col-xs-7')
        $(html).insertBefore($(this).parent())
    } else {
        $('#div_op_n').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
    }
})

$('#validity_ip').on('blur', function(){
    if($(this).val() !== ''){
        if(!moment($(this).val(), 'YYYY-MM-DD', true).isValid()){
            $(this).val(obj.getCurrentDateNoTime())
        }
    }

    if($(this).val() !== ''){
        $('#div_op_ip').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
        let html = `<div class="col-xs-5" id="div_op_ip">
                        <select class="form-control" name="operator_ip" id="operator_ip">
                            <option value="=">Exact</option>
                            <option value="<">Before</option>
                            <option value=">">After</option>
                        </select>
                    </div>`
        $(this).parent().removeClass('col-xs-12')
        $(this).parent().addClass('col-xs-7')
        $(html).insertBefore($(this).parent())
    } else {
        $('#div_op_ip').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
    }
})

$('#validity_ov').on('blur', function(){
    if($(this).val() !== ''){
        if(!moment($(this).val(), 'YYYY-MM-DD', true).isValid()){
            $(this).val(obj.getCurrentDateNoTime())
        }
    }

    if($(this).val() !== ''){
        $('#div_op_ov').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
        let html = `<div class="col-xs-5" id="div_op_ov">
                        <select class="form-control" name="operator_ov" id="operator_ov">
                            <option value="=">Exact</option>
                            <option value="<">Before</option>
                            <option value=">">After</option>
                        </select>
                    </div>`
        $(this).parent().removeClass('col-xs-12')
        $(this).parent().addClass('col-xs-7')
        $(html).insertBefore($(this).parent())
    } else {
        $('#div_op_ov').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
    }
})

$('#validity_cls').on('blur', function(){
    if($(this).val() !== ''){
        if(!moment($(this).val(), 'YYYY-MM-DD', true).isValid()){
            $(this).val(obj.getCurrentDateNoTime())
        }
    }

    if($(this).val() !== ''){
        $('#div_op_cls').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
        let html = `<div class="col-xs-5" id="div_op_cls">
                        <select class="form-control" name="operator_cls" id="operator_cls">
                            <option value="=">Exact</option>
                            <option value="<">Before</option>
                            <option value=">">After</option>
                        </select>
                    </div>`
        $(this).parent().removeClass('col-xs-12')
        $(this).parent().addClass('col-xs-7')
        $(html).insertBefore($(this).parent())
    } else {
        $('#div_op_cls').remove()
        $(this).parent().removeClass('col-xs-7')
        $(this).parent().addClass('col-xs-12')
    }
})*/

function titleCase(str) {
    str = str.toLowerCase();
    str = str.split(' ');

    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }

    return str.join(' ');
}