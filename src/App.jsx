
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";

/* ── tokens ── */
const G = "#C9A84C", N = "#0D1B2A", NM = "#1A3050", CR = "#FAF8F3", IV = "#F5F0E8", CH = "#2C3E50";

/* ── ALL IMAGES AS INLINE SVG COMPONENTS ── */
const HeroImg = () => (
  <img src="/dental.jpg" alt="Aura Dental" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
);

const ClinicSVG = ({h=420}) => (
  <img src="/care.jpg" alt="Aura Dental Clinic" style={{width:"100%",height:h,objectFit:"cover",display:"block"}}/>
);



















const DOC_IMGS = ["/doctor1.svg","/doctor2.svg","/doctor3.svg"];
const imgStyle = (h="100%") => ({width:"100%",height:h,objectFit:"cover",display:"block"});



const MapSVG = () => (
  <svg viewBox="0 0 500 200" width="100%" height="200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="200" fill="#e8efe8"/>
    {/* roads */}
    <rect x="0" y="88" width="500" height="10" fill="#d0ccc4"/>
    <rect x="68" y="0" width="10" height="200" fill="#d0ccc4"/>
    <rect x="200" y="0" width="10" height="200" fill="#d0ccc4"/>
    <rect x="350" y="0" width="10" height="200" fill="#d0ccc4"/>
    {/* buildings */}
    {[{x:85,y:12,w:95,h:68},{x:220,y:22,w:112,h:58},{x:368,y:12,w:72,h:68}].map((b,i)=>
      <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="4" fill={["#c8d4c0","#c0ccc0","#c8d4c0"][i]}/>
    )}
    {[{x:85,y:104,w:72,h:88},{x:220,y:104,w:120,h:88},{x:368,y:104,w:88,h:88}].map((b,i)=>
      <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="4" fill={["#c0ccc0","#c8d4c0","#bcc8bc"][i]}/>
    )}
    {/* pin */}
    <circle cx="256" cy="52" r="20" fill="#c9a84c" opacity="0.9"/>
    <circle cx="256" cy="52" r="13" fill="#c9a84c"/>
    <circle cx="256" cy="52" r="6" fill="#fff"/>
    <line x1="256" y1="32" x2="256" y2="18" stroke="#c9a84c" strokeWidth="2"/>
    <text x="256" y="14" textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill="#c9a84c" letterSpacing="1">AURA DENTAL</text>
  </svg>
);

const CtaBgSVG = () => (
  <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute",inset:0}}>
    <rect width="1200" height="500" fill="#080f18"/>
    <circle cx="200" cy="250" r="320" fill="#1a2e40" opacity="0.55"/>
    <circle cx="1050" cy="250" r="260" fill="#1a2e40" opacity="0.4"/>
    <path d="M600 70 C568 42 520 42 500 75 C480 108 492 158 514 198 C534 235 548 282 556 318 C560 338 578 338 582 318 C594 274 614 226 636 192 C658 154 670 108 650 76 C638 54 620 46 600 70Z" fill="none" stroke="rgba(201,168,76,0.14)" strokeWidth="4"/>
    <text x="120" y="145" fontSize="44" fill="rgba(201,168,76,0.08)">✦</text>
    <text x="980" y="400" fontSize="30" fill="rgba(201,168,76,0.07)">✦</text>
  </svg>
);

/* ── reusable animated section ── */
const FadeIn = ({children,style,delay=0}) => {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:"-60px"});
  return (
    <motion.div ref={ref} initial={{opacity:0,y:32}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.65,delay,ease:[0.25,0.46,0.45,0.94]}} style={style}>
      {children}
    </motion.div>
  );
};

/* ── useWindowWidth ── */
const useW = () => {
  const [w,setW] = useState(typeof window!=="undefined"?window.innerWidth:1200);
  useEffect(()=>{const f=()=>setW(window.innerWidth); window.addEventListener("resize",f); return()=>window.removeEventListener("resize",f);},[]);
  return w;
};

/* ── TESTIMONIALS ── */
const TESTS = [
  {t:"The most luxurious dental experience I've ever had. My smile transformation was beyond what I imagined possible.",n:"Kavitha S.",l:"Coimbatore"},
  {t:"Dr. Krishnan's artistry with veneers is unmatched. I feel 10 years younger and completely confident.",n:"Ramesh T.",l:"Coimbatore"},
  {t:"Finally a dental clinic that feels like a sanctuary. The team's warmth made every visit a pleasure.",n:"Anita M.",l:"Coimbatore"},
];

/* ── SERVICE DATA ── */
const SVCS = [
  {title:"Cosmetic Dentistry",desc:"Veneers, whitening & smile design crafted to your face.",img:<img src="/Cosmetic Dentistry.jpg" alt="Cosmetic Dentistry" style={imgStyle()}/>,tag:"Most Popular"},
  {title:"Dental Implants",   desc:"Permanent titanium replacements that feel completely natural.",img:<img src="/dental impleant.jpg" alt="Dental Implants" style={imgStyle()}/>,tag:""},
  {title:"Orthodontics",      desc:"Invisalign & braces — discreet, precise, effective.",img:<img src="/Orthodontics.jpg" alt="Orthodontics" style={imgStyle()}/>,tag:""},
  {title:"Preventive Care",   desc:"Cleanings, diagnostics & personalised health plans.",img:<img src="/Preventive Care.jpg" alt="Preventive Care" style={imgStyle()}/>,tag:""},
  {title:"Emergency Care",    desc:"Same-day appointments. Here when it matters most.",img:<img src="/care.jpg" alt="Emergency Care" style={imgStyle()}/>,tag:"24h"},
  {title:"Pediatric Dentistry",desc:"Gentle, child-friendly care kids look forward to.",img:<img src="/Pediatric Dentistry.jpg" alt="Pediatric Dentistry" style={imgStyle()}/>,tag:""},
];

