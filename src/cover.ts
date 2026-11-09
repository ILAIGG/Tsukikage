import type {Novel,StoryCoverSettings} from './model';
export const coverPalettes=['lunar','ink','forest','rose'] as const;
export const coverStyles=['classic','frame','orbit'] as const;
export const coverColors={lunar:['#342945','#fff4e3'],ink:['#243343','#f4f0e5'],forest:['#293d36','#f7f0dd'],rose:['#543440','#fff1e5']} as const;
export function resolveCover(novel:Pick<Novel,'id'|'cover'>):StoryCoverSettings{
 let hash=0;for(const char of novel.id)hash=(hash*31+char.charCodeAt(0))>>>0;
 return {palette:coverPalettes.includes(novel.cover?.palette as typeof coverPalettes[number])?novel.cover!.palette:coverPalettes[hash%coverPalettes.length],style:coverStyles.includes(novel.cover?.style as typeof coverStyles[number])?novel.cover!.style:coverStyles[hash%coverStyles.length]};
}
