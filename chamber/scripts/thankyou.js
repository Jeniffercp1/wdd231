const applicationDetails = document.querySelector("#applicationDetails");
const params = new URLSearchParams(window.location.search);

const fields = [
  ["First Name", "firstName"],
  ["Last Name", "lastName"],
  ["Email", "email"],
  ["Mobile Phone", "phone"],
  ["Business Name", "organization"],
  ["Submitted", "timestamp"]
];

function formatValue(key, value) {
  if (key === "timestamp" && value) {
    return new Date(value).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  return value || "Not provided";
}

if (applicationDetails) {
  applicationDetails.innerHTML = fields
    .map(([label, key]) => `<p><strong>${label}:</strong> ${formatValue(key, params.get(key))}</p>`)
    .join("");
}