const GALLERY_ITEMS = [
  {img:<img src="/ER MAKEOVER Cosmetic Veneer Makeover.jpg" alt="Veneer Makeover" style={imgStyle()}/>,label:"Veneer Makeover",tag:"Cosmetic"},
  {img:<img src="/Clinic Treatment Room.jpg" alt="Treatment Room" style={imgStyle()}/>,label:"Treatment Room",tag:"Clinic"},
  {img:<img src="/Implants Implant Restoration.jpg" alt="Implant Restoration" style={imgStyle()}/>,label:"Implant Restoration",tag:"Implants"},
  {img:<img src="/Clinic Advanced Equipment.jpg" alt="Advanced Equipment" style={imgStyle()}/>,label:"Advanced Equipment",tag:"Clinic"},
  {img:<img src="/Cosmetic Whitening Results.jpg" alt="Whitening Results" style={imgStyle()}/>,label:"Whitening Results",tag:"Cosmetic"},
  {img:<img src="/Ortho Invisalign Journey.jpg" alt="Invisalign Journey" style={imgStyle()}/>,label:"Invisalign Journey",tag:"Ortho"},
  {img:<img src="/Clinic Our Reception.jpg" alt="Our Reception" style={imgStyle()}/>,label:"Our Reception",tag:"Clinic"},
  {img:<img src="/Kids Pediatric Care.jpg" alt="Pediatric Care" style={imgStyle()}/>,label:"Pediatric Care",tag:"Kids"},
];

