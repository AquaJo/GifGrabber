let getUrlsBtn = document.getElementById("btnHTMLToURLS");
let counterFind = 0;
let resArr = [];

let exportOptions = document.getElementById("exportOptions");
let galleryBtn = document.getElementById("galarySelectorBtn");
getUrlsBtn.addEventListener("click", function () {
  document.getElementById("secondSection").style.display = "block";

  // splitHTML temp; resArr all time
  let htmlArea = document.getElementById("HTMLArea");
  let urlsArea = document.getElementById("URLSArea")
  let stringHTML = htmlArea.value; // ()
  splitHTML = stringHTML.split("a href");
  for (let i = splitHTML.length - 1; i >= 0; --i) {
    splitHTML[i].includes("giphy.com")

    if (splitHTML[i].substring(0, 25).includes("https://giphy.com/gifs/") && i !== 0) {
      splitHTML[i] = splitHTML[i].split("data-giphy-id=")[1];
      splitHTML[i] = splitHTML[i].split("data-giphy-is-sticker=")[0] // NEEDED TO CHANGE HERE BECAUSE OF GIPHY WEBSITE CHANGE --> PROPER SOLUTION FOR ATTRIBUTE READING NEEDED FOR BEING MORE STABLE
      splitHTML[i] = splitHTML[i].substring(1, splitHTML[i].length - 2);
      //console.log(splitHTML[i])
    } else {
      splitHTML.splice(i, 1)
    }
  }

  let arrLengthBeforeBefore = resArr.length;
  resArr = resArr.concat(splitHTML);
  getUrlsBtn.innerText = "add new links";
  let gifNum = splitHTML.length;
  document.getElementById("urlsNumberP").innerText = "found " + gifNum + " gif urls";
  if (counterFind > 0) {
    let arrLengthBefore = resArr.length;
    resArr = uniq(resArr);
    let arrLengthAfter = resArr.length;
    let doublesNum = arrLengthBefore - arrLengthAfter;
    let newNum = arrLengthAfter - arrLengthBeforeBefore;
    document.getElementById("newLinksP").innerText = newNum + " new urls";
    document.getElementById("doubleLinksP").innerText = doublesNum + " doubled urls (not added)";
    document.getElementById("totalLinksP").innerText = arrLengthAfter + " total urls";
    if (newNum > 0 && galleryBtn.innerText.includes("close")) {
      deleteAndSetInitialGallery();
      updateGallery();
    }
  }
  //console.log("gifs detected: " + gifNum);
  // push to html
  let resVal = "";
  for (let i = 0; i < resArr.length; ++i) {
    //console.log(resArr[i])
    // generate url based on key
    let url = "https://i.giphy.com/media/" + resArr[i] + "/giphy.gif";
    resVal += url + '\n';
    
  }
  urlsArea.value = resVal;
  htmlArea.value = "";


  function uniq(a) {
    var prims = {
      "boolean": {},
      "number": {},
      "string": {}
    },
      objs = [];

    return a.filter(function (item) {
      var type = typeof item;
      if (type in prims)
        return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
      else
        return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
  }


  counterFind++;
})

let checkBoxSelects = document.getElementById("flexCheckIndeterminate");
let checkBoxPreviewMode = document.getElementById("flexCheckIndeterminate2");
checkBoxSelects.checked = false;
let galleryAll = document.getElementById("galleryAll");
let checkDiv = document.getElementById("checkDiv");
let checkDiv2 = document.getElementById("checkDiv2");
galleryBtn.addEventListener("click", function () {
  exportDetailsDiv.style.display = "none";
  if (galleryBtn.innerText.includes("open") && resArr.length > 0) {
    galleryAll.style.display = "block";
    exportOptions.style.display = "block";
    if (document.getElementById("flexCheckIndeterminate").checked) {
      updateGallery("selectAll");
    } else {
      selects = [];
    }
    galleryBtn.innerText = "close gallery selector";
    checkDiv.style.paddingLeft = "48px"; // ()
    checkDiv.style.display = "none";
    checkDiv2.style.display = "none";
    updateGallery();
    window.scrollTo({
      top: (document.documentElement.scrollTop || document.body.scrollTop) + 335,
      behavior: 'smooth'
    });
    // !
  } else {
    selects = [];
    galleryAll.style.display = "none";
    exportOptions.style.display = "none";
    galleryBtn.innerText = "open gallery selector";
    checkDiv.style.paddingLeft = "50px"; // ()
    checkDiv.style.display = "block";
    checkDiv2.style.display = "block";
    deleteAndSetInitialGallery();
  }
});

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


document.getElementsByTagName('img')
document.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 76) {
    // turn to white-mode
    document.body.style.backgroundColor = "rgb(255,255,255)";
    let p = document.getElementsByTagName("p");
    for (let i = 0; i < p.length; ++i) {
      p[i].style.color = "000";
    }
    let h4 = document.getElementsByTagName("h4");
    for (let i = 0; i < h4.length; ++i) {
      h4[i].style.color = "000";
    }
    let label = document.getElementsByTagName("label");
    for (let i = 0; i < label.length; ++i) {
      label[i].style.color = "000";
    }
    let a = document.getElementsByTagName("a");
    for (let i = 0; i < a.length; ++i) {
      a[i].style.color = "000";
    }
  }
});

