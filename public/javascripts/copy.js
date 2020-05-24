function myFunction() {
  /* Get the text field */
  var copyUrl = document.getElementById("myInput");

  /* Select the text field */
  copyUrl.select();
  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the url: " + copyUrl.value);
}
// module.exports = myFunction