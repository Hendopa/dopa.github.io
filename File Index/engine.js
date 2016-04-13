var y, x, xy, xy3, codeMirror, codeMirrorValue;
var isLocked = false;

function countSpaces(str, mode) {
	if (str.substring(0, 2) == "  " && mode == 1) {
		return 1 + countSpaces(str.substring(2, str.length), 1);
	}
	else if (str.substring(0, 1) == "	" && mode == 2) {
		return 1 + countSpaces(str.substring(1, str.length), 2);
	}
	else {
		return 0;
	}
}


function toggleCodeMirror() {
	if (document.getElementById("syntaxHilite").checked) {
		(document.body.getElementsByClassName("CodeMirror")[0].style.display = "none", document.getElementById("code1").style.display = "block");
		var splittedText = codeMirror.getValue().split("\n");
		var numOfTabsPerLine = new Array();
		for (var i = 0; i < splittedText.length; i++) {
			numOfTabsPerLine[i] = countSpaces(splittedText[i], 1);
		}
		for (var i = 0; i < splittedText.length; i++) {
			splittedText[i] = splittedText[i].substring((2 * numOfTabsPerLine[i]), splittedText[i].length);
			for (var k = 0; k < numOfTabsPerLine[i]; k++) {
				splittedText[i] = "\t" + splittedText[i];
			}
		}
		document.getElementById("code1").value = splittedText.join("\n");
		document.getElementById("editorLabel").innerHTML = "Enable syntax highlighting";
	}
	else {
		(document.body.getElementsByClassName("CodeMirror")[0].style.display = "block", document.getElementById("code1").style.display = "none");
		var splittedText = document.getElementById("code1").value.split("\n");
		var numOfTabsPerLine = new Array();
		for (var i = 0; i < splittedText.length; i++) {
			numOfTabsPerLine[i] = countSpaces(splittedText[i], 2);
		}
		for (var i = 0; i < splittedText.length; i++) {
			for (var k = 0; k < numOfTabsPerLine[i]; k++) {
				splittedText[i] = splittedText[i].substring(1, splittedText[i].length);
				splittedText[i] = "  " + splittedText[i];
			}
		}
		codeMirror.setValue(splittedText.join("\n"));
		document.getElementById("editorLabel").innerHTML = "Disable syntax highlighting";
	}
}

function startit() {
	document.getElementById("syntaxHilite").checked ? (view.document.open(), view.document.write(document.getElementById("code1").value), view.document.close(), document.getElementById("titletext").innerHTML = "" + view.document.title) : (view.document.open(), view.document.write(codeMirror.getValue()), view.document.close(), document.getElementById("titletext").innerHTML = "" + view.document.title);
}

function disenable() {
	var a = document.getElementById("disunable").checked,
		b = document.getElementById("titletext");
	a ? (document.getElementById("titletext").style.visibility = "hidden") : (document.getElementById("titletext").style.visibility = "visible");
	a ? (document.getElementById("titleLabel").innerHTML = "Enable title") : (document.getElementById("titleLabel").innerHTML = "Disable title");
	
}

function reset() {
	(document.getElementById("code1").value = '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>\n\t\t\tHello World\n\t\t</title>\n\t\t<script type="text/javascript">\n\t\t\t\n\t\t</script>\n\t\t<style>\n\t\t\th1 {\n\t\t\t\ttext-align: center;\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<h1>\n\t\t\tHello World!\n\t\t</h1>\n\t\t<p>\n\t\t\tThis is a test page\n\t\t</p>\n\t</body>\n</html>', codeMirror.setValue('<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>\n\t\t\tHello World\n\t\t</title>\n\t\t<script type="text/javascript">\n\t\t\t\n\t\t</script>\n\t\t<style>\n\t\t\th1 {\n\t\t\t\ttext-align: center;\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<h1>\n\t\t\tHello World!\n\t\t</h1>\n\t\t<p>\n\t\t\tThis is a test page\n\t\t</p>\n\t</body>\n</html>'), statusline("code reset", "green"));
}

function save(code) {
	var b = new Blob([code]);
	saveAs(b, "untitled.html");
}



function init() {

/*document.title = "Nyekrip Yuk - " + "Nyekrip Web Tutorial Indonesia";*/

	setInterval('document.getElementById("titletext").innerHTML=""+view.document.title;', 500), codeMirror = CodeMirror.fromTextArea(document.getElementById("code1"), {
		lineNumbers: !0,
		matchBrackets: !0,
		lineWrapping: true,
		mode: "text/html",
		lineNumbers: true,
		styleActiveLine: true,
        tabSize: 4,
        indentUnit: 4,
        indentWithTabs: true,
        
		wordWrap: true,
		autoCloseTags: false,
		matchTags: {bothTags: true},
		extraKeys: {"Ctrl-J": "toMatchingTag"},
		
		matchBrackets: true,
 
		extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
		foldGutter: true,
		gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
		extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      }
	});

	var d = codeMirror.addLineClass(0, "background", "activeline");
	codeMirror.on("cursorActivity", function() {
		var cur = codeMirror.getLineHandle(codeMirror.getCursor().line);
		if (d != cur) {
			codeMirror.removeLineClass(d, "background", "activeline"), d = codeMirror.addLineClass(cur, "background", "activeline");
		}
		codeMirror.matchHighlight("CodeMirror-matchhighlight");
	});
	codeMirror.setOption("theme", "default"), startit();
	document.getElementById("code1").addEventListener("keydown", function (e) {
		if (e.keyCode == 9) {
			e.preventDefault();
			var t = e.target;
			var ss = t.selectionStart;
			var se = t.selectionEnd;
			t.value = t.value.slice(0, ss).concat("\t").concat(t.value.slice(ss, t.value.length));
			if (ss == se) {
				t.selectionStart = t.selectionEnd = ss + 1;
			} else {
				t.selectionStart = ss + 1;
				t.selectionEnd = se + 1;
			};
		};
	}, false);
	var paragraph = document.createElement("p");
	document.body.appendChild(paragraph);
}
window.onload = init;