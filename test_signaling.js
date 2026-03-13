const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const roomUrl = 'http://localhost:3000/room/test-signaling/lobby';
  
  console.log('Opening Peer 1');
  const page1 = await browser.newPage();
  await page1.goto(roomUrl, { waitUntil: 'networkidle0', timeout: 60000 });
  await page1.waitForSelector('#input-display-name', { timeout: 60000 });
  await page1.type('#input-display-name', 'Alice');
  await page1.click('#btn-capture-base');
  await page1.click('#btn-join-room');
  
  // Wait for it to enter the room
  await page1.waitForSelector('.badge-vector');
  console.log('Peer 1 is in the room.');

  console.log('Opening Peer 2');
  const page2 = await browser.newPage();
  await page2.goto(roomUrl, { waitUntil: 'networkidle0', timeout: 60000 });
  await page2.waitForSelector('#input-display-name', { timeout: 60000 });
  await page2.type('#input-display-name', 'Bob');
  await page2.click('#btn-capture-base');
  await page2.click('#btn-join-room');
  
  // Wait for it to enter the room
  await page2.waitForSelector('.badge-vector');
  console.log('Peer 2 is in the room.');

  // Now, both should see 2 participants
  // The header participant count should say "2"
  await page1.waitForFunction(() => {
    // The text content of the element next to Users icon
    const el = document.querySelector('header span.text-fh-small');
    return el && el.textContent.trim() === '2';
  }, { timeout: 5000 }).catch(e => console.error('Peer 1 did not see 2 participants'));
  
  await page2.waitForFunction(() => {
    const el = document.querySelector('header span.text-fh-small');
    return el && el.textContent.trim() === '2';
  }, { timeout: 5000 }).catch(e => console.error('Peer 2 did not see 2 participants'));

  const p1Count = await page1.$eval('header span.text-fh-small', el => el.textContent.trim());
  const p2Count = await page2.$eval('header span.text-fh-small', el => el.textContent.trim());

  console.log('Peer 1 participant count:', p1Count);
  console.log('Peer 2 participant count:', p2Count);

  if (p1Count === '2' && p2Count === '2') {
    console.log('✅ Signaling Peer Discovery SUCCESS');
  } else {
    console.log('❌ Signaling Peer Discovery FAILED');
  }

  // Take a screenshot from Peer 1's perspective
  await page1.screenshot({ path: 'multi_peer_test.png' });
  console.log('Screenshot saved to multi_peer_test.png');

  await browser.close();
})();
