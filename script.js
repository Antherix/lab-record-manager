const STORAGE_KEY = "labRecordManagerRecords";

const form = document.getElementById("recordForm");
const subjectNameInput = document.getElementById("subjectName");
const experimentNameInput = document.getElementById("experimentName");
const experimentDateInput = document.getElementById("experimentDate");
const marksStatusInput = document.getElementById("marksStatus");
const tableBody = document.getElementById("recordsTableBody");
const totalCount = document.getElementById("totalCount");
const clearAllBtn = document.getElementById("clearAllBtn");
const toast = document.getElementById("toast");

let records = loadRecords();
let toastTimer = null;

function loadRecords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const list = saved ? JSON.parse(saved) : [];
    return list.map(function (record) {
      return {
        subjectName: (record.subjectName || "General").trim() || "General",
        experimentName: (record.experimentName || "").trim(),
        experimentDate: record.experimentDate || "",
        marksStatus: (record.marksStatus || "").trim(),
      };
    });
  } catch (error) {
    return [];
  }
}

function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
}

function renderRecords() {
  sortRecordsByDate();
  totalCount.textContent = String(records.length);

  if (records.length === 0) {
    tableBody.innerHTML =
      '<tr><td colspan="5" class="empty-row">No records yet. Add your first experiment.</td></tr>';
    clearAllBtn.disabled = true;
    return;
  }
  clearAllBtn.disabled = false;

  let rows = "";
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    rows +=
      "<tr>" +
      "<td>" +
      escapeHtml(record.subjectName) +
      "</td>" +
      "<td>" +
      escapeHtml(record.experimentName) +
      "</td>" +
      "<td>" +
      formatDate(record.experimentDate) +
      "</td>" +
      "<td>" +
      escapeHtml(record.marksStatus) +
      '</td><td><button type="button" class="delete-btn" data-index="' +
      i +
      '">Delete</button></td>' +
      "</tr>";
  }
  tableBody.innerHTML = rows;
}

function deleteRecord(index) {
  const ok = window.confirm("Delete this record?");
  if (!ok) return;
  records.splice(index, 1);
  saveRecords();
  renderRecords();
  showToast("Record deleted");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sortRecordsByDate() {
  records.sort(function (a, b) {
    const aTime = new Date(a.experimentDate).getTime() || 0;
    const bTime = new Date(b.experimentDate).getTime() || 0;
    return bTime - aTime;
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 1400);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const newRecord = {
    subjectName: subjectNameInput.value.trim(),
    experimentName: experimentNameInput.value.trim(),
    experimentDate: experimentDateInput.value,
    marksStatus: marksStatusInput.value.trim(),
  };

  if (!newRecord.subjectName || !newRecord.experimentName || !newRecord.experimentDate || !newRecord.marksStatus) {
    return;
  }

  records.push(newRecord);
  saveRecords();
  renderRecords();
  form.reset();
  experimentNameInput.focus();
  showToast("Record added");
});

tableBody.addEventListener("click", function (event) {
  if (!event.target.classList.contains("delete-btn")) return;
  const index = Number(event.target.getAttribute("data-index"));
  deleteRecord(index);
});

clearAllBtn.addEventListener("click", function () {
  if (records.length === 0) return;
  const ok = window.confirm("Clear all records?");
  if (!ok) return;
  records = [];
  saveRecords();
  renderRecords();
  showToast("All records cleared");
});

renderRecords();
