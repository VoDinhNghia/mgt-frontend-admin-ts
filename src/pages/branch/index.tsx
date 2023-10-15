import React, { useEffect, useState } from "react";
import "./index.css";
import {
  validateAccessModule,
  validateAction,
} from "../../utils/permission.util";
import {
  modalTypes,
  moduleNames,
  permissonTypes,
} from "../../constants/constant";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import {
  IbranchCardItem,
  IbranchInfoReadMore,
  IbranchReadMore,
  IpropBranchPage,
} from "../../interfaces/branch.interface";
import { branchActions } from "../../store/actions";
import AddAndSearchTable from "../commons/add-search-table";
import { Card, Col, Row, Button } from "react-bootstrap";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import ModalBranchPage from "./modals";
import ReadMoreCommon from "../commons/readmore";
import TitleHeaderPage from "../commons/title-header";

const BranchMgtPage = (props: IpropBranchPage) => {
  const { listBranchs = [], dispatch } = props;
  const [state, setState] = useState({
    isShowModalAdd: false,
    isShowModalUpdate: false,
    isShowModalDelete: false,
    isShowModalView: false,
    branchInfo: {},
    readMore: {},
  });
  const isAccess = validateAccessModule(moduleNames.BRANCH_MANAGEMENT);
  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.BRANCH_MANAGEMENT
  );
  const isPermissionUpdate = validateAction(
    permissonTypes.EDIT,
    moduleNames.BRANCH_MANAGEMENT
  );
  const isPermissionDelete = validateAction(
    permissonTypes.DELETE,
    moduleNames.BRANCH_MANAGEMENT
  );
  const {
    isShowModalAdd,
    isShowModalDelete,
    isShowModalUpdate,
    isShowModalView,
    branchInfo,
    readMore,
  } = state;
  const branchInfoReadMore: IbranchInfoReadMore = branchInfo;
  const allStateReadMore: IbranchReadMore = readMore;

  const fetchBranchs = () => {
    dispatch({
      type: branchActions.GET_LIST_BRANCH,
    });
  };

  const onSearch = (searchKey: string) => {
    dispatch({
      type: branchActions.GET_LIST_BRANCH,
      payload: {
        searchKey,
      },
    });
  };

  const handleReadMore = (branchInfo: IbranchReadMore) => {
    const isReadMore = allStateReadMore[`${branchInfo?._id}`];
    setState({
      ...state,
      readMore: { [`${branchInfo?._id}`]: !isReadMore },
      branchInfo,
    });
  };

  useEffect(() => {
    fetchBranchs();
  }, []);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
              <TitleHeaderPage title="Branch management page" />
              <AddAndSearchTable
                isDisableBtnAdd={!isPermissionAdd}
                title="Add branch"
                onSearch={(searchKey: string) => onSearch(searchKey)}
                onShowAdd={() => setState({ ...state, isShowModalAdd: true })}
              />
              <Row>
                {listBranchs?.map((branch: IbranchCardItem) => {
                  const location = `${branch?.location?.address}, ${branch?.location?.ward?.name}, ${branch?.location?.district?.name}, ${branch?.location?.province?.name}, ${branch?.location?.country?.name}`;
                  return (
                    <Col xl={6} key={branch?._id}>
                      <Card className="mb-3">
                        <Card.Header className="bg-primary text-white">
                          {branch?.title}
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>Name: {branch?.name}</Card.Text>
                          <Card.Text>
                            Website:{" "}
                            <a href={branch?.website}>{branch?.website}</a>
                          </Card.Text>
                          <Card.Text>Location: {location}</Card.Text>
                          <Card.Text>
                            ContactInfo:{" "}
                            <Button
                              variant="outline-primary"
                              className="border-0"
                              size="sm"
                              onClick={() =>
                                setState({
                                  ...state,
                                  isShowModalView: true,
                                  branchInfo: branch,
                                })
                              }
                            >
                              View detail
                            </Button>
                          </Card.Text>
                          <div>
                            <ReadMoreCommon
                              isReadMore={
                                branch._id === branchInfoReadMore?._id
                                  ? allStateReadMore[`${branch._id}`]
                                  : false
                              }
                              setReadMore={() => handleReadMore(branch)}
                              lengthSlice={40}
                              title="Description: "
                            >
                              {branch?.description}
                            </ReadMoreCommon>
                          </div>
                        </Card.Body>
                        <Card.Footer>
                          <span className="ActionGroupCardBranch">
                            <Button
                              variant="primary"
                              disabled={!isPermissionUpdate}
                              onClick={() =>
                                setState({
                                  ...state,
                                  isShowModalUpdate: true,
                                  branchInfo: branch,
                                })
                              }
                            >
                              <BsPencilSquare /> Update info
                            </Button>{" "}
                            <Button
                              variant="danger"
                              disabled={!isPermissionDelete}
                              onClick={() =>
                                setState({
                                  ...state,
                                  isShowModalDelete: true,
                                  branchInfo: branch,
                                })
                              }
                            >
                              <BsTrash /> Delete
                            </Button>
                          </span>
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Container>
          <ModalBranchPage
            type={modalTypes.ADD}
            isShowModal={isShowModalAdd}
            branchInfo={{}}
            onCloseModal={() => setState({ ...state, isShowModalAdd: false })}
            fetchBranchs={() => fetchBranchs()}
          />
          <ModalBranchPage
            type={modalTypes.UPDATE}
            isShowModal={isShowModalUpdate}
            branchInfo={branchInfo}
            onCloseModal={() =>
              setState({ ...state, isShowModalUpdate: false })
            }
            fetchBranchs={() => fetchBranchs()}
          />
          <ModalBranchPage
            type={modalTypes.DELETE}
            isShowModal={isShowModalDelete}
            branchInfo={branchInfo}
            onCloseModal={() =>
              setState({ ...state, isShowModalDelete: false })
            }
            fetchBranchs={() => fetchBranchs()}
          />
          <ModalBranchPage
            type={modalTypes.VIEW}
            isShowModal={isShowModalView}
            branchInfo={branchInfo}
            onCloseModal={() => setState({ ...state, isShowModalView: false })}
            fetchBranchs={() => fetchBranchs()}
          />
          <FooterPage />
        </div>
      ) : (
        <ForbidenPage />
      )}
    </div>
  );
};

const mapStateToProps = (state: IstateRedux) => {
  return {
    listBranchs: state.BranchReducer.listBranchs,
  };
};

export default connect(mapStateToProps)(BranchMgtPage);
