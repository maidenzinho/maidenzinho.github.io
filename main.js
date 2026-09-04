/* ═══════════ maidenzinho // main.js v3 ═══════════ */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ═══════════ helpers ═══════════ */
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ═══════════ data ═══════════ */
  const PROJECTS = [
    { title:"Arquitetura PAM", fold:"sec://pam",
      desc:"Privileged Access Management com três containers Docker — Signer, Vault e Servidor-SSH. Arquitetura para blindar o acesso privilegiado.",
      tags:["Python","Docker","PAM","Segurança"],
      link:"https://github.com/maidenzinho/Arquitetura-PAM" },
    { title:"Sistema de Monitoramento", fold:"soc://defender",
      desc:"SOC caseiro: SMTP com relatório semanal de ataques, Grafana (Suricata + Elasticsearch + Filebeat) e exportação dos dados para Excel com gráficos.",
      tags:["Python","Grafana","Suricata","Elastic","SOC"],
      link:"https://github.com/maidenzinho/Sistema-de-Monitoramento" },
    { title:"Sistema de Diretórios", fold:"rust://fs-permissions",
      desc:"Sistema de diretórios e permissões escrito em Rust — manipulação segura de arquivos e controle de acesso.",
      tags:["Rust","Filesystem","Permissões"],
      link:"https://github.com/maidenzinho/Sistema-de-Diretorios-e-Permissoes-em-Rust" },
    { title:"AuChei", fold:"sec://lost-pet-finder",
      desc:"Plataforma com arquitetura robusta e segura para encontrar seu animalzinho perdido. Projeto de faculdade (PUCPR · Cibersegurança).",
      tags:["HTML","CSS","JS","PUCPR"],
      link:"https://github.com/maidenzinho/AuChei" },
    { title:"GamesLog", fold:"game://library",
      desc:"Gerenciador de bibliotecas de jogos: marque o que zerou, o que quer jogar, seus favoritos e muito mais.",
      tags:["Python","UI","Jogos"],
      link:"https://github.com/maidenzinho/GamesLog" },
    { title:"RPG em Java", fold:"game://text-rpg",
      desc:"Código e desenvolvimento de RPG — PjBL de POO (Cibersegurança, PUCPR 2025).",
      tags:["Java","POO","RPG"],
      link:"https://github.com/maidenzinho/RPGemJava" },
    { title:"VinhoSend", fold:"mail://secure",
      desc:"Projeto web para envio seguro de mensagens e conteúdo.",
      tags:["PHP","Web"],
      link:"https://github.com/maidenzinho/VinhoSend" }
  ];

  /* ═══════════ CTF core ═══════════ */
  const LEVELS = [
    { id:1, name:"RECON", dificuldade:"fácil",
      flag:"flag{r3c0n_0lho_v1v0}",
      desc:"Seu primeiro alvo: o que está escondido na primeira camada. Inspecione o ambiente — nada aparece de primeira à toa.",
      dica:"use ls -la — arquivos ocultos começam com '.'",
      solucao:[
        "1) Digite: ls            → você só vê os arquivos comuns.",
        "2) Digite: ls -la         → listar também arquivos ocultos (ponto).",
        "3) Encontre o arquivo oculto .h4ck3d no seu home.",
        "4) Digite: cat .h4ck3d    → a fase-1 flag é revelada.",
        "5) Verifique com: verify flag{...} (formato que achou)."
      ]},
    { id:2, name:"CRIPTOGRAFIA", dificuldade:"médio",
      flag:"flag{b4s3_64_n4_v3ia}",
      b64:"ZmxhZ3tiNHMzXzY0X240X3YzaWF9",
      desc:"A fase-2 está disfarçada. Copie a string codificada e transforme com os comandos de decodificação da shell.",
      dica:"existe um comando chamado decode para transformar strings.",
      solucao:[
        "1) A string codificada está num comentário do HTML (F12 → fonte) e também no arquivo .chave_b64.",
        "2) Também dá para achar com: ls -la ; cat .chave_b64",
        "3) Proteja o texto entre aspas e rode: decode <string>",
        "4) Repare que é base64: o decode detecta e decifra sozinho.",
        "5) O resultado é a fase-2 flag → verify flag{...}"
      ]},
    { id:3, name:"ESCALAÇÃO", dificuldade:"difícil",
      flag:"flag{pucpr_2o25_f0und_m3}",
      desc:"Último alvo. Três pedaços cifrados em ROT13 estão espalhados nos comentários do HTML. Decodifique, monte e valide — root te espera.",
      dica:"os pedaços A, B e C ficam em comentários do código-fonte.",
      solucao:[
        "1) Abra o código-fonte (Ctrl+U / F12).",
        "2) Procure os comentários com part-A.r13, part-B.r13 e part-C.r13.",
        "3) Cada pedaço está em ROT13. Use: rot13 <pedaço>  (ou decode).",
        "4) A  = puCpR_2o25_   ·   B = f0und_   ·   C = m3",
        "5) Junte A+B+C em minúsculas → pucpr_2o25_f0und_m3",
        "6) Montere e valide: verify flag{pucpr_2o25_f0und_m3}",
        "7) ACCESS GRANTED — agora você é root: cat /root/segredo.txt"
      ]}
  ];
  const PROG_KEY = "maidenzinho_ctf_v2";
  let progress = JSON.parse(localStorage.getItem(PROG_KEY) || "[0,0,0]");
  const done = lvl => progress[lvl-1] === 1;
  const save = () => localStorage.setItem(PROG_KEY, JSON.stringify(progress));
  const finalFlag = LEVELS[2].flag;

  const r13 = s => s.replace(/[a-zA-Z]/g, c => String.fromCharCode(((c.charCodeAt(0)&31)+13)%26+((c<="Z")?64:96)));
  const b64dec = t => { try { const s = atob(t.replace(/\s/g,"")); return /^[\x00-\x7F]+$/.test(s) ? s : null; } catch(e){ return null; } };
  const b64enc = t => btoa(t);

  /* ═══════════ boot loader ═══════════ */
  const boot = $("#boot");
  const bootLines = [
    "[ OK ] kernel module: maidenzinho.core",
    "[ OK ] carregando red-team modules",
    "[ OK ] montando /dev/curiosidade",
    "[ OK ] spoofing mac ................",
    "[ OK ] shell pronta · bem-vindo(a)"
  ];
  function bootSeq() {
    const lineEl = $("#bootLine"), fill = $("#bootFill");
    document.body.classList.remove("booting");
    let i = 0, ticks = 0;
    const maxT = 100;
    const iv = setInterval(() => {
      if (i < bootLines.length) { lineEl.textContent = bootLines[i]; i++; }
      ticks += 100 / 22;
      fill.style.width = Math.min(100, ticks) + "%";
      if (ticks >= 100) {
        clearInterval(iv);
        setTimeout(() => boot.classList.add("hide"), 220);
        setTimeout(start, 110);
      }
    }, 70);
  }
  function skipBoot() {
    if (!$("#bootFill").style.width || !boot.classList.contains("hide")) {
      boot.classList.add("hide");
      setTimeout(start, 60);
    }
  }
  ["keydown","click","touchstart"].forEach(ev => document.addEventListener(ev, function once(){
    skipBoot();
    document.removeEventListener(ev, once);
  }));

  /* ═══════════ start everything after boot ═══════════ */
  let started = false;
  function start() {
    if (started) return; started = true;
    rainInit();
    buildProjects();
    initType();
    initIntersection();
    initTicker();
    loadStats();
    magnetic();
    revealOnStart();
  }
  function revealOnStart() {
    requestAnimationFrame(() => { $$(".reveal-up").forEach(e => e.classList.add("in")); });
  }

  /* ═══════════ matrix rain ═══════════ */
  const rain = $("#rain");
  let ctx, cols = 0, drops = [];
  const glyphs = "アカサタナハマヤラワ0123456789ABCDEF$#&*<>/=!?maidenzinho";
  function rainInit() {
    if (!rain) return;
    ctx = rain.getContext("2d");
    size();
    drawRain();
  }
  function size() {
    rain.width = innerWidth; rain.height = innerHeight;
    cols = Math.max(1, Math.floor(rain.width / 16));
    drops = Array(cols).fill(1);
  }
  function drawRain() {
    ctx.fillStyle = "rgba(4,6,11,0.12)";
    ctx.fillRect(0, 0, rain.width, rain.height);
    ctx.font = "14px monospace";
    for (let i = 0; i < cols; i++) {
      const ch = glyphs[(Math.random() * glyphs.length) | 0];
      const y = drops[i] * 16;
      ctx.fillStyle = Math.random() > 0.975 ? "#e8fffb" : "#00ffe0";
      ctx.globalAlpha = 0.35 + Math.random() * 0.55;
      ctx.fillText(ch, i * 16, y);
      ctx.globalAlpha = 1;
      if (y > rain.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(drawRain);
  }

  /* ═══════════ cursor ═══════════ */
  const dot = $("#cDot"), ring = $("#cRing"), glow = $("#glow"), cLabel = $("#cLabel");
  let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
  addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    if (dot) dot.style.transform = `translate(${mx-3}px,${my-3}px)`;
  });
  (function ringLoop(){
    rx += (mx-rx)*0.16; ry += (my-ry)*0.16;
    if (ring) ring.style.transform = `translate(${rx-17}px,${ry-17}px)`;
    if (glow) glow.style.transform = `translate(${mx-260}px,${my-260}px)`;
    requestAnimationFrame(ringLoop);
  })();
  document.addEventListener("mouseover", e => {
    const hit = e.target.closest("a,button,.pcard,.tag,.soc,.rm");
    ring && ring.classList.toggle("hov", !!hit);
    if (cLabel && hit && e.target.closest(".pcard a,.soc")) {
      cLabel.textContent = "abrir ↗";
      cLabel.style.transform = `translate(${mx}px,${my}px) scale(1)`;
    } else if (cLabel && hit && e.target.closest("a")) {
      cLabel.textContent = "open ↗";
    }
  });

  /* ═══════════ progress + clock ═══════════ */
  const progress_bar = $("#progress");
  function onScroll(){ 
    const h = document.documentElement;
    const sc = h.scrollTop / (h.scrollHeight - h.clientHeight) || 0;
    if (progress_bar) progress_bar.style.transform = `scaleX(${sc})`;
    $(".topbar").classList.toggle("scrolled", h.scrollTop > 30);
  }
  addEventListener("scroll", onScroll, { passive:true });

  function clock() {
    const el = $("#clock"); if (!el) return;
    const d = new Date();
    el.textContent = [d.getHours(),d.getMinutes(),d.getSeconds()].map(n=>String(n).padStart(2,"0")).join(":");
  }
  clock(); setInterval(clock, 1000);

  /* ═══════════ mobile nav ═══════════ */
  const nav = $("#nav"), menuBtn = $("#menuBtn");
  if (menuBtn) menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open"); menuBtn.classList.toggle("open");
  });
  $$(".nav a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); menuBtn.classList.remove("open");
  }));

  /* ═══════════ hero typewriter ═══════════ */
  const heroOut = $('[data-out="1"]');
  const lines = [
    "$ nmap -sV --version-light pucpr.network",
    "> port scan .......... [OK]",
    "> shell obtida ........ [OK]",
    "welcome, agente. estou construindo o futuro.",
    "$ exit"
  ];
  let li=0, ci=0, deleting=false;
  function initType() {
    if (!heroOut || reduced) { if(heroOut){heroOut.classList.remove("hidden"); heroOut.textContent = lines[lines.length-2];} return; }
    setTimeout(type, 700);
  }
  function type() {
    heroOut.classList.remove("hidden");
    heroOut.textContent = lines[li].slice(0, ci);
    if (!deleting) {
      if (ci < lines[li].length){ ci++; setTimeout(type, 22); }
      else if (li < lines.length-1){ li++; ci = lines[li].length; deleting = true; setTimeout(type, 1400); }
      else { deleting = true; ci = lines[li].length; setTimeout(type, 6000); }
    } else {
      if (ci > 0){ ci--; setTimeout(type, 10); }
      else { if (li >= lines.length-1){ li = 0; } deleting = false; setTimeout(type, 500); }
    }
  }

  /* ═══════════ reveal / intersection ═══════════ */
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.15 });
  const rio = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting){ en.target.classList.add("in"); rio.unobserve(en.target); }
  }), { threshold: 0.2 });
  function initIntersection(){
    $$(".reveal, .reveal-up, .skill-block, .spotlight, .stat").forEach(el => io.observe(el));
    $$(".reveal-item").forEach((el,i)=> el.style.transitionDelay = (i%3)*110 + "ms");
    $$(".reveal-item").forEach(el => rio.observe(el));
  }

  /* ═══════════ ticker ═══════════ */
  function initTicker(){
    const track = $("#tickerTrack"); if(!track) return;
    const html = track.innerHTML;
    track.innerHTML = html + html;
  }

  /* ═══════════ magnetic buttons ═══════════ */
  function magnetic(){
    if (matchMedia("(hover:none)").matches) return;
    $$(".magnetic").forEach(btn => {
      btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        btn.style.transform = `translate(${x*0.22}px,${y*0.28}px)`;
      });
      btn.addEventListener("mouseleave", () => btn.style.transform = "");
    });
  }

  /* ═══════════ build projects (non-featured) ═══════════ */
  function buildProjects(){
    const grid = $("#grid"); if(!grid) return;
    grid.innerHTML = PROJECTS.map((p,i)=>`
      <article class="pcard reveal">
        <div class="bg-scan"></div>
        <span class="p-corner">${String(i+1).padStart(2,"0")}</span>
        <div class="p-top">
          <span class="p-fold">${p.fold}</span>
        </div>
        <h3 class="p-title">${p.title}</h3>
        <p class="p-desc">${p.desc}</p>
        <div class="p-tags">${p.tags.map(t=>`<span class="p-tag">${t}</span>`).join("")}</div>
        <div class="p-links"><a href="${p.link}" target="_blank" rel="noopener">[ ver código ] ↗</a></div>
      </article>`).join("");
    $$(".pcard").forEach((card,i)=>{
      io.observe(card);
      card.addEventListener("mousemove", tilt);
      card.addEventListener("mouseleave", ()=> card.style.transform="");
    });
  }
  function tilt(e){
    const c = e.currentTarget; const r = c.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width - .5, y = (e.clientY-r.top)/r.height - .5;
    c.style.transform = `perspective(760px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-5px)`;
  }

  /* ═══════════ stats via GitHub API ═══════════ */
  async function loadStats(){
    const deco = (t,n,dur=1400)=>{
      const el = $(".s-num", t); if(!el) return;
      const from = 0;
      const t0 = performance.now();
      (function step(now){
        const p = Math.min(1,(now-t0)/dur);
        const e = 1-Math.pow(1-p,3);
        el.textContent = Math.floor(from + (n-from)*e).toLocaleString("pt-BR");
        if(p<1) requestAnimationFrame(step);
      })(t0);
    };
    try{
      const u = await fetch("https://api.github.com/users/maidenzinho").then(r=>r.json());
      const rl = await fetch("https://api.github.com/users/maidenzinho/repos?per_page=100&type=all").then(r=>r.json());
      const repos = Array.isArray(rl)?rl:[];
      const publicCount = (u && u.public_repos) || repos.length;
      const stars = repos.reduce((s,r)=>s+(r.stargazers_count||0),0);
      const langs = new Set(repos.map(r=>r.language).filter(Boolean));
      const stats = $$(".stat");
      if (stats[0]) deco(stats[0], publicCount);
      if (stats[1]) deco(stats[1], stars);
      if (stats[2]) deco(stats[2], langs.size || 1);
      if (stats[3]) { const el=$(".s-num",stats[3]); if(el) el.textContent="2024"; }
    }catch(e){ }
  }

  /* ═══════════ year ═══════════ */
  $("#year").textContent = new Date().getFullYear();

  /* ═══════════ toast ═══════════ */
  let toastTimer;
  function toast(msg, cls=""){
    const t=$("#toast"); t.textContent=msg; t.className="toast show "+cls;
    clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove("show"),3600);
  }

  /* ═══════════ grant / root ═══════════ */
  let granted = false;
  function setRoot(v){
    granted = v;
    $("#shellUser").textContent = (v?"root":"guest")+"@maidenzinho — ghost shell ["+(v?"root":"guest")+"]";
    $("#shellPromptLeft").textContent = v?"root@maidenzinho":"guest@maidenzinho";
  }
  function grant(){
    if (granted) return; granted = true;
    const to = $("#termOpen"), sh = $("#shell");
    to.classList.add("grant");
    sh.classList.add("grant");
    setTimeout(()=>sh.classList.remove("grant"),650);
    toast("🚩 ACCESS GRANTED — você achou o flag.", "grant");
    $("#finalFlag").textContent = finalFlag;
    setTimeout(()=>$("#grantModal").classList.add("show"), 500);
    document.body.classList.remove("booting");
    setRoot(true);
    printProg();
  }
  $("#grantClose").addEventListener("click", ()=>$("#grantModal").classList.remove("show"));
  $("#grantModal").addEventListener("click", e=>{ if(e.target.id==="grantModal") e.currentTarget.classList.remove("show"); });

  /* ═══════════ konami ═══════════ */
  const KONAMI=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let k=0;
  addEventListener("keydown", e=>{
    const key = e.key.length===1?e.key.toLowerCase():e.key;
    k = (key===KONAMI[k])? k+1 : (key===KONAMI[0]?1:0);
    if(k===KONAMI.length){
      k=0;
      if(!$("#shell").classList.contains("open")) openShell();
      print("⇢ ghost shell desbloqueada — acesso elevado.","grn");
      print("hint: o shell conhece um comando chamado ctf.","whi");
      toast("KONAMI · ghost shell acessível","grant");
    }
  });

  /* ═══════════ shell ═══════════ */
  const shell=$("#shell"), shellBody=$("#shellBody"), shellInput=$("#shellInput"),
        shellIn=$("#shellIn"), shellClose=$("#shellClose"), termOpen=$("#termOpen");
  function openShell(){ shell.classList.add("open"); setTimeout(()=>shellInput.focus(),120); }
  function closeShell(){ shell.classList.remove("open"); shellInput.blur(); }
  termOpen.addEventListener("click", ()=> shell.classList.contains("open")? closeShell():openShell());
  shellClose.addEventListener("click", closeShell);

  addEventListener("keydown", e=>{
    if(e.key==="/" && !e.ctrlKey && !e.metaKey && document.activeElement.tagName!=="INPUT"){
      e.preventDefault(); shell.classList.contains("open")?closeShell():openShell();
    }
    if(e.key==="Escape") closeShell();
  });

  function print(text, cls="out"){
    const d=document.createElement("div"); d.className="sh-out "+cls; d.textContent=text;
    shellBody.appendChild(d); shellBody.scrollTop=shellBody.scrollHeight;
  }
  function printProg(){
    const p = $("#shellProg"); if(!p) return;
    p.innerHTML = LEVELS.map(l=>{
      const st = done(l.id) ? "<b>✓</b>" : "•";
      return `<span class="${done(l.id)?"ok":"todo"}">${st} ${l.name}</span>`;
    }).join(" ");
  }

  print("╔═══════════════════════════════════════╗","cyn");
  print("║  MAIDENZINHO · GHOST SHELL v3.0      ║","cyn");
  print("║  red team playground — digite help    ║","cyn");
  print("╚═══════════════════════════════════════╝","cyn");
  print("CTF: 3 fases esperando por você. comece com: ctf","dim");

  /* ────────── virtual filesystem ────────── */
  const isRoot = () => granted;
  const FLAG1 = LEVELS[0].flag;
  const B64_L2 = LEVELS[1].b64;
  const FILES = {
    "~": {
      "about.txt": ["Felipe Fernandes · @maidenzinho","Estudante de Cibersegurança (PUCPR) · Red Team","Curitiba, BR — atacando sistemas para deixá-los mais fortes.","Áreas: pentest, monitoramento/SOC, PAM, Python e Rust."],
      "skills.txt": ["// operações: red team, pentest, monitoramento SOC, linux, redes","// tools: burp, nmap, metasploit, grafana, suricata, wireshark, docker, git","// langs: python, rust, java, php, sql, bash, js/ts, html/css"],
      "projects.txt": ["Destaques: Vibez · Arquitetura PAM · Sistema de Monitoramento · AuChei","Também: Diretórios (Rust) · GamesLog · RPG Java · VinhoSend","→ github.com/maidenzinho"],
      "contact.txt": ["github   → github.com/maidenzinho","linkedin → /in/maidenzinho","x        → @maidenzinho","aberto a projetos, CTFs e desafios."],
      "mapa_r13.txt": ["ROT13: troca cada letra por 13 posições a frente (A↔N, B↔O...).","Use: rot13 <texto>   para decifrar.","Ex.: ls  → yf? não... r13('ls') = 'yf'.","Numérico e símbolos não mudam: 'z3' → 'm3'."],
      "log_nginx.txt": ["192.168.1.7  GET /secret/ 404","10.0.0.11     GET /phpinfo.php 200","172.16.3.9    POST /admin/login 403","192.168.1.7   (✗) muitas tentativas... olho vivo.","# dica: arquivos que começam com '.' não aparecem no ls comum."],
      ".h4ck3d": ["você olhou fundo o bastante.","fase-1 flag → " + FLAG1],
      ".chave_b64": ["pista-fase2 (base64): ", B64_L2, "", "copie tudo entre aspas e rode: decode <string>"],
      "flag_hint.r13": ["[root] flag final → " + finalFlag, "você precisa de root para ler isto. já é root? 🚩"]
    },
    "/root": {
      "segredo.txt": ["██ root shell ██","","você escalou até aqui.","flag final: " + finalFlag, "bem-vindo(a) ao time. 🚩"]
    }
  };
  const PERMS = { normal:["about.txt","skills.txt","projects.txt","contact.txt","mapa_r13.txt","log_nginx.txt"], 
                  hidden:["flag_hint.r13",".chave_b64"] };
  // .h4ck3d é oculto por nome; flag_hint.r13 é oculto por permissão (root)
  const HIDDEN_NAMES = [".h4ck3d", ".chave_b64"];

  const CMDS = {};

  function lsDir(dir, showAll){
    const d = dir||"~";
    if(d==="/root" && !isRoot()) return print("ls: não é possível abrir diretório /root: Permission denied","err");
    const files = FILES[d]||{};
    const names = Object.keys(files);
    print("total " + names.length, "dim");
    names.forEach(n=>{
      const hidden = HIDDEN_NAMES.includes(n) || n.startsWith(".");
      const rootOnly = n==="flag_hint.r13";
      const line = rootOnly ? "-rw-r----- root  root  guest   "+n
                    : hidden     ? "-rw-rw-r-- guest  guest   "+n
                    :              "drwxr-xr-x guest  guest   "+n;
      if(hidden && !showAll) return;
      print(line, rootOnly ? "err" : (hidden?"cyn":"out"));
    });
    if(!showAll) print("dica: use ls -la para ver arquivos ocultos.","dim");
  }

  function catFile(name, dir){
    const d = dir||"~";
    const f = FILES[d]&&FILES[d][name];
    if(name==="flag_hint.r13"){
      if(isRoot()){ print("conteúdo de flag_hint.r13:","grn"); FILES["~"]["flag_hint.r13"].forEach(l=>print("  "+l,"whi")); }
      else print("[permission denied] você não é root. tente: sudo -l","err");
      return;
    }
    if(f){ f.forEach(l=>print(l,"out")); }
    else print(`cat: ${name}: arquivo não encontrado`,"err");
  }

  /* ────────── commands ────────── */
  CMDS.help = function(a){
    print("CTF — comandos:","whi");
    print("  ctf · niveis · solucao [1-3] · resposta [1-3] · walkthrough","cyn");
    print("  verify flag{...} · rot13 <txt> · decode <txt> · b64 <txt> · b64 -d <txt>","cyn");
    print("  ls [-la] · cat <arq> · find <padrão> · pwd · cd · whoami · id · uname -a","dim");
    print("  sudo -l · sudo <cmd> · su · cat /root/segredo.txt · date · banner","dim");
    print("  skills · projects · contact · about · echo · history · clear · exit","dim");
    print("comece com: ctf","whi");
  };
  CMDS.niveis = CMDS.ctf = function(){
    print("── CTF · 3 FASES ──","cyn");
    LEVELS.forEach(l=>{
      print(`[${done(l.id)?"✓":"#"}] fase ${l.id} · ${l.name} (${l.dificuldade}) — ${done(l.id)?"concluída":"pendente"}`, done(l.id)?"grn":"whi");
      print("    "+l.desc, "dim");
      if(!done(l.id)) print("    dica: "+l.dica, "dim");
    });
    print("valide um flag com: verify flag{...}   ·   veja solução com: solucao <fase>","dim");
  };
  // aliases também funcionam via prefixo sem espaço? manter simples.

  const SOL = {
    "1":()=>LEVELS[0].solucao,
    "2":()=>LEVELS[1].solucao,
    "3":()=>LEVELS[2].solucao,
    "recon":()=>LEVELS[0].solucao,
    "criptografia":()=>LEVELS[1].solucao,
    "escalacao":()=>LEVELS[2].solucao
  };
  CMDS.solucao = CMDS.resposta = CMDS.walkthrough = function(arg){
    if(!arg){
      print("solução passo a passo — escolha a fase:","whi");
      print("  solucao 1  ·  solucao 2  ·  solucao 3","cyn");
      print("fase 1 · recon — "+LEVELS[0].flag,"dim");
      print("fase 2 · criptografia — "+LEVELS[1].flag,"dim");
      print("fase 3 · escalação — "+LEVELS[2].flag,"dim");
      print("(spoiler! use somente se estiver travado.)","err");
      return;
    }
    const key = arg.trim().toLowerCase();
    const lv = LEVELS.find(l=>l.id===+key || l.name.toLowerCase()===key);
    const steps = lv ? lv.solucao : null;
    if(!steps){ return print("solucao: fase inválida. use 1, 2 ou 3.","err"); }
    print(`── SOLUÇÃO · FASE ${lv.id} · ${lv.name.toUpperCase()} ──`,"cyn");
    steps.forEach(l=>print("  "+l,"grn"));
  };
  CMDS["help solucao"] = () => print("mostra o passo a passo de como resolver cada fase do CTF. use: solucao <fase>","dim");
  CMDS["help ctf"] = () => print("mostra as 3 fases do CTF, seu progresso e dicas.","dim");

  function handleVerify(arg){
    const input = (arg||"").trim().toLowerCase();
    const lv = LEVELS.find(l=>l.flag.toLowerCase()===input);
    if(!lv){
      print("ACCESS DENIED — flag inválida.","err");
      print("confira o formato: verify flag{...}","dim");
      print("dica: se tiver travado, use: solucao 1 / 2 / 3","dim");
      return;
    }
    // gating: precisa ter resolvido as anteriores
    for(let i=1;i<lv.id;i++){ if(!done(i)){ print("ACCESS DENIED — resolva a fase "+i+" primeiro.","err"); print("use: ctf para ver o progresso e solucao "+i,"dim"); return; } }
    progress[lv.id-1] = 1; save(); printProg();
    print("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓","grn");
    print(`ACCESS GRANTED — fase ${lv.id} (${lv.name}) concluída!`,`grn`);
    print("  "+lv.flag,"whi");
    if(lv.id<3){
      print(`próxima fase: ${LEVELS[lv.id].name} — veja dica em 'ctf'.`,"dim");
    } else {
      print("você resolveu o CTF inteiro. você é root agora. 🚩","grn");
      print("leia: cat /root/segredo.txt","dim");
    }
    print("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓","grn");
    if(lv.id===3) grant();
    else toast(`fase ${lv.id} · ${lv.name} ✓`,"grant");
  }

  /* ── translate/transform helpers ── */
  function translate(text, kind){
    if(!kind){
      const candidates = {
        rot13: r13(text),
        base64: b64dec(text)
      };
      print("rodando decodificadores automaticamente...","dim");
      for(const m in candidates){
        const v = candidates[m];
        if(v==null || v==="" || v===text) continue;
        print(`[${m}] → ${v}`,"out");
        const match = LEVELS.find(l => l.flag.toLowerCase()===v.trim().toLowerCase());
        if(match) print(`✨ isso parece ser a flag da fase ${match.id} (${
match.name}) — valide: verify ${v.trim()}`,"grn");
      }
      // b64 of something might decode to flag text; also try encoding?
      if(!text) print("uso: decode <string>","dim");
      print("se nada apareceu, tente: rot13 <string> ou b64 -d <string>","dim");
      return;
    }
    // explicit
    if(kind==="rot13") print(r13(text),"out");
    else if(kind==="-d"){
      const d = b64dec(text);
      print(d!=null?d:"erro: não é base64 válido.","out");
      const match = LEVELS.find(l=>l.flag.toLowerCase()===(d||"").trim().toLowerCase());
      if(match) print(`✨ flag da fase ${match.id} — valide com verify!`,"grn");
    }
    else if(kind==="encode"||kind==="-e") print(b64enc(text),"out");
  }

  CMDS.whoami = ()=>{ print(granted?"root — você é o administrador deste portfólio. 🚩":"guest — usuário sem privilégios. mas curiosidade conta como 0day.","out"); };
  CMDS.id = ()=> print(granted?"uid=0(root) gid=0(root) groups=0(root)":"uid=1000(guest) gid=1000(guest) groups=1000(guest),27(sudo)","out");
  CMDS["uname -a"] = ()=> print("Linux maidenzinho 6.6.1-cyber #1 SMP x86_64 GNU/Linux","out");
  CMDS["uname"] = ()=> print("Linux","out");
  CMDS["pwd"] = ()=> print(granted?"/root":"/home/guest","out");
  CMDS["history"] = ()=> print("[CTF] seu histórico está sereno. — dica extra: 'help' tem todos os comandos.","dim");
  CMDS.echo = (a)=> print(a||"","out");
  CMDS.date = ()=> print(new Date().toString(),"out");
  CMDS.banner = ()=>{ print("             _       _","cyn");print("  /\\  /\\___ (_) __ _(_)_   _  ____","cyn");print(" / /_/ / _ \\/ |/ _` | \\ \\/ / |  _ \\","cyn");print("/ __  /  __/| | (_| | |>  <| | | | |","cyn");print("\\/ /_/ \\___|_|_\\__, |_/_/\\_\\_|_| |_|","cyn");print("               |___/","cyn");print("red team · cibersegurança · maidenzinho · CTF 3 fases","dim"); };
  CMDS.skills = ()=> FILES["~"]["skills.txt"].forEach(l=>print(l,"out"));
  CMDS.projects = ()=> FILES["~"]["projects.txt"].forEach(l=>print(l,"out"));
  CMDS.contact = ()=> FILES["~"]["contact.txt"].forEach(l=>print(l,"out"));
  CMDS["about"] = ()=> FILES["~"]["about.txt"].forEach(l=>print(l,"out"));
  CMDS.ls = function(arg){
    let a=(arg||"").trim();
    const showAll = /\-la|\-al/.test(a);
    const target = (a.replace(/\-la|\-al|\-a|\-l/g," ").trim()||"~");
    lsDir(target, showAll);
  };
  CMDS.cat = (a)=> catFile((a||"").trim(), (/root\//.test(a||"")?"/root":"~"));
  CMDS.cd = function(a){
    const t=(a||"").trim();
    if(!t||t==="~"||t==="/home/guest"||t==="/") print("agora em ~ (home do guest)","dim");
    else if(t==="/root"){ if(isRoot()) print("agora em /root","dim"); else print("cd: /root: Permission denied (operação permitida para root)","err"); }
    else print(`cd: ${t}: diretório não encontrado nessa simulação`,"err");
  };
  CMDS.find = function(a){
    const pat=(a||"").trim().toLowerCase();
    let found=0;
    ["~","/root"].forEach(dir=>{
      if(dir==="/root" && !isRoot()) return;
      Object.keys(FILES[dir]||{}).forEach(n=>{
        if(!pat || n.toLowerCase().includes(pat)){ print(`${dir}/${n}`,"out"); found++; }
      });
    });
    if(!found) print("find: nada encontrado","dim");
  };
  CMDS.file = function(a){
    const n=(a||"").trim();
    if(!n) return print("file: falta o nome do arquivo","err");
    const ext = n.split(".").pop();
    const t = { "txt":"ASCII text","r13":"ASCII text (ROT13?)","log":"ASCII text (log)","b64":"base64 data","":n}
    print(n+": "+ (n.endsWith("flag_hint.r13")?"ASCII text (cifrado · só root lê)":(t[ext]||"data")) ,"out");
  };
  CMDS.strings = function(a){
    const n=(a||"").trim();
    if(!n) return print("strings: falta o nome do arquivo","err");
    if(n==="flag_hint.r13"){ if(isRoot()) FILES["~"]["flag_hint.r13"].forEach(l=>print("flag_hint.r13: "+l,"out")); else print("strings: flag_hint.r13: Permission denied","err"); return; }
    const f=FILES["~"][n]||FILES["/root"]&&FILES["/root"][n];
    if(f) f.forEach(l=>print(n+": "+l,"out")); else print("strings: "+n+": arquivo não encontrado","err");
  };
  CMDS["sudo -l"] = ()=>{
    print("Matching Defaults entries for guest:", "out");
    print("    env_reset, timestamp_timeout=0","out");
    print("User guest may run the following commands on maidenzinho:","out");
    print("    (ALL) NOPASSWD: /usr/bin/verify flag{...}","grn");
    print("    (ALL) NOPASSWD: /usr/bin/cat /root/segredo.txt   "+ (granted?"[disponível]":"[exige flag da fase 3]"), isRoot()?"grn":"dim");
  };
  CMDS.sudo = function(arg){
    const rest=(arg||"").trim();
    if(/^cat \/root\/segredo\.txt$/.test(rest)&&isRoot()){ print("(root) "+granted+"" ); FILES["/root"]["segredo.txt"].forEach(l=>print(l,"out")); return; }
    if(/^verify /.test(rest)){ handleVerify(rest.replace("verify ","")); return; }
    if(!rest) return print("uso: sudo <comando>   |   veja: sudo -l","dim");
    print("sudo: "+rest+" — permissão negada (ou tente cat /root/segredo.txt depois de root)","err");
  };
  CMDS.su = ()=>{ print(isRoot()?"já sou root. 🚩":"su: authentication failure (precisa da fase 3 / verify)","err"); };
  CMDS["cat /root/segredo.txt"] = ()=>{ handleCatRoot(); };
  function handleCatRoot(){
    if(isRoot()) FILES["/root"]["segredo.txt"].forEach(l=>print(l,"out"));
    else print("cat: /root/segredo.txt: Permission denied (só root) — resolva a fase 3.","err");
  }

  CMDS.verify = function(arg){ handleVerify(arg); };

  CMDS.clear = ()=> shellBody.innerHTML="";
  CMDS.exit = ()=> closeShell();

  /* ── rot13 / b64 / decode direct calls handled in run ── */

  function run(raw){
    const line=(raw||"").trim(); if(!line) return;
    const echo=document.createElement("div"); echo.className="sh-out cmd";
    echo.textContent = (granted?"root":"guest")+"@maidenzinho:~$ "+line;
    shellBody.appendChild(echo); shellBody.scrollTop=shellBody.scrollHeight;
    const p=line.split(/\s+/), cmd=p[0].toLowerCase();
    const arg=p.slice(1).join(" ");
    const full=line.trim().toLowerCase();

    // transform commands
    if(cmd==="decode"){ return translate(arg); }
    if(cmd==="rot13"){ return print(r13(arg),"out"); }
    if(cmd==="b64"){
      if(p[1]==="-d"||p[1]==="-e"||p[1]==="encode"||p[1]==="decode"){ return translate(p.slice(2).join(" "), p[1]); }
      return print(b64enc(arg),"out");
    }

    // help with optional subcommand
    if(cmd==="help"){
      if(p[1] && CMDS["help "+p[1]]) return CMDS["help "+p[1]]();
      return CMDS.help(arg);
    }
    if(cmd==="solucao"||cmd==="resposta"||cmd==="walkthrough") return CMDS.solucao(arg);
    if(cmd==="verify") return handleVerify(arg);
    if(cmd==="sudo"){
      if(!arg) return CMDS["sudo -l"]();
      if(/^-l$/.test(arg)) return CMDS["sudo -l"]();
      return CMDS.sudo(arg);
    }
    if(CMDS[full]) return CMDS[full]();
    if(CMDS[cmd]) return CMDS[cmd](arg);
    print(`bash: ${cmd}: comando não encontrado. tente 'help'.`,"err");
  }

  CMDS["help verify"]=()=>print("valida um flag do formato flag{...}. use: verify flag{...}","dim");
  CMDS["help ls"]=()=>print("lista arquivos. use ls -la para ver ocultos.","dim");
  CMDS["help decode"]=()=>print("tenta decifrar uma string (rot13/base64) automaticamente.","dim");
  CMDS["help rot13"]=()=>print("aplica ROT13 em um texto.","dim");
  CMDS["help b64"]=()=>print("b64 <txt> codifica · b64 -d <txt> decodifica.","dim");
  CMDS["help find"]=()=>print("procura arquivos por nome: find <padrão>","dim");
  CMDS["help cat"]=()=>print("mostra conteúdo de um arquivo.","dim");

  shellIn.addEventListener("submit",e=>{ e.preventDefault(); run(shellInput.value); shellInput.value=""; });
  shellInput.addEventListener("keydown", e=>e.stopPropagation());
  addEventListener("keydown", e=>{
    if(!$("#shell").classList.contains("open") && e.key.match(/^[a-z0-9]$/i) && !e.ctrlKey && !e.metaKey && !e.target.closest("input,textarea")){
      openShell(); shellInput.value=e.key; shellInput.setSelectionRange(1,1);
    }
  });

  addEventListener("resize", size);

  /* ---------- launch ---------- */
  if (reduced) { skipBoot(); } else { bootSeq(); }

  // init prompt state + progress after mount
  setRoot(false);
  printProg();
})();