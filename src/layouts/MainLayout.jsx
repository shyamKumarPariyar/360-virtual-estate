import NavBar from '../components/common/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer'

const MainLayout = () => {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout
