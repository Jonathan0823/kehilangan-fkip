

import Footer from '../components/Footer';
import SearchPage from '../components/search-components';


export default function search() {
    return (
        <div>
        <SearchPage/>
        <Footer className={"fixed"}/>
        </div>
    );
}