import React    from 'react';
import Header from './Header';
import Exchange from './Exchange';
import Footer from './Footer';

class Home extends React.Component {

    render() {
        return(
            <div>
                <Header />
                <Exchange />
                <Footer />
            </div>

        );
    }
}
export default Home;