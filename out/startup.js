let isTraveled = false;

///** @param {import(".").NS } ns */

export async function main(ns) {
	// 자체 루프 혹은 원샷 스크립트
	await init(ns);
	let resetCounter = 0;

	while (true) {
		resetCounter++;

		letsTravel(ns);

		ns.exec('nukeServers.js', 'home');
		await ns.sleep(1000);

		// 서버를 사기 전까진 실행 안 할 것들
		if (ns.peek(5) === 'true') {
			ns.exec('darkweb.js', 'home');
			await ns.sleep(1000);
			ns.exec('upgradeHome.js', 'home');
			await ns.sleep(1000);
		}
		ns.exec('buyAugs.js', 'home'); // 램이 적으면 자동으로 실행 안되니 조건 추가가 필요 엄씀
		await ns.sleep(1000);
		ns.exec('factionJoin.js', 'home');
		await ns.sleep(3000);

		ns.exec('selectTarget.js', 'home');
		await ns.sleep(1000);
		ns.exec('doHomeHack.js', 'home');
		await ns.sleep(1000);
		ns.exec('doExtServerHack.js', 'home');
		await ns.sleep(1000);
		ns.exec('factionWorks.js', 'home');
		await ns.sleep(2000);

		ns.exec('buyServers.js', 'home');

		ns.print(`INFO 💰타겟이 가진 돈 ${ns.nFormat(ns.getServerMoneyAvailable(ns.peek(1)), '0.0a')} 💰`);
		ns.print(`INFO 🎉포트 1: ${ns.peek(1)} 포트 3: ${ns.peek(3)}`);
		ns.print(`ERROR resetCounter = ${resetCounter}`);

		await ns.sleep(60000);

		// 오그가 하나도 없으면 연장
		if (resetCounter > 70) {
			resetCounter = 40;
			ns.exec('installAugmentations.js', 'home');
		}
	}
}

function letsTravel(ns) {
	if (ns.getServerMoneyAvailable('home') > 5000000) {
		//isTraveled = true;
		ns.exec('travelToCity.js', 'home', 1, 'Chongqing');
	}
}

async function init(ns) {
	ns.tail();
	ns.clearPort(1); // 비교에 쓸 임시 타겟
	ns.clearPort(2); // 조건 부 타겟
	ns.clearPort(3); // 스트링 불린
	ns.clearPort(4); // 조건 부 타겟의 -1 서버로 상점이 씀
	ns.clearPort(5); // 서버 존재 여부 불린
	await ns.writePort(5, 'false');
}