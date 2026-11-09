/** Raster images stay inside the project: no remote requests or external files. */
export const isEmbeddedImage=(src:string)=>src.length<=14*1024*1024&&/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/.test(src);
export async function readEditorImage(file:File){
 if(!['image/png','image/jpeg','image/webp','image/gif'].includes(file.type)||file.size>10*1024*1024)throw new Error('Invalid image');
 const url=URL.createObjectURL(file);
 try{const image=new Image();image.src=url;await image.decode();if(!image.naturalWidth||!image.naturalHeight)throw new Error('Empty image');
 const scale=Math.min(1,1280/Math.max(image.naturalWidth,image.naturalHeight));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));const context=canvas.getContext('2d');if(!context)throw new Error('Canvas unavailable');context.drawImage(image,0,0,canvas.width,canvas.height);const src=canvas.toDataURL('image/png');if(!isEmbeddedImage(src))throw new Error('Image too large');return {src,width:canvas.width,height:canvas.height};
 }finally{URL.revokeObjectURL(url)}
}
