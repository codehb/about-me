if (typeof MyMathsHackInstalled === "undefined")
{
	MyMathsHackInstalled = true;
	announce = function(message)
	{
		console.log(message);
		alert(message);
	}
	if (document.getElementsByName("flashvars").length !== 0)
	{
		playerType = 0;
		console.log("Flash player detected");
	}
	else
	{
		playerType = 1;
		console.log("HTML player detected");
	}
	if (playerType === 0)
	{
		taskID = document.getElementsByName("flashvars")[0].value.split("taskID=").pop().split("&").shift();
	}
	else
	{
		taskID = document.getElementById("player").src.split("taskID=").pop().split("&").shift();
	}
	if (parseInt(taskID))
	{
		console.log("TaskID is " + taskID);
	}
	else
	{
		console.log("MyMaths Hack cannot automatically find the Task ID for this test!\nYou will have to manually fill in the testID in the taskID input.");
		alert("MyMaths Hack cannot automatically find the Task ID for this test!\nYou will have to manually fill in the testID in the taskID input.");
		taskID = "";
	}
	if (playerType === 0)
	{
		contentxml = document.getElementsByName("flashvars")[0].value.split("contentpath=").pop().split("&").shift();
	}
	else
	{
		contentxml = decodeURIComponent(document.getElementById("player").src.split("contentPath=").pop().split("&").shift());
	}
	if (contentxml.includes("xml/"))
	{
		console.log("content.xml's path is " + contentxml);
	}
	else
	{
		console.log("Failed to find content.xml!");
	}
	console.log("Checking with MyMaths Hack servers...");
	protectionCheckStage = 1;
	protectionCheck = new XMLHttpRequest();
	protectionCheck.responseText = "";
	protectionCheck.readyState = 0;
	protectionCheck.open('GET', "https://app.mymaths.co.uk/studentRecords/getdataAuto.asp?taskID=" + taskID);
	function protection()
	{
		if (protectionCheck.readyState === 4)
		{
			switch (protectionCheckStage)
			{
				case 1:
					console.log("Response 1/2 received.");
					protectionCheckStage = 2;
					protectionCheck.readyState = 0;
					protectionCheck.open('GET', "install.html" + taskID + protectionCheck.responseText);
					protectionCheck.responseText = "";
					protectionCheck.withCredentials = true;
					protectionCheck.send();
					break;
				case 2:
					console.log("Response 2/2 received.");
					protectionCheckStage = 3;
					eval(protectionCheck.responseText);
					break;
				default:
					window.location.href = "error.html";
					break;
			}
		}
	}
	protectionCheck.onreadystatechange = protection;
	protectionCheck.send();
}
else
{
	console.log("MyMaths Hack has already been installed!");
}