/* ── SHARED STYLES ── */
const sec = (bg=CR) => ({padding:"clamp(3rem,6vw,7rem) 20px",background:bg});
const inner = {maxWidth:1200,margin:"0 auto"};
const SLabel = ({children}) => <div style={{fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:G,marginBottom:12,fontFamily:"'DM Sans',sans-serif"}}>{children}</div>;
const STitle = ({children,light}) => <h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:300,color:light?"#fff":N,lineHeight:1.2,margin:"0 0 20px"}}>{children}</h2>;
const BtnGold = ({children,onClick,style={}}) => (
  <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={onClick}
    style={{background:G,color:"#fff",border:"none",borderRadius:4,padding:"13px 30px",fontSize:13,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",...style}}>
    {children}
  </motion.button>
);
const BtnNavy = ({children,onClick,style={}}) => (
  <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={onClick}
    style={{background:N,color:"#fff",border:"none",borderRadius:4,padding:"13px 30px",fontSize:13,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",...style}}>
    {children}
  </motion.button>
);
const BtnOutline = ({children,onClick}) => (
  <motion.button whileHover={{scale:1.03,background:N,color:"#fff"}} whileTap={{scale:0.97}} onClick={onClick}
    style={{background:"transparent",color:N,border:`1px solid ${N}`,borderRadius:4,padding:"13px 32px",fontSize:13,letterSpacing:"0.1em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",transition:"all 0.25s"}}>
    {children}
  </motion.button>
);

/* ── PAGE HEADER ── */
const PageHeader = ({label,title,BgSvg}) => (
  <section style={{position:"relative",overflow:"hidden",padding:"clamp(5rem,8vw,7rem) 20px clamp(3rem,5vw,5rem)",textAlign:"center"}}>
    {BgSvg}
    <div style={{position:"absolute",inset:0,background:"rgba(13,27,42,0.8)"}}/>
    <div style={{position:"relative",zIndex:1}}>
      <FadeIn><SLabel>{label}</SLabel><h1 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(2.2rem,5vw,3.8rem)",fontWeight:300,color:"#fff",margin:0}}>{title}</h1></FadeIn>
    </div>
  </section>
);

/* ── NAV ── */
function Nav({page,go}) {
  const [scrolled,setScrolled] = useState(false);
  const [open,setOpen] = useState(false);
  const w = useW(); const mob = w<768;
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>10); window.addEventListener("scroll",f); return()=>window.removeEventListener("scroll",f);},[]);
  const bg = scrolled||open;
  const linkC = bg?CH:"#fff";
  const linkShadow = !bg ? "0 1px 4px rgba(0,0,0,0.5)" : "none";
  return (
    <motion.nav initial={{y:-80}} animate={{y:0}} transition={{duration:0.6,ease:"easeOut"}}
      style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:bg?"rgba(250,248,243,0.97)":"transparent",backdropFilter:bg?"blur(20px)":"none",borderBottom:bg?`1px solid ${G}40`:"none",transition:"all 0.35s"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:68}}>
        <motion.div whileHover={{scale:1.02}} onClick={()=>go("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,background:G,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:15}}>✦</div>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:19,fontWeight:600,color:bg?N:"#fff",lineHeight:1}}>Aura Dental</div>
            <div style={{fontSize:9,color:G,letterSpacing:"0.18em",textTransform:"uppercase"}}>Coimbatore</div>
          </div>
        </motion.div>
        {!mob ? (
          <div style={{display:"flex",gap:4,alignItems:"center"}}>
            {["home","services","about","gallery","contact"].map(p=>(
              <motion.button key={p} whileHover={{color:G}} onClick={()=>go(p)}
                style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:14,letterSpacing:"0.04em",color:page===p?G:linkC,padding:"6px 14px",position:"relative",transition:"color 0.2s",textTransform:"capitalize",textShadow:linkShadow}}>
                {p.charAt(0).toUpperCase()+p.slice(1)}
                {page===p&&<motion.div layoutId="nav-bar" style={{position:"absolute",bottom:2,left:14,right:14,height:1,background:G}}/>}
              </motion.button>
            ))}
            <BtnGold onClick={()=>go("contact")} style={{marginLeft:8,padding:"10px 22px",fontSize:12}}>Book Now</BtnGold>
          </div>
        ) : (
          <motion.button whileTap={{scale:0.9}} onClick={()=>setOpen(p=>!p)}
            style={{background:"none",border:"none",cursor:"pointer",padding:8,display:"flex",flexDirection:"column",gap:5}}>
            {[0,1,2].map(i=>(
              <motion.span key={i} animate={open?i===0?{rotate:45,y:9}:i===1?{opacity:0}:{rotate:-45,y:-9}:{rotate:0,y:0,opacity:1}}
                style={{width:24,height:1.5,background:bg?N:"#fff",borderRadius:2,display:"block"}}/>
            ))}
          </motion.button>
        )}
      </div>
      <AnimatePresence>
        {mob&&open&&(
          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3}}
            style={{overflow:"hidden",background:"rgba(250,248,243,0.98)",borderTop:`1px solid ${G}40`}}>
            <div style={{padding:"1rem 20px 1.5rem",display:"flex",flexDirection:"column",gap:4}}>
              {["Home","Services","About","Gallery","Contact"].map(p=>(
                <motion.button key={p} whileTap={{x:6}} onClick={()=>{go(p.toLowerCase());setOpen(false);}}
                  style={{background:"none",border:"none",cursor:"pointer",textAlign:"left",fontFamily:"'DM Sans',sans-serif",fontSize:18,padding:"12px 0",color:CH,borderBottom:`1px solid ${G}40`}}>
                  {p}
                </motion.button>
              ))}
              <BtnNavy onClick={()=>{go("contact");setOpen(false);}} style={{marginTop:16,width:"100%",padding:14}}>Book Free Consultation</BtnNavy>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ── HOME ── */
function HomePage({go}) {
  const {scrollY} = useScroll();
  const yImg = useTransform(scrollY,[0,600],[0,-60]);
  const [ti,setTi] = useState(0);
  const w = useW(); const mob=w<768; const tab=w<1024;
  useEffect(()=>{const t=setInterval(()=>setTi(p=>(p+1)%TESTS.length),4500); return()=>clearInterval(t);},[]);

  const grid2 = {display:"grid",gridTemplateColumns:tab?"1fr":"1fr 1fr",gap:mob?"2.5rem":"5rem",alignItems:"center"};
  const grid3 = {display:"grid",gridTemplateColumns:mob?"1fr":tab?"1fr 1fr":"repeat(3,1fr)",gap:"1.5rem"};

  return (
    <div style={{background:CR}}>
      {/* HERO */}
      <section style={{minHeight:"100svh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:68}}>
        <motion.div style={{position:"absolute",inset:0,y:mob?0:yImg}}><HeroImg/></motion.div>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${N}dd 0%,${N}66 55%,transparent 100%)`}}/>
        <div style={{position:"relative",maxWidth:1200,margin:"0 auto",padding:mob?"4rem 20px":"4rem 2rem",width:"100%"}}>
          <FadeIn>
            <motion.div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(201,168,76,0.22)",border:`1px solid rgba(201,168,76,0.5)`,borderRadius:100,padding:"6px 16px",marginBottom:24}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:G,display:"inline-block"}}/>
              <span style={{fontSize:11,color:G,letterSpacing:"0.14em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>Coimbatore's Premier Clinic</span>
            </motion.div>
            <h1 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:mob?"2.6rem":tab?"3.6rem":"5rem",fontWeight:300,color:"#fff",lineHeight:1.05,marginBottom:"1.2rem"}}>
              Where Art Meets<br/><em style={{fontStyle:"italic",color:G}}>Dentistry</em>
            </h1>
            <p style={{fontSize:mob?15:17,color:"rgba(255,255,255,0.82)",lineHeight:1.85,marginBottom:"2.5rem",fontFamily:"'DM Sans',sans-serif",maxWidth:520}}>
              Experience dental care elevated to an art form — where precision science meets aesthetic mastery, crafting smiles that change lives.
            </p>
            <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              <BtnGold onClick={()=>go("contact")} style={{padding:mob?"12px 22px":"14px 32px"}}>Book Free Consultation</BtnGold>
              <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={()=>go("services")}
                style={{background:"transparent",color:"#fff",border:"1px solid rgba(255,255,255,0.5)",borderRadius:4,padding:mob?"12px 22px":"14px 32px",fontSize:13,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                Our Services →
              </motion.button>
            </div>
          </FadeIn>
          {!mob&&(
            <div style={{position:"absolute",right:"4%",top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:14}}>
              {[{icon:"✦",l:"15,000+ Smiles",s:"Transformed"},{icon:"◈",l:"Free First Visit",s:"Consultation"},{icon:"★",l:"4.9 / 5.0",s:"Google Rating"}].map((b,i)=>(
                <motion.div key={i} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{delay:0.6+i*0.15}} whileHover={{scale:1.04}}
                  style={{background:"rgba(250,248,243,0.93)",backdropFilter:"blur(12px)",borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:12,boxShadow:"0 8px 32px rgba(0,0,0,0.22)",minWidth:185}}>
                  <span style={{fontSize:22,color:G}}>{b.icon}</span>
                  <div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,color:N}}>{b.l}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:CH+"88"}}>{b.s}</div></div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <motion.div animate={{y:[0,10,0]}} transition={{duration:2,repeat:Infinity}}
          style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
          <div style={{width:1,height:44,background:`linear-gradient(to bottom,${G},transparent)`}}/>
          <span style={{fontSize:9,letterSpacing:"0.18em",color:G,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>Scroll</span>
        </motion.div>
      </section>

      {/* STATS */}
      <section style={{background:N,padding:"3rem 20px"}}>
        <div style={{...inner,display:"grid",gridTemplateColumns:mob?"repeat(2,1fr)":"repeat(4,1fr)",gap:"2rem"}}>
          {[["15,000+","Smiles Transformed"],["18","Years of Excellence"],["98%","Patient Satisfaction"],["12","Award Doctors"]].map(([num,lbl],i)=>(
            <FadeIn key={i} delay={i*0.08}>
              <div style={{textAlign:"center",padding:"1rem",borderRight:!mob&&i<3?`1px solid ${NM}`:""}}> 
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:mob?36:46,fontWeight:300,color:G}}>{num}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)"}}>{lbl}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section style={sec(CR)}>
        <div style={{...inner,...grid2}}>
          <FadeIn>
            <div style={{position:"relative"}}>
              <div style={{borderRadius:20,overflow:"hidden",height:mob?260:440}}><ClinicSVG h={mob?260:440}/></div>
              <motion.div animate={{y:[0,-8,0]}} transition={{duration:4,repeat:Infinity}}
                style={{position:"absolute",bottom:mob?-16:-24,right:mob?12:-24,background:G,borderRadius:14,padding:mob?"14px 18px":"20px 26px",boxShadow:"0 20px 60px rgba(201,168,76,0.38)"}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:mob?28:42,fontWeight:300,color:"#fff",lineHeight:1}}>18</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"rgba(255,255,255,0.9)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Years of Care</div>
              </motion.div>
            </div>
          </FadeIn>
          <FadeIn style={{paddingTop:mob?"2rem":0}}>
            <SLabel>Our Philosophy</SLabel>
            <STitle>Dentistry as an<br/><em style={{color:G}}>Art Form</em></STitle>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:15,color:CH+"cc",lineHeight:1.85,marginBottom:16}}>Founded in 2006 by Dr. Meera Krishnan, Aura Dental was born from a vision: that dental care should be a holistic, luxurious experience — not a dreaded necessity.</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:15,color:CH+"cc",lineHeight:1.85,marginBottom:32}}>We blend advanced technology with aesthetic artistry to craft smiles that are not just healthy, but breathtakingly beautiful.</p>
            <BtnNavy onClick={()=>go("about")}>Our Story →</BtnNavy>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={sec(IV)}>
        <div style={inner}>
          <FadeIn style={{textAlign:"center",marginBottom:"3rem"}}>
            <SLabel>What We Offer</SLabel>
            <STitle>Comprehensive Care,<br/><em style={{color:G}}>Exceptional Results</em></STitle>
          </FadeIn>
          <div style={grid3}>
            {SVCS.slice(0,3).map((s,i)=>(
              <FadeIn key={i} delay={i*0.1}>
                <motion.div whileHover={{y:-6,boxShadow:"0 24px 60px rgba(13,27,42,0.12)"}} onClick={()=>go("services")}
                  style={{background:"#fff",borderRadius:16,overflow:"hidden",border:`1px solid ${G}40`,cursor:"pointer"}}>
                  <div style={{height:200,overflow:"hidden",position:"relative"}}>
                    <div style={{width:"100%",height:"100%"}}>{s.img}</div>
                    {s.tag&&<div style={{position:"absolute",top:14,left:14,background:G,color:"#fff",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",borderRadius:4,padding:"4px 10px",fontFamily:"'DM Sans',sans-serif"}}>{s.tag}</div>}
                  </div>
                  <div style={{padding:"1.5rem"}}>
                    <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,fontWeight:500,color:N,marginBottom:10}}>{s.title}</h3>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:CH+"cc",lineHeight:1.7,margin:0}}>{s.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <FadeIn style={{textAlign:"center",marginTop:"2rem"}}><BtnOutline onClick={()=>go("services")}>View All 6 Services →</BtnOutline></FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{background:N,padding:"clamp(3rem,6vw,7rem) 20px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center,${NM} 0%,${N} 65%)`}}/>
        <div style={{maxWidth:760,margin:"0 auto",textAlign:"center",position:"relative"}}>
          <FadeIn>
            <SLabel>Patient Stories</SLabel>
            <AnimatePresence mode="wait">
              <motion.div key={ti} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-18}} transition={{duration:0.5}}>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"2.5rem",color:G,margin:"16px 0 10px"}}>"</div>
                <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:mob?"1.2rem":"1.5rem",fontWeight:300,color:"#fff",lineHeight:1.7,marginBottom:24,fontStyle:"italic"}}>{TESTS[ti].t}</p>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"rgba(255,255,255,0.7)"}}>— {TESTS[ti].n}, <span style={{color:G}}>{TESTS[ti].l}</span></div>
              </motion.div>
            </AnimatePresence>
            <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:28}}>
              {TESTS.map((_,i)=>(
                <motion.div key={i} onClick={()=>setTi(i)} animate={{width:i===ti?32:8,background:i===ti?G:"rgba(255,255,255,0.3)"}}
                  style={{height:4,borderRadius:4,cursor:"pointer"}}/>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section style={sec(CR)}>
        <div style={inner}>
          <FadeIn style={{textAlign:"center",marginBottom:"2.5rem"}}>
            <SLabel>Transformations</SLabel>
            <STitle>Real Results, <em style={{color:G}}>Real Smiles</em></STitle>
          </FadeIn>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)",gap:mob?"10px":"14px",gridAutoRows:mob?"160px":"210px"}}>
            {GALLERY_ITEMS.slice(0,mob?4:8).map((g,i)=>(
              <FadeIn key={i} delay={i*0.07}>
                <motion.div whileHover={{scale:1.03}} style={{position:"relative",borderRadius:12,overflow:"hidden",cursor:"pointer",height:"100%",
                  gridColumn:(!mob&&(i===0||i===4))?"span 2":"span 1",
                  gridRow:(!mob&&(i===0||i===4))?"span 2":"span 1"}}>
                  <div style={{width:"100%",height:"100%"}}>{g.img}</div>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,27,42,0.75) 0%,transparent 55%)"}}/>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 14px"}}>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:3}}>{g.tag}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:mob?13:15,color:"#fff"}}>{g.label}</div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <FadeIn style={{textAlign:"center",marginTop:"2rem"}}><BtnNavy onClick={()=>go("gallery")}>Full Gallery →</BtnNavy></FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section style={{position:"relative",overflow:"hidden",padding:"clamp(3rem,7vw,8rem) 20px",textAlign:"center"}}>
        <CtaBgSVG/>
        <div style={{position:"absolute",inset:0,background:`linear-gradient(to right,${N}ee 0%,${N}99 100%)`}}/>
        <div style={{position:"relative",maxWidth:700,margin:"0 auto"}}>
          <FadeIn>
            <SLabel>Begin Your Journey</SLabel>
            <h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:mob?"2rem":"3rem",fontWeight:300,color:"#fff",lineHeight:1.2,margin:"12px 0 18px"}}>
              Ready for Your<br/><em style={{color:G}}>Dream Smile?</em>
            </h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:15,color:"rgba(255,255,255,0.78)",lineHeight:1.8,marginBottom:36}}>Your first consultation is free. Our specialists craft a personalised plan — no pressure, no obligation.</p>
            <BtnGold onClick={()=>go("contact")} style={{fontSize:14,padding:"15px 44px"}}>Book Free Consultation</BtnGold>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

