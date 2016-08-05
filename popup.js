document.addEventListener('DOMContentLoaded', function() {
    addCurrentUrlToInput();
    addCurrentUrlToSpan();
    getComments();
});

function getCurrentTabUrl(){
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    return new Promise(function(resolve){
        chrome.tabs.query(queryInfo, function(tabs) {
            var tab = tabs[0];

            var url = tab.url;

            console.assert(typeof url == 'string', 'tab.url should be a string');

            resolve(url);
        });
    });
}

function addCurrentUrlToInput(){
    getCurrentTabUrl().then(function(url){
        $(".site-url").val(url);
    });
}


function addCurrentUrlToSpan(){
    getCurrentTabUrl().then(function(url){
        $(".url").text(url);
    });
}

function getComments(){
    getCurrentTabUrl().then(function(tab){
        var url = "http://rinput.herokuapp.com/comments/";
        $.ajax({
            url: url, 
            success: addComments,
            data: {
                site_url: tab
            }
        });
    });
}

function addComments(comments){
    var commentsList = comments.map(function(comment){
        return buildCommentListItem(comment);
    });
    $(".comments").append(commentsList);
}

function buildCommentListItem(comment){
    var liElement = document.createElement("li");
    var textNode = document.createTextNode(comment.message);
    liElement.appendChild(textNode);
    return liElement;
}
