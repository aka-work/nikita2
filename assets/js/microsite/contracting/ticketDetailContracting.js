var id = $('#category').val();
let id_div_sub = $('#div_sub_id').val();
let c_subdiv_id = $('#c_subdiv_id').val();
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

$.ajax({
    type: "POST",
    url: "/users/get_sub_division_users",
    data: { id: id_div_sub, c_subdiv_id },
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
let $btnLost = ($('#btn_lost')) ? $('#btn_lost') : ''
let $btnPartialWon = ($('#btn_partial_won')) ? $('#btn_partial_won') : ''
let $btnWonAndClose = ($('#btn_won_and_close')) ? $('#btn_won_and_close') : ''
let $btnSkipSS = ($('#btn_skip_stop_sale')) ? $('#btn_skip_stop_sale') : ''

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

$btnLost.on('click', function () {
    let ticketId = $('#ticket_id').val()
    let next_step = $('#next_lost').val()
    let status = $('#status_lost').val()
    let type = $('#type_lost').val()
    let current_step = $('#current_step').val()

    if (confirm(`are you sure want lost this ticket?`)) {
        $.ajax({
            type: "POST",
            url: "/ticket/subprocess/optional-lost",
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

$btnPartialWon.on('click', function () {
    let ticketId = $('#ticket_id').val()
    let next_step = $('#next_partial_won').val()
    let status = $('#status_partial_won').val()
    let type = $('#type_partial_won').val()
    let current_step = $('#current_step').val()

    if (confirm(`are you sure want partial won this ticket?`)) {
        $.ajax({
            type: "POST",
            url: "/ticket/subprocess/optional-partial-won",
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

$btnWonAndClose.on('click', function () {
    let ticketId = $('#ticket_id').val()
    let next_step = $('#next__won_and_close').val()
    let status = $('#status__won_and_close').val()
    let type = $('#type__won_and_close').val()
    let current_step = $('#current_step').val()

    if (confirm(`are you sure want won and close this ticket?`)) {
        $.ajax({
            type: "POST",
            url: "/ticket/subprocess/optional-won-and-close",
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

$btnSkipSS.on('click', function () {
    let ticketId = $('#ticket_id').val()
    let next_step = $('#next_skip_stop_sale').val()
    let status = $('#status_skip_stop_sale').val()
    let type = $('#type_skip_stop_sale').val()
    let current_step = $('#current_step').val()

    if (confirm(`are you sure want skip this ticket from stop sale?`)) {
        $.ajax({
            type: "POST",
            url: "/ticket/subprocess/optional-skip-stopsale",
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

$('#more_files').on('click', function () {

    let l = $('input[type=file][style]').length
    let arr_idx = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

    $("#attachment_reply" + arr_idx[l - 1])
        .removeAttr('style')
});

$('#reassign').select2()
$('span .select2-dropdown').css({ 'position': 'unset', 'color': 'red' })
