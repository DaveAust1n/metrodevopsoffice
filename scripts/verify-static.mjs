import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('built portfolio is complete static HTML with original contact and verification file',async()=>{
 const html=await readFile('dist/index.html','utf8');
 assert.equal((html.match(/<section /g)||[]).length,6);
 assert.equal((html.match(/<svg /g)||[]).length,60);
 assert.doesNotMatch(html,/\/src\/main|react-dom|vite\/client/);
 assert.match(html,/wa.me\/2349163197774/);assert.match(html,/SetupPlug/);
 assert.match(html,/index,follow/);assert.match(html,/https:\/\/metrodevops.vercel.app\//);
 assert.match(await readFile('dist/google4c96045a9eeb1116.html','utf8'),/google-site-verification/);
});
