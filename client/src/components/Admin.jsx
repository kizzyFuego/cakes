import React    from 'react';
import Header from './Header';
import AdminTable from './AdminTable';
import Footer from './Footer';


class Admin extends React.Component {

    render() {
        return(
            <div>
                <Header />
                <AdminTable />
                <Footer />
            </div>

        );
    }
}
export default Admin;