function deleteAndSetInitialGallery() {
  let cloneElm = document.getElementById("exampleGalleryElm").cloneNode(true);
  galleryAll.replaceChildren(cloneElm);
}

let elem0Top = false;
let elemLastBottom = false;
let blockScrollUpdate = false;

let selects = [];

function updateGallery(mode) {
  let images = [];
  // clone template for all urls and make specific changes
  for (let i = 0; i < resArr.length; ++i) {
    let cloneElm = document.getElementById("exampleGalleryElm").cloneNode(true);
    cloneElm.children[1].dataSrc = checkBoxPreviewMode.checked ? "https://i.giphy.com/media/" + resArr[i] + "/giphy.gif" : "https://i.giphy.com/media/" + resArr[i] + "/giphy-preview.gif?rid=giphy-preview.webp&ct=g"; //"https://i.giphy.com/media/" + resArr[i] + "/giphy.gif";
    cloneElm.title = i;
    //console.log(cloneElm.children[0].children[0].dataSrc);
    cloneElm.style.display = "block";
    galleryAll.append(cloneElm);
    images.push(galleryAll.children[galleryAll.children.length - 1]);

    if (typeof selects[i] === 'undefined' && mode !== "selectAll") {
      selects.push(0);
    } else if (mode === "selectAll") {
      console.log("111")
      selects.push(1);
    }
    let descElm = cloneElm.children[2];
    let descCol = window.getComputedStyle(descElm).backgroundColor;
    if (selects[i] == 0) {
      descElm.style.backgroundColor = "rgb(184, 41, 61)";
    } else {
      descElm.style.backgroundColor = "#019875";
    }

    cloneElm.addEventListener("click", function () {
      let descElm = cloneElm.children[2];
      let descCol = window.getComputedStyle(descElm).backgroundColor;
      if (descCol === "rgb(184, 41, 61)") {
        descElm.style.backgroundColor = "#019875";
        selects[i] = 1;
      } else {
        descElm.style.backgroundColor = "rgb(184, 41, 61)";
        selects[i] = 0;
      }
    });
  }


  // only load images when needed .... so load only when visible in viewport and delete if not ...
  const imageDestroyed = new Map();

  let lastScrollTop = 0;
  let st;

  document.addEventListener('scroll', function () {
    st = window.pageYOffset || document.documentElement.scrollTop;
    updateLoadingSituation("");
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  });

  updateLoadingSituation("start");
  let blockScollDirection;

  function updateLoadingSituation(mode) {
    for (let i = 0; i < images.length; ++i) {
      let upperBorder = images[i].children[0];
      let lowerBorder = images[i].children[3]; // ()
      let img = images[i].children[1];

      if ((isInViewport(upperBorder) || isInViewport(lowerBorder)) && (blockScrollUpdate !== "first" || blockScrollUpdate !== true)) {
        if (imageDestroyed.get(i) === true || (mode && mode === "start")) {
          img.style.backgroundImage = "url(" + img.dataSrc + ")";
          //console.log("created instance: " + i)
        }
        imageDestroyed.set(i, false);
      } else {
        if (imageDestroyed.get(i) !== true && window.getComputedStyle(img).backgroundImage !== "") {
          imageDestroyed.set(i, true);

          //console.log("deleted instance: " + i)
          img.style.backgroundImage = 'none';

          img.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
          if (blockScrollUpdate === true) {
            if (st > lastScrollTop) {
              if (blockScollDirection === "up") {
                window.scrollBy({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'
                });
              }
            } else {
              if (blockScollDirection === "down") {
                window.scrollBy({
                  top: 0,
                  left: 0,
                  behavior: 'smooth'
                });
              }
            }
          }
        }
      }
    }


    // check coords viewport is between last img and first img to show arrows
    //let TOPVP = document.documentElement.scrollTop || document.body.scrollTop; // top viewport y co
    //let BOTTOMVP = (document.documentElement.clientHeight || window.innerHeight) + TOPVP;
    let HEIGHTVP = (/*document.documentElement.clientHeight || */window.innerHeight);
    elem0Top = images[0].getBoundingClientRect().top;
    elemLastBottom = images[images.length - 1].getBoundingClientRect().bottom;

    //let arrowUP = document.getElementById("arrowUP");
    //let arrowDOWN = document.getElementById("arrowDOWN");
    let arrowDiv = document.getElementById("arrowDiv");
    if (elem0Top < 0 && elemLastBottom - HEIGHTVP > 0) { // () ....
      arrowDiv.style.opacity = "1";
    } else {
      arrowDiv.style.opacity = "0";
      blockScrollUpdate = false;
    }


    if (blockScrollUpdate === "first") {
      if (st > lastScrollTop) {
        blockScollDirection = "down";
      } else {
        blockScollDirection = "up";
      }
      blockScrollUpdate = true;
    }
  }
}

