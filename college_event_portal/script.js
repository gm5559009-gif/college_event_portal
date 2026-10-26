const events = [
  {id:"pulse",name:"Pulse Fest '26",category:"Cultural",day:"08",month:"NOV",date:"2026-11-08",time:"5:00 PM – 9:30 PM",venue:"Open Air Auditorium",seats:240,description:"One night. Infinite memories. Music, dance, and campus energy.",image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85",alt:"Concert crowd under stage lights"},
  {id:"hack",name:"CodeStorm Hackathon",category:"Technical",day:"12",month:"NOV",date:"2026-11-12",time:"9:00 AM – 6:00 PM",venue:"Innovation & Incubation Hub",seats:85,description:"Team up, think big, and turn bold ideas into working prototypes.",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",alt:"Students collaborating on a laptop"},
  {id:"cup",name:"Inter-College Sports Cup",category:"Sports",day:"15",month:"NOV",date:"2026-11-15",time:"7:00 AM – 4:00 PM",venue:"University Sports Ground",seats:120,description:"Bring your team spirit for a day of competition and fair play.",image:"https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=85",alt:"Athletes racing on a track"},
  {id:"design",name:"Design Thinking Lab",category:"Workshop",day:"18",month:"NOV",date:"2026-11-18",time:"10:00 AM – 1:00 PM",venue:"Design Studio · Block C",seats:35,description:"Learn a human-first process to solve real-world problems.",image:"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",alt:"Creative team workshop around a table"},
  {id:"film",name:"Short Film Showcase",category:"Cultural",day:"21",month:"NOV",date:"2026-11-21",time:"4:30 PM – 7:30 PM",venue:"Seminar Hall 2",seats:68,description:"Big stories, small screens. Watch student-made films and meet creators.",image:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85",alt:"Movie theatre with rows of seats"},
  {id:"ai",name:"AI & Future Tech Talk",category:"Technical",day:"25",month:"NOV",date:"2026-11-25",time:"11:00 AM – 1:00 PM",venue:"Main Conference Hall",seats:150,description:"Explore the ideas and technologies shaping tomorrow with guest speakers.",image:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=85",alt:"Modern technology robot"}
];
const grid=document.getElementById("eventsGrid"), empty=document.getElementById("emptyState"), count=document.getElementById("eventCount");
const searchInput=document.getElementById("searchInput"), sortSelect=document.getElementById("sortSelect");
let activeCategory="All", toastTimer;
const saved=()=>{try{return JSON.parse(localStorage.getItem("campusliveRegistrations")||"[]")}catch{return []}};
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderEvents(){
 let query=searchInput.value.trim().toLowerCase();
 let filtered=events.filter(e=>(activeCategory==="All"||e.category===activeCategory)&&`${e.name} ${e.category} ${e.venue} ${e.description}`.toLowerCase().includes(query));
 filtered.sort((a,b)=>sortSelect.value==="name"?a.name.localeCompare(b.name):a.date.localeCompare(b.date));
 count.textContent=`${filtered.length} EVENT${filtered.length===1?"":"S"}`;
 grid.innerHTML=filtered.map((e,i)=>{const registered=saved().some(r=>r.eventId===e.id);return `<article class="event-card" style="animation-delay:${i*45}ms">
  <div class="event-image"><img src="${e.image}" alt="${escapeHTML(e.alt)}" loading="lazy"><span class="event-tag">${e.category}</span><span class="date-chip"><small>${e.month}</small><b>${e.day}</b></span></div>
  <div class="event-info"><h3>${escapeHTML(e.name)}</h3><p>${escapeHTML(e.description)}</p>
  <div class="event-meta"><span><span class="meta-icon">◷</span>${e.time}</span><span><span class="meta-icon">⌖</span>${escapeHTML(e.venue)}</span></div>
  <div class="event-footer"><span class="seat-label"><b>${e.seats}</b> spots available</span><button class="register-button" data-register="${e.id}">${registered?"Registered ✓":"Register now"}${registered?"":'<span>↗</span>'}</button></div></div></article>`}).join("");
 empty.hidden=filtered.length!==0;grid.hidden=filtered.length===0;
}
document.querySelectorAll(".category-card").forEach(btn=>btn.addEventListener("click",()=>{activeCategory=btn.dataset.category;document.querySelectorAll(".category-card").forEach(b=>b.classList.toggle("selected",b===btn));document.getElementById("events").scrollIntoView({behavior:"smooth"});renderEvents()}));
searchInput.addEventListener("input",renderEvents);sortSelect.addEventListener("change",renderEvents);
grid.addEventListener("click",e=>{const btn=e.target.closest("[data-register]");if(!btn)return;const item=events.find(ev=>ev.id===btn.dataset.register);if(saved().some(r=>r.eventId===item.id)){showToast("You already registered for this event.");return;}openRegistration(item)});
document.getElementById("resetFilters").addEventListener("click",()=>{activeCategory="All";searchInput.value="";sortSelect.value="date";document.querySelectorAll(".category-card").forEach(b=>b.classList.toggle("selected",b.dataset.category==="All"));renderEvents()});
const dialog=document.getElementById("registerDialog"), form=document.getElementById("registerForm");
function openRegistration(item){document.getElementById("eventId").value=item.id;document.getElementById("dialogEventName").textContent=item.name;form.hidden=false;document.getElementById("successMessage").hidden=true;form.reset();document.getElementById("eventId").value=item.id;dialog.showModal()}
document.getElementById("closeDialog").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
form.addEventListener("submit",e=>{e.preventDefault();const data=new FormData(form);const item=events.find(ev=>ev.id===data.get("eventId"));const records=saved();if(records.some(r=>r.eventId===item.id)){showToast("This registration already exists.");dialog.close();return;}
 const record={eventId:item.id,eventName:item.name,fullName:data.get("fullName").trim(),email:data.get("email").trim(),studentId:data.get("studentId").trim(),registeredAt:new Date().toISOString()};
 records.push(record);localStorage.setItem("campusliveRegistrations",JSON.stringify(records));form.hidden=true;document.getElementById("successMessage").hidden=false;document.getElementById("successText").textContent=`Thanks, ${record.fullName}! Your spot for ${item.name} is saved in this browser.`;renderEvents();
});
document.getElementById("doneButton").addEventListener("click",()=>dialog.close());
function showToast(message){const toast=document.getElementById("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2600)}
const menuToggle=document.getElementById("menuToggle"),navLinks=document.getElementById("navLinks");
menuToggle.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open))});
navLinks.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{navLinks.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));
renderEvents();