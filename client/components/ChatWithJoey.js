//signup

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  //get user info
  console.log('Its my phone', signupForm);
  const phone = signupForm['signup-phone'].value;

  //signup the user
  auth.createUser(phone);
});
