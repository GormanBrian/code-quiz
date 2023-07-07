/**
 * Sets the new score property to avoid stale data, navigates to the new page
 * @param {string} to Location to navigate to
 * @param {number} result Sets the new-score localStorage variable
 */
function navigate(to, result = -1) {
  localStorage.setItem("new-score", result);
  window.location.href = to;
}
