document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('save_url').addEventListener('click', saveUrlInputValue);
  document.getElementById('save_token').addEventListener('click', saveTokenInputValue);
  populateInputValue();
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
      if (response.ok) {
        nameInput.value = "";
        catergoryInput.value = "";
        console.log(`${response} response`);
        // alert(response.object);
      } else {
        // alert(response.text());
          displaySuccessMessage(`${response["object"]}`, "green")
        console.log(`${response} sent to the endpoint successfully`);
      }});
  } else {
	  alert('Add url to send bookmark');
  }


}

function displaySuccessMessage(message, color) {
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

bookmark = document.getElementById("bookmark");
bookmark_online = document.getElementById("bookmark_online");
bookmark_local = document.getElementById("bookmark_local");
bookmark_online_local = document.getElementById("bookmark_online_local");
add_spotify_artist = document.getElementById("add_spotify_artist");
add_spotify_soundtrack = document.getElementById("add_spotify_soundtrack");
add_spotify_podcasts = document.getElementById("add_spotify_podcasts");


bookmark.addEventListener("click", function () {
  getTab("bookmark");
});

bookmark_online.addEventListener("click", function () {
  getTab("bookmark_online");
});

bookmark_local.addEventListener("click", function () {
  getTab("bookmark_local");
});

bookmark_online_local.addEventListener("click", function () {
  getTab("bookmark_online_local");
});

add_spotify_artist.addEventListener("click", function () {
  getTab("add_spotify_artist");
});

add_spotify_soundtracks.addEventListener("click", function () {
  getTab("add_spotify_soundtracks");
});

add_spotify_podcasts.addEventListener("click", function () {
  getTab("add_spotify_podcasts");
});