$(document).ready(function(){
	setEventListeners();	
})

function setEventListeners(){
	$('#create-css').click(run);
}

function run(){
	var htmlText = getText();
	var classNames = findClassNames(htmlText);
	var uniqueClassNames = makeUnique(classNames);
	var css = createCSS(uniqueClassNames);
	displayCSS(css);
}

function makeUnique(classNames){
	var uniqueClassNames = []
	for(var i=0; i<classNames.length; i++){
		if (uniqueClassNames.indexOf(classNames[i]) == -1){
			uniqueClassNames.push(classNames[i]);
		}
	}
	return uniqueClassNames;
}

function createCSS(classNames){
	classNames.sort();
	var len = classNames.length;
	var css = "";
	for(var i=0; i<len; i++){
		css += '.' + classNames[i];
		css += "{}"
		css += "<br>"
	}
	return css
}

function getText(){
	return $('#htmlText').val();
}

function findClassNames(htmlText){
	var classHTMLForms = ["class=", "class ="];
	var len = htmlText.length;
	var classNames = [];
	for(var i=0; i<2; i++){
		var n = 0;
		while ( n != -1){
			var n = htmlText.indexOf(classHTMLForms[i], n+1);
			if (n != -1) {
				var classes = cleanClassNames(htmlText, n);
				classNames = classNames.concat(classes);
			}
		}
	}
	return classNames;
}

function cleanClassNames(htmlText, startLoc){
	var classNames = [];
	var numQuotes = 0;
	var i = startLoc;
	while(numQuotes < 2){
		if (htmlText[i] == "\"" || htmlText[i] == "\'"){
			numQuotes++
			if(numQuotes == 1){
				startLoc = i;
			}
		}
		i++
	}
	return htmlText.slice(startLoc + 1, i -1).split(" ");
}

function displayCSS(value){
	clearCSS();
	$("#css-template").append("<p>"+value+"</p>");
}

function clearCSS(){
	$("#css-template").children().remove();
}


