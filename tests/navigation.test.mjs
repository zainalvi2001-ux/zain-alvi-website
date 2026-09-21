import test from 'node:test';
import assert from 'node:assert/strict';
import {scenes,sceneAt,depthAt,clampPosition} from '../dist/navigation.js';
test('each scene has a fully readable direct-navigation anchor',()=>{for(const s of scenes){assert.equal(sceneAt(s.anchor).key,s.key);assert.equal(depthAt(s.anchor).opacity,1);assert.equal(depthAt(s.anchor).depth,0)}});
test('every change fades completely out before the next layer appears',()=>{for(let i=0;i<scenes.length-1;i++){const b=scenes[i].end;const before=depthAt(b-.25),at=depthAt(b),after=depthAt(b+.25);assert.equal(before.scene.key,scenes[i].key);assert.equal(before.opacity,.5);assert.equal(at.scene.key,scenes[i+1].key);assert.equal(at.opacity,0);assert.equal(after.opacity,.5);assert.ok(before.depth<0&&after.depth<0)}});
test('forward and backward traversal use identical positions and no accumulated state',()=>{const positions=Array.from({length:331},(_,i)=>i/10);const forward=positions.map(p=>depthAt(p));const backward=positions.toReversed().map(p=>depthAt(p)).reverse();assert.deepEqual(forward,backward);for(const v of forward)assert.ok(v.opacity>=0&&v.opacity<=1&&v.depth<=0)});
test('reduced motion keeps text readable and removes depth travel',()=>{for(let p=0;p<=33;p+=.125){const v=depthAt(p,true);assert.equal(v.opacity,1);assert.equal(v.depth,0)}});
test('position boundaries remain within the actual image sequence',()=>{assert.equal(clampPosition(-5),0);assert.equal(clampPosition(100),33);assert.equal(sceneAt(33).section,'about')});
