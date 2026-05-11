import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index />

        <Route path="patients" />

        <Route path="appointments" />

        <Route path="doctors" />

        <Route path="clinics" />

        <Route path="invoices" />

        <Route path="pharmacy" />

        <Route path="reports" />

        <Route path="laboratory" />

        <Route path="settings" />
      </Route>
    </Routes>
  );
}

export default App;
