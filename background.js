onload =async () => {
    chrome.storage.session.get(['isLogin']).then(async (result) => {
        if (result.isLogin) {
            
            var [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
            console.log(activeTab.id);
            document.querySelectorAll('.container-3')[0].style.display = 'flex';
        }
        else {
            // window.location.href = "popup.html";
            var [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
            console.log(activeTab.id);
            document.querySelectorAll('.container-1')[0].style.display = 'flex';
            document.querySelectorAll('.container-3')[0].style.display = 'none';

        }
    })

    // const selection = 
    document.getElementById('bt').addEventListener('click', async function () {
        console.log("Button Clicked")
        
        var [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        console.log(activeTab.id);
        document.querySelectorAll('.container-2')[0].style.display = 'flex';
        document.querySelectorAll('.container-1')[0].style.display = 'none';
            document.querySelectorAll('.container-3')[0].style.display = 'none';

    })
    document.getElementById('activationForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log("Button Clicked")
        var input_value = document.getElementById('activationInput').value;
        var [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.tabs.sendMessage(tab.id, { action: "Start" ,message: input_value}, function (response) {
            console.log(response)
            if (response["data"] == true) {
                chrome.storage.session.set({ ["isLogin"]: response["data"] })
                chrome.storage.session.set({ ["uid"]: response["uid"] })
                window.location.href = "select.html";
                var [activeTab] = chrome.tabs.query({ active: true, currentWindow: true });
                console.log(activeTab.id);
                document.querySelectorAll('.container-4')[0].style.display = 'flex';
                document.querySelectorAll('.container-2')[0].style.display = 'none';
        document.querySelectorAll('.container-1')[0].style.display = 'none';
            document.querySelectorAll('.container-3')[0].style.display = 'none';
            }
            else {
                console.log("Invalid Activation Code")
            }
            ;
        })
    })

        document.getElementById('startTrack').addEventListener('click', async function () {
            console.log("Start Tracking")
            var uid;
            chrome.storage.session.getItem(["uid"], async function (result) {
                if (result["uid"] != null) {
                    var [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    chrome.tabs.sendMessage(tab.id, { action: "StartTracking" , uid :uid }, function (response) {
                        console.log(response)
                        var iframe = response.data;
                        console.log(iframe)
                        document.querySelector('.rectangle-14').innerHTML = iframe;
                        //graph
                    });
                }
            })
        })



    }
