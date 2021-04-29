import $ from 'jquery';
function filter(fieldId, tbodyId) {
    $(fieldId).on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(tbodyId).filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
};

export default {
    filter
}