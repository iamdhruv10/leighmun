const form = document.getElementById("registration");
const delegation = document.getElementById("delegation-fields");
const individual = document.getElementById("individual-fields");
const total = document.getElementById("f1125661580");
const counts = [...document.querySelectorAll("[data-count]")];
const status = document.getElementById("registration-status");
function validateCounts() {
  const sum = counts.reduce((n, e) => n + (Number(e.value) || 0), 0);
  document.getElementById("count-total").textContent =
    `${sum} students allocated${total.value ? " / " + total.value + " attending" : ""}`;
  total.setCustomValidity(
    !delegation.disabled && total.value && sum !== Number(total.value)
      ? "Committee counts must add up to the total number of students attending."
      : "",
  );
}
function updateType() {
  const isDelegation =
    form.querySelector('[name="entry.490011390"]:checked').value ===
    "Delegation";
  delegation.hidden = !isDelegation;
  delegation.disabled = !isDelegation;
  individual.hidden = isDelegation;
  individual.disabled = isDelegation;
  document.getElementById("page-history").value = isDelegation ? "0,1" : "0,2";
  status.textContent = "";
  validateCounts();
}
form
  .querySelectorAll('[name="entry.490011390"]')
  .forEach((e) => e.addEventListener("change", updateType));
[total, ...counts].forEach((e) => e.addEventListener("input", validateCounts));
form.addEventListener("submit", (e) => {
  validateCounts();
  if (!form.reportValidity()) {
    e.preventDefault();
    return;
  }
  status.textContent =
    "Check the Google confirmation tab. Your registration is complete only when Google confirms it has been recorded.";
});
updateType();
