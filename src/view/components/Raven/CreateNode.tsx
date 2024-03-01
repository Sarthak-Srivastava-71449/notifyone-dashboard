import { Input, Select } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { RootState } from 'src/store';
import { fetchRavenNodeActions } from 'src/store/actions/ravenActionNodeEvents';
import { fetchRavenNodes } from 'src/store/actions/ravenNodeEvents';
import { createNodeEvent } from 'src/store/actions/ravenRootNodeEvents';
import {
  getCreateNodeSuccess,
  getNewNodeOptions,
  getNodeActions,
} from 'src/store/selectors/createNode';
import { getAccessToken } from 'src/store/selectors/accessToken';
import './Raven.css';

const CreateNode: React.FC = () => {
  const [nodeName, setNodeName] = useState('');
  const [selectedNodeType, setSelectedNodeType] = useState('Select Node Type');
  const [selectedNode, setSelectedNode] = useState('');

  /*
   Redux Selectors for fetching data
 */

  const accessToken = useSelector((state: RootState) => getAccessToken(state));
  const createNodeSuccess = useSelector((state: RootState) =>
    getCreateNodeSuccess(state)
  );
  const newNodeOptions = useSelector((state: RootState) =>
    getNewNodeOptions(state)
  );
  const nodeActions = useSelector((state: RootState) => getNodeActions(state));

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    if (createNodeSuccess === true) {
      navigate('/communication/raven', { replace: true });
    }
  }, [createNodeSuccess]);

  const { Option } = Select;
  const dispatch = useDispatch();
  const intl = useIntl();

  // fetch all the updated data
  const fetchData = () => {
    dispatch(fetchRavenNodes(accessToken, 200, 0));
    dispatch(fetchRavenNodeActions(accessToken, 200, 0));
  };

  useEffect(() => {
    let string = '';
    if (selectedNodeType === 'Sub Question') {
      string = 'Select Node';
    } else if (selectedNodeType === 'Node Action') {
      string = 'Select Node Action';
    } else {
      string = '';
    }
    setSelectedNode(string);
  }, [selectedNodeType]);

  // handler for node selection dropdown
  const handleChangeNode = (selectedNodeIdValue: string) => {
    setSelectedNode(selectedNodeIdValue);
  };

  // handler to create node submit button
  const createNodeHandler = () => {
    const payload = {
      application: 'PHARMACY',
      nodeName: nodeName.trim(),
      selectedNode: '',
      selectedNodeAction: '',
      selectedNodeType: selectedNodeType,
    };
    if (!parseInt(selectedNode)) {
      // Check if any Node ID is selected or not
      return;
    }
    if (selectedNodeType === 'Sub Question') {
      payload.selectedNode = selectedNode;
    } else if (selectedNodeType === 'Node Action') {
      payload.selectedNodeAction = selectedNode;
    }
    dispatch(createNodeEvent(accessToken, payload));
    setNodeName('');
    setSelectedNodeType('Select Node Type');
    setSelectedNode('');
  };

  return (
    <Fragment>
      <div className="mx-auto m-6 raven-wrap wallet-wrapper shadow-md">
        <h2 className="text-lg raven-form-title font-semibold text-center py-1">
          <FormattedMessage id="create_node_form" />
        </h2>
        <div className="px-3 py-2 flex-col flex">
          <div className="flex mb-3  gap-4">
            <div className="input-label flex-1">
              <h3
                data-testid="node_details_data"
                className="text-lg rounded-md  bg-blue-400   text-white px-1 font-semibold py-1"
              >
                <FormattedMessage id="node_details" />
              </h3>
              <div className="py-3">
                <span className="text-sm px-1 font-semibold">
                  <FormattedMessage id="enter_node_name" />
                  <span className="px-1">:</span>
                </span>
                <div>
                  <Input
                    className={
                      'w-full text-sm leading-6  rounded-md py-1  shadow-sm'
                    }
                    placeholder={intl?.formatMessage({
                      id: 'enter_node_name',
                    })}
                    type="text"
                    data-testid="enter_node_name"
                    onChange={(e) => setNodeName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex mb-3 gap-4">
            <div className="input-label flex-1">
              <h3 className="text-lg rounded-md  bg-blue-400   text-white px-1 font-semibold py-1">
                <FormattedMessage id="node_type" />
              </h3>
              <div className="py-3">
                <span className="text-sm px-1  font-semibold">
                  <FormattedMessage id="select_node_type" />
                  <span className="px-1">:</span>
                </span>
                <div>
                  <Select
                    placeholder={intl?.formatMessage({
                      id: 'select_node_type',
                    })}
                    value={selectedNodeType}
                    className="w-full text-sm leading-6  rounded-md shadow-sm"
                    onChange={(nodeType: string) =>
                      setSelectedNodeType(nodeType)
                    }
                  >
                    <Option value="Select Node Type">
                      <FormattedMessage id="select_node_type" />
                    </Option>
                    <Option value="Sub Question">
                      <FormattedMessage id="sub_question" />
                    </Option>
                    <Option value="Node Action">
                      {' '}
                      <FormattedMessage id="node_action" />
                    </Option>
                  </Select>
                </div>
              </div>
            </div>
            {selectedNodeType !== 'Select Node Type' && (
              <div className="flex-1">
                <h3 className="text-lg rounded-md  bg-blue-400   text-white px-1 font-semibold py-1">
                  {selectedNodeType === 'Sub Question' && (
                    <FormattedMessage id="node_details" />
                  )}
                  {selectedNodeType === 'Node Action' && (
                    <FormattedMessage id="node_action_details" />
                  )}
                </h3>
                <div className="py-3">
                  <span className="text-sm px-1 font-semibold">
                    {selectedNodeType === 'Sub Question' && (
                      <FormattedMessage id="select_node" />
                    )}
                    {selectedNodeType === 'Node Action' && (
                      <FormattedMessage id="select_node_action" />
                    )}
                    <span className="px-1">:</span>
                  </span>

                  <div>
                    <Select
                      placeholder={
                        selectedNodeType === 'Sub Question'
                          ? intl.formatMessage({
                              id: 'select_node',
                            })
                          : selectedNodeType === 'Node Action'
                          ? intl?.formatMessage({
                              id: 'select_node_action',
                            })
                          : ''
                      }
                      value={selectedNode}
                      className="w-full text-sm leading-6  rounded-md shadow-sm"
                      onChange={handleChangeNode}
                    >
                      {selectedNodeType === 'Sub Question' &&
                        newNodeOptions?.length > 0 &&
                        newNodeOptions.map((item: any) => (
                          <Option
                            key={item.id}
                            value={item?.id}
                          >{`${item?.name}`}</Option>
                        ))}
                      {selectedNodeType === 'Node Action' &&
                        nodeActions?.length > 0 &&
                        nodeActions.map((item: any) => (
                          <Option
                            key={item.id}
                            value={item?.id}
                          >{`${item?.header}`}</Option>
                        ))}
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center">
            <Button
              data-testid="node_Submit_button"
              className=""
              onClick={createNodeHandler}
              disabled={!parseInt(selectedNode) || nodeName?.trim().length < 1}
            >
              <FormattedMessage id="submit" />
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default React?.memo(CreateNode);
