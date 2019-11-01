import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';

import LaddaButton, {
    ZOOM_IN,
} from 'react-ladda';

import {
    Button,
    UncontrolledTooltip
} from 'reactstrap';

import {
    toast,
    Slide
} from 'react-toastify';

import {
    faBatteryThreeQuarters,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class PageTitle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expZoomIn: false,
            responseModal: {
                show: false,
                message: ''
            },
            isSending: false,
            status: props.status
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.status != null) this.setState({
            status: nextProps.status
        })
    }
    
    // static getDerivedStateFromProps(props, state){
    //     return {
    //         status: props.status
    //     }
    // }
    

    acceptHandler = id => {
        this.setState({
            isSending: true,
        })
        axios.post('http://localhost:5000/accept', {
            id: id
        }).then(data => {
            console.log(data)
            this.setState({
                status: 'accepted',
                responseModal: {
                    show: true,
                    message: "Accepted",
                    responesMessage: data.data.mailStatus,
                    type: "success"
                },
            })
        })
        .catch(err => {
            this.setState({
                responseModal: {
                    show: true,
                    message: "Thất bại",
                    responesMessage: err + '',
                    type: "error"
                },
            })
        })
        .finally(() => {
            this.setState({
                isSending: false
            })
        })
    }

    rejectHandler = id => {
        axios.post('http://localhost:5000/reject', {
            id: id
        }).then(data => this.setState({
            status: 'rejected',
            responseModal: {
                show: true,
                message: "Rejected",
                responesMessage: data.data.mailStatus,
                type: "success"
            },
        }))
        .catch(err => {
            this.setState({
                responseModal: {
                    show: true,
                    message: "Thất bại",
                    responesMessage: err + '',
                    type: "error"
                },
            })
        })
        .finally(() => {
            this.setState({
                isSending: false
            })
        })
    }

    render() {
        let {
            enablePageTitleIcon,
            enablePageTitleSubheading,
            heading,
            icon,
            subheading,
            id
        } = this.props;

        const {status} = this.state 

        let statusLabel

        if (status == 'rejected') statusLabel = <div className="badge badge-danger ml-2">rejected</div>
        else if (status == 'created') statusLabel = <div className="badge badge-info ml-2">created</div>
        else if (status == 'accepted') statusLabel = <div className="badge badge-success ml-2">accepted</div>

        return (

            <div className="app-page-title">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div
                            className={cx("page-title-icon bg-happy-fisher", {'d-none': !enablePageTitleIcon})}>
                            <i className={icon}/>
                        </div>
                        <div>
                            {heading}
                            {statusLabel}
                            <div
                                className={cx("page-title-subheading", {'d-none': !enablePageTitleSubheading})}>
                                {subheading}
                            </div>
                        </div>
                        
                    </div>
                    <div className="page-title-actions">
                            <LaddaButton className="btn btn-shadow btn-primary"
                                        loading={this.state.isSending}
                                        onClick={() => this.acceptHandler(id)}
                                        data-style={ZOOM_IN}
                            >
                                Accept
                            </LaddaButton>
                            <LaddaButton className="btn btn-shadow btn-primary"
                                        loading={this.state.isSending}
                                        onClick={() => this.rejectHandler(id)}
                                        data-style={ZOOM_IN}
                            >
                                Reject
                            </LaddaButton>
                    </div>
                    <SweetAlert
                                    title={this.state.responseModal.message}
                                    confirmButtonColor=""
                                    show={this.state.responseModal.show}
                                    text={this.state.responseModal.responesMessage}
                                    type={this.state.responseModal.type}
                                    onConfirm={() => this.setState({responseModal: {show: false, message: ''}})}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    enablePageTitleIcon: state.ThemeOptions.enablePageTitleIcon,
    enablePageTitleSubheading: state.ThemeOptions.enablePageTitleSubheading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);