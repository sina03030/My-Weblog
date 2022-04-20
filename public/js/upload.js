document.getElementById("imageUpload").onclick = function () {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.status == 200) {
            document.getElementById('imageStatus').innerHTML = this.responseText;
        } else {
            document.getElementById('imageStatus').innerHTML = "something went wrong from server";
        }
    }

    xhttp.open("POST", '/dashboard/image-upload');
    let formData = new FormData();

    formData.append('image', document.getElementById('selectedImage').files[0]);
    xhttp.send(formData);
}