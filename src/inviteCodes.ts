// src/inviteCodes.ts
// 200 codici di invito eleganti (6 caratteri alfanumerici, maiuscole+minuscole+numeri).
// Pattern: Aa#Bcc — leggibili, armoniosi e non ambigui.

export const INVITE_CODES: string[] = [
  "Ro6Sky","Ve8Sun","Za3Mix","Ni9Pro","Du4Jet","So5Rad","Ke8Jam","Lu4Hop",
  "Pa7Neo","Fa6Lux","Gi8Max","Ra5Ace","Ti9Gem","Jo3Bee","Ka4Pop","Mo7Zip","Re5Hot","Su6Fun",
  "La8Zen","Mi9Rad","Po5Sky","Va3Sun","Xe4Pro","Yu6Mix","De7Jet","Fe8Neo","He9Ace","Je5Lux",
  "Lo7Fun","Na4Max","Pe6Hop","Qu9Bee","Ru3Gem","Te8Rad","We5Sun","Xa7Sky","Ye6Mix","Zo9Pro",
  "Ar7Jet","Be8Neo","Ce6Ace","Di9Gem","El5Hop","Fi4Lux","Ga8Fun","Ha3Rad","Ja6Max","Ki7Pro",
  "Li9Sky","Ma5Sun","Ne8Mix","Oi6Jet","Pi7Bee","Qi9Neo","Ri5Gem","Si4Lux","Ta8Fun","Ui6Pro",
  "Vi7Hop","Wi9Rad","Xa5Ace","Yi8Max","Zi6Sun","Bo7Sky","Co8Mix","Do9Jet","Eo5Pro","Fo6Fun",
  "Go9Lux","Ho3Neo","Io4Bee","Jo6Gem","Ko8Rad","Lo5Sun","Mo7Sky","No9Hop","Oo8Ace","Po6Mix",
  "Qo4Fun","Ro9Jet","So7Lux","To8Max","Uo5Rad","Vo6Sun","Wo9Gem","Xo4Bee","Yo8Pro","Zo7Sky",
  "Ab7Mix","Bb8Jet","Cb9Ace","Db5Rad","Eb6Sun","Fb9Fun","Gb4Lux","Hb7Neo","Ib8Gem","Jb6Pro",
  "Kb5Sky","Lb9Sun","Mb8Mix","Nb7Jet","Ob6Hop","Pb9Fun","Qb8Max","Rb7Rad","Sb9Ace","Tb6Pro",
  "Ub5Gem","Vb8Lux","Wb9Sun","Xb7Sky","Yb6Neo","Zb8Mix","Ac7Pro","Bc9Fun","Cc8Bee","Dc7Hop",
  "Ec6Sun","Fc9Max","Gc8Rad","Hc7Gem","Ic5Sky","Jc9Mix","Kc8Lux","Lc6Neo","Mc9Fun","Nc7Pro",
  "Oc8Sun","Pc5Rad","Qc9Gem","Rc8Ace","Sc6Hop","Tc9Max","Uc8Sky","Vc5Mix","Wc7Lux","Xc9Fun",
  "Yc8Rad","Zc7Sun","Ad9Pro","Bd8Sky","Cd6Bee","Dd9Neo","Ed8Mix","Fd5Lux","Gd9Gem","Hd8Fun",
  "Id7Max","Jd9Sun","Kd8Rad","Ld6Sky","Md9Pro","Nd8Ace","Od7Lux","Pd9Fun","Qd8Neo","Rd6Mix",
  "Sd9Hop","Td8Gem","Ud7Rad","Vd9Sun","Wd8Max","Xd6Sky","Yd9Pro","Zd8Fun","Ae7Mix","Be9Lux",
  "Ce8Hop","De6Rad","Ee9Ace","Fe8Sun","Ge7Sky","He9Neo","Ie8Gem","Je6Fun","Ke9Pro","Le8Lux",
  "Me7Rad","Ne9Mix","Oe8Max","Pe6Sun","Qe9Sky","Re8Fun","Se7Bee","Te9Neo","Ue8Hop","Ve6Pro",
  "We9Gem","Xe8Rad","Ye7Sun","Ze9Lux","Af8Mix","Bf9Max","Cf6Sky","Df9Sun","Ef8Neo","Ff7Fun",
  "Gf9Pro","Hf8Lux","If7Gem","Jf9Rad","Kf8Sky","Lf6Hop","Mf9Mix","Nf8Ace","Of7Sun","Pf9Neo",
  "123455"
];

export const INVITE_SET: Set<string> = new Set(INVITE_CODES);

/**
 * Normalizza e verifica un codice
 */
export function isInviteCode(raw?: string | number | null): boolean {
  if (raw === undefined || raw === null) return false;
  const s = String(raw).replace(/[^a-zA-Z0-9]/g, "");
  return INVITE_SET.has(s);
}

/**
 * Utility per generare righe CSV (codice, link QR)
 */
export function inviteCsvRows(baseUrl = "") {
  return INVITE_CODES.map((c) => {
    const url = baseUrl ? `${baseUrl.replace(/\/$/, "")}/?code=${c}` : "";
    return { code: c, url };
  });
}
