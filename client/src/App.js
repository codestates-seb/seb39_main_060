import { Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from './atom/atom';
// import { css } from '@emotion/react';
import PrivateRoute from './components/Common/authentication/PrivateRoute';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Main from './pages/Main';
import StudyList from './pages/StudyList';
import MakeStudy from './pages/MakeStudy';
import StudyListDetail from './pages/StudyListDetail';
import ModifyStudy from './pages/ModifyStudy';
import ModifyUser from './pages/ModifyUser';
import StudyBoard from './pages/StudyBoard';
import Callback from './pages/Callback';
import Header from './components/Common/Header/Header';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './components/Common/Footer';
// import { css } from '@emotion/react';

function App() {
  const authenticated = !!useRecoilValue(userInfoState);

  return (
    <div>
      <Header />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Landing />} />
        <Route path="/studylist" element={<StudyList />} />

        {/* Restricted public route */}
        {!authenticated && <Route path="/login" element={<LogIn />} />}
        {!authenticated && <Route path="/signup" element={<SignUp />} />}
        {/* {!authenticated && <Route path="/signup" element={<SignUp />} />} */}
        <Route path="/signup" element={<SignUp />} />

        {/* Private route */}
        <Route
          path="/makestudy"
          element={
            <PrivateRoute
              authenticated={authenticated}
              element={<MakeStudy />}
            />
          }
        />
        <Route path="/studylist/detail/:id" element={<StudyListDetail />} />

        {/* else */}
        <Route path="/studylist/modify/:id" element={<ModifyStudy />} />
        <Route path="/modifyuser" element={<ModifyUser />} />
        <Route path="/studyboard/:studyId/:memberId" element={<StudyBoard />} />
        <Route path="/oauthcallback" exact={true} element={<Callback />} />
        <Route path="/main/:id" element={<Main />} />
        <Route path="/termsofuse" element={<TermsOfUse />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="*" element={<Landing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
