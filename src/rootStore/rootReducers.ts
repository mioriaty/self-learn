import { reducersImageGallery } from 'components/ChooseImage/reducers';
import { adminDashboardReducers } from 'containers/Admin';
import { reducerModals } from 'containers/Admin/Modals';
import { slicePresetStyle } from 'containers/Admin/PresetStylesPage';
import { reducersBuilderPage } from 'containers/BuilderPage';
import reducersChooseTemplate from 'containers/ChooseTemplate/reducers';
import { sliceModalError } from 'containers/ErrorHandler';
import { reducerGlobalCodePage } from 'containers/GlobalCodePage';
import { reducersIframe } from 'containers/IframePage';
import { sliceGlobalMount } from './global/globalMount/slice';
import reducersGlobal from './reducers';

const reducers = {
  global: reducersGlobal,
  chooseTemplate: reducersChooseTemplate,
  adminDashboard: adminDashboardReducers,
  modals: reducerModals,
  iframe: reducersIframe,
  imageGallery: reducersImageGallery,
  builderPage: reducersBuilderPage,
  globalCodePage: reducerGlobalCodePage,
  globalMount: sliceGlobalMount.reducer,
  presetStyles: slicePresetStyle.reducer,
  errorHandler: sliceModalError.reducer,
};

export default reducers;
