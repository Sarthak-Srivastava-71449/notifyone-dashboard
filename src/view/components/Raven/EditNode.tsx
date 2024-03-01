import React, { Fragment, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Input, Popconfirm } from 'antd';
import { Button } from '../Button';
import './Raven.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchRavenRootNodes,
  updateNodeEvent,
} from 'src/store/actions/ravenRootNodeEvents';
import {
  getEditNodeDetails,
  getUpdateSuccess,
} from 'src/store/selectors/editAction';
import { getAccessToken } from 'src/store/selectors/accessToken';

const EditNode: React.FC = () => {
  /*
   Redux Selectors for fetching data
 */
  const nodeToEdit = useSelector((state: RootState) =>
    getEditNodeDetails(state)
  );
  const accessToken = useSelector((state: RootState) => getAccessToken(state));
  const updateSuccess = useSelector((state: RootState) =>
    getUpdateSuccess(state)
  );

  useEffect(() => {
    if (updateSuccess === true) {
      dispatch(fetchRavenRootNodes(accessToken, 200, 0));
      navigate('/communication/raven', { replace: true });
    }
  }, [updateSuccess]);

  const dispatch = useDispatch();

  const [nodeName, setNodeName] = useState<string>('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (nodeToEdit === null || nodeToEdit?.id !== id) {
      navigate('/communication/raven', { replace: true });
    } else {
      setNodeName(nodeToEdit?.name);
    }
  }, [nodeToEdit]);

  /*
   Function for Submit update Data
  */
  const submitUpdateData = () => {
    const payload = {
      name: nodeName.trim(),
      node_action: null,
      node_id: String(nodeToEdit.id),
    };
    dispatch(updateNodeEvent(accessToken, payload));
  };

  const { TextArea } = Input;
  return (
    <Fragment>
      <div className="w-9/12 mt-12   mx-auto wallet-wrapper shadow-md">
        <h2 className="text-lg font-semibold raven-form-title text-center py-1">
          <FormattedMessage id="edit_node_form" />
        </h2>
        <div className="py-2 px-3 flex-col flex">
          <div className="flex mb-3 flex-col">
            <div className="input-label  flex w-full">
              <span
                className="text-sm node-name font-semibold whitespace-nowrap"
                data-testid="data-name"
              >
                <FormattedMessage id="node_name" />
                <span className="px-1">:</span>
              </span>
              <span className="w-full" data-testid="textArea">
                <TextArea
                  rows={4}
                  value={nodeName}
                  onChange={(e) => setNodeName(e.target.value)}
                />
              </span>
            </div>
            <div className="no-character flex">
              <div className="width-9"></div>
              <div className="width-91">
                {nodeName?.length > 0 && (
                  <span className="character">
                    <span className="text-sm  font-semibold">
                      <FormattedMessage id="no_of_characters" />
                    </span>{' '}
                    <span className="px-1">:</span>
                    {nodeName?.length}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Button
              className="mr-1.5"
              onClick={() =>
                navigate('/communication/raven', { replace: true })
              }
            >
              <FormattedMessage id="back" />
            </Button>
            <Popconfirm
              className="popconfrim"
              title="Are you sure？"
              onConfirm={() => submitUpdateData()}
              okText="Yes"
              cancelText="No"
            >
              <Button
                className=""
                disabled={
                  nodeName?.trim().length <= 1 ||
                  nodeName?.localeCompare(nodeToEdit?.name) === 0
                }
              >
                <FormattedMessage id="update" />
              </Button>{' '}
            </Popconfirm>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default EditNode;
