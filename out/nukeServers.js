import { serverList } from "./settings";

/** @param {import(".").NS } ns */

export function crackServers(ns, host) {
    let has = f => ns.fileExists(f, "home");
    let ports = 0;

    let srhackingLv = ns.getServerRequiredHackingLevel(host);

    if (ns.getHackingLevel() < srhackingLv) {
        ns.tprint(`😅 레벨 낮엉 - Lv: ${srhackingLv} - ${host}`);
        return false;
    }

    if (has("BruteSSH.exe")) { ns.brutessh(host); ++ports; }
    if (has("FTPCrack.exe")) { ns.ftpcrack(host); ++ports; }
    if (has("relaysmtp.exe")) { ns.relaysmtp(host); ++ports; }
    if (has("httpworm.exe")) { ns.httpworm(host); ++ports; }
    if (has("SQLInject.exe")) { ns.sqlinject(host); ++ports; }

    if (ports < ns.getServerNumPortsRequired(host)) {
        ns.tprint(`Not enough ports: ${host}`);
        return false;
    }

    ns.nuke(host);

    // 뉴크 안한 것만 표시하게 주석처리
    //let weakenTime = ns.nFormat((ns.getWeakenTime(host) / 1000), '00:00:00');
    //ns.tprint(`${ns.nFormat(ns.getServerMaxMoney(host), '0.0a')} / wT: ${weakenTime} / Lv: ${srhackingLv} / sLv: ${ns.getServerMinSecurityLevel(host)} - ${host}`);

    return true;
}

export async function main(ns) {
    serverList.forEach(host => crackServers(ns, host));
}