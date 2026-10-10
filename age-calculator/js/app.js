// Age calculator logic
document.addEventListener('DOMContentLoaded', () => {
  const dob = document.getElementById('dob');
  const asof = document.getElementById('asof');
  const calc = document.getElementById('calc');
  const result = document.getElementById('result');
  const today = new Date().toISOString().slice(0, 10);
  asof.value = today;

  calc.addEventListener('click', () => {
    if (!dob.value) { result.hidden = false; result.textContent = 'Please enter date of birth'; return; }
    const birth = new Date(dob.value);
    const ref = new Date(asof.value || today);
    if (birth > ref) { result.hidden = false; result.textContent = 'Birth date is in the future'; return; }
    let years = ref.getFullYear() - birth.getFullYear();
    let months = ref.getMonth() - birth.getMonth();
    let days = ref.getDate() - birth.getDate();
    if (days < 0) {
      months--;
      const prev = new Date(ref.getFullYear(), ref.getMonth(), 0);
      days += prev.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    result.hidden = false;
    result.innerHTML = `<strong>${years}</strong> years, <strong>${months}</strong> months, <strong>${days}</strong> days`;
  });
});
