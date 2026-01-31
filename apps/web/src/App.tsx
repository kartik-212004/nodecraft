import { BrowserRouter, Route, Routes } from "react-router-dom"
import Workflow from "./components/CreateWorkflow"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-workflow" element={<Workflow />} />
      </Routes>
    </BrowserRouter>
  )
}
