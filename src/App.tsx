import { useMediaQuery } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import ConfirmModal, {
  ConfirmModalMessage,
} from "components/common/ConfirmModal";
import NotiStack, { NotiMessage } from "components/common/NotiStack";
import { observer } from "mobx-react";
import React, { lazy, Suspense } from "react";
import { Route, Router, Switch } from "react-router";
import LoadingFallback from "screens/LoadingFallback";
import { createAppTheme } from "styles/theme";
import history from "./appBrowserHistory";
import AppLayout from "components/common/AppLayout";
import AppModal from "components/common/AppModal";

const Home = lazy(() => import("screens/Home/HomePage"));
const NotFoundPage = lazy(() => import("screens/NotFound"));

// eslint-disable-next-line no-var
var _ConfirmModalInstance: any = {};
var _AppModalInstance: any = {};

export const ConfirmModalInstance = {
  addMessage: (message: ConfirmModalMessage) => {
    _ConfirmModalInstance && _ConfirmModalInstance.addMessage(message);
  },
};

var _NotiStackInstance: any = {};

export const NotiStackInstance = {
  push: (message: NotiMessage) => {
    _NotiStackInstance && _NotiStackInstance.push(message);
  },
};

export const AppModalInstance = {
  replaceChildren: (childrenNode: any) => {
    _AppModalInstance && _AppModalInstance.replaceChildren(childrenNode);
  },
  updateChildrenProps: (props: any) => {
    _AppModalInstance && _AppModalInstance.updateChildrenProps(props);
  },
  updateModalProps: (props: any) => {
    _AppModalInstance && _AppModalInstance.updateModalProps(props);
  },
  open: () => {
    _AppModalInstance && _AppModalInstance.openModal();
  },
  close: () => {
    _AppModalInstance && _AppModalInstance.closeModal();
  },
  addCloseCallback: (callback) => {
    _AppModalInstance && _AppModalInstance.addCloseCallback(callback);
  },
  dangerousUpdateState: (key, value) => {
    _AppModalInstance && _AppModalInstance.dangerousUpdateState(key, value);
  },
};

const RootContainer = observer(() => {
  return (
    <Router history={history}>
      <AppLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>

          <ConfirmModal
            ref={(ref: any) => {
              _ConfirmModalInstance = ref;
            }}
          />
          <AppModal
            ref={(ref: any) => {
              _AppModalInstance = ref;
            }}
          />
          <NotiStack
            ref={(ref: any) => {
              _NotiStackInstance = ref;
            }}
          />
        </Suspense>
      </AppLayout>
    </Router>
  );
});

const App = React.memo(() => {
  const theme = createAppTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootContainer />
    </ThemeProvider>
  );
});

export default App;
