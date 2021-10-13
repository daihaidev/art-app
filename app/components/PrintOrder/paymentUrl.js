import React from 'react';
import request from '../../utils/request';

class PrintOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldUrl: null,
            message: null,
            success: false
        }
    }

    componentDidMount = async () => {
        const {
            match: {
            params: {
                url
            } = {}
            } = {},
            history
        } = this.props;
        console.log(">>>>>url", url);
        await request.getPublic(`paymentUrl/${url}`)
        .then(response => {
            console.log(response.data.url);
            this.setState({
                oldUrl: response.data.url.oldUrl,
                success: true,
                message: "Redirecting to swish mobile app."
            })
        }).catch(error => {
            this.setState({
                message: "The URL is invalid. Therefore redirection cannot be done."
            })
        });
    }
    
    render() {
        const { oldUrl, message, success } = this.state;

        if(oldUrl){
            window.location = oldUrl;
        }

        return (
            <React.Fragment>
                { message }
                { success && 
                <span> If you are not redirected you can click on the link here to process <a href={oldUrl}>{oldUrl}</a> </span>
                }
            </React.Fragment >    
        );
    }
}

export default PrintOrder;