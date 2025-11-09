/* jshint esversion: 6 */

function list(type) {
    document.writeln("<" + type + "l>");
    for (var i = 1; i < list.arguments.length; i++) {
        document.writeln("<li>" + list.arguments[i] + "</li>");
    }
    document.writeln("</" + type + "l>");
}


