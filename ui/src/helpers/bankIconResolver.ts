import { BANK_ICONS_BASE_PATH } from "shared/enum";

const regexMatcher = {
  kotak: /kotak/i,
  sbi: /(sbi|state bank of india)/i,
  pnb: /(pnb|punjab national bank)/i,
  idfc_first: /idfc/i
};

export default function getLogoSrc(bankName: string) {
  const match = Object.entries(regexMatcher).find(([, regex]) => {
    return regex.test(bankName);
  });

  return `/${BANK_ICONS_BASE_PATH}${
    match ? match[0] : bankName.toLowerCase().replaceAll(" ", "_")
  }.png`;
}