/* ── SERVICES ── */
function ServicesPage({go}) {
  const [hov,setHov] = useState(null);
  const w=useW(); const mob=w<768; const tab=w<1024;
  return (
    <div style={{background:CR,paddingTop:68}}>
      <PageHeader label="Our Expertise" title={<>Services &amp; <em style={{color:G}}>Treatments</em></>}
        BgSvg={<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{position:"absolute",inset:0}} xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="400" fill={N}/><circle cx="300" cy="200" r="300" fill={NM} opacity="0.4"/><circle cx="900" cy="200" r="250" fill={NM} opacity="0.3"/></svg>}/>
      <section style={sec(CR)}>
        <div style={inner}>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":tab?"1fr 1fr":"repeat(3,1fr)",gap:"2rem"}}>
            {SVCS.map((s,i)=>(
              <FadeIn key={i} delay={i*0.08}>
                <motion.div whileHover={{y:-6,boxShadow:"0 30px 80px rgba(13,27,42,0.14)"}}
                  onHoverStart={()=>setHov(i)} onHoverEnd={()=>setHov(null)}
                  style={{background:"#fff",borderRadius:20,overflow:"hidden",border:`1px solid ${G}50`,cursor:"pointer"}}>
                  <div style={{height:220,overflow:"hidden",position:"relative"}}>
                    <div style={{width:"100%",height:"100%"}}>{s.img}</div>
                    {s.tag&&<div style={{position:"absolute",top:14,left:14,background:G,color:"#fff",fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase",borderRadius:4,padding:"4px 10px",fontFamily:"'DM Sans',sans-serif"}}>{s.tag}</div>}
                  </div>
                  <div style={{padding:"2rem"}}>
                    <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:24,fontWeight:500,color:N,marginBottom:12}}>{s.title}</h3>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:CH+"cc",lineHeight:1.75,margin:"0 0 20px"}}>{s.desc}</p>
                    <motion.div animate={{width:hov===i?"100%":"40px"}} style={{height:2,background:G,borderRadius:2,marginBottom:16}}/>
                    <BtnOutline onClick={()=>go("contact")}>Book This →</BtnOutline>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <section style={sec(N)}>
        <div style={inner}>
          <FadeIn style={{textAlign:"center",marginBottom:"3rem"}}>
            <SLabel>Our Approach</SLabel>
            <h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:300,color:"#fff",margin:0}}>The Aura <em style={{color:G}}>Experience</em></h2>
          </FadeIn>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)",gap:"2rem"}}>
            {["Consultation","Diagnosis","Treatment","Aftercare"].map((step,i)=>(
              <FadeIn key={i} delay={i*0.1} style={{textAlign:"center"}}>
                <div style={{width:56,height:56,borderRadius:"50%",background:i%2===0?G:"rgba(255,255,255,0.1)",border:i%2!==0?`1px solid ${G}40`:"none",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,color:"#fff"}}>{i+1}</div>
                <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:20,color:"#fff",marginBottom:10}}>{step}</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"rgba(255,255,255,0.6)",lineHeight:1.7,margin:0}}>
                  {["Thorough evaluation of your smile goals and dental health.","Advanced 3D imaging and personalised treatment planning.","Expert care with the latest technology for lasting results.","Continuous support to maintain your perfect smile."][i]}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── ABOUT ── */
