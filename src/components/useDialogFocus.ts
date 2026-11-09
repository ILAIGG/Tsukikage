import {useEffect, useRef, type RefObject} from 'react';
/** Keep keyboard navigation inside an open dialog and return to its trigger. */
export function useDialogFocus(open:boolean,ref:RefObject<HTMLElement|null>,onClose:()=>void){
 const close=useRef(onClose);useEffect(()=>{close.current=onClose},[onClose]);
 useEffect(()=>{
  const dialog=ref.current;if(!open||!dialog)return;
  const previous=document.activeElement as HTMLElement|null;const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
  const focusable=()=>Array.from(dialog.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],[tabindex="0"]')).filter(el=>el.getClientRects().length>0);
  if(!dialog.contains(document.activeElement))(focusable()[0]||dialog).focus();
  const key=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close.current();return}
   if(event.key!=='Tab')return;
   const elements=focusable();const first=elements[0],last=elements.at(-1);
   if(!first){event.preventDefault();dialog.focus()}
   else if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  };
  dialog.addEventListener('keydown',key);
  return()=>{document.body.style.overflow=previousOverflow;dialog.removeEventListener('keydown',key);if(previous?.isConnected)previous.focus({preventScroll:true})};
 },[open,ref]);
}
