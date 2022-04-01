import { all, call, spawn, delay } from '@redux-saga/core/effects';
import { sagasChooseTemplate } from 'containers/ChooseTemplate';
import sagaImageGallery from 'components/ChooseImage/sagas/sagaStockPage';
import { sagasBlankPage } from 'containers/Admin/PageBuilder/BlankPage';
import { sagasThemeTemplates } from 'containers/Admin/ThemeBuilder/ThemeTemplates';
import { sagasBuilderPage } from 'containers/BuilderPage';
import { sagasTemplatePage } from 'containers/Admin/PageBuilder/TemplatesPage';
import { sagasPresetStyle } from 'containers/Admin/PresetStylesPage';
import { sagasGlobalCode } from 'containers/GlobalCodePage';
import { sagasMegaMenu } from 'containers/BuilderPage/components/DraggableMenu';
import { sagasProductPage } from 'containers/Admin/PageBuilder/ProductsPage';
import { sagasCollectionPage } from 'containers/Admin/PageBuilder/CollectionPage';
import { sagasArticlePage } from 'containers/Admin/PageBuilder/ArticlesPage';
import { sagaUserManagement } from 'containers/Admin/UserManagement';
import { sagasLiquidVariables } from './sagas/liquid/sagasLiquidVariables';
import sagasGlobal from './sagas';
import { sagaShopify } from './sagas/shopify/sagaShopify';
import { sagasVersion } from './sagas/versions';
import { sagasAuth } from './global/auth';

const sagas = [
  ...sagasGlobal,
  ...sagasBuilderPage,
  ...sagasBlankPage,
  ...sagasChooseTemplate,
  ...sagaImageGallery,
  ...sagaShopify,
  ...sagasLiquidVariables,
  ...sagasThemeTemplates,
  ...sagasVersion,
  ...sagasTemplatePage,
  ...sagasPresetStyle,
  ...sagasGlobalCode,
  ...sagasMegaMenu,
  ...sagasProductPage,
  ...sagasCollectionPage,
  ...sagasArticlePage,
  ...sagasAuth,
  ...sagaUserManagement,
];

// https://github.com/redux-saga/redux-saga/issues/760#issuecomment-273737022
const makeRestartable = (saga: any) => {
  return function*() {
    yield spawn(function*() {
      while (true) {
        try {
          yield call(saga);
          console.error('unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!', saga);
        } catch (e) {
          console.error('Saga error, the saga will be restarted', e);
        }
        yield delay(1000); // Avoid infinite failures blocking app TODO use backoff retry policy...
      }
    });
  };
};

const rootSagas = sagas.map(makeRestartable);

export default function* root() {
  yield all(rootSagas.map(call));
}
