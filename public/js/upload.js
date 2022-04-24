document.getElementById("imageUpload").onclick = function () {
    let xhttp = new XMLHttpRequest();

    const selectImage = document.getElementById('selectImage');
    const imageStatus = document.getElementById('imageStatus');
    const uploadUrl = document.getElementById('uploadUrl');

    xhttp.onreadystatechange = function () {
        imageStatus.innerHTML = this.responseText;
    }

    xhttp.open("POST", '/dashboard/image-upload');
    xhttp.upload.onprogress = function(e) {
        if(e.lengthComputable) {
            let loadPercent = Math.floor((e.loaded/ e.total)*100);
            imageStatus.innerHTML = `%${loadPercent}`;
        }
    }
    
    let formData = new FormData();

    if (selectImage.files.length > 0) {
        formData.append('image', selectImage.files[0]);
        xhttp.send(formData);
    } else {
        imageStatus.innerHTML = "Please select an image to upload";
    }


}