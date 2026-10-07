(() => {
  const professionals = [
    { id: "lucia", name: "Dra. Lucía Méndez", initials: "LM", specialty: "Medicina general", weekdays: [1,3,5], hours: ["09:00","09:30","10:00","10:30"], schedule: "Lun, mié y vie · 09:00–11:00" },
    { id: "mateo", name: "Dr. Mateo Silva", initials: "MS", specialty: "Pediatría", weekdays: [2,4], hours: ["15:00","15:30","16:00","16:30"], schedule: "Mar y jue · 15:00–17:00" },
    { id: "elena", name: "Dra. Elena Torres", initials: "ET", specialty: "Dermatología", weekdays: [1,6], hours: ["11:00","11:30","12:00"], schedule: "Lun y sáb · 11:00–12:30" }
  ];
  const form = document.querySelector("#booking-form");
  const success = document.querySelector("#success");
  const requestList = document.querySelector("#requests");
  const error = document.querySelector("#form-error");
  let professional = professionals[0], day = null, time = null;
  const requests = [];
  const fmt = new Intl.DateTimeFormat("es-PE", { weekday:"short", day:"numeric", month:"short" });
  const fullFmt = new Intl.DateTimeFormat("es-PE", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
  function option(label, selected, fn) {
    const button = document.createElement("button"); button.type = "button"; button.className = "option";
    button.textContent = label; button.setAttribute("aria-pressed",String(selected)); button.addEventListener("click",fn); return button;
  }
  function renderProfessionals() {
    const container = document.querySelector("#professionals"); container.replaceChildren();
    professionals.forEach(p => {
      const button = document.createElement("button"); button.type = "button"; button.className = "professional-btn";
      button.setAttribute("aria-pressed",String(p.id === professional.id));
      const avatar = document.createElement("span"); avatar.className = "avatar"; avatar.textContent = p.initials;
      const details = document.createElement("span");
      const name = document.createElement("strong"); name.textContent = p.name;
      const specialty = document.createElement("small"); specialty.textContent = p.specialty;
      const schedule = document.createElement("small"); schedule.textContent = p.schedule;
      const radio = document.createElement("span"); radio.className = "radio"; radio.setAttribute("aria-hidden","true");
      details.append(name,specialty,schedule); button.append(avatar,details,radio);
      button.addEventListener("click",() => {professional = p; day = null; time = null; error.textContent = ""; renderProfessionals(); renderDays(); renderTimes();});
      container.append(button);
    });
  }
  function availableDays() {
    const days = [], today = new Date(); today.setHours(12,0,0,0);
    for(let i=1;i<=21 && days.length<4;i++) { const date = new Date(today); date.setDate(today.getDate()+i); if(professional.weekdays.includes(date.getDay())) days.push(date); }
    return days;
  }
  function renderDays() {
    const container = document.querySelector("#days"); container.replaceChildren();
    availableDays().forEach(date => container.append(option(fmt.format(date),day?.getTime()===date.getTime(),() => {day=date;time=null;error.textContent="";renderDays();renderTimes();updateSteps();})));
    updateSteps();
  }
  function renderTimes() {
    const container = document.querySelector("#times"); container.replaceChildren();
    if(!day) {const hint=document.createElement("p");hint.className="tiny";hint.textContent="Selecciona un día para ver sus horarios de demo.";container.append(hint);return;}
    professional.hours.forEach(hour => {const taken=requests.some(r=>r.id===professional.id && r.date===day.getTime() && r.time===hour);const button=option(taken?`${hour} · solicitado`:hour,time===hour,()=>{time=hour;error.textContent="";renderTimes();updateSteps();});button.disabled=taken;container.append(button);});
  }
  function updateSteps() {document.querySelectorAll(".steps span").forEach((el,i)=>el.classList.toggle("active",i===(time?2:day?1:0)));}
  form.addEventListener("submit",event => {
    event.preventDefault();
    if(!day || !time) {error.textContent="Elige un día y una hora para continuar.";return;}
    const name=document.querySelector("#demo-name").value.trim(), contact=document.querySelector("#demo-contact").value.trim();
    if(!name || !contact) {error.textContent="Completa ambos campos con datos ficticios.";return;}
    if(requests.some(r=>r.id===professional.id && r.date===day.getTime() && r.time===time)){error.textContent="Ese horario ya fue solicitado en esta demo. Elige otro.";return;}
    requests.push({id:professional.id,professional:professional.name,date:day.getTime(),dateText:fullFmt.format(day),time,name});
    requestList.replaceChildren();
    requests.slice().reverse().forEach(r=>{const item=document.createElement("article");item.className="request";const title=document.createElement("strong");title.textContent=r.name;const person=document.createElement("p");person.textContent=`Profesional: ${r.professional}`;const details=document.createElement("p");details.textContent=`Fecha: ${r.dateText} · Hora: ${r.time}`;const status=document.createElement("span");status.className="pill";status.textContent="Pendiente · simulación";item.append(title,person,details,status);requestList.append(item);});
    document.querySelector("#success-detail").textContent=`${professional.name} · ${fullFmt.format(day)} · ${time}`;
    form.hidden=true;success.hidden=false;success.focus();
  });
  document.querySelector("#new-request").addEventListener("click",()=>{day=null;time=null;error.textContent="";form.hidden=false;success.hidden=true;document.querySelector("#demo-name").value="Paciente Demo";document.querySelector("#demo-contact").value="contacto-demo";renderDays();renderTimes();document.querySelector(".professional-btn[aria-pressed=true]").focus();});
  renderProfessionals();renderDays();renderTimes();
})();
