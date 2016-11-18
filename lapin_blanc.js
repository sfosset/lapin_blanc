function insertOverlayLapin(domain) {
  var overlay_lapin = document.createElement("div");
  overlay_lapin.setAttribute("class", 'overlay_lapin')

  var img = document.createElement("img");
  img.setAttribute("src", chrome.extension.getURL("img/lapin_tenniel.jpg"));
  overlay_lapin.appendChild(img);

  var p = document.createElement("p");
  p.innerHTML = `You already visited this <a href="/" id="override">website</a> not so long ago. Don't you have better things to do ?`;

  overlay_lapin.appendChild(p);

  document.body.appendChild(overlay_lapin);
}


function onNoList(error){
  browser.storage.local.set({list: []});
  var getting2 = browser.storage.local.get("list");
  getting.then(main, onNoList2);
}

function onNoList2(error){
  console.log(`Sorry, an error occured: ${error}`);
}

function main(result){
  result = result[0].list; // WTF pourquoi besoin de [0] ???????
  var len = result.length;
  if(len!=0){
    for(var i=0; i<len; i++){
      var entry = result[i];
      if(entry.hostname == window.location.hostname){
        var delta_last_visit = Math.floor(Date.now() / 1000)-entry.last_visit;
        console.log(delta_last_visit);
        console.log(entry.last_visit);
        if((delta_last_visit > entry.visit_time) && delta_last_visit < (entry.visit_time + entry.timeout)){
          insertOverlayLapin(entry.hostname);
          document.querySelector("#override").addEventListener("click", override);
          function override(e){ // Pas propre ?
            entry.last_visit = Math.floor(Date.now() / 1000);
            result[i]=entry
            browser.storage.local.set({list: result})
          }
        }
        else if (delta_last_visit >= entry.visit_time + entry.timeout){
          entry.last_visit = Math.floor(Date.now() / 1000);
          result[i]=entry
          browser.storage.local.set({list: result})
        }
        break;
      }
    }
  }
}

var getting = browser.storage.local.get("list");
getting.then(main, onNoList);
