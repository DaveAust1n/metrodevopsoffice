import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('built portfolio is complete static HTML with original contact and verification file',async()=>{
 const html=await readFile('dist/index.html','utf8');
 assert.equal((html.match(/<section /g)||[]).length,6);
 assert.equal((html.match(/<svg /g)||[]).length,62);
 assert.doesNotMatch(html,/\/src\/main|react-dom|vite\/client/);
 assert.match(html,/wa.me\/2349163197774/);assert.doesNotMatch(html,/WareTrack|SetupPlug/);
 assert.equal((html.match(/class="project-card"/g)||[]).length,4);
 for (const name of ['August Products','Mobzenox','Genesis Autos','Gabs Furniture &amp; Interiors']) assert.ok(html.includes(name));
 assert.match(html,/index,follow/);assert.match(html,/https:\/\/metrodevops.vercel.app\//);
 assert.match(await readFile('dist/google4c96045a9eeb1116.html','utf8'),/google-site-verification/);
});

test('the original production URL loads the verified published Hub record',async()=>{
 const {websiteSlug}=JSON.parse(await readFile('portfolio.config.json','utf8'));
 assert.equal(websiteSlug,'metrodevops-html-portfolio-dac4bbe3');
 const html=await readFile('dist/index.html','utf8');
 assert.ok(html.includes('data-hub-site="'+websiteSlug+'"'));
 const runtime=await readFile('dist/portfolio.js','utf8');
 assert.match(runtime,/metrodevopshub\.vercel\.app\/api\/connected-content/);
 assert.match(runtime,/cache:'no-store'/);
});
