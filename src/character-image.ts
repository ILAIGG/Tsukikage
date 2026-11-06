/** Store a small raster portrait in the workspace so backups remain self-contained. */
export async function readCharacterImage(file:File):Promise<string>{
 if(!['image/png','image/jpeg','image/webp','image/gif'].includes(file.type)||file.size>10*1024*1024)throw new Error('Invalid image');
 const url=URL.createObjectURL(file);
 try{
  const image=new Image();image.src=url;await image.decode();
  if(!image.naturalWidth||!image.naturalHeight)throw new Error('Empty image');
  const scale=Math.min(1,640/Math.max(image.naturalWidth,image.naturalHeight));
  const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
  const context=canvas.getContext('2d');if(!context)throw new Error('Canvas unavailable');context.drawImage(image,0,0,canvas.width,canvas.height);
  return canvas.toDataURL('image/webp',0.85);
 }finally{URL.revokeObjectURL(url)}
}
