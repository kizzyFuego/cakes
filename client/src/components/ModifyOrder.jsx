import React    from 'react';
import Header from './Header';
import ModifyOrderComponent from './ModifyOrderComponent';
import Footer from './Footer';

class ModifyOrder extends React.Component {

    render() {
        return(
            <div>
                <Header />
                <ModifyOrderComponent />
                <Footer />
            </div>

        );
    }
}
export default ModifyOrder;