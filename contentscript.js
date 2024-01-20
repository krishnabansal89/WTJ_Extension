chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "Start") {
        console.log("Start")
        var input_value = request.message;
        fetch("localhost:3000/extension/verify", {
            method: "POST",
            body: JSON.stringify({
                "activation_code": input_value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data["verify"] == "true") {
                    sendResponse({ data: true , uid: data["uid"]});
                }
                else {
                    sendResponse({ data: false  , uid: null });
                }
            })
            .catch(error => {
                console.log(error)
                sendResponse({ data: false });
            })

    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "StartTracking") {
        console.log("StartTracking")
        var uid = request.uid;
        var [activeTab] = chrome.tabs.query({ active: true, currentWindow: true });
        var url = activeTab ? activeTab.url : '';
        fetch("localhost:3000/extension/search", {
            method: "POST",
            body: JSON.stringify({
                "url": url
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data['data'])
                    sendResponse({ data: data['data']});
            })
            .catch(error => {
                console.log(error)
                sendResponse({ data: null });
            })

    }
})

