import React, { useState, useEffect} from 'react';
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardHeader,
  Table,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {
  Separator,
  Colxx,
} from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import GlideComponentThumbs from '../../../../components/carousel/GlideComponentThumbs';
import { detailImages, detailThumbs } from '../../../../data/carouselItems';
import { detailsQuestionsData } from '../../../../data/questions';
import CommentWithLikes from '../../../../components/pages/CommentWithLikes';
import { commentWithLikesData } from '../../../../data/comments';
import QuestionAnswer from '../../../../components/pages/QuestionAnswer';
import GalleryDetail from '../../../../containers/pages/GalleryDetail';
import { useParams } from 'react-router';
import axios from 'axios';

const DetailsPages = ({ match, intl, props}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const { messages } = intl;

  useEffect(() => {
    axios.get(
      `https://unify-api-server.herokuapp.com/api/universities`
     ,{
      headers : {
        'auth-token' : JSON.parse(localStorage.getItem('unify_current_user')).token
      }
    })
    .then((res) => {
      return res.data.body;
    })
    .then((data) => {
      console.log(data)
      setItems(
        data.filter((x) => x._id === id)
      );
      setIsLoaded(true)
    })
  },[])
  console.log(items);
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>{items[0].name}</h1>

          <Breadcrumb match={match} />
          <Separator className="mb-5" />

          <Row className="justify-content-center">
            <Colxx xxs="12" xl="12" className="col-left ">
              <Card className="mb-4">
                <CardHeader>
                  <Nav tabs className="card-header-tabs ">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'details',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('details')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="pages.details-title" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'contactus',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('contactus')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="Contact Us" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'courses',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('courses')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="Courses" />
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>

                <TabContent activeTab={activeTab}>
                  <TabPane tabId="details">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <p className="font-weight-bold">
                            Year of Establishment
                          </p>
                          <p>
                            {items[0].year}
                          </p>
                          <br />
                          <p className="font-weight-bold">
                            Academic Duration
                          </p>
                          <p>
                            {items[0].academicyear ? items[0].academicyear : 'Not available'}
                          </p>
                          <p className="font-weight-bold">
                            Requirements
                          </p>
                          <p>
                            {items[0].requirements ? items[0].requirements  : 'Not available'} 
                          </p>
                          {items[0].tutionfees &&  (
                            <>
                              <p className="font-weight-bold">
                                Tuition Fees
                              </p>
                              <p>
                                { items[0].tutionfees}
                              </p>
                          </>
                          )}
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="contactus">
                    <Row>
                      <Colxx sm="12">
                       <CardBody>
                          <p className="font-weight-bold">
                            {items[0].name}
                          </p>
                          <p >
                            {items[0].address.city}
                          </p>
                          <p>
                            {items[0].address.street} {items[0].address.postcode}
                          </p>
                          <p>
                            <a href={items[0].address.website}> {items[0].address.website} </a>
                          </p>
                          <br />
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="courses">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                        <Table borderless>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Course Name</th>
                                  <th scope="col">Field</th>
                                </tr>
                              </thead>
                              <tbody>
                          {items[0].courses.map((item, index) => {
                            return (
                                <tr>
                                  <th scope="row">{index+1}</th>
                                  <td>{item.name}</td>
                                  <td>{item.field}</td>
                                </tr>
                            );
                          })}
                          </tbody>
                          </Table>
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                </TabContent>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    
      
    </> )
};
export default injectIntl(DetailsPages);
