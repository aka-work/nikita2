$('#ARCHIVE').addClass('active')

//library multiselect
$('#status_cls').multiselect({
    texts: {
        placeholder: 'Select Status',
    }
});

$('#topic_cls').multiselect({
    texts: {
        placeholder: 'Topic',
    }
});

//manipulate style library
$('div.ms-options-wrap').children('button').css({ 'padding-left': '14px', 'color': '#5e5e5e' })
$('.for-topic').next().children('div.ms-options').css({ 'width': '300px', 'max-height': '300px' })
$('input[type=text]').addClass('placeholder-color')

$('#hotel_cls').typeahead({
    name: 'hotel_cls',
    remote: '/hotel/ajax/autocomplete?key=%QUERY',
    limit: Infinity,
    minLength: 3
})

//autocomplete created_by
$('#created_by_cls').typeahead({
    name: 'created_by_cls',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
})

//autocomplete pic
$('#pic_cls_show').typeahead({
    name: 'pic_cls_show',
    remote: '/users/autocomplete-user?key=%QUERY',
    limit: 10
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

$('[href="#closed"]').on('click', function() {
    $('h2').text("Ticket Archive");
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
            var html = '<option value="">Sub Division</option>';
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
            var html = '<option value="">Created By (SUBDIV)</option>';
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

//filter closed table
$('#btnFilter_closed').on('click', function() {
    let hotel = $('#hotel_cls').val()
    let city = $('#city_cls').val()
    let priority = $('#priority_cls').val()
    let division = $('#division_cls').val()
    let create_from = $('#create_from_cls').val()
    let create_to = $('#create_to_cls').val()
    let created_by = $('#created_by_cls').val()
    let pic = $('#pic_cls').val()
    let status = $('#status_cls').val()
    let topic = $('#topic_cls').val()
    let validity = $('#validity_cls').val()
    let operator = $('#operator_cls').val()
    let booking = $('#booking_cls').val()
    let operator1 = $('#operator1_cls').val()
    let subdivision = $('#subdivision_cls').val()
    let country = $('#country_cls').val()
    let shownotif = ($('#shownotif_cls:checkbox:checked').length > 0) ? $('#shownotif_cls').val() : ''
    let market = $('#market_cls').val()
    let chain = $('#chain_cls').val()
    let brand = $('#brand_cls').val()
    let cb_division = $('#cb_division_cls').val()
    let cb_subdiv = $('#cb_subdivision_cls').val()
    let microsite = $('#microsite').val()
    let jarvis_id = $('#jarvis_id_cls').val()

    $.ajax({
        type: "POST",
        url: "/ticket/ticket-status/filter-archive",
        data: { hotel, city, priority, division, create_from, create_to, created_by, pic, status: status.length > 0 ? JSON.stringify(status) : '', topic: topic.length > 0 ? JSON.stringify(topic) : '', validity, operator, booking, operator1, subdivision, country, shownotif, market, chain, brand, cb_division, cb_subdiv, microsite, jarvis_id },
        beforeSend: function() {
            let html = ''
            if (microsite == 'CONTRACTING') 
            {
                html = `<tr>
                            <td colspan='17' align='center'>
                                <img src='/assets/images/loading.gif' width='30' />
                            </td>
                        </tr>`
            }
            else
            {
                html = `<tr>
                            <td colspan='16' align='center'>
                                <img src='/assets/images/loading.gif' width='30' />
                            </td>
                        </tr>`
            }
            $('#tbody_closed').html(html);
        },
        success: function(data) {
            //* show content
            var filter = JSON.parse(data.ticket);
            let pic = JSON.parse(data.pic_subprocess)
            var html = '';
            let no = 1
            for (var i = 0; i < filter.length; i++) {
                let current_date = moment().format('YYYY-MM-DD')
                let compare_date = moment(current_date).add(7, 'days').format('YYYY-MM-DD');
                let diffDuration = ''
                let service_time = ''
                if (filter[i].closed_date) {
                    // const now = moment(filter[i].utc_create);
                    // const expiration = moment(filter[i].closed_date);

                    // // get the difference between the moments
                    // const diff = expiration.diff(now);

                    // //express as a duration
                    // diffDuration = moment.duration(diff);

                    // if(diffDuration.days() != 0){
                    //     service_time = `${diffDuration.days()} Days <br>
                    //                     ${diffDuration.hours()} Hours <br>
                    //                     ${diffDuration.minutes()} Minutes`
                    // } else if(diffDuration.hours() != 0){
                    //     service_time = `${diffDuration.hours()} Hours <br>
                    //                     ${diffDuration.minutes()} Minutes`
                    // } else {
                    //     service_time = `${diffDuration.minutes()} Minutes <br>`
                    // }
                    service_time = msToTime(filter[i].service_time)
                }

                let pic_dyn = ''
                let step = ''
                for (let j = 0; j < pic.length; j++) {
                    if (filter[i].id == pic[j].ticket_id) {
                        if (filter[i].status == 'CANCELLED') {
                            if (pic[j].step == 0) {
                                pic_dyn += '- ' + pic[j].fullname + '<br>'
                                step += pic[j].step + ', '
                            }
                        } else {
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
                }

                if (microsite == 'CONTRACTING') {

                    //<td>${ no++ }</td>
                    html += `<tr onclick="window.open('/ticket/detail-ticket/${filter[i].id}','_blank');">
                                    <td data-sort="${moment(filter[i].utc_create).format('YYYY-MM-DD HH:mm:ss')}">
                                        ${moment(filter[i].utc_create).format('DD') + ' '} ${moment(filter[i].utc_create).format('MMM') + ' '} ${moment(filter[i].utc_create).format('YY')}
                                        <span>${ moment(filter[i].utc_create).format('HH:mm')}</span>
                                    </td>
                                    <td>${ filter[i].fullname}</td>
                                    ${ (filter[i].priorname == 'Top Up' || filter[i].validity_from < compare_date ? "<td align='center' style='color: red;'>" : "<td align='center'>")}
                                        ${ filter[i].ticket_no}
                                        ${ (filter[i].total_followup != 0 && filter[i].total_followup ? '<span class="text-notif">' + filter[i].total_followup + '</span>' : '')} 
                                        ${ (filter[i].cc != 0 && filter[i].cc ? '<span class="text-notif-blue">CC</span>' : '')} 
                                        ${ (filter[i].new_pic != 0 && filter[i].new_pic ? '<span class="text-notif-green">NEW</span>' : '')}
                                        ${ (filter[i].unread_mention != 0 && filter[i].unread_mention ? '<span class="text-notif-orange">' + filter[i].unread_mention + '</span>' : '')}
                                    </td>
                                    <td>${ (filter[i].city != null ? filter[i].city : '')}</td>
                                    <td>${ filter[i].jarvis_code} </td>
                                    <td>${ filter[i].hotel} </td>
                                    <td>${ filter[i].cm_name}</td>
                                    <td>
                                        ${ filter[i].department}
                                        <span>- ${ filter[i].category_name}</span>
                                    </td>
                                    <td>${ filter[i].market}</td>
                                    <td>
                                        ${ filter[i].validity_from ? '<span style="display: none;">' + moment(filter[i].validity_from).format('MM') + '</span>' + moment(filter[i].validity_from).format('DD') + ' ' + moment(filter[i].validity_from).format('MMM') + ' ' + moment(filter[i].validity_from).format('YY') + '<span>-' + moment(filter[i].validity_to).format('DD MMM YY') + '</span>' : ''}
                                    </td>
                                    <td>${ pic_dyn}</td>
                                    <td>
                                        <div class="label-${ filter[i].label_name}" ${(filter[i].label_name == 'priority0') ? 'style="font-weight: bold; text-transform: uppercase;"' : ''}>${(filter[i].label_name == 'priority0') ? '<span style="font-size: 1px; color:red;">a</span>' : '<span style="font-size: 1px; color:red;">z</span>'} ${filter[i].priorname}</div>
                                    </td>
                                    <td>${ filter[i].status}</td>
                                    <td>${ step}</td>
                                    <td>${ (filter[i].due_date) ? '<span style="display: none;">' + moment(filter[i].due_date).format('MM') + '</span>' + moment(filter[i].due_date).format('DD MMM YY') + '<span>' + moment(filter[i].due_date).format('HH:mm') + '</span>' : '-'}</td>
                                    <td>
                                        ${ (filter[i].closed_date) ? '<span style="display: none;">' + moment(filter[i].closed_date).format('MM') + '</span>' + moment(filter[i].closed_date).format('DD MMM YY') + '<span>' + moment(filter[i].closed_date).format('HH:mm') + '</span>' : '-'}
                                    </td>
                                    <td>
                                        ${ (filter[i].closed_date) ? service_time : '-'}
                                    </td>
                                </tr>`;
                } else {
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
                                    <td>${ filter[i].invoice_number}</td>
                                    <td>${ filter[i].pnr_number} </td>
                                    <td> ${ filter[i].agent_code} </td>
                                    
                                    <td> ${ filter[i].supplier_number} </td>
                                    <td> ${filter[i].hotel} </td>
                                    <td> ${ filter[i].category_name} </td>
                                    <td>${ pic_dyn}</td>
                                    <td> ${ moment(filter[i].utc_lastassigned).format('DD MMM YY')} <span>${moment(filter[i].utc_lastassigned).format('HH:mm')}</span></td>
                                    <td>${ filter[i].status}</td>
                                    <td>${ (filter[i].currency) ? filter[i].currency : '' } ${ (filter[i].potential_cost) ? formatNumber(filter[i].potential_cost) : '-' }</td>
                                    <td>
                                        ${ (filter[i].closed_date) ? moment(filter[i].closed_date).format('DD MMM YY') + '<span>' + moment(filter[i].closed_date).format('HH:mm') + '</span>' : '-'}
                                    </td>
                                    <td>
                                        ${ (filter[i].closed_date) ? service_time : '-'}
                                    </td>
                                </tr>`;
                }
            }
            $('#table-5').DataTable().destroy()
            $('#tbody_closed').html(html);
            $('.text-value').html(filter.length)
            $('#kamar-lainnya4').removeClass('in');
            $('#table-5').DataTable({
                "pageLength": 50,
                "lengthMenu": [50, 100, 200],
            })

        },
        error: function(jqXHR, textStatus, err) {
            //show error message
            alert('error');
        }
    });
})


$('#btnExportExcel').on('click', function() {
    let hotel = $('#hotel_cls').val()
    let city = $('#city_cls').val()
    let priority = $('#priority_cls').val()
    let division = $('#division_cls').val()
    let create_from = $('#create_from_cls').val()
    let create_to = $('#create_to_cls').val()
    let created_by = $('#created_by_cls').val()
    let pic = $('#pic_cls').val()
    let status = $('#status_cls').val()
    let topic = $('#topic_cls').val()
    let validity = $('#validity_cls').val()
    let operator = $('#operator_cls').val()
    let booking = $('#booking_cls').val()
    let operator1 = $('#operator1_cls').val()
    let subdivision = $('#subdivision_cls').val()
    let country = $('#country_cls').val()
    let shownotif = ($('#shownotif_cls:checkbox:checked').length > 0) ? $('#shownotif_cls').val() : ''
    let market = $('#market_cls').val()
    let chain = $('#chain_cls').val()
    let brand = $('#brand_cls').val()
    let cb_division = $('#cb_division_cls').val()
    let cb_subdiv = $('#cb_subdivision_cls').val()
    let microsite = $('#microsite').val()

    $.ajax({
        type: "GET",
        url: "/ticket/excel-data",
        data: { hotel, city, priority, division, create_from, create_to, created_by, pic, status: status.length > 0 ? JSON.stringify(status) : '', topic: topic.length > 0 ? JSON.stringify(topic) : '', validity, operator, booking, operator1, subdivision, country, shownotif, market, chain, brand, cb_division, cb_subdiv, microsite },
        success: function(data) {
            //* show content
            console.log(escape(data.create_from))
            window.location = `/ticket/excel?hotel=${data.hotel}&city=${data.city}&priority=${data.priority}&division=${data.division}&create_from=${escape(data.create_from)}&create_to=${escape(data.create_to)}&created_by=${data.created_by}&pic=${data.pic}&status=${data.status}&topic=${data.topic}&validity=${data.validity}&operator=${escape(data.operator)}&operator1=${escape(data.operator1)}&booking=${data.booking}&subdivision=${data.subdivision}&country=${data.country}&market=${data.market}&shownotif=${data.shownotif}&chain=${escape(data.chain)}&brand=${data.brand}&cb_division=${data.cb_division}&cb_subdiv=${data.cb_subdiv}&microsite=${data.microsite}`
            alert('Export process....')
        },
        error: function(jqXHR, textStatus, err) {
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

//show default
$('#create_from_cls_show').val(moment(obj.getCurrentDateNoTime() + ' 00:00:00').format('DD MMM YY'))
$('#create_from_cls').val(obj.getCurrentDateNoTime() + ' 00:00:00')

$('#create_to_cls_show').val(moment(obj.getCurrentDateNoTime() + ' 00:00:00').format('DD MMM YY'))
$('#create_to_cls').val(obj.getCurrentDateNoTime() + ' 23:59:59')

//
$('#create_from_cls_show').on('blur', function() {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment('2018-06-01 00:00:00').format('DD MMM YY'))
            $('#create_from_cls').val('2018-06-01 00:00:00')
        }
    } else {
        $('#create_from_cls').val('')
    }
})
$('#create_to_cls_show').on('blur', function() {
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
$('#validity_cls_show').on('blur', function() {
    if ($(this).val() !== '') {
        if (!moment($(this).val(), 'DD MMM YY', true).isValid()) {
            $(this).val(moment(obj.getCurrentDateNoTime()).format('DD MMM YY'))
            $('#validity_cls').val(obj.getCurrentDateNoTime())
        }
    } else {
        $('#validity_cls').val('')
    }
})

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

function msToTime(duration) {
    var seconds = parseInt((duration % 60)),
        minutes = Math.floor((duration / (60)) % 60),
        hours = Math.floor((duration / (60 * 60)) % 24);
    days = Math.floor((duration / (60 * 60 * 24)))

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    let Days = days != 0 ? days + " Days" : '';
    let Hours = hours != 0 ? hours + " Hours" : '';
    let Minutes = minutes != 0 ? minutes + " Minutes" : '';
    let Seconds = seconds != 0 ? seconds + " Seconds" : '';

    return `${Days ? Days : ''}
                 ${Hours ? Hours : ''}
                 ${Minutes ? Minutes : ''}
                 ${Seconds ? Seconds : ''}
        `
}

function formatNumber(num) {
    var p = num.toFixed(2).split(".");
    return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

let $microsite = $('#microsite').val()
setHeaderAccordingMicrosite($microsite)

$('#microsite').on('change', function() {
    let microsite = $(this).val()
    if (microsite == 'FINANCE') {
        $('#table-5').DataTable().clear()
        $('#table-5').DataTable().destroy()
        $('table').stickyTableHeaders('destroy');
        let _htmlHeader = `
                    <th>Created Date</th>
                    <th>Created By</th>
                    <th>Ticket Number</th>
                    <th>Invoice Number</th>
                    <th>PNR Number</th>
                    <th>Agent</th>
                    <th>Supplier Number</th>
                    <th>Hotel Name</th>
                    <th>Topic</th>
                    <th>PIC</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Potential Cost</th>
                    <th>Closed Date</th>
                    <th>Service Time</th>
            `
        $('#thead_closed').html(_htmlHeader)
        $('#table-5').DataTable({
            "pageLength": 50,
            "lengthMenu": [50, 100, 200],
        })
        $("table").stickyTableHeaders();

    } else if (microsite == 'CONTRACTING') {
        $('#table-5').DataTable().clear()
        $('#table-5').DataTable().destroy()
        $('table').stickyTableHeaders('destroy');
        let _htmlHeader = `
                    <th>Created Date</th>
                    <th>Created By</th>
                    <th>Ticket Number</th>
                    <th>Jarvis Id</th>
                    <th>City</th>
                    <th>Hotel Name</th>
                    <th>CM</th>
                    <th>Topic</th>
                    <th>Market</th>
                    <th>Validity</th>
                    <th>PIC</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Step</th>
                    <th>Due Date</th>
                    <th>Closed Date</th>
                    <th>Service Time</th>
            `
        $('#thead_closed').html(_htmlHeader)
        $('#table-5').DataTable({
            "pageLength": 50,
            "lengthMenu": [50, 100, 200],
        })
        $("table").stickyTableHeaders();
    }
})

function setHeaderAccordingMicrosite(microsite) {
    if (microsite == 'FINANCE') {
        let _htmlHeader = `
                    <th>Created Date</th>
                    <th>Created By</th>
                    <th>Ticket Number</th>
                    <th>Invoice Number</th>
                    <th>PNR Number</th>
                    <th>Agent</th>
                    <th>Supplier Number</th>
                    <th>Hotel Name</th>
                    <th>Topic</th>
                    <th>PIC</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Potential Cost</th>
                    <th>Closed Date</th>
                    <th>Service Time</th>
            `
        $('#thead_closed').html(_htmlHeader)

    } else if (microsite == 'CONTRACTING') {
        let _htmlHeader = `
                    <th>Created Date</th>
                    <th>Created By</th>
                    <th>Ticket Number</th>
                    <th>City</th>
                    <th>Jarvis Id</th>
                    <th>Hotel Name</th>
                    <th>CM</th>
                    <th>Topic</th>
                    <th>Market</th>
                    <th>Validity</th>
                    <th>PIC</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Step</th>
                    <th>Due Date</th>
                    <th>Closed Date</th>
                    <th>Service Time</th>
            `
        $('#thead_closed').html(_htmlHeader)
    }
}