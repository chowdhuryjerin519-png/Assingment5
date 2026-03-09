let allIssuesData = [];

function handleLogin() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "admin123") {
    document.getElementById("login-page").classList.add("hidden");
    document.getElementById("main-page").classList.remove("hidden");
    fetchIssues();
  } else {
    alert("Wrong User or Password (admin / admin123 try again)");
  }
}

async function fetchIssues() {
  toggleLoader(true);
  const container = document.getElementById("issuesContainer");

  try {
    const response = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const result = await response.json();

    allIssuesData = Array.isArray(result) ? result : result.data || [];

    console.log("Fetched Data:", allIssuesData);
    renderIssues(allIssuesData);
  } catch (err) {
    console.error("Fetch Error:", err);
    container.innerHTML = `<p class="text-red-500 text-center col-span-4 py-10">try again</p>`;
  } finally {
    toggleLoader(false);
  }
}

function renderIssues(issues) {
  const container = document.getElementById("issuesContainer");
  const countTxt = document.getElementById("issueCount");

  container.innerHTML = "";
  countTxt.innerText = `${issues.length || 0} Issues`;

  if (!issues || issues.length === 0) {
    container.innerHTML = `<p class="text-gray-400 text-center col-span-4 py-10">not issues</p>`;
    return;
  }

  issues.forEach((issue) => {
    const topBorder =
      issue.status === "open" ? "border-t-[#00B06B]" : "border-t-[#4F46E5]";
    const priorityColor =
      issue.priority === "high" ? "text-red-500" : "text-gray-400";

    const card = document.createElement("div");
    card.className = `bg-white p-5 rounded-xl border border-gray-100 border-t-4 ${topBorder} shadow-sm issue-card cursor-pointer flex flex-col hover:shadow-md transition-all`;
    card.onclick = () => openModal(issue.id);

    card.innerHTML = `
            <div class="flex justify-between items-center mb-3">
            <img src="/assets/Open-Status.png" class="w-4 h-4">
                
                <span class="text-[10px] font-extrabold uppercase ${priorityColor}">${issue.priority}</span>
            </div>
            <h3 class="font-bold text-gray-800 text-sm mb-2 line-clamp-1">${issue.title || "No Title"}</h3>
            <p class="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">${issue.description || "No description available."}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
                <span class="text-[9px] font-bold bg-[#FFF1F1] text-[#EB5757] px-2 py-1 rounded-full border border-[#FFDEDE]"> BUG</span>
                <span class="text-[9px] font-bold bg-[#FFF8E1] text-[#F2994A] px-2 py-1 rounded-full border border-[#FFE8B3]"> HELP WANTED</span>
            </div>

            <div class="flex justify-between items-center pt-3 border-t border-gray-50 mt-auto text-[10px]">
                <div class="text-gray-600 italic">By <span class="font-bold not-italic text-gray-800">${issue.author}</span></div>
                <div class="text-gray-400 font-medium">${issue.createdAt || "N/A"}</div>
            </div>
        `;
    container.appendChild(card);
  });
}

function filterIssues(status, btnElement) {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.className =
      "tab-btn bg-white border border-gray-200 text-gray-600 px-8 py-2 rounded-lg font-medium transition-all";
  });

  btnElement.className =
    "tab-btn bg-[#4F46E5] text-white px-8 py-2 rounded-lg font-medium shadow-md transition-all";

  if (status === "all") {
    renderIssues(allIssuesData);
  } else {
    const filtered = allIssuesData.filter((item) => item.status === status);
    renderIssues(filtered);
  }
}

async function handleSearch() {
  const searchText = document.getElementById("searchInput").value.trim();
  if (!searchText) return;

  toggleLoader(true);
  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
    );
    const data = await res.json();
    const searchResults = Array.isArray(data) ? data : data.data || [];
    renderIssues(searchResults);
  } catch (err) {
    console.error("Search Error:", err);
  } finally {
    toggleLoader(false);
  }
}

async function openModal(id) {
  const modal = document.getElementById("issueModal");

  try {
    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
    );
    const issue = await res.json();

    document.getElementById("modalTitle").innerText =
      issue.data.title || "No Title";
    document.getElementById("modalDesc").innerText =
      issue.data.description || "No description provided.";
    document.getElementById("modalAuthor").innerText =
      issue.data.author || "Unknown";

    document.getElementById("modalSubInfo").innerHTML =
      `• Opened by <span class="font-bold text-gray-700">${issue.data.author}</span> • ${issue.createdAt || ""}`;

    const statusBadge = document.getElementById("modalStatusBadge");
    statusBadge.innerText = issue.data.status === "open" ? "Opened" : "Closed";
    statusBadge.className = `px-3 py-1 rounded-full text-white text-[11px] font-bold ${issue.data.status === "open" ? "bg-[#00B06B]" : "bg-[#4F46E5]"}`;

    const prioBtn = document.getElementById("modalPriority");
    prioBtn.innerText = (issue.data.priority || "low").toUpperCase();
    prioBtn.className = `px-4 py-1 rounded-full text-white text-[10px] font-bold ${issue.data.priority === "high" ? "bg-[#EB5757]" : "bg-orange-400"}`;

    modal.classList.remove("hidden");
  } catch (error) {
    console.error("Modal Data Error:", error);
  }
}

function closeModal() {
  document.getElementById("issueModal").classList.add("hidden");
}

function toggleLoader(show) {
  const loader = document.getElementById("loader");
  show ? loader.classList.remove("hidden") : loader.classList.add("hidden");
}
