(function(){
  "use strict";
  const metricBtn = document.querySelector('[data-unit="metric"]');
  const imperialBtn = document.querySelector('[data-unit="imperial"]');
  const metricFields = document.getElementById("metric-fields");
  const imperialFields = document.getElementById("imperial-fields");
  const calc = document.getElementById("calc");
  const result = document.getElementById("result");

  function setUnit(unit){
    const isMetric = unit === "metric";
    metricBtn.classList.toggle("active", isMetric);
    imperialBtn.classList.toggle("active", !isMetric);
    metricBtn.setAttribute("aria-selected", isMetric);
    imperialBtn.setAttribute("aria-selected", !isMetric);
    metricFields.classList.toggle("hidden", !isMetric);
    imperialFields.classList.toggle("hidden", isMetric);
  }
  metricBtn.onclick = () => setUnit("metric");
  imperialBtn.onclick = () => setUnit("imperial");

  calc.onclick = () => {
    let bmi, cat;
    if (!metricFields.classList.contains("hidden")){
      const cm = parseFloat(document.getElementById("cm").value);
      const kg = parseFloat(document.getElementById("kg").value);
      if (!cm || !kg){ result.hidden=false; result.textContent="Enter height and weight"; return; }
      const m = cm / 100;
      bmi = kg / (m*m);
    } else {
      const ft = parseFloat(document.getElementById("ft").value)||0;
      const inch = parseFloat(document.getElementById("inch").value)||0;
      const lb = parseFloat(document.getElementById("lb").value);
      if (!lb){ result.hidden=false; result.textContent="Enter weight"; return; }
      const totalIn = ft*12 + inch;
      bmi = (lb / (totalIn*totalIn)) * 703;
    }
    bmi = Math.round(bmi*10)/10;
    if (bmi < 18.5) cat = "Underweight";
    else if (bmi < 25) cat = "Normal";
    else if (bmi < 30) cat = "Overweight";
    else cat = "Obese";
    result.hidden = false;
    result.innerHTML = `<strong>${bmi}</strong> — ${cat}`;
  };
})();