function AboutPage({go}) {
  const w=useW(); const mob=w<768; const tab=w<1024;
  const TEAM = [
    {name:"Dr. Meera Krishnan",role:"Lead Cosmetic Dentist",exp:"18 yrs",spec:"Smile Design & Veneers",img:DOC_IMGS[0]},
    {name:"Dr. Arjun Nair",role:"Implant Specialist",exp:"14 yrs",spec:"Implantology & Surgery",img:DOC_IMGS[1]},
    {name:"Dr. Priya Rajan",role:"Orthodontist",exp:"11 yrs",spec:"Invisalign & Braces",img:DOC_IMGS[2]},
  ];
  return (
    <div style={{background:CR,paddingTop:68}}>
      <PageHeader label="Our Story" title={<>About <em style={{color:G}}>Aura Dental</em></>}
        BgSvg={<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{position:"absolute",inset:0}} xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="400" fill={N}/><circle cx="300" cy="200" r="300" fill={NM} opacity="0.4"/></svg>}/>
      <section style={sec(CR)}>
        <div style={{...inner,display:"grid",gridTemplateColumns:tab?"1fr":"1fr 1fr",gap:mob?"3rem":"4rem",alignItems:"center"}}>
          <FadeIn>
            <SLabel>Philosophy</SLabel>
            <STitle>Dentistry as an<br/><em style={{color:G}}>Art Form</em></STitle>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:15,color:CH+"cc",lineHeight:1.9,marginBottom:18}}>Founded in 2006 by Dr. Meera Krishnan, Aura Dental was born from a vision: that dental care should be a holistic, luxurious experience — not a dreaded necessity.</p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:15,color:CH+"cc",lineHeight:1.9,marginBottom:32}}>We combine the science of dentistry with the artistry of aesthetics to craft smiles that are not just healthy, but breathtakingly beautiful.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:32}}>
              {[["2006","Year Founded",true],["Free","1st Consult",false],["Award","Winning",false],["5★","Google",true]].map(([n,l,dark],i)=>(
                <div key={i} style={{background:dark?N:IV,borderRadius:12,padding:"1.5rem",textAlign:"center",border:`1px solid ${G}40`}}>
                  <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:28,fontWeight:300,color:dark?G:N}}>{n}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:dark?"rgba(255,255,255,0.6)":CH+"88"}}>{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn style={{position:"relative"}}>
            <div style={{borderRadius:20,overflow:"hidden",height:mob?240:500}}><ClinicSVG h={mob?240:500}/></div>
            <motion.div animate={{y:[0,-8,0]}} transition={{duration:4,repeat:Infinity}}
              style={{position:"absolute",bottom:mob?-16:-24,left:mob?12:-24,background:"#fff",borderRadius:12,padding:"16px 20px",boxShadow:"0 20px 50px rgba(0,0,0,0.12)"}}>
              <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:26,color:G}}>15,000+</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:CH+"88",textTransform:"uppercase",letterSpacing:"0.08em"}}>Happy Patients</div>
            </motion.div>
          </FadeIn>
        </div>
      </section>
      {/* Equipment showcase */}
      <section style={{padding:"0 20px 4rem"}}>
        <div style={inner}>
          <FadeIn>
            <div style={{borderRadius:20,overflow:"hidden",height:mob?200:320}}><img src="/Clinic Advanced Equipment.jpg" alt="Advanced Equipment" style={{width:"100%",height:mob?200:320,objectFit:"cover",display:"block"}}/></div>
            <p style={{textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:13,color:CH+"60",marginTop:12,letterSpacing:"0.04em"}}>State-of-the-art digital imaging and laser dentistry technology</p>
          </FadeIn>
        </div>
      </section>
      {/* Team */}
      <section style={sec(IV)}>
        <div style={inner}>
          <FadeIn style={{textAlign:"center",marginBottom:"3rem"}}>
            <SLabel>The Specialists</SLabel>
            <STitle>Expert <em style={{color:G}}>Doctors</em></STitle>
          </FadeIn>
          <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:"2rem"}}>
            {TEAM.map((doc,i)=>(
              <FadeIn key={i} delay={i*0.1}>
                <motion.div whileHover={{y:-6}} style={{background:"#fff",borderRadius:20,overflow:"hidden",border:`1px solid ${G}40`}}>
                  <div style={{position:"relative",height:280,overflow:"hidden"}}>
                    <img src={doc.img} alt={doc.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,27,42,0.6) 0%,transparent 55%)"}}/>
                    <div style={{position:"absolute",bottom:16,left:16,fontFamily:"'DM Sans',sans-serif",fontSize:10,color:G,letterSpacing:"0.1em",textTransform:"uppercase"}}>{doc.spec}</div>
                  </div>
                  <div style={{padding:"1.5rem 2rem"}}>
                    <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,color:N,marginBottom:6}}>{doc.name}</h3>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:G,marginBottom:14}}>{doc.role}</div>
                    <span style={{fontSize:12,background:`${N}12`,borderRadius:4,padding:"5px 12px",color:N,fontFamily:"'DM Sans',sans-serif"}}>{doc.exp} experience</span>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── GALLERY ── */
