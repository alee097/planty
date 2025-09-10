function updateTime() {
  const date = new Date();
  const mdy = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const clock = date.toLocaleTimeString();
  document.getElementById("date").textContent = mdy;
  document.getElementById("time").textContent = clock;
}
updateTime();
setInterval(updateTime, 1000);

function addTask() {
  const input = document.getElementById("textinput");
  const inputnum = document.getElementById("qtyinput");
  const taskText = input.value;
  const taskNum = parseInt(inputnum.value) || 1;

  const taskList = document.getElementById("tasklist");

  const taskItem = document.createElement("div");
  taskItem.classList.add("singletask");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const label = document.createElement("span");
  label.textContent = `${taskText} (0/${taskNum})`; //counter

  const progressBar = document.createElement("div");
  progressBar.classList.add("progressAndBox");

  const progress = document.createElement("progress");
  progress.value = 0;
  progress.max = taskNum;

  const updateBox = document.createElement("input");
  updateBox.type = "number";
  updateBox.min = 0;
  updateBox.max = taskNum;
  updateBox.value = 0;
  updateBox.style.width = "50px";

  updateBox.addEventListener("change", () => {
    let val = Math.min(taskNum, Math.max(0, parseInt(updateBox.value) || 0));
    progress.value = val;
    label.textContent = `${taskText} (${val}/${taskNum})`;
    updateDonutProgress();
  });

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      progress.value = taskNum;
      updateBox.value = taskNum;
      label.textContent = `${taskText} (${taskNum}/${taskNum})`;
      label.style.textDecoration = "line-through";
      label.style.color = "Lime";
      label.style.opacity = "0.5";

      const plant = document.createElement("span");
      plant.textContent = "🌱";
      document.getElementById("garden").appendChild(plant);
    } else {
      progress.value = 0;
      updateBox.value = 0;
      label.textContent = `${taskText}(0/${taskNum})`;
      label.style.textDecoration = "none";
      label.style.color = "#e29be2";
      label.style.opacity = "1";
    }
    updateDonutProgress();
  });

  progressBar.append(progress);
  progressBar.append(updateBox);
  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(progressBar);
  taskList.appendChild(taskItem);

  input.value = "";
  inputnum.value = "";

  updateDonutProgress();
}

function updateDonutProgress() {
  const taskBars = document.querySelectorAll("progress"); 
  let total = 0;
  let completed = 0;

  taskBars.forEach(p => {
    total += parseInt(p.max);
    completed += parseInt(p.value);
  });

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const donut = document.getElementById("donut");
  const label = document.getElementById("donut-label");

  if (donut) {
    donut.style.setProperty("--percentage", percent);
    label.textContent = `${percent}%`;
  }
}
