import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import NotFound from '../pages/404';
import Contact from '../pages/Contact';
import Catculator from '../pages/Catculator';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Catculator />} />
          <Route
            path="/contact"
            element={
              <React.Suspense fallback={<>...</>}>
                <Contact />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
