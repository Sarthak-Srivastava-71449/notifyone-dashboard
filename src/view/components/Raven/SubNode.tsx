import { Col, Collapse, Input, Modal, Popconfirm, Row, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonType } from '../Button';
import authPermissionHandler from 'src/common/authPermission/authPermissions';
import appNames from 'src/common/constants/appNames';
import rightConstants from 'src/common/constants/rightConstants';
import { RootState } from 'src/store';
import { updateNewNodeAction } from 'src/store/actions/ravenActionNodeEvents';
import { sendNodeLink } from 'src/store/actions/ravenNodeEvents';
import {
  assignRavenRootNodeDetails,
  createChildNodeEvent,
  getLinkedNodeEvents,
  onChangeNodeRank,
  setCurrentNodekey,
  updateRankEvent,
} from 'src/store/actions/ravenRootNodeEvents';
import { getAccessToken } from 'src/store/selectors/accessToken';
import {
  getNewNodeOptions,
  getNodeActions,
} from 'src/store/selectors/createNode';
import { getInactiveNodes, getUserRoles } from 'src/store/selectors/subNode';
import './Raven.css';
import { toast } from 'react-toastify';

const { Option } = Select;

interface SubNodeProps {
  nodeSubQuestion: any;
  rootNode?: boolean;
}

