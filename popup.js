document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save_url').addEventListener('click', saveUrlInputValue);
  // document.getElementById('save_token').addEventListener('click', saveTokenInputValue);
  populateInputValue();
  populateInputName();
});

function getTab(from) {
 return chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
     sendToServer(from, tabs[0].url, tabs[0].favIconUrl, tabs[0].title);
  });
}

function getIcon() {
  return chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
     getTabIcon(tabs[0].id)
  });
}

function getTitle() {
  return chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
     tabs[0].title;
  });
}


function sendToServer(from,url, icon, title ) {

  
  var nameInput = document.getElementById("nameInput").value;
  var catergoryInput = document.getElementById("catergoryInput").value;

  if (catergoryInput === "" || catergoryInput == null) {
      catergoryInput = "uncategorized"
  }

  if (nameInput === "" || nameInput == null) {
      nameInput = title
  }

  const payload = {
    url: url,
    title: title,
    icon: icon,
    from: from,
    name: nameInput,
    category: catergoryInput
  };

 console.log("Payload:", payload);

  //const postEndpoint = "http://localhost:5000/makhadoni/api/utils";
   
    var postEndpoint = localStorage.getItem('savedUrl')

    var jwtToken = localStorage.getItem('token')

   if (postEndpoint) {
  // Send the text to the POST endpoint
    fetch(`${postEndpoint}?token=${jwtToken}`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then( response => {
                console.log(`${response} xxxxx`);
      if (response.ok) {
        nameInput.value = "";
        catergoryInput.value = "";
        console.log(`${response} response`);
        // alert(response.object);
      } else {
        // alert(response.text());
          console.log(`${response} sent to the endpoint successfully`);
          displaySuccessMessage(`${response}`, "green")
      }});
  } else {
	  alert('Add url to send bookmark');
  }


}

function displaySuccessMessage(message, color) {
    document.getElementById("success-container").remove();
    document.getElementById("p").remove();
    var container = document.getElementById("success-container");
    var paragraph = document.createElement("p");
    paragraph.style.color = color;
    paragraph.textContent = message;
    container.appendChild(paragraph);
}
function getTabIcon(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    const tabIcon = tab.favIconUrl;
    console.log("Tab Icon URL:", tabIcon);

  });
}

function saveUrlInputValue() {
  var urlInput = document.getElementById('urlInput');
  var inputValue = urlInput.value;

  localStorage.setItem('savedUrl', inputValue);

  // Set the input value to the saved bookmark
  urlInput.value = inputValue;

  alert('url saved: ' + inputValue);
      console.log(`${inputValue} saved`);
}

function saveTokenInputValue() {
  var tokenInput = document.getElementById('tokenInput');
  var inputValue = tokenInput.value;

  localStorage.setItem('token', inputValue);
  tokenInput.value = inputValue;

  alert('token saved: ' + inputValue);
}

function populateInputValue() {
  var savedUrl = localStorage.getItem('savedUrl');
      console.log(`${savedUrl} loaded`);
  if (savedUrl) {
    // Set the input value if a bookmark is saved
    document.getElementById('urlInput').value = savedUrl;
  }
}

function populateInputName() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var name =  tabs[0].title;
        console.log(`${name} loaded`);
        if (name) {
        document.getElementById('nameInput').value = name;
        }
  });

}

bookmark = document.getElementById("bookmark");
application = document.getElementById("application");
download_spotify = document.getElementById("download_spotify");

application.addEventListener("click", function () {
  getTab("application");
});

bookmark.addEventListener("click", function () {
  getTab("bookmark");
});
// download_spotify.addEventListener("click", function () {
//   getTab("download spotify");
// });