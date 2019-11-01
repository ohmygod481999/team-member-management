

import React, {Component, Fragment} from 'react';
import axios from 'axios';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// import {
//     Row, Col,
//     Card, CardBody, Button,
//     CardTitle
// } from 'reactstrap';

import PageTitleAlt from '../../Layout/AppMain/PageTitleAlt';

import Sticky from 'react-stickynode';

import cx from 'classnames';
import Hamburger from 'react-hamburgers';
import _ from 'lodash';

import {
    TabContent, TabPane, DropdownItem,
    CardBody, Collapse, FormGroup, Label, Input, FormFeedback, FormText,
    Card, Col, Row, CardHeader,
    Button
} from 'reactstrap';

import classnames from 'classnames';

export default class ApplicationDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: null,
            email: null,
            id: null,
            phoneNumber: null,
            person: null,
            activeTab: '1',
            active: false,
            collapse: false,
            accordion: [true, false, false, false],
            custom: [true, false],
            status: null,
            fadeIn: true,
            timeout: 300,
        }
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/get/${this.props.match.params.id}`)
            .then(res => {
                console.log(res, 'here')
                this.setState({
                    id: res.data._id,
                    name: res.data.name,
                    email: res.data.email,
                    status: res.data.status,
                    person: res.data
                })
                console.log(this.state.person)
            })
    }

    
    // toggle() {
    //     this.setState({collapse: !this.state.collapse});
    // }

    toggleAccordion(tab) {

        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => tab === index ? !x : false);

        this.setState({
            accordion: state,
        });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const style = {
            paddingBottom: 15
        }
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    className={cx("app-inner-layout chat-layout", {
                        'open-mobile-menu': this.state.active,
                    })}
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                        <div>
                        <Sticky enabled={!this.state.active} top='.app-header' innerZ="12" activeClass="sticky-active-class">
                            <div className="app-inner-layout__header text-white bg-premium-dark">
                                <PageTitleAlt
                                    heading={_.get(this.state, 'person.name')}
                                    subheading={_.get(this.state, 'person.email')}
                                    icon="pe-7s-user text-white"
                                    status={this.state.status}
                                    id={_.get(this.state, 'person.id')}
                                />
                            </div>
                        </Sticky>
                        <div className="app-inner-layout__wrapper row-fluid no-gutters">
                            <Card className="app-inner-layout__sidebar bg-transparent">
                                <Sticky enabled={!this.state.active} top={180} innerZ="15">
                                    <div className="p-3">
                                        <div
                                            className="dropdown-menu p-0 dropdown-menu-inline dropdown-menu-rounded dropdown-menu-hover-primary">
                                            <DropdownItem header className="pt-0">
                                                Menu
                                            </DropdownItem>
                                            <DropdownItem
                                                className={classnames("mb-1", {active: this.state.activeTab === '1'})}
                                                onClick={() => {
                                                    this.toggle('1');
                                                }}>
                                                Thông tin
                                            </DropdownItem>
                                            <DropdownItem
                                                className={classnames("mb-1", {active: this.state.activeTab === '2'})}
                                                onClick={() => {
                                                    this.toggle('2');
                                                }}>
                                                Bài luận
                                            </DropdownItem>
                                        </div>
                                    </div>
                                </Sticky>
                            </Card>
                            <Card className="col-md-12 app-inner-layout__content">
                                <div className="pb-5 pl-5 pr-5 pt-3">
                                    <div className="mobile-app-menu-btn mb-3">
                                        <Hamburger
                                            active={this.state.active}
                                            type="elastic"
                                            onClick={() => this.setState({active: !this.state.active})}
                                        />
                                    </div>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">

                                            <div id="accordion" className="accordion-wrapper mb-3">
                                                <Card>
                                                    <CardHeader id="headingOne">
                                                        <Button block color="link" className="text-left m-0 p-0"
                                                                onClick={() => this.toggleAccordion(0)}
                                                                aria-expanded={this.state.accordion[0]}
                                                                aria-controls="collapseOne">
                                                            <h3 className="form-heading">
                                                                Thông tin cá nhân
                                                                <p>Personal information</p>
                                                            </h3>
                                                        </Button>
                                                    </CardHeader>
                                                    <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion"
                                                              id="collapseOne" aria-labelledby="headingOne">
                                                        <CardBody>
                                                            <Row form>
                                                                <Col md={6} style={style}>
                                                                    <FormGroup>
                                                                        <h6><b>Email:</b></h6>
                                                                        <p>{_.get(this.state, 'person.email')}</p>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md={6} style={style} style={style}>
                                                                    <FormGroup>
                                                                        <h6><b>Số điện thoại:</b></h6>
                                                                        <p>{_.get(this.state, 'person.phoneNumber')}</p>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row form>
                                                                <Col md={6} style={style}>
                                                                    <FormGroup>
                                                                        <h6><b>Ngày sinh:</b></h6>
                                                                        <p>{_.get(this.state, 'person.birthday')}</p>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md={6} style={style}>
                                                                    <FormGroup>
                                                                        <h6><b>Giới tính:</b></h6>
                                                                        <p>{_.get(this.state, 'person.gender')}</p>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row form>
                                                                <Col md={6} style={style}>
                                                                    <FormGroup>
                                                                        <h6><b>Nghề nghiệp:</b></h6>
                                                                        <p>{_.get(this.state, 'person.job')}</p>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md={6} style={style}>
                                                                    <FormGroup>
                                                                        <h6><b>Thành phố:</b></h6>
                                                                        <p>{_.get(this.state, 'person.city')}</p>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Collapse>
                                                </Card>
                                                <Card>
                                                    <CardHeader className="b-radius-0" id="headingTwo">
                                                        <Button block color="link" className="text-left m-0 p-0"
                                                                onClick={() => this.toggleAccordion(1)}
                                                                aria-expanded={this.state.accordion[1]}
                                                                aria-controls="collapseTwo">
                                                            <h3 className="form-heading">
                                                                Học vấn
                                                                <p>Education</p>
                                                            </h3>
                                                        </Button>
                                                    </CardHeader>
                                                    <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion"
                                                              id="collapseTwo">
                                                        <CardBody>
                                                            <Row form>
                                                                    <Col md={6} style={style}>
                                                                        <FormGroup>
                                                                            <h6><b>Trường THPT đã/đang học:</b></h6>
                                                                            <p>{_.get(this.state, 'person.highSchoolName')}</p>
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col md={6} style={style}>
                                                                        <FormGroup>
                                                                            <h6><b>Trường Cao Đẳng/ Đại học đã/đang học:</b></h6>
                                                                            <p>{_.get(this.state, 'person.universityName')}</p>
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col md={6} style={style}>
                                                                        <FormGroup>
                                                                            <h6><b>Trường, khoa đã/đang học sau Đại học:</b></h6>
                                                                            <p>{_.get(this.state, 'person.birthday')}</p>
                                                                        </FormGroup>
                                                                    </Col>

                                                                    <Col md={6} style={style}>
                                                                        <FormGroup>
                                                                            <h6><b>Chương trình đã/đang học sau Đại học:</b></h6>
                                                                            <p>Khong co</p>
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col md={6} style={style}>
                                                                        <FormGroup>
                                                                            <h6><b>Thương hiệu/Tổ chức/Công ty đang làm việc :</b></h6>
                                                                            <p>{_.get(this.state, 'person.organizationName')}</p>
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col md={6} style={style}>
                                                                        <FormGroup>
                                                                            <h6><b>Chức danh/Vị trí tại Thương hiệu/Tổ chức/Công ty:</b></h6>
                                                                            <p>{_.get(this.state, 'person.position')}</p>
                                                                        </FormGroup>
                                                                    </Col>
                                                                    
                                                            </Row>
                                                        </CardBody>
                                                    </Collapse>
                                                </Card>
                                                <Card>
                                                    <CardHeader id="headingThree">
                                                        <Button block color="link" className="text-left m-0 p-0"
                                                                onClick={() => this.toggleAccordion(2)}
                                                                aria-expanded={this.state.accordion[2]}
                                                                aria-controls="collapseThree">
                                                            <h3 className="form-heading">
                                                                Thành tích
                                                                <p>Achivements</p>
                                                            </h3>
                                                        </Button>
                                                    </CardHeader>
                                                    <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion"
                                                              id="collapseThree">
                                                        <CardBody>
                                                            <Col md={12} style={style}>
                                                                <FormGroup>
                                                                    <h6><b>Nhóm:</b></h6>
                                                                    <ul style={{paddingLeft: 20}}>
                                                                        <li><p>{_.get(this.state, 'person.group')}</p></li>
                                                                    </ul>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={12} style={style}>
                                                                <FormGroup>
                                                                    <h6><b>Chi tiết thành tích học tập hoặc thủ lĩnh:</b></h6>
                                                                    <p>{_.get(this.state, 'person.detailAchievements')}</p>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={6} style={style}>
                                                                <FormGroup>
                                                                    <h6><b>Ngoại ngữ:</b></h6>
                                                                    <ul style={{paddingLeft: 20}}>
                                                                        <li><p>{_.get(this.state, 'person.foreignLanguage')}</p></li>
                                                                    </ul>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={3} style={style}>
                                                                <FormGroup>
                                                                    <h6><b>Đánh giá vai trò trong tổ chức:</b></h6>
                                                                    <ul style={{paddingLeft: 20}}>
                                                                        <li><p>{_.get(this.state, 'person.role')}.</p></li>
                                                                    </ul>
                                                                </FormGroup>
                                                            </Col>
                                                            
                                                        </CardBody>
                                                    </Collapse>
                                                </Card>
                                                <Card>
                                                    <CardHeader id="headingFour">
                                                        <Button block color="link" className="text-left m-0 p-0"
                                                                onClick={() => this.toggleAccordion(3)}
                                                                aria-expanded={this.state.accordion[3]}
                                                                aria-controls="collapseFour">
                                                            <h3 className="form-heading">
                                                                Thông tin thêm
                                                                <p>More information</p>
                                                            </h3>
                                                        </Button>
                                                    </CardHeader>
                                                    <Collapse isOpen={this.state.accordion[3]} data-parent="#accordion"
                                                              id="collapseThree">
                                                        <CardBody>
                                                            <Col md={12} style={style}>
                                                                <FormGroup>
                                                                    <h6><b>Muốn đăng ký vào sub-incubator:</b></h6>
                                                                    <p>{_.get(this.state, 'person.subincubator')}</p>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={12} style={style}>
                                                                <FormGroup>
                                                                    <h6><b>Kênh giới thiệu:</b></h6>
                                                                    <p>{_.get(this.state, 'person.introducer')}</p>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={12} style={style}>
                                                                <FormGroup>
                                                                    <h6><b>Đóng góp được gì cho cộng đồng YDLI:</b></h6>
                                                                    <p>{_.get(this.state, 'person.contribution')}</p>
                                                                </FormGroup>
                                                            </Col>
                                                            
                                                        </CardBody>
                                                    </Collapse>
                                                </Card>
                                            </div>

                                            <div className="mt-5"/>
                                            <div className="clearfix">
                                                <div className="text-center">
                                                    <Button color="primary" size="lg"
                                                            className="btn-pill btn-wide btn-shadow" onClick={() => {
                                                        this.toggle('2');
                                                    }}>
                                                        Next: <b>Bài luận</b>
                                                    </Button>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <h4>Maecenas tempus, tellus</h4>
                                            <div className="divider"/>

                                            <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great
                                                explorer of the truth, the master-builder of human happiness.</p>

                                            <p>No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>

                                            <p>Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great
                                                pleasure.</p>

                                            <p>To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?</p>

                                            <p>But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?</p>

                                            <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee</p>

                                            <div className="mt-5"/>
                                        </TabPane>
                                        
                                    </TabContent>
                                </div>
                            </Card>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}
