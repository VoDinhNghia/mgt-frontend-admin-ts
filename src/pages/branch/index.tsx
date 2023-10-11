import React, { useEffect, useState } from "react";
import "./index.css";
import {
  validateAccessModule,
  validateAction,
} from "../../utils/permission.util";
import { moduleNames, permissonTypes } from "../../constants/constant";
import MenuPage from "../commons/menu";
import FooterPage from "../commons/footer";
import ForbidenPage from "../commons/forbiden";
import { Container } from "rsuite";
import { connect } from "react-redux";
import { IstateRedux } from "../../interfaces/common.interface";
import {
  IbranchCardItem,
  IpropBranchPage,
} from "../../interfaces/branch.interface";
import { branchActions } from "../../store/actions";
import AddAndSearchTable from "../commons/add-search-table";
import { Card, Col, Row, Button } from "react-bootstrap";
import { BsTrash, BsPencilSquare } from "react-icons/bs";

const BranchMgtPage = (props: IpropBranchPage) => {
  const { listBranchs = [], dispatch } = props;
  const [state, setState] = useState({
    isShowModalAdd: true,
  });
  const isAccess = validateAccessModule(moduleNames.BRANCH_MANAGEMENT);
  const isPermissionAdd = validateAction(
    permissonTypes.ADD,
    moduleNames.BRANCH_MANAGEMENT
  );
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

  useEffect(() => {
    fetchBranchs();
  }, []);

  console.log("branchs", listBranchs, state);

  return (
    <div>
      {isAccess ? (
        <div className="show-fake-browser sidebar-page mt-1">
          <Container>
            <MenuPage />
            <Container className="p-3 fs-6">
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
                      <Card>
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
                            >
                              View detail
                            </Button>
                          </Card.Text>
                          <Card.Text>
                            Description: {branch?.description}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <span className="ActionGroupCardBranch">
                            <Button variant="primary">
                              <BsPencilSquare /> Update info
                            </Button>{" "}
                            <Button variant="danger">
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
