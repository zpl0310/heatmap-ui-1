import * as React from 'react';
import '../../assets/styles/sidebar.scss';
import Spinner from 'react-spinkit'

class CenteredSpinner extends React.Component<{}, {}> {
    render() {
        return (
            <div className="spinner-container">
                <Spinner name="three-bounce" fadeIn="none" />
            </div>
        );
    }
}

export default CenteredSpinner;