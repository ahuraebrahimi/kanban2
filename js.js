const tasks = document.querySelectorAll(".task");
const columns = document.querySelectorAll(".column");
tasks.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
  });
});

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingTask = document.querySelector(".dragging");
    column.appendChild(draggingTask);
  });
});
tasks.forEach((task) => {
  task.addEventListener("touchstart", (e) => {
    task.classList.add("dragging");
    const touch = e.touches[0];
    task.style.position = "absolute";
    task.style.zIndex = "1000";
    task.style.left = `${touch.clientX}px`;
    task.style.top = `${touch.clientY}px`;
  });

  task.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const draggingTask = document.querySelector(".dragging");
    draggingTask.style.left = `${touch.clientX}px`;
    draggingTask.style.top = `${touch.clientY}px`;
  });

  task.addEventListener("touchend", (e) => {
    const draggingTask = document.querySelector(".dragging");
    draggingTask.classList.remove("dragging");
    draggingTask.style.position = "static";
    draggingTask.style.zIndex = "auto";

    const touch = e.changedTouches[0];
    const targetColumn = document.elementFromPoint(touch.clientX, touch.clientY);

    if (targetColumn && targetColumn.classList.contains("column")) {
      targetColumn.appendChild(draggingTask);
    }
  });
});
  const buttons = document.querySelectorAll(".b");

  const borderColors = {
    d1: "2px solid rgba(163, 0, 244, 1)",  
    d2: "2px solid rgba(18, 183, 106, 1)", 
    d3: "2px solid rgba(61, 36, 246, 1)",  
    d4: "2px solid rgba(255, 22, 22, 1)",  
    d5: "2px solid rgba(0, 219, 194, 1)",  
    d6: "2px solid rgba(235, 188, 0, 1)"
  };
  
  const selectedButtons = [];
  
  buttons.forEach(button => {
    button.addEventListener("click", function() {
      if (selectedButtons.includes(this)) {
        this.style.border = "0px"; 
        selectedButtons.splice(selectedButtons.indexOf(this), 1); 
      } else {
        this.style.border = borderColors[this.id];
        selectedButtons.push(this); 
      }
    });
  });
  
  document.getElementById('add-task-btn').addEventListener('click', function() {
    const title = document.querySelector('input[name="ahura"]').value;
    const text = document.querySelector('textarea').value;
    const assigneeFullName = document.querySelector('input[name="fav_language"]:checked + label').textContent;
    const assigneeFirstName = assigneeFullName.split(" ")[0];
    const checkboxes = document.querySelectorAll('#checkbox-container input[type="checkbox"]');
    const subtasks = [];

    if (title.trim() === "") {
        alert("❌The title cannot be empty❗ Please enter a title.❌");
        return;
    }
    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent;
        if (checkbox.checked) {
            subtasks.push({ label, checked: true });
        } else {
            subtasks.push({ label, checked: false });
        }
    });

    const newCard = document.createElement('div');
    newCard.classList.add('task');
    newCard.setAttribute('draggable', 'true');
    newCard.style.cssText = 'box-shadow: 0px 0.5px 2px 0px rgba(16, 24, 40, 0.3); width: 285px; height: auto; border-radius: 8px; background-color: rgba(252, 252, 253, 1); padding-left: 20px; padding-bottom: 15px; padding-top: 10px; margin-top: 24px;';

    newCard.innerHTML = `
      <h3 style="margin-bottom: 0px;">${title}</h3>
      <p style="color: #a0a3af; font-size: 14px; margin-top: 4px; margin-bottom: 0px;">12th &nbsp; <img src="Ellipse 125.png" alt=""> &nbsp; Jan Assigned to <span style="font-size: 15px; color: rgb(88, 87, 87);">${assigneeFirstName}</span></p>
      <p style="color: #a0a3af; font-size: 13px; margin-top: 10px;">${text}</p>
      <br>
    `;

    subtasks.forEach(subtask => {
        newCard.innerHTML += `
            <input type="checkbox" ${subtask.checked ? 'checked="checked"' : ''}>
            <label style="font-size: 15px; font-weight: 600;" contenteditable="true">${subtask.label}</label>
            <br><br>
        `;
    });

    selectedButtons.forEach(button => {
        const buttonClone = button.cloneNode(true);
        buttonClone.style.margin = "5px";
        newCard.appendChild(buttonClone);
    });

    setTimeout(() => {
        const labels = newCard.querySelectorAll('label');
        labels.forEach(label => {
            label.removeAttribute('contenteditable');
        });
    }, 100);

    document.querySelector('.column').appendChild(newCard);

    newCard.addEventListener("dragstart", () => {
        newCard.classList.add("dragging");
    });
    newCard.addEventListener("dragend", () => {
        newCard.classList.remove("dragging");
    });
});


  document.getElementById("add-checkbox-image").addEventListener("click", function() {
    const container = document.getElementById("checkbox-container");
    const newCheckbox1 = document.createElement("input");
    newCheckbox1.type = "checkbox";
    newCheckbox1.style.marginTop = "16px";

    const newLabel1 = document.createElement("label");
    newLabel1.type = "text";
    newLabel1.style.color = "rgba(102, 112, 133, 1)";
    newLabel1.style.fontSize = "15px";
    newLabel1.style.fontWeight = "600";
    newLabel1.style.fontFamily = "sans-serif";
    newLabel1.setAttribute("contenteditable", "true");
    newLabel1.textContent = "placeholder";  
    newLabel1.addEventListener("focus", function() {
        if (newLabel1.textContent === "placeholder") {
            newLabel1.textContent = "";
        }
    });
    newLabel1.addEventListener("blur", function() {
        if (newLabel1.textContent === "") {
            newLabel1.textContent = "placeholder";
        }
    });

    container.appendChild(newCheckbox1);
    container.appendChild(newLabel1);
    container.appendChild(document.createElement("br"));
});

document.getElementById("clear-all-btn").addEventListener("click", function() {
  document.querySelector('input[name="ahura"]').value = "";
  document.querySelector('textarea').value = "";

  document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
      checkbox.checked = false;
  });


  document.getElementById("checkbox-container").innerHTML = "";

  selectedButtons.forEach(function(button) {
    button.style.border = "0px";
  });
  selectedButtons.length = 0;
});
document.getElementById("add-task-btn").addEventListener("click", function() {
  document.querySelector('input[name="ahura"]').value = "";
  document.querySelector('textarea').value = "";

  document.querySelectorAll('checkbox-container').forEach(function(checkbox) {
      checkbox.checked = false;
  });


  document.getElementById("checkbox-container").innerHTML = "";

  selectedButtons.forEach(function(button) {
    button.style.border = "0px";
  });
  selectedButtons.length = 0;
});

