import { useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState, preventAuthenticatedState } from './atom/atom';
import PrivateRoute from './components/Common/Authentication/PrivateRoute';
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
import GithubOauthCallback from './pages/GithubOauthCallback';
import { css } from '@emotion/react';
import Footer from './components/Common/Footer';
import NotFound from './pages/NotFound';
import Notice from './components/PageComponent/Landing/Notice';

function App() {
  const authenticated = useRecoilValue(userInfoState);
  const preventAuthenticated = useRecoilValue(preventAuthenticatedState);
  const [isNoticeOn, setIsNoticeOn] = useState(
    localStorage.getItem('notice_off') ? false : true
  );

  const isAuth = useMemo(() => {
    if (!authenticated && preventAuthenticated) {
      return true;
    }
    return authenticated;
  }, [authenticated]);

  // 공지사항 핸들러
  const handleNoticeClose = () => {
    localStorage.setItem('notice_off', true);
    setIsNoticeOn(false);
  };

  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      <Header />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Landing />} />
        <Route path="/studylist" element={<StudyList />} />

        {/* Restricted public route */}
        {!authenticated && <Route path="/login" element={<LogIn />} />}
        {!authenticated && <Route path="/signup" element={<SignUp />} />}

        {/* Private route */}
        <Route
          path="/makestudy"
          element={
            <PrivateRoute authenticated={isAuth} element={<MakeStudy />} />
          }
        />
        <Route path="/studylist/detail/:id" element={<StudyListDetail />} />

        {/* else */}
        <Route path="/studylist/modify/:id" element={<ModifyStudy />} />
        <Route
          path="/modifyuser"
          element={
            <PrivateRoute authenticated={isAuth} element={<ModifyUser />} />
          }
        />
        <Route path="/studyboard/:studyId/:memberId" element={<StudyBoard />} />
        <Route
          path="/oauth/github/callback"
          exact={true}
          element={<GithubOauthCallback />}
        />
        <Route path="/callback" exact={true} element={<Callback />} />
        <Route path="/main/:id" element={<Main />} />
        <Route path="/termsofuse" element={<TermsOfUse />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      {isNoticeOn ? <Notice handleNoticeClose={handleNoticeClose} /> : null}
    </div>
  );
}

export default App;
