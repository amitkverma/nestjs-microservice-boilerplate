const SPLIT_KEY = " ";
window.uploadedMedias = [];
const UPLOAD_URL = `http://spotlyt-dev.consultbae.com:7004/upload/media`;

const createElement = (elementType, className) => {
    const ele = document.createElement(elementType);
    ele.classList.add(...className.split(SPLIT_KEY));
    return ele;
}

const loadMediaList = async () => {
  const eventId = "66354842-2883-4678-b87f-97160c7d5a65";
  const url = `http://spotlyt-dev.consultbae.com:3000/employee-media/event/${eventId}?take=4&skip=0&status=Review`;
  const eventMediasContainer = document.querySelector("#eventMedias");
  const data = await fetch(url)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => {
      console.log("err: ", err);
    });

  for (const media of data?.medias) {
    const containerEle = createElement('div', "col-sm-12 col-lg-3 p-0 my-2");
    const cardBodyEle = createElement('div', "p-3"); document.createElement("div");

    const mediaNameEle = createElement("p", "media-card-title p-0 m-0");
    mediaNameEle.innerText = media?.medias?.[0]?.originalname;

    const mediaMimeParentEle = createElement("p", "media-card-desc p-0 m-0 text-muted");
    mediaMimeParentEle.innerText = `Media Type: `;

    const mediaMimeTypeEle = createElement("span", "text-dark mime-type");
    mediaMimeTypeEle.innerText = media?.medias?.[0]?.mimeType;

    mediaMimeParentEle.appendChild(mediaMimeTypeEle);
    cardBodyEle.appendChild(mediaNameEle);
    cardBodyEle.appendChild(mediaMimeParentEle);

    const cardEle = createElement("div", "event-card mx-3");

    if (media?.medias?.[0]?.mimeType.startsWith("image")) {
      const mediaImageEle = createElement("img", "basic-image w-100 event-list-img");
      mediaImageEle.src = media?.medias?.[0]?.url;
      mediaImageEle.onerror = () => {
        mediaImageEle.src =
          "https://user-images.githubusercontent.com/114392220/209462197-2cb6dac6-401b-4408-93fa-e4c59f259127.png";
      };
      cardEle.appendChild(mediaImageEle);
    }

    cardEle.appendChild(cardBodyEle);
    containerEle.appendChild(cardEle);
    eventMediasContainer.appendChild(containerEle);
  }
};


const openUpload = () => {
  console.log("openUpload")
  const formUpload = document.querySelector("#mediaUploadHtml");
  formUpload.click();
}

const removeUploadedImage = (index) => {
  // remove and update
  console.log(`index: `, index);
  window.uploadedMedias.splice(index, 1);
  updateMediaList();
}


const updateMediaList = () => {
  const mediaContainer = document.querySelector("#uploadedMediaContainer");
  mediaContainer.innerHTML = '';
  console.log(`uploadedMedias render: `, uploadedMedias);

  window.uploadedMedias.map((mediaItem, index) => {
    console.log(`mediaItem.fileName: `, mediaItem.originalname);
    const mediaItemEle = createElement('div', "upload-item mb-3");
    const mediaItemNameEle = createElement('p', 'text-center');
    mediaItemNameEle.innerText = mediaItem.originalname;
    const removeIconEle = createElement('i', 'bi bi-x-circle');
    removeIconEle.onclick = () => {
      removeUploadedImage(index);
    }
    mediaItemEle.appendChild(mediaItemNameEle);
    mediaItemEle.appendChild(removeIconEle);
    mediaContainer.appendChild(mediaItemEle);
  });
}

const mediaUpload = async () => {
  const formUpload = document.querySelector("#mediaUploadHtml");
  console.log(`formUpload: `, formUpload.files);

  // set upload button to disabled
  // innertext to uploading...
  const proxyButton = document.querySelector("#proxyUploadButton");
  proxyButton.innerText = "Uploading...";
  proxyButton.disabled = true;

  const uploadedMediasResponses = [];

  for(const file of formUpload.files){
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(res => res);
    console.log(`response: `, response);

    uploadedMediasResponses.push(response);
  }

  console.log(`current medias: `, uploadedMedias);
  console.log(`server uplaoded media this round:L `, uploadedMediasResponses)

  proxyButton.innerText = "Upload";
  proxyButton.disabled = false;
  window.uploadedMedias = [...window.uploadedMedias, ...uploadedMediasResponses];

  updateMediaList();
}


const submitMedias = ( ) => {
  console.log(`Submitting Medias: ....`, window.uploadedMedias);
}


window.onload = async () => {
  loadMediaList();
};
