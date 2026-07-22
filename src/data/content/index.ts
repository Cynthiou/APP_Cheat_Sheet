import type { ReadyContent } from '@/types/content';
import { useStateLesson, useStateTemplate } from './react-usestate';
import { htmlContent } from './html';
import { cssContent } from './css';
import { cssExtra1Content } from './css-extra-1';
import { cssExtra2Content } from './css-extra-2';
import { cssExtra3Content } from './css-extra-3';
import { javascriptContent } from './javascript';
import { jsExtra1Content } from './js-extra-1';
import { tsExtra1Content } from './ts-extra-1';
import { jsBasicsContent } from './js-basics';
import { jsArraysContent } from './js-arrays';
import { jsMethodsContent } from './js-methods';
import { domContent } from './dom';
import { typescriptContent } from './typescript';
import { typescriptRestContent } from './typescript-rest';
import { reactContent } from './react-core';
import { reactJsxContent } from './react-jsx';
import { reactHooksContent } from './react-hooks';
import { reactFormsContent } from './react-forms';
import { reactDataContent } from './react-data';
import { reactRouterContent } from './react-router';
import { reactPatternsContent } from './react-patterns';
import { backendContent } from './backend';
import { nodeContent } from './node';
import { expressRest1Content } from './express-rest-1';
import { expressRest2Content } from './express-rest-2';
import { sql1Content } from './sql-1';
import { sql2Content } from './sql-2';
import { databaseContent } from './database';
import { authContent } from './auth';
import { tools1Content } from './tools-1';
import { tools2Content } from './tools-2';
import { git1Content } from './git-1';
import { git2Content } from './git-2';
import { methodology1Content } from './methodology-1';
import { methodology2Content } from './methodology-2';
import { deploymentContent } from './deployment';
import { testingContent } from './testing';
import { advanced1Content } from './advanced-1';
import { advancedExtraContent } from './advanced-extra';
import { advanced2Content } from './advanced-2';
import { guidesContent } from './guides';
import { guidesT101Content } from './guides-t10-1';
import { guidesT102Content } from './guides-t10-2';
import { guidesT81Content } from './guides-t8-1';
import { guidesT82Content } from './guides-t8-2';
import { guidesT151Content } from './guides-t15';
import { guidesT121Content } from './guides-t12';
import { guidesT171Content } from './guides-t17';

/** Tous les contenus rédigés (status: ready). */
export const READY_CONTENT: ReadyContent[] = [
  useStateLesson,
  useStateTemplate,
  ...htmlContent,
  ...cssContent,
  ...cssExtra1Content,
  ...cssExtra2Content,
  ...cssExtra3Content,
  ...jsExtra1Content,
  ...tsExtra1Content,
  ...javascriptContent,
  ...jsBasicsContent,
  ...jsArraysContent,
  ...jsMethodsContent,
  ...domContent,
  ...typescriptContent,
  ...typescriptRestContent,
  ...reactContent,
  ...reactJsxContent,
  ...reactHooksContent,
  ...reactFormsContent,
  ...reactDataContent,
  ...reactRouterContent,
  ...reactPatternsContent,
  ...backendContent,
  ...nodeContent,
  ...expressRest1Content,
  ...expressRest2Content,
  ...sql1Content,
  ...sql2Content,
  ...databaseContent,
  ...authContent,
  ...tools1Content,
  ...tools2Content,
  ...git1Content,
  ...git2Content,
  ...methodology1Content,
  ...methodology2Content,
  ...deploymentContent,
  ...testingContent,
  ...advanced1Content,
  ...advanced2Content,
  ...advancedExtraContent,
  ...guidesContent,
  ...guidesT101Content,
  ...guidesT102Content,
  ...guidesT81Content,
  ...guidesT82Content,
  ...guidesT151Content,
  ...guidesT121Content,
  ...guidesT171Content,
];
