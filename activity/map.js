
function ShowMapPreview() {
 
    var mapContainer = document.createElement("DIV");
    mapContainer.id = "map";
    mapContainer.style.width = "100%";
    mapContainer.style.height = "500px";
    mapContainer.style.position = "relative";  // 추가: 위치를 상대적으로 설정
            mapContainer.style.zIndex = "9999";
    
    var mapIframe = document.createElement("iframe");
    mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13048.3774706968!2d129.0407130871582!3d35.1542672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568eb701e894e1b%3A0xd34d4a33cae9ec22!2z642U7KGw7J2A7Lu07ZOo7YSw7JWE7Lm0642w66-47ZWZ7JuQIOu2gOyCsOyEnOuptOygkA!5e0!3m2!1sko!2skr!4v1686553293728!5m2!1sko!2skr";
    mapIframe.width = "100%";
    mapIframe.height = "450";
    mapIframe.style.border = "0";
    mapIframe.allowFullscreen = true;
    mapIframe.loading = "lazy";
    mapIframe.referrerPolicy = "no-referrer-when-downgrade";
    
    var overllyBox = document.createElement("DIV");
    overllyBox.className = "blur_overlly_box";
    overllyBox.id = "blur_overlly_box_map";
    overllyBox.appendChild(mapIframe);

    var closeButton = document.createElement("a");
    closeButton.className = "image_close_btn";
    closeButton.innerHTML = "&times;";
    closeButton.id = "blur_image_box_close_btn";
    closeButton.setAttribute("onclick", "CloseMapPreview();");

    document.body.appendChild(mapContainer);
    document.body.appendChild(closeButton);
    document.body.appendChild(overllyBox);
    mapContainer.appendChild(mapIframe);
    $(overllyBox).fadeIn(200);
    $(closeButton).fadeIn(200);
    $(mapContainer).fadeIn(200);
    $(mapIframe).fadeIn(200);
}
function CloseMapPreview() {
    $("#blur_overlly_box_map").fadeOut(200);
    $("#map").fadeOut(200);
    $("#blur_image_box_close_btn").fadeOut(200);
    setTimeout(function() {
        $("#blur_overlly_box_map").remove();
        $("#map").remove();
        $("#blur_image_box_close_btn").remove();
    }, 250);
}