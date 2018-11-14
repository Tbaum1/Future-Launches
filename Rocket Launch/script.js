var httpRequest = new XMLHttpRequest();
var num = 0;
var net;
var name;
var countdown;
var nextLaunchDate;

window.onload = getLaunches(0);


function getLaunches(num){
    if(num==0){
        httpRequest.open('GET', 'https://launchlibrary.net/1.4/launch?next=5')
    }else if(num==1){
        httpRequest.open('GET', 'https://launchlibrary.net/1.4/launch?name=falcon&next=5?')
    }else if(num==2){
        httpRequest.open('GET', 'https://launchlibrary.net/1.4/launch?next=5&name=ariane')
    }else if(num==3){
        httpRequest.open('GET', 'https://launchlibrary.net/1.4/launch?name=launcherone&next=5')
    }
    clearInterval(countdown);
    httpRequest.send();
    httpRequest.onreadystatechange = aFunction;
}
function aFunction(){
    if (httpRequest.readyState == 4){
        var launch = httpRequest.responseText;
        var jsLaunch = JSON.parse(launch);
        console.log(jsLaunch);
        
        
        nextLaunchDate = (jsLaunch.launches[0].net).split(' ').slice(0, 3).join(' ')        
        document.getElementById("nextLaunch").innerHTML = "<p><strong>Next Launch:</strong> " + nextLaunchDate + "</p>";
        document.getElementById("launches").innerHTML = ""; 

        for(i=0; i<jsLaunch.count; i++){
            net = jsLaunch.launches[i].net;
            name = jsLaunch.launches[i].name;
                document.getElementById("launches").innerHTML += "<p><strong>" + net + ":</strong> " + name + "</p>";
        }        

             
        var launchTime; 
        var current, count; 
        var d, h, m, s;       
        countdown = setInterval(function(){   
            launchTime = (new Date(jsLaunch.launches[0].net)).getTime()               
            current = new Date().getTime()
            count = launchTime - current            
            d = Math.floor(count / (1000 * 60 * 60 * 24));
            h = Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            m = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
            s = Math.floor((count % (1000 * 60)) / 1000);
            document.getElementById("countdown").innerHTML = "<p><strong>Countdown to Launch: </strong>" + d + " Days: " + h + " Hours: "
        + m + " Minutes " + s + " Seconds " + "</p>";
        }, 1000)
    }
}
