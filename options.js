function saveOptions(e) {
    var i =0;
    var new_list = [];
    lhostname = document.querySelector("#hostname-0");
    lvisit_time = document.querySelector("#visit_time-0");
    ltimeout = document.querySelector("#timeout-0");
    while(lhostname != null){
      if(lhostname.value != ""){
        new_list.push({hostname: lhostname.value, visit_time: parseInt(lvisit_time.value, 10), timeout: parseInt(ltimeout.value, 10), last_visit: 0});
      }
      i = i + 1;
      lhostname = document.querySelector("#hostname-"+i);
      lvisit_time = document.querySelector("#visit_time-"+i);
      ltimeout = document.querySelector("#timeout-"+i);
    }
    browser.storage.local.set({list: new_list});
}

function buildPage(result){
  result = result.list;
  var len = result.length;
  if(len==0){
    createInputRow(0, "", "", "");
  }
  else {
    for(var i=0; i<len; i++){
      var entry = result[i];
      createInputRow(i, entry.hostname, entry.visit_time, entry.timeout)
    }
    createInputRow(len, "", "", "");
  }
}

function createInputRow(id, hostname, visit_time, timeout){
  var tr = document.createElement("tr");

  var td1 = document.createElement("td");
  tr.appendChild(td1);
  var input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("id", 'hostname-'+id);
  input1.setAttribute("value", hostname);
  td1.appendChild(input1);

  var td2 = document.createElement("td");
  tr.appendChild(td2);
  var input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("id", 'visit_time-'+id);
  input2.setAttribute("value", visit_time);
  td2.appendChild(input2);

  var td3 = document.createElement("td");
  tr.appendChild(td3);
  var input3 = document.createElement("input");
  input3.setAttribute("type", "text");
  input3.setAttribute("id", 'timeout-'+id);
  input3.setAttribute("value", timeout);
  td3.appendChild(input3);

  var table = document.querySelector("#website_list").appendChild(tr)
}

function onNoList(error){
  browser.storage.local.set({list: [{hostname: "facebook.com", visit_time: 0, timeout: 0, last_visit: 0}]});
  var getting2 = browser.storage.local.get("list");
  getting.then(buildPage, onNoList2);
}

function onNoList2(error){
  p = document.createElement("p");
  p.textContent = `Sorry, an error occured: ${error}`;
  document.querySelector("#website_liste").appendChild(p);
}

document.querySelector("form").addEventListener("submit", saveOptions);
var getting = browser.storage.local.get("list");
getting.then(buildPage, onNoList);
