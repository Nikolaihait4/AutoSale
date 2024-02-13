import Home from 'components/pages/Home';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Suspense>
  );
};