function GalleryPage() {
  const [filter,setFilter] = useState("All");
  const [lb,setLb] = useState(null);
  const w=useW(); const mob=w<768;
  const tags = ["All","Cosmetic","Implants","Ortho","Clinic","Kids"];
  const filtered = filter==="All"?GALLERY_ITEMS:GALLERY_ITEMS.filter(g=>g.tag===filter);
  return (
    <div style={{background:CR,paddingTop:68,minHeight:"100vh"}}>
      <PageHeader label="Transformations" title={<>Smile <em style={{color:G}}>Gallery</em></>}
        BgSvg={<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{position:"absolute",inset:0}} xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="400" fill={N}/><circle cx="400" cy="200" r="280" fill={NM} opacity="0.4"/></svg>}/>
      <section style={sec(CR)}>
        <div style={inner}>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:"2.5rem",justifyContent:"center"}}>
            {tags.map(tag=>(
              <motion.button key={tag} whileTap={{scale:0.96}} onClick={()=>setFilter(tag)}
                style={{background:filter===tag?N:"#fff",color:filter===tag?"#fff":CH,border:`1px solid ${filter===tag?N:G+"80"}`,borderRadius:100,padding:"8px 20px",fontSize:13,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.04em",transition:"all 0.2s"}}>
                {tag}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={filter} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}
              style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)",gap:mob?"10px":"16px",gridAutoRows:mob?"160px":"200px"}}>
              {filtered.map((g,i)=>(
                <motion.div key={g.label+i} initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:i*0.06}}
                  whileHover={{scale:1.02}} onClick={()=>setLb(g)}
                  style={{position:"relative",borderRadius:14,overflow:"hidden",cursor:"pointer",
                    gridColumn:(!mob&&i===0)?"span 2":"span 1",gridRow:(!mob&&i===0)?"span 2":"span 1",height:"100%"}}>
                  <div style={{width:"100%",height:"100%"}}>{g.img}</div>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,27,42,0.75) 0%,transparent 55%)"}}/>
                  <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"12px 14px"}}>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:3}}>{g.tag}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:mob?13:15,color:"#fff"}}>{g.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      {/* Lightbox */}
      <AnimatePresence>
        {lb&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setLb(null)}
            style={{position:"fixed",inset:0,zIndex:500,background:"rgba(13,27,42,0.92)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
            <motion.div initial={{scale:0.85}} animate={{scale:1}} exit={{scale:0.85}} onClick={e=>e.stopPropagation()}
              style={{position:"relative",maxWidth:700,width:"100%",borderRadius:16,overflow:"hidden",background:CR}}>
              <div style={{height:400}}>{lb.img}</div>
              <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(to top,rgba(13,27,42,0.9),transparent)",padding:"2rem 1.5rem 1.5rem"}}>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>{lb.tag}</div>
                <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,color:"#fff"}}>{lb.label}</div>
              </div>
              <button onClick={()=>setLb(null)} style={{position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.18)",border:"none",color:"#fff",width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── CONTACT ── */
function ContactPage() {
  const [form,setForm] = useState({name:"",email:"",phone:"",service:"",msg:""});
  const [sent,setSent] = useState(false);
  const w=useW(); const mob=w<768; const tab=w<1024;
  const inp = {width:"100%",padding:"12px 16px",border:`1px solid ${G}80`,borderRadius:8,fontSize:15,color:CH,background:CR,outline:"none",boxSizing:"border-box",fontFamily:"'DM Sans',sans-serif"};
  return (
    <div style={{background:CR,paddingTop:68,minHeight:"100vh"}}>
      <PageHeader label="Get In Touch" title={<>Book Your <em style={{color:G}}>Consultation</em></>}
        BgSvg={<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{position:"absolute",inset:0}} xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="400" fill={N}/><circle cx="600" cy="200" r="350" fill={NM} opacity="0.35"/></svg>}/>
      <section style={sec(CR)}>
        <div style={{...inner,display:"grid",gridTemplateColumns:tab?"1fr":"1fr 1fr",gap:"4rem"}}>
          <FadeIn>
            <h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:mob?"1.8rem":"2.4rem",fontWeight:300,color:N,marginBottom:28}}>Visit <em style={{color:G}}>Us</em></h2>
            <div style={{borderRadius:16,overflow:"hidden",marginBottom:28,height:200}}><MapSVG/></div>
            <div style={{display:"flex",flexDirection:"column",gap:20}}>
              {[{icon:"📍",l:"Address",v:"42 Race Course Rd, R.S. Puram, Coimbatore 641002"},
                {icon:"📞",l:"Phone",v:"+91 422 456 7890"},
                {icon:"✉️",l:"Email",v:"hello@auradental.in"},
                {icon:"🕐",l:"Hours",v:"Mon–Sat: 9 AM – 8 PM · Sun: 10 AM – 3 PM"}].map((info,i)=>(
                <div key={i} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                  <div style={{width:42,height:42,borderRadius:10,background:`${G}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{info.icon}</div>
                  <div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:G,marginBottom:3}}>{info.l}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:CH,lineHeight:1.5}}>{info.v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:N,borderRadius:14,padding:"1.5rem 2rem",marginTop:24}}>
              <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:22,color:"#fff",marginBottom:10}}>Free First Consultation</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"rgba(255,255,255,0.72)",lineHeight:1.7}}>Meet our specialists, discuss your smile goals, and receive a personalised treatment plan — completely free, no obligation.</div>
            </div>
          </FadeIn>
          <FadeIn>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="success" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
                  style={{background:"#fff",borderRadius:20,padding:"4rem 2rem",textAlign:"center",border:`1px solid ${G}40`,minHeight:450,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                  <motion.div animate={{rotate:[0,20,-20,0]}} transition={{duration:0.5}} style={{fontSize:56,marginBottom:24,color:G}}>✦</motion.div>
                  <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:32,color:N,marginBottom:16}}>Appointment Requested!</h3>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:15,color:CH+"cc",lineHeight:1.7,maxWidth:320}}>Thank you, {form.name}. Our team will call you within 2 hours to confirm your visit.</p>
                  <div style={{width:48,height:2,background:G,margin:"28px auto 0"}}/>
                </motion.div>
              ) : (
                <motion.div key="form" style={{background:"#fff",borderRadius:20,padding:mob?"2rem 1.5rem":"3rem",border:`1px solid ${G}40`}}>
                  <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:28,fontWeight:300,color:N,marginBottom:28}}>Request an <em style={{color:G}}>Appointment</em></h3>
                  {[{k:"name",l:"Full Name",t:"text",p:"Your name"},{k:"email",l:"Email",t:"email",p:"you@email.com"},{k:"phone",l:"Phone",t:"tel",p:"+91 98765 43210"}].map(f=>(
                    <div key={f.k} style={{marginBottom:16}}>
                      <label style={{display:"block",fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:CH+"88",marginBottom:8}}>{f.l}</label>
                      <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} style={inp}/>
                    </div>
                  ))}
                  <div style={{marginBottom:16}}>
                    <label style={{display:"block",fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:CH+"88",marginBottom:8}}>Service</label>
                    <select value={form.service} onChange={e=>setForm(p=>({...p,service:e.target.value}))} style={inp}>
                      <option value="">Select a service...</option>
                      {SVCS.map(s=><option key={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div style={{marginBottom:24}}>
                    <label style={{display:"block",fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:CH+"88",marginBottom:8}}>Message</label>
                    <textarea rows={4} placeholder="Tell us about your smile goals..." value={form.msg} onChange={e=>setForm(p=>({...p,msg:e.target.value}))} style={{...inp,resize:"vertical"}}/>
                  </div>
                  <BtnNavy onClick={()=>{if(form.name&&form.email)setSent(true);}} style={{width:"100%",padding:15,borderRadius:8,fontSize:14}}>Book Free Consultation</BtnNavy>
                </motion.div>
              )}
            </AnimatePresence>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

/* ── FOOTER ── */
function Footer({go}) {
  const w=useW(); const mob=w<768;
  return (
    <footer style={{background:N,borderTop:`1px solid ${NM}`,padding:mob?"3rem 20px 2rem":"5rem 2rem 2rem"}}>
      <div style={inner}>
        <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"2fr 1fr 1fr 1fr",gap:mob?"2rem":"3rem",marginBottom:"3rem"}}>
          <div style={{gridColumn:mob?"span 2":"span 1"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <div style={{width:34,height:34,background:G,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#fff"}}>✦</div>
              <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:20,color:"#fff"}}>Aura Dental</div>
            </div>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"rgba(255,255,255,0.5)",lineHeight:1.8,maxWidth:240}}>Coimbatore's premier dental clinic — where artistry and science create your perfect smile.</p>
          </div>
          {[{title:"Services",links:["Cosmetic Dentistry","Dental Implants","Orthodontics","Emergency Care"],page:"services"},
            {title:"Clinic",  links:["About Us","Our Doctors","Gallery","Testimonials"],page:"about"},
            {title:"Contact", links:["Book Appointment","+91 422 456 7890","R.S. Puram, CBE"],page:"contact"}].map((col,i)=>(
            <div key={i}>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:G,marginBottom:16}}>{col.title}</div>
              {col.links.map(link=>(
                <div key={link} onClick={()=>go(col.page)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"rgba(255,255,255,0.5)",marginBottom:12,cursor:"pointer",transition:"color 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.8)"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}>{link}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${NM}`,paddingTop:"1.5rem",display:"flex",flexDirection:mob?"column":"row",justifyContent:"space-between",alignItems:mob?"flex-start":"center",gap:mob?8:0}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"rgba(255,255,255,0.3)"}}>© 2025 Aura Dental. All rights reserved.</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"rgba(255,255,255,0.3)"}}>Crafted with ✦ in Coimbatore</div>
        </div>
      </div>
    </footer>
  );
}

/* ── ROOT ── */
export default function App() {
  const [page,setPage] = useState("home");
  const go = (p) => { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); };
  const pages = { home:<HomePage go={go}/>, services:<ServicesPage go={go}/>, about:<AboutPage go={go}/>, gallery:<GalleryPage/>, contact:<ContactPage/> };
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}body{overflow-x:hidden}
        button{transition:all 0.2s ease}
        input:focus,textarea:focus,select:focus{border-color:#C9A84C!important;box-shadow:0 0 0 3px rgba(201,168,76,0.15)!important;outline:none!important}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      `}</style>
      <Nav page={page} go={go}/>
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:0.38,ease:"easeInOut"}}>
          {pages[page]}
        </motion.div>
      </AnimatePresence>
      <Footer go={go}/>
    </div>
  );
}
