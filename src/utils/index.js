import { useReactToPrint } from "react-to-print";
export const truncate = (str, len) =>
  str?.length
    ? str.length <= len
      ? `${str.slice(0, len)}`
      : `${str.slice(0, len)}...`
    : null;
export function calculatePercentageMatch(arr1, arr2) {
  // Convert arrays to sets
  const set1 = new Set(arr1.map((obj) => JSON.stringify(obj)));
  const set2 = new Set(arr2.map((obj) => JSON.stringify(obj)));

  let count = 0;
  // Iterate over set1 and check if each element is present in set2
  for (const elem of set1) {
    if (set2.has(elem)) {
      count++;
    }
  }

  // Calculate the percentage
  const percentage = (count / set1.size) * 100;

  return percentage;
}

// export function printContent(elementId) {
//   // Select the target element
//   const targetElement = document.getElementById(elementId);

//   // Create a hidden iframe
//   const iframe = document.createElement("iframe");
//   iframe.style.visibility = "hidden";
//   document.body.appendChild(iframe);

//   // Get computed styles for the target element
//   const computedStyle = window.getComputedStyle(targetElement);
//   const styleString = Array.from(computedStyle)
//     .map((prop) => `${prop}: ${computedStyle.getPropertyValue(prop)}`)
//     .join(";");

//   // Inject styles and content into the iframe
//   const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
//   iframeDoc.head.innerHTML += `<style>${targetElement.outerHTML}<style>`;
//   iframeDoc.body.innerHTML = `<div style="${styleString}">${targetElement.innerHTML}</div>`;

//   // Trigger the print dialog
//   iframe.contentWindow.print();

//   // Clean up
//   setTimeout(() => {
//     document.body.removeChild(iframe);
//   }, 100);
// }
export function printContent(elementId) {
  const handlePrint = useReactToPrint({
    content: () => document.getElementById(elementId),
  });

  return handlePrint;
}