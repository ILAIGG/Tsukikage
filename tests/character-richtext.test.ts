import assert from 'node:assert/strict';
import {test} from 'node:test';
import {Window} from 'happy-dom';
const browser=new Window({url:'http://localhost/'});
Object.defineProperty(globalThis,'window',{value:browser,configurable:true});
Object.defineProperty(globalThis,'document',{value:browser.document,configurable:true});
const {characterTextHtml,characterPlainText,hasCharacterText,characterGuidePreview}=await import('../src/character-text');
test('legacy plain descriptions retain line breaks and literal special characters',()=>{
 assert.equal(characterTextHtml('A & B\n2 < 3'),'<p>A &amp; B</p><p>2 &lt; 3</p>');
 assert.equal(characterTextHtml(''), '');
});
test('formatted responses preserve emphasis and lists',()=>{
 const safe=characterTextHtml('<p><strong>Fuerte</strong> y <em>serena</em></p><ul><li>Lee</li></ul>');
 assert.match(safe,/<strong>Fuerte<\/strong>/);assert.match(safe,/<em>serena<\/em>/);assert.match(safe,/<ul><li>Lee<\/li><\/ul>/);

});
test('empty rich answers remain unanswered and previews contain readable text',()=>{
 assert.equal(hasCharacterText('<p><br></p>'),false);assert.equal(hasCharacterText('<p>&nbsp;</p>'),false);
 assert.equal(hasCharacterText('<p><strong>Un recuerdo</strong></p>'),true);
 assert.equal(characterPlainText('2 < 3'),'2 < 3');
 const preview=characterGuidePreview({height:'<p><strong>Muy alta</strong></p>'},'es');
 assert.match(preview,/Altura: Muy alta/);assert.doesNotMatch(preview,/<\/?p|<\/?strong/);
});