const SubNode: React.FC<SubNodeProps> = ({
  nodeSubQuestion,
  rootNode,
}: SubNodeProps) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [selectedNodeActionId, setSelectedNodeActionId] = useState<
    number | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalChangeAction, setShowModalChangeAction] = useState(false);
  const rankInput = useRef<any>(null);

  /*
  Redux Selectors for fetching data
 */
  const userRoles = useSelector((state: RootState) => getUserRoles(state));
  const inactiveNodes = useSelector((state: RootState) =>
    getInactiveNodes(state)
  );
  const accessToken = useSelector((state: RootState) => getAccessToken(state));
  const newNodeOptions = useSelector((state: RootState) =>
    getNewNodeOptions(state)
  );
  const nodeActions = useSelector((state: RootState) => getNodeActions(state));
  const currentNodeKey = useSelector(
    (state: RootState) => state?.ravenRootEventsReducer?.currentNodeKey
  );
  const updatedRankArr = useSelector(
    (state: RootState) => state?.ravenRootEventsReducer?.updatedRank
  );

  useEffect(() => {
    if (rankInput?.current !== null && updatedRankArr?.length === 0) {
      rankInput.current.input.value = '';
    }
  }, [updatedRankArr, rankInput]);

  const dispatch = useDispatch();
  const intl = useIntl();
  const { Panel } = Collapse;

  const updateNodeLink = (nodeName: string, activationStatus: string) => {
    const payload = {
      active: activationStatus,
      node_name: nodeName,
    };
    dispatch(sendNodeLink(accessToken, payload));
  };

  const onChangeAddNode = (event: any) => {
    // If you don't want click extra trigger collapse, you can prevent this:
    event.stopPropagation();
    setShowModal(true);
  };

  const handleChange = (nodeActionValueId: number) => {
    setSelectedNodeActionId(nodeActionValueId);
  };

  const handleChangeDone = (nodeName: string) => {
    const payload = {
      child_id: selectedNodeActionId?.toString(),
      nodeAction: selectedNodeActionId?.toString(),
      parent_name: nodeName,
      rank: null,
    };
    setShowModal(false);
    dispatch(createChildNodeEvent(accessToken, payload));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onChangeAction = () => {
    setShowModalChangeAction(true);
  };

  const handleChangeAction = (nodeActionValueId: number) => {
    setSelectedNodeActionId(nodeActionValueId);
  };

  const handleChangeActionDone = (nodeName: string) => {
    setShowModalChangeAction(false);

    const payload = {
      child_id: selectedNodeActionId?.toString(),
      nodeAction: selectedNodeActionId?.toString(),
      parent_name: nodeName,
    };
    dispatch(updateNewNodeAction(accessToken, payload));
  };

  const closeModalChangeAction = () => {
    setShowModalChangeAction(false);
  };
  const sideLink = (nodeSubQuestion: any) => (
    <div
      className="flex link items-center"
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    >
      <div className="inner-item">
        {!rootNode && (
          <>
            <div className="px-1 font-semibold text-sm">
              {/* This is a button which is used as a toggle */}
              {inactiveNodes &&
              inactiveNodes?.length > 0 &&
              inactiveNodes.includes(nodeSubQuestion?.id) ? (
                <a
                  className="condition-btn condition-btn-true px-1 py-1 link"
                  onClick={() => updateNodeLink(nodeSubQuestion.id, 'true')}
                >
                  <FormattedMessage id="true" />
                </a>
              ) : (
                <a
                  className="condition-btn px-1 py-1 link"
                  onClick={() => updateNodeLink(nodeSubQuestion.id, 'false')}
                >
                  <FormattedMessage id="false" />
                </a>
              )}
            </div>
            <div className="ml-3">
              <Input
                type="number"
                className={
                  'custom-input input-number focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6  rounded-md py-1 px-1.5  shadow-sm'
                }
                placeholder={intl?.formatMessage({ id: 'rank' })}
                data-testid="rank-number"
                ref={rankInput}
                onBlur={(e) => {
                  const v = e.target.value;
                  const parentId = nodeSubQuestion.id.slice(
                    0,
                    nodeSubQuestion.id.lastIndexOf('.') // get the parent id -> 161.138.1 gives 161.138
                  );
                  if (currentNodeKey !== null && parentId === currentNodeKey) {
                    if (v) {
                      dispatch(
                        onChangeNodeRank(v.toString(), nodeSubQuestion.id)
                      );
                    }
                  } else {
                    toast.info('Reopen the required sub panel again!');
                  }
                }}
              />
            </div>
            <div className="ml-3">
              {!nodeSubQuestion?.sub_questions && (
                <a className="link ml-1.5 px-1" onClick={onChangeAction}>
                  <FormattedMessage id="change_action" />
                </a>
              )}
            </div>
          </>
        )}
        {authPermissionHandler(
          userRoles,
          appNames?.HELP,
          rightConstants?.UPDATE
        ) && (
          <div className="edit-node-btn">
            {/* This is for Edit Action */}
            {!nodeSubQuestion.sub_questions ? (
              <Link
                rel="noopener noreferrer"
                replace={true}
                to={`/communication/raven/edit/action/${nodeSubQuestion.id}`}
              >
                <Button
                  className="px-1"
                  onClick={() => {
                    dispatch(assignRavenRootNodeDetails(nodeSubQuestion));
                    dispatch(
                      getLinkedNodeEvents(
                        accessToken,
                        nodeSubQuestion.node_action
                      )
                    );
                  }}
                >
                  <FormattedMessage id="edit_action" />
                </Button>
              </Link>
            ) : (
              // This is for Edit Node
              <Link
                rel="noopener noreferrer"
                replace={true}
                className="edit-btn"
                to={`/communication/raven/edit/${nodeSubQuestion.id}`}
              >
                <Button
                  className="px-1"
                  onClick={() => {
                    dispatch(assignRavenRootNodeDetails(nodeSubQuestion));
                  }}
                >
                  <span className="parent-edit-btn">
                    <FormattedMessage id="edit" />
                  </span>
                  <span className="child-edit-btn">
                    <FormattedMessage id="edit_node" />
                  </span>
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const RootNode = (subQuestionLength: number | null) => (
    <div className="node-link flex">
      {authPermissionHandler(
        userRoles,
        appNames.HELP,
        rightConstants.CREATE
      ) && (
        <Button
          className="text-sm mr-1.5 link px-1.5"
          onClick={(e) => onChangeAddNode(e)}
        >
          <FormattedMessage id="add_node" />
        </Button>
      )}
      <Button
        className="text-sm link px-1.5"
        disabled={
          subQuestionLength === null ||
          updatedRankArr.length !== subQuestionLength
        }
        onClick={() => dispatch(updateRankEvent(accessToken, updatedRankArr))}
      >
        <FormattedMessage id="update_rank" />
      </Button>
    </div>
  );

  let subQuestionFlag = false;
  if (
    nodeSubQuestion?.sub_questions &&
    nodeSubQuestion?.sub_questions?.length > 0
  ) {
    subQuestionFlag = false;
  } else {
    subQuestionFlag = true;
  }
  return (
    <div>
      <Collapse
        accordion
        onChange={(key: any) => {
          const v = key !== undefined ? key : null; // if key exists then set key else set to null
          dispatch(setCurrentNodekey(v));
          setCollapseOpen(!collapseOpen);
        }}
      >
        {!collapseOpen ? (
          <Panel
            header={nodeSubQuestion?.id + ' ' + nodeSubQuestion?.name}
            key={nodeSubQuestion?.id}
            extra={sideLink(nodeSubQuestion)}
            disabled={subQuestionFlag}
            className={
              inactiveNodes?.includes(nodeSubQuestion?.id) && 'bg-zinc-100'
            }
          >
            {nodeSubQuestion?.sub_questions &&
              nodeSubQuestion.sub_questions?.length > 0 &&
              nodeSubQuestion.sub_questions.map((subNodeQuestions: any) => (
                <SubNode
                  key={subNodeQuestions?.id}
                  nodeSubQuestion={subNodeQuestions}
                />
              ))}
          </Panel>
        ) : (
          <Panel
            header={nodeSubQuestion.name}
            key={nodeSubQuestion.id}
            extra={RootNode(nodeSubQuestion?.sub_questions?.length || null)}
            disabled={subQuestionFlag}
          >
            {nodeSubQuestion.sub_questions &&
              nodeSubQuestion.sub_questions?.length > 0 &&
              nodeSubQuestion.sub_questions.map((nodeSubQuestion: any) => (
                <SubNode
                  key={nodeSubQuestion.id}
                  nodeSubQuestion={nodeSubQuestion}
                />
              ))}
          </Panel>
        )}
      </Collapse>
      <Modal
        title={intl?.formatMessage({ id: 'select_node' })}
        centered
        className="subnode-wrapper"
        visible={showModal}
        onCancel={closeModal}
        width={700}
        destroyOnClose
        footer={
          <Row className="flex justify-end">
            <Col>
              <Popconfirm
                className="popconfrim"
                title="Are you sure？"
                onConfirm={() => handleChangeDone(nodeSubQuestion.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type={ButtonType?.Primary}
                  disabled={selectedNodeActionId === null}
                >
                  <FormattedMessage id="done" />
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        }
      >
        <Row>
          <Col className="w-full">
            <Select
              placeholder={intl?.formatMessage({ id: 'select_node' })}
              className="w-full"
              onChange={handleChange}
              showSearch
            >
              {newNodeOptions?.length > 0 &&
                newNodeOptions.map((item: any) => {
                  return (
                    <Option value={item?.id} key={item.id}>{`${item?.id}_${
                      item?.name
                    }${
                      item?.node_action !== null ? '_' + item.node_action : ''
                    }`}</Option>
                  );
                })}
            </Select>
          </Col>
        </Row>
      </Modal>
      <Modal
        title={intl?.formatMessage({ id: 'select_node_action' })}
        centered
        destroyOnClose
        className="subnode-wrapper"
        visible={showModalChangeAction}
        onCancel={closeModalChangeAction}
        width={700}
        footer={
          <Row className="flex justify-end">
            <Col>
              <Popconfirm
                className="popconfrim"
                title="Are you sure？"
                onConfirm={() => handleChangeActionDone(nodeSubQuestion.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type={ButtonType?.Primary}
                  disabled={selectedNodeActionId === null}
                  className="text-sm link px-1.5"
                >
                  <FormattedMessage id="done" />
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        }
      >
        <Row>
          <Col className="w-full">
            <Select
              onChange={handleChangeAction}
              placeholder={intl?.formatMessage({ id: 'select_node_action' })}
              className="w-full"
              showSearch
            >
              {nodeActions?.length > 0 &&
                nodeActions.map((item: any) => {
                  return (
                    <Option
                      key={item.id}
                      value={item?.id}
                    >{`${item?.id}_${item?.header}`}</Option>
                  );
                })}
            </Select>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default React.memo(SubNode);
