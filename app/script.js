document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postForm");
  const postList = document.querySelector(".post-list");

  // Event listener for form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");

    const title = titleInput.value;
    const content = contentInput.value;

    if (title.trim() === "" || content.trim() === "") {
      alert("Please fill in both the title and content fields.");
      return;
    }

    // Save gossip entry to localStorage
    const gossipEntry = {
      title,
      content,
    };
    saveGossipEntry(gossipEntry);

    // Clear form inputs
    titleInput.value = "";
    contentInput.value = "";

    // Display the updated gossip list
    displayGossipList();
  });

  // Function to save gossip entry to localStorage
  function saveGossipEntry(entry) {
    let gossipList = JSON.parse(localStorage.getItem("gossipList")) || [];
    gossipList.push(entry);
    localStorage.setItem("gossipList", JSON.stringify(gossipList));
  }

  // Function to display the list of gossip entries
  function displayGossipList() {
    postList.innerHTML = "";

    const gossipList = JSON.parse(localStorage.getItem("gossipList")) || [];

    gossipList.forEach((entry, index) => {
      const card = document.createElement("div");
      card.classList.add("card", "mb-3");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const titleElement = document.createElement("h5");
      titleElement.classList.add("card-title");
      titleElement.textContent = entry.title;

      const contentElement = document.createElement("p");
      contentElement.classList.add("card-text");
      contentElement.textContent = entry.content;

      const editButton = document.createElement("button");
      editButton.classList.add("btn", "btn-primary", "me-2", "mb-2", "btn-edit");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        editGossipEntry(index);
      });

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-danger", "mb-2", "btn-delete");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteGossipEntry(index);
        displayGossipList();
      });

      cardBody.appendChild(titleElement);
      cardBody.appendChild(contentElement);
      cardBody.appendChild(editButton);
      cardBody.appendChild(deleteButton);
      card.appendChild(cardBody);

      postList.appendChild(card);
    });
  }

  // Function to edit a gossip entry
  function editGossipEntry(index) {
    const gossipList = JSON.parse(localStorage.getItem("gossipList")) || [];
    const entry = gossipList[index];

    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");

    titleInput.value = entry.title;
    contentInput.value = entry.content;

    // Remove the existing entry to prepare for updating
    gossipList.splice(index, 1);
    localStorage.setItem("gossipList", JSON.stringify(gossipList));
  }

  // Function to delete a gossip entry from localStorage
  function deleteGossipEntry(index) {
    let gossipList = JSON.parse(localStorage.getItem("gossipList")) || [];
    gossipList.splice(index, 1);
    localStorage.setItem("gossipList", JSON.stringify(gossipList));
  }

  // Initial display of the gossip list on page load
  displayGossipList();
});
