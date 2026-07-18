// Os dois grupos geográficos do arquipélago de Cabo Verde
export const BARLAVENTO = [
  "santo-antao",
  "sao-vicente",
  "santa-luzia",
  "sao-nicolau",
  "sal",
  "boa-vista",
];

export const SOTAVENTO = ["maio", "santiago", "fogo", "brava"];

export function islandGroup(id: string): "Barlavento" | "Sotavento" {
  return BARLAVENTO.includes(id) ? "Barlavento" : "Sotavento";
}
