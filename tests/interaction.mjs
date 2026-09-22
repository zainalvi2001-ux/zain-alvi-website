import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,...(process.env.CHROME_CHANNEL?{channel:process.env.CHROME_CHANNEL}:{})});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const base=process.env.TEST_URL||'http://127.0.0.1:4173';
const count=()=>page.locator('#slice-count').innerText();
const waitPosition=async n=>page.waitForFunction(n=>Math.abs(Number(document.querySelector('#scan-slider').value)-n)<.01,n);
const checkHeading=async text=>page.waitForFunction(([source,flags])=>new RegExp(source,flags).test(document.querySelector('#content-title')?.textContent||''),[text.source,text.flags]);
try{
 await page.goto(base);await checkHeading(/Hi, I'm Zain/);
 assert.equal(await count(),'Image 1 / 34');
 await page.mouse.move(950,450);await page.mouse.wheel(0,240);await waitPosition(1);assert.equal(await count(),'Image 2 / 34');
 await page.mouse.wheel(0,-240);await waitPosition(0);assert.equal(await count(),'Image 1 / 34');
 await page.keyboard.press('ArrowRight');await waitPosition(1);assert.equal(await count(),'Image 2 / 34');
 await page.getByRole('button',{name:'CT slice 5 of 34',exact:true}).click();await checkHeading(/Hi, I'm Zain/);
 await page.keyboard.press('ArrowRight');await waitPosition(5);await checkHeading(/Vanderbilt/);
 await page.keyboard.press('ArrowLeft');await waitPosition(4);await checkHeading(/Hi, I'm Zain/);
 await page.getByRole('button',{name:'CT slice 18 of 34',exact:true}).click();await checkHeading(/Emory/);
 assert.equal(await page.locator('.thumbnail[aria-current]').getAttribute('data-slice'),'17');
 await page.getByRole('link',{name:'Publications 15 papers & abstracts',exact:true}).click();await checkHeading(/Publications/);
 const frozen=await count();
 await page.getByRole('button',{name:'Read all 15 publications'}).click();
 await page.waitForSelector('#reader .publication');assert.equal(await page.locator('#reader .publication').count(),15);
 await page.locator('#reader-body').hover();await page.mouse.wheel(0,900);await page.waitForTimeout(200);
 assert.equal(await count(),frozen);assert.ok(await page.locator('#reader-body').evaluate(e=>e.scrollTop)>0);
 await page.keyboard.press('Escape');assert.equal(await count(),frozen);assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'Read all 15 publications');
 await page.getByRole('link',{name:'Community service 9 organizations',exact:true}).click();await page.getByRole('button',{name:'Explore all 9 roles'}).click();assert.equal(await page.locator('#reader details').count(),9);
 await page.locator('#reader summary').first().click();assert.match(await page.locator('#reader details').first().innerText(),/400,000/);await page.getByRole('button',{name:'Close reading panel'}).click();
 await page.getByRole('link',{name:'Research & experience 3 institutions',exact:true}).click();await page.getByRole('button',{name:'Stanford School of Medicine',exact:true}).click();await page.getByRole('button',{name:'Read experience'}).click();
 await page.locator('[data-publication="pub-2"]').click();await page.waitForSelector('#pub-2');await page.waitForFunction(()=>document.querySelector('#reader-body').scrollTop>0);assert.equal(await page.locator('#reader .publication').count(),15);assert.ok(await page.locator('#reader-body').evaluate(e=>e.scrollTop)>0);await page.keyboard.press('Escape');await checkHeading(/Stanford/);
 await page.getByRole('button',{name:'View CV'}).click();await page.waitForSelector('[data-print]');assert.equal(await page.locator('#reader .publication').count(),15);assert.equal(await page.locator('#reader .service-item').count(),9);await page.keyboard.press('Escape');
 await page.goto(base+'/#about');await checkHeading(/Zain Alvi/);
 await page.goto(base+'/#publications');await checkHeading(/Publications/);
 await page.setViewportSize({width:390,height:844});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.getByRole('button',{name:'Read all 15 publications'}).click();await page.waitForSelector('#reader .publication');assert.ok(await page.locator('#reader').evaluate(e=>e.getBoundingClientRect().right<=innerWidth));await page.keyboard.press('Escape');
 await page.emulateMedia({reducedMotion:'reduce'});await page.getByRole('button',{name:'Toggle study browser',exact:true}).click();await page.getByRole('link',{name:'About Background & education',exact:true}).click();await checkHeading(/Zain Alvi/);
 await page.getByRole('button',{name:'CT slice 1 of 34',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Previous CT slice',exact:true}).isDisabled(),true);
 await page.getByRole('button',{name:'CT slice 34 of 34',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Next CT slice',exact:true}).isDisabled(),true);
 await page.setViewportSize({width:320,height:640});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.deepEqual(errors,[]);
 const fallback=await browser.newPage({javaScriptEnabled:false});await fallback.goto(base+'/content.html');assert.equal(await fallback.locator('.publication').count(),15);assert.equal(await fallback.locator('.service-item').count(),9);await fallback.close();
 if(!process.env.SKIP_ASSET_CHECK){
  for(let i=1;i<=34;i++){const response=await page.request.get(`${base}/assets/ct/slice-${String(i).padStart(2,'0')}.png`);assert.equal(response.status(),200,`slice ${i}`);assert.match(response.headers()['content-type'],/image\/png/)}
 }
 console.log('PASS: forward/backward slices, section synchronization, reader pause and return, bibliography links, all service roles, CV, deep links, mobile widths, reduced motion, bounds, no-JS content, and browser errors.');
}finally{await browser.close()}
