import assert from 'node:assert/strict';
import { test } from 'node:test';
import { characterGuide, guideAnswerText, normalizeGuideAnswers } from '../src/character-guide';

test('legacy answers survive a switch from localized labels to stable IDs',()=>{
 const old={'Altura':'Alta','Height':'Tall','height':'Un metro ochenta','Pregunta propia':'No perder este recuerdo'};
 const migrated=normalizeGuideAnswers(old);
 assert.match(migrated.height,/Alta/);assert.match(migrated.height,/Tall/);assert.match(migrated.height,/Un metro ochenta/);
 assert.equal(migrated['Pregunta propia'],old['Pregunta propia']);
 assert.deepEqual(normalizeGuideAnswers(migrated),migrated);
 assert.deepEqual(old,{'Altura':'Alta','Height':'Tall','height':'Un metro ochenta','Pregunta propia':'No perder este recuerdo'});
});
test('both languages display the same saved answers with their own question titles',()=>{
 const answers={height:'Camina encorvado.\nNo quiere destacar.',family:'Su hermana.',custom:'Otros detalles.'};
 assert.match(guideAnswerText(answers,'es'),/Altura: Camina encorvado/);
 assert.match(guideAnswerText(answers,'en'),/Height: Camina encorvado/);
 assert.match(guideAnswerText(answers,'en'),/Family: Su hermana/);
 assert.match(guideAnswerText(answers,'es'),/custom: Otros detalles/);
 assert.equal(new Set(characterGuide.flatMap(c=>c.questions.map(q=>q.id))).size,characterGuide.flatMap(c=>c.questions).length);
});


test('the relationship graph is the fourth guided relationship question',()=>{
 const relationships=characterGuide.find(c=>c.id==='relationships')!;assert.equal(relationships.questions.length,4);
 assert.deepEqual(relationships.questions.map(q=>q.id),['family','relationships','trust','relationshipGraph']);assert.equal(relationships.questions[3].kind,'graph');
});