let arrowUP = document.getElementById("arrowUP");
let arrowDOWN = document.getElementById("arrowDOWN");

arrowUP.addEventListener("click", function () {
  window.scrollBy({
    top: elem0Top - 80,
    left: 0,
    behavior: 'smooth'
  });
  blockScrollUpdate = "first";
})

arrowDOWN.addEventListener("click", function () {
  window.scrollBy({
    top: elemLastBottom - (/*document.documentElement.clientHeight || */window.innerHeight) + 50,
    left: 0,
    behavior: 'smooth'
  });
  blockScrollUpdate = "first";
})

let startIndexInp = document.getElementById("startIndexInp");
let endIndexInp = document.getElementById("endIndexInp");

let selectionURLS;
let returnSelectionUrlsBtn = document.getElementById("returnSelectionUrls");
let exportDetailsDiv = document.getElementById("exportDetails");
returnSelectionUrlsBtn.addEventListener("click", function () {
  let resURLS = [];
  let resVal = "";
  let startInpVal = parseInt(startIndexInp.value);
  let start = (startInpVal !== "" && startInpVal <= selects.length - 1 && startInpVal >= 0) ? startInpVal : 0;
  let endInpVal = parseInt(endIndexInp.value);
  let end = endInpVal !== "" && endInpVal <= selects.length - 1 && endInpVal >= 0 ? endInpVal : selects.length;
  console.log([start, end])
  for (let i = start; i < end + 1; ++i) {
    if (selects[i] == 1) {
      resURLS.push("https://i.giphy.com/media/" + resArr[i] + "/giphy.gif");
      resVal += resURLS[resURLS.length - 1] + "\n";
    }
  }
  document.getElementById("URLSSelectedArea").value = resVal;
  selectionURLS = resURLS;
  if (resURLS.length > 0) {
    exportDetailsDiv.style.display = "block";
  }
})

document.getElementById("copyNormUrls").addEventListener("click", function () {
  let urls = [];
  for (let i = 0; i < resArr.length; ++i) {
    urls.push("https://i.giphy.com/media/" + resArr[i] + "/giphy.gif");
  }
  navigator.clipboard.writeText(toCopyFormatArray(urls));
})

document.getElementById("copySelection").addEventListener("click", function () {
  navigator.clipboard.writeText(toCopyFormatArray(selectionURLS));
})
function toCopyFormatArray(arr) {
  let res = "";
  for (let i = 0; i < arr.length; ++i) {
    if (i == arr.length-1) {
      res += "'"+arr[i]+"'";
    } else {
      res += "'"+arr[i]+"',";
    }
  }
  return res;
}
let downloadBtn = document.getElementById("downloadSelectionUrls");
let downloading = false;
downloadBtn.addEventListener("click", async function () {
  if (!downloading) {
    downloading = true;
    downloadBtn.innerText = "creating zip ..."
    var zip = new JSZip();
    for (let i = 0; i < selectionURLS.length; ++i) {
      let image = await fetch(selectionURLS[i]);
      image = image.blob();
      zip.file("file" + i + ".gif", image);
      console.log(i);
    }
    zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6
      }
    }).then(function (content) {
      saveAs(content, "GiphyExtractorGifs.zip");
      downloading = false;
      downloadBtn.innerText = "download these gifs";
    });
  }
})
