import{l as e,n as t,s as n,u as r}from"./auth-Chw3ie5W.js";var i=new URLSearchParams(window.location.search),a=i.get(`id`),o=i.get(`name`)||`Unknown`;document.getElementById(`other-name`).textContent=o,document.getElementById(`other-letter`).textContent=o[0]?.toUpperCase()||`?`;var s=null,c=null;window.addEventListener(`beforeunload`,()=>{c&&c()}),t(t=>{if(!t)return window.location.href=`../index.html`;s=t,e(t.uid,t.displayName||``,t.email).catch(e=>console.error(`profile auto-save failed:`,e)),l()});function l(){c&&c(),c=n(a,e=>{d(e)})}function u(e){return e?(e.toDate?e.toDate():new Date(e)).toLocaleTimeString(`en-US`,{hour:`2-digit`,minute:`2-digit`}):``}function d(e){let t=document.getElementById(`messages`);if(e.length===0){t.innerHTML=`<div class="flex flex-col items-center justify-center py-16 gap-2">
          <p class="text-sm text-gray-400">No messages yet</p>
          <p class="text-xs text-gray-300">Say hello 👋</p>
        </div>`;return}t.innerHTML=e.map((e,t)=>{let n=e.senderId===s.uid,r=u(e.createdAt),i=``;return t===0&&(i=`<div class="flex items-center gap-3 my-2">
            <div class="flex-1 h-px bg-gray-100"></div>
            <span class="text-xs text-gray-400">Today</span>
            <div class="flex-1 h-px bg-gray-100"></div>
          </div>`),n?`${i}
            <div class="flex items-end justify-end gap-2">
              <div class="max-w-[72%]">
                <div class="bg-gray-900 rounded-2xl rounded-br-sm px-4 py-2.5">
                  <p class="text-sm text-white">${f(e.text)}</p>
                </div>
                <p class="text-xs text-gray-400 mt-1 text-right mr-1">${r} ✓</p>
              </div>
            </div>`:`${i}
            <div class="flex items-end gap-2">
              <div class="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <span class="text-rose-500 text-xs font-medium">${o[0]?.toUpperCase()}</span>
              </div>
              <div class="max-w-[72%]">
                <div class="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5">
                  <p class="text-sm text-gray-800">${f(e.text)}</p>
                </div>
                <p class="text-xs text-gray-400 mt-1 ml-1">${r}</p>
              </div>
            </div>`}).join(``),t.scrollHeight-t.scrollTop-t.clientHeight<50&&(t.scrollTop=t.scrollHeight)}function f(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}window.toggleSend=()=>{let e=document.getElementById(`message-input`),t=document.getElementById(`send-btn`),n=e.value.trim().length>0;t.disabled=!n,t.style.opacity=n?`1`:`0.4`},window.handleKey=e=>{e.key===`Enter`&&sendMsg()},window.sendMsg=async()=>{let e=document.getElementById(`message-input`),t=e.value.trim();if(!(!t||!s)){e.value=``,window.toggleSend();try{await r(a,s.uid,t)}catch(n){console.error(`sendMsg error:`,n),e.value=t,window.toggleSend()}}};