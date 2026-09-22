export const scenes=[
 {key:'intro',section:'intro',start:0,end:13.5,anchor:12,label:'Zain Alvi'},
 {key:'research-0',section:'research',experience:0,start:13.5,end:16.5,anchor:15,label:'Series 01 / Vanderbilt'},
 {key:'research-1',section:'research',experience:1,start:16.5,end:19.5,anchor:18,label:'Series 02 / Stanford'},
 {key:'research-2',section:'research',experience:2,start:19.5,end:22.5,anchor:21,label:'Series 03 / Emory'},
 {key:'publications',section:'publications',start:22.5,end:26.5,anchor:24,label:'15 papers & abstracts'},
 {key:'community',section:'community',start:26.5,end:30.5,anchor:28,label:'9 organizations'},
 {key:'about',section:'about',start:30.5,end:33,anchor:32,label:'Background & education'}
];
export const clampPosition=n=>Math.max(0,Math.min(33,n));
export const sceneAt=p=>scenes.find(s=>p<s.end)||scenes.at(-1);
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
export function depthAt(position,reducedMotion=false){
 const scene=sceneAt(position);
 if(reducedMotion)return {scene,opacity:1,depth:0};
 let opacity=1,depth=0;
 if(scene.start>0&&position<scene.start+.5){opacity=smooth((position-scene.start)/.5);depth=-110*(1-opacity)}
 else if(scene.end<33&&position>scene.end-.5){opacity=1-smooth((position-(scene.end-.5))/.5);depth=-150*(1-opacity)}
 return {scene,opacity,depth};
}

// Finish a partial transition in the direction the visitor was travelling.
export function settledPosition(position,direction=1){
 const p=clampPosition(position);
 const boundary=scenes.slice(0,-1).find(s=>Math.abs(p-s.end)<.5);
 return boundary?boundary.end+(direction<0?-.5:.5):p;
}
