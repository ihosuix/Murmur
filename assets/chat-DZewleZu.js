import{n as e,s as t,u as n}from"./auth-B1AjK29O.js";var r=new URLSearchParams(window.location.search),i=r.get(`id`),a=r.get(`name`)||`Unknown`;document.getElementById(`other-name`).textContent=a,document.getElementById(`other-letter`).textContent=a[0]?.toUpperCase()||`?`;var o=null,s=null;window.addEventListener(`beforeunload`,()=>{s&&s()}),e(e=>{if(!e)return window.location.href=`../index.html`;o=e,c()});function c(){s&&s(),s=t(i,e=>{u(e)})}function l(e){return e?(e.toDate?e.toDate():new Date(e)).toLocaleTimeString(`en-US`,{hour:`2-digit`,minute:`2-digit`}):``}function u(e){let t=document.getElementById(`messages`);if(e.length===0){t.innerHTML=`<div class="flex flex-col items-center justify-center py-16 gap-2">
          <p class="text-sm text-gray-400">No messages yet</p>
          <p class="text-xs text-gray-300">Say hello 👋</p>
        </div>`;return}t.innerHTML=e.map((e,t)=>{let n=e.senderId===o.uid,r=l(e.createdAt),i=``;return t===0&&(i=`<div class="flex items-center gap-3 my-2">
            <div class="flex-1 h-px bg-gray-100"></div>
            <span class="text-xs text-gray-400">Today</span>
            <div class="flex-1 h-px bg-gray-100"></div>
          </div>`),n?`${i}
            <div class="flex items-end justify-end gap-2">
              <div class="max-w-[72%]">
                <div class="bg-gray-900 rounded-2xl rounded-br-sm px-4 py-2.5">
                  <p class="text-sm text-white">${d(e.text)}</p>
                </div>
                <p class="text-xs text-gray-400 mt-1 text-right mr-1">${r} ✓</p>
              </div>
            </div>`:`${i}
            <div class="flex items-end gap-2">
              <div class="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <span class="text-rose-500 text-xs font-medium">${a[0]?.toUpperCase()}</span>
              </div>
              <div class="max-w-[72%]">
                <div class="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5">
                  <p class="text-sm text-gray-800">${d(e.text)}</p>
                </div>
                <p class="text-xs text-gray-400 mt-1 ml-1">${r}</p>
              </div>
            </div>`}).join(``),t.scrollHeight-t.scrollTop-t.clientHeight<50&&(t.scrollTop=t.scrollHeight)}function d(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}window.toggleSend=()=>{let e=document.getElementById(`message-input`),t=document.getElementById(`send-btn`),n=e.value.trim().length>0;t.disabled=!n,t.style.opacity=n?`1`:`0.4`},window.handleKey=e=>{e.key===`Enter`&&sendMsg()},window.sendMsg=async()=>{let e=document.getElementById(`message-input`),t=e.value.trim();if(!(!t||!o)){e.value=``,window.toggleSend();try{await n(i,o.uid,t)}catch(n){console.error(`sendMsg error:`,n),e.value=t,window.toggleSend()}}};