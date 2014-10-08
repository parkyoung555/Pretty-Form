
function buttonEvents(){
	
	var availableTags = ["Smith & Associates","Meow & Co",
						 "Server Monkey","Microsoft",
						 "Dell Computers", "Hewlett Packard",
						 "ASUS", "Predictif",
						 "Xerox", "Apple Inc",
						 "Sun Microsystems","Best Buy",
						 "Seagate","Ebay",
						 "Amazon","Qualcomm",
						 "IBM", "Foxconn",
						 "Sony", "Panasonic",
						 "Samsung","Google",
						 "LG Electronics", "Intel"];
	var companyExist = false;
	
	/*Show notification box*/
	$("#clickme").click(function(){
		$("#screen").css({"visibility":"visible","opacity":".7"});
		$("#notification").css({"visibility":"visible","opacity":"1","width":"700px", "height":"580px"});
		$("#content").css({"height":"90%", "width":"90%"});
		
	});
	
	/*Close notification*/
	$("#close").click(function(){
		$("#screen").css({"opacity":"0","visibility":"hidden"});
		$("#notification").css({"opacity":"0","visibility":"hidden"});
		$("#content").css({"height":"100%", "width":"100%"});
		
		//clear form values
		$('#createCompanySite')[0].reset();
		$("#companyExist").css({"background-image":"none"});
		$("#companyExist").attr("title","");
		$("#companyType").attr("disabled", false);
		$("#companyWebsite").attr("disabled", false);
		$("#createdBy").attr("disabled", false);
	});

	$("#add").click(function(){
	if($("#siteName").val() == ""){
		$("#alert").html("<div id = 'exc'><div id = 'marg'>!</div></div><div id = 'cls'>&#215;</div>Please provide a Site Name");
		$("#cls").click(function(){$("#alert").css({"visibility":"hidden", "opacity":"0"});});
		$("#alert").css({"visibility":"visible", "opacity":"1"});
		setInterval(function(){$("#alert").css({"visibility":"hidden", "opacity":"0"});},5000);			
	}
	else if($("#geocomplete").val() == ""){
		$("#alert").html("<div id = 'exc'><div id = 'marg'>!</div></div><div id = 'cls'>&#215;</div>Please provide a Location");
		$("#cls").click(function(){$("#alert").css({"visibility":"hidden", "opacity":"0"});});
		$("#alert").css({"visibility":"visible", "opacity":"1"});
		setInterval(function(){$("#alert").css({"visibility":"hidden", "opacity":"0"});},5000);			
	}
	else{
		$("#screen").css({"opacity":"0","visibility":"hidden"});
		$("#notification").css({"opacity":"0","visibility":"hidden"});
		$("#content").css({"height":"100%", "width":"100%"});
		if($( "#companyName" ).val() == ""){
			$("#alert").html("<div id = 'check'><div id = 'marg'>&#10003;</div></div><div id = 'cls'>&#215;</div>Your Site, "+ $("#siteName").val() +", has been added successfully");
		}
		else{
			$("#alert").html("<div id = 'check'><div id = 'marg'>&#10003;</div></div><div id = 'cls'>&#215;</div>Your Site, "+ $("#siteName").val() +", has been added successfully<span style = 'margin-left:55px;display:block;'>under the company "+$("#companyName").val()+"</span>");
			if(!companyExist){
				availableTags.push($("#companyName").val());
			}
		}
		
		$("#cls").click(function(){$("#alert").css({"visibility":"hidden", "opacity":"0"});});
		$("#alert").css({"visibility":"visible", "opacity":"1"});
		setInterval(function(){$("#alert").css({"visibility":"hidden", "opacity":"0"});},5000);	
		
		//clear form values
		$('#createCompanySite')[0].reset();
		$("#companyExist").css({"background-image":"none"});
		$("#companyExist").attr("title","");
		$("#companyType").attr("disabled", false);
		$("#companyWebsite").attr("disabled", false);
		$("#createdBy").attr("disabled", false);
		
	}

		
	});
	
	/*Close when user clicks outside of notification box*/
	$("#screen").click(function(){
		$("#screen").css({"opacity":"0","visibility":"hidden"});
		$("#notification").css({"opacity":"0","visibility":"hidden"});
		$("#content").css({"height":"100%", "width":"100%"});
		//clear form values
		$('#createCompanySite')[0].reset();
		$("#companyExist").css({"background-image":"none"});
		$("#companyExist").attr("title","");
		$("#companyType").attr("disabled", false);
		$("#companyWebsite").attr("disabled", false);
		$("#createdBy").attr("disabled", false);
	});
	
	//For the site Location
	$("#geocomplete").geocomplete();

	//Check if Company exists already
	$( "#companyName" ).autocomplete({
      source: availableTags
    });
	//Change icon
	
	$("#companyName, .ui-autocomplete").bind('click keyup', function() {
		for(var i = 0; i < availableTags.length; i++){
			//Company Exists
			if($( "#companyName" ).val() == availableTags[i]){
				$("#companyExist").css({"background-image":"url('exist.png')"});
				$("#companyExist").attr("title",$( "#companyName" ).val()+ " is an existing Company.\nYou will be creating a site under "+ $( "#companyName" ).val());
				companyExist = true;
				$("#companyType").attr("disabled", true);
				$("#companyWebsite").attr("disabled", true);
				$("#createdBy").attr("disabled", true);
				break;
			}
			//Company input field empty
			else if($( "#companyName" ).val() == ""){
				$("#companyExist").css({"background-image":"none"});
				$("#companyExist").attr("title","");
				$("#companyType").attr("disabled", false);
				$("#companyWebsite").attr("disabled", false);
				$("#createdBy").attr("disabled", false);
			}
			//Company does not exist
			else{
				$("#companyExist").css({"background-image":"url('new.png')"});
				$("#companyExist").attr("title",$( "#companyName" ).val()+ " will be created as a new Company");
				$("#companyType").attr("disabled", false);
				$("#companyWebsite").attr("disabled", false);
				$("#createdBy").attr("disabled", false);
				companyExist = false;
			}
		}
		
	});
	
	//Token input for site types
	$('#addSiteTypes').tagsinput({
		typeahead: {
		source: ['Headquarters', 'Marketing', 'Personal', 'Buy'],
		freeInput: false
  }
});

//$("#companyName").autocomplete(availableTags);

}

if(window.attachEvent){window.attachEvent('onload', buttonEvents);}
else if(window.addEventListener){window.addEventListener('load', buttonEvents, false);}
else{document.addEventListener('load', buttonEvents, false);}