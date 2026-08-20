import Header from './Header'
import Start from '../components/Start'
import Modules from '../components/Modules'
import Process from '../components/Process'
import Evaluation from '../components/Evaluation'

const Home = () => {
    return (
        <div className='pxl-page'>
            <Header />
            <Modules />
            <Process />
            <Evaluation />
            <Start />
        </div>
    )
}

export default Home
