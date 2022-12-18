import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import { TokenDetails } from '../components/TokenDetails';
import { Home } from '../pages/Home';
import { ThirdPage } from '../pages/ThirdPage';
import { ErrorPage } from '../shared/Error';
import { withAuthentication } from './withAuthentication';

export const AppRoutes = () => {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/allowance' element={withAuthentication(<TokenDetails />)} />
        <Route path='/third-page' element={withAuthentication(<ThirdPage />)} />
        <Route path='*' element={<ErrorPage errorType='NOT FOUND' status={404} />} />
      </Routes>
      <App/>
    </BrowserRouter>
  </>

}