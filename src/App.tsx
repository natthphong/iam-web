import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage.tsx';
import RoleManagePage from './pages/roleManage/RoleManagePage.tsx';


function App() {
    return (
        <Router basename="/iam-web">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/role-manage" element={<RoleManagePage />} />

            </Routes>
        </Router>
    );
}

export default App;
