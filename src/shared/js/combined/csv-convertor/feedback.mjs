
// export function feedback (msg) {
//   const innerhtml_template = `
//     <div class="feedback-message">
//       <p>${msg}</p>
//     </div>
//   `;

//   const feedbackContainer = document.querySelector('.feedback-container');
//   const feedback = document.createElement('div');
//   feedback.className = 'feedback';
//   feedback.innerHTML = innerhtml_template;

//   const message = new Promise((resolve) => {
//     resolve();
//   });

//   message.then(() => {
//     console.log(`message ${msg}`);
//     feedbackContainer.appendChild(feedback);
//   }).then(
//     setTimeout(function() {
//         console.log('runs after 1 seconds');
//         feedback.classList.add('in');
//       },10)
//   ).then(
//     setTimeout(function() {
//         console.log('runs after 2 seconds');
//         feedback.classList.remove('in');
//       },3000)
//   ).then(
//     setTimeout(function() {
//         console.log('runs after 2 seconds');
//         feedbackContainer.removeChild(feedback);
//       }, 3600)
//   ).catch((err) => console.error(`Error: ${err}`));
//   return message;
// }
