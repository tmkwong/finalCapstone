let elementsID = ["homepage_banner", "intro"];

// A function to create a save button for an element
function createSaveButton(child) {

    const span = document.createElement("span");
    span.setAttribute("class", "save");
    span.textContent = sessionStorage.getItem(child.id) === null ? "save" : "\u2713 saved";  // dynamically shows save/saved by reading the session storage

    span.addEventListener("click", (event) => {
        if (event.target.textContent === "save") {
            // toggle on "saved", add the innerHTML of the entire parent element and the class name to session storage 
            event.target.textContent = "\u2713 saved";
            sessionStorage.setItem(child.id, JSON.stringify([child.innerHTML, child.className]));
        } else {
            // toggle off "saved", remove the parent element from session storage
            event.target.textContent = "save";
            sessionStorage.removeItem(child.id);
        }
        console.log(Object.keys(sessionStorage));  // for quick debugging
        // Do not count comments, messages and likes
        savedCount = Object.keys(sessionStorage).reduce((accumulator, key) => {
            if (key.indexOf("comment") == -1 && key.indexOf("message") == -1 && key.indexOf("_like") == -1) {
                return accumulator + 1;
            } else {
                return accumulator;
            }
        }, 0);
        alert(`You just ${sessionStorage.getItem(child.id) === null ? "remove" : "saved"} an item. You have ${savedCount} item(s) saved in total`) ;
    });

    child.appendChild(span);
}

// A function to create a like button for an element
function createLikeButton(child) {

    const likeButton = document.createElement("button");
    likeButton.setAttribute("id", child.id + "_like");
    likeButton.setAttribute("class", "like");
    likeButton.textContent = Object.keys(sessionStorage).includes(likeButton.id) ? "liked" : "like"  // dynamically shows like/liked by reading the session storage

    likeButton.addEventListener("click", (event) => {
        if (event.target.textContent === "like") {
            // toggle on "liked", add "parent_id + _liked" to the session storage to mark it as liked
            event.target.textContent = "liked";
            sessionStorage.setItem(event.target.id, "liked");
        } else {
            // toggle off "liked", remove "parent_id + _liked" from session storage to indicate it's not liked
            event.target.textContent = "like";
            sessionStorage.removeItem(event.target.id);
        }
        console.log(Object.keys(sessionStorage));  // for quick debugging
    })

    child.appendChild(likeButton);
}

// Add save and like buttons to content elements
for (const id of elementsID) {
    const children = document.getElementById(id).children;
    for (const child of children) {
        createLikeButton(child);
        createSaveButton(child);
    }
}

// A function send message to the author
// Since the method of contact is not specify in this task and backend is not covered in this course yet, I save it in the session storage
function sendMessage() {
    const name = document.getElementById("contact_name");
    const message = document.getElementById("message");

    // If both the name and message inputs are non empty
    if (name.value.length != 0 && message.value.length != 0) {
        // Append the name and message to the current value of the "message" key
        sessionStorage.setItem("messages", (sessionStorage.getItem("messages") === null ? "" : sessionStorage.getItem("messages")) + `From ${name.value}: ${message.value}\n`);
        console.log(sessionStorage.getItem("messages"));  // For your to check the name and message are successfully stored in session storage
    } else {
        alert("Please enter both your name and your message");
    }
    // clear the name and message input at the end
    name.value = "";
    message.value = "";
}

// A function to add comment to the comment section
function addComment() {
    const name = document.getElementById("comment_name");
    const comment = document.getElementById("comment");

    // If both the name and comment inputs are non empty
    if (name.value.length != 0 && comment.value.length != 0) {
        // create a new comment div, add the name and comment input to the div by innerHTML
        const comment_div = document.createElement("div");
        comment_div.innerHTML += `<p>By: ${name.value}</p>`;
        comment_div.innerHTML += `<p>${comment.value}</p>`;
        comment_div.style.borderStyle = "solid";
        comment_div.style.borderColor = "grey";
        comment_div.style.borderWidth = "1px";

        // add the comment div to the comment container
        const comment_container = document.getElementById("comment_container")
        comment_container.appendChild(document.createElement("br"));
        comment_container.appendChild(comment_div);
    
        // store the entire innerHTML of comment container in the session storage
        sessionStorage.setItem("comments", comment_container.innerHTML);
    } else {
        alert("Please enter both your name and your comment");
    }
    // clear the name and comment input at the end
    name.value = "";
    comment.value = "";
}

// Add all the contents of comment section stored in session storage to the comment container
const comment_container = document.getElementById("comment_container");
comment_container.innerHTML = sessionStorage.getItem("comments");