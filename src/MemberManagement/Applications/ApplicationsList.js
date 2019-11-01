import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios'

import PageTitleAlt3 from '../../Layout/AppMain/PageTitleAlt3';
import SweetAlert from 'sweetalert-react';
import LaddaButton, {
    ZOOM_IN,
} from 'react-ladda';

import Circle from 'react-circle';
import Chart from 'react-apexcharts'

import bg1 from '../../assets/utils/images/dropdown-header/abstract1.jpg';

import avatar1 from '../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../assets/utils/images/avatars/4.jpg';

import classnames from 'classnames';

import {
    Row, Col,
    Alert,
    Button,
    CardHeader,
    Table,
    ButtonGroup,
    Nav,
    NavItem,
    NavLink,
    Popover,
    PopoverBody,
    Progress,
    Card,
    CardBody,
    DropdownItem, DropdownToggle, DropdownMenu,
    UncontrolledButtonDropdown, CardFooter
} from 'reactstrap';

import Column from './Examples/Column';
import Bar2 from './Examples/Bar';
import Area from './Examples/Area';
import Mixed from './Examples/Mixed';

import {
    faAngleUp,
    faAngleDown,
    faQuestionCircle,
    faBusinessTime,
    faCog
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class MinimalDashboard1 extends Component {

    constructor(props) {
        super(props);

        this.togglePop1 = this.togglePop1.bind(this);

        this.state = {
            popoverOpen1: false,
            persons: [],
            responseModal: {
                show: false,
                message: ''
            },
            isSending: false,
        }
    }

    togglePop1() {
        this.setState({
            popoverOpen1: !this.state.popoverOpen1
        });
    }

    formatDate(responseDate){
        const date = new Date(responseDate)
        return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }

    componentDidMount() {
        // axios.get('https://ydli.herokuapp.com/list')
        axios.get('http://localhost:5000/list')
            .then(res => {
                console.log(res.data)
                const newPersons = []
                res.data.forEach(data => {
                    newPersons.push({
                        ...data,
                        createdDate: this.formatDate(data.createdDate)
                    })
                })
                this.setState({
                    persons: newPersons
                })
            })
    }

    getClassNameStatus(status){
        switch (status) {
            case 'rejected':
                return 'badge badge-pill badge-danger'
            case 'ON HOLD':
                return 'badge badge-pill badge-info'
            case 'created':
                return 'badge badge-pill badge-info'
            case 'accepted':
                return 'badge badge-pill badge-success'
            default:
                return 'badge badge-pill badge-warning'
        }
    }

    acceptHandler = id => {
        this.setState({
            isSending: true,
        })
        axios.post('http://localhost:5000/accept', {
            id: id
        }).then(data => {
            console.log(data)
            this.setState({
                persons: this.state.persons.map(person => {
                    if (person._id == id) person.status = 'accepted'
                    return person
                }),
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
            persons: this.state.persons.map(person => {
                if (person._id == id) person.status = 'rejected'
                return person
            }),
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

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <PageTitleAlt3
                        heading="Application form"
                        subheading="This is an example dashboard created using build-in elements and components."
                        icon="lnr-apartment opacity-6"
                    />
                    
                    
                    <Card className="main-card mb-3">
                        <CardHeader>
                            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                Đơn đăng ký
                            </div>
                            <div className="btn-actions-pane-right">
                                <Button size="sm" outline className="btn-icon btn-wide btn-outline-2x" id={'PopoverCustomT-1'}
                                        onClick={this.togglePop1} color="focus">
                                    Actions Menu
                                    <span className="pl-2 align-middle opacity-7">
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </span>
                                </Button>
                                <Popover className="popover-custom rm-pointers" placement="auto"
                                         isOpen={this.state.popoverOpen1}
                                         target={'PopoverCustomT-1'} toggle={this.togglePop1}>
                                    <PopoverBody>
                                        <div className="dropdown-menu-header">
                                            <div className={classnames(
                                                "dropdown-menu-header-inner bg-focus")}>
                                                <div className="menu-header-image"
                                                     style={{
                                                         backgroundImage: 'url(' + bg1 + ')'
                                                     }}
                                                />
                                                <div className="menu-header-content">
                                                    <h5 className="menu-header-title">Settings</h5>
                                                    <h6 className="menu-header-subtitle">Manage all of your
                                                        options</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <Nav vertical>
                                            <NavItem className="nav-item-header">
                                                Activity
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="javascript:void(0);">
                                                    Chat
                                                    <div className="ml-auto badge badge-pill badge-info">8</div>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="javascript:void(0);">Recover Password</NavLink>
                                            </NavItem>
                                            <NavItem className="nav-item-divider"/>
                                            <NavItem className="nav-item-btn text-center">
                                                <Button size="sm" className="btn-wide btn-shadow" color="danger">
                                                    Cancel
                                                </Button>
                                            </NavItem>
                                        </Nav>
                                    </PopoverBody>
                                </Popover>
                            </div>
                        </CardHeader>
                        <Table responsive borderless hover className="align-middle text-truncate mb-0">
                            <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Số điện thoại</th>
                                <th className="text-center">Facebook Link</th>
                                <th className="text-center">Group</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Created Date</th>
                                {/* <th className="text-center">Target Achievement</th> */}
                                <th className="text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.persons.map((person, i) => (
                                    <tr key={i}>
                                        <td className="text-center text-muted" style={{width: '80px'}}>#{i+1}</td>
                                        <td className="text-center">
                                            <a href={`#/applications/detail/${person._id}`}>
                                                {person.name}
                                            </a>
                                        </td>
                                        <td className="text-center">
                                            <a href="javascript:void(0)">
                                                {person.email}
                                            </a>
                                        </td>
                                        <td className="text-center">
                                            {person.phoneNumber}
                                        </td>
                                        <td className="text-center">
                                            {person.fbLink}
                                        </td>
                                        <td className="text-center">
                                            {person.group}
                                        </td>
                                        <td className="text-center">
                                            <div className={this.getClassNameStatus(person.status)}>{person.status}</div>
                                        </td>
                                        <td className="text-center">
                                                    <span className="pr-2 opacity-6">
                                                        <FontAwesomeIcon icon={faBusinessTime}/>
                                                    </span>
                                            {(person.createdDate)}
                                        </td>
                                        {/* <td className="text-center" style={{width: '200px'}}>
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left pr-2">
                                                            <div className="widget-numbers fsize-1 text-danger">
                                                                71%
                                                            </div>
                                                        </div>
                                                        <div className="widget-content-right w-100">
                                                            <Progress
                                                                className="progress-bar-xs"
                                                                color="danger"
                                                                value="71"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td> */}
                                        <td className="text-center">
                                            <ButtonGroup size="sm">
                                                {/* {person.status == 'created' ? (
                                                    <div>
                                                        <LaddaButton className="btn btn-shadow btn-primary"
                                                                    loading={this.state.isSending}
                                                                    onClick={() => this.acceptHandler(person._id)}
                                                                    data-style={ZOOM_IN}
                                                        >
                                                            Accept
                                                        </LaddaButton>
                                                        <LaddaButton className="btn btn-shadow btn-primary"
                                                                    loading={this.state.isSending}
                                                                    onClick={() => this.rejectHandler(person._id)}
                                                                    data-style={ZOOM_IN}
                                                        >
                                                            Reject
                                                        </LaddaButton>
                                                    </div>
                                                ) : null} */}
                                                {/* <Button className='btn-shadow' color="primary" onClick={() => this.acceptHandler(person._id)}>Accept</Button> */}
                                                        {/* <Button className='btn-shadow' color="primary" onClick={() => this.rejectHandler(person._id)}>Reject</Button> */}
                                                        <LaddaButton className="btn btn-shadow btn-primary"
                                                                    loading={this.state.isSending}
                                                                    onClick={() => this.acceptHandler(person._id)}
                                                                    data-style={ZOOM_IN}
                                                        >
                                                            Accept
                                                        </LaddaButton>
                                                        <LaddaButton className="btn btn-shadow btn-primary"
                                                                    loading={this.state.isSending}
                                                                    onClick={() => this.rejectHandler(person._id)}
                                                                    data-style={ZOOM_IN}
                                                        >
                                                            Reject
                                                        </LaddaButton>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            
                            
                            </tbody>
                        </Table>
                        <CardFooter className="d-block p-4 text-center">
                            <Button color="dark" className="btn-pill btn-shadow btn-wide fsize-1" size="lg">
                                    <span className="mr-2 opacity-7">
                                        <FontAwesomeIcon spin fixedWidth={false} icon={faCog}/>
                                    </span>
                                <span className="mr-1">
                                        View Complete Report
                                    </span>
                            </Button>
                        </CardFooter>

                        <SweetAlert
                                    title={this.state.responseModal.message}
                                    confirmButtonColor=""
                                    show={this.state.responseModal.show}
                                    text={this.state.responseModal.responesMessage}
                                    type={this.state.responseModal.type}
                                    onConfirm={() => this.setState({responseModal: {show: false, message: ''}})}/>
                    </Card>


                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
