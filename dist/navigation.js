export const scenes=[
 {key:'research-0',section:'research',experience:0,start:0,end:13.5,anchor:12,label:'Series 01 / Vanderbilt'},
 {key:'research-1',section:'research',experience:1,start:13.5,end:17.5,anchor:15,label:'Series 02 / Stanford'},
 {key:'research-2',section:'research',experience:2,start:17.5,end:20.5,anchor:19,label:'Series 03 / Emory'},
 {key:'publications',section:'publications',start:20.5,end:25.5,anchor:23,label:'15 papers & abstracts'},
 {key:'community',section:'community',start:25.5,end:30.5,anchor:28,label:'9 organizations'},
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
