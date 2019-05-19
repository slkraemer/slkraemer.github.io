
function OpenModal(inputId)
{
    var modal = document.getElementById(inputId);
    modal.classList.add("is-active");
}

function CloseModal(inputId)
{
    var modal = document.getElementById(inputId);
    modal.classList.remove("is-active");
}